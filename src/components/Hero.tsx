"use client";

import { ArrowDown } from "lucide-react";
import { useEffect, useRef } from "react";

import { LocationMarquee } from "@/components/LocationMarquee";
import { ServiceMarquee } from "@/components/ServiceMarquee";
import { siteConfig } from "@/data/site";
import {
  HERO_FRAME_COUNT,
  HERO_FRAME_MAX_RETRIES,
  HERO_FRAME_WINDOW_RADIUS,
  getFrameIndex,
  getFrameLoadOrder,
  getFrameWindowIndexes,
  getHeroFrameSource,
  getNearestLoadedFrameIndex,
  shouldRetryFrameLoad
} from "./hero-frames";

const maxConcurrentLoads = 4;
// Never crop more than ~30% of the frame's width/height when fitting the
// 16:9 source to the canvas, so narrow/tall viewports letterbox instead of
// zooming in aggressively.
const HERO_MIN_VISIBLE_FRACTION = 0.7;
const HERO_MOBILE_MIN_VISIBLE_FRACTION = 0.54;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const content = contentRef.current;
    const context = canvas?.getContext("2d");

    if (!section || !canvas || !content || !context) {
      return undefined;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const frames = Array<HTMLImageElement | null>(HERO_FRAME_COUNT).fill(null);
    const loadedIndexes = new Set<number>();
    const loadingIndexes = new Set<number>();
    const failedIndexes = new Set<number>();
    const pausedRetryIndexes = new Set<number>();
    const retryAttempts = new Map<number, number>();
    let requestedIndex = 0;
    let drawnIndex: number | null = null;
    let animationFrame = 0;
    let disposed = false;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(rect.width * pixelRatio));
      const height = Math.max(1, Math.round(rect.height * pixelRatio));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        drawnIndex = null;
      }
    };

    const drawNearestFrame = () => {
      resizeCanvas();
      const frameIndex = getNearestLoadedFrameIndex(
        requestedIndex,
        loadedIndexes
      );

      if (frameIndex === null || frameIndex === drawnIndex) {
        return;
      }

      const image = frames[frameIndex];

      if (!image) {
        return;
      }

      const scaleToFitWidth = canvas.width / image.naturalWidth;
      const scaleToFitHeight = canvas.height / image.naturalHeight;
      const coverScale = Math.max(scaleToFitWidth, scaleToFitHeight);
      const containScale = Math.min(scaleToFitWidth, scaleToFitHeight);
      const maxCropScale = containScale / HERO_MIN_VISIBLE_FRACTION;
      const mobileMaxCropScale =
        containScale / HERO_MOBILE_MIN_VISIBLE_FRACTION;
      const isMobileViewport = window.matchMedia("(max-width: 767px)").matches;
      const scale = isMobileViewport
        ? Math.min(coverScale, mobileMaxCropScale)
        : Math.min(coverScale, maxCropScale);
      const width = image.naturalWidth * scale;
      const height = image.naturalHeight * scale;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        image,
        (canvas.width - width) / 2,
        (canvas.height - height) / 2,
        width,
        height
      );
      drawnIndex = frameIndex;
    };

    const releaseDistantFrames = (windowRadius = HERO_FRAME_WINDOW_RADIUS) => {
      const retainedIndexes = new Set(
        getFrameWindowIndexes(
          requestedIndex,
          HERO_FRAME_COUNT,
          windowRadius
        )
      );

      frames.forEach((image, index) => {
        if (!image || retainedIndexes.has(index)) {
          return;
        }

        image.onload = null;
        image.onerror = null;
        image.src = "data:,";
        frames[index] = null;
        loadedIndexes.delete(index);
        loadingIndexes.delete(index);

        if (drawnIndex === index) {
          drawnIndex = null;
        }
      });
    };
    let pumpFrameLoads = () => {};

    const loadFrame = (index: number, eager = false) => {
      if (
        frames[index] ||
        loadedIndexes.has(index) ||
        loadingIndexes.has(index) ||
        failedIndexes.has(index) ||
        pausedRetryIndexes.has(index)
      ) {
        return;
      }

      const image = new Image();
      frames[index] = image;
      loadingIndexes.add(index);
      image.decoding = "async";
      image.fetchPriority = eager || index === requestedIndex ? "high" : "auto";
      image.onload = () => {
        if (disposed) {
          return;
        }

        loadingIndexes.delete(index);
        loadedIndexes.add(index);
        retryAttempts.delete(index);
        pausedRetryIndexes.delete(index);
        drawNearestFrame();
        pumpFrameLoads();
      };
      image.onerror = () => {
        if (disposed) {
          return;
        }

        loadingIndexes.delete(index);
        frames[index] = null;
        const failedAttemptCount = (retryAttempts.get(index) ?? 0) + 1;
        retryAttempts.set(index, failedAttemptCount);

        if (
          !shouldRetryFrameLoad(
            failedAttemptCount,
            HERO_FRAME_MAX_RETRIES
          )
        ) {
          failedIndexes.add(index);
        } else if (!window.navigator.onLine) {
          pausedRetryIndexes.add(index);
        }

        pumpFrameLoads();
      };
      image.src = getHeroFrameSource(index);
    };

    pumpFrameLoads = () => {
      if (disposed || loadingIndexes.size >= maxConcurrentLoads) {
        return;
      }

      if (reducedMotion.matches) {
        loadFrame(0, true);
        return;
      }

      const unavailableIndexes = new Set([
        ...loadedIndexes,
        ...failedIndexes,
        ...pausedRetryIndexes
      ]);
      const loadOrder = getFrameLoadOrder(
        requestedIndex,
        HERO_FRAME_COUNT,
        unavailableIndexes,
        loadingIndexes,
        HERO_FRAME_WINDOW_RADIUS
      );
      const availableSlots = maxConcurrentLoads - loadingIndexes.size;

      loadOrder
        .slice(0, availableSlots)
        .forEach((index) => loadFrame(index));
    };

    const updateFrame = () => {
      animationFrame = 0;

      if (reducedMotion.matches) {
        requestedIndex = 0;
        releaseDistantFrames(0);
        content.style.opacity = "1";
        content.style.filter = "brightness(1)";
        drawNearestFrame();
        pumpFrameLoads();
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollableDistance = section.offsetHeight - window.innerHeight;
      const progress = Math.min(
        1,
        Math.max(0, -rect.top / Math.max(scrollableDistance, 1))
      );

      requestedIndex = getFrameIndex(progress, HERO_FRAME_COUNT);
      releaseDistantFrames();
      content.style.opacity = String(1 - progress);
      content.style.filter = `brightness(${1 - progress * 0.2})`;
      drawNearestFrame();
      pumpFrameLoads();
    };

    const handleOnline = () => {
      pausedRetryIndexes.clear();
      pumpFrameLoads();
      requestUpdate();
    };

    const requestUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateFrame);
      }
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.visualViewport?.addEventListener("resize", requestUpdate);
    reducedMotion.addEventListener("change", requestUpdate);
    window.addEventListener("online", handleOnline);

    resizeCanvas();
    loadFrame(0, true);
    updateFrame();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.visualViewport?.removeEventListener("resize", requestUpdate);
      reducedMotion.removeEventListener("change", requestUpdate);
      window.removeEventListener("online", handleOnline);
      frames.forEach((image, index) => {
        if (!image) {
          return;
        }

        image.onload = null;
        image.onerror = null;

        if (loadingIndexes.has(index)) {
          image.src = "data:,";
        }

        frames[index] = null;
      });
      loadedIndexes.clear();
      loadingIndexes.clear();
      failedIndexes.clear();
      pausedRetryIndexes.clear();
      retryAttempts.clear();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[500vh] bg-black motion-reduce:h-screen"
    >
      <div
        className="sticky top-0 h-screen overflow-hidden bg-black"
      >
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Clothing alterations and tailoring at Koko Atelier, Galway"
          className="absolute inset-0 h-full w-full"
        >
          Clothing alterations and tailoring at Koko Atelier, Galway
        </canvas>

        <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/35 to-black/5" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/55 to-transparent" />

        <div className="absolute inset-x-0 top-0 z-20">
          <LocationMarquee className="py-3 md:py-4" />
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20">
          <ServiceMarquee className="py-4 md:py-5" />
        </div>

        <div className="container-page relative flex h-full items-center">
          <div
            ref={contentRef}
            className="max-w-2xl text-white transition-[filter]"
          >
            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
              {siteConfig.tagline}
            </h1>

            <p className="mt-6 max-w-xl text-lg text-white/90">
              Fast, professional alterations and tailoring for trousers, dresses,
              suits, jackets and bridal wear — in the heart of Galway city.
            </p>
          </div>
        </div>

        <div className="absolute bottom-24 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/75">
          Scroll
          <ArrowDown size={18} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

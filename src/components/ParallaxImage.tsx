"use client";

import type { ImgHTMLAttributes } from "react";
import { useEffect, useRef } from "react";

type ParallaxImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "className"> & {
  depth?: "soft" | "deep";
  imageClassName?: string;
  priority?: boolean;
};

export function ParallaxImage({
  alt,
  depth = "soft",
  imageClassName = "",
  priority = false,
  loading,
  decoding = "async",
  ...imageProps
}: ParallaxImageProps) {
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = mediaRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const updateParallax = () => {
      frame = 0;

      if (!media) return;

      if (reduceMotion.matches) {
        media.style.transform = "none";
        return;
      }

      const parent = media.parentElement;
      const bounds = (parent ?? media).getBoundingClientRect();
      const progress = Math.min(
        1,
        Math.max(
          0,
          (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height)
        )
      );
      const depthPx = depth === "deep" ? 56 : 36;
      const offset = (progress - 0.5) * depthPx * 2;

      media.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0) scale(1.08)`;
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reduceMotion.addEventListener("change", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reduceMotion.removeEventListener("change", requestUpdate);
    };
  }, [depth]);

  return (
    <div ref={mediaRef} className={`parallax-media parallax-media--${depth}`}>
      <img
        {...imageProps}
        alt={alt}
        loading={loading ?? (priority ? "eager" : "lazy")}
        decoding={decoding}
        className={`h-full w-full ${imageClassName}`.trim()}
      />
    </div>
  );
}

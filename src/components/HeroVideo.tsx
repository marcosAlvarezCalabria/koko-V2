"use client";

import { useEffect, useRef, useState } from "react";

import { isHeroLogoVisible } from "@/domain/hero/heroTimeline";

const HERO_VIDEO_PLAYBACK_RATE = 0.65;

type HeroVideoProps = {
  onLogoVisibilityChange?: (isVisible: boolean) => void;
};

function applyPlaybackRate(video: HTMLVideoElement) {
  video.defaultPlaybackRate = HERO_VIDEO_PLAYBACK_RATE;
  video.playbackRate = HERO_VIDEO_PLAYBACK_RATE;
}

export function HeroVideo({ onLogoVisibilityChange }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLogoVisible, setIsLogoVisible] = useState(false);

  const syncLogoVisibility = (video: HTMLVideoElement) => {
    const nextLogoVisibility = isHeroLogoVisible(video.currentTime);

    setIsLogoVisible(nextLogoVisibility);
    onLogoVisibilityChange?.(nextLogoVisibility);
  };

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return undefined;
    }

    let isVisible = true;

    const syncPlayback = () => {
      applyPlaybackRate(video);

      if (document.hidden || !isVisible) {
        video.pause();
        return;
      }

      void video.play().catch(() => undefined);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.01 }
    );

    observer.observe(video);
    document.addEventListener("visibilitychange", syncPlayback);
    syncPlayback();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
      poster="/images/hero-frames/frame-032.webp"
      src="/videos/hero-scroll-compact.mp4"
      className={`absolute inset-0 h-full w-full motion-reduce:hidden ${
        isLogoVisible ? "object-contain md:object-cover" : "object-cover"
      }`}
      onLoadedMetadata={(event) => {
        applyPlaybackRate(event.currentTarget);
        syncLogoVisibility(event.currentTarget);
      }}
      onSeeked={(event) => syncLogoVisibility(event.currentTarget)}
      onTimeUpdate={(event) => syncLogoVisibility(event.currentTarget)}
    />
  );
}

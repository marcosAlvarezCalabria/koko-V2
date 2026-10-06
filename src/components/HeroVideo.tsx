"use client";

import { useEffect, useRef } from "react";

const HERO_VIDEO_PLAYBACK_RATE = 0.65;

function applyPlaybackRate(video: HTMLVideoElement) {
  video.defaultPlaybackRate = HERO_VIDEO_PLAYBACK_RATE;
  video.playbackRate = HERO_VIDEO_PLAYBACK_RATE;
}

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

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
      src="/videos/hero-scroll.mp4"
      className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
      onLoadedMetadata={(event) => applyPlaybackRate(event.currentTarget)}
    />
  );
}

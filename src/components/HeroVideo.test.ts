import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const videoSource = readFileSync(
  new URL("./HeroVideo.tsx", import.meta.url),
  "utf8"
);

describe("HeroVideo", () => {
  it("plays the hero film at a calm pace and pauses it when it is not visible", () => {
    expect(videoSource).toContain("const HERO_VIDEO_PLAYBACK_RATE = 0.65");
    expect(videoSource).toContain("video.playbackRate = HERO_VIDEO_PLAYBACK_RATE");
    expect(videoSource).toContain("video.defaultPlaybackRate = HERO_VIDEO_PLAYBACK_RATE");
    expect(videoSource).toContain("new IntersectionObserver");
    expect(videoSource).toContain('document.addEventListener("visibilitychange"');
    expect(videoSource).toContain("autoPlay");
    expect(videoSource).toContain("playsInline");
    expect(videoSource).toContain('src="/videos/hero-scroll-compact.mp4"');
    expect(videoSource).toContain("onTimeUpdate");
    expect(videoSource).toContain("isHeroLogoVisible");
  });

  it("shows the complete logo frame on mobile without changing the desktop crop", () => {
    expect(videoSource).toContain("useState(false)");
    expect(videoSource).toContain('isLogoVisible ? "object-contain md:object-cover" : "object-cover"');
    expect(videoSource).toContain("setIsLogoVisible");
  });
});

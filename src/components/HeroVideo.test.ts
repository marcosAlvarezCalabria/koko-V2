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
  });
});

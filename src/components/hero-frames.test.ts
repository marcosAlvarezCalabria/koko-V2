import { describe, expect, it } from "vitest";

import {
  getFrameIndex,
  getFrameLoadOrder,
  getNearestLoadedFrameIndex
} from "./hero-frames";

describe("hero frame selection", () => {
  it("maps scroll progress across every available frame", () => {
    expect(getFrameIndex(0, 80)).toBe(0);
    expect(getFrameIndex(0.5, 80)).toBe(40);
    expect(getFrameIndex(1, 80)).toBe(79);
  });

  it("clamps progress and handles an empty sequence", () => {
    expect(getFrameIndex(-1, 80)).toBe(0);
    expect(getFrameIndex(2, 80)).toBe(79);
    expect(getFrameIndex(0.5, 0)).toBe(0);
  });

  it("uses the nearest loaded frame while the target is unavailable", () => {
    expect(getNearestLoadedFrameIndex(60, new Set([0, 24, 58, 63]))).toBe(
      58
    );
    expect(getNearestLoadedFrameIndex(60, new Set([0, 60, 63]))).toBe(60);
  });

  it("prefers the earlier frame when loaded candidates are equally close", () => {
    expect(getNearestLoadedFrameIndex(10, new Set([8, 12]))).toBe(8);
    expect(getNearestLoadedFrameIndex(10, new Set())).toBeNull();
  });
});

describe("hero frame loading", () => {
  it("prioritises the requested frame, then expands to nearby frames", () => {
    expect(getFrameLoadOrder(4, 8, new Set([0]), new Set([3]))).toEqual([
      4,
      5,
      2,
      6,
      1,
      7
    ]);
  });
});
import { getFrameWindowIndexes } from "./hero-frames";

describe("hero frame loading and retention", () => {
  it("keeps only a bounded window around the target plus the fallback frame", () => {
    expect(getFrameWindowIndexes(40, 80, 4)).toEqual([
      0,
      36,
      37,
      38,
      39,
      40,
      41,
      42,
      43,
      44
    ]);
    expect(getFrameWindowIndexes(79, 80, 4)).toEqual([0, 75, 76, 77, 78, 79]);
  });

  it("loads only inside the bounded window and prioritises the target", () => {
    expect(
      getFrameLoadOrder(40, 80, new Set([0]), new Set([39]), 4)
    ).toEqual([40, 41, 38, 42, 37, 43, 36, 44]);
  });

  it("can collapse the retention window to the static first frame", () => {
    expect(getFrameWindowIndexes(0, 80, 0)).toEqual([0]);
  });
});

import {
  HERO_FRAME_MAX_RETRIES,
  shouldRetryFrameLoad
} from "./hero-frames";

describe("hero frame retry policy", () => {
  it("allows two retries before treating repeated errors as terminal", () => {
    expect(shouldRetryFrameLoad(1, HERO_FRAME_MAX_RETRIES)).toBe(true);
    expect(shouldRetryFrameLoad(2, HERO_FRAME_MAX_RETRIES)).toBe(true);
    expect(shouldRetryFrameLoad(3, HERO_FRAME_MAX_RETRIES)).toBe(false);
  });
});

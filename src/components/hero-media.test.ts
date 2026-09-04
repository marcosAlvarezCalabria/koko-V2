import { describe, expect, it } from "vitest";

import {
  canPromoteVideoSegment,
  getAdjacentSegmentIndexes,
  getRenderedSegmentIndexes,
  getVideoSeekTime
} from "./hero-media";

describe("hero media loading window", () => {
  it("loads only the active segment and its immediate neighbours", () => {
    expect(getAdjacentSegmentIndexes(2, 5)).toEqual([1, 2, 3]);
  });

  it("keeps the loading window inside the available segments", () => {
    expect(getAdjacentSegmentIndexes(0, 5)).toEqual([0, 1]);
    expect(getAdjacentSegmentIndexes(4, 5)).toEqual([3, 4]);
  });

  it("keeps a distant visible segment loaded during a fast scroll jump", () => {
    expect(getRenderedSegmentIndexes(4, 0, 5)).toEqual([0, 3, 4]);
  });

  it("promotes only the requested segment after it has a frame to show", () => {
    expect(canPromoteVideoSegment(4, 3, 4, false)).toBe(false);
    expect(canPromoteVideoSegment(4, 4, 1, false)).toBe(false);
    expect(canPromoteVideoSegment(4, 4, 4, true)).toBe(false);
    expect(canPromoteVideoSegment(4, 4, 2, false)).toBe(true);
  });

  it("never seeks before the first decodable frame", () => {
    expect(getVideoSeekTime(0, 0.083008)).toBe(0.083008);
    expect(getVideoSeekTime(0.5, 0.083008)).toBe(0.5);
  });
});

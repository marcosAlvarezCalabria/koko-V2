import { readdirSync } from "node:fs";

import { describe, expect, it } from "vitest";

import {
  HERO_FRAME_COUNT,
  getHeroFrameFileName
} from "./hero-frames";

const frameDirectory = new URL("../../public/images/hero-frames/", import.meta.url);

describe("hero frame asset contract", () => {
  it("contains the complete contiguous configured sequence", () => {
    const frameFiles = readdirSync(frameDirectory)
      .filter((fileName) => fileName.endsWith(".webp"))
      .sort();
    const expectedFiles = Array.from(
      { length: HERO_FRAME_COUNT },
      (_, index) => getHeroFrameFileName(index)
    );

    expect(frameFiles).toEqual(expectedFiles);
  });
});

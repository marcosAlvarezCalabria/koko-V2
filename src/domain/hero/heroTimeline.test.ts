import { describe, expect, it } from "vitest";

import { isHeroLogoVisible } from "./heroTimeline";

describe("isHeroLogoVisible", () => {
  it("keeps the copy visible immediately before the logo transition", () => {
    expect(isHeroLogoVisible(3.249)).toBe(false);
  });

  it("hides the copy at the logo transition boundary", () => {
    expect(isHeroLogoVisible(3.25)).toBe(true);
  });

  it("keeps the copy hidden while the logo remains on screen", () => {
    expect(isHeroLogoVisible(5.5)).toBe(true);
  });
});

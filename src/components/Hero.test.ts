import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const heroSource = readFileSync(new URL("./Hero.tsx", import.meta.url), "utf8");

describe("Hero", () => {
  it("preserves the original full-screen composition with a calm autoplay video and no scroll stage", () => {
    expect(heroSource).toContain("{siteConfig.tagline}");
    expect(heroSource).toContain("<LocationMarquee");
    expect(heroSource).toContain("<ServiceMarquee");
    expect(heroSource).toContain("bg-gradient-to-r");
    expect(heroSource).toContain("container-page relative flex");
    expect(heroSource).toContain("<HeroVideo");
    expect(heroSource).not.toContain("<canvas");
    expect(heroSource).not.toContain("h-[500vh]");
    expect(heroSource).not.toContain("sticky top-0");
    expect(heroSource).not.toContain('addEventListener("scroll"');
  });

  it("fades only the central copy while the video logo is visible", () => {
    expect(heroSource).toContain("useState(false)");
    expect(heroSource).toContain("onLogoVisibilityChange={setIsLogoVisible}");
    expect(heroSource).toContain('isLogoVisible ? "opacity-0" : "opacity-100"');
    expect(heroSource).toContain("motion-reduce:transition-none");
    expect(heroSource).toContain("motion-reduce:opacity-100");
  });
});

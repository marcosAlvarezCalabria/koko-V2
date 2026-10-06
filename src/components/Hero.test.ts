import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const heroSource = readFileSync(new URL("./Hero.tsx", import.meta.url), "utf8");

describe("Hero", () => {
  it("shows direct actions and the calm autoplay video without a scroll stage", () => {
    expect(heroSource).toContain("{siteConfig.tagline}");
    expect(heroSource).toContain('href="#contact"');
    expect(heroSource).toContain('href="#services"');
    expect(heroSource).toContain("<HeroVideo />");
    expect(heroSource).not.toContain("<canvas");
    expect(heroSource).not.toContain("h-[500vh]");
    expect(heroSource).not.toContain("sticky top-0");
    expect(heroSource).not.toContain('addEventListener("scroll"');
  });
});

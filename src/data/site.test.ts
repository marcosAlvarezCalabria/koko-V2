import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";
import { servicePaths } from "./servicePages";

import {
  businessInfo,
  openingHours,
  priceGroups,
  services,
  siteConfig,
  siteUrl
} from "./site";

describe("site content", () => {
  it("brands the demo without inventing contact details", () => {
    expect(siteConfig.businessName).toBe("Koko Atelier Galway");
    expect(siteConfig.email).toBe("To be confirmed");
    expect(siteConfig.phone).toBe("To be confirmed");
  });

  it("provides content for every landing-page section", () => {
    expect(services.length).toBeGreaterThan(0);
    expect(priceGroups.length).toBeGreaterThan(0);
    expect(openingHours.length).toBeGreaterThan(0);
  });

  it("links every homepage service to a discoverable local service page", () => {
    for (const service of services) {
      expect(servicePaths).toContain(service.href);
    }
  });

  it("provides a real example image for every public service", () => {
    for (const service of services) {
      expect(service.imageAlt).not.toBe("");
      expect(
        existsSync(join(process.cwd(), "public", service.image.slice(1)))
      ).toBe(true);
    }
  });

  it("provides absolute, local brand assets for search and social previews", () => {
    expect(businessInfo.logo).toBe(`${siteUrl}/icons/koko-favicon.png`);
    expect(businessInfo.image).toEqual([
      `${siteUrl}/images/hero-video-poster.jpg`
    ]);

    for (const assetUrl of [businessInfo.logo, ...businessInfo.image]) {
      const { pathname } = new URL(assetUrl);
      expect(existsSync(join(process.cwd(), "public", pathname.slice(1)))).toBe(
        true
      );
    }
  });
});

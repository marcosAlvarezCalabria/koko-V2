import { describe, expect, it } from "vitest";

import { buildSitemap } from "./buildSitemap";

describe("buildSitemap", () => {
  it("builds an absolute home URL with trailing slash", () => {
    expect(buildSitemap("https://kokoatelier.ie", ["/"])[0]?.url).toBe("https://kokoatelier.ie/");
  });

  it("builds one entry per path without duplicate slashes", () => {
    const sitemap = buildSitemap("https://kokoatelier.ie/", ["/", "/services", "contact"]);

    expect(sitemap).toHaveLength(3);
    expect(sitemap.map((entry) => entry.url)).toEqual([
      "https://kokoatelier.ie/",
      "https://kokoatelier.ie/services/",
      "https://kokoatelier.ie/contact/"
    ]);
  });

  it("returns an empty sitemap for an empty path list", () => {
    expect(buildSitemap("https://kokoatelier.ie", [])).toEqual([]);
  });
});
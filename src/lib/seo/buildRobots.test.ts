import { describe, expect, it } from "vitest";

import { buildRobots } from "./buildRobots";

describe("buildRobots", () => {
  it("allows all crawlers to access the public site", () => {
    expect(buildRobots("https://kokoatelier.ie").rules).toEqual([{ userAgent: "*", allow: "/" }]);
  });

  it("points to an absolute sitemap.xml URL", () => {
    const robots = buildRobots("https://kokoatelier.ie/");

    expect(robots.sitemap).toBe("https://kokoatelier.ie/sitemap.xml");
    expect(robots.sitemap).toMatch(/^https:\/\//);
  });
});
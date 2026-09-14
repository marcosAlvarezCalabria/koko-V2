import { describe, expect, it } from "vitest";

import { getServicePage, servicePages, servicePaths } from "./servicePages";

describe("servicePages", () => {
  it("defines the six local service routes we want Google to discover", () => {
    expect(servicePaths).toEqual([
      "/clothing-alterations-galway/",
      "/bridal-alterations-galway/",
      "/dress-alterations-galway/",
      "/suit-alterations-galway/",
      "/trouser-jeans-alterations-galway/",
      "/zip-repairs-galway/"
    ]);
  });

  it("keeps every slug, title and description unique and locally relevant", () => {
    expect(new Set(servicePages.map(({ slug }) => slug)).size).toBe(servicePages.length);
    expect(new Set(servicePages.map(({ title }) => title)).size).toBe(servicePages.length);
    expect(new Set(servicePages.map(({ description }) => description)).size).toBe(servicePages.length);

    for (const page of servicePages) {
      expect(page.title).toContain("Galway");
      expect(page.description).toContain("Galway");
      expect(page.description.length).toBeGreaterThanOrEqual(90);
      expect(page.description.length).toBeLessThanOrEqual(160);
      expect(page.services.length).toBeGreaterThanOrEqual(4);
      expect(page.faqs.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("finds a page by slug and rejects an unknown route", () => {
    expect(getServicePage("bridal-alterations-galway")?.heading).toContain("Bridal alterations");
    expect(getServicePage("not-a-service")).toBeUndefined();
  });
});

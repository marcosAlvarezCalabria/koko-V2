import { existsSync, readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const notFoundPath = new URL("../../pages/404.astro", import.meta.url);

describe("Cloudflare Pages not-found handling", () => {
  it("ships a top-level 404 page instead of enabling SPA fallback", () => {
    expect(existsSync(notFoundPath)).toBe(true);

    const source = readFileSync(notFoundPath, "utf8");
    expect(source).toContain("noindex");
    expect(source).toContain("Page not found");
    expect(source).toContain('href="/"');
  });
});

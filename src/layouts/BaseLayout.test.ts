import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const layoutSource = readFileSync(
  new URL("./BaseLayout.astro", import.meta.url),
  "utf8"
);
const manifestSource = readFileSync(
  new URL("../../public/manifest.webmanifest", import.meta.url),
  "utf8"
);

describe("base layout branding", () => {
  it("uses the Koko Atelier gold mark for browser and installed-app icons", () => {
    expect(layoutSource.match(/\/icons\/koko-favicon\.png/g)).toHaveLength(2);
    expect(manifestSource).toContain('"src": "/icons/koko-favicon.png"');
    expect(manifestSource).toContain('"sizes": "192x192"');
    expect(manifestSource).toContain('"type": "image/png"');
  });
});

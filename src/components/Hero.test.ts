import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const heroSource = readFileSync(new URL("./Hero.tsx", import.meta.url), "utf8");

describe("Hero reduced motion layout", () => {
  it("collapses the scroll stage to one viewport", () => {
    expect(heroSource).toContain("motion-reduce:h-screen");
  });
});
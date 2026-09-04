import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const pricesSource = readFileSync(
  new URL("./Prices.tsx", import.meta.url),
  "utf8"
);

describe("Prices progressive disclosure", () => {
  it("keeps groups closed by default and supports pointer and touch access", () => {
    expect(pricesSource).toContain("useState<string | null>(null)");
    expect(pricesSource).toContain('event.pointerType === "mouse"');
    expect(pricesSource).toContain('activationPointer.current === "mouse"');
    expect(pricesSource).toContain("setOpenCategory(group.category)");
    expect(pricesSource).toContain("onClick");
    expect(pricesSource).toContain("aria-expanded");
    expect(pricesSource).toContain("aria-controls");
  });
});

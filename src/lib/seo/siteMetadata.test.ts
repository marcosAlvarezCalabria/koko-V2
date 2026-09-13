import { describe, expect, it } from "vitest";

import { siteMetadata } from "./siteMetadata";

describe("siteMetadata", () => {
  it("targets Galway alteration searches without exceeding a concise title", () => {
    expect(siteMetadata.title).toBe(
      "Clothing Alterations & Tailoring Galway | Koko Atelier"
    );
    expect(siteMetadata.title.length).toBeLessThanOrEqual(60);
  });

  it("describes the core services and supplies accessible social image text", () => {
    expect(siteMetadata.description).toContain("alterations");
    expect(siteMetadata.description).toContain("Galway");
    expect(siteMetadata.socialImageAlt).toBe(
      "Clothing alterations and tailoring at Koko Atelier Galway"
    );
  });
});

import { describe, expect, it } from "vitest";

import { buildWhatsappUrl } from "./buildWhatsappUrl";

describe("buildWhatsappUrl", () => {
  it("builds a wa.me URL with an Irish international phone number", () => {
    expect(buildWhatsappUrl("+353 85 200 9225", "Hello Koko Atelier")).toBe(
      "https://wa.me/353852009225?text=Hello+Koko+Atelier"
    );
  });

  it("removes formatting characters from the phone number", () => {
    expect(buildWhatsappUrl("00353 (85) 200-9225", "Hi")).toBe("https://wa.me/353852009225?text=Hi");
  });

  it("encodes message punctuation safely", () => {
    expect(buildWhatsappUrl("353852009225", "Hello, I need alterations & fitting advice")).toBe(
      "https://wa.me/353852009225?text=Hello%2C+I+need+alterations+%26+fitting+advice"
    );
  });
});
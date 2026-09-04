import { describe, expect, it } from "vitest";

import type { BusinessInfo } from "@/data/site";
import { buildLocalBusinessJsonLd } from "./buildLocalBusinessJsonLd";

function makeBusinessInfo(overrides: Partial<BusinessInfo> = {}): BusinessInfo {
  return {
    name: "Koko Atelier Galway",
    url: "https://kokoatelier.ie",
    logo: "/icons/koko-mark.svg",
    image: ["/images/services/bridal.png"],
    telephone: "To be confirmed",
    email: "To be confirmed",
    streetAddress: "",
    addressLocality: "Galway",
    addressRegion: "County Galway",
    postalCode: "",
    addressCountry: "IE",
    latitude: null,
    longitude: null,
    priceRange: "€€",
    areaServed: "Galway",
    sameAs: ["https://www.instagram.com/koko_atelier_galway"],
    openingHoursSpecification: [],
    ...overrides
  };
}

describe("buildLocalBusinessJsonLd", () => {
  it("uses the schema.org TailorShop context with the input name and url", () => {
    expect(buildLocalBusinessJsonLd(makeBusinessInfo({ name: "Custom Name", url: "https://example.test" }))).toMatchObject({
      "@context": "https://schema.org",
      "@type": "TailorShop",
      name: "Custom Name",
      url: "https://example.test"
    });
  });

  it("omits placeholder contact details and includes confirmed telephone values", () => {
    expect(buildLocalBusinessJsonLd(makeBusinessInfo({ telephone: "To be confirmed" }))).not.toHaveProperty("telephone");
    expect(buildLocalBusinessJsonLd(makeBusinessInfo({ telephone: "+353 91 555123" }))).toHaveProperty("telephone", "+353 91 555123");
  });

  it("omits geo coordinates until both latitude and longitude are numbers", () => {
    expect(buildLocalBusinessJsonLd(makeBusinessInfo({ latitude: null, longitude: null }))).not.toHaveProperty("geo");
    expect(buildLocalBusinessJsonLd(makeBusinessInfo({ latitude: 53.2707, longitude: -9.0568 }))).toHaveProperty("geo", {
      "@type": "GeoCoordinates",
      latitude: 53.2707,
      longitude: -9.0568
    });
  });

  it("omits opening hours when empty and maps one or two specifications", () => {
    expect(buildLocalBusinessJsonLd(makeBusinessInfo({ openingHoursSpecification: [] }))).not.toHaveProperty("openingHoursSpecification");

    const oneSlot = buildLocalBusinessJsonLd(makeBusinessInfo({
      openingHoursSpecification: [{ dayOfWeek: ["Monday"], opens: "09:00", closes: "17:00" }]
    }));
    expect(oneSlot).toHaveProperty("openingHoursSpecification", [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday"], opens: "09:00", closes: "17:00" }
    ]);

    const twoSlots = buildLocalBusinessJsonLd(makeBusinessInfo({
      openingHoursSpecification: [
        { dayOfWeek: ["Monday"], opens: "09:00", closes: "17:00" },
        { dayOfWeek: ["Tuesday", "Wednesday"], opens: "10:00", closes: "16:00" }
      ]
    }));
    expect((twoSlots.openingHoursSpecification as unknown[])).toHaveLength(2);
  });

  it("omits empty sameAs values and preserves link order when present", () => {
    expect(buildLocalBusinessJsonLd(makeBusinessInfo({ sameAs: [] }))).not.toHaveProperty("sameAs");
    expect(buildLocalBusinessJsonLd(makeBusinessInfo({ sameAs: ["https://first.example", "https://second.example"] }))).toHaveProperty("sameAs", [
      "https://first.example",
      "https://second.example"
    ]);
  });

  it("always includes Galway and IE address details while omitting empty street address", () => {
    const jsonLd = buildLocalBusinessJsonLd(makeBusinessInfo({ streetAddress: "", postalCode: "" }));

    expect(jsonLd).toHaveProperty("address", {
      "@type": "PostalAddress",
      addressLocality: "Galway",
      addressRegion: "County Galway",
      addressCountry: "IE"
    });
    expect(jsonLd.address).not.toHaveProperty("streetAddress");
    expect(jsonLd.address).not.toHaveProperty("postalCode");
  });
});
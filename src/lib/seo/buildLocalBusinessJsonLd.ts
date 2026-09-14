import type { BusinessInfo } from "@/data/site";

export function buildLocalBusinessJsonLd(info: BusinessInfo): Record<string, unknown> {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: info.name,
    url: info.url,
    address: buildAddress(info)
  };

  if (hasValue(info.telephone) && info.telephone !== "To be confirmed") {
    jsonLd.telephone = info.telephone;
  }

  if (hasValue(info.email) && info.email !== "To be confirmed") {
    jsonLd.email = info.email;
  }

  if (typeof info.latitude === "number" && typeof info.longitude === "number") {
    jsonLd.geo = {
      "@type": "GeoCoordinates",
      latitude: info.latitude,
      longitude: info.longitude
    };
  }

  if (hasValue(info.priceRange)) {
    jsonLd.priceRange = info.priceRange;
  }

  if (hasValue(info.areaServed)) {
    jsonLd.areaServed = info.areaServed;
  }

  if (info.sameAs.length > 0) {
    jsonLd.sameAs = info.sameAs;
  }

  if (info.openingHoursSpecification.length > 0) {
    jsonLd.openingHoursSpecification = info.openingHoursSpecification.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.dayOfWeek,
      opens: hours.opens,
      closes: hours.closes
    }));
  }

  if (info.image.length > 0) {
    jsonLd.image = info.image;
  }

  if (hasValue(info.logo)) {
    jsonLd.logo = info.logo;
  }

  return jsonLd;
}

function buildAddress(info: BusinessInfo): Record<string, unknown> {
  const address: Record<string, unknown> = {
    "@type": "PostalAddress",
    addressLocality: info.addressLocality,
    addressCountry: info.addressCountry
  };

  if (hasValue(info.streetAddress)) {
    address.streetAddress = info.streetAddress;
  }

  if (hasValue(info.postalCode)) {
    address.postalCode = info.postalCode;
  }

  if (hasValue(info.addressRegion)) {
    address.addressRegion = info.addressRegion;
  }

  return address;
}

function hasValue(value: string): boolean {
  return value !== "";
}
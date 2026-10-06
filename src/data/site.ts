export const siteConfig = { businessName: "Koko Atelier Galway", tagline: "Clothing alterations in Galway, shaped around you", phone: "To be confirmed", email: "To be confirmed", address: "Galway location to be confirmed", whatsapp: "" };

export const services = [
  {
    title: "Trousers",
    href: "/trouser-jeans-alterations-galway/",
    description: "Shortening, waist adjustments, tapering and repairs.",
    image: "/images/services/trousers.png",
    imageAlt: "Grey trousers being measured for an alteration"
  },
  {
    title: "Dresses",
    href: "/dress-alterations-galway/",
    description: "Hems, resizing, zip replacement and restyling.",
    image: "/images/services/dresses.png",
    imageAlt: "Black dress being altered at a sewing machine"
  },
  {
    title: "Suits",
    href: "/suit-alterations-galway/",
    description: "Jacket, sleeve and trouser alterations for a better fit.",
    image: "/images/services/suits.png",
    imageAlt: "Navy suit jacket pinned for alterations"
  },
  {
    title: "Bridal",
    href: "/bridal-alterations-galway/",
    description: "Careful fitting and alterations for wedding garments.",
    image: "/images/services/bridal.png",
    imageAlt: "Bridal lace, pearls and hand-sewing needle"
  },
  {
    title: "Clothing Alterations",
    href: "/clothing-alterations-galway/",
    description: "Everyday fitting, hems, sleeves and general garment repairs.",
    image: "/images/services/coats-jackets.png",
    imageAlt: "Green coat zip being checked by a tailor"
  },
  {
    title: "Zip Repairs",
    href: "/zip-repairs-galway/",
    description: "Zip assessment, replacement and related fastening repairs.",
    image: "/images/services/express-repairs.png",
    imageAlt: "Thread, scissors and measuring tape prepared for repairs"
  }
];

export const priceGroups = [
  { category: "Trousers & Jeans", items: [{ service: "Hemming (standard)", price: "From €15" }, { service: "Tapering legs", price: "From €20" }, { service: "Waist adjustment", price: "From €20" }, { service: "Zip replacement", price: "From €15" }] },
  { category: "Dresses & Skirts", items: [{ service: "Hemming", price: "From €20" }, { service: "Taking in / letting out", price: "From €25" }, { service: "Zip replacement", price: "From €20" }] },
  { category: "Tops, Blouses & Shirts", items: [{ service: "Hemming", price: "From €15" }, { service: "Taking in", price: "From €20" }, { service: "Sleeve shortening", price: "From €15" }, { service: "Buttons / minor repairs", price: "From €5" }] },
  { category: "Jackets & Coats", items: [{ service: "Sleeve shortening", price: "From €25" }, { service: "Taking in", price: "From €30" }, { service: "Zip replacement", price: "From €25" }, { service: "Lining repairs", price: "From €20" }] },
  { category: "Custom Tailoring", items: [{ service: "Custom garment creation", price: "From €120" }, { service: "Pattern making", price: "From €40" }, { service: "Bridal alterations", price: "From €60" }, { service: "Evening wear alterations", price: "From €40" }] },
  { category: "Additional Services", items: [{ service: "Express service (24–48 hrs)", price: "+20%" }, { service: "Steaming / minor finishing", price: "From €5" }] }
];

export const openingHours = [{ day: "Studio hours", hours: "To be confirmed" }];

export const siteUrl = "https://kokoatelier.ie";

export interface OpeningHoursSpecification {
  dayOfWeek: string[];
  opens: string;
  closes: string;
}

export interface BusinessInfo {
  name: string;
  url: string;
  logo: string;
  image: string[];
  telephone: string;
  email: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
  latitude: number | null;
  longitude: number | null;
  priceRange: string;
  areaServed: string;
  sameAs: string[];
  openingHoursSpecification: OpeningHoursSpecification[];
}

export const businessInfo: BusinessInfo = {
  name: "Koko Atelier",
  url: siteUrl,
  logo: `${siteUrl}/icons/koko-favicon.png`,
  image: [`${siteUrl}/images/hero-video-poster.jpg`],
  telephone: "+353 85 200 9225",
  email: "To be confirmed",
  streetAddress: "Unit 10, Corbett Court Shopping Centre, Williamsgate Street",
  addressLocality: "Galway",
  addressRegion: "County Galway",
  postalCode: "H91 V5DX",
  addressCountry: "IE",
  latitude: 53.274051,
  longitude: -9.050949,
  priceRange: "€€",
  areaServed: "Galway",
  sameAs: ["https://www.instagram.com/koko_atelier_galway"],
  openingHoursSpecification: [
    { dayOfWeek: ["Monday", "Tuesday", "Wednesday"], opens: "10:00", closes: "19:00" },
    { dayOfWeek: ["Thursday", "Friday"], opens: "10:00", closes: "20:00" },
    { dayOfWeek: ["Saturday"], opens: "10:00", closes: "17:00" },
    { dayOfWeek: ["Sunday"], opens: "10:30", closes: "15:00" }
  ]
};

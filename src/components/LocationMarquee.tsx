import { businessInfo, siteConfig } from "@/data/site";

const locationItems = [
  siteConfig.businessName,
  businessInfo.streetAddress,
  "Galway, Ireland"
];
const marqueeItems = [...locationItems, ...locationItems, ...locationItems];

export function LocationMarquee({ className = "" }: { className?: string }) {
  return (
    <section
      aria-label="Koko Atelier Galway location"
      className={`bg-black py-4 text-white ${className}`}
    >
      <div className="service-marquee overflow-hidden">
        <div className="service-marquee__track service-marquee__track--slow flex w-max items-center gap-6 px-5 md:gap-8 md:px-8">
          {marqueeItems.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex items-center gap-4 md:gap-5"
              aria-hidden={index >= locationItems.length}
            >
              <span className="whitespace-nowrap text-sm font-semibold uppercase tracking-[0.18em] text-white md:text-base">
                {item}
              </span>
              <span className="size-1.5 rounded-full bg-brand-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

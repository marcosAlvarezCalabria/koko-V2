import { services } from "@/data/site";

const marqueeItems = [...services, ...services];

export function ServiceMarquee({ className = "" }: { className?: string }) {
  return (
    <section
      aria-label="Koko Atelier Galway services"
      className={`bg-black py-5 text-white ${className}`}
    >
      <div className="service-marquee overflow-hidden">
        <div className="service-marquee__track flex w-max items-center gap-6 px-5 md:gap-8 md:px-8">
          {marqueeItems.map((service, index) => (
            <div
              key={`${service.title}-${index}`}
              className="flex items-center gap-4 md:gap-5"
              aria-hidden={index >= services.length}
            >
              <span className="whitespace-nowrap text-lg font-semibold leading-none md:text-2xl">
                {service.title}
              </span>
              <span className="size-2 rounded-full bg-brand-100" />
              <span className="hidden max-w-[24rem] whitespace-nowrap text-base font-medium leading-none text-white/75 md:inline">
                {service.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
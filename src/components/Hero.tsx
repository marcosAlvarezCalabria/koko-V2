import { HeroVideo } from "@/components/HeroVideo";
import { LocationMarquee } from "@/components/LocationMarquee";
import { ServiceMarquee } from "@/components/ServiceMarquee";
import { siteConfig } from "@/data/site";

export function Hero() {
  return (
    <section className="relative min-h-[calc(100svh-4.5rem)] overflow-hidden bg-black">
      <HeroVideo />

      <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/35 to-black/5" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/55 to-transparent" />

      <div className="absolute inset-x-0 top-0 z-20">
        <LocationMarquee className="py-3 md:py-4" />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20">
        <ServiceMarquee className="py-4 md:py-5" />
      </div>

      <div className="container-page relative flex min-h-[calc(100svh-4.5rem)] items-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            {siteConfig.tagline}
          </h1>

          <p className="mt-6 max-w-xl text-lg text-white/90">
            Fast, professional alterations and tailoring for trousers, dresses,
            suits, jackets and bridal wear — in the heart of Galway city.
          </p>
        </div>
      </div>
    </section>
  );
}

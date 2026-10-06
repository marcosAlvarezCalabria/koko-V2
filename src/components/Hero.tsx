import { HeroVideo } from "@/components/HeroVideo";
import { siteConfig } from "@/data/site";

export function Hero() {
  return (
    <section className="grid min-h-[calc(100svh-4.5rem)] bg-brand-900 text-white lg:grid-cols-2">
      <div className="flex flex-col justify-center px-5 py-14 md:px-8 md:py-20 lg:px-16 xl:px-24">
        <div className="max-w-xl">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            {siteConfig.tagline}
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-white/90">
            Fast, professional alterations and tailoring for trousers, dresses,
            suits, jackets and bridal wear — in the heart of Galway city.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-brand-900 transition-colors hover:bg-brand-100"
            >
              Request a quote
            </a>
            <a
              href="#services"
              className="inline-flex min-h-12 items-center rounded-xl border border-white/70 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Explore services
            </a>
          </div>
        </div>
      </div>

      <div className="relative min-h-[34svh] overflow-hidden lg:min-h-full">
        <img
          src="/images/hero-frames/frame-032.webp"
          alt="Koko Atelier name being embroidered onto dark fabric"
          width={960}
          height={960}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <HeroVideo />
      </div>
    </section>
  );
}

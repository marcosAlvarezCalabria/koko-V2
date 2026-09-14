import { ParallaxImage } from "@/components/ParallaxImage";
import { services } from "@/data/site";

export function Services() {
  return (
    <section id="services" className="section-padding">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wider text-brand-600">
            Services
          </p>
          <h2 className="mt-2 text-3xl font-semibold md:text-4xl">
            Alterations for everyday and special garments
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Expert clothing alterations and tailoring in Galway, from everyday
            repairs to bridal and occasion wear.
          </p>
        </div>

        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="group">
              <a href={service.href} className="block focus-visible:rounded-2xl">
              <div className="relative aspect-[6/5] overflow-hidden rounded-2xl bg-slate-100">
                <ParallaxImage
                  src={service.image}
                  alt={service.imageAlt}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  depth="soft"
                  imageClassName="object-cover"
                />
              </div>
              <h3 className="mt-5 text-xl font-medium text-brand-900">
                {service.title}
              </h3>
              </a>
              <p className="mt-2 max-w-sm text-slate-600">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

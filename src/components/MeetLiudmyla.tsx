import { ParallaxImage } from "@/components/ParallaxImage";

export function MeetLiudmyla() {
  return (
    <section
      id="about"
      className="section-padding overflow-hidden bg-brand-900 text-white"
    >
      <div className="container-page grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div className="grid h-[28rem] grid-cols-5 grid-rows-6 gap-3 sm:h-[34rem] sm:gap-4">
          <div className="relative col-span-3 row-span-6 overflow-hidden rounded-2xl">
            <ParallaxImage
              src="/images/liudmyla-portrait.jpg"
              alt="Liudmyla Arnautova in her bright design studio"
              priority={false}
              sizes="(min-width: 1024px) 28vw, 60vw"
              depth="soft"
              imageClassName="object-cover object-[54%_center]"
            />
          </div>

          <div className="relative col-span-2 col-start-4 row-span-5 row-start-2 overflow-hidden rounded-2xl">
            <ParallaxImage
              src="/images/atelier-work.jpg"
              alt="Liudmyla working carefully at Koko Atelier Galway"
              sizes="(min-width: 1024px) 18vw, 40vw"
              depth="deep"
              imageClassName="object-cover"
            />
          </div>
        </div>

        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wider text-brand-100">
            Meet Liudmyla
          </p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
            Craft, care and more than 20 years of experience
          </h2>
          <p className="mt-6 text-lg leading-8 text-brand-100">
            I&apos;m Liudmyla Arnautova, a tailor, garment technologist and
            entrepreneur with over 20 years of experience. Before moving to
            Ireland, I ran my own atelier in Ukraine, where individuality,
            quality and attention to detail guided every project. I studied
            sewing craftsmanship in Melitopol and later earned a second degree
            as a garment technologist. Today, I&apos;m beginning a new chapter with
            Koko Atelier Galway, welcoming clients who value careful workmanship
            and a personal approach. Based in Corbett Court in the heart of
            Galway city, Koko Atelier welcomes clients from across Galway and
            beyond.
          </p>
        </div>
      </div>
    </section>
  );
}

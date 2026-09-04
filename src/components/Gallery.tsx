"use client";

import { useEffect, useRef } from "react";

const galleryImages = [
  {
    src: "/images/demo-dressmaker.jpg",
    alt: "Garment alteration at a sewing machine by Koko Atelier, Galway",
    caption: "At the worktable",
    layout: "gallery-tile--portrait gallery-tile--lead",
    depth: "gallery-media--deep",
    position: "center"
  },
  {
    src: "/images/demo-sewing-detail.jpg",
    alt: "Detailed clothing alteration work by Koko Atelier, Galway",
    caption: "Careful stitching",
    layout: "gallery-tile--portrait gallery-tile--bridal",
    depth: "gallery-media--soft",
    position: "center"
  },
  {
    src: "/images/red-ruffle-dress-detail.jpg",
    alt: "Occasion wear alteration detail by Koko Atelier, Galway",
    caption: "Ruffle detail",
    layout: "gallery-tile--portrait gallery-tile--project",
    depth: "gallery-media--deep",
    position: "center 58%"
  },
  {
    src: "/images/white-flower-girl-dress-front.jpg",
    alt: "Bridal and occasion dress tailoring by Koko Atelier, Galway",
    caption: "Sculptural florals",
    layout: "gallery-tile--slender",
    depth: "gallery-media--soft",
    position: "center top"
  },
  {
    src: "/images/white-bow-dress-back.jpg",
    alt: "Dress alteration with organza bow detail by Koko Atelier, Galway",
    caption: "Organza volume",
    layout: "gallery-tile--slender gallery-tile--tools",
    depth: "gallery-media--deep",
    position: "center top"
  },
  {
    src: "/images/demo-vintage-atelier.jpg",
    alt: "Tailor fitting a garment at Koko Atelier, Galway",
    caption: "A personal craft",
    layout: "gallery-tile--slender",
    depth: "gallery-media--deep",
    position: "center"
  },
  {
    src: "/images/white-rosette-dress-back.jpg",
    alt: "Bridal dress alteration finish by Koko Atelier, Galway",
    caption: "Rosette finish",
    layout: "gallery-tile--portrait gallery-tile--bridal",
    depth: "gallery-media--soft",
    position: "center 35%"
  },
  {
    src: "/images/demo-machine-work.jpg",
    alt: "Professional garment sewing at Koko Atelier, Galway",
    caption: "Precision in every seam",
    layout: "gallery-tile--slender gallery-tile--tools",
    depth: "gallery-media--soft",
    position: "center"
  },
  {
    src: "/images/red-evening-dress.jpg",
    alt: "Evening dress tailoring by Koko Atelier, Galway",
    caption: "Evening silhouette",
    layout: "gallery-tile--slender",
    depth: "gallery-media--deep",
    position: "center top"
  },
  {
    src: "/images/ivory-embellished-dress.jpg",
    alt: "Embellished dress alteration by Koko Atelier, Galway",
    caption: "Embellished bodice",
    layout: "gallery-tile--slender gallery-tile--tools",
    depth: "gallery-media--soft",
    position: "center top"
  },
  {
    src: "/images/demo-fabric-detail.jpg",
    alt: "Fabric shaping during tailoring at Koko Atelier, Galway",
    caption: "Fabric and form",
    layout: "gallery-tile--portrait gallery-tile--project",
    depth: "gallery-media--deep",
    position: "center"
  },
  {
    src: "/images/creative-team.jpg",
    alt: "Creative garment tailoring project by Koko Atelier, Galway",
    caption: "Made together",
    layout: "gallery-tile--landscape",
    depth: "gallery-media--soft",
    position: "center"
  },
  {
    src: "/images/hero-video-poster.jpg",
    alt: "Clothing alterations and machine sewing at Koko Atelier, Galway",
    caption: "In the making",
    layout: "gallery-tile--cinematic",
    depth: "gallery-media--deep",
    position: "center"
  }
];

export function Gallery() {
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = galleryRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const updateParallax = () => {
      frame = 0;

      root?.querySelectorAll<HTMLElement>(".gallery-tile").forEach((tile) => {
        const media = tile.querySelector<HTMLElement>(".gallery-media");

        if (!media) return;

        if (reduceMotion.matches) {
          media.style.transform = "none";
          return;
        }

        const bounds = tile.getBoundingClientRect();
        const progress = Math.min(
          1,
          Math.max(
            0,
            (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height)
          )
        );
        const depth = media.classList.contains("gallery-media--deep") ? 64 : 40;
        const offset = (progress - 0.5) * depth * 2;

        media.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0) scale(1.08)`;
      });
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reduceMotion.addEventListener("change", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reduceMotion.removeEventListener("change", requestUpdate);
    };
  }, []);

  return (
    <section id="gallery" className="section-padding bg-slate-50">
      <div className="container-page">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wider text-brand-600">
              Our work
            </p>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">
              Alterations made with care
            </h2>
            <p className="mt-3 text-slate-600">
              A visual preview of the care, precision and personal craft behind
              each garment, from worktable details to finished pieces.
            </p>
          </div>

          <a
            href="https://www.instagram.com/koko_atelier_galway/"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4"
          >
            Follow us on Instagram
          </a>
        </div>

        <div ref={galleryRef} className="gallery-grid mt-10">
          {galleryImages.map((image) => (
            <figure
              key={image.src}
              className={`gallery-tile ${image.layout}`}
            >
              <div className={`gallery-media ${image.depth}`}>
                <img
                  src={image.src}
                  alt={image.alt}
                  sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                  style={{ objectPosition: image.position }}
                />
              </div>
              <figcaption className="gallery-caption">
                {image.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <style>{`
        .gallery-tile {
          isolation: isolate;
        }

        .gallery-media {
          inset: -16%;
          animation: none !important;
          transform: translate3d(0, 0, 0) scale(1.08);
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .gallery-media {
            transform: none;
            will-change: auto;
          }
        }
      `}</style>
    </section>
  );
}
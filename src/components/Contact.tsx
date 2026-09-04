import { Clock, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";

import { businessInfo } from "@/data/site";
import { buildWhatsappUrl } from "@/lib/contact/buildWhatsappUrl";
import { formatOpeningHours } from "@/lib/contact/formatOpeningHours";

const whatsappMessage = "Hello Koko Atelier, I would like to ask about clothing alterations.";
const whatsappUrl = buildWhatsappUrl(businessInfo.telephone, whatsappMessage);
const telephoneHref = `tel:${businessInfo.telephone.replace(/\s/g, "")}`;
const openingHours = formatOpeningHours(businessInfo.openingHoursSpecification);
const addressLines = [
  businessInfo.streetAddress,
  `${businessInfo.addressLocality}, ${businessInfo.postalCode}`,
  businessInfo.addressRegion
].filter(Boolean);

export function Contact() {
  return (
    <section id="contact" className="section-padding bg-brand-900 text-white">
      <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-wider text-brand-100">Contact</p>
          <h2 className="mt-2 text-3xl font-semibold md:text-4xl">
            Visit Koko Atelier in Galway
          </h2>
          <p className="mt-5 max-w-xl text-brand-100">
            For alterations, fittings and bridal work, contact Liudmyla directly or visit the studio in Corbett Court.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappUrl}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-900 transition-colors hover:bg-brand-100"
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={18} aria-hidden="true" />
              WhatsApp Koko Atelier
            </a>
            <a
              href={telephoneHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Phone size={18} aria-hidden="true" />
              {businessInfo.telephone}
            </a>
          </div>
        </div>

        <div className="grid gap-6 rounded-2xl bg-white/10 p-6 ring-1 ring-white/15 md:grid-cols-2 md:p-8">
          <div>
            <div className="flex items-center gap-2 text-brand-100">
              <MapPin size={18} aria-hidden="true" />
              <h3 className="font-semibold text-white">Studio address</h3>
            </div>
            <address className="mt-4 not-italic leading-7 text-brand-100">
              {addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>

          <div>
            <div className="flex items-center gap-2 text-brand-100">
              <Clock size={18} aria-hidden="true" />
              <h3 className="font-semibold text-white">Opening hours</h3>
            </div>
            <div id="hours" className="mt-4 space-y-3">
              {openingHours.map((item) => (
                <div key={`${item.days}-${item.hours}`} className="flex justify-between gap-4 border-b border-white/15 pb-3 text-sm last:border-0 last:pb-0">
                  <span className="text-brand-100">{item.days}</span>
                  <span className="shrink-0 font-medium text-white">{item.hours}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/15 pt-6 md:col-span-2">
            <a
              href={businessInfo.sameAs[0]}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
            >
              <Instagram size={18} aria-hidden="true" />
              Follow Koko Atelier on Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

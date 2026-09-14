import { siteConfig } from "@/data/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <div className="container-page flex h-18 items-center justify-between py-4">
        <a href="/" className="font-semibold text-brand-900">
          {siteConfig.businessName}
        </a>

        <nav className="hidden gap-6 text-sm md:flex">
          <a href="/#services">Services</a>
          <a href="/#about">Meet Liudmyla</a>
          <a href="/#gallery">Our work</a>
          <a href="/#prices">Prices</a>
          <a href="/#hours">Hours</a>
          <a href="/#contact">Contact</a>
        </nav>

        <a
          href="/#contact"
          className="inline-flex items-center gap-2 rounded-full bg-brand-900 px-4 py-2 text-sm font-medium text-white"
        >
          Request a quote
        </a>
      </div>
    </header>
  );
}

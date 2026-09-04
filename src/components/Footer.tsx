import { businessInfo, siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t bg-white py-8">
      <div className="container-page flex flex-col gap-3 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <span>© 2026 {siteConfig.businessName}</span>
        <span>{businessInfo.streetAddress}, {businessInfo.addressLocality}</span>
      </div>
    </footer>
  );
}

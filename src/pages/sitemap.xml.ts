import { siteUrl } from "@/data/site";
import { buildSitemapXml } from "@/lib/seo/buildSitemap";

const PUBLIC_PATHS = ["/"] as const;

export function GET() {
  return new Response(buildSitemapXml(siteUrl, PUBLIC_PATHS), {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
}
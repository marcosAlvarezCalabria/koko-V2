export interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency: "weekly";
  priority: number;
}

export function buildSitemap(
  siteUrl: string,
  paths: readonly string[],
  lastModified = new Date("2026-09-14T00:00:00.000Z")
): SitemapEntry[] {
  return paths.map((path) => ({
    url: joinUrl(siteUrl, path),
    lastModified,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7
  }));
}

export function buildSitemapXml(
  siteUrl: string,
  paths: readonly string[],
  lastModified?: Date
): string {
  const entries = buildSitemap(siteUrl, paths, lastModified);
  const urls = entries
    .map(
      (entry) => `  <url>
    <loc>${escapeXml(entry.url)}</loc>
    <lastmod>${entry.lastModified.toISOString()}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

function joinUrl(siteUrl: string, path: string): string {
  const base = siteUrl.replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const withoutDuplicateSlashes = normalizedPath.replace(/\/+/g, "/");
  const withTrailingSlash = withoutDuplicateSlashes.endsWith("/") ? withoutDuplicateSlashes : `${withoutDuplicateSlashes}/`;

  return `${base}${withTrailingSlash}`;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

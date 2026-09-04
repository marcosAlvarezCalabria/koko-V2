export interface RobotsConfig {
  rules: Array<{ userAgent: string; allow: string }>;
  sitemap: string;
}

export function buildRobots(siteUrl: string): RobotsConfig {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteUrl.replace(/\/+$/, "")}/sitemap.xml`
  };
}

export function buildRobotsText(siteUrl: string): string {
  const robots = buildRobots(siteUrl);
  const rules = robots.rules
    .map((rule) => `User-agent: ${rule.userAgent}\nAllow: ${rule.allow}`)
    .join("\n\n");

  return `${rules}\n\nSitemap: ${robots.sitemap}\n`;
}

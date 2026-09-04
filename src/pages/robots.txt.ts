import { siteUrl } from "@/data/site";
import { buildRobotsText } from "@/lib/seo/buildRobots";

export function GET() {
  return new Response(buildRobotsText(siteUrl), {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
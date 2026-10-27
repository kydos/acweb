import { siteConfig } from "@/lib/siteConfig";
import { ogCard } from "@/lib/ogCard";

// A route handler rather than the opengraph-image convention: the export
// then writes a real `og.png`, which GitHub Pages serves as image/png.
// (Extensionless files go out as application/octet-stream.)
export const dynamic = "force-static";

export function GET() {
  return ogCard({ eyebrow: siteConfig.name, title: siteConfig.hero.headline, footer: "corsaro.me" });
}

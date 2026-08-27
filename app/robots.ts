import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Note: /_next/ must stay crawlable. Every stylesheet and script the
        // site ships lives under /_next/static/, and Googlebot renders pages
        // before judging them — blocking it makes the whole site render unstyled.
      },
    ],
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
    host: siteConfig.siteUrl,
  };
}

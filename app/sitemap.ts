import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags } from "@/lib/mdx";
import { flatSlugs } from "@/lib/bookNav";
import { canonicalUrl } from "@/lib/seo";

const siteLastModified = new Date("2026-04-10");
const bookLastModified = new Date("2026-04-10");

const reportIssueDates: Record<string, Date> = {
  "2025-10": new Date("2025-10-01"),
  "2025-11": new Date("2025-11-01"),
  "2026-01": new Date("2026-01-01"),
  "2026-02": new Date("2026-02-01"),
};

const staticRoutes = [
  { path: "", priority: 1.0, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/cv", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/opensource", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/zenoh", priority: 1.0, changeFrequency: "monthly" as const },
  { path: "/zenoh/ros2", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/zenoh/dds-alternative", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/zenoh/book", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/zenoh/papers", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/zenoh/report", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/zenoh/talks", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of staticRoutes) {
    entries.push({
      url: canonicalUrl(route.path),
      lastModified: siteLastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    });
  }

  for (const post of getAllPosts()) {
    entries.push({
      url: canonicalUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.date),
      changeFrequency: "yearly",
      priority: 0.7,
    });
  }

  for (const { slug } of getAllTags()) {
    entries.push({
      url: canonicalUrl(`/blog/tag/${slug}`),
      lastModified: siteLastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  for (const slug of flatSlugs) {
    entries.push({
      url: canonicalUrl(`/zenoh/book/${slug}`),
      lastModified: bookLastModified,
      changeFrequency: "monthly",
      priority: slug.includes("/") ? 0.7 : 0.8,
    });
  }

  for (const [issue, date] of Object.entries(reportIssueDates)) {
    entries.push({
      url: canonicalUrl(`/zenoh/report/${issue}`),
      lastModified: date,
      changeFrequency: "never",
      priority: 0.8,
    });
  }

  return entries;
}

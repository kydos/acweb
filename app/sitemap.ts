import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";
import { flatSlugs } from "@/lib/bookNav";
import { locales } from "@/lib/navigation";
import { siteConfig } from "@/lib/siteConfig";

const siteUrl = siteConfig.siteUrl;
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

function localeUrl(locale: string, path: string): string {
  return `${siteUrl}/${locale}${path}`;
}

function alternateLanguages(path: string): Record<string, string> {
  return {
    ...Object.fromEntries(
      locales.map((locale) => [locale, localeUrl(locale, path)])
    ),
    "x-default": localeUrl("en", path),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const entries: MetadataRoute.Sitemap = [];

  // Static routes — one canonical entry per route (English) with hreflang alternates
  for (const route of staticRoutes) {
    entries.push({
      url: localeUrl("en", route.path),
      lastModified: siteLastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: alternateLanguages(route.path),
      },
    });
  }

  // Blog posts
  for (const post of posts) {
    const path = `/blog/${post.slug}`;
    entries.push({
      url: localeUrl("en", path),
      lastModified: new Date(post.date),
      changeFrequency: "yearly",
      priority: 0.7,
      alternates: {
        languages: alternateLanguages(path),
      },
    });
  }

  // Book chapters
  for (const slug of flatSlugs) {
    const path = `/zenoh/book/${slug}`;
    entries.push({
      url: localeUrl("en", path),
      lastModified: bookLastModified,
      changeFrequency: "monthly",
      priority: slug.includes("/") ? 0.7 : 0.8,
      alternates: { languages: alternateLanguages(path) },
    });
  }

  // Zenoh Report issues
  const reportIssues = Object.keys(reportIssueDates);
  for (const issue of reportIssues) {
    const path = `/zenoh/report/${issue}`;
    entries.push({
      url: localeUrl("en", path),
      lastModified: reportIssueDates[issue],
      changeFrequency: "never",
      priority: 0.8,
      alternates: { languages: alternateLanguages(path) },
    });
  }

  return entries;
}

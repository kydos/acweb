import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";
import { flatSlugs } from "@/lib/bookNav";

const siteUrl = "https://corsaro.me";
const locales = ["en", "fr", "it", "ja", "es", "zh", "ko", "ru"] as const;

const staticRoutes = [
  { path: "", priority: 1.0, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/cv", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/opensource", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/zenoh", priority: 1.0, changeFrequency: "monthly" as const },
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
  return Object.fromEntries(
    locales.map((locale) => [locale, localeUrl(locale, path)])
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const entries: MetadataRoute.Sitemap = [];

  // Static routes — one canonical entry per route (English) with hreflang alternates
  for (const route of staticRoutes) {
    entries.push({
      url: localeUrl("en", route.path),
      lastModified: new Date(),
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
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: slug.includes("/") ? 0.7 : 0.8,
      alternates: { languages: alternateLanguages(path) },
    });
  }

  // Zenoh Report issues
  const reportIssues = ["2025-10", "2025-11", "2026-01", "2026-02"];
  for (const issue of reportIssues) {
    const path = `/zenoh/report/${issue}`;
    entries.push({
      url: localeUrl("en", path),
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 0.8,
      alternates: { languages: alternateLanguages(path) },
    });
  }

  return entries;
}

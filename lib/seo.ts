import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

type MetadataOptions = {
  /** Route path, with or without slashes: "" | "/about" | "/blog/why-zenoh" */
  path: string;
  title: string;
  description: string;
  type?: "website" | "article" | "book";
  image?: string;
  keywords?: string[];
};

/**
 * Canonical URL for a route.
 *
 * next.config.js sets trailingSlash: true, so the export writes `about/index.html`
 * and the site serves `/about/`. Every canonical, sitemap entry, and JSON-LD `url`
 * goes through here so they cannot drift from what is actually served — a mismatch
 * costs a 301 hop on every crawl.
 */
export function canonicalUrl(path: string): string {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return clean ? `${siteConfig.siteUrl}/${clean}/` : `${siteConfig.siteUrl}/`;
}

/** Absolute URL for a non-route asset (OG images, PDFs). No trailing slash added. */
export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.siteUrl).toString();
}

export function pageMetadata({
  path,
  title,
  description,
  type = "website",
  image = siteConfig.ogImage,
  keywords,
}: MetadataOptions): Metadata {
  const url = canonicalUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical: url,
      // Page-level `alternates` replaces the layout's, so the feed link has to
      // be repeated here or it disappears from every page that sets metadata.
      types: { "application/rss+xml": absoluteUrl("/feed.xml") },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.siteTitle,
      type,
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${title} — ${siteConfig.siteTitle}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: siteConfig.social.twitterHandle,
    },
  };
}

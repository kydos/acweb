import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

type MetadataOptions = {
  /** Route path, with or without slashes: "" | "/about" | "/blog/why-zenoh" */
  path: string;
  title: string;
  description: string;
  type?: "website" | "article" | "book";
  image?: string;
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
}: MetadataOptions): Metadata {
  const url = canonicalUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title,
    description,
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
      siteName: siteConfig.siteShortTitle,
      type,
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
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

// ─── Structured data ──────────────────────────────────────────────

/** Stable node id for Angelo, so every author/creator reference points at one Person. */
export const PERSON_ID = `${canonicalUrl("")}#person`;

/**
 * Compact reference for `author` / `publisher` / `creator`. Carries name and
 * url as well as the @id so each page's JSON-LD still validates on its own.
 */
export const personRef = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: siteConfig.name,
  url: canonicalUrl(""),
} as const;

/** The full Person node. Emitted on the homepage and as /about's ProfilePage mainEntity. */
export const personSchema = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: siteConfig.name,
  url: canonicalUrl(""),
  image: absoluteUrl(siteConfig.profilePhoto),
  // [CONFIRM] jobTitle / worksFor — matches the current CV entry.
  jobTitle: "Distinguished Scientist",
  worksFor: { "@type": "Organization", name: "42dot" },
  description:
    "Angelo Corsaro, Ph.D. is the inventor of the Zenoh protocol and has worked on distributed systems for more than 25 years, from research to international standards.",
  // [CONFIRM] Add Wikidata / Wikipedia URLs here if those entries exist.
  sameAs: [siteConfig.social.github, siteConfig.social.linkedin, siteConfig.social.scholar],
  knowsAbout: ["Zenoh", "Distributed systems", "DDS", "ROS 2", "Edge computing", "Rust"],
  // [CONFIRM] Both from the CV's education section.
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Washington University in St. Louis" },
    { "@type": "CollegeOrUniversity", name: "Università degli Studi di Catania" },
  ],
  award: [
    "Technology CEO of the Year 2024",
    "Genius Minds 2024 — Representing France",
    "Power 200: World's Most Influential Data Economy Leaders 2019",
    "Gartner Cool Vendor 2014",
  ],
} as const;

/** TechArticle for Zenoh reference pages. */
export function techArticleSchema({
  path,
  headline,
  description,
}: {
  path: string;
  headline: string;
  description: string;
}) {
  const url = canonicalUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline,
    description,
    url,
    mainEntityOfPage: url,
    image: absoluteUrl(siteConfig.ogImage),
    author: personRef,
    publisher: personRef,
    about: { "@type": "SoftwareApplication", name: "Eclipse Zenoh", url: "https://zenoh.io" },
    inLanguage: "en",
  };
}

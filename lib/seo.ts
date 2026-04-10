import type { Metadata } from "next";
import { locales } from "@/lib/navigation";
import { siteConfig } from "@/lib/siteConfig";

type MetadataOptions = {
  locale: string;
  path: string;
  title: string;
  description: string;
  type?: "website" | "article" | "book";
  image?: string;
};

export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.siteUrl).toString();
}

export function localizedPath(locale: string, path: string): string {
  return `${siteConfig.siteUrl}/${locale}${path}`;
}

export function languageAlternates(path: string): Record<string, string> {
  return {
    ...Object.fromEntries(
      locales.map((locale) => [locale, localizedPath(locale, path)])
    ),
    "x-default": localizedPath("en", path),
  };
}

export function pageMetadata({
  locale,
  path,
  title,
  description,
  type = "website",
  image = siteConfig.ogImage,
}: MetadataOptions): Metadata {
  const url = localizedPath(locale, path);
  const imageUrl = absoluteUrl(image);

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.siteTitle,
      type,
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
      creator: "@angelocorsaro",
    },
  };
}

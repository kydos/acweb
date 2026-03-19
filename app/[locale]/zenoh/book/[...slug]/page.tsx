import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import fs from "fs";
import path from "path";
import Link from "next/link";
import { BookSidebar } from "@/components/BookSidebar";
import { flatSlugs, slugToTitle, navItems } from "@/lib/bookNav";
import { JsonLd } from "@/components/JsonLd";

// Slugs that are section indexes (map to README.md) — their relative links need the slug as a base dir
const sectionSlugs = new Set(
  navItems.filter((item) => "children" in item).map((item) => item.slug)
);

function resolveBookHref(href: string, locale: string, currentSlug: string): string {
  // Only rewrite relative .md links
  if (!href || href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:")) {
    return href;
  }
  if (!href.endsWith(".md")) return href;

  let clean = href.replace(/^\.\//, "").replace(/\.md$/, "");

  // README links → strip to the directory name (becomes the section slug)
  clean = clean.replace(/\/README$/, "").replace(/^README$/, "");

  // Determine base directory from the current slug
  const parts = currentSlug.split("/");
  let dir: string;
  if (parts.length >= 2) {
    // Leaf page like routing/peer-mode → dir is routing
    dir = parts[0];
  } else if (sectionSlugs.has(currentSlug)) {
    // Section index like routing (= routing/README.md) → dir is routing
    dir = currentSlug;
  } else {
    // Top-level file like introduction.md → no prefix
    dir = "";
  }

  const full = dir ? `${dir}/${clean}` : clean;
  return `/${locale}/zenoh/book/${full.replace(/\/+/g, "/").replace(/\/$/, "")}`;
}

const locales = ["en", "fr", "it", "ja", "es", "zh", "ko", "ru"] as const;

interface Props {
  params: { locale: string; slug: string[] };
}

function resolveFilePath(slug: string[]): string | null {
  const base = path.join(process.cwd(), "book/src");
  // Try direct file first (handles introduction.md, contributing.md, and all section pages)
  const direct = path.join(base, `${slug.join("/")}.md`);
  if (fs.existsSync(direct)) return direct;
  // Fall back to section index README.md
  const readme = path.join(base, ...slug, "README.md");
  if (fs.existsSync(readme)) return readme;
  return null;
}

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    flatSlugs.map((slug) => ({ locale, slug: slug.split("/") }))
  );
}

const siteUrl = "https://corsaro.me";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug.join("/");
  const title = slugToTitle[slug];
  if (!title) return {};
  const { locale } = params;
  return {
    title: `${title} — The Zenoh Book`,
    description: `The Zenoh Book: ${title}. Learn how to use the Eclipse Zenoh Protocol — written by Angelo Corsaro, the inventor of Zenoh.`,
    keywords: [
      "Eclipse Zenoh",
      "Zenoh Protocol",
      "Zenoh documentation",
      "Zenoh tutorial",
      title,
      "distributed systems",
      "pub/sub protocol",
      "ROS 2 middleware",
      "Angelo Corsaro",
    ],
    alternates: {
      canonical: `${siteUrl}/en/zenoh/book/${slug}`,
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l, `${siteUrl}/${l}/zenoh/book/${slug}`])
        ),
        "x-default": `${siteUrl}/en/zenoh/book/${slug}`,
      },
    },
    openGraph: {
      title: `${title} — The Zenoh Book`,
      description: `The Zenoh Book: ${title}. Learn how to use the Eclipse Zenoh Protocol — written by Angelo Corsaro, the inventor of Zenoh.`,
      type: "article",
      url: `${siteUrl}/${locale}/zenoh/book/${slug}`,
    },
  };
}

const rehypePrettyCodeOptions = {
  theme: { dark: "github-dark-dimmed", light: "github-light" },
  keepBackground: false,
  onVisitLine(node: { children: Array<unknown> }) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
};

function makeMdxComponents(locale: string, currentSlug: string) {
  return {
    img: ({
      src,
      alt,
      ...props
    }: React.ImgHTMLAttributes<HTMLImageElement>) => {
      if (typeof src === "string" && src.endsWith(".svg")) {
        const darkSrc = src.replace(/\.svg$/, "-dark.svg");
        return (
          <span className="block my-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt ?? ""} className="dark:hidden mx-auto" {...props} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={darkSrc} alt={alt ?? ""} className="hidden dark:block mx-auto" {...props} />
          </span>
        );
      }
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={src} alt={alt ?? ""} className="my-6 mx-auto" {...props} />;
    },
    a: ({
      href,
      children,
      ...props
    }: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
      children?: React.ReactNode;
    }) => {
      const resolved = resolveBookHref(href ?? "", locale, currentSlug);
      if (resolved.startsWith("http")) {
        return (
          <a href={resolved} target="_blank" rel="noopener noreferrer" {...props}>
            {children}
          </a>
        );
      }
      return (
        <Link href={resolved} {...props}>
          {children}
        </Link>
      );
    },
    table: (props: React.HTMLAttributes<HTMLTableElement>) => (
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse" {...props} />
      </div>
    ),
    thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
      <thead className="bg-stone-100 dark:bg-ink-shell" {...props} />
    ),
    th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
      <th
        className="px-4 py-2 text-left font-semibold text-stone-700 dark:text-cream border border-stone-200 dark:border-ink-wire"
        {...props}
      />
    ),
    td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
      <td
        className="px-4 py-2 text-stone-700 dark:text-fog border border-stone-200 dark:border-ink-wire align-top"
        {...props}
      />
    ),
    tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
      <tr className="even:bg-stone-50 dark:even:bg-ink-shell/40" {...props} />
    ),
  };
}

export default function BookChapterPage({ params }: Props) {
  const { locale, slug } = params;
  const currentSlug = slug.join("/");

  const filePath = resolveFilePath(slug);
  if (!filePath) notFound();

  const content = fs.readFileSync(filePath, "utf-8");

  const idx = flatSlugs.indexOf(currentSlug);
  const prevSlug = idx > 0 ? flatSlugs[idx - 1] : null;
  const nextSlug = idx < flatSlugs.length - 1 ? flatSlugs[idx + 1] : null;

  const title = slugToTitle[currentSlug];
  const chapterSchema = title
    ? {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        headline: `${title} — The Zenoh Book`,
        name: title,
        author: { "@type": "Person", name: "Angelo Corsaro", url: siteUrl },
        isPartOf: {
          "@type": "Book",
          name: "The Zenoh Book",
          url: `${siteUrl}/en/zenoh/book`,
        },
        url: `${siteUrl}/en/zenoh/book/${currentSlug}`,
        keywords: "Eclipse Zenoh, Zenoh Protocol, distributed systems, pub/sub",
        inLanguage: locale,
      }
    : null;

  return (
    <>
      {chapterSchema && <JsonLd data={chapterSchema} />}
    <div className="flex items-start min-h-[calc(100vh-4rem)]">
      <BookSidebar locale={locale} currentSlug={currentSlug} />

      <main className="flex-1 min-w-0">
        <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <div className="prose prose-neutral dark:prose-invert max-w-none
            prose-headings:font-serif
            prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6
            prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-3
            prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-2
            prose-code:text-accent prose-code:font-mono prose-code:text-sm
            prose-blockquote:border-l-4 prose-blockquote:border-accent/40 prose-blockquote:pl-4 prose-blockquote:italic
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
            <MDXRemote
              source={content}
              components={makeMdxComponents(locale, currentSlug)}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    [rehypePrettyCode as never, rehypePrettyCodeOptions],
                  ],
                },
              }}
            />
          </div>
        </article>

        {/* Prev / Next navigation */}
        <div className="mx-auto max-w-3xl px-6 pb-16 pt-4 border-t border-stone-200 dark:border-ink-wire mt-4 flex justify-between gap-4 text-sm">
          {prevSlug ? (
            <Link
              href={`/${locale}/zenoh/book/${prevSlug}`}
              className="flex items-center gap-2 text-stone-500 dark:text-ash hover:text-accent dark:hover:text-accent transition-colors group"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M5 12l7 7M5 12l7-7" />
              </svg>
              <span>
                <span className="block text-xs text-stone-400 dark:text-ash/60">Previous</span>
                {slugToTitle[prevSlug]}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {nextSlug ? (
            <Link
              href={`/${locale}/zenoh/book/${nextSlug}`}
              className="flex items-center gap-2 text-right text-stone-500 dark:text-ash hover:text-accent dark:hover:text-accent transition-colors group"
            >
              <span>
                <span className="block text-xs text-stone-400 dark:text-ash/60">Next</span>
                {slugToTitle[nextSlug]}
              </span>
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </main>
    </div>
    </>
  );
}

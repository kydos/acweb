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
import { Breadcrumbs } from "@/components/PageShell";
import { tableComponents, rehypePrettyCodeOptions } from "@/components/MdxComponents";
import { pageMetadata, canonicalUrl } from "@/lib/seo";

// Slugs that are section indexes (map to README.md) — their relative links need the slug as a base dir
const sectionSlugs = new Set(
  navItems.filter((item) => "children" in item).map((item) => item.slug)
);

function resolveBookHref(href: string, currentSlug: string): string {
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
  return `/zenoh/book/${full.replace(/\/+/g, "/").replace(/\/$/, "")}`;
}

interface Props {
  params: { slug: string[] };
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

export function generateStaticParams() {
  return flatSlugs.map((slug) => ({ slug: slug.split("/") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug.join("/");
  const title = slugToTitle[slug];
  if (!title) return {};

  const description = `The Zenoh Book: ${title}. Learn how to use the Eclipse Zenoh Protocol — written by Angelo Corsaro, the inventor of Zenoh.`;
  return pageMetadata({
    path: `/zenoh/book/${slug}`,
    title: `${title} — The Zenoh Book`,
    description,
    type: "article",
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
  });
}

function makeMdxComponents(currentSlug: string) {
  return {
    ...tableComponents,
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
      const resolved = resolveBookHref(href ?? "", currentSlug);
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
  };
}

export default function BookChapterPage({ params }: Props) {
  const { slug } = params;
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
        author: { "@type": "Person", name: "Angelo Corsaro", url: canonicalUrl("") },
        isPartOf: {
          "@type": "Book",
          name: "The Zenoh Book",
          url: canonicalUrl("/zenoh/book"),
        },
        url: canonicalUrl(`/zenoh/book/${currentSlug}`),
        keywords: "Eclipse Zenoh, Zenoh Protocol, distributed systems, pub/sub",
        inLanguage: "en",
      }
    : null;

  return (
    <>
      {chapterSchema && <JsonLd data={chapterSchema} />}
    <div className="flex items-start min-h-[calc(100vh-4rem)]">
      <BookSidebar currentSlug={currentSlug} />

      <main className="flex-1 min-w-0">
        <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <Breadcrumbs
            trail={[
              { label: "Zenoh", href: "/zenoh" },
              { label: "Book", href: "/zenoh/book" },
              ...(title ? [{ label: title, href: `/zenoh/book/${currentSlug}` }] : []),
            ]}
          />
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
              components={makeMdxComponents(currentSlug)}
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
              href={`/zenoh/book/${prevSlug}`}
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
              href={`/zenoh/book/${nextSlug}`}
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

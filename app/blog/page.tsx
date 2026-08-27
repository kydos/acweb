import type { Metadata } from "next";
import Link from "next/link";
import { getAllPostSummaries, getAllTags } from "@/lib/mdx";
import { BlogSearch } from "@/components/BlogSearch";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, canonicalUrl } from "@/lib/seo";
import { PageShell, PageHeader } from "@/components/PageShell";

const description =
  "Articles on Zenoh Protocol, distributed systems, robotics middleware, AI infrastructure, and edge computing — by Angelo Corsaro, Ph.D., inventor of Zenoh.";

export const metadata: Metadata = pageMetadata({
  path: "/blog",
  title: "Blog",
  description,
});

export default function BlogPage() {
  const posts = getAllPostSummaries();
  const tags = getAllTags();

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Angelo Corsaro — Blog",
    url: canonicalUrl("/blog"),
    description: "Writing on Zenoh, distributed systems, and robotics by Angelo Corsaro, Ph.D.",
    author: { "@type": "Person", name: "Angelo Corsaro", url: canonicalUrl("") },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      url: canonicalUrl(`/blog/${post.slug}`),
      keywords: post.tags?.join(", "),
      author: { "@type": "Person", name: "Angelo Corsaro", url: canonicalUrl("") },
    })),
  };

  return (
    <>
      <JsonLd data={blogSchema} />
      <PageShell>
        <PageHeader
          title="Blog"
          lede="Writing on Zenoh, distributed systems, and robotics."
          trail={[{ label: "Blog", href: "/blog" }]}
        >
          <a
            href="/feed.xml"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-stone-500 dark:text-ash hover:text-accent transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true">
              <circle cx="6.18" cy="17.82" r="2.18" />
              <path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z" />
            </svg>
            RSS feed
          </a>
        </PageHeader>

        {tags.length > 0 && (
          <nav aria-label="Browse by tag" className="mt-8 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-[0.11em] text-stone-400 dark:text-ash mr-1">
              Topics
            </span>
            {tags.map(({ tag, slug, posts: tagged }) => (
              <Link
                key={slug}
                href={`/blog/tag/${slug}`}
                className="px-2.5 py-1 text-xs rounded-full
                           border border-stone-200 dark:border-ink-wire
                           text-stone-600 dark:text-fog
                           hover:border-accent hover:text-accent transition-colors"
              >
                {tag}
                <span className="ml-1.5 text-stone-400 dark:text-ash tabular-nums">{tagged.length}</span>
              </Link>
            ))}
          </nav>
        )}

        <BlogSearch
          posts={posts}
          placeholder="Search articles..."
          empty="No posts yet. Check back soon."
        />
      </PageShell>
    </>
  );
}

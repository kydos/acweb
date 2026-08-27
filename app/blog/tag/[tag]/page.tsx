import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTags } from "@/lib/mdx";
import { BlogCard } from "@/components/BlogCard";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, canonicalUrl } from "@/lib/seo";
import { PageShell, PageHeader } from "@/components/PageShell";

interface Props {
  params: { tag: string };
}

export function generateStaticParams() {
  return getAllTags().map(({ slug }) => ({ tag: slug }));
}

function findTag(slug: string) {
  return getAllTags().find((t) => t.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = findTag(params.tag);
  if (!entry) return {};

  return pageMetadata({
    path: `/blog/tag/${entry.slug}`,
    title: `${entry.tag} — Articles`,
    description: `Articles tagged “${entry.tag}” by Angelo Corsaro, Ph.D. — inventor of the Zenoh Protocol.`,
    keywords: [entry.tag, "Angelo Corsaro", "Zenoh Protocol", "distributed systems"],
  });
}

export default function TagPage({ params }: Props) {
  const entry = findTag(params.tag);
  if (!entry) notFound();

  const listSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${entry.tag} — Articles`,
    url: canonicalUrl(`/blog/tag/${entry.slug}`),
    isPartOf: { "@type": "Blog", name: "Angelo Corsaro — Blog", url: canonicalUrl("/blog") },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: entry.posts.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: canonicalUrl(`/blog/${post.slug}`),
        name: post.title,
      })),
    },
  };

  const others = getAllTags().filter((t) => t.slug !== entry.slug);

  return (
    <>
      <JsonLd data={listSchema} />
      <PageShell>
        <PageHeader
          title={entry.tag}
          lede={`${entry.posts.length} ${entry.posts.length === 1 ? "article" : "articles"} tagged “${entry.tag}”.`}
          trail={[
            { label: "Blog", href: "/blog" },
            { label: entry.tag, href: `/blog/tag/${entry.slug}` },
          ]}
        />

        <div className="mt-8 divide-y divide-stone-100 dark:divide-ink-wire/60">
          {entry.posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        {others.length > 0 && (
          <nav aria-label="Other tags" className="mt-12 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-[0.11em] text-stone-400 dark:text-ash mr-1">
              Other topics
            </span>
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/blog/tag/${other.slug}`}
                className="px-2.5 py-1 text-xs rounded-full
                           border border-stone-200 dark:border-ink-wire
                           text-stone-600 dark:text-fog
                           hover:border-accent hover:text-accent transition-colors"
              >
                {other.tag}
              </Link>
            ))}
          </nav>
        )}

        <p className="mt-10 text-sm">
          <Link href="/blog" className="text-azure dark:text-sky hover:text-accent transition-colors">
            ← All posts
          </Link>
        </p>
      </PageShell>
    </>
  );
}

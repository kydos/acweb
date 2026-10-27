import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import {
  getAllPosts,
  getPostBySlug,
  getAdjacentPosts,
  getRelatedPosts,
} from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { JsonLd } from "@/components/JsonLd";
import { TagList } from "@/components/TagList";
import { ArticleAnalytics } from "@/components/ArticleAnalytics";
import { PageShell, Breadcrumbs, RelatedLinks } from "@/components/PageShell";
import { zenohPagesForTags } from "@/lib/zenohLinks";
import { articleComponents, rehypePrettyCodeOptions } from "@/components/MdxComponents";
import { pageMetadata, canonicalUrl, absoluteUrl, personRef } from "@/lib/seo";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return pageMetadata({
    path: `/blog/${post.slug}`,
    title: post.title,
    description: post.excerpt,
    type: "article",
    image: `/blog/${post.slug}/og.png`,
  });
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const { previous, next } = getAdjacentPosts(post.slug);
  const related = getRelatedPosts(post.slug);

  const zenohLinks = zenohPagesForTags(post.tags);
  const url = canonicalUrl(`/blog/${post.slug}`);

  // The visible <Breadcrumbs> below emits the matching BreadcrumbList.
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: personRef,
    publisher: personRef,
    url,
    mainEntityOfPage: url,
    image: absoluteUrl(`/blog/${post.slug}/og.png`),
    keywords: post.tags?.join(", "),
    inLanguage: "en",
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <ArticleAnalytics
        title={post.title}
        slug={post.slug}
        tags={post.tags}
        readingTime={post.readingTime}
      />
      <PageShell width="narrow">
        <article>
          <header className="mb-10 animate-fade-in">
            <Breadcrumbs
              trail={[
                { label: "Blog", href: "/blog" },
                { label: post.title, href: `/blog/${post.slug}` },
              ]}
            />
            <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-stone-900 dark:text-cream">
              {post.title}
            </h1>
            <div className="mt-3 flex items-center gap-3 text-sm font-mono text-muted">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">&middot;</span>
              <span>{post.readingTime}</span>
            </div>
            {post.tags && <TagList tags={post.tags} linked className="mt-phi-xs" />}
          </header>

          <div className="prose prose-neutral dark:prose-invert max-w-none animate-fade-in animate-delay-100">
            <MDXRemote
              source={post.content}
              components={articleComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [[rehypePrettyCode as never, rehypePrettyCodeOptions]],
                },
              }}
            />
          </div>
        </article>

        {/* Previous / next in reverse-chronological order */}
        {(previous || next) && (
          <nav
            aria-label="More posts"
            className="mt-16 pt-8 border-t border-stone-200 dark:border-ink-wire
                       grid gap-4 sm:grid-cols-2 text-sm"
          >
            {previous ? (
              <Link href={`/blog/${previous.slug}`} className="group">
                <span className="block text-xs text-muted">Previous</span>
                <span className="mt-0.5 block font-medium text-stone-700 dark:text-fog group-hover:text-accent transition-colors">
                  ← {previous.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/blog/${next.slug}`} className="group sm:text-right">
                <span className="block text-xs text-muted">Next</span>
                <span className="mt-0.5 block font-medium text-stone-700 dark:text-fog group-hover:text-accent transition-colors">
                  {next.title} →
                </span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}

        {related.length > 0 && (
          <section aria-labelledby="related-heading" className="mt-12">
            <h2
              id="related-heading"
              className="text-xs font-mono uppercase tracking-[0.11em] text-stone-500 dark:text-ash"
            >
              Related reading
            </h2>
            <ul className="mt-phi-sm space-y-phi-sm">
              {related.map((rel) => (
                <li key={rel.slug}>
                  <Link href={`/blog/${rel.slug}`} className="group block border-t border-line pt-phi-xs">
                    <span className="block text-sm font-semibold text-fg group-hover:text-accent transition-colors">
                      {rel.title}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-muted line-clamp-2">
                      {rel.excerpt}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {zenohLinks.length > 0 && <RelatedLinks heading="On the Zenoh side" links={zenohLinks} />}

        <p className="mt-12 text-sm">
          <Link href="/blog" className="text-muted hover:text-accent transition-colors">
            ← All posts
          </Link>
        </p>
      </PageShell>
    </>
  );
}

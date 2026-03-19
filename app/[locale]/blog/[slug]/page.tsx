import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/JsonLd";

const locales = ["en", "fr", "it", "ja", "es", "zh", "ko", "ru"] as const;

interface Props {
  params: { locale: string; slug: string };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return locales.flatMap((locale) =>
    posts.map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    keywords: [
      ...(post.tags ?? []),
      "Zenoh Protocol",
      "Angelo Corsaro",
      "distributed systems",
    ],
    alternates: {
      canonical: `${siteConfig.siteUrl}/en/blog/${params.slug}`,
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l, `${siteConfig.siteUrl}/${l}/blog/${params.slug}`])
        ),
        "x-default": `${siteConfig.siteUrl}/en/blog/${params.slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [siteConfig.name],
      url: `${siteConfig.siteUrl}/en/blog/${params.slug}`,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: post.title }],
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
  onVisitHighlightedLine(node: { properties: { className?: string[] } }) {
    node.properties.className = ["highlighted-line"];
  },
};

const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl font-serif font-bold mt-10 mb-4" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-serif font-semibold mt-8 mb-3" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-semibold mt-6 mb-2" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-accent/40 pl-4 italic text-stone-600 dark:text-fog my-4"
      {...props}
    />
  ),
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
    <tr
      className="even:bg-stone-50 dark:even:bg-ink-shell/40"
      {...props}
    />
  ),
};

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    url: `${siteConfig.siteUrl}/en/blog/${post.slug}`,
    keywords: post.tags?.join(", "),
  };

  return (
    <>
      <JsonLd data={articleSchema} />
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <header className="mb-10 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-stone-900 dark:text-cream">
          {post.title}
        </h1>
        <div className="mt-3 flex items-center gap-3 text-sm text-stone-500 dark:text-ash">
          <time>{formatDate(post.date)}</time>
          <span>&middot;</span>
          <span>{post.readingTime}</span>
        </div>
      </header>
      <div className="prose prose-neutral dark:prose-invert max-w-none animate-fade-in animate-delay-100">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
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
    </>
  );
}

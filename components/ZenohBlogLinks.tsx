import { getAllPostSummaries } from "@/lib/mdx";
import { tagsForZenohPage } from "@/lib/zenohLinks";
import { RelatedLinks } from "@/components/PageShell";

/** "From the blog" rail on a Zenoh page: the newest posts whose tags map to it. */
export function ZenohBlogLinks({ href, limit = 4 }: { href: string; limit?: number }) {
  const tags = new Set(tagsForZenohPage(href));
  const posts = getAllPostSummaries()
    .filter((p) => p.tags?.some((t) => tags.has(t)))
    .slice(0, limit);
  if (posts.length === 0) return null;

  return (
    <RelatedLinks
      heading="From the blog"
      links={posts.map((p) => ({ href: `/blog/${p.slug}`, label: p.title, desc: p.excerpt }))}
    />
  );
}

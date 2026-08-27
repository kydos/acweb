import { getAllPosts } from "@/lib/mdx";
import { siteConfig } from "@/lib/siteConfig";
import { canonicalUrl } from "@/lib/seo";

// Emitted as a static file by the export; no request-time work happens here.
export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const posts = getAllPosts();
  const updated = posts[0]?.date;

  const items = posts
    .map((post) => {
      const url = canonicalUrl(`/blog/${post.slug}`);
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
${(post.tags ?? []).map((tag) => `      <category>${escapeXml(tag)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.siteShortTitle)} — Blog</title>
    <link>${canonicalUrl("/blog")}</link>
    <description>Writing on Zenoh, distributed systems, and robotics by Angelo Corsaro, Ph.D.</description>
    <language>en</language>
    <managingEditor>${siteConfig.name}</managingEditor>
    <atom:link href="${siteConfig.siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
${updated ? `    <lastBuildDate>${new Date(updated).toUTCString()}</lastBuildDate>` : ""}
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}

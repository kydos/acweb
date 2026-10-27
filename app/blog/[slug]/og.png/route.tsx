import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { ogCard } from "@/lib/ogCard";

// Per-post social card, exported as /blog/<slug>/og.png. See app/og.png/route.tsx.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function GET(_req: Request, { params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return new Response("Not found", { status: 404 });
  return ogCard({
    eyebrow: "Angelo Corsaro · Writing",
    title: post.title,
    footer: `corsaro.me · ${formatDate(post.date)}`,
  });
}

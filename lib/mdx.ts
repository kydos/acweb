import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readingTime: string;
  content: string;
  tags?: string[];
  draft?: boolean;
}

/**
 * A post without its body. The blog index and search only ever read these
 * fields, and passing the full post into a client component would serialise
 * every article's MDX source into the page payload.
 */
export type PostSummary = Omit<BlogPost, "content">;

export function toSummary({ content: _content, ...rest }: BlogPost): PostSummary {
  return rest;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    return getPostBySlug(slug);
  });

  return posts
    .filter((p): p is BlogPost => p !== null && !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllPostSummaries(): PostSummary[] {
  return getAllPosts().map(toSummary);
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    readingTime: stats.text,
    content,
    tags: data.tags,
    draft: data.draft ?? false,
  };
}

/** Previous/next in reverse-chronological order, for in-article navigation. */
export function getAdjacentPosts(slug: string): {
  previous: PostSummary | null;
  next: PostSummary | null;
} {
  const posts = getAllPosts();
  const i = posts.findIndex((p) => p.slug === slug);
  if (i === -1) return { previous: null, next: null };
  return {
    // posts[0] is newest, so the "previous" article is the one after it in the list.
    previous: i < posts.length - 1 ? toSummary(posts[i + 1]) : null,
    next: i > 0 ? toSummary(posts[i - 1]) : null,
  };
}

/** URL-safe form of a tag: "ROS 2" -> "ros-2". */
export function tagSlug(tag: string): string {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/** Every tag in use, with its posts, sorted by post count then name. */
export function getAllTags(): { tag: string; slug: string; posts: PostSummary[] }[] {
  const bySlug = new Map<string, { tag: string; slug: string; posts: PostSummary[] }>();

  for (const post of getAllPosts()) {
    for (const tag of post.tags ?? []) {
      const slug = tagSlug(tag);
      if (!slug) continue;
      if (!bySlug.has(slug)) bySlug.set(slug, { tag, slug, posts: [] });
      bySlug.get(slug)!.posts.push(toSummary(post));
    }
  }

  return Array.from(bySlug.values()).sort(
    (a, b) => b.posts.length - a.posts.length || a.tag.localeCompare(b.tag)
  );
}

/** Other posts sharing at least one tag, most overlap first. */
export function getRelatedPosts(slug: string, limit = 2): PostSummary[] {
  const posts = getAllPosts();
  const current = posts.find((p) => p.slug === slug);
  if (!current?.tags?.length) return [];

  const tags = new Set(current.tags.map(tagSlug));
  return posts
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      post: toSummary(p),
      overlap: (p.tags ?? []).filter((t) => tags.has(tagSlug(t))).length,
    }))
    .filter((entry) => entry.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, limit)
    .map((entry) => entry.post);
}

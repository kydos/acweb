import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { PostSummary } from "@/lib/mdx";
import { TagList } from "./TagList";

/**
 * One row in a post list, separated from its neighbours by the parent's
 * hairline divider rather than a box. `compact` drops the excerpt and tags
 * (the homepage list shows title, date and reading time only).
 */
export function BlogCard({
  post,
  compact = false,
  headingLevel = "h2",
}: {
  post: PostSummary;
  compact?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`} className="block py-phi-sm">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-phi-md">
          <Heading className="text-base font-semibold leading-snug text-fg group-hover:text-accent transition-colors duration-200">
            {post.title}
          </Heading>
          <p className="shrink-0 text-xs font-mono text-muted">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true"> · </span>
            {post.readingTime}
          </p>
        </div>

        {!compact && (
          <>
            <p className="mt-1.5 text-sm leading-relaxed line-clamp-2 text-stone-600 dark:text-fog">
              {post.excerpt}
            </p>
            {post.tags && <TagList tags={post.tags.slice(0, 3)} className="mt-2" />}
          </>
        )}
      </Link>
    </article>
  );
}

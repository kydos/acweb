import { Link } from "@/lib/navigation";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/lib/mdx";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group">
      <Link
        href={`/blog/${post.slug}`}
        className="flex gap-4 py-5 -mx-3 px-3 rounded-lg
                   hover:bg-stone-100 dark:hover:bg-ink-card
                   transition-colors duration-200"
      >
        {/* Brass accent bar */}
        <div className="w-0.5 shrink-0 rounded-full mt-1 self-stretch
                        bg-stone-300 dark:bg-ink-shell
                        group-hover:bg-accent transition-colors duration-300" />

        <div className="flex-1 min-w-0">
          {/* Title row */}
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
            <h2 className="text-base font-semibold leading-snug
                           text-stone-800 dark:text-cream
                           group-hover:text-accent dark:group-hover:text-accent
                           transition-colors duration-200">
              {post.title}
            </h2>
            <time className="text-xs text-stone-400 dark:text-ash shrink-0 font-mono">
              {formatDate(post.date)}
            </time>
          </div>

          {/* Excerpt */}
          <p className="mt-1.5 text-sm leading-relaxed line-clamp-2
                        text-stone-500 dark:text-fog">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="mt-2.5 flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono text-stone-400 dark:text-ash">
              {post.readingTime}
            </span>
            {post.tags && post.tags.length > 0 && (
              <>
                <span className="text-stone-300 dark:text-ink-shell">&middot;</span>
                <div className="flex gap-1.5 flex-wrap">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs rounded-full
                                 bg-amber-50 dark:bg-accent/10
                                 text-amber-700 dark:text-accent
                                 border border-amber-200 dark:border-accent/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Chevron */}
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 shrink-0 self-center
                     text-stone-300 dark:text-ink-shell
                     group-hover:text-accent dark:group-hover:text-accent
                     group-hover:translate-x-0.5 transition-all duration-200"
          fill="none" stroke="currentColor" strokeWidth="2"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </Link>
    </article>
  );
}

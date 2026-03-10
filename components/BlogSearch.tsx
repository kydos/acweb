"use client";

import { useState, useMemo } from "react";
import { BlogCard } from "./BlogCard";
import type { BlogPost } from "@/lib/mdx";

interface Props {
  posts: BlogPost[];
  placeholder: string;
  empty: string;
}

export function BlogSearch({ posts, placeholder, empty }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return posts;
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }, [posts, query]);

  return (
    <div>
      {/* Search input */}
      <div className="mt-8 relative">
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 dark:text-ash pointer-events-none"
          fill="none" stroke="currentColor" strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2.5 rounded-lg
                     border border-stone-200 dark:border-ink-wire
                     bg-white dark:bg-ink-card
                     text-sm text-stone-800 dark:text-cream
                     placeholder:text-stone-400 dark:placeholder:text-ash
                     focus:outline-none focus:ring-1 focus:ring-azure dark:focus:ring-azure
                     focus:border-azure dark:focus:border-azure
                     transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2
                       text-stone-400 dark:text-ash
                       hover:text-stone-700 dark:hover:text-cream
                       transition-colors"
            aria-label="Clear search"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <p className="mt-12 text-stone-500 dark:text-fog">{empty}</p>
      ) : (
        <div className="mt-6 divide-y divide-stone-100 dark:divide-ink-wire/60">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

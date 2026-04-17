"use client";

import { useEffect } from "react";
import { trackArticleView } from "@/lib/analytics";

interface ArticleAnalyticsProps {
  title: string;
  slug: string;
  tags?: string[];
  /** Reading time string from gray-matter, e.g. "8 min read" */
  readingTime?: string;
}

/**
 * Invisible client component — renders nothing but fires an article_view
 * GA4 event when the article page mounts. Include it in the blog post
 * server component to get per-article tracking with topic/read-time data.
 */
export function ArticleAnalytics({
  title,
  slug,
  tags,
  readingTime,
}: ArticleAnalyticsProps) {
  useEffect(() => {
    const minutes = readingTime ? parseInt(readingTime, 10) : undefined;
    trackArticleView({
      article_title: title,
      article_slug: slug,
      article_topic: tags?.[0], // primary tag as the topic dimension
      read_time_minutes: Number.isNaN(minutes) ? undefined : minutes,
    });
  }, [title, slug, tags, readingTime]);

  return null;
}

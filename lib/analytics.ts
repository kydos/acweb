/**
 * analytics.ts
 * Safe wrapper around GA4's gtag() function.
 * Handles SSR (no window), non-production environments, and missing gtag gracefully.
 */

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean | undefined>;

function trackEvent(eventName: string, params?: EventParams) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "undefined") return;
  window.gtag("event", eventName, params);
}

// ---------------------------------------------------------------------------
// Contact page events
// ---------------------------------------------------------------------------

export type ContactType =
  | "github"
  | "linkedin"
  | "calendly"
  | "email_reveal"
  | "email_copy"
  | "email_write";

/**
 * Fire when a visitor interacts with any contact method.
 * contact_type distinguishes which channel they chose.
 */
export function trackContactAction(contactType: ContactType) {
  trackEvent("contact_action", { contact_type: contactType });
}

// ---------------------------------------------------------------------------
// Blog / article events
// ---------------------------------------------------------------------------

export interface ArticleViewParams {
  [key: string]: string | number | boolean | undefined;
  article_title: string;
  article_slug: string;
  article_topic?: string;
  read_time_minutes?: number;
}

/**
 * Fire on every article page load to capture content-level engagement.
 */
export function trackArticleView(params: ArticleViewParams) {
  trackEvent("article_view", params);
}

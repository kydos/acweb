export function formatDate(dateStr: string, locale = "en"): string {
  return new Date(dateStr).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** URL-safe form of a tag: "ROS 2" -> "ros-2". Lives here, not in lib/mdx, so client components can use it. */
export function tagSlug(tag: string): string {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

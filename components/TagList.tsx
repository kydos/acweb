import Link from "next/link";
import { cn, tagSlug } from "@/lib/utils";

/**
 * Tags as plain muted text — `#zenoh · #rust` — rather than pills.
 * Pass `linked` where each tag should go to its archive; inside a card that
 * is already one big link, leave it off (nested anchors are invalid HTML).
 */
export function TagList({
  tags,
  linked = false,
  counts,
  className,
}: {
  tags: readonly string[];
  linked?: boolean;
  counts?: Record<string, number>;
  className?: string;
}) {
  if (tags.length === 0) return null;
  return (
    <ul className={cn("flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xs font-mono text-muted", className)}>
      {tags.map((tag, i) => (
        <li key={tag} className="flex items-baseline gap-x-2">
          {linked ? (
            <Link href={`/blog/tag/${tagSlug(tag)}`} className="hover:text-accent transition-colors">
              #{tag}
              {counts && <span className="ml-1 tabular-nums opacity-70">{counts[tag]}</span>}
            </Link>
          ) : (
            <span>#{tag}</span>
          )}
          {/* Separator trails its item so a wrapped line never starts with one */}
          {i < tags.length - 1 && <span aria-hidden="true">·</span>}
        </li>
      ))}
    </ul>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const suggestions = [
  { label: "Zenoh Protocol", href: "/zenoh", desc: "Overview of the protocol, its design, and its origins." },
  { label: "Zenoh Book", href: "/zenoh/book", desc: "The full guide, from first pub/sub to wire-format internals." },
  { label: "Blog", href: "/blog", desc: "Writing on distributed systems, robotics, and protocol design." },
  { label: "Curriculum Vitae", href: "/cv", desc: "Publications, standards work, and career history." },
];

export default function NotFound() {
  return (
    <PageShell>
      <p className="text-sm font-mono uppercase tracking-[0.2em] text-sky">404</p>
      <h1 className="mt-4 text-3xl md:text-4xl font-serif font-bold tracking-tight text-stone-900 dark:text-cream">
        This page doesn&rsquo;t exist
      </h1>
      <p className="mt-3 max-w-xl leading-relaxed text-stone-500 dark:text-fog">
        The link may be out of date. The site moved to shorter URLs in 2026 — anything with a
        language prefix like <code className="font-mono text-sm text-accent">/en/</code> now lives at
        the same path without it.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn-primary">Go to the home page</Link>
        <Link href="/blog" className="btn-ghost">Browse the blog</Link>
      </div>

      <nav aria-label="Suggested pages" className="mt-14 pt-8 border-t border-stone-200 dark:border-ink-wire">
        <h2 className="text-xs font-mono uppercase tracking-[0.11em] text-stone-500 dark:text-ash">
          Popular destinations
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {suggestions.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group block h-full rounded-lg border border-stone-200 dark:border-ink-wire
                           bg-white dark:bg-ink-card px-4 py-3.5
                           hover:border-azure dark:hover:border-azure transition-colors"
              >
                <span className="block text-sm font-semibold text-stone-800 dark:text-cream group-hover:text-accent transition-colors">
                  {item.label}
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-stone-500 dark:text-ash">
                  {item.desc}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </PageShell>
  );
}

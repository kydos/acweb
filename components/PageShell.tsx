import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { canonicalUrl } from "@/lib/seo";

/**
 * One shell for every page, so the header logo, the page heading, and the footer
 * all share a left edge. Article-style pages narrow their body *inside* this
 * shell rather than setting a competing outer width.
 */
export function PageShell({
  children,
  width = "default",
  className = "",
}: {
  children: React.ReactNode;
  width?: "default" | "narrow" | "wide";
  className?: string;
}) {
  const max =
    width === "narrow" ? "max-w-3xl" : width === "wide" ? "max-w-6xl" : "max-w-5xl";
  return (
    <div className={`mx-auto ${max} px-6 py-phi-lg md:py-phi-xl ${className}`}>{children}</div>
  );
}

export type Crumb = { label: string; href: string };

/**
 * Visible breadcrumb trail plus the matching BreadcrumbList structured data.
 * Emitting both from one place stops the JSON-LD describing navigation that
 * isn't actually on the page.
 */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  if (trail.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: canonicalUrl("") },
      ...trail.map((crumb, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: crumb.label,
        item: canonicalUrl(crumb.href),
      })),
    ],
  };

  return (
    <>
      <JsonLd data={schema} />
      <nav aria-label="Breadcrumb" className="mb-phi-sm">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-stone-500 dark:text-ash">
          <li>
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
          </li>
          {trail.map((crumb, i) => {
            const isLast = i === trail.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-1.5">
                <span aria-hidden="true" className="text-stone-300 dark:text-ink-shell">
                  /
                </span>
                {isLast ? (
                  <span className="text-stone-700 dark:text-fog" aria-current="page">
                    {crumb.label}
                  </span>
                ) : (
                  <Link href={crumb.href} className="hover:text-accent transition-colors">
                    {crumb.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

/**
 * Standard page heading: optional breadcrumbs, an h1, and a lede.
 *
 * Pass `trail` only where the path is genuinely two or more levels deep.
 * On a top-level page a "Home / About" trail is decoration that costs ~32px
 * above every heading without telling the reader anything.
 */
export function PageHeader({
  title,
  lede,
  trail,
  children,
}: {
  title: string;
  lede?: React.ReactNode;
  trail?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <header className="animate-fade-in">
      {trail && <Breadcrumbs trail={trail} />}
      <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-stone-900 dark:text-cream">
        {title}
      </h1>
      {lede && (
        <p className="mt-phi-xs text-stone-500 dark:text-fog leading-relaxed max-w-2xl">{lede}</p>
      )}
      {children && <div className="mt-phi-md">{children}</div>}
    </header>
  );
}

/**
 * "Keep reading" rail for pages that would otherwise be link dead ends.
 * Every page should offer somewhere to go next.
 */
export function RelatedLinks({
  heading = "Keep reading",
  links,
}: {
  heading?: string;
  links: { label: string; href: string; desc: string }[];
}) {
  return (
    <nav
      aria-label={heading}
      className="mt-phi-xl"
    >
      <h2 className="text-xs font-mono uppercase tracking-[0.11em] text-muted">
        {heading}
      </h2>
      <ul className="mt-phi-sm grid gap-x-phi-lg gap-y-phi-md sm:grid-cols-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="group block h-full border-t border-line pt-phi-xs">
              <span className="block text-sm font-semibold text-fg group-hover:text-accent transition-colors">
                {link.label}
              </span>
              <span className="mt-1 block text-xs leading-relaxed text-muted">
                {link.desc}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

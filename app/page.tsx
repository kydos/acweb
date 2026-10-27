import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import { getAllPostSummaries } from "@/lib/mdx";
import { BlogCard } from "@/components/BlogCard";
import { JsonLd } from "@/components/JsonLd";
import { HeroFireflies } from "@/components/HeroFireflies";
import { ScrollReveal } from "@/components/ScrollReveal";
import { pageMetadata, canonicalUrl, personSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "",
  title: siteConfig.siteTitle,
  description: siteConfig.siteDescription,
});

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    personSchema,
    {
      "@type": "WebSite",
      "@id": `${canonicalUrl("")}#website`,
      name: siteConfig.siteShortTitle,
      url: canonicalUrl(""),
      description: siteConfig.siteDescription,
      inLanguage: "en",
      publisher: { "@id": personSchema["@id"] },
    },
  ],
};

export default function Home() {
  const recentPosts = getAllPostSummaries().slice(0, 3);

  return (
    <>
      <JsonLd data={homeSchema} />
      {/* Hero — one headline, one line of facts, one filled button. The
          name and the headline share the h1 so the page's single heading
          still carries the name; the headline is the LCP element and is
          painted without any entrance animation. */}
      <section className="relative isolate overflow-hidden">
        <HeroFireflies />
        <div className="mx-auto flex max-w-5xl flex-col justify-center px-6 py-phi-xl min-h-[calc(100svh-4rem)] md:min-h-[min(calc(100svh-4rem),48rem)]">
          <h1>
            <span className="block font-mono text-xs uppercase tracking-[0.2em] text-muted">
              {siteConfig.name}
            </span>
            {/* One line at every width: the headline is 8.86em wide in Lora 600 at
                this tracking, so the size is the content box (100vw − 3rem of
                padding) over 9.1em, capped at 5.5rem on wide screens. */}
            <span className="mt-phi-md block font-serif font-semibold leading-[1.04] tracking-[-0.025em] text-fg whitespace-nowrap text-[min(5.5rem,calc((100vw_-_3rem)/9.1))]">
              {siteConfig.hero.headline}
            </span>
          </h1>
          <p className="mt-phi-md max-w-xl text-lg leading-relaxed text-muted">
            {siteConfig.hero.supporting}
          </p>
          <div className="mt-phi-lg flex flex-wrap items-center gap-x-phi-md gap-y-phi-sm">
            <Link href="/zenoh" className="btn-primary">
              Explore Zenoh
            </Link>
            <Link href="/blog" className="link-quiet">
              Read the writing <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Proof strip — numbers, no boxes. */}
      <section aria-label="Track record" className="mx-auto max-w-5xl px-6 pb-phi-xl">
        <dl data-reveal className="grid grid-cols-2 gap-x-phi-lg gap-y-phi-md sm:grid-cols-4">
          {siteConfig.cv.stats.map((item) => (
            // dt must precede dd in the markup; flex-col-reverse puts the number on top.
            <div key={item.label} className="flex flex-col-reverse">
              <dt className="mt-1 text-sm text-muted">{item.label}</dt>
              <dd className="text-4xl font-semibold tracking-tight tabular-nums text-accent md:text-5xl">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        <div data-reveal className="mt-phi-lg flex flex-wrap items-baseline gap-x-phi-md gap-y-phi-xs">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Featured in</p>
          <ul className="flex flex-wrap gap-x-phi-md gap-y-phi-xs">
            {siteConfig.pressMedia.map((item) => (
              <li key={item.name}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap text-sm font-medium text-muted transition-colors hover:text-accent"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Zenoh — one sentence, one picture, one thing to try. */}
      <section aria-labelledby="zenoh-heading" className="mx-auto max-w-5xl px-6 py-phi-xl">
        <div data-reveal className="border-t border-line pt-phi-lg">
          <h2 id="zenoh-heading" className="font-serif text-3xl font-semibold text-fg">
            Zenoh
          </h2>
          <p className="mt-phi-xs max-w-2xl text-lg leading-relaxed text-muted">
            One protocol for data in motion, data at rest and computation — from a microcontroller
            to the cloud.
          </p>

          <ContinuumDiagram />

          <div className="mt-phi-lg flex flex-wrap items-baseline gap-x-phi-lg gap-y-phi-sm">
            <a href={siteConfig.zenohDemoUrl} target="_blank" rel="noopener noreferrer" className="link-quiet">
              Try Zenoh in your browser <span aria-hidden="true">↗</span>
            </a>
            <Link href="/zenoh/book" className="link-quiet">
              Read the Zenoh book <span aria-hidden="true">→</span>
            </Link>
          </div>
          <p className="mt-phi-xs max-w-2xl text-sm leading-relaxed text-muted">
            The demo runs publishers, subscribers, queryables and gets live in the page — open it
            in two tabs and watch them talk.
          </p>
        </div>
      </section>

      {/* Writing — titles, dates, reading time. */}
      {recentPosts.length > 0 && (
        <section aria-labelledby="writing-heading" className="mx-auto max-w-5xl px-6 pb-phi-xl">
          <div data-reveal className="border-t border-line pt-phi-lg">
            <div className="flex items-baseline justify-between gap-phi-sm">
              <h2 id="writing-heading" className="font-serif text-3xl font-semibold text-fg">
                Writing
              </h2>
              <Link href="/blog" className="link-quiet">
                All posts <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="mt-phi-xs divide-y divide-line">
              {recentPosts.map((post) => (
                <BlogCard key={post.slug} post={post} compact headingLevel="h3" />
              ))}
            </div>
          </div>
        </section>
      )}

      <ScrollReveal />
    </>
  );
}

/**
 * MCU → edge → cloud, drawn in HTML + small inline SVG icons so the labels
 * stay legible at phone width (a single scaled SVG would shrink them to ~6px).
 */
function ContinuumDiagram() {
  const tiers = [
    {
      label: "Microcontroller",
      icon: (
        <>
          <rect x="11" y="11" width="18" height="18" rx="2" />
          <path d="M15 7v4M20 7v4M25 7v4M15 29v4M20 29v4M25 29v4M7 15h4M7 20h4M7 25h4M29 15h4M29 20h4M29 25h4" />
        </>
      ),
    },
    {
      label: "Edge",
      icon: (
        <>
          <rect x="6" y="10" width="28" height="9" rx="2" />
          <rect x="6" y="21" width="28" height="9" rx="2" />
          <path d="M10 14.5h4M10 25.5h4" />
        </>
      ),
    },
    {
      label: "Cloud",
      icon: <path d="M12 29h17a6 6 0 0 0 .6-11.97A8 8 0 0 0 14.2 15.6 6.75 6.75 0 0 0 12 29Z" />,
    },
  ];

  return (
    <figure className="mt-phi-lg">
      <div
        role="img"
        aria-label="Zenoh runs on microcontrollers, edge nodes and cloud servers, speaking one protocol end to end."
        className="flex items-start text-muted"
      >
        {tiers.map((tier, i) => (
          <div key={tier.label} className={i < tiers.length - 1 ? "flex flex-1 items-start" : "flex items-start"}>
            <div className="flex w-24 shrink-0 flex-col items-center gap-phi-xs sm:w-32">
              <svg viewBox="0 0 40 40" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                {tier.icon}
              </svg>
              <span className="text-center font-mono text-xs">{tier.label}</span>
            </div>
            {i < tiers.length - 1 && <span className="mt-5 h-px flex-1 bg-muted/50" />}
          </div>
        ))}
      </div>
      <figcaption className="mt-phi-sm text-center font-mono text-xs text-muted">
        one protocol, end to end
      </figcaption>
    </figure>
  );
}

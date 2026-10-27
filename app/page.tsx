import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import { getAllPostSummaries } from "@/lib/mdx";
import { BlogCard } from "@/components/BlogCard";
import { JsonLd } from "@/components/JsonLd";
import { HeroFireflies } from "@/components/HeroFireflies";
import { pageMetadata, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "",
  title: siteConfig.siteTitle,
  description: siteConfig.siteDescription,
});

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Angelo Corsaro",
  url: siteConfig.siteUrl,
  image: absoluteUrl(siteConfig.profilePhoto),
  jobTitle: "Innovator & Distributed Systems Architect",
  description:
    "Angelo Corsaro, Ph.D. is the inventor of the Zenoh Protocol and a world expert in distributed systems, robotics middleware, AI-native infrastructure, and cloud-to-edge computing.",
  sameAs: [siteConfig.social.github, siteConfig.social.linkedin],
  knowsAbout: [
    "Zenoh Protocol",
    "Distributed Systems",
    "Robotics",
    "ROS 2",
    "Edge Computing",
    "IoT",
    "AI infrastructure",
    "DDS",
    "Real-Time Systems",
    "Autonomous Vehicles",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Washington University in St. Louis",
  },
  award: [
    "Technology CEO of the Year 2024",
    "Genius Minds 2024 — Representing France",
    "Power 200: World's Most Influential Data Economy Leaders 2019",
    "Gartner Cool Vendor 2014",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Angelo Corsaro",
  url: siteConfig.siteUrl,
  description: siteConfig.siteDescription,
  author: {
    "@type": "Person",
    name: "Angelo Corsaro",
  },
};

export default function Home() {
  const recentPosts = getAllPostSummaries().slice(0, 3);

  return (
    <>
      <JsonLd data={personSchema} />
      <JsonLd data={websiteSchema} />
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
            <span className="mt-phi-md block max-w-[11.5em] font-serif text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[1.04] tracking-[-0.025em] text-fg">
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

      <section className="mx-auto max-w-5xl px-6 pb-phi-xl">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-phi-xs">
          {siteConfig.cv.stats.map((item) => (
            <div key={item.label}>
              <div className="font-mono text-xl font-bold text-accent">{item.value}</div>
              <div className="mt-1 text-xs leading-tight text-muted">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

    <section className="mx-auto max-w-6xl px-6 pb-phi-xl">
      <div className="border-t border-stone-100 dark:border-ink-wire pt-phi-lg">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-stone-400 dark:text-ash text-center mb-6">
          Featured In
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
          {siteConfig.pressMedia.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-stone-400 dark:text-ash hover:text-accent dark:hover:text-accent transition-colors duration-200 whitespace-nowrap"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </section>

    {recentPosts.length > 0 && (
      <section className="mx-auto max-w-6xl px-6 pb-phi-xl">
        <div className="border-t border-stone-100 dark:border-ink-wire pt-phi-lg">
          <div className="flex items-baseline justify-between mb-2">
            <h2 className="text-xl font-serif font-semibold text-stone-900 dark:text-cream">
              Latest from the Blog
            </h2>
            <Link href="/blog" className="text-sm text-muted hover:text-accent dark:hover:text-accent transition-colors">
              All posts →
            </Link>
          </div>
          <div className="divide-y divide-stone-100 dark:divide-ink-wire/50">
            {recentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    )}

    <section className="mx-auto max-w-6xl px-6 pb-phi-2xl">
      <div className="rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent dark:from-accent/15 dark:via-accent/5 dark:to-transparent p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-accent/20 shrink-0">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </span>
              <h2 className="text-lg font-semibold text-stone-900 dark:text-cream">
                Try Zenoh in Your Browser
              </h2>
            </div>
            <p className="text-sm text-stone-600 dark:text-fog leading-relaxed">
              Explore all Zenoh features — publishers, subscribers, queryables, and get operations —
              live in your browser. Open multiple tabs to test cross-instance communication.
            </p>
          </div>
          <a
            href="http://zenoh.corsaro.me:8000/examples/web/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-accent-fg text-sm font-medium hover:bg-accent/90 transition-colors duration-200 shrink-0 whitespace-nowrap"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            Try the Live Web Demo
          </a>
        </div>
      </div>
    </section>
    </>
  );
}

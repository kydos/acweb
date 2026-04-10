import type { Metadata } from "next";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";

const locales = ["en", "fr", "it", "ja", "es", "zh", "ko", "ru"] as const;
const siteUrl = "https://corsaro.me";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "zenoh" });
  return {
    metadataBase: new URL(siteUrl),
    title: t("bookHeading"),
    description: t("bookSubtitle"),
    keywords: [
      "Zenoh book",
      "Zenoh documentation",
      "Zenoh tutorial",
      "Eclipse Zenoh guide",
      "Zenoh Protocol book",
      "pub/sub tutorial",
      "distributed systems protocol guide",
      "ROS 2 middleware tutorial",
      "Zenoh embedded guide",
      "Angelo Corsaro Zenoh",
    ],
    alternates: {
      canonical: `${siteUrl}/${locale}/zenoh/book`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}/zenoh/book`])),
        "x-default": `${siteUrl}/en/zenoh/book`,
      },
    },
    openGraph: {
      title: t("bookHeading"),
      description: t("bookSubtitle"),
      url: `${siteUrl}/${locale}/zenoh/book`,
      type: "book",
    },
  };
}

const zenohBookSchema = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: "The Zenoh Book",
  description:
    "The definitive open-source guide to the Zenoh Protocol — from pub/sub fundamentals to multi-datacenter deployments, embedded systems, and advanced wire-format internals.",
  author: { "@type": "Person", name: "Angelo Corsaro", url: siteUrl },
  publisher: { "@type": "Person", name: "Angelo Corsaro" },
  inLanguage: "en",
  url: `${siteUrl}/en/zenoh/book`,
  about: [
    { "@type": "Thing", name: "Eclipse Zenoh Protocol" },
    { "@type": "Thing", name: "Distributed Systems" },
    { "@type": "Thing", name: "Pub/Sub Messaging" },
    { "@type": "Thing", name: "ROS 2 Middleware" },
  ],
};

const chapters = [
  {
    num: "01",
    slug: "introduction",
    title: "Introduction",
    desc: "What is Zenoh, why it was created, and how it differs from other protocols.",
    sections: ["Overview", "Design goals", "Protocol genealogy"],
  },
  {
    num: "02",
    slug: "getting-started",
    title: "Getting Started",
    desc: "Install Zenoh, run your first session, and exchange your first messages.",
    sections: ["Installation", "Hello Zenoh", "The router", "First pub/sub"],
  },
  {
    num: "03",
    slug: "core-concepts",
    title: "Core Concepts",
    desc: "Understand the fundamental abstractions that make Zenoh unique.",
    sections: ["Key expressions", "Sessions", "Publishers & Subscribers", "Queryables & Replies", "Storages"],
  },
  {
    num: "04",
    slug: "routing",
    title: "Routing & Topology",
    desc: "How Zenoh routes data across arbitrary network topologies without constraints.",
    sections: ["Peer mode", "Client mode", "Router mode", "Multicast scouting"],
  },
  {
    num: "05",
    slug: "security",
    title: "Security",
    desc: "Authentication, encryption, and access control built into the protocol.",
    sections: ["TLS configuration", "Access control lists", "Token-based auth"],
  },
  {
    num: "06",
    slug: "embedded",
    title: "Embedded & Bare-Metal",
    desc: "Running Zenoh on microcontrollers with Zenoh-Pico and the no_std Rust implementation.",
    sections: ["Zenoh-Pico (C)", "Rust no_std", "Embassy async", "FreeRTOS & Zephyr"],
  },
  {
    num: "07",
    slug: "advanced",
    title: "Advanced Topics",
    desc: "Deep dives into wire format, performance tuning, and large-scale deployments.",
    sections: ["Wire format", "Congestion control", "Shared memory", "Multi-datacenter deployments"],
  },
];

export default function ZenohBookPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations("zenoh");

  return (
    <>
      <JsonLd data={zenohBookSchema} />
    <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      {/* Header */}
      <p className="text-sm font-mono uppercase tracking-[0.2em] text-sky dark:text-sky mb-4 animate-fade-in">
        {t("bookBuiltWith")}
      </p>
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 dark:text-cream animate-fade-in">
        {t("bookHeading")}
      </h1>
      <p className="mt-3 text-stone-500 dark:text-fog leading-relaxed max-w-2xl animate-fade-in animate-delay-100">
        {t("bookSubtitle")}
      </p>

      {/* Read online CTA */}
      <div className="mt-8 flex gap-3 flex-wrap animate-fade-in animate-delay-100">
        <Link
          href={`/${locale}/zenoh/book/introduction`}
          className="btn-primary flex items-center gap-2 w-fit"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          {t("bookReadOnline")}
        </Link>
        <a
          href="https://github.com/eclipse-zenoh/zenoh"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost flex items-center gap-2 w-fit"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
          </svg>
          GitHub
        </a>
      </div>

      {/* Table of contents */}
      <div className="mt-14 animate-fade-in animate-delay-200">
        <h2 className="text-xl md:text-2xl font-serif font-semibold mb-6 pb-3 border-b border-stone-200 dark:border-ink-wire text-stone-900 dark:text-cream">
          {t("bookChaptersTitle")}
        </h2>
        <div className="space-y-4">
          {chapters.map((ch) => (
            <Link
              key={ch.num}
              href={`/${locale}/zenoh/book/${ch.slug}`}
              className="group block rounded-xl border border-stone-200 dark:border-ink-wire bg-white dark:bg-ink-card p-5 hover:border-accent dark:hover:border-accent transition-colors duration-200"
            >
              <div className="flex gap-4">
                <span className="shrink-0 font-mono text-2xl font-bold text-accent/30 dark:text-accent/20 leading-none pt-1">
                  {ch.num}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base text-stone-900 dark:text-cream group-hover:text-accent transition-colors">
                    {ch.title}
                  </h3>
                  <p className="mt-1 text-sm text-stone-500 dark:text-fog leading-relaxed">
                    {ch.desc}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {ch.sections.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 text-xs rounded-full bg-stone-100 dark:bg-ink-shell/40 text-stone-600 dark:text-ash"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Note */}
      <div className="mt-10 border-l-4 border-accent bg-accent/5 dark:bg-accent/10 rounded-r-lg p-5 animate-fade-in animate-delay-300">
        <p className="text-sm text-stone-700 dark:text-fog leading-relaxed">
          All code examples use the <strong>Rust API</strong>. Bindings for Python, C, C++, Java, and more are documented at{" "}
          <a
            href="https://zenoh.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            zenoh.io
          </a>.
        </p>
      </div>
    </div>
    </>
  );
}

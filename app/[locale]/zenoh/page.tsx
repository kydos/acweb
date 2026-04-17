import type { Metadata } from "next";
import { Link } from "@/lib/navigation";
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
    title: t("heading"),
    description: t("subtitle"),
    keywords: [
      "Zenoh Protocol",
      "Eclipse Zenoh",
      "Zenoh IoT",
      "Zenoh robotics",
      "Zenoh ROS 2",
      "pub/sub protocol",
      "cloud-to-edge",
      "distributed middleware",
      "edge computing protocol",
      "DDS alternative",
      "ZettaScale",
      "Angelo Corsaro",
      "Zenoh inventor",
      "zero network overhead",
      "Zenoh embedded",
      "Zenoh microcontroller",
      "Zenoh 1.0",
      "Zenoh 2.0",
      "Zenoh wire protocol",
    ],
    alternates: {
      canonical: `${siteUrl}/${locale}/zenoh`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}/zenoh`])),
        "x-default": `${siteUrl}/en/zenoh`,
      },
    },
    openGraph: {
      title: t("heading"),
      description: t("subtitle"),
      url: `${siteUrl}/${locale}/zenoh`,
      type: "website",
    },
  };
}

const zenohProtocolSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Eclipse Zenoh",
  alternateName: ["Zenoh Protocol", "zenoh", "Eclipse Zenoh Protocol"],
  description:
    "Eclipse Zenoh is an open protocol that unifies data in motion (pub/sub), data at rest (distributed queries), and distributed computations across the cloud-to-microcontroller continuum. 5-byte wire overhead, sub-13µs latency, 50 Gbps throughput.",
  applicationCategory: "Communication Protocol",
  operatingSystem: "Any",
  creator: {
    "@type": "Person",
    name: "Angelo Corsaro",
    url: siteUrl,
    jobTitle: "Inventor of the Zenoh Protocol, CEO/CTO of ZettaScale Technology",
  },
  author: { "@type": "Person", name: "Angelo Corsaro", url: siteUrl },
  url: "https://zenoh.io",
  sameAs: [
    "https://github.com/eclipse-zenoh/zenoh",
    "https://www.eclipse.org/zenoh/",
  ],
  license: "https://www.eclipse.org/legal/epl-2.0/",
};

const zenohRepos = [
  {
    name: "eclipse-zenoh/zenoh",
    url: "https://github.com/eclipse-zenoh/zenoh",
  },
  {
    name: "eclipse-zenoh/zenoh-nostd",
    url: "https://github.com/eclipse-zenoh/zenoh-nostd",
  },
];

const topicLinks = [
  {
    href: "/zenoh/ros2",
    title: "Zenoh for ROS 2",
    desc: "How Zenoh helps robot, fleet, edge, and cloud systems communicate beyond a single LAN.",
  },
  {
    href: "/zenoh/dds-alternative",
    title: "Zenoh as a DDS Alternative",
    desc: "A focused comparison for deployments that must span embedded, edge, and cloud infrastructure.",
  },
];

const navCards = [
  {
    href: "/zenoh/report",
    titleKey: "zenohReport" as const,
    descKey: "navCardReportDesc" as const,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3z"
      />
    ),
  },
  {
    href: "/zenoh/papers",
    titleKey: "zenohPapers" as const,
    descKey: "navCardPapersDesc" as const,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
      />
    ),
  },
  {
    href: "/zenoh/book",
    titleKey: "zenohBook" as const,
    descKey: "navCardBookDesc" as const,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
      />
    ),
  },
  {
    href: "/zenoh/talks",
    titleKey: "zenohTalks" as const,
    descKey: "navCardTalksDesc" as const,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
      />
    ),
  },
];

export default function ZenohPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations("zenoh");
  const tn = useTranslations("nav");

  return (
    <>
      <JsonLd data={zenohProtocolSchema} />
    <div>
      {/* Hero */}
      <section className="relative mx-auto max-w-4xl px-6 py-24 md:py-32">
        <p className="text-sm font-mono uppercase tracking-[0.2em] text-sky dark:text-sky mb-4 animate-fade-in">
          Eclipse Zenoh
        </p>
        <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-stone-900 dark:text-cream animate-fade-in">
          {t("heading")}
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-stone-500 dark:text-sand font-light max-w-2xl animate-fade-in animate-delay-100">
          {t("subtitle")}
        </p>
        <p className="mt-6 text-lg text-stone-600 dark:text-fog max-w-2xl leading-relaxed animate-fade-in animate-delay-200">
          {t("tagline")}
        </p>

        {/* GitHub repo links */}
        <div className="mt-6 flex flex-wrap gap-3 animate-fade-in animate-delay-300">
          {zenohRepos.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-stone-200 dark:border-ink-wire bg-stone-50 dark:bg-ink-card text-xs font-mono text-stone-600 dark:text-fog hover:border-azure dark:hover:border-azure hover:text-azure dark:hover:text-sky transition-all duration-200"
            >
              <GitHubIcon />
              {repo.name}
            </a>
          ))}
        </div>

        {/* Live Demo CTA */}
        <div className="mt-10 rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent dark:from-accent/15 dark:via-accent/5 dark:to-transparent p-6 md:p-8 animate-fade-in animate-delay-300">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-accent/20 shrink-0">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </span>
                <h2 className="text-lg font-semibold text-stone-900 dark:text-cream">
                  {t("demoCTAHeading")}
                </h2>
              </div>
              <p className="text-sm text-stone-600 dark:text-fog leading-relaxed">
                {t("demoCTADesc")}
              </p>
            </div>
            <a
              href="http://zenoh.corsaro.me:8000/examples/web/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors duration-200 shrink-0 whitespace-nowrap"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              {t("demoCTAButton")}
            </a>
          </div>
        </div>
      </section>

      {/* Explore nav cards */}
      <section className="border-t border-stone-200 dark:border-ink-wire">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-2xl font-serif font-semibold mb-8 text-stone-900 dark:text-cream">
            {t("exploreTitle")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {navCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group flex items-start gap-4 p-5 rounded-xl border border-stone-200 dark:border-ink-wire bg-white dark:bg-ink-card hover:border-azure dark:hover:border-azure hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-accent/20 transition-colors">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-accent"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    {card.icon}
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-stone-900 dark:text-cream group-hover:text-azure dark:group-hover:text-sky transition-colors">
                    {tn(card.titleKey)}
                  </h3>
                  <p className="mt-1 text-sm text-stone-500 dark:text-fog leading-relaxed">
                    {t(card.descKey)}
                  </p>
                </div>
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 mt-1 shrink-0 text-stone-400 dark:text-ash group-hover:text-azure dark:group-hover:text-sky transition-colors"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </Link>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="font-serif text-xl font-semibold text-stone-900 dark:text-cream">
              Popular Zenoh Topics
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {topicLinks.map((topic) => (
                <Link
                  key={topic.href}
                  href={topic.href}
                  className="group block rounded-lg border border-stone-200 bg-white p-4 transition-colors hover:border-azure dark:border-ink-wire dark:bg-ink dark:hover:border-azure"
                >
                  <h4 className="font-semibold text-stone-900 group-hover:text-azure dark:text-cream dark:group-hover:text-sky">
                    {topic.title}
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-stone-500 dark:text-fog">
                    {topic.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Genesis section */}
      <section className="border-t border-stone-200 dark:border-ink-wire">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-2 text-stone-900 dark:text-cream">
            {t("genesisHeading")}
          </h2>
          <p className="text-sm text-stone-400 dark:text-ash mb-8 italic">
            {t("genesisSubtitle")}
          </p>

          <div className="space-y-6 text-stone-700 dark:text-fog leading-relaxed text-sm md:text-base">
            <p>{t("genesisIntro")}</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-stone-200 dark:border-ink-wire bg-stone-50 dark:bg-ink-card p-5">
                <h3 className="font-semibold text-stone-900 dark:text-cream mb-2">
                  {t("genesisScaleProblemTitle")}
                </h3>
                <p className="text-sm">{t("genesisScaleProblemDesc")}</p>
              </div>
              <div className="rounded-xl border border-stone-200 dark:border-ink-wire bg-stone-50 dark:bg-ink-card p-5">
                <h3 className="font-semibold text-stone-900 dark:text-cream mb-2">
                  {t("genesisTransparencyGapTitle")}
                </h3>
                <p className="text-sm">{t("genesisTransparencyGapDesc")}</p>
              </div>
            </div>

            <p>{t("genesisFrankenstein")}</p>

            <blockquote className="border-l-4 border-accent pl-6 py-1 text-stone-600 dark:text-sand italic">
              &ldquo;{t("genesisQuote")}&rdquo;
              <footer className="mt-2 text-xs not-italic text-stone-400 dark:text-ash">
                — Angelo Corsaro, The Zenoh Report, February 2026
              </footer>
            </blockquote>
          </div>

          {/* Why "Zenoh"? */}
          <div className="mt-10 rounded-xl border border-accent/20 bg-accent/5 dark:bg-accent/10 p-6">
            <h3 className="font-semibold text-accent mb-3 text-lg">
              {t("genesisWhyTitle")}
            </h3>
            <p className="text-sm text-stone-700 dark:text-fog leading-relaxed mb-3">
              {t("genesisWhyText1")}
            </p>
            <p className="text-sm text-stone-700 dark:text-fog leading-relaxed mb-3">
              {t("genesisWhyText2")}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="px-3 py-1.5 rounded-lg bg-accent/10 text-sm font-mono text-accent font-semibold">
                Z·E·N·O·H
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-ink-shell/40 text-sm text-stone-700 dark:text-fog">
                <strong>Ze</strong>ro <strong>N</strong>etwork <strong>O</strong>ver<strong>H</strong>ead
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-ink-shell/40 text-sm text-stone-700 dark:text-fog">
                Zeno of Elea (pre-Socratic)
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-ink-shell/40 text-sm text-stone-700 dark:text-fog">
                Zenon of Citium (Stoic founder)
              </span>
            </div>
            <p className="mt-3 text-xs text-stone-400 dark:text-ash italic">
              {t("genesisWhyFootnote")}
            </p>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="border-t border-stone-200 dark:border-ink-wire">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title={t("feature1Title")}
              desc={t("feature1Desc")}
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                />
              }
            />
            <FeatureCard
              title={t("feature2Title")}
              desc={t("feature2Desc")}
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                />
              }
            />
            <FeatureCard
              title={t("feature3Title")}
              desc={t("feature3Desc")}
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                />
              }
            />
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function FeatureCard({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 text-accent"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          {icon}
        </svg>
      </div>
      <h3 className="font-semibold text-lg text-stone-900 dark:text-cream">{title}</h3>
      <p className="text-sm text-stone-600 dark:text-fog leading-relaxed">{desc}</p>
    </div>
  );
}

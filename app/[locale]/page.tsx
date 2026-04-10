import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/lib/navigation";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  return pageMetadata({
    locale,
    path: "",
    title: siteConfig.siteTitle,
    description: siteConfig.siteDescription,
  });
}

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Angelo Corsaro",
  url: siteConfig.siteUrl,
  image: `${siteConfig.siteUrl}/me.png`,
  jobTitle: "Inventor of the Zenoh Protocol, CEO/CTO of ZettaScale Technology",
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
  worksFor: {
    "@type": "Organization",
    name: "ZettaScale Technology",
    url: "https://zettascale.tech",
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

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations("home");
  const cv = useTranslations("cv");
  const zenoh = useTranslations("zenoh");

  return (
    <>
      <JsonLd data={personSchema} />
      <JsonLd data={websiteSchema} />
    <section className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0">
          <div className="animate-fade-in">
            <p className="text-sm font-mono uppercase tracking-[0.2em] text-sky dark:text-sky mb-4">
              {t("overline")}
            </p>
            <h1 className="whitespace-nowrap text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight leading-none text-stone-900 dark:text-cream">
              {siteConfig.name}
            </h1>
            <p className="mt-5 text-xl md:text-2xl font-light max-w-2xl leading-relaxed text-stone-600 dark:text-sand">
              {t("title")}
            </p>
          </div>

          <p className="mt-8 text-lg max-w-2xl leading-relaxed animate-fade-in animate-delay-100 text-stone-500 dark:text-fog">
            {t("shortBio")}
          </p>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-in animate-delay-200">
            {[
              { value: "100+", label: cv("statPublications") },
              { value: "25+", label: cv("statYearsExperience") },
              { value: "10+", label: cv("statStandards") },
              { value: "1,478+", label: cv("statCitations") },
            ].map((item) => (
              <div
                key={item.label}
                className="flex min-h-[92px] flex-col justify-between border border-stone-200 dark:border-ink-wire bg-white dark:bg-ink-card px-4 py-3 rounded-lg"
              >
                <div className="font-mono text-xl font-bold text-accent">{item.value}</div>
                <div className="mt-1 text-xs leading-tight text-stone-500 dark:text-ash">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4 animate-fade-in animate-delay-300">
            <Link href="/zenoh" className="btn-primary">{zenoh("heading")}</Link>
            <Link href="/cv" className="btn-ghost">{cv("heading")}</Link>
            <Link href="/blog" className="btn-ghost">{t("blogCta")}</Link>
          </div>

          <div className="mt-10 flex items-center gap-5 animate-fade-in animate-delay-400">
            <SocialIcon href={siteConfig.social.github} label="GitHub">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </SocialIcon>
            <SocialIcon href={siteConfig.social.linkedin} label="LinkedIn">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </SocialIcon>
          </div>
        </div>

        <aside className="animate-fade-in animate-delay-200">
          <div className="overflow-hidden rounded-lg border border-stone-200 dark:border-ink-wire bg-white dark:bg-ink-card">
            <Image
              src={siteConfig.profilePhoto}
              alt={siteConfig.name}
              width={680}
              height={680}
              priority
              className="aspect-square w-full object-cover"
            />
            <div className="p-5">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-azure dark:text-sky">
                Eclipse Zenoh
              </p>
              <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-fog">
                {zenoh("tagline")}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["ROS 2", "DDS", "Edge AI", "IoT"].map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-stone-200 dark:border-ink-wire px-2.5 py-1 text-xs text-stone-500 dark:text-ash"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
    </>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-stone-400 dark:text-ash hover:text-accent dark:hover:text-accent hover:scale-110 transition-all duration-200"
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">{children}</svg>
    </a>
  );
}

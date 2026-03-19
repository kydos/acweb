import type { Metadata } from "next";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/lib/siteConfig";

const locales = ["en", "fr", "it", "ja", "es", "zh", "ko", "ru"] as const;
const siteUrl = "https://corsaro.me";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("heading"),
    description:
      "Angelo Corsaro, Ph.D. — inventor of the Zenoh Protocol, expert in distributed systems, robotics middleware (ROS 2), AI infrastructure, and edge computing. CEO/CTO of ZettaScale Technology.",
    keywords: [
      "Angelo Corsaro",
      "Zenoh inventor",
      "Zenoh Protocol creator",
      "ZettaScale CTO",
      "distributed systems expert",
      "ROS 2 middleware",
      "Eclipse Zenoh creator",
      "edge computing",
      "IoT middleware expert",
    ],
    alternates: {
      canonical: `${siteUrl}/${locale}/about`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}/about`])),
        "x-default": `${siteUrl}/en/about`,
      },
    },
  };
}

export default function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations("about");

  return (
    <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <h1 className="text-3xl md:text-4xl font-serif font-bold animate-fade-in
                     text-stone-900 dark:text-cream">
        {t("heading")}
      </h1>

      <div className="mt-10 flex flex-col md:flex-row gap-10 animate-fade-in animate-delay-100">
        <div className="shrink-0">
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden
                          bg-stone-200 dark:bg-ink-card
                          ring-2 ring-stone-200 dark:ring-ink-wire">
            <Image
              src={siteConfig.profilePhoto}
              alt={siteConfig.name}
              width={224}
              height={224}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>

        <div className="space-y-4 leading-relaxed text-stone-600 dark:text-fog">
          {t("bio").split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="mt-16 animate-fade-in animate-delay-200">
        <h2 className="text-2xl font-serif font-semibold mb-6 text-stone-900 dark:text-cream">
          {t("areasTitle")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(["distributedSystems", "edgeComputing", "robotics", "openSource"] as const).map((key) => (
            <div
              key={key}
              className="p-5 rounded-xl
                         border border-stone-200 dark:border-ink-wire
                         bg-white dark:bg-ink-card
                         hover:-translate-y-0.5 hover:border-azure dark:hover:border-azure
                         transition-all duration-200"
            >
              <h3 className="font-semibold mb-1 text-stone-800 dark:text-cream">
                {t(`areas.${key}.title`)}
              </h3>
              <p className="text-sm text-stone-500 dark:text-fog">
                {t(`areas.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

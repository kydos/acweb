import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

const locales = ["en", "fr", "it", "ja", "es", "zh", "ko", "ru"] as const;
const siteUrl = "https://corsaro.me";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "zenoh" });
  return {
    title: t("talksHeading"),
    description:
      "Conference talks, keynotes, and presentations on the Zenoh Protocol by Angelo Corsaro — inventor of Zenoh and CEO/CTO of ZettaScale Technology.",
    keywords: [
      "Zenoh talks",
      "Zenoh presentations",
      "Zenoh conference",
      "Angelo Corsaro talks",
      "Eclipse Zenoh keynote",
      "Zenoh Protocol video",
      "ZettaScale",
    ],
    alternates: {
      canonical: `${siteUrl}/${locale}/zenoh/talks`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}/zenoh/talks`])),
        "x-default": `${siteUrl}/en/zenoh/talks`,
      },
    },
  };
}

export default function ZenohTalksPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations("zenoh");

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 dark:text-cream">
        {t("talksHeading")}
      </h1>
      <div className="mt-10 rounded-xl border border-stone-200 dark:border-ink-wire bg-stone-50 dark:bg-ink-card p-6">
        <h2 className="font-semibold text-stone-900 dark:text-cream">{t("comingSoonTitle")}</h2>
        <p className="mt-2 text-sm text-stone-600 dark:text-fog leading-relaxed">{t("comingSoonDesc")}</p>
      </div>
    </div>
  );
}

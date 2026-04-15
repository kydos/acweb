import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProtectedEmailCard } from "@/components/ProtectedEmailCard";
import { siteConfig } from "@/lib/siteConfig";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return pageMetadata({
    locale,
    path: "/contact",
    title: t("heading"),
    description:
      "Contact Angelo Corsaro through LinkedIn, GitHub, and a protected email channel.",
  });
}

export default function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations("contact");
  const { social, contact } = siteConfig;

  const links = [
    { label: "GitHub",   href: social.github,   description: t("github") },
    { label: "LinkedIn", href: social.linkedin,  description: t("linkedin") },
    { label: t("bookMeeting"), href: contact.calendlyUrl, description: t("bookMeetingDesc") },
  ];

  return (
    <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <h1 className="text-3xl md:text-4xl font-serif font-bold animate-fade-in
                     text-stone-900 dark:text-cream">
        {t("heading")}
      </h1>
      <p className="mt-3 max-w-lg animate-fade-in animate-delay-100
                    text-stone-500 dark:text-fog">
        {t("subtitle")}
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 animate-fade-in animate-delay-200">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-xl
                       border border-stone-200 dark:border-ink-wire
                       bg-white dark:bg-ink-card
                       hover:border-azure dark:hover:border-azure
                       hover:shadow-sm hover:-translate-y-0.5
                       transition-all duration-200"
          >
            <h2 className="font-semibold
                           text-stone-800 dark:text-cream
                           group-hover:text-azure dark:group-hover:text-sky
                           transition-colors">
              {link.label}
            </h2>
            <p className="mt-1 text-sm text-stone-500 dark:text-ash">
              {link.description}
            </p>
          </a>
        ))}
        <ProtectedEmailCard />
      </div>
    </section>
  );
}

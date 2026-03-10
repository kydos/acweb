import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/siteConfig";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contact");
  return {
    title: t("heading"),
    description: `${t("heading")} — ${siteConfig.name}`,
  };
}

export default function ContactPage() {
  const t = useTranslations("contact");
  const { social } = siteConfig;

  const links = [
    { label: "GitHub",   href: social.github,   description: t("github") },
    { label: "LinkedIn", href: social.linkedin,  description: t("linkedin") },
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

      <div className="mt-10 grid gap-4 sm:grid-cols-2 animate-fade-in animate-delay-200">
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
      </div>
    </section>
  );
}

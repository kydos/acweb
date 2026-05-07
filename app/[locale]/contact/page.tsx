import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProtectedEmailCard } from "@/components/ProtectedEmailCard";
import { ContactLink } from "@/components/ContactLink";
import { siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/JsonLd";
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

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Angelo Corsaro",
  url: `${siteConfig.siteUrl}/en/contact/`,
  mainEntity: {
    "@type": "Person",
    name: "Angelo Corsaro",
    url: siteConfig.siteUrl,
    sameAs: [siteConfig.social.github, siteConfig.social.linkedin],
  },
};

export default function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations("contact");
  const { social, contact } = siteConfig;

  const links = [
    { label: "GitHub",   href: social.github,   description: t("github"),          contactType: "github"   as const },
    { label: "LinkedIn", href: social.linkedin,  description: t("linkedin"),         contactType: "linkedin" as const },
    { label: t("bookMeeting"), href: contact.calendlyUrl, description: t("bookMeetingDesc"), contactType: "calendly" as const },
  ];

  return (
    <>
      <JsonLd data={contactPageSchema} />
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
          <ContactLink
            key={link.label}
            href={link.href}
            label={link.label}
            description={link.description}
            contactType={link.contactType}
          />
        ))}
        <ProtectedEmailCard />
      </div>
    </section>
    </>
  );
}

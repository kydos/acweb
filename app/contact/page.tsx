import type { Metadata } from "next";
import { ProtectedEmailCard } from "@/components/ProtectedEmailCard";
import { ContactLink } from "@/components/ContactLink";
import { siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/JsonLd";
import { PageShell, PageHeader, RelatedLinks } from "@/components/PageShell";
import { pageMetadata, canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/contact",
  title: "Get in Touch",
  description:
    "Contact Angelo Corsaro — inventor of the Zenoh Protocol. Available for speaking, collaboration, open source, and professional opportunities.",
});

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Angelo Corsaro",
  url: canonicalUrl("/contact"),
  mainEntity: {
    "@type": "Person",
    name: "Angelo Corsaro",
    url: canonicalUrl(""),
    sameAs: [siteConfig.social.github, siteConfig.social.linkedin],
  },
};

export default function ContactPage() {
  const { social, contact } = siteConfig;

  const links = [
    { label: "GitHub", href: social.github, description: "Open source projects and contributions", contactType: "github" as const },
    { label: "LinkedIn", href: social.linkedin, description: "Use LinkedIn for professional and collaboration opportunities", contactType: "linkedin" as const },
    { label: "Book a Meeting", href: contact.calendlyUrl, description: "Use Calendly to schedule a 30-minute meeting.", contactType: "calendly" as const },
  ];

  return (
    <>
      <JsonLd data={contactPageSchema} />
    <PageShell>
      <PageHeader
        title="Get in Touch"
        lede="I'm always happy to connect — whether it's about distributed systems, professional opportunities, collaboration, open source, or speaking."
      />

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

      <RelatedLinks
        links={[
          { label: "About", href: "/about", desc: "Background, career, and areas of interest." },
          { label: "Curriculum Vitae", href: "/cv", desc: "Publications, standards work, and recognition." },
        ]}
      />
    </PageShell>
    </>
  );
}

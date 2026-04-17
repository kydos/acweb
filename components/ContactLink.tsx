"use client";

import { trackContactAction, type ContactType } from "@/lib/analytics";

interface ContactLinkProps {
  href: string;
  label: string;
  description: string;
  contactType: ContactType;
}

/**
 * Outbound contact link that fires a GA4 contact_action event on click.
 * Drop-in replacement for the plain <a> tags on the contact page.
 */
export function ContactLink({
  href,
  label,
  description,
  contactType,
}: ContactLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackContactAction(contactType)}
      className="group p-6 rounded-xl
                 border border-stone-200 dark:border-ink-wire
                 bg-white dark:bg-ink-card
                 hover:border-azure dark:hover:border-azure
                 hover:shadow-sm hover:-translate-y-0.5
                 transition-all duration-200"
    >
      <h2
        className="font-semibold
                   text-stone-800 dark:text-cream
                   group-hover:text-azure dark:group-hover:text-sky
                   transition-colors"
      >
        {label}
      </h2>
      <p className="mt-1 text-sm text-stone-500 dark:text-ash">{description}</p>
    </a>
  );
}

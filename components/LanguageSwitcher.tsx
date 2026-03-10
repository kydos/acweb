"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/lib/navigation";
import { useTransition } from "react";

const locales = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "it", label: "Italiano" },
  { code: "ja", label: "日本語" },
  { code: "es", label: "Español" },
  { code: "zh", label: "中文" },
  { code: "ko", label: "한국어" },
  { code: "ru", label: "Русский" },
] as const;

export function LanguageSwitcher() {
  const t = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onLocaleChange(newLocale: string) {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  }

  return (
    <div className="relative">
      <select
        value={locale}
        onChange={(e) => onLocaleChange(e.target.value)}
        disabled={isPending}
        aria-label={t("language")}
        className="appearance-none bg-transparent border border-ink-wire rounded-md pl-8 pr-6 py-1.5
                   text-sm text-sand hover:text-cream
                   hover:bg-ink-card transition-colors cursor-pointer
                   focus:outline-none focus:ring-1 focus:ring-azure
                   disabled:opacity-50"
      >
        {locales.map(({ code, label }) => (
          <option key={code} value={code} className="bg-ink-card text-cream">
            {label}
          </option>
        ))}
      </select>
      {/* Globe icon */}
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-ash pointer-events-none"
        fill="none" stroke="currentColor" strokeWidth="1.5"
      >
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
      {/* Chevron */}
      <svg
        viewBox="0 0 24 24"
        className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 text-ash pointer-events-none"
        fill="none" stroke="currentColor" strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}

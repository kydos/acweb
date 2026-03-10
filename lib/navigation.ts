import { createNavigation } from "next-intl/navigation";

export const locales = ["en", "fr", "it", "ja", "es", "zh", "ko", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const localePrefix = "always" as const;

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales,
  localePrefix,
});

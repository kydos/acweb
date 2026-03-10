import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale, localePrefix } from "./lib/navigation";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
  localeDetection: false,
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'fr', 'it', 'ja', 'es', 'zh', 'ko', 'ru'],
  defaultLocale: 'en',
  localeDetection: false,
  localePrefix: 'as-needed',
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};

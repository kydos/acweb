/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./i18n.ts');

// Static export is required for GitHub Pages (generates ./out).
// It must be OFF in dev because it disables middleware (breaks next-intl routing).
const isStaticExport = process.env.STATIC_EXPORT === 'true';

module.exports = withNextIntl({
  ...(isStaticExport ? { output: 'export', trailingSlash: true } : {}),
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
});

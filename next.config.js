/** @type {import('next').NextConfig} */

// Static export is required for GitHub Pages (generates ./out).
const isStaticExport = process.env.STATIC_EXPORT === 'true';

module.exports = {
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
};

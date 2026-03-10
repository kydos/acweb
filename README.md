# acweb

Personal website for [Angelo Corsaro](https://angelocorsaro.com) — inventor of the Zenoh Protocol and distributed systems expert.

## Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v3
- **Content:** MDX via `next-mdx-remote`
- **Theming:** Dark/light mode via `next-themes`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
/app          — Pages (home, about, cv, blog, opensource, contact)
/components   — UI components (Header, Footer, ThemeToggle, etc.)
/content/blog — MDX blog posts with frontmatter
/lib          — Utilities and configuration
  siteConfig.ts — Single source of truth for all personal info
  mdx.ts        — Blog post parsing
  github.ts     — GitHub API integration
```

## Configuration

All personal info, social links, nav links, CV data, and featured repos are in `lib/siteConfig.ts`. Edit that file rather than hardcoding values in pages.

## Content

**Blog posts** are `.mdx` files in `/content/blog` with frontmatter:

```mdx
---
title: "Post Title"
date: "2024-01-01"
excerpt: "Short description"
tags: ["tag1", "tag2"]
---

Post content here...
```

**Open Source page** fetches live data from the GitHub API for repos listed in `siteConfig.featuredRepos`. Results are cached for 1 hour.

## Assets

Place the following in `/public`:
- `photo.jpg` — Profile photo
- `resume.pdf` — CV/resume download
- `og-image.png` — Open Graph image

## Static Export & GitHub Pages

### 1. Enable static export

Add `output: 'export'` to `next.config.js`:

```js
module.exports = withNextIntl({
  output: 'export',
  // If hosting at a subpath (e.g. username.github.io/acweb), also add:
  // basePath: '/acweb',
  images: { ... },
});
```

> **Note:** With static export the GitHub API (Open Source page) is fetched at build time and baked into the HTML. Data will not refresh until the next build.

### 2. Generate the static output

```bash
npm run build
```

Next.js writes all static files to the `out/` directory.

### 3. Deploy to GitHub Pages

#### Option A — GitHub Actions (recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deploy.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out
      - id: deploy
        uses: actions/deploy-pages@v4
```

Then in the repository go to **Settings → Pages** and set the source to **GitHub Actions**.

Every push to `main` will trigger a build and deploy automatically.

#### Option B — Manual push to `gh-pages` branch

```bash
npm run build
npx gh-pages -d out
```

In the repository go to **Settings → Pages** and set the source branch to `gh-pages`, folder `/`.

### Custom domain

Add a `CNAME` file to `/public` containing your domain:

```
angelocorsaro.com
```

This ensures the file is copied to `out/CNAME` during the build, which GitHub Pages uses to configure the custom domain.

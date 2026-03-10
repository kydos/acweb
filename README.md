# acweb

Personal website for [Angelo Corsaro](https://corsaro.me) — inventor of the Zenoh Protocol and distributed systems expert.

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

## Deployment

The site is deployed to **GitHub Pages** at [corsaro.me](https://corsaro.me) via the `.github/workflows/deploy.yml` workflow.

Every push to `main` automatically:
1. Builds the static site (`npm run build` → `out/`)
2. Commits the contents of `out/` to the `gh-pages` branch
3. GitHub Pages serves the `gh-pages` branch at `corsaro.me`

### GitHub Pages setup (one-time)

In the repository go to **Settings → Pages** and set:
- **Source:** Deploy from a branch
- **Branch:** `gh-pages` / `/ (root)`

### Local static build

```bash
npm run build   # output in ./out
```

> **Note:** With static export the GitHub API (Open Source page) is fetched at build time. Data will not refresh until the next build.

### Custom domain

The `public/CNAME` file contains `corsaro.me` and is automatically included in the build output. DNS must point to GitHub Pages:

| Type | Name | Value |
|------|------|-------|
| `A` | `@` | `185.199.108.153` |
| `A` | `@` | `185.199.109.153` |
| `A` | `@` | `185.199.110.153` |
| `A` | `@` | `185.199.111.153` |
| `CNAME` | `www` | `kydos.github.io` |

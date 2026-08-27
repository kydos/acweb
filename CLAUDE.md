# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website for Angelo Corsaro — inventor of the Zenoh Protocol and distributed systems expert.
Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and MDX. **English only** — the site
served eight locales via `next-intl` until August 2026; see "URL history" below.

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build (no static export)
- `npm run export` — Static export to `./out` **plus** the legacy redirect stubs. This is what CI runs.
- `npm run start` — Serve production build
- `npm run lint` — Run ESLint

## Architecture

**Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS v3, next-themes (dark/light),
next-mdx-remote/rsc (MDX rendering)

**Key directories:**
- `/app` — All routes. Top-level sections: home, about, cv, blog, opensource, contact, zenoh
- `/app/zenoh` — Zenoh hub plus book, papers, report, talks, ros2, dds-alternative
- `/content/blog` — MDX posts with gray-matter frontmatter (title, date, excerpt, tags)
- `/book/src` — Markdown source for the Zenoh Book, rendered by `/app/zenoh/book/[...slug]`
- `/components` — UI components
- `/lib` — `siteConfig.ts`, `seo.ts`, `mdx.ts`, `bookNav.ts`, `github.ts`, `utils.ts`, `analytics.ts`
- `/scripts` — Build-time helpers

### Single sources of truth

Do not hardcode these anywhere else:

- **`lib/siteConfig.ts`** — personal info, social links, nav links, CV data, featured repos, stats.
  The header nav, the footer columns, and the home-page stat tiles all derive from it.
- **`lib/seo.ts`** — every canonical URL, sitemap entry, and JSON-LD `url` must go through
  `canonicalUrl()` or `absoluteUrl()`. `next.config.js` sets `trailingSlash: true`, so the site
  serves `/about/`; `canonicalUrl()` is what keeps metadata from drifting off by a slash and
  costing a 301 on every crawl.
- **`pageMetadata()`** — use it for page metadata rather than hand-rolling a `Metadata` object.
  Note that a page-level `alternates` **replaces** the layout's, which is why `pageMetadata()`
  re-declares the RSS `types` entry.

### Shared layout primitives

`components/PageShell.tsx` exports `PageShell`, `PageHeader`, `Breadcrumbs`, and `RelatedLinks`.
Use them instead of re-writing the container/heading markup:

- `PageShell` owns the one container width (`max-w-5xl`; `narrow` for articles). The header and
  footer use the same width so every left edge lines up.
- `Breadcrumbs` renders the visible trail **and** the matching `BreadcrumbList` JSON-LD from one
  input, so the structured data can't describe navigation the reader cannot see.
- `RelatedLinks` is the "keep reading" rail. Every page should offer somewhere to go next — no
  page should be a link dead end.

### Spacing: the φ scale

`tailwind.config.js` defines a golden-ratio spacing scale — `phi-xs` 10px, `phi-sm` 16,
`phi-md` 26, `phi-lg` 42, `phi-xl` 68, `phi-2xl` 110 — each step ×1.618 from a 16px base.
**Use these for vertical rhythm** (page padding, gaps between major blocks, section margins)
rather than picking Tailwind's default steps per component; the point is that spacing
compounds consistently down the page. Tailwind's own scale is still fine for small
component-internal padding.

The hero grid uses `grid-cols-hero-phi`: at the 1152px shell the content box is 1104px, so a
`phi-lg` gutter leaves 1062px split φ:1 as 656/406. It engages at `min-[1152px]` rather than
`lg`, because below that the content box is narrower than 1104px and the hero's CTA row
(~599px) no longer fits beside the rail.

Breadcrumbs are for pages **two or more levels deep** only. On a top-level page a
"Home / About" trail is decoration costing ~32px above every heading. `Breadcrumbs` emits the
visible trail and the JSON-LD together, so omitting `trail` correctly drops both.

`components/MdxComponents.tsx` holds the MDX table styling and `rehype-pretty-code` options shared
by the blog and the book.

**Blog:** `.mdx` files in `/content/blog`, parsed at build time by `lib/mdx.ts`. Tags in frontmatter
generate `/blog/tag/[tag]` archives automatically. `lib/mdx.ts` exposes `PostSummary` (a post without
its body) — **pass summaries to client components**, never full posts, or every article's MDX source
is serialised into the page payload.

**RSS:** `/app/feed.xml/route.ts`, a `force-static` route handler exported as a file.

**Open Source page:** live repo data from the GitHub API via `lib/github.ts`, cached 1 hour.

**Fonts:** Inter (sans), Lora (serif/headings), JetBrains Mono (code), `latin` subset only.

**Theming:** `next-themes`, `class` strategy, system preference enabled with dark as the fallback.

Dark-mode surfaces are separated by their **border**, not their fill — `ink-card` sits only 1.08
against `ink`, much as white sits 1.04 against `stone-50` in light mode. So the hairline colour is
what makes a box visible, and a hairline needs a *higher* numeric contrast in dark mode than in
light to read the same: WCAG's ratio understates how weak a thin line looks at low luminance.
`ink-wire` (static outlines) is tuned to ~1.40 against `ink-card`, just under `ink-shell` (~1.55),
which is reserved for interactive outlines so buttons stay the stronger cue. Check both themes
before changing either value.
The header is deliberately always dark, so anything inside it (e.g. `ThemeToggle`) must use the
`ink`/`sand`/`cream` palette rather than theme-reactive `stone`/`neutral` classes.

## URL history — important

The site served eight locale prefixes (`/en/`, `/fr/`, `/it/`, `/ja/`, `/es/`, `/zh/`, `/ko/`, `/ru/`)
until August 2026. Body content was English in every locale, so the prefixes were producing ~370
duplicate URLs. They were removed; `/en/about/` is now `/about/`.

`scripts/generate-locale-redirects.mjs` runs after every export and mirrors each route under all
eight retired prefixes as a canonical + meta-refresh stub. GitHub Pages cannot issue real 301s, so
these stubs are the redirect mechanism. The script derives routes from `out/` — it needs no
maintenance when pages are added or removed.

Once Search Console shows the new URLs fully indexed (roughly a year), the script and its workflow
step can be deleted.

## Deployment

GitHub Pages, via `.github/workflows/` on push to `main`. `CNAME` pins `corsaro.me`.
There is no server-side redirect capability — anything redirect-shaped must be generated into `out/`.

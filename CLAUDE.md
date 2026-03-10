# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website for Angelo Corsaro — inventor of the Zenoh Protocol and distributed systems expert. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and MDX.

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run start` — Serve production build
- `npm run lint` — Run ESLint

## Architecture

**Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS v3, next-themes (dark/light mode), next-mdx-remote/rsc (MDX rendering)

**Key directories:**
- `/app` — All pages using App Router (home, about, cv, blog, opensource, contact)
- `/content/blog` — MDX blog post files with frontmatter (title, date, excerpt, tags)
- `/components` — UI components (Header, Footer, ThemeToggle, ProjectCard, BlogCard, ThemeProvider)
- `/lib` — Utilities: `siteConfig.ts` (central config), `mdx.ts` (post parsing), `github.ts` (GitHub API), `utils.ts`

**Configuration:** All personal info, social links, nav links, CV data, and featured repos are in `lib/siteConfig.ts`. This is the single source of truth — update it instead of hardcoding values in pages.

**Blog:** Posts are `.mdx` files in `/content/blog` with gray-matter frontmatter. Parsed at build time by `lib/mdx.ts`. Rendered server-side using `next-mdx-remote/rsc` (RSC-compatible, no client wrapper needed).

**Open Source page:** Fetches live repo data (stars, forks, description, topics) from GitHub API via `lib/github.ts`. Repos to display are configured in `siteConfig.featuredRepos`. Results are cached for 1 hour via Next.js `fetch` revalidation.

**Fonts:** Inter (sans), Lora (serif/headings), JetBrains Mono (code) via `next/font/google`. CSS variables: `--font-inter`, `--font-lora`, `--font-jetbrains`.

**Theming:** Dark/light mode via `next-themes` with `class` strategy. Accent color defined in `tailwind.config.ts` as `accent` / `accent-dark`.

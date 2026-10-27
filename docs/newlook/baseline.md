# New Look — Lighthouse baseline

Measured on 2026-10-27 against `npm run export` output, served locally with gzip
(GitHub Pages compresses, so serving uncompressed understated mobile performance by
~20 points). Lighthouse 12, Chrome headless, default throttling for each preset.
Numbers are single runs; expect ±2 on Performance between runs.

## Before (main @ 5c856572)

| Page | Preset | Perf | A11y | BP | SEO | LCP | CLS | TBT | Failing audits |
|---|---|---|---|---|---|---|---|---|---|
| `/` | mobile | 97 | 96 | 96 | 100 | 2.7 s | 0 | 30 ms | color-contrast, errors-in-console |
| `/` | desktop | 100 | 96 | 100 | 100 | 0.6 s | 0 | 0 ms | color-contrast |
| `/blog/clock-synchronization/` | mobile | 96 | 96 | 100 | 100 | 2.7 s | 0 | 80 ms | color-contrast |
| `/blog/clock-synchronization/` | desktop | 100 | 96 | 100 | 100 | 0.7 s | 0 | 0 ms | color-contrast |
| `/zenoh/` | mobile | 97 | 96 | 100 | 100 | 2.6 s | 0 | 10 ms | color-contrast |
| `/zenoh/` | desktop | 100 | 96 | 100 | 100 | 0.5 s | 0 | 0 ms | color-contrast |

Observations:

- On mobile the LCP element is the "AC" wordmark in the header, not the page heading.
- Every page loses 4 accessibility points to `color-contrast`.

Screenshots: `docs/newlook/before/` — `{home,post,zenoh}-{390,1280}-{dark,light}.jpg`
(full page) and `home-*-fold.jpg` (first viewport only).

## After (feature/newlook)

Same method, same machine, same server.

| Page | Preset | Perf | A11y | BP | SEO | LCP | CLS | TBT | Failing audits |
|---|---|---|---|---|---|---|---|---|---|
| `/` | mobile | 97 | **100** | **100** | 100 | 2.6 s | 0 | 10–50 ms | — |
| `/` | desktop | 100 | **100** | 100 | 100 | 0.5 s | 0 | 0 ms | — |
| `/blog/clock-synchronization/` | mobile | 96 | **100** | 100 | 100 | 2.9 s | 0 | 30 ms | — |
| `/blog/clock-synchronization/` | desktop | 100 | **100** | 100 | 100 | 0.6 s | 0 | 0 ms | — |
| `/zenoh/` | mobile | 97 | **100** | 100 | 100 | 2.6 s | 0 | 10 ms | — |
| `/zenoh/` | desktop | 100 | **100** | 100 | 100 | 0.5 s | 0 | 0 ms | — |

`/` mobile was run twice (97 / 97), and three more times after the headline change (95 / 97 / 97). Targets — Perf ≥ 95, A11y = 100, BP ≥ 95, SEO = 100 — are met.

## Other checks

| Check | Result |
|---|---|
| LCP element on `/` | Desktop: the hero headline. Mobile: the supporting paragraph — after the switch to the one-line "Making Things Talk" headline, five lines of 18px text cover more of a 390px screen than one line of 38px serif (before: the header "AC" wordmark). Both are server-rendered text; mobile LCP is unchanged at 2.6 s. |
| CLS | 0 on every page measured. |
| Firefly Sync cost | rAF callback p95 **0.6 ms**, max 1.2 ms at 1280px (120 dots); p95 0.2 ms at 390px (60 dots); Chrome with **4× CPU throttle** on an Apple-silicon Mac — an emulation of mid-range mobile, not a real device. Chunk: 3.4 KB raw, **1.7 KB gzipped**. |
| Animation pauses | 0 rAF callbacks while the hero is scrolled off screen. |
| Reduced motion | 0 rAF callbacks; one static synchronised frame is drawn. |
| Sync actually happens | Lit-pixel count over 2.5 s: 127–285 (steady) at t≈0, 0–1158 (pulsing every ~2 s) at t≈12 s. |
| Structured data | validator.schema.org: 0 errors, 0 warnings on `/`, `/about/`, a post, `/zenoh/`, `/zenoh/ros2/`. (Google's Rich Results Test needs a public URL — run it after deploy.) |
| Headings | Every exported page has exactly one `<h1>`; footer columns are no longer `<h2>`. |
| axe-core WCAG 2.2 AA, light + dark, 16 pages | Clean, except Shiki's github-light syntax colours in code blocks (4.2–4.4:1) — pre-existing, deferred. |
| Keyboard | Focus order follows the page (skip link → header → hero → proof strip → Zenoh → writing → footer); every stop shows the 2px accent ring in both themes. |
| 320px | No horizontal scroll on any of the 77 exported routes. |

Screenshots: `docs/newlook/after/`, same names as `before/`.

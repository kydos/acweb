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

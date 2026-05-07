# Website Improvement Plan — corsaro.me

Status legend: ✅ Done | 🔲 Todo

---

## Phase 1 — Fill the content that already has a home ✅ Done

| # | Task | Status |
|---|------|--------|
| 1.1 | Populate Zenoh Talks page — now 10 entries: keynotes section (DSN 2025, DSD 2025, ROSCon India 2024 & 2025) + conference section (ROSConFR 2025 ROS-Z, DSD 2023, WF-IoT 2023, MobiCom 2021, QRS 2021, CIoT 2018) | ✅ |
| 1.2 | Open Source page: fog05, Cyclone DDS, zenoh-dissector, zenoh-nostd, awesome-zenoh | ✅ |
| 1.3 | Blog posts: 3 published (clock-sync, why-zenoh, ros2-rmw-zenoh-selection), 2 drafts (zenoh-vs-mqtt, zenoh-vs-dds) | ✅ |

---

## Phase 2 — Enrich existing pages ✅ Done

| # | Task | Status |
|---|------|--------|
| 2.1 | About page rewrite — full career narrative (inventor+executive framing, ZettaScale exit Apr 2026, most-recent-first career tour) + `ProfilePage` JSON-LD + H1 updated in all 8 locales | ✅ |
| 2.2 | "Featured In" press strip on home page — 6 outlets (Electronic Design, Robot Report, All About Circuits, Connected World, IoT Now, Eclipse Foundation) in `siteConfig.pressMedia` | ✅ |
| 2.3 | Zenoh Report: "Subscribe via email" mailto button added; stale ZettaScale keyword removed | ✅ |
| 2.4 | Homepage title updated to full SEO descriptor; `siteShortTitle` added for page title templates (`%s \| Angelo Corsaro`) | ✅ |
| 2.5 | Profile image intrinsic dimensions corrected 680×680 → 802×786 | ✅ |
| 2.6 | `<link rel="sitemap">` added to locale layout `<head>`; title template updated to use `siteShortTitle` | ✅ |
| 2.7 | Zenoh page layout redesign — tighter hero padding, 4-metric performance strip (sub-13µs / 50 Gbps / 5 bytes / 32 KB), compact demo CTA strip, Genesis section moved above nav cards, nav cards consolidated from 4+2 grids to single 6-card grid (added ROS 2 and DDS Alternative), border separators softened | ✅ |
| 2.8 | Site-wide profile positioning — home overline ("Protocol Inventor & Technology Executive"), headline ("Inventor, Implementor & Industry Driver"), `siteDescription` updated to foreground inventor+CEO/CTO duality | ✅ |
| 2.9 | Coupling Clocks blog: scientific review against IEEE TPDS 2009 paper — 8 corrections (title, author names, K_i value, update rule, SE/SP definitions, churn figure, mean vs. median claim, convergence target) | ✅ |
| 2.10 | ZettaScale exit (April 2026) reflected across site — CV period, siteConfig experience description, About bio, CV position ("Exploring Next Venture") | ✅ |

---

## Phase 3 — Structural improvements ✅ Done

### 3.1 — "Latest from the Blog" section on home page ✅

**File:** `app/[locale]/page.tsx`

Make the page async and import `getAllPosts` from `lib/mdx.ts`. Render the 2–3 most recent non-draft posts as cards between the "Featured In" strip and the demo CTA. Use the existing `BlogCard` component.

```tsx
// Convert to async server component:
const posts = (await getAllPosts()).slice(0, 3);
// Render using <BlogCard> for each post
```

Also update `app/[locale]/blog/page.tsx`:
- Add `Blog` + `BlogPosting` JSON-LD, generated dynamically from `getAllPosts()`
- Add a subtitle below the H1: "Writing on Zenoh, distributed systems, and robotics"

*Note: 3 posts are currently published (clock-sync, why-zenoh, ros2-rmw-zenoh-selection) — enough to populate the strip immediately.*

---

### 3.2 — CV anchor navigation ✅

**File:** `app/[locale]/cv/page.tsx`

Add `id` attributes to each section heading and a sticky or top-of-page jump-nav with links:
Experience | Education | Key Contributions | Publications | Standards | Recognition

Also add `Person` JSON-LD schema:
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Angelo Corsaro",
  "honorificSuffix": "Ph.D.",
  "url": "https://corsaro.me",
  "image": "https://corsaro.me/me.png",
  "jobTitle": "Eclipse Zenoh Project Lead",
  "alumniOf": { "@type": "CollegeOrUniversity", "name": "Washington University in St. Louis" },
  "sameAs": ["https://github.com/kydos", "https://linkedin.com/in/corsaro"],
  "award": ["Technology CEO of the Year 2024", "Genius Minds 2024"],
  "knowsAbout": ["Distributed Systems", "Zenoh Protocol", "ROS 2", "DDS", "Real-Time Systems", "Edge Computing", "IoT", "Protocol Design"]
}
```

*Note: Do NOT include `worksFor` — Angelo is no longer at ZettaScale.*

---

### 3.3 — "Community & Ecosystem" section on Zenoh page ✅

**File:** `app/[locale]/zenoh/page.tsx`

Add a section (after the feature grid or between Genesis and Explore) listing publicly known Zenoh adopters:
- **Automotive:** General Motors (uProtocol), Bosch, Volvo, Foxconn
- **Robotics:** ROS 2 TSC official DDS alternative
- **Aerospace / Industrial:** SELEX-ES / Finmeccanica heritage; safety-critical deployments
- **Edge / Cloud:** Eclipse Foundation projects

Source from public announcements and the ROS TSC discourse post.

---

### 3.4 — Internal links within published blog posts + ContactPage schema ✅

**Files:** `content/blog/clock-synchronization.mdx`, `app/[locale]/blog/[slug]/page.tsx`, `app/[locale]/contact/page.tsx`

For the Coupling Clocks post (currently the only fully published non-stub post):
- Link "distributed systems" references to `/zenoh/`
- Link the paper PDF reference to `/papers/clock-sync-tpds09.pdf`
- Add a "Related" section at the bottom linking to Zenoh overview and the Zenoh Papers page

When the Zenoh vs MQTT and Zenoh vs DDS drafts are published, add:
- MQTT post: links to `/zenoh/`, `/zenoh/ros2/`
- DDS post: links to `/zenoh/`, `/zenoh/dds-alternative/`

Also add `ContactPage` JSON-LD to `app/[locale]/contact/page.tsx`:
```json
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Angelo Corsaro",
  "url": "https://corsaro.me/en/contact/",
  "mainEntity": {
    "@type": "Person",
    "name": "Angelo Corsaro",
    "url": "https://corsaro.me",
    "sameAs": ["https://github.com/kydos", "https://linkedin.com/in/corsaro"]
  }
}
```

---

## Phase 4 — New additions (higher effort)

### 4.1 — Breadcrumb schema for Zenoh Book pages 🔲

**File:** `app/[locale]/zenoh/book/[...slug]/page.tsx`

Add `BreadcrumbList` JSON-LD generated from the current path:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home",       "item": "https://corsaro.me/en/" },
    { "@type": "ListItem", "position": 2, "name": "Zenoh",      "item": "https://corsaro.me/en/zenoh/" },
    { "@type": "ListItem", "position": 3, "name": "Zenoh Book", "item": "https://corsaro.me/en/zenoh/book/" },
    { "@type": "ListItem", "position": 4, "name": "<page title>", "item": "https://corsaro.me<current path>" }
  ]
}
```

---

### 4.2 — Upcoming talks / speaking calendar 🔲

**File:** `app/[locale]/zenoh/talks/page.tsx` + `lib/siteConfig.ts`

Add an "Upcoming" section at the top of the talks page for confirmed future events. Maintain as an `upcomingTalks` array in `siteConfig.ts`:
```ts
upcomingTalks: [
  { title: "...", event: "...", date: "...", location: "...", url: "..." },
]
```
Render as a compact highlighted strip above the Keynotes section. Hide section entirely when the array is empty.

*Note: Past talks are now well-covered (10 entries). This adds forward-looking visibility.*

---

### 4.3 — Teaching & Mentoring page 🔲

**File:** New `app/[locale]/teaching/page.tsx` + nav entry in `lib/siteConfig.ts`

Content:
- ESIEE Paris: IoT and Functional Programming courses (2016–2022), member of Conférence des Grandes Écoles
- Ph.D. co-advising: La Sapienza Rome & Washington University in St. Louis (2003–2007), topics: distributed systems, real-time middleware, fault-tolerant computing

Add to `siteConfig.navLinks` (or as a sub-item under an "About" dropdown).

---

### 4.4 — i18n translation audit 🔲

**Files:** `messages/fr.json`, `messages/it.json`, `messages/es.json`, `messages/ja.json`, `messages/zh.json`, `messages/ko.json`, `messages/ru.json`

Several keys added since the original translations were written:
- `nav.zenohRos2`, `nav.zenohDdsAlt` (added — currently English in all locales)
- `zenoh.navCardRos2Desc`, `zenoh.navCardDdsAltDesc` (added — currently English in all locales)
- `about.bio` — English bio was rewritten; other locales still have the old 2-paragraph version

Audit each locale against `messages/en.json` and either translate missing keys or flag them for a native-speaker pass. The `about.bio` rewrite is the highest-priority gap.

---

## Key files reference

| Concern | File |
|---------|------|
| Central config (titles, social, nav, repos, press) | `lib/siteConfig.ts` |
| Home page | `app/[locale]/page.tsx` |
| Root layout (head, fonts, theme) | `app/[locale]/layout.tsx` |
| About page | `app/[locale]/about/page.tsx` |
| CV page | `app/[locale]/cv/page.tsx` |
| Blog index | `app/[locale]/blog/page.tsx` |
| Blog post renderer | `app/[locale]/blog/[slug]/page.tsx` |
| Blog MDX files | `content/blog/*.mdx` |
| Contact page | `app/[locale]/contact/page.tsx` |
| Zenoh main page | `app/[locale]/zenoh/page.tsx` |
| Zenoh Talks page | `app/[locale]/zenoh/talks/page.tsx` |
| Zenoh Report page | `app/[locale]/zenoh/report/page.tsx` |
| Zenoh Book pages | `app/[locale]/zenoh/book/[...slug]/page.tsx` |
| Open Source page | `app/[locale]/opensource/page.tsx` |
| Blog utilities | `lib/mdx.ts` |
| Sitemap | `app/sitemap.ts` |
| i18n messages | `messages/<locale>.json` |

---

## Important notes

- **ZettaScale**: Angelo exited ZettaScale in April 2026. Do not include ZettaScale in any `worksFor` schema field or current-role page content. The CV and About bio already reflect the exit.
- **Blog posts**: `clock-synchronization.mdx`, `why-zenoh.mdx`, and `ros2-rmw-zenoh-selection.mdx` are published. `zenoh-vs-mqtt.mdx` and `zenoh-vs-dds.mdx` are `draft: true` — enable by removing the draft flag when ready.
- **No LaTeX in MDX**: MDX's acorn parser interprets `{}` as JSX — use plain-text math descriptions in `.mdx` files.
- **Commits**: Never commit or push unless Angelo explicitly asks.

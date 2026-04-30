# Website Improvement Plan — corsaro.me

Status legend: ✅ Done | 🔲 Todo

---

## Phase 1 — Fill the content that already has a home ✅ Done

| # | Task | Status |
|---|------|--------|
| 1.1 | Populate Zenoh Talks page with past keynotes, conference talks, webinars | ✅ |
| 1.2 | Expand Open Source page with fog05, Cyclone DDS, zenoh-dissector, zenoh-nostd, awesome-zenoh | ✅ |
| 1.3 | Add blog posts: clock sync (published), Zenoh vs MQTT (draft), Zenoh vs DDS (draft) | ✅ |

---

## Phase 2 — Enrich existing pages ✅ Done

### 2.1 — About page rewrite ✅

**File:** `app/[locale]/about/page.tsx`

Replace the current four minimal cards with a personal narrative arc. The narrative should cover:
- The journey: Ph.D. at Washington University → PrismTech → Finmeccanica/SELEX-ES → ADLINK → independent
- The *why*: what keeps drawing Angelo to distributed systems and protocol design
- The invention of Zenoh: the gap that existing middleware (DDS, MQTT, REST) couldn't fill
- Current focus: Zenoh ecosystem, robotics, automotive, edge AI, Advanced Research on Distributed Systems

Also:
- Change the H1 from `"About"` to `"About Angelo Corsaro"`
- Add a `ProfilePage` JSON-LD schema (see §SEO below)

---

### 2.2 — "In the Media" section ✅

**Files:** `app/[locale]/page.tsx` (home page) or a new `app/[locale]/press/page.tsx`

Add a strip of media logos with links. Source material already exists in the papers page (8+ magazine/media articles). Options:
- A simple horizontal strip of logos + publication names on the home page
- Or a standalone `/press` page with fuller entries

Content to source from: the publications/press entries already in `lib/siteConfig.ts` or `content/`.

---

### 2.3 — Zenoh Report subscribe mechanism ✅

**File:** `app/[locale]/zenoh/report/page.tsx`

The page already has a "subscribe" callout but no mechanism. Add one of:
- A mailto link: `mailto:angelo@...?subject=Subscribe to Zenoh Report`
- A simple email capture form posting to a form service (Formspree, etc.)
- An RSS feed link (if a feed is generated)

---

### 2.4 — Fix homepage title tag (all 8 locales) ✅

**File:** `lib/siteConfig.ts` → `siteTitle` field (currently `"Angelo Corsaro"`)

Change `siteTitle` to:
```
"Angelo Corsaro — Inventor of Zenoh Protocol & Distributed Systems Expert"
```

The `siteTitle` value is consumed by `app/[locale]/page.tsx` via `siteConfig.siteTitle`. Changing it here propagates to all locales automatically.

For locale-specific titles, translations live in `messages/<locale>.json`. If title is hardcoded per locale, update each locale's translation file under the relevant key.

---

### 2.5 — Fix profile image dimensions ✅

**File:** `app/[locale]/page.tsx` (lines ~142–149)

The `<Image>` component already uses `next/image` with `priority` — good. But the declared dimensions are `width={680} height={680}` (square) while the actual file is 802×786 (not square). This causes aspect ratio distortion and a minor CLS issue.

Change to:
```tsx
<Image
  src={siteConfig.profilePhoto}
  alt={siteConfig.name}
  width={802}
  height={786}
  priority
  className="aspect-square w-full object-cover"
/>
```

Note: `aspect-square` in the className forces square display — the width/height here are the *intrinsic* dimensions used by the browser for layout reservation, not the rendered size. Correcting them eliminates the CLS warning.

---

### 2.6 — Add sitemap link to `<head>` ✅

**File:** `app/layout.tsx`

A `sitemap.ts` already exists at `app/sitemap.ts`. Add the `<link>` tag so crawlers discover it:

```tsx
// Inside <html ...><head> in app/layout.tsx:
<link rel="sitemap" type="application/xml" href="/sitemap.xml" />
```

---

## Phase 3 — Structural improvements

### 3.1 — "Latest from the Blog" section on home page 🔲

**File:** `app/[locale]/page.tsx`

Import `getAllPosts` from `lib/mdx.ts` and render the 2–3 most recent non-draft posts as cards above or below the existing CTA. Use the existing `BlogCard` component from `components/`.

Rough structure:
```tsx
const posts = (await getAllPosts()).slice(0, 3);
// Render using <BlogCard> for each post
```

Also add `Blog` + `BlogPosting` JSON-LD to `app/[locale]/blog/page.tsx`:
- `Blog` schema with `name`, `description`, `url`, `author`
- `blogPost` array generated dynamically from `getAllPosts()`
- Change blog page H1 from `"Blog"` to include a subtitle: e.g. "Writing on Zenoh, distributed systems, and robotics"

---

### 3.2 — CV anchor navigation 🔲

**File:** `app/[locale]/cv/page.tsx`

The CV is long (~350 lines of content across Education, Experience, Publications, Awards, etc.). Add:
- In-page anchor `id` attributes on each section heading
- A sticky or top-of-page jump-nav with links: Education | Experience | Publications | Awards | Open Source

Also add `Person` JSON-LD schema to the CV page. Template:
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

Note: Do NOT include a `worksFor` field — Angelo no longer works at ZettaScale.

---

### 3.3 — "Community & Ecosystem" section on Zenoh page 🔲

**File:** `app/[locale]/zenoh/page.tsx`

Add a section listing companies and projects publicly known to use Zenoh:
- Automotive: General Motors (uProtocol), Bosch, Volvo, Foxconn (SDV platforms)
- Robotics: ROS 2 official alternative middleware (ROS TSC evaluation)
- Edge/Cloud: Eclipse Foundation projects

Source from public announcements and the ROS discourse post already linked in the Zenoh vs MQTT blog.

---

### 3.4 — Internal links within blog posts + "Related" section 🔲

**Files:** Each MDX file in `content/blog/` and/or `app/[locale]/blog/[slug]/page.tsx`

Within each published blog post, add contextual internal links:
- Clock sync post: link to `/zenoh/` when mentioning distributed systems, link to paper PDF
- Future Zenoh vs MQTT post: link to `/zenoh/`, `/zenoh/ros2/`
- Future Zenoh vs DDS post: link to `/zenoh/`, `/zenoh/dds-alternative/`

At the end of each post, add a "Related" section linking to 2–3 other relevant pages on the site.

Also add `AboutPage` JSON-LD schema to `app/[locale]/about/page.tsx` and `ContactPage` schema to `app/[locale]/contact/page.tsx`:

**Contact schema:**
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

**File:** `app/[locale]/zenoh/book/[...slug]/page.tsx` (or a book layout file if one exists)

Add `BreadcrumbList` JSON-LD to every book page. Generate dynamically from current path:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://corsaro.me/en/" },
    { "@type": "ListItem", "position": 2, "name": "Zenoh", "item": "https://corsaro.me/en/zenoh/" },
    { "@type": "ListItem", "position": 3, "name": "Zenoh Book", "item": "https://corsaro.me/en/zenoh/book/" },
    { "@type": "ListItem", "position": 4, "name": "<page title>", "item": "https://corsaro.me<current path>" }
  ]
}
```

---

### 4.2 — Appearances / Speaking calendar 🔲

**File:** New section in `app/[locale]/zenoh/talks/page.tsx` or a new `app/[locale]/speaking/page.tsx`

Add a section for upcoming confirmed talks/events with: event name, date, location, link.
Data source: maintain in `lib/siteConfig.ts` as an `upcomingTalks` array.

---

### 4.3 — Teaching & Mentoring page 🔲

**File:** New `app/[locale]/teaching/page.tsx`

Content to include:
- ESIEE Paris courses (subjects, level, years)
- Ph.D. co-advising (students, topics, institutions)
- Any public lecture series or workshops

Add nav entry in `lib/siteConfig.ts` → `navLinks`.

---

### 4.4 — i18n translation verification 🔲

**Files:** `messages/<locale>.json` for fr, it, ja, es, zh, ko, ru

8 locales are configured but translation coverage is unclear. Audit each locale's message file against the English baseline and identify gaps. Fill gaps or mark incomplete sections.

---

## Key files reference

| Concern | File |
|---------|------|
| Central config (titles, social, nav, repos) | `lib/siteConfig.ts` |
| Home page | `app/[locale]/page.tsx` |
| Root layout (head, fonts, theme) | `app/layout.tsx` |
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

## Important notes

- **ZettaScale**: Angelo no longer works at ZettaScale. Do not include ZettaScale in any `worksFor` schema field or page content.
- **Draft posts**: `zenoh-vs-mqtt.mdx` and `zenoh-vs-dds.mdx` are currently `draft: true` — hidden from the blog listing. Enable by removing the `draft` flag when ready to publish.
- **Commits**: Never commit or push unless Angelo explicitly asks.
- **No LaTeX in MDX**: MDX's acorn parser interprets `{}` as JSX — use plain-text math descriptions instead of LaTeX in `.mdx` files.

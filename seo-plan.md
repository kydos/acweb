# SEO Implementation Plan for corsaro.me

## Context
- Framework: Next.js App Router (confirmed via `main-app-*.js` chunks and no `__NEXT_DATA__`)
- i18n: 8 language versions (en, fr, it, ja, es, zh, ko, ru) with hreflang already implemented
- Metadata: Uses Next.js `generateMetadata` / static `metadata` exports
- Structured data: Injected via `<script type="application/ld+json">` in page components

---

## Task 1 — Fix Homepage Title Tag

**File:** `app/[locale]/page.tsx` (or `app/en/page.tsx` depending on i18n routing structure)

**Current:**
```ts
title: "Angelo Corsaro"
```

**Change to:**
```ts
export const metadata: Metadata = {
  title: "Angelo Corsaro — Inventor of Zenoh Protocol & Distributed Systems Expert",
  // keep all other existing metadata fields unchanged
}
```

The title should be updated in ALL locale versions of the homepage (en, fr, it, ja, es, zh, ko, ru) with appropriate translations. For non-English locales, translate the descriptor but keep "Zenoh Protocol" as-is since it's a proper name. Example for French: `"Angelo Corsaro — Inventeur du Protocole Zenoh & Expert en Systèmes Distribués"`.

---

## Task 2 — Add Sitemap Link Tag to HTML `<head>`

**File:** `app/layout.tsx` (root layout, affects all pages)

In the root layout's `<head>` section (or via Next.js metadata), add:

```tsx
// In the metadata export of the root layout:
export const metadata: Metadata = {
  // ...existing metadata...
  other: {
    // Add to any existing 'other' object, or create it:
    'link:sitemap': '<link rel="sitemap" type="application/xml" href="/sitemap.xml" />',
  }
}
```

**Preferred approach** — add a `<link>` tag directly in the root layout JSX `<head>`:
```tsx
// In app/layout.tsx, inside the <html><head> or via Next.js <Head>:
<link rel="sitemap" type="application/xml" href="/sitemap.xml" />
```

If using the Next.js Metadata API with no custom `<head>`, use the `metadataBase` + custom head approach or add it to `app/layout.tsx` inside `<html lang={...}><head><link rel="sitemap" .../></head>`.

---

## Task 3 — Fix Profile Image (WebP conversion + explicit dimensions)

**File:** wherever `me.png` is referenced in the homepage component (likely `app/[locale]/page.tsx` or a `HeroSection` component)

**Current:**
```tsx
<img src="/me.png" alt="Angelo Corsaro" width="680" height="680" />
// or Next.js Image component:
<Image src="/me.png" alt="Angelo Corsaro" width={680} height={680} />
```

**Changes needed:**
1. Convert `/public/me.png` to `/public/me.webp` (802×786px source → keep as-is, Next.js Image handles optimization)
2. If using `next/image` `<Image>` component: **no change needed** — Next.js already serves WebP automatically and handles CLS via width/height. Just verify the component IS using `<Image>` from `next/image`, not a plain `<img>` tag.
3. If it IS a plain `<img>` tag: replace with:
```tsx
import Image from 'next/image';

<Image
  src="/me.png"           // Next.js will auto-serve as WebP
  alt="Angelo Corsaro"
  width={802}             // use actual natural dimensions
  height={786}
  priority={true}         // it's above the fold / LCP image
  className="..."         // keep existing className
/>
```
4. The current HTML shows `width="680" height="680"` but the natural size is 802×786 (not square). Fix the declared dimensions to match: `width={802} height={786}` to prevent aspect ratio distortion and CLS.

---

## Task 4 — Add Structured Data to About Page

**File:** `app/[locale]/about/page.tsx`

**Current:** No structured data at all.

**Add the following JSON-LD schema** inside the page component (or via a `generateMetadata` approach using a script tag):

```tsx
// In the page component JSX, before the closing </main> or in <head> via script:
const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "mainEntity": {
    "@type": "Person",
    "name": "Angelo Corsaro",
    "url": "https://corsaro.me",
    "image": "https://corsaro.me/me.png",
    "jobTitle": "Innovator & Distributed Systems Architect",
    "description": "Angelo Corsaro, Ph.D. is the inventor of the Zenoh Protocol and a world expert in distributed systems, robotics middleware, AI-native infrastructure, and cloud-to-edge computing.",
    "sameAs": [
      "https://github.com/kydos",
      "https://linkedin.com/in/corsaro"
    ],
    "knowsAbout": [
      "Zenoh Protocol",
      "Distributed Systems",
      "Robotics",
      "ROS 2",
      "Edge Computing",
      "IoT",
      "AI infrastructure",
      "DDS",
      "Real-Time Systems"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "ZettaScale Technology",
      "url": "https://zettascale.tech"
    }
  }
};

// Render as:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
/>
```

**Also fix the H1:** Change from `"About"` to `"About Angelo Corsaro"` in the page heading.

---

## Task 5 — Add Structured Data to CV Page

**File:** `app/[locale]/cv/page.tsx`

**Current:** No structured data. The page has rich content (Education, Experience, Publications, Awards sections confirmed via H2 tags).

**Add the following JSON-LD:**

```tsx
const cvSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Angelo Corsaro",
  "honorificSuffix": "Ph.D.",
  "url": "https://corsaro.me",
  "image": "https://corsaro.me/me.png",
  "jobTitle": "Eclipse Zenoh Project Lead",
  "description": "Dr. Angelo Corsaro is a world expert in Internet-scale distributed systems with 25+ years of contributions spanning protocol design, real-time middleware, and cloud-to-edge computing.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Gif-sur-Yvette",
    "addressCountry": "FR"
  },
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "Washington University in St. Louis"
  },
  "worksFor": {
    "@type": "Organization",
    "name": "ZettaScale Technology",
    "url": "https://zettascale.tech"
  },
  "sameAs": [
    "https://github.com/kydos",
    "https://linkedin.com/in/corsaro"
  ],
  "award": [
    "Technology CEO of the Year 2024",
    "Genius Minds 2024"
  ],
  "knowsAbout": [
    "Distributed Systems",
    "Zenoh Protocol",
    "ROS 2",
    "DDS",
    "Real-Time Systems",
    "Edge Computing",
    "IoT",
    "Protocol Design"
  ]
};

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(cvSchema) }}
/>
```

---

## Task 6 — Add Structured Data to Blog Index Page

**File:** `app/[locale]/blog/page.tsx`

**Current:** No structured data. Page lists 2 blog posts.

**Add an `ItemList` schema** that references all blog posts. This should be dynamically generated from the actual list of posts:

```tsx
// Build this dynamically from your blog posts array/CMS
const blogIndexSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Angelo Corsaro's Blog",
  "description": "Articles on Zenoh Protocol, distributed systems, robotics middleware, AI infrastructure, and edge computing.",
  "url": "https://corsaro.me/en/blog/",
  "author": {
    "@type": "Person",
    "name": "Angelo Corsaro",
    "url": "https://corsaro.me"
  },
  "blogPost": [
    // Generate this array dynamically from your posts data:
    {
      "@type": "BlogPosting",
      "headline": "Why I Created Zenoh",
      "url": "https://corsaro.me/en/blog/why-zenoh/",
      "datePublished": "2024-06-15",
      "description": "The story behind the Zenoh protocol — why existing middleware wasn't enough, and what we set out to build."
    },
    {
      "@type": "BlogPosting",
      "headline": "How the ROS 2 Core Team Chose Zenoh as Its Alternative Middleware",
      "url": "https://corsaro.me/en/blog/ros2-rmw-zenoh-selection/",
      "datePublished": "2023-10-01",
      "description": "The technical evaluation that led the ROS 2 core team to select Zenoh."
    }
    // Add future posts here as they are created
  ]
};

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(blogIndexSchema) }}
/>
```

**Also:** The blog index H1 is just `"Blog"` — change it to `"Blog — Angelo Corsaro"` or keep "Blog" as H1 but add a visible subtitle like `"Writing on Zenoh, distributed systems, and robotics"` as an H2 or paragraph. This adds indexable content to a currently thin page (only 119 words).

---

## Task 7 — Add Internal Links to Blog Posts

**Files:** `app/[locale]/blog/why-zenoh/page.tsx` and `app/[locale]/blog/ros2-rmw-zenoh-selection/page.tsx`

**Current:** The blog post "Why I Created Zenoh" has **zero internal links** — it only links externally to the Zenoh GitHub repo.

**Add contextual internal links** within the article body. At appropriate points in the content, link to related pages. For example:

- When mentioning "the Zenoh protocol", link to `/en/zenoh/`
- When mentioning "getting started", link to `/en/zenoh/book/getting-started/`
- When mentioning "the book", link to `/en/zenoh/book/`
- At the end of each blog post, add a "Read Next" or "Related" section:

```tsx
// At the bottom of each blog post component, before </article>:
<section aria-label="Related content">
  <h2>Learn More</h2>
  <ul>
    <li><a href="/en/zenoh/">Eclipse Zenoh Protocol Overview</a></li>
    <li><a href="/en/zenoh/book/introduction/">Introduction to the Zenoh Book</a></li>
    <li><a href="/en/zenoh/book/getting-started/">Getting Started with Zenoh</a></li>
  </ul>
</section>
```

Apply the same pattern to the ROS 2 blog post, linking to `/en/zenoh/ros2/` and `/en/zenoh/book/`.

---

## Task 8 — Add Breadcrumb Schema to Zenoh Book Pages

**File:** The shared layout or individual page components under `app/[locale]/zenoh/book/[...slug]/page.tsx`

**Current:** Book pages have a `TechArticle` schema but **no BreadcrumbList** — this means Google cannot show breadcrumbs in search results for these pages.

**Add to every book page** (ideally in the book layout `app/[locale]/zenoh/book/layout.tsx` so it applies to all chapters):

```tsx
// Generate dynamically based on current page path and title
const breadcrumbSchema = (pageTitle: string, pageUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://corsaro.me/en/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Zenoh",
      "item": "https://corsaro.me/en/zenoh/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Zenoh Book",
      "item": "https://corsaro.me/en/zenoh/book/"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": pageTitle,  // e.g. "Introduction", "Core Concepts"
      "item": `https://corsaro.me${pageUrl}`
    }
  ]
});

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(title, url)) }}
/>
```

---

## Task 9 — Add Contact Page Structured Data

**File:** `app/[locale]/contact/page.tsx`

**Current:** No structured data.

**Add:**
```tsx
const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Angelo Corsaro",
  "url": "https://corsaro.me/en/contact/",
  "mainEntity": {
    "@type": "Person",
    "name": "Angelo Corsaro",
    "url": "https://corsaro.me",
    "sameAs": [
      "https://github.com/kydos",
      "https://linkedin.com/in/corsaro"
    ]
  }
};

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
/>
```

---

## Summary of Files to Modify

| File | Changes |
|------|---------|
| `app/[locale]/page.tsx` | Update `metadata.title` (all locales) |
| `app/layout.tsx` | Add `<link rel="sitemap">` to `<head>` |
| `app/[locale]/page.tsx` | Fix `<img>` → `<Image>` with correct dimensions + `priority` |
| `app/[locale]/about/page.tsx` | Add `ProfilePage` schema, fix H1 |
| `app/[locale]/cv/page.tsx` | Add `Person` schema |
| `app/[locale]/blog/page.tsx` | Add `Blog` + `ItemList` schema, expand content |
| `app/[locale]/blog/why-zenoh/page.tsx` | Add internal links + "Related" section |
| `app/[locale]/blog/ros2-rmw-zenoh-selection/page.tsx` | Add internal links + "Related" section |
| `app/[locale]/zenoh/book/layout.tsx` | Add `BreadcrumbList` schema (all book pages) |
| `app/[locale]/contact/page.tsx` | Add `ContactPage` schema |

## Notes for the Agent
- The site uses Next.js App Router — use `export const metadata` for static metadata and `generateMetadata()` for dynamic pages
- Structured data should be added as `<script type="application/ld+json">` tags in the JSX, using `dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}`
- Do NOT change any existing schemas — only add new ones alongside existing ones
- All changes should be applied to ALL locale versions (`[locale]` param covers en, fr, it, ja, es, zh, ko, ru)
- After implementing, verify with: `npx next build` and check for no TypeScript errors

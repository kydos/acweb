#!/usr/bin/env node
// Generates redirect stubs for the retired locale-prefixed URLs.
//
// Run after `next build` with STATIC_EXPORT=true. Walks ./out for every route
// the site actually produces, then mirrors each one under /<locale>/ as a stub
// that sends both crawlers and humans to the canonical, unprefixed URL.
//
// Nothing here is hand-maintained: add or remove a page and the stubs follow.

import fs from "node:fs";
import path from "node:path";

const OUT_DIR = process.env.OUT_DIR ?? "out";
const SITE_URL = "https://corsaro.me";

// Every locale the site used to serve. "en" carried the canonical URLs and the
// ranking; the other seven were duplicate English content, but redirecting them
// consolidates their signals instead of discarding them, and costs ~400 bytes each.
const RETIRED_LOCALES = ["en", "fr", "it", "ja", "es", "zh", "ko", "ru"];

/** Collect every route in the export, as paths like "" | "about" | "zenoh/book/routing". */
function collectRoutes(dir, prefix = "") {
  const routes = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    // Skip Next internals and the stub trees themselves, so reruns stay idempotent.
    // "404" is Next's error page directory, not a route anyone linked to.
    if (entry.name === "_next" || entry.name === "404") continue;
    if (RETIRED_LOCALES.includes(entry.name) && !prefix) continue;

    const childDir = path.join(dir, entry.name);
    const childRoute = prefix ? `${prefix}/${entry.name}` : entry.name;

    if (fs.existsSync(path.join(childDir, "index.html"))) routes.push(childRoute);
    routes.push(...collectRoutes(childDir, childRoute));
  }
  return routes;
}

/**
 * A "soft 301": an instant meta refresh plus a canonical pointing at the target.
 * Google follows instant meta refreshes as redirects and consolidates signals
 * through them. Deliberately NO robots noindex — combining noindex with a
 * cross-URL canonical risks propagating the noindex to the target page.
 */
function stub(target) {
  const url = `${SITE_URL}${target}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Redirecting to ${url}</title>
<link rel="canonical" href="${url}">
<meta http-equiv="refresh" content="0; url=${url}">
<script>location.replace(${JSON.stringify(url)});</script>
</head>
<body>
<p>This page has moved to <a href="${url}">${url}</a>.</p>
</body>
</html>
`;
}

if (!fs.existsSync(OUT_DIR)) {
  console.error(`✗ ${OUT_DIR}/ not found — run the static export first.`);
  process.exit(1);
}

const hasRoot = fs.existsSync(path.join(OUT_DIR, "index.html"));
const routes = [...(hasRoot ? [""] : []), ...collectRoutes(OUT_DIR)];

let written = 0;
for (const locale of RETIRED_LOCALES) {
  for (const route of routes) {
    const target = route === "" ? "/" : `/${route}/`;
    const stubDir = path.join(OUT_DIR, locale, route);
    fs.mkdirSync(stubDir, { recursive: true });
    fs.writeFileSync(path.join(stubDir, "index.html"), stub(target), "utf8");
    written++;
  }
}

console.log(
  `✓ ${written} redirect stubs — ${routes.length} routes × ${RETIRED_LOCALES.length} retired locales`
);

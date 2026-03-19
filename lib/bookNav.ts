export type NavLeaf = { title: string; slug: string };
export type NavSection = { title: string; slug: string; children: NavLeaf[] };
export type NavItem = NavLeaf | NavSection;

export const navItems: NavItem[] = [
  { title: "Introduction", slug: "introduction" },
  {
    title: "Getting Started",
    slug: "getting-started",
    children: [
      { title: "Installation", slug: "getting-started/installation" },
      { title: "Hello Zenoh", slug: "getting-started/hello-zenoh" },
      { title: "The Zenoh Router", slug: "getting-started/router" },
      { title: "First Pub/Sub", slug: "getting-started/first-pubsub" },
    ],
  },
  {
    title: "Core Concepts",
    slug: "core-concepts",
    children: [
      { title: "Key Expressions", slug: "core-concepts/key-expressions" },
      { title: "Sessions", slug: "core-concepts/sessions" },
      { title: "Publishers & Subscribers", slug: "core-concepts/pub-sub" },
      { title: "Queryables & Replies", slug: "core-concepts/queryables" },
      { title: "Storages", slug: "core-concepts/storages" },
    ],
  },
  {
    title: "Routing & Topology",
    slug: "routing",
    children: [
      { title: "Peer Mode", slug: "routing/peer-mode" },
      { title: "Client Mode", slug: "routing/client-mode" },
      { title: "Router Mode", slug: "routing/router-mode" },
      { title: "Multicast Scouting", slug: "routing/scouting" },
    ],
  },
  {
    title: "Security",
    slug: "security",
    children: [
      { title: "TLS Configuration", slug: "security/tls" },
      { title: "Access Control Lists", slug: "security/acl" },
      { title: "Token-Based Auth", slug: "security/auth" },
    ],
  },
  {
    title: "Embedded & Bare-Metal",
    slug: "embedded",
    children: [
      { title: "Zenoh-Pico (C)", slug: "embedded/zenoh-pico" },
      { title: "Rust no_std", slug: "embedded/no-std" },
      { title: "Embassy Async", slug: "embedded/embassy" },
      { title: "FreeRTOS & Zephyr", slug: "embedded/rtos" },
    ],
  },
  {
    title: "Advanced Topics",
    slug: "advanced",
    children: [
      { title: "Wire Format", slug: "advanced/wire-format" },
      { title: "Congestion Control", slug: "advanced/congestion-control" },
      { title: "Shared Memory", slug: "advanced/shared-memory" },
      { title: "Multi-Datacenter", slug: "advanced/multi-datacenter" },
    ],
  },
  { title: "Contributing", slug: "contributing" },
];

/** All slugs in reading order — used for prev/next navigation */
export const flatSlugs: string[] = navItems.flatMap((item) =>
  "children" in item
    ? [item.slug, ...item.children.map((c) => c.slug)]
    : [item.slug]
);

/** Slug → display title */
export const slugToTitle: Record<string, string> = Object.fromEntries(
  navItems.flatMap((item) =>
    "children" in item
      ? [[item.slug, item.title], ...item.children.map((c) => [c.slug, c.title])]
      : [[item.slug, item.title]]
  )
);

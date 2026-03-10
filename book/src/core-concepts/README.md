# Core Concepts

This chapter explains the fundamental abstractions that make Zenoh unique.

Understanding these concepts will help you design systems that are:

- **Location transparent** — producers and consumers are fully decoupled
- **Topology independent** — your application logic doesn't change when you move from
  a single machine to a cloud-to-edge deployment
- **Efficient** — zero unnecessary copies, minimal wire overhead

## Chapters

- [Key Expressions](./key-expressions.md) — the naming system for all resources
- [Sessions](./sessions.md) — the entry point to the Zenoh network
- [Publishers & Subscribers](./pub-sub.md) — data in motion
- [Queryables & Replies](./queryables.md) — data at rest and remote computation
- [Storages](./storages.md) — built-in persistence with location transparency

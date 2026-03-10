# Contributing

The Zenoh Book is open for contributions. Whether it's fixing a typo, improving an
explanation, or adding a missing example — all contributions are welcome.

## Repository

The book source lives in the `book/` directory of the website repository:

```
book/
├── book.toml          ← mdBook configuration
└── src/
    ├── SUMMARY.md     ← Table of contents
    ├── introduction.md
    ├── getting-started/
    ├── core-concepts/
    ├── routing/
    ├── security/
    ├── embedded/
    └── advanced/
```

## Building Locally

Install mdBook:

```bash
cargo install mdbook
```

Build and serve with live reload:

```bash
cd book
mdbook serve --open
```

## Style Guide

- Use **present tense** and **active voice**
- Keep code examples **self-contained** and **runnable**
- Prefer tables for comparisons
- Reference the official Zenoh API docs for exhaustive parameter lists

## Reporting Issues

Found an error or gap in the book? Open an issue at the website repository or
reach out on the [Zenoh Discord](https://discord.gg/2GJ958VuHs).

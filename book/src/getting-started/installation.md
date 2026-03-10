# Installation

## The Zenoh Library (Rust)

Add Zenoh to your `Cargo.toml`:

```toml
[dependencies]
zenoh = "1.0"
tokio = { version = "1", features = ["full"] }
```

## The Zenoh CLI Tools

Install the pre-built tools for quick experimentation:

```bash
cargo install zenoh-tools
```

This provides `z_pub`, `z_sub`, `z_get`, and `z_queryable` command-line utilities.

## The Zenoh Router

The router (`zenohd`) is distributed as a pre-built binary:

```bash
# macOS / Linux
curl -L https://github.com/eclipse-zenoh/zenoh/releases/latest/download/zenoh-linux-x86_64.zip -o zenoh.zip
unzip zenoh.zip

# Or via cargo
cargo install zenohd
```

## Docker

```bash
docker pull eclipse/zenoh
docker run --net host eclipse/zenoh
```

## Verify the Installation

```bash
zenohd --version
# zenohd 1.0.x
```

Continue to [Hello Zenoh](./hello-zenoh.md).

# Installation

## The Zenoh Library (Rust)

Add Zenoh to your `Cargo.toml`:

```toml
[dependencies]
zenoh = "1.0"
tokio = { version = "1", features = ["full"] }
```

## The Zenoh CLI Tools

The Zenoh repository ships example binaries (`z_pub`, `z_sub`, `z_get`, `z_queryable`) that are useful for quick smoke-testing. Build them directly from the source tree:

```bash
git clone https://github.com/eclipse-zenoh/zenoh
cd zenoh
cargo build --examples --release
```

For richer interactive work, two dedicated tools are available:

- **[NuZe](https://github.com/kydos/nuze)** — a Zenoh shell built on top of [Nushell](https://www.nushell.sh). It combines Nushell's structured data scripting with Zenoh commands, making it convenient for interactive exploration, debugging, and scripting Zenoh sessions.

- **[zsak](https://github.com/kydos/zsak)** — the Zenoh Swiss Army Knife. A focused CLI for publishing, subscribing, querying, and inspecting a Zenoh network from the terminal.

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

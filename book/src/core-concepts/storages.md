# Storages

A **Storage** is a Zenoh router plugin that persists publications and serves them to
future `get()` requests — with full location transparency.

## Enabling a Storage

Add to your router configuration:

```json5
{
  plugins: {
    storage_manager: {
      volumes: {
        memory: {}  // in-memory backend (built-in)
      },
      storages: {
        temperature_store: {
          key_expr: "sensors/**/temperature",
          volume: "memory",
        }
      }
    }
  }
}
```

## Architecture

The storage plugin intercepts publications flowing through the router and persists them.
When a `get()` arrives, the plugin serves the stored values — all transparently through
the same router.

![Storage plugin architecture](/book-assets/storage-arch.svg)

## Querying Stored Data

From any Zenoh application, query the stored data normally:

```rust
let replies = session.get("sensors/**/temperature").await.unwrap();
while let Ok(reply) = replies.recv_async().await {
    if let Ok(sample) = reply.result() {
        println!("{} = {:?}", sample.key_expr(), sample.payload());
    }
}
```

The application doesn't know (or care) whether the reply comes from:
- A live publisher
- A storage on an edge router
- A storage in the cloud

## Storage Backends

| Backend | Use case |
|---|---|
| `memory` | Ephemeral, zero-config, built-in |
| `rocksdb` | Durable local persistence |
| `influxdb` | Time-series data |
| `s3` | Object storage (AWS S3, MinIO) |

Backends are loaded as plugins. See the [eclipse-zenoh/zenoh-backend-*](https://github.com/eclipse-zenoh)
repositories for the full list.

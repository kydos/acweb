# Shared Memory

Zenoh provides two distinct shared-memory mechanisms. They can be used independently
or together, but they serve different purposes and are enabled differently.

## Transparent SHM (configuration)

When SHM transport is enabled via configuration, Zenoh **automatically** uses shared
memory for large messages between co-located processes — no API changes required.
The publisher writes normally; Zenoh detects that both endpoints are on the same host
and routes the payload through a shared memory region instead of a socket.

```json5
{
  transport: {
    unicast: {
      lowlatency: false,
      shm: {
        enabled: true,
      },
    },
  },
}
```

![SHM flow](/book-assets/shm-flow.svg)

If both endpoints support SHM and are on the same machine, Zenoh uses SHM;
otherwise it falls back transparently to standard transport.

## SHM API (Cargo feature)

The `shared-memory` Cargo feature unlocks `SharedMemoryManager` and custom allocator
support. This gives the publisher **explicit control** over memory layout — useful when
you need zero-copy from the point of acquisition (e.g., a camera DMA buffer or lidar ring
buffer) all the way to the subscriber, without any intermediate copy.

Enable in `Cargo.toml`:

```toml
[dependencies]
zenoh = { version = "1", features = ["shared-memory"] }
```

```rust
use zenoh::shm::*;

let shm_manager = SharedMemoryManager::make("my_app", 64 * 1024 * 1024)?; // 64 MB

let mut buf = shm_manager.alloc(1024)?;
buf[..5].copy_from_slice(b"hello");

session.put("data/channel", buf).await?;
```

## When to Use Each

- **Transparent SHM** — easy win for any co-located pub/sub pair; no code changes needed
- **SHM API** — use when you must control allocation (zero-copy camera frames, lidar scans,
  video pipelines) or when you need a custom allocator strategy

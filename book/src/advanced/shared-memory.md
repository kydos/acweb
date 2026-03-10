# Shared Memory

Zenoh supports **shared memory (SHM) transport** for zero-copy message passing between
processes on the same machine.

## How It Works

Instead of serialising the payload over a socket, the publisher writes to a shared
memory region. The subscriber receives only a pointer — no data is copied.

```
Publisher                        Subscriber
    │                                │
    ├── write payload to SHM ──────► │ (zero copy — just a pointer)
    └── send SHM descriptor ────────► └── read directly from SHM
```

## Enabling SHM

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

## Rust API

```rust
use zenoh::shm::*;

let shm_manager = SharedMemoryManager::make("my_app", 64 * 1024 * 1024)?; // 64 MB

let mut buf = shm_manager.alloc(1024)?;
buf[..5].copy_from_slice(b"hello");

session.put("data/channel", buf).await?;
```

## When to Use SHM

- Intra-machine communication between processes
- Large payloads (images, lidar scans, video frames)
- Latency-critical paths

SHM is automatically negotiated — if both endpoints support it and are on the same machine,
Zenoh uses SHM; otherwise it falls back to standard transport.

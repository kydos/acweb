# The Zenoh Router

For scenarios where peers cannot directly reach each other — different networks, NAT, cloud-to-edge — Zenoh provides a **router** (`zenohd`).

## Starting the Router

```bash
zenohd
```

By default the router listens on `tcp/[::]:7447` and enables multicast scouting on the LAN.

## Custom Configuration

Create `config.json5`:

```json5
{
  mode: "router",
  listen: {
    endpoints: ["tcp/0.0.0.0:7447", "udp/0.0.0.0:7447"],
  },
  scouting: {
    multicast: { enabled: true },
  },
}
```

```bash
zenohd --config config.json5
```

## Connecting Clients to the Router

```rust
let mut config = zenoh::config::default();
config
    .connect
    .endpoints
    .push("tcp/router.example.com:7447".parse().unwrap());

let session = zenoh::open(config).await.unwrap();
```

## Router Chaining

Routers can be chained to span multiple network segments:

```
[Microcontroller] ──── [Edge Router] ──── [Cloud Router] ──── [Cloud App]
```

Each hop adds minimal latency. Zenoh's routing algorithm ensures optimal path selection
and handles link failures transparently.

Continue to [First Pub/Sub](./first-pubsub.md).

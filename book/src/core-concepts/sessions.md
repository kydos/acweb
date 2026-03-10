# Sessions

A **Session** is your application's connection to the Zenoh network. All Zenoh operations —
publishing, subscribing, querying — go through a session.

## Opening a Session

```rust
use zenoh::prelude::*;

// Default configuration (peer mode, multicast scouting)
let session = zenoh::open(zenoh::config::default()).await.unwrap();

// Custom configuration from file
let config = zenoh::config::from_file("zenoh.json5").unwrap();
let session = zenoh::open(config).await.unwrap();
```

## Session Modes

| Mode | Description |
|---|---|
| `peer` | Direct peer-to-peer communication; suitable for LAN deployments |
| `client` | Connects to a router; suitable for constrained devices or WAN |
| `router` | Acts as a routing node; combines `peer` with routing capabilities |

```json5
// zenoh.json5
{
  mode: "client",
  connect: {
    endpoints: ["tcp/router.example.com:7447"],
  },
}
```

## Session Lifecycle

A session holds open connections and subscriptions for its entire lifetime.
Close it explicitly when done to release resources:

```rust
session.close().await.unwrap();
```

Or let it drop — Zenoh will clean up gracefully.

## Multiple Sessions

An application can open multiple sessions simultaneously (e.g., to connect to two
separate Zenoh networks or to use different configurations).

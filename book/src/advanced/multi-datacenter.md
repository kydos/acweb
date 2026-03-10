# Multi-Datacenter Deployments

Zenoh's topology freedom enables true geo-distributed deployments where data flows
seamlessly between datacenters, edge sites, and field devices.

## Architecture Pattern

```
┌──────────────────────────────────────────────────────┐
│                   Global Backbone                    │
│                                                      │
│  [DC-US-East] ──────────── [DC-EU-West]             │
│       │                         │                    │
└───────┼─────────────────────────┼────────────────────┘
        │                         │
   [Edge-NYC]               [Edge-Paris]
   /    │    \              /     │     \
[IoT] [Robot] [Car]    [IoT] [Robot] [Car]
```

## Router Configuration for Geo-Distribution

```json5
// DC Router (US East)
{
  mode: "router",
  listen: {
    endpoints: ["tls/0.0.0.0:7447"],
  },
  connect: {
    // Connect to EU datacenter
    endpoints: ["tls/dc-eu.example.com:7447"],
  },
  routing: {
    router: {
      region: "us/east",
    },
  },
}
```

## Latency Budgets

Zenoh's efficient wire format minimises inter-datacenter bandwidth:
at 5 bytes overhead per message, a 1 KB telemetry payload has **0.5% protocol overhead**.

Compare with HTTP/REST (~30% overhead for small payloads) or gRPC (~10%).

## Failover

Zenoh handles link failures transparently. If the transatlantic link drops:

- Local traffic continues uninterrupted within each region
- Reconnection is automatic when the link recovers
- Subscribers receive data from the nearest available source (with storage)

## Recommended Reading

- [Regionalisation](../routing/regionalisation.md) — hierarchical routing for massive scale
- [Storages](../core-concepts/storages.md) — persist data at each tier
- [Security](../security/README.md) — encrypt inter-datacenter links with mTLS

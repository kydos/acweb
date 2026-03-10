# Regionalisation

**Regionalisation** (introduced in Zenoh 1.x) extends the routing architecture to support
an **arbitrary number of routing levels** — enabling massive, Internet-scale deployments.

## The Problem It Solves

A flat routing table does not scale to tens of thousands of nodes.
Regionalisation introduces hierarchical routing: nodes within a **region** route locally;
inter-region traffic is handled by **region-level routers**.

## Regions

A region is a logical grouping of nodes that share a common router. Regions can be nested:

```
Global Router
├── Region EU
│   ├── Router Paris
│   │   ├── Sensor A
│   │   └── Sensor B
│   └── Router Berlin
│       └── Robot Fleet
└── Region US
    └── Router New York
        └── Cloud Services
```

## Configuration

```json5
{
  mode: "router",
  routing: {
    router: {
      region: "eu/paris",
    },
  },
}
```

## Benefits

- **Scalability** — routing tables remain bounded regardless of global node count
- **Locality** — intra-region traffic stays within the region; no unnecessary WAN hops
- **Resilience** — regions operate independently; global router failure doesn't affect local communication

Regionalisation was announced at ZUM25 (December 2025) and is available in Zenoh 1.x.

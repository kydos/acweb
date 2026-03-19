# Multi-Datacenter Deployments

Zenoh's topology freedom enables true geo-distributed deployments where data flows
seamlessly between datacenters, edge sites, and field devices.

## Architecture Pattern

![Multi-datacenter topology](/book-assets/geo-topology.svg)

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

## Failover

Zenoh handles link failures transparently. If the transatlantic link drops:

- Local traffic continues uninterrupted within each region
- Reconnection is automatic when the link recovers
- Subscribers receive data from the nearest available source (with storage)

## Recommended Reading

- [Storages](../core-concepts/storages.md) — persist data at each tier
- [Security](../security/README.md) — encrypt inter-datacenter links with mTLS

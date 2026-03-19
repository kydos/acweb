# Multicast Scouting

**Scouting** is the mechanism by which Zenoh nodes discover each other without
pre-configured addresses.

## How It Works

1. A new node sends a `Scout` multicast on `224.0.0.224:7446`
2. Existing nodes reply with a `Hello` containing their transport endpoints
3. The new node establishes direct connections

![Scouting: Scout multicast and Hello replies](/book-assets/scouting-flow.svg)

## Configuration

```json5
{
  scouting: {
    multicast: {
      enabled: true,
      address: "224.0.0.224:7446",
      interface: "auto",
      ttl: 1,
    },
    gossip: {
      enabled: true,   // peers gossip discovered nodes to each other
    },
  },
}
```

## Disabling Scouting

For production WAN deployments, disable scouting and configure explicit endpoints:

```json5
{
  scouting: {
    multicast: { enabled: false },
  },
  connect: {
    endpoints: ["tcp/router.prod.example.com:7447"],
  },
}
```

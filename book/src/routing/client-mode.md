# Client Mode

**Client mode** is designed for constrained or mobile devices that connect to a router
rather than maintaining a full routing table.

## Topology

All clients connect to the router; the router handles all routing decisions on their behalf.
Clients never communicate directly with each other.

![Client mode: star topology](/book-assets/client-star.svg)

## Configuration

```json5
{
  mode: "client",
  connect: {
    endpoints: ["tcp/router.example.com:7447"],
  },
}
```

## Characteristics

- Minimal resource footprint — the router handles all routing decisions
- No scouting traffic emitted
- Suitable for IoT devices, mobile nodes, and cloud functions

## Trade-offs

| | Client | Peer |
|---|---|---|
| RAM usage | Minimal | Higher |
| Dependency | Requires router | None |
| Connectivity | Router must be reachable | Direct |

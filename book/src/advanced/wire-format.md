# Wire Format

Zenoh's wire format is designed for minimal overhead — a **put** message requires only
**5 bytes** of header regardless of payload size.

## Frame Structure

```
┌─────────┬──────────────────────┬─────────────┐
│  Header │  Variable-length ID  │   Payload   │
│  1 byte │  1–9 bytes (VLE)     │  N bytes    │
└─────────┴──────────────────────┴─────────────┘
```

## Variable-Length Encoding (VLE)

Zenoh uses variable-length integers throughout the wire format.
Small values (< 128) use 1 byte; larger values use up to 9 bytes.
This keeps overhead minimal for typical sensor payloads.

## Message Types

| Code | Message | Description |
|---|---|---|
| `0x0B` | `Push` | Pub/sub data delivery |
| `0x0C` | `Request` | Queryable request |
| `0x0D` | `Response` | Queryable reply |
| `0x0E` | `ResponseFinal` | End of reply stream |
| `0x01` | `OAM` | Operations and management |

## Comparing Overhead

| Protocol | Min. overhead |
|---|---|
| Zenoh | **5 bytes** |
| MQTT 3.1.1 | 2 bytes fixed + variable header |
| DDS/RTPS | ~40+ bytes |
| HTTP/1.1 | ~300+ bytes |

## Efficiency at Scale

At 50 Gbps throughput with sub-13 µs latency (measured on commodity hardware),
Zenoh's wire format wastes nothing — a key design property for both cloud HPC
and battery-powered sensors.

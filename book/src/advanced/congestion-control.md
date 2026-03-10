# Congestion Control

Zenoh provides **per-publisher congestion control** to handle scenarios where a subscriber
cannot keep up with the publication rate.

## Modes

| Mode | Behaviour |
|---|---|
| `Drop` | Drop the message if the channel is full (default) |
| `Block` | Block the publisher until the channel drains |

```rust
let publisher = session
    .declare_publisher("sensors/camera/frames")
    .congestion_control(CongestionControl::Drop)
    .await?;
```

## Priority

Zenoh supports **8 priority levels** for message scheduling:

```rust
use zenoh::publication::Priority;

let publisher = session
    .declare_publisher("control/emergency")
    .priority(Priority::RealTime)   // highest priority
    .await?;
```

| Priority | Value | Use case |
|---|---|---|
| `RealTime` | 1 | Safety-critical control |
| `InteractiveHigh` | 2 | User interactions |
| `InteractiveLow` | 3 | UI updates |
| `DataHigh` | 4 | Sensor data |
| `Data` | 5 | Default |
| `DataLow` | 6 | Bulk transfer |
| `Background` | 7 | Logging |

## Express Mode

For ultra-low latency, disable fragmentation and batching:

```rust
let publisher = session
    .declare_publisher("control/motor")
    .express(true)
    .await?;
```

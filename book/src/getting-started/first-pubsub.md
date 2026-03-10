# First Pub/Sub

Now that you have the basics, let's build a complete pub/sub example with typed payloads.

## Typed Publisher with CDR Serialisation

Zenoh payloads are raw bytes — you choose your serialisation format.

```rust
use zenoh::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
struct SensorReading {
    sensor_id: u32,
    temperature: f32,
    timestamp_ms: u64,
}

#[tokio::main]
async fn main() {
    let session = zenoh::open(zenoh::config::default()).await.unwrap();
    let publisher = session
        .declare_publisher("sensors/temperature/**")
        .await
        .unwrap();

    let reading = SensorReading {
        sensor_id: 42,
        temperature: 23.5,
        timestamp_ms: 1_700_000_000_000,
    };

    let payload = serde_json::to_vec(&reading).unwrap();
    publisher.put(payload).await.unwrap();
    println!("Published: {:?}", reading);
}
```

## Subscriber with Deserialisation

```rust
#[tokio::main]
async fn main() {
    let session = zenoh::open(zenoh::config::default()).await.unwrap();
    let subscriber = session
        .declare_subscriber("sensors/**")
        .await
        .unwrap();

    while let Ok(sample) = subscriber.recv_async().await {
        let payload = sample.payload().to_bytes();
        if let Ok(reading) = serde_json::from_slice::<SensorReading>(&payload) {
            println!("[{}] temp = {}°C", reading.sensor_id, reading.temperature);
        }
    }
}
```

## Key Takeaways

- **Key expressions** are hierarchical paths — use `**` as a wildcard matching any number of path segments
- **Publishers** declare their intent once; sending is just `put(payload)`
- **Subscribers** filter by key expression — they receive all matching publications
- **Location transparency**: the publisher and subscriber do not know about each other

You're ready to explore [Core Concepts](../core-concepts/README.md).

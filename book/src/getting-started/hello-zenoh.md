# Hello Zenoh

Your first Zenoh program: a publisher and a subscriber in pure Rust.

## Publisher

```rust
use zenoh::prelude::*;

#[tokio::main]
async fn main() {
    let session = zenoh::open(zenoh::config::default()).await.unwrap();

    loop {
        session
            .put("hello/zenoh", "Hello, Zenoh!")
            .await
            .unwrap();
        println!("Published");
        tokio::time::sleep(std::time::Duration::from_secs(1)).await;
    }
}
```

## Subscriber

```rust
use zenoh::prelude::*;

#[tokio::main]
async fn main() {
    let session = zenoh::open(zenoh::config::default()).await.unwrap();

    let subscriber = session
        .declare_subscriber("hello/**")
        .await
        .unwrap();

    while let Ok(sample) = subscriber.recv_async().await {
        println!(
            "Received: {} = {:?}",
            sample.key_expr(),
            sample.payload()
        );
    }
}
```

## Run It

In two separate terminals:

```bash
# Terminal 1 — subscriber
cargo run --example subscriber

# Terminal 2 — publisher
cargo run --example publisher
```

You should see the subscriber printing messages as the publisher sends them.
No router is needed — the two peers discover each other via multicast scouting.

## What Happened?

- Both programs opened a **Session** (connection point to the Zenoh network)
- The publisher used key expression `hello/zenoh` to label its data
- The subscriber declared interest in `hello/**` — matching any key under `hello/`
- Zenoh routed matching data automatically, without a central broker

Next: [The Zenoh Router](./router.md).

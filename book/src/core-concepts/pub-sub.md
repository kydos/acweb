# Publishers & Subscribers

The pub/sub abstraction in Zenoh provides **location-transparent data in motion**.

## Publishers

A publisher declares intent to produce data on a key expression:

```rust
let publisher = session
    .declare_publisher("robots/*/pose")
    .await
    .unwrap();

// Send data
publisher.put(payload_bytes).await.unwrap();

// With metadata
publisher
    .put(payload_bytes)
    .encoding(Encoding::APPLICATION_JSON)
    .await
    .unwrap();
```

Declaring a publisher (rather than using `session.put()` directly) allows the router
to pre-compute routes, improving throughput.

## Subscribers

```rust
let subscriber = session
    .declare_subscriber("robots/**")
    .await
    .unwrap();

// Async handler
while let Ok(sample) = subscriber.recv_async().await {
    println!("Key: {}", sample.key_expr());
}

// Callback handler
let _subscriber = session
    .declare_subscriber("robots/**")
    .callback(|sample| println!("Got: {}", sample.key_expr()))
    .await
    .unwrap();
```

## Sample

Every received message is a `Sample` containing:

| Field | Type | Description |
|---|---|---|
| `key_expr()` | `KeyExpr` | The exact key the data was published on |
| `payload()` | `ZBytes` | The raw payload |
| `encoding()` | `Encoding` | Payload type hint |
| `timestamp()` | `Option<Timestamp>` | Optional HLC timestamp |
| `kind()` | `SampleKind` | `Put` or `Delete` |

## Delete

Publish a deletion (e.g., to remove a key from storages):

```rust
session.delete("robots/robot-42/pose").await.unwrap();
```

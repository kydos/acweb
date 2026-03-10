# Queryables & Replies

**Queryables** are Zenoh's abstraction for data at rest and remote computation.
They generalise both storage lookups and RPC under a single, location-transparent API.

## Get (Requester)

```rust
let replies = session
    .get("sensors/**/temperature")
    .await
    .unwrap();

while let Ok(reply) = replies.recv_async().await {
    match reply.result() {
        Ok(sample) => println!("Got: {:?}", sample.payload()),
        Err(err)   => eprintln!("Error: {:?}", err),
    }
}
```

## Queryable (Responder)

```rust
let queryable = session
    .declare_queryable("sensors/room1/temperature")
    .await
    .unwrap();

while let Ok(query) = queryable.recv_async().await {
    // Read the request parameters if any
    let params = query.parameters().to_string();

    query
        .reply(query.key_expr().clone(), "23.5°C".as_bytes())
        .await
        .unwrap();
}
```

## Consolidated Replies

When querying a key expression that matches multiple resources, consolidation
avoids returning stale data when multiple storages hold the same key:

```rust
let replies = session
    .get("sensors/**")
    .consolidation(ConsolidationMode::Latest)
    .await
    .unwrap();
```

## Key Insight

Queryables blur the line between "get from storage" and "compute on demand".
A queryable can:
- Return a cached value (acting as a storage)
- Compute a result on the fly (acting as a service)
- Fan out to other Zenoh resources and aggregate results

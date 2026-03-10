# Key Expressions

A **key expression** (KE) is Zenoh's naming system for all resources — it replaces URLs,
topics, and resource identifiers in a single unified grammar.

## Syntax

Key expressions are forward-slash-separated paths, optionally containing wildcards.

| Expression | Meaning |
|---|---|
| `sensors/room1/temperature` | Exact resource |
| `sensors/*/temperature` | All temperature sensors in any room (`*` = one segment) |
| `sensors/**/temperature` | All nested temperature resources (`**` = any number of segments) |
| `sensors/**` | Everything under `sensors/` |
| `**/temperature` | Any temperature resource anywhere in the namespace |

## Canonicalization

Zenoh normalizes key expressions internally. `a/b/../c` becomes `a/c`.

## Key Expression Language (KEL)

Key expressions support **intersections** and **inclusion** tests, enabling the router to
determine at compile time which subscriptions match which publications:

```rust
use zenoh::key_expr::KeyExpr;

let pub_ke: KeyExpr = "sensors/room1/temperature".try_into().unwrap();
let sub_ke: KeyExpr = "sensors/**/temperature".try_into().unwrap();

assert!(sub_ke.intersects(&pub_ke)); // true
```

## Best Practices

- Use hierarchical namespaces: `/{domain}/{entity}/{attribute}`
- Keep segments meaningful: `robots/robot-42/pose` over `r42p`
- Use `**` sparingly — broad wildcards require the router to fan out to more subscribers

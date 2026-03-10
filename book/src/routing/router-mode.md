# Router Mode

A **router** is a Zenoh node that routes messages between clients and peers across network segments.

## Starting a Router

```bash
zenohd
```

## Linking Routers

Routers connect to each other to form a routing fabric:

```json5
{
  mode: "router",
  connect: {
    endpoints: ["tcp/parent-router.example.com:7447"],
  },
  listen: {
    endpoints: ["tcp/0.0.0.0:7447"],
  },
}
```

## Router as Plugin Host

The router is also a **plugin host** — it can run storage backends, REST APIs,
admin interfaces, and custom extensions:

```json5
{
  plugins: {
    rest: { http_port: 8000 },
    storage_manager: { /* ... */ },
  },
}
```

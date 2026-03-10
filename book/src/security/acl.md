# Access Control Lists

Zenoh routers support **ACL rules** that restrict which subjects can perform which
operations on which key expressions.

## Configuration

```json5
{
  access_control: {
    enabled: true,
    default_permission: "deny",
    rules: [
      {
        id: "allow-sensors-pub",
        messages: ["put", "delete"],
        flows: ["ingress"],
        permission: "allow",
        key_exprs: ["sensors/**"],
        subjects: [{ cert_common_name: "sensor-node" }],
      },
      {
        id: "allow-dashboard-sub",
        messages: ["declare_subscriber"],
        flows: ["egress"],
        permission: "allow",
        key_exprs: ["sensors/**"],
        subjects: [{ cert_common_name: "dashboard" }],
      },
    ],
  },
}
```

## Subject Types

| Subject | Description |
|---|---|
| `cert_common_name` | Match by TLS certificate CN |
| `username` | Match by authenticated username |
| `interface` | Match by network interface |

# Token-Based Authentication

In addition to mTLS, Zenoh supports **username/password** authentication at the transport level.

## Configuration

```json5
{
  transport: {
    unicast: {
      auth: {
        usrpwd: {
          user: "zenoh-client",
          password: "s3cr3t",
          dictionary_file: "/etc/zenoh/credentials.json5",
        },
      },
    },
  },
}
```

## Credentials File (Router Side)

```json5
{
  credentials: [
    { user: "sensor-fleet",  password: "fleet-secret" },
    { user: "dashboard",     password: "dashboard-secret" },
  ],
}
```

## Combining Auth and ACL

Use authentication to establish identity, then apply ACL rules based on that identity:

```json5
{
  access_control: {
    rules: [
      {
        messages: ["put"],
        permission: "allow",
        key_exprs: ["sensors/**"],
        subjects: [{ username: "sensor-fleet" }],
      },
    ],
  },
}
```

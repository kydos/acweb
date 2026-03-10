# TLS Configuration

Zenoh supports **mutual TLS (mTLS)** for encrypting all transport connections.

## Generate Certificates

```bash
# Root CA
openssl req -x509 -newkey rsa:4096 -keyout ca.key -out ca.crt -days 3650 -nodes

# Router certificate (signed by CA)
openssl req -newkey rsa:4096 -keyout router.key -out router.csr -nodes
openssl x509 -req -in router.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out router.crt -days 365

# Client certificate
openssl req -newkey rsa:4096 -keyout client.key -out client.csr -nodes
openssl x509 -req -in client.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out client.crt -days 365
```

## Router TLS Configuration

```json5
{
  listen: {
    endpoints: ["tls/0.0.0.0:7447"],
  },
  transport: {
    unicast: {
      tls: {
        root_ca_certificate: "/etc/zenoh/ca.crt",
        server_certificate: "/etc/zenoh/router.crt",
        server_private_key: "/etc/zenoh/router.key",
        client_auth: true,  // require client certificates
      },
    },
  },
}
```

## Client TLS Configuration

```json5
{
  connect: {
    endpoints: ["tls/router.example.com:7447"],
  },
  transport: {
    unicast: {
      tls: {
        root_ca_certificate: "/etc/zenoh/ca.crt",
        client_certificate: "/etc/zenoh/client.crt",
        client_private_key: "/etc/zenoh/client.key",
      },
    },
  },
}
```

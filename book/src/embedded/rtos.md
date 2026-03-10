# FreeRTOS & Zephyr

Zenoh-Pico supports the most widely used embedded RTOSes out of the box.

## FreeRTOS

```c
// FreeRTOS task publishing Zenoh data
void zenoh_task(void *pvParameters) {
    z_owned_config_t config = z_config_default();
    zp_config_insert(z_loan(config), Z_CONFIG_MODE_KEY, z_string_make("client"));
    zp_config_insert(z_loan(config), Z_CONFIG_CONNECT_KEY,
                     z_string_make("tcp/192.168.1.100:7447"));

    z_owned_session_t s = z_open(z_move(config));
    zp_start_read_task(z_loan(s), NULL);
    zp_start_lease_task(z_loan(s), NULL);

    z_owned_publisher_t pub = z_declare_publisher(
        z_loan(s), z_keyexpr("freertos/hello"), NULL);

    for (;;) {
        z_publisher_put(z_loan(pub), (const uint8_t *)"tick", 4, NULL);
        vTaskDelay(pdMS_TO_TICKS(1000));
    }
}
```

## Zephyr

Zenoh-Pico has a native Zephyr module. Add to your `west.yml`:

```yaml
- name: zenoh-pico
  url: https://github.com/eclipse-zenoh/zenoh-pico
  revision: main
  path: modules/lib/zenoh-pico
```

Enable in `prj.conf`:

```conf
CONFIG_ZENOH_PICO=y
CONFIG_ZENOH_PICO_MODE_CLIENT=y
```

Then use the same C API as above — Zephyr's networking stack handles the transport.

## Platform Support Matrix

| Platform | TCP | UDP | Serial | TLS |
|---|---|---|---|---|
| FreeRTOS + lwIP | ✅ | ✅ | ✅ | ✅ |
| Zephyr | ✅ | ✅ | ✅ | ✅ |
| Arduino | ✅ | ✅ | ✅ | — |
| Bare-metal | — | — | ✅ | — |

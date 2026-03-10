# Zenoh-Pico (C)

**Zenoh-Pico** is the C implementation of Zenoh for microcontrollers.
It requires as little as 2 KB of RAM and runs on virtually any MCU with a C compiler.

## Features

- Implements the full Zenoh protocol (pub/sub, queryables)
- MISRA-C compliant — limits potential for memory errors
- Static analysis in CI
- Supports FreeRTOS, Zephyr, Arduino, and bare-metal

## Quick Start

```c
#include <zenoh-pico.h>

int main(void) {
    z_owned_config_t config = z_config_default();
    zp_config_insert(z_loan(config), Z_CONFIG_MODE_KEY, z_string_make("client"));
    zp_config_insert(z_loan(config), Z_CONFIG_CONNECT_KEY,
                     z_string_make("tcp/192.168.1.100:7447"));

    z_owned_session_t s = z_open(z_move(config));
    if (!z_check(s)) {
        return -1;
    }

    z_owned_publisher_t pub = z_declare_publisher(
        z_loan(s),
        z_keyexpr("sensors/temperature"),
        NULL
    );

    const char *payload = "23.5";
    z_publisher_put(z_loan(pub),
                    (const uint8_t *)payload, strlen(payload),
                    NULL);

    z_undeclare_publisher(z_move(pub));
    z_close(z_move(s));
    return 0;
}
```

## Building

```bash
git clone https://github.com/eclipse-zenoh/zenoh-pico
cd zenoh-pico
cmake -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build
```

See the [Zenoh-Pico repository](https://github.com/eclipse-zenoh/zenoh-pico) for
platform-specific guides (ESP32, STM32, Arduino, Zephyr).

# Embedded & Bare-Metal

Zenoh was designed from day one to run on the most resource-constrained hardware.
This chapter covers the two embedded implementations.

| Implementation | Language | Min RAM | Target |
|---|---|---|---|
| **Zenoh-Pico** | C / MISRA-C | ~2 KB | Any MCU with a C compiler |
| **zenoh-nostd** | Rust (no_std) | ~32 KB | Cortex-M, RISC-V, ESP32 |

## Chapters

- [Zenoh-Pico (C)](./zenoh-pico.md) — the C implementation for any microcontroller
- [Rust no_std](./no-std.md) — memory-safe Rust on bare-metal
- [Embassy Async](./embassy.md) — async Rust without an OS
- [FreeRTOS & Zephyr](./rtos.md) — running Zenoh on popular RTOSes

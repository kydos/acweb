# Rust no_std

**zenoh-nostd** is a memory-safe Rust implementation of Zenoh for `no_std` targets —
bare-metal hardware with no operating system.

> This implementation was previewed in the October 2025 Zenoh Report and is under
> active development. See the [eclipse-zenoh/zenoh-nostd](https://github.com/eclipse-zenoh/zenoh-nostd)
> repository for the latest status.

## Why Rust on Embedded?

- **Memory safety** — no buffer overflows, no use-after-free, no data races
- **Zero-cost abstractions** — no runtime overhead
- **Modern tooling** — Cargo, clippy, rustfmt, cross-compilation built-in

## Supported Targets

- ARM Cortex-M (thumbv7em, thumbv8m)
- RISC-V (riscv32imc)
- ESP32-C3/C6 (RISC-V via esp-hal)
- ESP32-S3 (Xtensa via esp-hal)

## Basic Example

```rust
#![no_std]
#![no_main]

use zenoh_nostd::prelude::*;

#[entry]
fn main() -> ! {
    let config = Config::client("tcp/192.168.1.100:7447");
    let session = Session::open(config).unwrap();

    loop {
        session.put("sensors/temperature", b"23.5").unwrap();
        cortex_m::asm::delay(8_000_000); // ~1 second at 8 MHz
    }
}
```

## Cargo.toml

```toml
[dependencies]
zenoh-nostd = { version = "0.1", default-features = false }
```

The `no_std` feature disables the standard library and allocator dependencies.

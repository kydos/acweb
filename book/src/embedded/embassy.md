# Embassy Async

**Embassy** is an async/await framework for embedded Rust that eliminates the need for
a traditional RTOS. Combining Embassy with Zenoh gives you efficient, event-driven
communication with minimal footprint.

## Why Embassy + Zenoh?

- Single-threaded async — no context switching overhead
- Cooperative multitasking — full control over scheduling
- Rich HAL support for ARM and RISC-V
- Native async networking (TCP via `embassy-net`)

## Example: Async Publisher

```rust
#![no_std]
#![no_main]

use embassy_executor::Spawner;
use embassy_time::{Duration, Timer};
use zenoh_nostd::prelude::*;

#[embassy_executor::main]
async fn main(_spawner: Spawner) {
    let config = Config::client("tcp/192.168.1.100:7447");
    let session = Session::open(config).await.unwrap();

    loop {
        session.put("sensors/temperature", b"23.5").await.unwrap();
        Timer::after(Duration::from_secs(1)).await;
    }
}
```

## Resources

- [Embassy project](https://embassy.dev)
- [embassy-net](https://github.com/embassy-rs/embassy/tree/main/embassy-net)
- [esp-hal](https://github.com/esp-rs/esp-hal) for Espressif targets

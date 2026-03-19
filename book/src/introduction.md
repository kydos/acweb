# Introduction

Welcome to **The Zenoh Book** — the definitive guide to the Zenoh protocol.

## What is Zenoh?

Zenoh (pronounced *zen-oh*) is an open protocol that unifies:

- **Data in motion** — publish/subscribe messaging with location-transparent key expressions
- **Data at rest and computations** — a location-transparent query/queryable abstraction that enables geo-distributed queries resolved by databases, by on-demand computation, or both

Unlike traditional protocols that address only one tier of the stack, Zenoh works from
**microcontrollers** up to **multi-datacenter cloud deployments** — with a single
coherent API and a 5-byte wire overhead.

## Design Goals

Zenoh was designed with five non-negotiable properties:

| Property | Description |
|---|---|
| **Wire efficiency** | 5-byte minimum overhead; fits smallest embedded payloads |
| **Scale up** | Scales to internet-wide deployments without re-architecting |
| **Scale down** | Runs on bare-metal with 2 KB RAM (Zenoh-Pico) |
| **Topology freedom** | Peer-to-peer, brokered, routed — any mix, no constraints |
| **Location transparency** | Producers and consumers are fully decoupled; resources move freely |

## Why Zenoh?

> *"I had to do something. I started working on the idea of coming up with a protocol
> that could work efficiently from the microcontroller up to the data-center, would
> not have any topological constraints and would provide unified abstraction for
> dealing with data in movement and data at rest."*
>
> — Angelo Corsaro, February 2026

The name **Zenoh** references the pre-Socratic philosopher **Zeno of Elea** (known for
paradoxes of infinity) and the Stoic founder **Zenon of Citium** — and doubles as an acronym:
**Ze**ro **N**etwork **O**ver**H**ead.

## Who Uses Zenoh?

Zenoh is the official DDS alternative selected by the **ROS 2 Technical Steering Committee**
and is recommended by the ITU for Intelligent Transport Systems. It is adopted by
General Motors (uProtocol), Bosch, Foxconn, NXP, Ampere Computing, Google/Intrinsic,
and Dexory Robotics, among others.

## How to Use This Book

If you're new to Zenoh, start with [Getting Started](./getting-started/README.md).
If you have a specific question, jump directly to the relevant chapter from the sidebar.

All code examples in this book use the **Rust API**. Bindings for Python, C, C++, Java,
and more are documented at [zenoh.io](https://zenoh.io).

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PrintButton } from "@/components/PrintButton";

// ─── Types ────────────────────────────────────────────────────────────────────

type Section = {
  title: string;
  body: string;
  image?: { src: string; alt: string; caption?: string };
  imageAfter?: { src: string; alt: string; caption?: string };
};

type Issue = {
  slug: string;
  label: string;
  subtitle: string;
  docxFile: string;
  sections: Section[];
};

// ─── Report data ─────────────────────────────────────────────────────────────

const issues: Record<string, Issue> = {
  "2025-10": {
    slug: "2025-10",
    label: "October 2025",
    subtitle: "Issue #1 — Launch & Security by Design",
    docxFile: "/2025.10-The Zenoh Report-FirstInstallment.docx",
    sections: [
      {
        title: "Launching The Zenoh Report",
        body: `Innovations in Zenoh and its ecosystem are moving so fast that even those of us at the core sometimes need a moment to catch our breath. That's exactly why we're launching The Zenoh Report — your monthly digest of highlights, stories, and events shaping the future of cloud-to-microcontroller data in motion, data at rest, and computations.`,
        image: {
          src: "/zenoh-report/2025-10-image1.png",
          alt: "Comic celebrating the many Zenoh papers published by academic and industrial researchers",
          caption: "Comic of the month celebrating the many Zenoh papers published by academic and industrial researchers.",
        },
      },
      {
        title: "Technology Highlights: Security by Design",
        body: `It is nowadays well understood and accepted that 60% to 70% of security related issues stem from memory mis-management. With the increasing dependence of our society, critical infrastructures, services and individual lives on digital technology it is understandable that security is becoming a growing concern. Governmental organizations such as CISA (US cyber defense agency) have launched a campaign called Security by Design to drive the roadmap to transition toward memory safe programming languages. As part of this campaign, there is a request for companies to have a defined strategy, by January 2026, on how to move toward memory safety.

The good news is that Zenoh is "Security by Design" ready! Zenoh is entirely written in Rust and has built-in support for security including authentication, encryption and access control. ZettaScale also provides extensions for zero-trust for those that require it.

Census Labs recently performed a security assessment for Zenoh and the results were extremely positive. All security concerns considered were addressed with a single exception — support for end-to-end encryption (this is a consequence of hop-to-hop routing). That said, if you have no trust in your infrastructure, end-to-end encryption is relatively easy to implement above the protocol layer — we've already done the heavy lifting for you. We are considering adding it as one of the zenoh-ext in the near future.

But how about embedded systems? Currently, Zenoh-Pico, which is the Zenoh protocol implementation for microcontrollers, is implemented in C. There are various elements to consider. First, if your microcontrollers don't communicate directly with the outside, but instead do it through a Zenoh router (which is written in Rust), then you are well protected. On the other hand if your micro-controllers are exposed into the wild, then the only reassurances we can give you are that (1) Zenoh-Pico undergoes static analysis as part of its CI, and (2) it is (mostly) developed in MISRA-C, which also limits the potential for memory issues.

That said, we are preparing the transition toward Rust also for microcontrollers. As a consequence of the increasing number of requests from the user community we are developing a Rust no-std implementation of the Zenoh Protocol. We have already something basic running in our labs — stay tuned because I'll share the latest on this newsletter.`,
      },
      {
        title: "Release Tracker: Zenoh 1.5.x — Hong Red Dragon",
        body: `Starting with version 1.5.0 Zenoh has entered its Hong Red Dragon epoch — where an epoch usually lasts for around six months.

This release was the first to break the 10M msgs/sec, and brought a series of improvements including:

• Faster and safer Shared Memory
• Simpler config for access control, downsampling, and QoS
• DSCP link control to fine-tune service classes
• Support for weighted routing graphs
• QUIC datagram support
• Zenoh-Pico for ThreadX

The release blog post provides a detailed description of the new features.

**Latest Release: 1.5.1**

The main features introduced by 1.5.1 are (1) transparent use of shared memory for large messages, (2) support for downsampling put and delete messages, as opposed to only push.

The graphs below show throughput on localhost, in both msg/sec and Gbps. From these it is easy to read that Zenoh achieves 11M msgs/sec for 8-byte payloads, 1.2 Gbps for 16-byte payloads, and 410 Gbps for 64 KB payloads.

For those of you that are not familiar with the Zenoh protocol at a message level, the advantage of being able to apply downsampling for Put/Delete as opposed to Push messages ensures that you can downsample publications of resources but not their deletion, which is usually what you want if you have distributed storages in your system.`,
        image: {
          src: "/zenoh-report/2025-10-image2.png",
          alt: "Zenoh 1.5.1 throughput benchmark — messages per second",
          caption: "Throughput benchmark: msg/sec for varying payload sizes.",
        },
        imageAfter: {
          src: "/zenoh-report/2025-10-image3.png",
          alt: "Zenoh 1.5.1 throughput benchmark — Gbps",
          caption: "Throughput benchmark: Gbps for varying payload sizes.",
        },
      },
      {
        title: "Community Spotlight — Pico ROS",
        body: `This month the community spotlight is on the Pico ROS project from Ubiquity Robotics. Pico-ROS builds a thin layer above Zenoh-Pico to bring ROS 2 abstractions to microcontrollers. It runs on anything already supported by Zenoh-Pico, including ESP32, Arduino, STM32, and more.`,
      },
      {
        title: "New Projects — ROS-Z",
        body: `Security concerns also apply to robotics, but based on what I've explained above, if your ROS 2 robot is using the Zenoh RMW you should feel reassured. The default ROS 2 deployment uses a Zenoh router for R2X, this minimizes the surface of attack for your robot to just one communicating entity written in Rust.

That said, we have been working also with a full Rust stack called ROS-Z that runs natively on Zenoh and interoperates with ROS 2. The main motivations for building ROS-Z were to (1) have a full Rust stack, (2) provide ergonomic API to Rust programmers while keeping the ROS 2 abstractions, (3) native support for zero-copy and shared memory, (4) independence from the serialisation format.

ROS-Z is still in its early development, but we have almost feature parity with ROS 2. Give it a try and let us know what you think about it.`,
      },
      {
        title: "Upcoming Webinar",
        body: `**Unveiling Zetta R2** — October 14, 2025.

Imagine being able to effortlessly record and replay data from Zenoh or any third-party protocols like MQTT and DDS with just a few clicks. Now, picture having the flexibility to do this locally, in the cloud, or wherever suits your system best. Join this webinar to learn how Zetta R2 supports these and more features.`,
      },
      {
        title: "Hot from the Press",
        body: `There is an increasing number of research papers published on Zenoh. Below a list of the latest:

• **"Comparison of FastDDS, Zenoh and vSomeIP: Automotive Middleware Performance"** (2025) — Analysis of Zenoh's performance compared to other middleware in automotive scenarios. arXiv:2505.02734
• **"Leveraging decentralized communication for privacy-preserving federated learning"** (Feb 2025) — Uses Zenoh in federated learning contexts. ScienceDirect
• **"On the performance of Zenoh in Industrial IoT Scenarios"** (Mar 2025) — Performance evaluation of Zenoh for industrial IoT. Ad Hoc Networks / ScienceDirect
• **"Facilitating distributed data-flow programming with Eclipse Zenoh"** (2025) — Discusses data-flow programming using Zenoh. ACM MobiCom workshop`,
      },
      {
        title: "Events",
        body: `The Zenoh team will be attending:

• ROSCon 2025 — October 27th–29th, Singapore
• ROSCon FR & DE 2025 — November 17th–20th, Strasbourg
• ROSCon India 2025 — December 2025`,
      },
    ],
  },

  "2025-11": {
    slug: "2025-11",
    label: "November 2025",
    subtitle: "Issue #2 — Embedded Rust & Zenoh 1.6.x Imoogi",
    docxFile: "/2025.11-TheZenohReport.docx",
    sections: [
      {
        title: "Zenoh User Meeting 2025 Announcement",
        body: `The Zenoh User Meeting 2025 (#ZUM25) will take place on December 12th, from 3 PM to 6 PM CET. The event will be a hybrid gathering hosted at ZettaScale HQ in Paris and streamed live on YouTube, Twitter, and LinkedIn.

ZUM is, at its core, a celebration of our community: the brilliant minds building real systems, solving real problems, and pushing Zenoh into new territory. Whether your experience is about performance, robotics, integration, IoT, or a creative use of Zenoh, we'd love to feature your story.

You're welcome to give a short 20–25 minute talk (live or remote) on your project, lessons learned, and what Zenoh has meant in your journey. We'll take care of the logistics — you bring the story and the passion. If you're interested, please contact me by November 20th so we can reserve your slot and coordinate the session details.`,
      },
      {
        title: "Technology Highlights: Embedded Rust",
        body: `Rust adoption has been steadily growing to the point of becoming the leading programming language of choice for new adventures in system programming and networking. The main reasons to choose Rust are often related to its memory and concurrency safety as well as the "zero-cost" abstractions. The push toward security by design we discussed in the last installment is accelerating this trend.

Another strength, often overlooked, is Rust's support for embedded programming. Rust can be run bare-metal over an increasing number of targets in combination with Rust-based OSes such as RTIC, TockOS, OxideOS, and ArielOS, or on C/C++ based OSes such as FreeRTOS and Zephyr. Embedded async Rust applications can also leverage the Embassy executor and its ecosystem to run essentially bare-metal and reduce the footprint and latency when compared to a traditional embedded OS.

Hardware support has been steadily expanding and maturing. ARM support is relatively strong, and recently Espressif announced the release of esp-hal 1.0.0: an officially supported bare-metal (no_std) hardware abstraction for Espressif devices, including some support for RISC-V-based ESPs. This marks the first officially supported Rust HAL from a hardware vendor — a key milestone for commercial adoption.

**Essential references for Embedded Rust:**

• **The Embedded Rust Book** — The definitive guide for embedded Rust development, maintained by the Rust Embedded Working Group. Covers development environment setup, best practices, and effective patterns for embedded software development.
• **The Discovery Book** — Hands-on introductory course for microcontroller-based embedded systems using Rust. Three versions targeting: micro:bit v2 (latest), micro:bit v1, and STM32F3Discovery.
• **Embedded Rust Bookshelf** — Central hub for all official embedded Rust documentation maintained by the Embedded Working Group.
• **ESP-HAL Documentation** — If you are targeting ESP hardware, the Rust and Embedded Rust on ESP resources are the right place to start.`,
        image: {
          src: "/zenoh-report/2025-11-image1.png",
          alt: "Embedded Rust ecosystem overview",
        },
      },
      {
        title: "Release Tracker: Zenoh 1.6.x — Imoogi",
        body: `Zenoh 1.6.x is codenamed Imoogi — after the Korean dragon that ascends to greatness. This release elevates the Zenoh ecosystem with key refinements and critical improvements. Imoogi focuses on stabilising and extending the groundbreaking features introduced in version 1.5.0, bringing enhanced shared memory capabilities, improved configuration management, better scalability, and expanded language binding support.

Key highlights:

• **Shared Memory** — Typed buffers, better allocators, flexible builders, buffer resizing, implicit SHM optimisations for large payloads, and pre-commit pages — all delivering major throughput gains.
• **Configuration** — Improved configuration parameters and enhanced downsampling controls.
• **API** — Full SHM API in Zenoh-Python, major updates in Zenoh-C and Zenoh-TS, and streamlined plugin interfaces.
• **Zenoh-Pico** — Advanced Pub/Sub support with TLS security, bringing enterprise-grade security and reliability features to constrained devices.
• **Scalability** — Fixed critical peer-to-peer topology issues and optimised discovery message processing, drastically reducing CPU consumption especially for ROS 2 use cases.
• **Zenoh Shell (NuZe)** — Combines Nushell's powerful structured data scripting with Zenoh commands, providing a convenient tool for testing, debugging, and building interactive Zenoh applications.
• **Documentation** — Significantly improved the Rust documentation and expanded with usage examples and cross-references; improved README.

The next minor release of the 1.6.x series will bring a few more improvements, including support for weighted graph routing.`,
      },
      {
        title: "New Projects — zenoh-nostd",
        body: `Following its demonstration at ROSCon25, we have now made zenoh-nostd publicly available. This is an implementation of Zenoh targeting Rust no-std and no-alloc environments. The implementation currently supports Pub/Sub — Queries will be landing before the end of the year. The current implementation leverages Embassy, but we plan to provide both a sync and an async version of the stack. Give it a try and let us know your thoughts!`,
      },
      {
        title: "Tip of the Month: Zenoh on WiFi Routers",
        body: `Many of you have seen me running Zenoh routers on WiFi routers and asked how to replicate it.

Running Zenoh directly on the WiFi router minimises air-time usage. When an application talks to a Zenoh router running elsewhere, the WiFi router must receive the traffic and forward it — consuming air-time twice. Running Zenoh on the access point itself halves this overhead, which is especially valuable when the router must forward data to many clients.

With this kind of deployment you can optimise the use of air-time for communication and thus optimise the throughput of your WiFi. Additionally, if you have multiple wireless access points you can route across them through Zenoh over a fixed network, making it easy to scale your system and exploit locality.

Steps to get this running:

• Get a WiFi Router supported by OpenWRT (see toh.openwrt.org)
• Check if the relevant target for your router is supported by the Rust compiler
• Install OpenWRT on your WiFi Router
• Cross-compile the Zenoh router:

\`\`\`
cargo install cross --git https://github.com/cross-rs/cross
cross build --target=YOUR_TARGET_HERE --release --bin zenohd
\`\`\`

For the OpenWRT One:

\`\`\`
cross build --target=aarch64-unknown-linux-musl --release --bin zenohd
\`\`\`

For ARM7 routers use target \`armv7-unknown-linux-musleabihf\` or \`armv7-unknown-linux-musleabi\`.

• Copy over the binary and run it. Ideally ensure the Zenoh router is started as a service when the WiFi router boots.`,
        image: {
          src: "/zenoh-report/2025-11-image2.png",
          alt: "Zenoh on WiFi router deployment diagram",
          caption: "Zenoh running on a WiFi access point — halving air-time usage and enabling locality-aware routing.",
        },
      },
      {
        title: "Community Spotlight",
        body: `The number of Zenoh related projects keeps growing steadily. This month highlights the Awesome Zenoh repository, which tracks community projects. If you want your project featured, simply submit a Pull Request.`,
      },
      {
        title: "Hot from the Press",
        body: `• **"A look at the Robot Operating System"** — A nice article on ROS 2 from Chris Lalancette explaining Zenoh's benefits in robotics.
• **"Designing for Distributed Heterogeneous Modularity: On Software Architecture and Deployment of the MoonBots"** — An article comparing Zenoh and DDS in supporting moon exploration robots.
• **"We're rolling out Zenoh RMW in production!"** — Dexory announces that they are rolling Zenoh into production.`,
      },
      {
        title: "Events",
        body: `• ROSCon FR & DE 2025 — 17–20 November 2025, Strasbourg, France
• ROSCon India 2025 — 18–20 December 2025, Pune, India`,
      },
    ],
  },

  "2026-01": {
    slug: "2026-01",
    label: "January 2026",
    subtitle: "Issue #3 — ZUM25 Recap, Physical AI & Zenoh 2.0",
    docxFile: "/2026.01-TheZenohReport.docx",
    sections: [
      {
        title: "A Note on This Newsletter",
        body: `We have just stepped into a brand new year, a year which I am sure will be full of happenings. Before we move into the content of this Zenoh Report, allow me to wish you a healthy, joyful and successful 2026!

But before we continue — and in case you had not noticed: **The Zenoh Report is written completely by hand.** In other words, it is not generated, edited, reviewed, or corrected with AI tools. Why? Because I want it to speak with my voice, talk with my accents, and keep my editorial style. AI tools are great, but this is a conversation between me and you, and I want it to be done with my voice.`,
      },
      {
        title: "#ZUM25 In a Nutshell",
        body: `As per our tradition, on December 12th we held the Zenoh User Meeting 2025 (#ZUM25). Many thanks to **David Crawley**, **Aaron Chong**, **Edgar Riba**, **Guillaume Doisy**, **Fredric Olsson**, **Alejandro Hernandez-Cordero**, and **Leonard Assouline**. The recording of the event is available on the ZettaScale YouTube channel.

Their presentations gave insights on how Zenoh is used today in robotics, fleet management, maritime applications, and secure group communication.

On our side we reviewed all Zenoh releases rolled out in 2025 and their key features. We introduced **regionalisation** — an extension of Zenoh's routing architecture and algorithms to allow for an arbitrary number of routing levels. This will massively improve scalability and we plan to start dropping features as soon as next month.

Finally, we announced that we have started to work on **Zenoh 2.0** and plan to release it in the second half of 2026.`,
        image: {
          src: "/zenoh-report/2026-01-image1.png",
          alt: "Zenoh 2025 releases summary",
          caption: "Overview of all Zenoh releases in 2025, presented at ZUM25.",
        },
      },
      {
        title: "Technology Highlights: Physical AI",
        body: `I had the pleasure to moderate the Physical AI Panel at ROSCon India. In preparing the panel, I had a chance to dig a little deeper into the topic and realise that concepts are not so crisply defined.

I strongly suggest reading the article **"Physical Intelligence as a New Paradigm"** by Meitin Sitti (Physical Intelligence Department of the Max Planck Institute). This article opens with a crisp and well written classification of the different "kinds" of intelligence where Sitti makes the difference between Computational Intelligence (CI), Physical Intelligence (PI) and Embodied Intelligence (EI):

• **Computational Intelligence (CI)** — cognitive processes such as reasoning, classification, etc.; historically the focus of traditional AI.
• **Physical Intelligence (PI)** — physically encoding sensing, actuation, control, memory, logic, computation, adaptation, learning and decision-making into the body of an agent.
• **Embodied Intelligence (EI)** — focuses on the tight coupling between an agent's body, the brain and the environment.

The term Embodied Intelligence was introduced in the 1980s by Rodney Brooks when he proposed that we should forget about symbol processing, internal representation, and high-level cognition, and focus on the interaction with the real world. His main point was that "intelligence requires a body."

When NVIDIA uses the term "Physical AI," their definitions closely align with what the academic community would call Embodied Intelligence. Hopefully this distinction will contribute to clearer terminology in our community.

References: "Physical Intelligence as a New Paradigm" — Meitin Sitti (Max Planck Institute) · "How the Body Shapes the Way We Think"`,
      },
      {
        title: "Release Tracker: Zenoh 1.7.x — Jiāolóng",
        body: `With Jiāolóng, finally land some features that have been on the wish list for some time. Two favourites are query cancellation and Zenoh-Pico co-localisation.

**Query Cancellation** — the ability to cancel an outstanding query through a cancellation token. Example: a query is cancelled if a result is not received within 5 seconds. Cancellation tokens allow you to cancel a query depending on application-specific logic, which may have nothing to do with a timeout.

**Zenoh-Pico Co-localisation Optimisation** — ensures that any Zenoh interaction such as pub/sub or query/reply happening in the context of the same session will be short-circuited to a local call — no serialization, no system call, nothing, just a function call. This optimisation greatly reduces latency and CPU utilisation for co-located publishers and subscribers.`,
      },
      {
        title: "New Projects — zenoh-fs",
        body: `zenoh-fs was designed to show one approach to solve the problem of transferring extremely large files reliably across the internet where connectivity cannot be guaranteed stable.

The challenge: traditional reliability protocols won't simply cut it. With the default configuration, Zenoh would fragment a large file into millions of fragments. If any intermediate hop crashes or gets partitioned — or if the receiver crashes after receiving 99.999% of the file — all work would be wasted.

zenoh-fs is inspired by latency-tolerant networking protocols. It leverages Zenoh's filesystem to store extremely large files as a set of fixed-size fragments. It implements a protocol to retrieve these files, leveraging checkpointing on the filesystem, to ensure that even across restarts it will resume from where it left off.

The nice thing about zenoh-fs is that you don't need to use an API to interact with it, you just need to drop a digest in the right directory. The project provides simple command line utilities for upload and download.`,
      },
      {
        title: "Zenoh 2.0 — What to Expect",
        body: `We have started working on Zenoh 2.0 and plan to release it in the second half of 2026. Zenoh 2.0 will introduce significant protocol-level improvements informed by years of deployment experience. More details will follow in upcoming issues of The Zenoh Report.`,
      },
      {
        title: "Hot from the Press",
        body: `One notable news: IBM's acquisition of Confluent. With its Kafka-based offer, Confluent consistently positioned itself as "The Central Nervous System for Modern Business" and IBM's move was motivated by the desire to let enterprise data flow toward the brain.

The parallel with Zenoh is unavoidable. Zenoh is emerging as **The Central and Peripheral Nervous System of Robotics** and alike.`,
      },
    ],
  },

  "2026-02": {
    slug: "2026-02",
    label: "February 2026",
    subtitle: "Issue #4 — Zenoh's Genesis & Protocol Origins",
    docxFile: "/2026.02-TheZenohReport.docx",
    sections: [
      {
        title: "St. Valentine",
        body: `The origin of St. Valentine is most probably related to at least three different Saint Valentinus, all of them martyred on February 14th around the 3rd century AD during Roman persecutions. Valentinus of Rome was a priest executed under Claudius II because he secretly married young couples in spite of the emperor's ban — Claudius thought that married young men did not make good soldiers. Saint Valentinus of Terni was martyred around 273 AD for refusing to renounce his faith and for converting others.

In Roman times, the Lupercalia purification and fertility festival was roughly between the 13th and 15th of February, involving animal sacrifice, ritual running, and other activities meant to promote fertility. Many historians think the Church's institution of Saint Valentine's feast near this date helped absorb or displace Lupercalia.

The meaning of this celebration has evolved: from Roman fertility themes, to Christian faithful self-sacrificing love, to contemporary romantic attachment. I remain attached to the interpretation of Saint Valentine as faithful, self-sacrificing love.`,
      },
      {
        title: "Zenoh Genesis — Technological Context",
        body: `Around 2009–2010, while serving as PrismTech's CTO and co-chairing the OMG DDS Special Interest Group (as one of its founding members), I was working on some of the earliest Extremely Large Scale Systems — deployments spanning military, aerospace, and Smart City infrastructure.

Working on these systems made it crystal clear that DDS would not scale as-is. The problem wasn't just scaling out — it was also scaling down. DDS was not designed to target constrained hardware nor constrained networks.

Other protocols like CoAP worked best integrating small devices with web applications in IoT scenarios, but were still cloud-centric and client/server in nature. MQTT, popularised by IBM as the "holy grail of IoT," had a broker-based approach that suits applications relying on a cloud broker but is problematic for high performance and low latency — especially when spatial locality can be exploited. The **MQTT paradox**: even two devices sitting on the same network talk through a broker sitting on a cloud thousands of kilometres away.

DDS and other Pub/Sub technologies had brought location transparency for data in motion. But once data was stored, that transparency vanished — forcing everything onto centralised cloud storage. This model does not work for low-latency access, applications that cannot guarantee cloud connectivity, or infrastructure-less deployments.

Back in those days, large-scale cloud-to-microcontroller systems were duct-taped together by assembling a series of protocols, each of which could work on a given system segment. I call this the **Digital Frankenstein era**.

My discomfort with this way of building systems grew unbearable. I started working on a new protocol that could work efficiently from the microcontroller up to the data-centre, impose no topological constraints, and provide unified abstractions for data in motion (pub/sub) and data at rest (distributed queries).

Mainstream protocols implementing Pub/Sub took one of two approaches: peer-to-peer (assuming each peer can directly communicate with every other peer) or broker-based. Flat P2P networks like DDS don't scale; brokered systems are too fragile with respect to loss of connectivity and not suitable for high performance.

Eventually it became clear that the same abstraction used for wells of data also applies to computations — giving Zenoh its third pillar: **location-transparent computations**.`,
      },
      {
        title: "Why \"Zenoh\"?",
        body: `I am Sicilian. Growing up in Sicily, I was immersed in the legacy of ancient Greek philosophy — Archimedes from Syracuse, Plato's visits, the pre-Socratics. I was particularly drawn to **Zeno of Elea**, whose paradoxes of infinity fascinated me from childhood.

**Stoicism** — founded in Athens by **Zenon of Citium** — left an equally deep mark on me through Marcus Aurelius' Meditations.

The name Zenoh thus references two philosophers: Zeno of Elea (pre-Socratic, paradoxes of infinity) and Zenon of Citium (Stoic founder). It also stands for **ZEro Network OverHead**.

The difference between Zenon and Zenoh is less than a letter — it is just the overshoot of the "h".`,
      },
      {
        title: "Zenoh 1.8.0 — Coming Features",
        body: `The next release will come with improvements, some stabilised APIs, and the initial drop of **regionalisation**.

Regionalisation generalises Zenoh routing from a two-level system to an arbitrary number of routing regions. Currently all routers belong to the same link-state domain, meaning the routing state space scales linearly in the number of routers. The new model: every Zenoh runtime can operate like a gateway with a north and a south side. The routing mechanisms used in the north and south are independent, and this basic mechanism can be used to create an arbitrary number of routing regions.`,
        image: {
          src: "/zenoh-report/2026-02-image1.png",
          alt: "Zenoh regionalisation routing architecture diagram",
          caption: "Zenoh 1.8.0 regionalisation: arbitrary routing regions via north/south gateway abstraction.",
        },
      },
      {
        title: "Zenoh 2.0 — Roadmap Update",
        body: `Planned for the second half of 2026. Features being considered:

• **Zenoh-ID based routing** — Native support for routing toward a specific Zenoh runtime identified by a given zenoh-id. Helps make admin-space queries more efficient and provides an alternative to breadcrumbs for routing replies.
• **Session Establishment** — A new session establishment handshake that reduces traffic and reduces the time to establish and re-establish a session.
• **Code Simplification** — Roll the protocol implementation of zenoh-nostd into mainstream Zenoh, sharing the same crates.
• **Configuration Refactoring** — Simplify and address existing inconsistencies in Zenoh's configuration.
• **Protocol Improvements** — Additional protocol improvements addressing different aspects.`,
        image: {
          src: "/zenoh-report/2026-02-image2.png",
          alt: "Zenoh 2.0 architecture overview",
          caption: "Zenoh 2.0 architectural improvements planned for H2 2026.",
        },
      },
      {
        title: "Queryables, Queries and Key Expression Constraints",
        body: `Originally in Zenoh there were no constraints on the keys returned by a queryable when responding to a given query. A few years ago it was decided to constrain, by default, the replies of a queryable to be key/values whose keys must match the key expression portion of the query.

However, there are valid use cases where you don't want this constraint — for example, a key (re)mapper service or anything that translates keys. This API has been unstable for some time but will be stabilised in v1.8.0:

\`\`\`rust
let mut builder = z
    .get("bar/baz/one")
    .accept_replies(zenoh::query::ReplyKeyExpr::Any)
    .wait()?;
\`\`\`

You can control when issuing a query whether you accept replies that don't match the query key. No changes are required on the queryable side.`,
      },
    ],
  },
};

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return Object.keys(issues).map((issue) => ({ issue }));
}

export async function generateMetadata({
  params,
}: {
  params: { issue: string };
}): Promise<Metadata> {
  const issue = issues[params.issue];
  if (!issue) return {};
  return {
    title: `The Zenoh Report — ${issue.label}`,
    description: issue.subtitle,
  };
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ZenohReportIssuePage({
  params,
}: {
  params: { issue: string };
}) {
  const issue = issues[params.issue];
  if (!issue) notFound();

  const allSlugs = Object.keys(issues);
  const currentIdx = allSlugs.indexOf(params.issue);
  const prevSlug = currentIdx > 0 ? allSlugs[currentIdx - 1] : null;
  const nextSlug = currentIdx < allSlugs.length - 1 ? allSlugs[currentIdx + 1] : null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24 print:py-8 print:max-w-none print:px-8">
      {/* Back link — hidden when printing */}
      <a
        href="../report"
        className="print:hidden inline-flex items-center gap-1.5 text-sm text-stone-400 dark:text-ash hover:text-accent dark:hover:text-accent transition-colors mb-8 group"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M5 12l7 7M5 12l7-7" />
        </svg>
        All Issues
      </a>

      {/* Header */}
      <div className="animate-fade-in">
        <p className="text-sm font-mono uppercase tracking-[0.2em] text-sky dark:text-sky mb-3 print:text-black">
          The Zenoh Report
        </p>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 dark:text-cream">
          {issue.label}
        </h1>
        <p className="mt-2 text-stone-500 dark:text-fog">{issue.subtitle}</p>

        {/* Action buttons — hidden when printing */}
        <div className="print:hidden mt-6 flex flex-wrap gap-3">
          <PrintButton />
          <a
            href={issue.docxFile}
            download
            className="btn-ghost flex items-center gap-2 w-fit"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Download .docx
          </a>
        </div>
      </div>

      {/* Divider */}
      <hr className="mt-10 border-stone-200 dark:border-ink-wire" />

      {/* Content sections */}
      <div className="mt-10 space-y-10 animate-fade-in animate-delay-100">
        {issue.sections.map((section, i) => (
          <div key={i}>
            <h2 className="text-xl font-serif font-semibold text-stone-900 dark:text-cream mb-3">
              {section.title}
            </h2>

            {/* Optional image before body */}
            {section.image && (
              <figure className="mb-5">
                <Image
                  src={section.image.src}
                  alt={section.image.alt}
                  width={800}
                  height={450}
                  className="rounded-lg border border-stone-200 dark:border-ink-wire w-full h-auto"
                />
                {section.image.caption && (
                  <figcaption className="mt-2 text-xs text-stone-400 dark:text-ash italic text-center">
                    {section.image.caption}
                  </figcaption>
                )}
              </figure>
            )}

            <div className="text-stone-700 dark:text-fog leading-relaxed text-sm md:text-base space-y-3">
              {section.body.split("\n\n").map((para, j) => {
                if (para.startsWith("```")) {
                  const code = para.replace(/^```\w*\n?/, "").replace(/\n?```$/, "");
                  return (
                    <pre key={j} className="bg-stone-100 dark:bg-ink-shell rounded-lg p-4 text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                      {code}
                    </pre>
                  );
                }
                if (para.startsWith("•")) {
                  const lines = para.split("\n");
                  return (
                    <ul key={j} className="space-y-1.5 pl-1">
                      {lines.map((line, k) => (
                        <li key={k} className="flex gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                          <span dangerouslySetInnerHTML={{ __html: line.replace(/^•\s*/, "").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p
                    key={j}
                    dangerouslySetInnerHTML={{
                      __html: para.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"),
                    }}
                  />
                );
              })}
            </div>

            {/* Optional image after body */}
            {section.imageAfter && (
              <figure className="mt-5">
                <Image
                  src={section.imageAfter.src}
                  alt={section.imageAfter.alt}
                  width={800}
                  height={450}
                  className="rounded-lg border border-stone-200 dark:border-ink-wire w-full h-auto"
                />
                {section.imageAfter.caption && (
                  <figcaption className="mt-2 text-xs text-stone-400 dark:text-ash italic text-center">
                    {section.imageAfter.caption}
                  </figcaption>
                )}
              </figure>
            )}
          </div>
        ))}
      </div>

      {/* Prev / Next navigation — hidden when printing */}
      <div className="print:hidden mt-16 pt-8 border-t border-stone-200 dark:border-ink-wire flex justify-between gap-4 text-sm animate-fade-in animate-delay-200">
        {prevSlug ? (
          <a
            href={`../report/${prevSlug}`}
            className="flex items-center gap-2 text-stone-500 dark:text-ash hover:text-accent dark:hover:text-accent transition-colors group"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M5 12l7 7M5 12l7-7" />
            </svg>
            <span>
              <span className="block text-xs text-stone-400 dark:text-ash/60">Previous</span>
              {issues[prevSlug].label}
            </span>
          </a>
        ) : (
          <div />
        )}
        {nextSlug ? (
          <a
            href={`../report/${nextSlug}`}
            className="flex items-center gap-2 text-right text-stone-500 dark:text-ash hover:text-accent dark:hover:text-accent transition-colors group"
          >
            <span>
              <span className="block text-xs text-stone-400 dark:text-ash/60">Next</span>
              {issues[nextSlug].label}
            </span>
            <svg viewBox="0 0 24 24" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

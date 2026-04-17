export interface NavChild {
  key: string;
  href: string;
}

export interface NavLink {
  key: string;
  href: string;
  children?: NavChild[];
}

export const siteConfig = {
  // ─── Personal Info ───────────────────────────────────────────────
  name: "Angelo Corsaro",

  // ─── Social Links ────────────────────────────────────────────────
  social: {
    github: "https://github.com/kydos",
    linkedin: "https://linkedin.com/in/corsaro",
  },
  contact: {
    calendlyUrl: "https://calendly.com/angelo-corsaro/30min",
  },

  // ─── Site Metadata ───────────────────────────────────────────────
  siteUrl: "https://corsaro.me",
  siteTitle: "Angelo Corsaro",
  siteDescription:
    "Angelo Corsaro, Ph.D. — inventor of the Zenoh Protocol. Expert in distributed systems, robotics middleware (ROS 2), AI-native infrastructure, and cloud-to-edge computing. CEO/CTO of ZettaScale Technology.",
  ogImage: "/og-image.png",
  analytics: {
    googleMeasurementId: "G-XY26Q9S0ZY",
  },

  // ─── Profile Photo ──────────────────────────────────────────────
  profilePhoto: "/me.png",

  // ─── Navigation ──────────────────────────────────────────────────
  navLinks: [
    { key: "home",    href: "/" },
    { key: "about",   href: "/about" },
    { key: "cv",      href: "/cv" },
    { key: "blog",    href: "/blog" },
    { key: "zenoh",   href: "/zenoh", children: [
      { key: "zenohDemo",   href: "http://zenoh.corsaro.me:8000/examples/web/" },
      { key: "zenohSpec",   href: "https://spec.zenoh.io" },
      { key: "zenohBook",   href: "/zenoh/book" },
      { key: "zenohPapers", href: "/zenoh/papers" },
      { key: "zenohReport", href: "/zenoh/report" },
      { key: "zenohTalks",  href: "/zenoh/talks" },
    ]},
    { key: "contact", href: "/contact" },
  ] as NavLink[],

  // ─── Open Source Projects ────────────────────────────────────────
  featuredRepos: [
    "eclipse-zenoh/zenoh",
    "eclipse-zenoh/zenoh-nostd",
  ],

  // ─── CV Data ─────────────────────────────────────────────────────
  cv: {
    resumePdfUrl: "/2026.03.09-Angelo_Corsaro_CV_Academic.pdf",

    stats: [
      { statKey: "statPublications", value: "100+" },
      { statKey: "statCitations", value: "1,478+" },
      { statKey: "statYearsExperience", value: "25+" },
      { statKey: "statStandards", value: "10+" },
    ],

    researchProfile:
      "Dr. Angelo Corsaro is a world expert in Internet-scale distributed systems, with 25+ years of contributions spanning protocol design, real-time middleware, consensus and clock synchronization algorithms, and cloud-to-edge computing. His work has had both deep theoretical impact (100+ peer-reviewed publications, 1,478+ citations) and transformative industrial reach (10+ international standards co-authored, multiple protocols deployed in millions of mission-critical systems).",

    researchInterests: [
      "Distributed algorithms: consensus, clock synchronization, causal ordering, CRDTs",
      "Cloud-to-edge-to-microcontroller computing continuum: protocol design, data-centric architectures",
      "Real-time and safety-critical systems: deterministic scheduling, memory safety, formal verification",
      "Distributed storage and large-scale data transfer: erasure coding, geo-distributed replication",
      "High-performance networking: zero-overhead abstractions, kernel bypass, RDMA-based middleware",
      "AI-native distributed infrastructure: federated learning, distributed inference",
    ],

    experience: [
      {
        role: "CEO / CTO & Co-Founder",
        company: "ZettaScale Technology",
        location: "Paris",
        period: "Jan 2022 – 2026",
        description:
          "Co-founded company commercializing Eclipse Zenoh. Led the protocol from research prototype to production release (Zenoh 1.0, Oct 2024) within the Eclipse Foundation. Directed all R&D, technology strategy, and scientific publications. Selected to represent France at the Genius Minds 2024 initiative (Business France / Choose France) at the French Embassy in London.",
      },
      {
        role: "Chief Technology Officer",
        company: "ADLINK Technologies Inc.",
        location: "Paris",
        period: "2016 – 2022",
        description:
          "Led the Advanced Technology Office. Established edge computing as strategic corporate pillar years before mainstream adoption. Directed technology scouting, R&D strategy, and standardization activities. Recognized as Power 200: Most Influential Data Economy Leader (2019).",
      },
      {
        role: "Chief Technology Officer",
        company: "PrismTech",
        location: "Orsay",
        period: "2009 – 2016",
        description:
          "Transformed company from niche aerospace middleware vendor to IoT platform leader. Architected Vortex, the first commercial platform supporting unified cloud and fog computing. Drove ~75% revenue growth. Gartner Cool Vendor (2014).",
      },
      {
        role: "Product Strategy Manager",
        company: "PrismTech",
        location: "Orsay",
        period: "2007 – 2009",
        description:
          "Crafted and executed open-source strategy that drove massive user adoption and market expansion.",
      },
      {
        role: "Software Technologies Scientist",
        company: "SELEX-ES / Finmeccanica",
        location: "Rome",
        period: "Jan 2005 – Aug 2007",
        description:
          "Strategic and Technological Planning Directorate. Technical Manager of Finmeccanica Multi-Core Processor Research Group. Chaired scientific committee for Finmeccanica Software Laboratory. Co-advised Ph.D. students at La Sapienza, Rome.",
      },
      {
        role: "Chief Architect, R&D",
        company: "SELEX-ES / Finmeccanica",
        location: "Rome",
        period: "Dec 2003 – Dec 2004",
        description:
          "Designed enterprise middleware platform for mission-critical air traffic control, airborne, and naval combat management systems. Led international team of ~50 engineers.",
      },
    ],

    teaching: [
      {
        role: "Lecturer",
        institution: "ESIEE Paris",
        note: "Member of the Conférence des Grandes Écoles Françaises",
        period: "2016 – 2022",
        courses: ["Internet of Things (IoT)", "Functional Programming"],
      },
      {
        role: "Ph.D. Co-Advisor",
        institution: "Università La Sapienza (Rome) & Washington University in St. Louis",
        period: "2003 – 2007",
        courses: [
          "Distributed systems, real-time middleware, fault-tolerant computing",
        ],
      },
    ],

    education: [
      {
        degree: "Ph.D. in Computer Science",
        institution: "Washington University in St. Louis",
        location: "Missouri, USA",
        period: "December 2004",
        note: "Advisor: Prof. Douglas C. Schmidt. Dissertation: Design and performance of ahead-of-time compiled Real-Time Java middleware.",
      },
      {
        degree: "M.S. in Computer Science",
        institution: "Washington University in St. Louis",
        location: "Missouri, USA",
        period: "January 2001",
      },
      {
        degree: "Laurea in Computer Engineering",
        institution: "Università degli Studi di Catania",
        location: "Italy",
        period: "July 1999",
        note: "Magna cum laude",
      },
    ],

    keyContributions: [
      {
        title: "Eclipse Zenoh — Inventor & Project Lead",
        period: "2015 – present",
        description:
          "Invented Zenoh, a protocol unifying pub/sub, geo-distributed queries, and computation across the full cloud-to-microcontroller continuum. 5-byte wire overhead, sub-13µs latency, 50 Gbps throughput, runs on 32 KB RAM. Selected by the ROS 2 Technical Steering Committee as official DDS alternative. Adopted by General Motors (uProtocol), Bosch, Volvo, Foxconn, and Volocopter. Recommended by ITU for Intelligent Transport Systems.",
      },
      {
        title: "OMG Data Distribution Service (DDS) Standard",
        period: "2003 – 2015",
        description:
          "Founding Co-Chair of the OMG DDS Special Interest Group and major architect of the DDS family of standards (DDS, DDSI-RTPS, DDS Security, DDS RPC, DDS4CCM, ISO C++ DDS API). DDS is the foundational real-time pub/sub standard deployed in millions of mission-critical systems: air traffic control, naval combat management, autonomous vehicles, and medical devices.",
      },
      {
        title: "Fog Computing: IEEE Standard 1934-2018",
        period: "2009 – 2020",
        description:
          "Pioneered distributed edge computation (originally termed 'Fluid Computing') before the term 'fog computing' was coined. Collaborated with the Cisco team, contributed to the OpenFog Consortium reference architecture, and created Eclipse fog05 — the first fully decentralized fog computing infrastructure. The reference architecture was adopted as IEEE Standard 1934-2018.",
      },
      {
        title: "Distributed Clock Synchronization",
        period: "2005 – 2009",
        description:
          "Invented a fully distributed internal clock synchronization algorithm based on coupling theory that achieved the lowest error bounds published at the time for dynamic large-scale systems. Published in IEEE TPDS (2009) and deployed in Finmeccanica/SELEX-ES fault-tolerant systems.",
      },
      {
        title: "Real-Time Java: jRate & Memory-Safety Algorithms",
        period: "2001 – 2004",
        description:
          "Created jRate, the first open-source ahead-of-time compiled RTSJ implementation, developed under the DARPA PCES program. Boeing used jRate to prove feasibility of Real-Time Java for flight-critical UAV avionics. Also invented a constant-time O(1) algorithm for verifying pointer assignment safety in scoped memory regions — the first solution to this fundamental RTSJ problem.",
      },
    ],

    selectedPublications: [
      {
        type: "Journal",
        citation:
          'Corsaro, A., Baldoni, R., Querzoni, L., et al. (2009). "Coupling-based internal clock synchronization for large-scale dynamic distributed systems." IEEE TPDS, 21(5), 607–619.',
      },
      {
        type: "Journal",
        citation:
          'Baldoni, G., Loudet, J., Cominardi, L. & Corsaro, A. (2024). "Data-centric service-based architecture for edge-native applications." IEEE Communications Magazine, 62(4), 32–38.',
      },
      {
        type: "Journal",
        citation:
          'Corsaro, A. & Schmidt, D.C. (2003). "The design and performance of real-time Java middleware." IEEE Trans. on Parallel and Distributed Systems, 14(11), 1155–1167.',
      },
      {
        type: "Journal",
        citation:
          'Yannuzzi, M., van Lingen, F., … Corsaro, A. & Olivé, A. (2017). "A new era for cities with fog computing." IEEE Internet Computing, 21(2), 54–67.',
      },
      {
        type: "Conference",
        citation:
          'Corsaro, A., Cominardi, L., Hecart, O., et al. (2023). "Zenoh: Unifying communication, storage and computation from the cloud to the microcontroller." Euromicro DSD, 422–428.',
      },
      {
        type: "Conference",
        citation:
          'Corsaro, A. & Cytron, R.K. (2003). "Efficient memory-reference checks for real-time Java." ACM SIGPLAN Notices, 38(7), 51–58. [LCTES \'03 / co-located with PLDI]',
      },
    ],

    standards: [
      "OMG Data Distribution Service (DDS) v1.0–1.4 — Founding Co-Chair (2004–2015)",
      "OMG DDSI-RTPS (interoperability wire protocol) v2.x — Contributor",
      "OMG DDS Security, DDS RPC, DDS4CCM — Co-author",
      "ISO C++ DDS API (SimD) — Primary author; adopted as OMG standard",
      "OpenFog Consortium Reference Architecture — Key contributor; adopted as IEEE Standard 1934-2018",
    ],

    openSource: [
      { name: "Eclipse Zenoh", role: "Inventor & project lead" },
      { name: "Eclipse Cyclone DDS", role: "Co-lead" },
      { name: "Eclipse fog05", role: "Creator & project lead" },
      { name: "jRate", role: "Creator — first open-source ahead-of-time compiled RTSJ" },
      { name: "SimD", role: "Sole author — ISO C++ DDS API (adopted as OMG standard)" },
    ],

    recognition: [
      { year: "2024", award: "Technology CEO of the Year" },
      { year: "2024", award: "Best Cloud-to-Device Continuum Platform Award" },
      { year: "2024", award: "Genius Minds 2024 — Selected to represent France, French Embassy London" },
      { year: "2023–24", award: "Top 10 V2X Startup to Watch" },
      { year: "2023", award: "Spring50 Finalist — Paris-Saclay SPRING (ZettaScale)" },
      { year: "2019", award: "Power 200: World's Most Influential Data Economy Leaders" },
      { year: "2018", award: "Compass Intelligence Award: Best M2M & IoT Company" },
      { year: "2017–18", award: "Top 50 Most Influential Executives in Edge Computing" },
      { year: "2014", award: "Gartner Cool Vendor" },
      { year: "Ongoing", award: "IEEE Senior Member | ACM Member | Eclipse Foundation Board of Directors" },
    ],

    skills: {
      skillCatLanguages: [
        "Rust (expert)",
        "C/C++ (25+ years)",
        "OCaml (expert)",
        "Java (expert)",
        "Scala (expert)",
        "Python",
        "JavaScript",
      ],
      skillCatProtocols: ["Zenoh", "DDS / DDSI-RTPS", "MQTT", "AMQP", "REST / HTTP"],
      skillCatDomains: [
        "Distributed Systems",
        "Edge & Fog Computing",
        "IoT",
        "Robotics (ROS 2)",
        "Real-Time Systems",
        "Automotive (V2X)",
      ],
    },

    naturalLanguages: [
      { lang: "Italian", level: "Native" },
      { lang: "English", level: "Fluent" },
      { lang: "French", level: "Fluent" },
    ],
  },
} as const;

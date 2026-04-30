import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

const locales = ["en", "fr", "it", "ja", "es", "zh", "ko", "ru"] as const;
const siteUrl = "https://corsaro.me";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "zenoh" });
  return {
    title: t("talksHeading"),
    description:
      "Conference talks, keynotes, workshops, and webinars on the Zenoh Protocol and distributed systems by Angelo Corsaro — inventor of Zenoh.",
    keywords: [
      "Zenoh talks",
      "Zenoh presentations",
      "Angelo Corsaro keynote",
      "Eclipse Zenoh conference",
      "Zenoh Protocol video",
      "distributed systems talk",
      "ROS 2 Zenoh",
    ],
    alternates: {
      canonical: `${siteUrl}/${locale}/zenoh/talks`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}/zenoh/talks`])),
        "x-default": `${siteUrl}/en/zenoh/talks`,
      },
    },
  };
}

// ─── Data ─────────────────────────────────────────────────────────────────────

type Talk = {
  title: string;
  event: string;
  location?: string;
  year: number;
  month?: string;
  type: "conference" | "keynote" | "workshop" | "webinar" | "invited";
  description?: string;
  videoUrl?: string;
  slidesUrl?: string;
  paperUrl?: string;
};

const keynotes: Talk[] = [
  {
    title: "Eclipse Zenoh: Dependable Communication Infrastructure for the Cloud-to-Thing Continuum",
    event: "54th Annual IEEE/IFIP International Conference on Dependable Systems and Networks (DSN 2025)",
    year: 2025,
    month: "June",
    type: "keynote",
    description:
      "Invited keynote examining Zenoh's architecture for resilient, fault-tolerant distributed communication — covering decentralised peer-to-peer topology, churn-resilient discovery, and deployment in safety-critical aerospace and industrial control systems.",
  },
  {
    title: "Zenoh 2.0: Unifying Communication Across the Digital System Stack",
    event: "28th Euromicro Conference on Digital System Design (DSD 2025)",
    year: 2025,
    month: "September",
    type: "keynote",
    description:
      "Keynote on the Zenoh 2.0 roadmap and its evolution from Zenoh 1.0 — covering new protocol capabilities, the growing ecosystem in automotive and robotics, and the path toward a universal communication fabric spanning microcontroller to cloud.",
  },
  {
    title: "Zenoh: The Future of ROS 2 Communication",
    event: "ROSCon India 2025",
    location: "India",
    year: 2025,
    type: "keynote",
    description:
      "Keynote on Zenoh's role as the official DDS alternative for ROS 2, covering real deployment experience from robot platforms to multi-robot swarm systems and the roadmap for deeper integration with the ROS 2 ecosystem.",
  },
  {
    title: "Zenoh as the Next-Generation Middleware for ROS 2",
    event: "ROSCon India 2024",
    location: "India",
    year: 2024,
    type: "keynote",
    description:
      "Keynote presenting Zenoh's selection by the ROS 2 Technical Steering Committee as the official DDS alternative — with performance comparisons, peer-to-peer operation, and infrastructure-free multi-robot communication demonstrations.",
  },
];

const conferenceTalks: Talk[] = [
  {
    title: "ROS-Z: A Zenoh-Native Runtime for ROS 2",
    event: "ROSCon France (ROSConFR 2025)",
    location: "France",
    year: 2025,
    type: "conference",
    description:
      "Presents ROS-Z, a Zenoh-native implementation of the ROS 2 communication layer that eliminates the DDS abstraction barrier and exposes Zenoh's unified pub/sub, queryable, and storage semantics directly within the ROS 2 programming model.",
  },
  {
    title: "Zenoh: Unifying Communication, Storage and Computation from the Cloud to the Microcontroller",
    event: "26th Euromicro Conference on Digital System Design (DSD)",
    location: "Durres, Albania",
    year: 2023,
    month: "September",
    type: "conference",
    description:
      "Presents Zenoh's unified protocol design for the full cloud-to-microcontroller compute continuum, with benchmarks showing sub-13µs latency, 50 Gbps throughput, and a 5-byte wire overhead running down to 32 KB RAM devices.",
    paperUrl: "https://ieeexplore.ieee.org/document/10456820",
  },
  {
    title: "A Data Flow Programming Framework for 6G-Enabled Internet of Things Applications",
    event: "IEEE World Forum on Internet of Things (WF-IoT)",
    year: 2023,
    type: "conference",
    description:
      "Presents a Zenoh-based dataflow programming framework for 6G-enabled IoT applications, demonstrating how Zenoh's query and storage abstractions simplify the design of intelligence at the edge.",
  },
  {
    title: "Facilitating Distributed Data-Flow Programming with Eclipse Zenoh: The ERDOS Case",
    event: "1st Workshop on Serverless Mobile Networking for 6G (WoSMNin6G @ ACM MobiCom)",
    year: 2021,
    month: "October",
    type: "workshop",
    description:
      "Demonstrates Zenoh as the communication backbone for ERDOS, a data-flow programming framework for autonomous driving pipelines. Shows how Zenoh's unified pub/sub and queryable abstractions simplify sensor-fusion graphs that would otherwise require multiple middleware stacks.",
    paperUrl: "https://dl.acm.org/doi/10.1145/3469263.3469858",
  },
  {
    title: "Zenoh-based Dataflow Framework for Autonomous Vehicles",
    event: "IEEE 21st International Conference on Software Quality, Reliability & Security Companion (QRS Companion)",
    year: 2021,
    type: "conference",
    description:
      "Presents the Zenoh-based data-flow architecture for autonomous vehicle sensor fusion, perception, and planning pipelines, with a focus on the latency, bandwidth, and topology requirements of in-vehicle compute.",
    paperUrl: "https://ieeexplore.ieee.org/document/9742202",
  },
  {
    title: "fogØ5: Unifying the Computing, Networking and Storage Fabrics End-to-End",
    event: "Cloudification of the Internet of Things (CIoT 2018)",
    year: 2018,
    type: "conference",
    description:
      "Introduces fog05, the first fully decentralised fog computing infrastructure, and its vision for a unified cloud-to-edge compute fabric — the architectural predecessor to what Zenoh later unified at the protocol level.",
    paperUrl: "https://www.researchgate.net/publication/326507665",
  },
];

// ─── Components ───────────────────────────────────────────────────────────────

const typeLabels: Record<Talk["type"], string> = {
  conference: "Conference",
  keynote: "Keynote",
  workshop: "Workshop",
  webinar: "Webinar",
  invited: "Invited Talk",
};

const typeBadgeClass: Record<Talk["type"], string> = {
  conference: "bg-azure/10 text-azure dark:bg-azure/20 dark:text-sky",
  keynote: "bg-accent/10 text-accent dark:bg-accent/20 dark:text-accent",
  workshop: "bg-stone-100 text-stone-600 dark:bg-ink-shell/40 dark:text-sand",
  webinar: "bg-azure/5 text-azure/80 dark:bg-azure/10 dark:text-fog",
  invited: "bg-accent/5 text-accent/80 dark:bg-accent/10 dark:text-sand",
};

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function SlidesIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

function TalkCard({ talk }: { talk: Talk }) {
  return (
    <div className="group p-5 rounded-xl border border-stone-200 dark:border-ink-wire bg-white dark:bg-ink-card transition-colors duration-200">
      {/* Type badge + year */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeBadgeClass[talk.type]}`}>
          {typeLabels[talk.type]}
        </span>
        <span className="text-xs text-stone-400 dark:text-ash font-mono">
          {talk.month ? `${talk.month} ` : ""}{talk.year}
        </span>
        {talk.location && (
          <span className="text-xs text-stone-400 dark:text-ash">· {talk.location}</span>
        )}
      </div>

      {/* Title */}
      <h3 className="mt-2 font-medium text-sm leading-snug text-stone-900 dark:text-cream">
        {talk.title}
      </h3>

      {/* Event */}
      <p className="mt-1 text-xs text-stone-500 dark:text-fog italic">
        {talk.event}
      </p>

      {/* Description */}
      {talk.description && (
        <p className="mt-2 text-xs text-stone-400 dark:text-ash leading-relaxed">
          {talk.description}
        </p>
      )}

      {/* Links */}
      {(talk.videoUrl || talk.slidesUrl || talk.paperUrl) && (
        <div className="mt-3 flex flex-wrap gap-3">
          {talk.videoUrl && (
            <a
              href={talk.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-azure dark:text-sky hover:text-accent transition-colors duration-200"
            >
              <PlayIcon />
              Video
            </a>
          )}
          {talk.slidesUrl && (
            <a
              href={talk.slidesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-azure dark:text-sky hover:text-accent transition-colors duration-200"
            >
              <SlidesIcon />
              Slides
            </a>
          )}
          {talk.paperUrl && (
            <a
              href={talk.paperUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-azure dark:text-sky hover:text-accent transition-colors duration-200"
            >
              <ExternalIcon />
              Paper
            </a>
          )}
        </div>
      )}
    </div>
  );
}

function Section({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-12">
      <div className="flex items-baseline gap-3 mb-4 pb-3 border-b border-stone-200 dark:border-ink-wire">
        <h2 className="text-xl font-serif font-semibold text-stone-900 dark:text-cream">{title}</h2>
        <span className="text-sm text-stone-400 dark:text-ash font-mono">{count}</span>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ZenohTalksPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations("zenoh");
  const total = keynotes.length + conferenceTalks.length;

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 dark:text-cream animate-fade-in">
        {t("talksHeading")}
      </h1>
      <p className="mt-3 text-stone-500 dark:text-fog leading-relaxed animate-fade-in animate-delay-100">
        Keynotes, conference presentations, workshops, and webinars on Zenoh and distributed systems.{" "}
        {total} entries — video archive being expanded.
      </p>

      {/* External links */}
      <div className="mt-5 flex flex-wrap gap-3 animate-fade-in animate-delay-100">
        <a
          href="https://zenoh.io"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost text-sm flex items-center gap-1.5"
        >
          <ExternalIcon />
          zenoh.io
        </a>
        <a
          href="https://github.com/eclipse-zenoh/zenoh"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost text-sm flex items-center gap-1.5"
        >
          <ExternalIcon />
          Eclipse Zenoh
        </a>
      </div>

      {/* Sections */}
      <div className="animate-fade-in animate-delay-200">
        <Section title="Keynotes" count={keynotes.length}>
          {keynotes.map((talk, i) => (
            <TalkCard key={i} talk={talk} />
          ))}
        </Section>

        <Section title="Conference & Workshop Presentations" count={conferenceTalks.length}>
          {conferenceTalks.map((talk, i) => (
            <TalkCard key={i} talk={talk} />
          ))}
        </Section>

        {/* Webinars callout */}
        <div className="mt-12">
          <div className="flex items-baseline gap-3 mb-4 pb-3 border-b border-stone-200 dark:border-ink-wire">
            <h2 className="text-xl font-serif font-semibold text-stone-900 dark:text-cream">Webinars & Live Demos</h2>
          </div>
          <div className="rounded-xl border border-stone-200 dark:border-ink-wire bg-stone-50 dark:bg-ink-card p-6">
            <p className="text-sm text-stone-600 dark:text-fog leading-relaxed">
              Regular webinars on Zenoh — covering performance deep-dives, new protocol features,
              robotics integrations, and automotive deployments. Recordings and upcoming event details are available
              at{" "}
              <a
                href="https://zenoh.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-azure dark:text-sky hover:text-accent transition-colors underline underline-offset-2"
              >
                zenoh.io
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

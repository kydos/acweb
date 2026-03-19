import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

const locales = ["en", "fr", "it", "ja", "es", "zh", "ko", "ru"] as const;
const siteUrl = "https://corsaro.me";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "zenoh" });
  return {
    title: t("papersHeading"),
    description:
      "Scientific papers, journal articles, conference proceedings, and press coverage on Zenoh Protocol and distributed systems research by Angelo Corsaro.",
    keywords: [
      "Zenoh papers",
      "Zenoh research",
      "Angelo Corsaro publications",
      "Eclipse Zenoh academic",
      "Zenoh performance benchmarks",
      "Zenoh ROS 2 study",
      "distributed systems research",
      "pub/sub protocol research",
      "Zenoh DDS comparison",
    ],
    alternates: {
      canonical: `${siteUrl}/${locale}/zenoh/papers`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}/zenoh/papers`])),
        "x-default": `${siteUrl}/en/zenoh/papers`,
      },
    },
    openGraph: {
      title: t("papersHeading"),
      description:
        "Scientific papers, journal articles, conference proceedings, and press coverage on Zenoh Protocol and distributed systems research by Angelo Corsaro.",
      url: `${siteUrl}/${locale}/zenoh/papers`,
      type: "website",
    },
  };
}

// ─── Data ─────────────────────────────────────────────────────────────────────

type Paper = {
  title: string;
  authors: string;
  venue: string;
  year: number | string;
  url?: string;
  doi?: string;
  note?: string;
  lang?: string;
};

const journals: Paper[] = [
  {
    title: "Data-Centric Service-Based Architecture for Edge-Native 6G Network",
    authors: "G. Baldoni, J. Quevedo, C. Guimarães, A. de la Oliva, A. Corsaro",
    venue: "IEEE Communications Magazine, vol. 62, no. 4, pp. 32–38",
    year: 2024,
    url: "https://ieeexplore.ieee.org/document/10508468",
  },
  {
    title: "A Dataflow-Oriented Approach for Machine-Learning-Powered Internet of Things Applications",
    authors: "G. Baldoni, R. Teixeira, C. Guimarães, M. Antunes, D. Gomes, A. Corsaro",
    venue: "Electronics (MDPI), vol. 12, no. 18, art. 3940",
    year: 2023,
    url: "https://www.mdpi.com/2079-9292/12/18/3940",
  },
];

const conferences: Paper[] = [
  {
    title: "Zenoh: Unifying Communication, Storage and Computation from the Cloud to the Microcontroller",
    authors: "A. Corsaro, L. Cominardi, O. Hecart, G. Baldoni, J. E. P. Avital, J. Loudet, C. Guimarães, M. Ilyin, D. Bannov",
    venue: "26th Euromicro Conference on Digital System Design (DSD 2023), pp. 422–428",
    year: 2023,
    url: "https://ieeexplore.ieee.org/document/10456820",
  },
  {
    title: "A Data Flow Programming Framework for 6G-Enabled Internet of Things Applications",
    authors: "G. Baldoni, J. Loudet, C. Guimarães, S. Nair, A. Corsaro",
    venue: "IEEE World Forum on Internet of Things (WF-IoT 2023)",
    year: 2023,
  },
  {
    title: "Zenoh-based Dataflow Framework for Autonomous Vehicles",
    authors: "G. Baldoni, J. Loudet, L. Cominardi, A. Corsaro, Y. He",
    venue: "IEEE QRS Companion 2021, pp. 555–560",
    year: 2021,
    url: "https://ieeexplore.ieee.org/document/9742202",
  },
  {
    title: "Facilitating Distributed Data-Flow Programming with Eclipse Zenoh: The ERDOS Case",
    authors: "G. Baldoni, J. Loudet, L. Cominardi, A. Corsaro, Y. He",
    venue: "1st Workshop on Serverless Mobile Networking for 6G (ACM MobiCom), pp. 1–6",
    year: 2021,
    doi: "10.1145/3469263.3469858",
    url: "https://dl.acm.org/doi/10.1145/3469263.3469858",
  },
  {
    title: "fogØ5: Unifying the Computing, Networking and Storage Fabrics End-to-End",
    authors: "A. Corsaro, G. Baldoni",
    venue: "Cloudification of the Internet of Things (CIoT 2018)",
    year: 2018,
    url: "https://www.researchgate.net/publication/326507665",
  },
];

const bookChapters: Paper[] = [];

const magazineArticles: Paper[] = [
  {
    title: "ROS 2 Communication Stack: Exploring the Improvements Brought by Zenoh",
    authors: "A. Corsaro",
    venue: "Electronic Design",
    year: 2024,
    url: "https://www.electronicdesign.com/technologies/communications/article/55039208/zettascale-ros-2-communication-stack-exploring-the-improvements-brought-by-zenoh",
  },
  {
    title: "Communicating Towards Net Zero",
    authors: "A. Corsaro (interview)",
    venue: "Connected World",
    year: 2023,
    url: "https://connectedworld.com/communicating-towards-net-zero/",
  },
  {
    title: "Q&A: Supercharging Eclipse Zenoh and Eclipse Cyclone DDS",
    authors: "A. Corsaro",
    venue: "Eclipse Foundation Newsletter",
    year: 2022,
    url: "https://newsroom.eclipse.org/eclipse-newsletter/2022/february/qa-supercharging-eclipse-zenoh-and-eclipse-cyclone-dds",
  },
  {
    title: "ZettaScale Designs Zenoh to Transcend DDS for Automotive, ROS Communications",
    authors: "Staff",
    venue: "The Robot Report",
    year: 2024,
    url: "https://www.therobotreport.com/zettascale-designs-zenoh-to-transcend-dds-for-automotive-ros-communications/",
  },
  {
    title: "New Network Protocol Zenoh Slashes the Energy Required to Send Data",
    authors: "Staff",
    venue: "All About Circuits",
    year: 2023,
    url: "https://www.allaboutcircuits.com/news/new-network-protocol-zenoh-slashes-energy-required-to-send-data/",
  },
  {
    title: "Eclipse Zenoh 1.0.0 Debuts, Redefining Connectivity for Robotics and Automotive",
    authors: "Eclipse Foundation",
    venue: "Eclipse Foundation Newsroom / GlobeNewswire",
    year: 2024,
    url: "https://newsroom.eclipse.org/news/announcements/eclipse-zenoh-100-debuts-redefining-connectivity-robotics-and-automotive",
  },
  {
    title: "Eclipse Foundation Releases Zenoh 1.0.0 for Robotics and IoT",
    authors: "Staff",
    venue: "IoT Now",
    year: 2024,
    url: "https://www.iot-now.com/2024/10/22/147409-eclipse-foundation-releases-zenoh-1-0-0-for-robotics-and-iot/",
  },
  {
    title: "Zenoh Protocol Security Analysis",
    authors: "Census Labs",
    venue: "census-labs.com",
    year: 2025,
    url: "https://census-labs.com/news/2025/03/17/zenoh-protocol-security-analysis/",
  },
];

const zenohPapersByOthers: Paper[] = [
  {
    title: "Stepping Toward Zenoh Protocol in Automotive Scenarios",
    authors: "A.-I. Chisăliță, A. Korodi",
    venue: "IEEE Access",
    year: 2025,
    doi: "10.1109/ACCESS.2025.3612964",
    url: "https://ieeexplore.ieee.org/document/11175385",
  },
  {
    title: "On the Performance of Zenoh in Industrial IoT Scenarios",
    authors: "M. Barón, L. Diez, M. Zverev, J. R. Juárez, R. Agüero",
    venue: "Ad Hoc Networks, vol. 170, art. 103784",
    year: 2025,
    doi: "10.1016/j.adhoc.2025.103784",
    url: "https://www.sciencedirect.com/science/article/pii/S1570870525000320",
  },
  {
    title: "Automotive Middleware Performance: Comparison of FastDDS, Zenoh and vSomeIP",
    authors: "Multiple authors (project AUTOtechagil)",
    venue: "arXiv:2505.02734",
    year: 2025,
    url: "https://arxiv.org/abs/2505.02734",
  },
  {
    title: "Leveraging Decentralized Communication for Privacy-Preserving Federated Learning",
    authors: "Multiple authors",
    venue: "Computer Communications (Elsevier)",
    year: 2025,
    url: "https://www.sciencedirect.com/science/article/pii/S0140366425000295",
  },
  {
    title: "A Performance Study on the Throughput and Latency of Zenoh, MQTT, Kafka, and DDS",
    authors: "W.-Y. Liang, Y. Yuan, H.-J. Lin",
    venue: "arXiv:2303.09419",
    year: 2023,
    url: "https://arxiv.org/abs/2303.09419",
  },
  {
    title: "Scalable and Bounded-Time Decisions on Edge Device Networks Using Eclipse Zenoh",
    authors: "C.-S. Shih, H.-J. Lin, Y. Yuan, Y.-H. Kuo, W.-Y. Liang",
    venue: "28th IEEE RTCSA",
    year: 2022,
    doi: "10.1109/RTCSA55878.2022.00024",
    url: "https://ieeexplore.ieee.org/document/9904790",
  },
  {
    title: "Realizing Zenoh with Programmable Dataplanes",
    authors: "Multiple authors",
    venue: "ANCS 2021 — Symposium on Architectures for Networking and Communications Systems",
    year: 2021,
    doi: "10.1145/3493425.3502761",
    url: "https://dl.acm.org/doi/10.1145/3493425.3502761",
  },
  {
    title: "Zenoh-Powered Post-Quantum Security: Protecting IoT-Based Smart Surveillance Systems",
    authors: "L. Khorkheli, D. Bourne, G. B. Satrya, S. Elnaffar, S. E. Choutri",
    venue: "4th International Conference on Distributed Sensing and Intelligent Systems (ICDSIS 2023)",
    year: 2023,
    doi: "10.1049/icp.2024.0481",
    url: "https://ieeexplore.ieee.org/document/10660165",
  },
  {
    title: "Comparison of Middlewares in Edge-to-Edge and Edge-to-Cloud Communication for Distributed ROS 2 Systems",
    authors: "Multiple authors",
    venue: "Journal of Intelligent & Robotic Systems (Springer) / arXiv:2309.07496",
    year: 2025,
    url: "https://arxiv.org/abs/2309.07496",
  },
  {
    title: "Performance Comparison of ROS 2 Middlewares for Multi-Robot Mesh Networks in Planetary Exploration",
    authors: "Multiple authors",
    venue: "Journal of Intelligent & Robotic Systems, vol. 111, art. 18",
    year: 2025,
    url: "https://link.springer.com/article/10.1007/s10846-024-02211-2",
  },
];

const reports: Paper[] = [
  {
    title: "ROS 2 Alternative Middleware Report",
    authors: "C. Lalancette, Open Robotics / ROS 2 core team",
    venue: "Open Robotics Discourse",
    year: 2023,
    url: "https://discourse.openrobotics.org/t/ros-2-alternative-middleware-report/33771",
    note: "Concludes that Zenoh best meets ROS 2 middleware requirements and will be adopted as the alternative RMW.",
  },
  {
    title: "Automated Driving Safety Data Protocol – Specification",
    authors: "ITU-T Focus Group on AI for Autonomous and Assisted Driving (FG-AI4AD)",
    venue: "ITU-T FG-AI4AD Deliverable, transferred to Study Group 16",
    year: 2022,
    url: "https://www.itu.int/dms_pub/itu-t/opb/fg/T-FG-AI4AD-2022-PDF-E.pdf",
  },
];

const nonEnglishArticles: Paper[] = [
  {
    title: "Zone Controller 기반 SDV 아키텍처 위한 Zenoh-VSS 통합 E2E 통신 시스템의 가치",
    authors: "윤승현 (Yoon Seung-hyun), ivis inc.",
    venue: "자동차전자기술 / Autoelectronics Magazine",
    year: 2026,
    url: "https://www.autoelectronics.co.kr/article/articleView.asp?idx=6717",
    lang: "ko",
    note: "Zone Controller-based SDV architecture: the value of a Zenoh-VSS integrated E2E communication system",
  },
  {
    title: "Zone Controller 기반 SDV 아키텍처에서 Zenoh-VSS 통합 미들웨어를 통한 E2E 통신 시스템",
    authors: "윤승현, 도주현 (Yoon Seung-hyun, Do Ju-hyun), IBIS",
    venue: "한국자동차공학회 추계학술대회 / Korean Society of Automotive Engineers Fall Conference, pp. 849–856",
    year: 2025,
    url: "https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE12539296",
    lang: "ko",
    note: "E2E Communication System for Zone Controller-Based SDV Architecture Using Zenoh-VSS Middleware",
  },
  {
    title: "Zenoh bridge を用いたROS 2 の通信性能評価",
    authors: "佐々木怜名, 竹房あつ子, 中田秀基, 小口正人 (Sasaki, Takefusa, Nakata, Oguchi)",
    venue: "情報処理学会全国大会 2024 / IPSJ Annual Conference 2024",
    year: 2024,
    lang: "ja",
    note: "Communication Performance Evaluation of ROS 2 Using Zenoh Bridge",
  },
];

// ─── Components ───────────────────────────────────────────────────────────────

function PaperRow({ paper }: { paper: Paper }) {
  const inner = (
    <div className={`group flex gap-3 p-4 rounded-lg border border-stone-200 dark:border-ink-wire bg-white dark:bg-ink-card transition-colors duration-200 ${paper.url ? "hover:border-accent dark:hover:border-accent" : ""}`}>
      <div className="flex-1 min-w-0">
        <p className={`font-medium text-sm leading-snug ${paper.url ? "text-stone-900 dark:text-cream group-hover:text-accent transition-colors" : "text-stone-900 dark:text-cream"}`}>
          {paper.title}
          {paper.lang && (
            <span className="ml-2 px-1.5 py-0.5 text-[10px] rounded font-mono bg-stone-100 dark:bg-ink-shell/40 text-stone-500 dark:text-ash align-middle uppercase">
              {paper.lang}
            </span>
          )}
        </p>
        {paper.note && (
          <p className="text-xs text-stone-400 dark:text-ash italic mt-0.5">{paper.note}</p>
        )}
        <p className="mt-1 text-xs text-stone-500 dark:text-fog">{paper.authors}</p>
        <p className="mt-0.5 text-xs text-stone-400 dark:text-ash">
          {paper.venue} · {paper.year}
          {paper.doi && <span className="ml-1.5 font-mono">DOI: {paper.doi}</span>}
        </p>
      </div>
      {paper.url && (
        <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 mt-0.5 text-stone-300 dark:text-ash group-hover:text-accent transition-colors" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      )}
    </div>
  );

  if (paper.url) {
    return (
      <a href={paper.url} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return inner;
}

function Section({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  return (
    <div className="mt-12">
      <div className="flex items-baseline gap-3 mb-4 pb-3 border-b border-stone-200 dark:border-ink-wire">
        <h2 className="text-xl font-serif font-semibold text-stone-900 dark:text-cream">{title}</h2>
        <span className="text-sm text-stone-400 dark:text-ash font-mono">{count}</span>
      </div>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ZenohPapersPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations("zenoh");
  const total = journals.length + conferences.length +
    magazineArticles.length + zenohPapersByOthers.length + nonEnglishArticles.length + reports.length;

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 dark:text-cream animate-fade-in">
        {t("papersHeading")}
      </h1>
      <p className="mt-3 text-stone-500 dark:text-fog leading-relaxed animate-fade-in animate-delay-100">
        Scientific papers, journal articles, reports, magazine features, and press coverage on Zenoh and
        distributed systems research. {total} entries across {6} categories.
      </p>

      {/* Scholar link */}
      <div className="mt-5 flex flex-wrap gap-3 animate-fade-in animate-delay-100">
        <a
          href="https://scholar.google.com/citations?user=o0xJE_4AAAAJ"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost text-sm flex items-center gap-1.5"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
          Google Scholar
        </a>
        <a
          href="https://dblp.org/pid/19/6638.html"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost text-sm flex items-center gap-1.5"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
          DBLP
        </a>
        <a
          href="https://www.semanticscholar.org/author/Angelo-Corsaro/2109948"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost text-sm flex items-center gap-1.5"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
          Semantic Scholar
        </a>
      </div>

      {/* Sections */}
      <div className="animate-fade-in animate-delay-200">
        <Section title="Peer-Reviewed Journals" count={journals.length}>
          {journals.map((p, i) => <PaperRow key={i} paper={p} />)}
        </Section>

        <Section title="Conference & Workshop Papers" count={conferences.length}>
          {conferences.map((p, i) => <PaperRow key={i} paper={p} />)}
        </Section>

        <Section title="Reports" count={reports.length}>
          <p className="text-xs text-stone-400 dark:text-ash mb-3 italic">
            Industry and standards body reports referencing or adopting Zenoh.
          </p>
          {reports.map((p, i) => <PaperRow key={i} paper={p} />)}
        </Section>

        <Section title="Magazine & Online Articles" count={magazineArticles.length}>
          {magazineArticles.map((p, i) => <PaperRow key={i} paper={p} />)}
        </Section>

        <Section title="Academic Papers on Zenoh (by others)" count={zenohPapersByOthers.length}>
          <p className="text-xs text-stone-400 dark:text-ash mb-3 italic">
            Papers published by the research community that study or build on the Zenoh protocol.
          </p>
          {zenohPapersByOthers.map((p, i) => <PaperRow key={i} paper={p} />)}
        </Section>

        <Section title="Non-English Publications" count={nonEnglishArticles.length}>
          <p className="text-xs text-stone-400 dark:text-ash mb-3 italic">
            Articles and papers published in languages other than English.
          </p>
          {nonEnglishArticles.map((p, i) => <PaperRow key={i} paper={p} />)}
        </Section>
      </div>

    </div>
  );
}

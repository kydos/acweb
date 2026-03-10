import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/lib/navigation";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "zenoh" });
  return {
    title: t("reportHeading"),
    description: t("reportSubtitle"),
  };
}

const reports = [
  {
    slug: "2026-02",
    num: "04",
    date: "February 2026",
    subtitle: "Zenoh's Genesis & Protocol Origins",
    pdfFile: "/2026.02-TheZenohReport.pdf",
    docxFile: "/2026.02-TheZenohReport.docx",
    topics: [
      "Zenoh Genesis — the origin story of the protocol",
      "Why the name \"Zenoh\" (Zeno + ZEro Network OverHead)",
      "Zenoh 1.8.0 — upcoming features",
      "Zenoh 2.0 — roadmap update",
      "Queryables & Key Expression constraints",
    ],
  },
  {
    slug: "2026-01",
    num: "03",
    date: "January 2026",
    subtitle: "ZUM25 Recap, Physical AI & Zenoh 2.0",
    pdfFile: "/2026.01-TheZenohReport.pdf",
    docxFile: "/2026.01-TheZenohReport.docx",
    topics: [
      "ZUM25 recap — Zenoh User Meeting 2025",
      "Physical AI: CI vs PI vs EI explained",
      "Zenoh 2.0 announcement",
      "Zenoh 1.7.x Jiāolóng — query cancellation, co-localisation",
    ],
  },
  {
    slug: "2025-11",
    num: "02",
    date: "November 2025",
    subtitle: "Embedded Rust & Zenoh 1.6.x Imoogi",
    pdfFile: "/2025.11-TheZenohReport.pdf",
    docxFile: "/2025.11-TheZenohReport.docx",
    topics: [
      "Embedded Rust — ecosystem maturity & esp-hal 1.0",
      "ZUM25 announcement (Dec 12)",
      "Zenoh 1.6.x Imoogi — SHM, scalability, zenoh-nostd",
      "Tip: Zenoh on WiFi routers via OpenWRT",
    ],
  },
  {
    slug: "2025-10",
    num: "01",
    date: "October 2025",
    subtitle: "Launch Issue & Security by Design",
    pdfFile: "/2025.10-TheZenohReport.pdf",
    docxFile: "/2025.10-The Zenoh Report-FirstInstallment.docx",
    topics: [
      "Security by Design — Zenoh's memory-safe Rust foundation",
      "CISA memory safety campaign",
      "Zenoh 1.5.x Hong Red Dragon — 10M msgs/sec",
      "New projects: Pico ROS, ROS-Z",
    ],
  },
];

export default function ZenohReportPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations("zenoh");

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 dark:text-cream animate-fade-in">
        {t("reportHeading")}
      </h1>
      <p className="mt-3 text-stone-500 dark:text-fog leading-relaxed animate-fade-in animate-delay-100">
        {t("reportSubtitle")}
      </p>

      {/* Issue list */}
      <div className="mt-12 space-y-5 animate-fade-in animate-delay-200">
        {reports.map((report) => (
          <div
            key={report.slug}
            className="group rounded-xl border border-stone-200 dark:border-ink-wire bg-white dark:bg-ink-card hover:border-accent dark:hover:border-accent transition-colors duration-200"
          >
            {/* Top row: clickable to issue page */}
            <Link href={`/zenoh/report/${report.slug}`} className="flex items-start gap-4 p-6 pb-4">
              <span className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 text-accent font-bold font-mono text-sm">
                {report.num}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-mono uppercase tracking-widest text-stone-400 dark:text-ash">
                  The Zenoh Report
                </p>
                <h2 className="font-semibold text-lg text-stone-900 dark:text-cream group-hover:text-accent transition-colors">
                  {report.date}
                </h2>
                <p className="text-sm text-stone-500 dark:text-fog">{report.subtitle}</p>
              </div>
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 shrink-0 mt-1 text-stone-300 dark:text-ash group-hover:text-accent transition-colors"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>

            {/* Topics + download row */}
            <div className="px-6 pb-5">
              <ul className="mb-4 space-y-1">
                {report.topics.map((topic, j) => (
                  <li key={j} className="flex gap-2 text-sm text-stone-600 dark:text-fog">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Subscribe callout */}
      <div className="mt-12 border-l-4 border-accent bg-accent/5 dark:bg-accent/10 rounded-r-lg p-6 animate-fade-in animate-delay-300">
        <h3 className="font-semibold text-accent mb-2">Stay up to date</h3>
        <p className="text-stone-700 dark:text-fog text-sm leading-relaxed">
          The Zenoh Report is published monthly and covers protocol updates, ecosystem news, and
          community stories — written entirely by Angelo Corsaro in his own voice, without AI tools.
        </p>
        <div className="mt-4 flex gap-3 flex-wrap">
          <a href="https://zenoh.io" target="_blank" rel="noopener noreferrer" className="btn-ghost text-sm">
            zenoh.io
          </a>
          <a href="https://discord.gg/2GJ958VuHs" target="_blank" rel="noopener noreferrer" className="btn-ghost text-sm">
            Join Discord
          </a>
        </div>
      </div>
    </div>
  );
}

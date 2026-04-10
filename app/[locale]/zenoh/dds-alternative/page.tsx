import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/lib/navigation";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return pageMetadata({
    locale: params.locale,
    path: "/zenoh/dds-alternative",
    title: "Zenoh as a DDS Alternative",
    description:
      "Why Eclipse Zenoh is used as a DDS alternative for systems that need to span embedded devices, robots, edge networks, and cloud infrastructure.",
  });
}

export default function ZenohDdsAlternativePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <article className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <p className="text-sm font-mono uppercase tracking-[0.2em] text-sky">
        Protocol Architecture
      </p>
      <h1 className="mt-4 text-3xl md:text-5xl font-serif font-bold text-stone-900 dark:text-cream">
        Zenoh as a DDS Alternative
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-600 dark:text-fog">
        DDS remains a foundational real-time publish-subscribe standard. Zenoh
        addresses a different deployment reality: systems that must span tiny
        devices, robots, edge networks, data centers, and cloud services with
        one data-centric abstraction.
      </p>

      <div className="mt-10 overflow-hidden rounded-lg border border-stone-200 dark:border-ink-wire">
        <div className="grid grid-cols-3 bg-stone-100 text-xs font-mono uppercase tracking-wide text-stone-500 dark:bg-ink-shell dark:text-ash">
          <div className="p-3">Concern</div>
          <div className="p-3">Traditional DDS Fit</div>
          <div className="p-3">Zenoh Fit</div>
        </div>
        {[
          ["Local real-time domains", "Strong", "Strong via integration patterns"],
          ["WAN and cloud traversal", "Requires extra architecture", "Native design target"],
          ["Constrained devices", "Often heavy", "Protocol family includes embedded targets"],
          ["Queries and storage", "Outside core pub/sub model", "Part of the core abstraction"],
        ].map(([concern, dds, zenoh]) => (
          <div
            key={concern}
            className="grid grid-cols-1 border-t border-stone-200 text-sm md:grid-cols-3 dark:border-ink-wire"
          >
            <div className="p-4 font-medium text-stone-900 dark:text-cream">
              {concern}
            </div>
            <div className="p-4 text-stone-600 dark:text-fog">{dds}</div>
            <div className="p-4 text-stone-600 dark:text-fog">{zenoh}</div>
          </div>
        ))}
      </div>

      <section className="mt-12 border-t border-stone-200 pt-8 dark:border-ink-wire">
        <h2 className="text-2xl font-serif font-semibold text-stone-900 dark:text-cream">
          Read Next
        </h2>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/zenoh/ros2" className="btn-primary">
            Zenoh for ROS 2
          </Link>
          <Link href="/zenoh/book/core-concepts/pub-sub" className="btn-ghost">
            Pub/Sub concepts
          </Link>
          <Link href="/zenoh/papers" className="btn-ghost">
            Research papers
          </Link>
        </div>
      </section>
    </article>
  );
}

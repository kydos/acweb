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
    path: "/zenoh/ros2",
    title: "Zenoh for ROS 2",
    description:
      "How Eclipse Zenoh improves ROS 2 communication across robots, fleets, edge systems, and cloud infrastructure.",
  });
}

export default function ZenohRos2Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <article className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <p className="text-sm font-mono uppercase tracking-[0.2em] text-sky">
        Eclipse Zenoh
      </p>
      <h1 className="mt-4 text-3xl md:text-5xl font-serif font-bold text-stone-900 dark:text-cream">
        Zenoh for ROS 2
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-600 dark:text-fog">
        Zenoh gives ROS 2 systems a communication layer designed for the full
        robotics continuum: on-robot processes, nearby edge nodes, remote
        operators, fleet backends, and cloud services.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Beyond one LAN",
            body: "Route data across routed networks, Wi-Fi, cellular, VPNs, and cloud deployments without forcing every participant into one multicast domain.",
          },
          {
            title: "Edge-aware data flow",
            body: "Keep publishers, subscribers, queryables, and storage close to where data is produced while still making resources discoverable elsewhere.",
          },
          {
            title: "Production footprint",
            body: "Use the same protocol family across robots, embedded targets, gateways, and backend infrastructure.",
          },
        ].map((item) => (
          <section
            key={item.title}
            className="rounded-lg border border-stone-200 bg-white p-5 dark:border-ink-wire dark:bg-ink-card"
          >
            <h2 className="font-semibold text-stone-900 dark:text-cream">
              {item.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-fog">
              {item.body}
            </p>
          </section>
        ))}
      </div>

      <section className="mt-12 border-t border-stone-200 pt-8 dark:border-ink-wire">
        <h2 className="text-2xl font-serif font-semibold text-stone-900 dark:text-cream">
          Read Next
        </h2>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/zenoh" className="btn-primary">
            Zenoh overview
          </Link>
          <Link href="/blog/ros2-rmw-zenoh-selection" className="btn-ghost">
            ROS 2 RMW selection
          </Link>
          <Link href="/zenoh/book" className="btn-ghost">
            Zenoh Book
          </Link>
        </div>
      </section>
    </article>
  );
}

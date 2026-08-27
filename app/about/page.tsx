import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/siteConfig";
import { pageMetadata, canonicalUrl, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageShell, PageHeader, RelatedLinks } from "@/components/PageShell";

const title = "About Angelo Corsaro";
const description =
  "Angelo Corsaro, Ph.D. — inventor of the Zenoh Protocol, expert in distributed systems, robotics middleware (ROS 2), AI infrastructure, and the Cloud to Device Continuum.";

export const metadata: Metadata = pageMetadata({
  path: "/about",
  title,
  description,
  keywords: [
    "Angelo Corsaro",
    "Zenoh inventor",
    "Zenoh Protocol creator",
    "distributed systems expert",
    "ROS 2 middleware",
    "Eclipse Zenoh creator",
    "cloud to device continuum",
    "IoT middleware expert",
  ],
});

const bio = [
  "Angelo Corsaro is a rare combination of deep technologist and proven executive leader. Over more than 25 years he has repeatedly moved through the full arc from research insight to production code to global industry adoption — inventing technologies from first principles, implementing them himself in languages from C++ to Rust, and driving their standardization at OMG, IEEE, and Eclipse Foundation level. The combination of inventor, implementor, and industry driver, backed by a proven CEO and CTO track record, makes his profile uniquely valuable at the intersection of deep technology and strategic leadership.",
  "He completed his Ph.D. in Computer Science at Washington University in St. Louis in 2004, producing jRate — the first open-source ahead-of-time compiled Real-Time Java implementation, adopted by Boeing under the DARPA PCES program for flight-critical UAV avionics.",
  "ZettaScale Technology (2022–2026) — Co-Founder, CEO & CTO. Angelo co-founded ZettaScale with the mission of commercializing Eclipse Zenoh and taking it from open-source project to production platform. Under his technical and strategic leadership, ZettaScale grew from zero to become one of the most innovative and widely referenced companies in the cloud-to-thing continuum. Zenoh was adopted by the ROS 2 Technical Steering Committee as the official DDS alternative, selected by General Motors for uProtocol, and deployed across automotive, robotics, aerospace, and industrial systems worldwide. Angelo exited ZettaScale in April 2026 and is now preparing his next adventure.",
  "ADLINK Technologies (2016–2022) — Chief Technology Officer. As CTO of the Advanced Technology Office, Angelo established edge computing as a corporate strategic pillar years before mainstream adoption, directed technology scouting and R&D strategy, and continued driving Zenoh's development within the Eclipse Foundation.",
  "PrismTech (2007–2016) — Product Strategy Manager, then CTO. A decade at the centre of the DDS ecosystem: co-chairing the OMG DDS Special Interest Group, co-authoring the full DDS standard family (DDS, DDSI-RTPS, DDS Security, DDS RPC, ISO C++ API), and architecting Vortex — an early commercial platform for unified cloud and fog computing that earned PrismTech a Gartner Cool Vendor distinction in 2014.",
  "Finmeccanica/SELEX-ES (2003–2007) — Chief Architect, then Software Technologies Scientist. Designed the middleware platform for mission-critical air traffic control and naval combat management systems, and co-developed a gossip-based clock synchronization algorithm — applying coupled-oscillator mathematics from biology to synchronize tens of thousands of nodes with no external time reference, published in IEEE TPDS in 2009.",
];

const areas = [
  {
    title: "Distributed Systems",
    desc: "Designing protocols and middleware for large-scale distributed computing.",
  },
  {
    title: "Cloud to Device Continuum",
    desc: "Designing systems and protocols that span the full continuum from cloud platforms to devices.",
  },
  {
    title: "Robotics & ROS 2",
    desc: "Enabling high-performance communication for autonomous systems.",
  },
  {
    title: "Open Source",
    desc: "Building open technologies that empower developers and organizations.",
  },
];

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Angelo Corsaro",
    url: canonicalUrl(""),
    image: absoluteUrl(siteConfig.profilePhoto),
    jobTitle: "Eclipse Zenoh Project Lead",
    description:
      "Angelo Corsaro, Ph.D. is the inventor of the Zenoh Protocol and a world expert in distributed systems, robotics middleware (ROS 2), AI infrastructure, and the cloud-to-microcontroller continuum.",
    sameAs: [siteConfig.social.github, siteConfig.social.linkedin],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Washington University in St. Louis",
    },
    knowsAbout: [
      "Zenoh Protocol",
      "Distributed Systems",
      "Robotics",
      "ROS 2",
      "Edge Computing",
      "IoT",
      "AI infrastructure",
      "DDS",
      "Real-Time Systems",
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={profilePageSchema} />
      <PageShell>
        <PageHeader title={title} />

        <div className="mt-phi-lg flex flex-col md:flex-row gap-phi-lg animate-fade-in animate-delay-100">
          <div className="shrink-0">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden
                            bg-stone-200 dark:bg-ink-card
                            ring-2 ring-stone-200 dark:ring-ink-wire">
              <Image
                src={siteConfig.profilePhotoSmall}
                alt={siteConfig.name}
                width={448}
                height={439}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          <div className="space-y-4 leading-relaxed text-stone-600 dark:text-fog">
            {bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="mt-phi-xl animate-fade-in animate-delay-200">
          <h2 className="text-2xl font-serif font-semibold mb-phi-md text-stone-900 dark:text-cream">
            Areas of Interest
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-phi-xs">
            {areas.map((area) => (
              <div
                key={area.title}
                className="p-5 rounded-xl
                           border border-stone-200 dark:border-ink-wire
                           bg-white dark:bg-ink-card
                           hover:-translate-y-0.5 hover:border-azure dark:hover:border-azure
                           transition-all duration-200"
              >
                <h3 className="font-semibold mb-1 text-stone-800 dark:text-cream">{area.title}</h3>
                <p className="text-sm text-stone-500 dark:text-fog">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <RelatedLinks
          links={[
            { label: "Curriculum Vitae", href: "/cv", desc: "Full academic and industry record, publications, and standards work." },
            { label: "Zenoh Protocol", href: "/zenoh", desc: "The protocol behind most of the work described here." },
            { label: "Blog", href: "/blog", desc: "Writing on distributed systems, robotics, and protocol design." },
            { label: "Get in touch", href: "/contact", desc: "Speaking, collaboration, and professional enquiries." },
          ]}
        />
      </PageShell>
    </>
  );
}

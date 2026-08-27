import type { Metadata } from "next";
import { fetchRepos } from "@/lib/github";
import { siteConfig } from "@/lib/siteConfig";
import { ProjectCard } from "@/components/ProjectCard";
import { pageMetadata } from "@/lib/seo";
import { PageShell, PageHeader, RelatedLinks } from "@/components/PageShell";

export const metadata: Metadata = pageMetadata({
  path: "/opensource",
  title: "Open Source",
  description:
    "Open-source projects created or led by Angelo Corsaro — Eclipse Zenoh, Eclipse fog05, jRate, and more.",
});

// ─── Historical projects (pre-GitHub era) ────────────────────────────────────

type HistoricalProject = {
  name: string;
  description: string;
  role: string;
  period: string;
  language: string;
  url?: string;
};

const historicalProjects: HistoricalProject[] = [
  {
    name: "jRate",
    description:
      "First open-source ahead-of-time compiled implementation of the Real-Time Specification for Java (RTSJ), developed under the DARPA PCES program. Boeing used jRate to prove the feasibility of Real-Time Java for flight-critical UAV avionics. Also introduced a constant-time O(1) algorithm for verifying pointer-assignment safety in scoped memory regions — the first solution to this fundamental RTSJ problem.",
    role: "Creator & Project Lead",
    period: "2001–2004",
    language: "Java / C",
  },
];

function HistoricalProjectCard({ project }: { project: HistoricalProject }) {
  const inner = (
    <div className="group block rounded-xl border border-stone-200 dark:border-ink-wire bg-white dark:bg-ink-card p-6 hover:border-accent dark:hover:border-accent hover:-translate-y-0.5 transition-all duration-200 hover:shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-lg text-stone-800 dark:text-cream group-hover:text-accent transition-colors duration-200">
              {project.name}
            </h3>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-stone-100 dark:bg-ink-shell/40 text-stone-500 dark:text-ash">
              Historical
            </span>
          </div>
          <p className="mt-1 text-sm text-stone-500 dark:text-fog leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-stone-400 dark:text-ash">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-accent/70" />
          {project.language}
        </span>
        <span className="font-mono text-xs">{project.period}</span>
        <span className="text-xs italic">{project.role}</span>
      </div>
    </div>
  );

  if (project.url) {
    return (
      <a href={project.url} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return inner;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function OpenSourcePage() {
  const repos = await fetchRepos(siteConfig.featuredRepos);

  return (
    <PageShell>
      <PageHeader
        title="Open Source"
        lede="Projects I've created or contribute to. Stars and forks fetched live from GitHub."
        trail={[{ label: "Open Source", href: "/opensource" }]}
      />

      {repos.length === 0 ? (
        <p className="mt-12 text-stone-400 dark:text-ash">Unable to load repositories. Please try again later.</p>
      ) : (
        <div className="mt-10 grid gap-4 animate-fade-in animate-delay-200">
          {repos.map((repo) => (
            <ProjectCard key={repo.fullName} repo={repo} />
          ))}
        </div>
      )}

      {/* Historical projects */}
      <div className="mt-16 animate-fade-in animate-delay-300">
        <div className="flex items-baseline gap-3 mb-4 pb-3 border-b border-stone-200 dark:border-ink-wire">
          <h2 className="text-xl font-serif font-semibold text-stone-900 dark:text-cream">Historical Projects</h2>
          <span className="text-sm text-stone-400 dark:text-ash font-mono">{historicalProjects.length}</span>
        </div>
        <p className="mb-5 text-xs text-stone-400 dark:text-ash italic">
          Projects that predate GitHub, preserved here for their historical and technical significance.
        </p>
        <div className="grid gap-4">
          {historicalProjects.map((project) => (
            <HistoricalProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>

      <RelatedLinks
        links={[
          { label: "Zenoh Protocol", href: "/zenoh", desc: "The protocol behind the flagship repositories above." },
          { label: "Curriculum Vitae", href: "/cv", desc: "Standards work and the research these projects came from." },
        ]}
      />
    </PageShell>
  );
}

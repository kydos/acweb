import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/lib/siteConfig";
import { getLocalizedCV } from "@/lib/cvContent";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "cv" });
  return {
    title: t("heading"),
    description: `${t("heading")} — ${siteConfig.name}`,
  };
}

export default function CVPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations("cv");
  const cv = getLocalizedCV(locale);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">

      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 animate-fade-in">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 dark:text-cream">
            {siteConfig.name}, Ph.D.
          </h1>
          <p className="mt-0.5 text-sm font-medium text-azure dark:text-sky">
            {t("position")}
          </p>
          <p className="mt-1 text-stone-500 dark:text-ash text-sm">
            {t("location")}
          </p>
        </div>
      </div>

      {/* ── Stats bar ──────────────────────────────────────────── */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-in animate-delay-100">
        {cv.stats.map((s) => (
          <div
            key={s.statKey}
            className="flex flex-col items-center text-center p-4 rounded-xl border border-stone-200 dark:border-ink-wire bg-stone-50 dark:bg-ink-card"
          >
            <span className="text-2xl font-bold text-accent font-mono">
              {s.value}
            </span>
            <span className="mt-1 text-xs text-stone-500 dark:text-ash leading-tight">
              {t(s.statKey as Parameters<typeof t>[0])}
            </span>
          </div>
        ))}
      </div>

      {/* ── Research Profile ───────────────────────────────────── */}
      <Section title={t("researchProfile")} delay="animate-delay-100">
        <p className="text-stone-700 dark:text-fog leading-relaxed text-sm md:text-base">
          {cv.researchProfile}
        </p>
      </Section>

      {/* ── Research Interests ─────────────────────────────────── */}
      <Section title={t("researchInterests")} delay="animate-delay-100">
        <ul className="space-y-1.5">
          {cv.researchInterests.map((interest, i) => (
            <li key={i} className="flex gap-2 text-sm text-stone-700 dark:text-fog">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              {interest}
            </li>
          ))}
        </ul>
      </Section>

      {/* ── Professional Experience ────────────────────────────── */}
      <Section title={t("experience")} delay="animate-delay-200">
        <div className="space-y-7">
          {cv.experience.map((job, i) => (
            <div key={i} className="relative pl-6 border-l-2 border-stone-200 dark:border-ink-wire">
              <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-accent" />
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-3">
                <h3 className="font-semibold text-base text-stone-900 dark:text-cream">{job.role}</h3>
                <span className="text-xs font-mono text-stone-400 dark:text-ash shrink-0">
                  {job.period}
                </span>
              </div>
              <p className="text-accent text-sm font-medium mt-0.5">
                {job.company}
                <span className="text-stone-400 dark:text-ash font-normal"> · {job.location}</span>
              </p>
              <p className="mt-1.5 text-stone-600 dark:text-fog text-sm leading-relaxed">
                {job.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Teaching ───────────────────────────────────────────── */}
      <Section title={t("teaching")} delay="animate-delay-200">
        <div className="space-y-5">
          {cv.teaching.map((t_entry, i) => (
            <div key={i} className="relative pl-6 border-l-2 border-stone-200 dark:border-ink-wire">
              <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-stone-400 dark:bg-ash" />
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h3 className="font-semibold text-base text-stone-900 dark:text-cream">{t_entry.role}</h3>
                <span className="text-xs font-mono text-stone-400 dark:text-ash shrink-0">
                  {t_entry.period}
                </span>
              </div>
              <p className="text-sm text-stone-600 dark:text-fog mt-0.5">
                {t_entry.institution}
                {"note" in t_entry && t_entry.note ? (
                  <span className="text-stone-400 dark:text-ash"> — {t_entry.note}</span>
                ) : null}
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {t_entry.courses.map((c) => (
                  <span
                    key={c}
                    className="px-2 py-0.5 text-xs rounded-full bg-stone-100 dark:bg-ink-shell/40 text-stone-600 dark:text-ash"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Education ──────────────────────────────────────────── */}
      <Section title={t("education")} delay="animate-delay-200">
        <div className="space-y-6">
          {cv.education.map((edu, i) => (
            <div key={i} className="relative pl-6 border-l-2 border-stone-200 dark:border-ink-wire">
              <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-accent" />
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h3 className="font-semibold text-stone-900 dark:text-cream">{edu.degree}</h3>
                <span className="text-xs font-mono text-stone-400 dark:text-ash shrink-0">
                  {edu.period}
                </span>
              </div>
              <p className="text-sm text-stone-600 dark:text-fog">
                {edu.institution}
                <span className="text-stone-400 dark:text-ash"> · {edu.location}</span>
              </p>
              {"note" in edu && edu.note ? (
                <p className="mt-1 text-xs text-stone-500 dark:text-ash italic">
                  {edu.note}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </Section>

      {/* ── Key Contributions ──────────────────────────────────── */}
      <Section title={t("keyContributions")} delay="animate-delay-300">
        <div className="space-y-6">
          {cv.keyContributions.map((contrib, i) => (
            <div
              key={i}
              className="rounded-xl border border-stone-200 dark:border-ink-wire bg-white dark:bg-ink-card p-5 hover:border-accent dark:hover:border-accent transition-colors duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h3 className="font-semibold text-accent">
                  {contrib.title}
                </h3>
                <span className="text-xs font-mono text-stone-400 dark:text-ash shrink-0">
                  {contrib.period}
                </span>
              </div>
              <p className="mt-2 text-sm text-stone-600 dark:text-fog leading-relaxed">
                {contrib.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Selected Publications ──────────────────────────────── */}
      <Section title={t("publications")} delay="animate-delay-300">
        <p className="mb-4 text-xs text-stone-500 dark:text-ash">
          {t("publicationsNote")}{" "}
          <a
            href="https://scholar.google.com/citations?user=AngeloCorsaro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-azure dark:text-azure hover:text-sky dark:hover:text-sky underline"
          >
            Google Scholar
          </a>
        </p>
        <div className="space-y-3">
          {cv.selectedPublications.map((pub, i) => (
            <div key={i} className="flex gap-3">
              <span className="shrink-0 mt-0.5 px-1.5 py-0.5 text-xs font-mono rounded border border-stone-200 dark:border-ink-wire text-stone-500 dark:text-ash h-fit">
                {pub.type}
              </span>
              <p className="text-sm text-stone-700 dark:text-fog leading-relaxed">
                {pub.citation}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Standards & Open Source ────────────────────────────── */}
      <Section title={t("standards")} delay="animate-delay-300">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500 dark:text-ash mb-3">
              {t("standardsCoAuthored")}
            </h3>
            <ul className="space-y-2">
              {cv.standards.map((s, i) => (
                <li key={i} className="flex gap-2 text-sm text-stone-700 dark:text-fog">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500 dark:text-ash mb-3">
              {t("openSourceProjects")}
            </h3>
            <div className="space-y-2">
              {cv.openSource.map((p, i) => (
                <div key={i}>
                  <span className="text-sm font-semibold text-accent">
                    {p.name}
                  </span>
                  <span className="text-sm text-stone-500 dark:text-ash"> — {p.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── Recognition ────────────────────────────────────────── */}
      <Section title={t("recognition")} delay="animate-delay-300">
        <div className="space-y-2">
          {cv.recognition.map((r, i) => (
            <div key={i} className="flex gap-4 items-baseline">
              <span className="text-xs font-mono text-stone-400 dark:text-ash shrink-0 w-16 text-right">
                {r.year}
              </span>
              <p className="text-sm text-stone-700 dark:text-fog">{r.award}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Skills ─────────────────────────────────────────────── */}
      <Section title={t("skills")} delay="animate-delay-300">
        <div className="space-y-6">
          {/* Natural languages */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500 dark:text-ash mb-3">
              {t("languages")}
            </h3>
            <div className="flex flex-wrap gap-3">
              {cv.naturalLanguages.map(({ lang, level }) => (
                <div
                  key={lang}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-ink-wire text-sm"
                >
                  <span className="font-medium text-stone-800 dark:text-cream">{t(lang as Parameters<typeof t>[0])}</span>
                  <span className="text-stone-400 dark:text-ash text-xs">{t(level as Parameters<typeof t>[0])}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical skills */}
          {Object.entries(cv.skills).map(([catKey, items]) => (
            <div key={catKey}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500 dark:text-ash mb-3">
                {t(catKey as Parameters<typeof t>[0])}
              </h3>
              <div className="flex flex-wrap gap-2">
                {(items as string[]).map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm rounded-full bg-stone-100 dark:bg-ink-shell/40 text-stone-700 dark:text-fog"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
  delay = "",
}: {
  title: string;
  children: React.ReactNode;
  delay?: string;
}) {
  return (
    <div className={`mt-14 animate-fade-in ${delay}`}>
      <h2 className="text-xl md:text-2xl font-serif font-semibold mb-6 pb-3 border-b border-stone-200 dark:border-ink-wire text-stone-900 dark:text-cream">
        {title}
      </h2>
      {children}
    </div>
  );
}

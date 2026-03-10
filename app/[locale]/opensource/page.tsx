import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { fetchRepos } from "@/lib/github";
import { siteConfig } from "@/lib/siteConfig";
import { ProjectCard } from "@/components/ProjectCard";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "openSource" });
  return {
    title: t("heading"),
    description: `${t("heading")} — ${siteConfig.name}`,
  };
}

export default async function OpenSourcePage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "openSource" });
  const repos = await fetchRepos(siteConfig.featuredRepos);

  return (
    <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <h1 className="text-3xl md:text-4xl font-serif font-bold animate-fade-in
                     text-stone-900 dark:text-cream">
        {t("heading")}
      </h1>
      <p className="mt-3 text-stone-500 dark:text-fog animate-fade-in animate-delay-100">
        {t("subtitle")}
      </p>

      {repos.length === 0 ? (
        <p className="mt-12 text-stone-400 dark:text-ash">{t("loadError")}</p>
      ) : (
        <div className="mt-10 grid gap-4 animate-fade-in animate-delay-200">
          {repos.map((repo) => (
            <ProjectCard key={repo.fullName} repo={repo} />
          ))}
        </div>
      )}
    </section>
  );
}

import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { getAllPosts } from "@/lib/mdx";
import { BlogSearch } from "@/components/BlogSearch";
import { siteConfig } from "@/lib/siteConfig";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("blog");
  return {
    title: t("heading"),
    description: `${t("heading")} — ${siteConfig.name}`,
  };
}

export default function BlogPage() {
  const t = useTranslations("blog");
  const posts = getAllPosts();

  return (
    <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <h1 className="text-3xl md:text-4xl font-serif font-bold animate-fade-in text-stone-900 dark:text-cream">
        {t("heading")}
      </h1>
      <p className="mt-3 text-stone-600 dark:text-fog animate-fade-in animate-delay-100">
        {t("subtitle")}
      </p>
      <BlogSearch
        posts={posts}
        placeholder={t("searchPlaceholder")}
        empty={t("empty")}
      />
    </section>
  );
}

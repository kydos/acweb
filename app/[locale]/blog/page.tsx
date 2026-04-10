import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllPosts } from "@/lib/mdx";
import { BlogSearch } from "@/components/BlogSearch";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    ...pageMetadata({
      locale,
      path: "/blog",
      title: t("heading"),
      description:
        "Articles on Zenoh Protocol, distributed systems, robotics middleware, AI infrastructure, and edge computing — by Angelo Corsaro, Ph.D., inventor of Zenoh.",
    }),
    title: t("heading"),
    description:
      "Articles on Zenoh Protocol, distributed systems, robotics middleware, AI infrastructure, and edge computing — by Angelo Corsaro, Ph.D., inventor of Zenoh.",
  };
}

export default function BlogPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
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

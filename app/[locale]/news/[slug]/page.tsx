import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { news } from "@/constants/news";
import NewsDetail from "@/components/sections/news/NewsDetail";
import { PageBreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, truncate } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const newsItem = news.find((item) => item.slug === slug);

  if (!newsItem) {
    return {};
  }

  return buildPageMetadata({
    locale,
    path: `/news/${newsItem.slug}`,
    title: newsItem.title,
    description: truncate(newsItem.excerpt),
    image: newsItem.image,
  });
}

export default async function NewsDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const newsItem = news.find((item) => item.slug === slug);

  if (!newsItem) {
    notFound();
  }

  // Get related news (same category, excluding current)
  const relatedNews = news
    .filter(
      (item) =>
        item.id !== newsItem.id &&
        item.category === newsItem.category &&
        !item.featured
    )
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <PageBreadcrumbJsonLd
        locale={locale}
        items={[
          { navKey: "news", path: "/news" },
          { name: newsItem.title, path: `/news/${newsItem.slug}` },
        ]}
      />
      <NewsDetail newsItem={newsItem} relatedNews={relatedNews} />
    </main>
  );
}

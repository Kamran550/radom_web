import NewsHero from "@/components/sections/news/NewsHero";
import NewsGrid from "@/components/sections/news/NewsGrid";
import NewsletterSection from "@/components/sections/news/NewsletterSection";
import { PageBreadcrumbJsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "news", "/news");
}

export default async function NewsPage({ params }: Props) {
  const { locale } = await params;
  return (
    <main className="min-h-screen bg-white font-sans">
      <PageBreadcrumbJsonLd
        locale={locale}
        items={[{ navKey: "news", path: "/news" }]}
      />
      <NewsHero />
      <NewsGrid />
      <NewsletterSection />
    </main>
  );
}

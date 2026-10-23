import ApplyHero from "@/components/sections/apply/ApplyHero";
import ApplyForm from "@/components/sections/apply/ApplyForm";
import { PageBreadcrumbJsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "apply", "/apply");
}

export default async function ApplyPage({ params }: Props) {
  const { locale } = await params;
  return (
    <main className="min-h-screen bg-white font-sans">
      <PageBreadcrumbJsonLd
        locale={locale}
        items={[{ navKey: "apply", path: "/apply" }]}
      />
      <ApplyHero />
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ApplyForm />
        </div>
      </section>
    </main>
  );
}

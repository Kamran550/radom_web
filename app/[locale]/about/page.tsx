import AboutHero from "@/components/sections/about/AboutHero";
import MissionVision from "@/components/sections/about/MissionVision";
import UniversityValues from "@/components/sections/about/UniversityValues";
import AboutHistory from "@/components/sections/about/AboutHistory";
import StatisticsSection from "@/components/sections/Statistics";
import ApplyCTA from "@/components/sections/ApplyCTA";
import { PageBreadcrumbJsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "about", "/about");
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  return (
    <main className="min-h-screen bg-white font-sans">
      <PageBreadcrumbJsonLd
        locale={locale}
        items={[{ navKey: "about", path: "/about" }]}
      />
      <AboutHero />
      <MissionVision />
      <UniversityValues />
      <AboutHistory />
      <StatisticsSection />
      <ApplyCTA />
    </main>
  );
}

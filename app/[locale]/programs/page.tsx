import ProgramsHero from "@/components/sections/programs/ProgramsHero";
import ProgramsGrid from "@/components/sections/programs/ProgramsGrid";
// import TestimonialsSection from "@/components/sections/Testimonials";
import ApplyCTA from "@/components/sections/ApplyCTA";
import { PageBreadcrumbJsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "programs", "/programs");
}

export default async function ProgramsPage({ params }: Props) {
  const { locale } = await params;
  return (
    <main className="min-h-screen bg-white font-sans dark:bg-slate-950">
      <PageBreadcrumbJsonLd
        locale={locale}
        items={[{ navKey: "programs", path: "/programs" }]}
      />
      <ProgramsHero />
      <ProgramsGrid />
      {/* <TestimonialsSection /> */}
      <ApplyCTA />
    </main>
  );
}

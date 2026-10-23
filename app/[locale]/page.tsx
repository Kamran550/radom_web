import HeroSection from "@/components/sections/HeroSection";
import AboutPreview from "@/components/sections/AboutPreview";
// import { TeachersSection } from "@/components/sections/Teachers";
import StatisticsSection from "@/components/sections/Statistics";
// import TestimonialsSection from "@/components/sections/Testimonials";
import FeaturesSection from "@/components/sections/FeaturesSection";
import ApplyCTA from "@/components/sections/ApplyCTA";
import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "home", "");
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans dark:bg-slate-950">
      <HeroSection />
      <AboutPreview />
      <StatisticsSection />
      {/* <TeachersSection /> */}
      {/* <TestimonialsSection /> */}
      <FeaturesSection />
      <ApplyCTA />
    </main>
  );
}

import FeesHero from "@/components/sections/fees/FeesHero";
import ProgramPriceTable from "@/components/sections/fees/ProgramPriceTable";
import PaymentPlans from "@/components/sections/fees/PaymentPlans";
import Scholarships from "@/components/sections/fees/Scholarships";
import FeesFAQ from "@/components/sections/fees/FeesFAQ";
import ApplyCTA from "@/components/sections/ApplyCTA";
import { PageBreadcrumbJsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "fees", "/fees");
}

export default async function FeesPage({ params }: Props) {
  const { locale } = await params;
  return (
    <main className="min-h-screen bg-white font-sans">
      <PageBreadcrumbJsonLd
        locale={locale}
        items={[{ navKey: "fees", path: "/fees" }]}
      />
      <FeesHero />
      <ProgramPriceTable />
      <PaymentPlans />
      <Scholarships />
      <FeesFAQ />
      <ApplyCTA />
    </main>
  );
}

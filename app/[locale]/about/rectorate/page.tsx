import RectoratePage from "@/components/sections/rectorate/RectoratePage";
import { PageBreadcrumbJsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "rectorate", "/about/rectorate");
}

export default async function Rectorate({ params }: Props) {
  const { locale } = await params;
  return (
    <>
      <PageBreadcrumbJsonLd
        locale={locale}
        items={[
          { navKey: "about", path: "/about" },
          { navKey: "rectorate", path: "/about/rectorate" },
        ]}
      />
      <RectoratePage />
    </>
  );
}

import AdministrativeUnitsPage from "@/components/sections/administrative-units/AdministrativeUnitsPage";
import { PageBreadcrumbJsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "administrativeUnits", "/about/administrative-units");
}

export default async function AdministrativeUnits({ params }: Props) {
  const { locale } = await params;
  return (
    <>
      <PageBreadcrumbJsonLd
        locale={locale}
        items={[
          { navKey: "about", path: "/about" },
          { navKey: "administrativeUnits", path: "/about/administrative-units" },
        ]}
      />
      <AdministrativeUnitsPage />
    </>
  );
}

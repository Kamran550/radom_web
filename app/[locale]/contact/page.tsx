import ContactHero from "@/components/sections/contact/ContactHero";
import ContactInfo from "@/components/sections/contact/ContactInfo";
import ContactForm from "@/components/sections/contact/ContactForm";
import ContactMap from "@/components/sections/contact/ContactMap";
import ContactSocial from "@/components/sections/contact/ContactSocial";
import { PageBreadcrumbJsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "contact", "/contact");
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  return (
    <main className="min-h-screen bg-white font-sans dark:bg-slate-950">
      <PageBreadcrumbJsonLd
        locale={locale}
        items={[{ navKey: "contact", path: "/contact" }]}
      />
      <ContactHero />
      <ContactInfo />
      <div className="bg-white dark:bg-slate-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactMap />
          </div>
        </div>
      </div>
      <ContactSocial />
    </main>
  );
}

import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { routing } from "@/i18n/routing";
import { NavbarDemo } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SeoJsonLd } from "@/components/seo/JsonLd";
import { TopLoader } from "@/components/ui/TopLoader";
import { SITE_NAME } from "@/lib/seo";
import type { Metadata } from "next";

// Hər dil üçün default SEO məlumatları (messages/*.json -> metadata).
// Canonical və hreflang hər səhifənin öz generateMetadata funksiyasında təyin olunur,
// əks halda bütün alt səhifələr ana səhifəyə canonical göstərərdi.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });
  const ogLocale = locale === "ru" ? "ru_RU" : locale === "tr" ? "tr_TR" : "en_US";
  const alternateLocales = ["en_US", "ru_RU", "tr_TR"].filter((l) => l !== ogLocale);

  return {
    title: {
      default: t("title"),
      template: `%s | ${SITE_NAME}`,
    },
    description: t("description"),
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: alternateLocales,
      siteName: SITE_NAME,
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: "/images/RADOM-logo-dark.png",
          width: 1024,
          height: 1024,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/images/RADOM-logo-dark.png"],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages}>
      <SeoJsonLd />
      <Suspense fallback={null}>
        <TopLoader />
      </Suspense>
      <NavbarDemo />
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}

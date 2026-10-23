import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export const SITE_URL = "https://radomuniversity.pl";
export const SITE_NAME = "Radom International University";
export const SITE_SHORT_NAME = "RIU";
export const SITE_LOGO = `${SITE_URL}/images/RADOM-logo-dark.png`;
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

const OG_LOCALES: Record<string, string> = {
  en: "en_US",
  ru: "ru_RU",
  tr: "tr_TR",
};

/**
 * Absolute URL for a locale-prefixed path, e.g. ("en", "/programs") -> https://radomuniversity.pl/en/programs
 */
export function localeUrl(locale: string, path = ""): string {
  return `${SITE_URL}/${locale}${path}`;
}

/**
 * hreflang map for a path that exists in every locale (x-default -> default locale)
 */
export function languageAlternates(path = ""): Record<string, string> {
  const languages: Record<string, string> = {};
  routing.locales.forEach((locale) => {
    languages[locale] = localeUrl(locale, path);
  });
  languages["x-default"] = localeUrl(routing.defaultLocale, path);
  return languages;
}

/**
 * Per-page metadata: self-referencing canonical, hreflang alternates and Open Graph
 */
export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  absoluteTitle = false,
  image,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
  absoluteTitle?: boolean;
  image?: string;
}): Metadata {
  const url = localeUrl(locale, path);
  const ogLocale = OG_LOCALES[locale] || OG_LOCALES.en;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      locale: ogLocale,
      alternateLocale: Object.values(OG_LOCALES).filter((l) => l !== ogLocale),
      title,
      description,
      images: [
        image
          ? { url: image, alt: title }
          : { url: "/images/RADOM-logo-dark.png", width: 1024, height: 1024, alt: SITE_NAME },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/**
 * Metadata for a static page from messages/*.json -> metadata.<key>
 */
export async function getPageMetadata(
  locale: string,
  key: string,
  path: string
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `metadata.${key}` });
  return buildPageMetadata({
    locale,
    path,
    title: t("title"),
    description: t("description"),
    absoluteTitle: key === "home",
  });
}

/**
 * Trim text to a meta-description friendly length without cutting words
 */
export function truncate(text: string, max = 160): string {
  const clean = text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, clean.lastIndexOf(" ", max - 1))}…`;
}

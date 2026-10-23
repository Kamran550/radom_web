import { getTranslations } from "next-intl/server";
import {
  ORGANIZATION_ID,
  SITE_LOGO,
  SITE_NAME,
  SITE_SHORT_NAME,
  SITE_URL,
  localeUrl,
} from "@/lib/seo";

// JSON-LD birbaşa ilkin HTML-də render olunur (next/script əvəzinə adi <script>)
function JsonLdScript({ id, data }: { id: string; data: object }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

// Universitet üçün CollegeOrUniversity Schema (yalnız saytda təsdiqlənmiş məlumatlar)
export function UniversityJsonLd() {
  const universityData = {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    alternateName: [SITE_SHORT_NAME, "RADOM", "Radom Uluslararası Üniversitesi"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: SITE_LOGO,
      width: 1024,
      height: 1024,
    },
    image: SITE_LOGO,
    description:
      "Radom International University (RIU) is an international university in Radom, Poland, offering bachelor's, master's and doctoral (PhD) programs.",
    email: "info@radomuniversity.pl",
    telephone: "+48739471622",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jacka Malczewskiego 29",
      postalCode: "26-600",
      addressLocality: "Radom",
      addressCountry: "PL",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "admissions",
        email: "international@radomuniversity.pl",
        telephone: "+48739471622",
        availableLanguage: ["English", "Turkish", "Russian"],
      },
    ],
  };

  return <JsonLdScript id="university-jsonld" data={universityData} />;
}

// WebSite Schema - sayt adı üçün
export function WebsiteJsonLd() {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    alternateName: [SITE_SHORT_NAME, "RADOM"],
    publisher: {
      "@id": ORGANIZATION_ID,
    },
    inLanguage: ["en", "tr", "ru"],
  };

  return <JsonLdScript id="website-jsonld" data={websiteData} />;
}

// Breadcrumb Schema - alt səhifələr üçün
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <JsonLdScript id="breadcrumb-jsonld" data={breadcrumbData} />;
}

// Naviqasiya başlıqları ilə breadcrumb: Ana səhifə > ... (nav.* tərcümələri və ya hazır ad)
export async function PageBreadcrumbJsonLd({
  locale,
  items,
}: {
  locale: string;
  items: { navKey?: string; name?: string; path: string }[];
}) {
  const t = await getTranslations({ locale, namespace: "nav" });
  return (
    <BreadcrumbJsonLd
      items={[
        { name: t("home"), url: localeUrl(locale) },
        ...items.map((item) => ({
          name: item.name ?? t(item.navKey ?? "home"),
          url: localeUrl(locale, item.path),
        })),
      ]}
    />
  );
}

// Təhsil proqramı Schema - səhifədə göstərilən məlumatlarla
export function ProgramJsonLd({
  name,
  description,
  url,
  credential,
  duration,
}: {
  name: string;
  description: string;
  url: string;
  credential: string;
  duration: string;
}) {
  // "4 Years" -> P4Y; aralıq dəyərlər ("3-4 Years") ISO formatına çevrilmir
  const years = duration.match(/^(\d+)\s+Years?$/i);
  const months = duration.match(/^(\d+)\s+Months?$/i);
  const timeToComplete = years
    ? `P${years[1]}Y`
    : months
      ? `P${months[1]}M`
      : undefined;

  const programData = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    name,
    description,
    url,
    educationalCredentialAwarded: credential,
    ...(timeToComplete && { timeToComplete }),
    provider: {
      "@type": "CollegeOrUniversity",
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  return <JsonLdScript id="program-jsonld" data={programData} />;
}

// Bütün sayt üzrə JSON-LD-ləri birləşdirən komponent
export function SeoJsonLd() {
  return (
    <>
      <UniversityJsonLd />
      <WebsiteJsonLd />
    </>
  );
}

import Script from "next/script";

// Universitet üçün Organization Schema
export function OrganizationJsonLd() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": "https://radomuniversity.pl/#organization",
    name: "Balkan Science and Management University",
    alternateName: [
      "RADOM",
      "Балканский Университет Науки и Управления",
      "Balkan Science and Management University",
    ],
    url: "https://radomuniversity.pl",
    logo: {
      "@type": "ImageObject",
      url: "https://radomuniversity.pl/images/RADOM-logo-dark.png",
      width: 512,
      height: 512,
    },
    image: "https://radomuniversity.pl/images/RADOM-logo-dark.png",
    description:
      "Balkan Science and Management University (RADOM) - International education in Serbia with bachelor's, master's and PhD programs. Quality education through science and management.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "RS",
      addressLocality: "Serbia",
    },
    sameAs: [
      "https://www.facebook.com/radom",
      "https://www.instagram.com/radom",
      "https://www.linkedin.com/school/radom",
      "https://twitter.com/radom",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "admissions",
      availableLanguage: ["English", "Turkish", "Russian"],
    },
  };

  return (
    <Script
      id="organization-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
    />
  );
}

// Universitet üçün CollegeOrUniversity Schema
export function UniversityJsonLd() {
  const universityData = {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    name: "Balkan Science and Management University",
    alternateName: "RADOM",
    url: "https://radomuniversity.pl",
    logo: "https://radomuniversity.pl/images/RADOM-logo-dark.png",
    description:
      "RADOM offers international bachelor's, master's and PhD programs in Serbia. Fostering science and management through education and global understanding.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "Serbia",
    },
    hasOfferingCatalog: {
      "@type": "OfferingCatalog",
      name: "Academic Programs",
      itemListElement: [
        {
          "@type": "Course",
          name: "Bachelor Programs",
          description: "Undergraduate degree programs",
        },
        {
          "@type": "Course",
          name: "Master Programs",
          description: "Graduate degree programs",
        },
        {
          "@type": "Course",
          name: "PhD Programs",
          description: "Doctoral degree programs",
        },
      ],
    },
  };

  return (
    <Script
      id="university-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(universityData) }}
    />
  );
}

// WebSite Schema - Axtarış üçün
export function WebsiteJsonLd() {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://radomuniversity.pl/#website",
    url: "https://radomuniversity.pl",
    name: "RADOM - Balkan Science and Management University",
    alternateName: ["RADOM", "Balkan Science and Management University"],
    description: "Official website of Balkan Science and Management University",
    publisher: {
      "@id": "https://radomuniversity.pl/#organization",
    },
    inLanguage: ["en", "tr", "ru"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://radomuniversity.pl/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Script
      id="website-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
    />
  );
}

// Bütün JSON-LD-ləri birləşdirən komponent
export function SeoJsonLd() {
  return (
    <>
      <OrganizationJsonLd />
      <UniversityJsonLd />
      <WebsiteJsonLd />
    </>
  );
}

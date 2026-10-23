import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { programs } from "@/constants/programs";
import { languageAlternates, localeUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  // Əsas səhifələr
  const pages = [
    "", // Ana səhifə
    "/about", // Haqqımızda
    "/about/rectorate", // Rektorluq
    "/about/administrative-units", // İnzibati bölmələr
    "/programs", // Proqramlar
    "/fees", // Ödəniş
    "/apply", // Müraciət
    "/contact", // Əlaqə
    "/news", // Xəbərlər
  ];

  // Proqram detal səhifələri (constants/programs.ts)
  const programPages = programs.map((program) => `/programs/${program.id}`);

  // Bütün dillər üçün URL-lər yaradaq
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Hər səhifə üçün bütün dil versiyalarını əlavə et
  [...pages, ...programPages].forEach((page) => {
    routing.locales.forEach((locale) => {
      sitemapEntries.push({
        url: localeUrl(locale, page),
        changeFrequency: page === "" ? "daily" : "weekly",
        priority:
          page === ""
            ? 1.0
            : page === "/programs" || page.startsWith("/programs/")
              ? 0.9
              : 0.8,
        alternates: {
          languages: languageAlternates(page),
        },
      });
    });
  });

  return sitemapEntries;
}

import ELibraryHero from "@/components/sections/e-library/ELibraryHero";
import ELibraryLogos from "@/components/sections/e-library/ELibraryLogos";
import ApplyCTA from "@/components/sections/ApplyCTA";
import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "eLibrary", "/e-library");
}

export default function ELibraryPage() {
  return (
    <main className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <ELibraryHero />
      <ELibraryLogos />
      <ApplyCTA />
    </main>
  );
}


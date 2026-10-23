import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { programs } from "@/constants/programs";
import ProgramDetails from "@/components/sections/programs/ProgramDetails";
import ApplyCTA from "@/components/sections/ApplyCTA";
import {
  PageBreadcrumbJsonLd,
  ProgramJsonLd,
} from "@/components/seo/JsonLd";
import { buildPageMetadata, localeUrl, truncate } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; id: string }> };

export function generateStaticParams() {
  return programs.map((program) => ({ id: program.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const program = programs.find((p) => p.id === id);

  if (!program) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "metadata.programDetail" });
  const values = {
    title: program.title,
    degree: program.degree,
    duration: program.duration,
    description: program.description,
  };

  return buildPageMetadata({
    locale,
    path: `/programs/${program.id}`,
    title: t("title", values),
    description: truncate(t("description", values)),
  });
}

export default async function ProgramDetailPage({ params }: Props) {
  const { locale, id } = await params;
  const program = programs.find((p) => p.id === id);

  if (!program) {
    notFound();
  }

  const path = `/programs/${program.id}`;

  return (
    <main className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <PageBreadcrumbJsonLd
        locale={locale}
        items={[
          { navKey: "programs", path: "/programs" },
          { name: `${program.title} (${program.degree})`, path },
        ]}
      />
      <ProgramJsonLd
        name={program.title}
        description={program.description}
        url={localeUrl(locale, path)}
        credential={program.degree}
        duration={program.duration}
      />
      <ProgramDetails program={program} />
      <ApplyCTA />
    </main>
  );
}

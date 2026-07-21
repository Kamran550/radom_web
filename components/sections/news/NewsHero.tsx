"use client";

import { useTranslations } from "next-intl";
import { Newspaper } from "lucide-react";

export default function NewsHero() {
  const t = useTranslations("news.hero");

  return (
    <section className="bg-[#0F172A] pt-32">
      <div className="h-[3px] bg-[#059669]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-3xl space-y-5">
          <div className="flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[#059669]" />
            <span className="text-[#10B981] text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <Newspaper className="w-3.5 h-3.5" />
              {t("title")}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            {t("title")}
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
            {t("subtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}

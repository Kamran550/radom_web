"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function AboutHero() {
  const t = useTranslations("about.hero");

  return (
    <section className="relative bg-[#0F172A] pt-32">
      {/* Emerald top line */}
      <div className="h-1 bg-[#059669]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — text */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-[#059669]" />
              <span className="text-[#10B981] text-xs font-bold uppercase tracking-widest">
                About RIU
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              {t("title")}
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
              {t("subtitle")}
            </p>
          </div>

          {/* Right — image */}
          <div className="relative rounded-2xl overflow-hidden hidden lg:block">
            <div className="aspect-[16/9] relative">
              <Image
                src="/images/radom-campus.jpg"
                alt="RIU Campus"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-[#0F172A]/40" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

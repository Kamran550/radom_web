"use client";

import { universityStats } from "@/constants/stats";
import { useTranslations } from "next-intl";

export default function StatisticsSection() {
  const t = useTranslations("statistics");

  return (
    <section className="bg-[#0F172A] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#10B981] text-xs font-bold uppercase tracking-widest block mb-3">
            {t("subtitle", { default: "Building excellence through quality education" })}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {t("title", { default: "Our Impact in Numbers" })}
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-700">
          {universityStats.map((stat) => (
            <div
              key={stat.id}
              className="bg-[#1E293B] px-8 py-10 text-center"
            >
              <p className="text-4xl md:text-5xl font-extrabold text-[#10B981] mb-2">
                {stat.value}{stat.suffix}
              </p>
              <p className="text-sm text-slate-400 uppercase tracking-wide font-medium">
                {t(stat.label.toLowerCase())}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

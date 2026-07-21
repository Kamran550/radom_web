"use client";

import { Calendar, BookOpen, GraduationCap, Award, Users } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const milestoneYears = ["2020", "2021", "2022", "2023"] as const;
const milestoneIcons = [BookOpen, GraduationCap, Award, Users] as const;

export default function AboutHistory() {
  const t = useTranslations("about.history");

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-label">{t("subtitle")}</span>
          <h2 className="heading-xl">{t("title")}</h2>
        </div>

        {/* Timeline — vertical list on mobile, two-column alternating on desktop */}
        <div className="space-y-10 max-w-4xl mx-auto mb-16">
          {milestoneYears.map((year, index) => {
            const Icon = milestoneIcons[index];
            const isEven = index % 2 === 0;

            return (
              <div
                key={year}
                className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-start"
              >
                {/* Left content (even) or empty (odd) */}
                {isEven ? (
                  <div className="bg-[#F8F7F4] rounded-xl p-6 border border-slate-200">
                    <span className="text-xs font-bold text-[#059669] uppercase tracking-widest mb-2 block">
                      {year}
                    </span>
                    <h3 className="font-bold text-[#0F172A] text-lg mb-2">
                      {t(`milestones.${year}.title`)}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {t(`milestones.${year}.description`)}
                    </p>
                  </div>
                ) : (
                  <div className="hidden md:block" />
                )}

                {/* Center icon */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-[#059669] flex items-center justify-center text-white shadow-md shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  {index < milestoneYears.length - 1 && (
                    <div className="w-px flex-1 bg-slate-200 min-h-[2rem] hidden md:block" />
                  )}
                </div>

                {/* Right content (odd) or empty (even) */}
                {!isEven ? (
                  <div className="bg-[#F8F7F4] rounded-xl p-6 border border-slate-200">
                    <span className="text-xs font-bold text-[#059669] uppercase tracking-widest mb-2 block">
                      {year}
                    </span>
                    <h3 className="font-bold text-[#0F172A] text-lg mb-2">
                      {t(`milestones.${year}.title`)}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {t(`milestones.${year}.description`)}
                    </p>
                  </div>
                ) : (
                  <div className="hidden md:block" />
                )}

                {/* Mobile fallback (shown only on small screens for odd items) */}
                {!isEven && (
                  <div className="md:hidden bg-[#F8F7F4] rounded-xl p-6 border border-slate-200 -mt-10">
                    <span className="text-xs font-bold text-[#059669] uppercase tracking-widest mb-2 block">
                      {year}
                    </span>
                    <h3 className="font-bold text-[#0F172A] text-lg mb-2">
                      {t(`milestones.${year}.title`)}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {t(`milestones.${year}.description`)}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Campus image */}
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/images/radom-hero-campus.jpg"
            alt="RIU Campus"
            width={1200}
            height={500}
            className="w-full h-72 md:h-[420px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}

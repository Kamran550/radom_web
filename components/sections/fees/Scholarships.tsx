"use client";

import { Award, GraduationCap, Users, TrendingUp, DollarSign } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const scholarshipKeys = [
  "academicExcellence",
  "meritBased",
  "needBased",
  "internationalStudents",
  "researchFellowships",
] as const;
const scholarshipIcons = [GraduationCap, Award, DollarSign, Users, TrendingUp] as const;
const scholarshipCoverages = ["50-100%", "25-75%", "30-80%", "40-60%", "Full Coverage"] as const;
const scholarshipDeadlines = [
  "March 15, 2025",
  "April 1, 2025",
  "May 1, 2025",
  "March 30, 2025",
  "February 28, 2025",
] as const;

export default function Scholarships() {
  const t = useTranslations("fees.scholarships");

  return (
    <section className="section-padding bg-[#F8F7F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <span className="section-label">{t("subtitle")}</span>
          <h2 className="heading-xl">{t("title")}</h2>
        </div>

        {/* Scholarships grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarshipKeys.map((key, index) => {
            const Icon = scholarshipIcons[index];
            const coverage = scholarshipCoverages[index];
            const deadline = scholarshipDeadlines[index];
            const name = t(`items.${key}.name`);
            const description = t(`items.${key}.description`);
            const eligibility = t.raw(`items.${key}.eligibility`) as string[];

            return (
              <div
                key={key}
                className="bg-white border border-slate-200 rounded-xl p-6 card-hover flex flex-col"
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#059669]" />
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-extrabold text-[#059669]">{coverage}</p>
                    <p className="text-xs text-slate-500">{t("coverage")}</p>
                  </div>
                </div>

                <h3 className="font-bold text-[#0F172A] text-lg mb-1">{name}</h3>
                <p className="text-slate-600 text-sm mb-4">{description}</p>

                {/* Eligibility */}
                <div className="mb-4 flex-1">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                    {t("eligibility")}
                  </h4>
                  <ul className="space-y-1">
                    {eligibility.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#059669] mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deadline */}
                <div className="pt-3 border-t border-slate-100">
                  <p className="text-xs text-slate-500">{t("applicationDeadline")}:</p>
                  <p className="text-sm font-semibold text-[#0F172A]">{deadline}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link href="/apply" className="btn-primary">
            {t("apply")}
          </Link>
        </div>
      </div>
    </section>
  );
}

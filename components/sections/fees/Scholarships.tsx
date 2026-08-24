"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const scholarshipKeys = [
  "academicExcellence",
  "meritBased",
  "needBased",
  "internationalStudents",
  "researchFellowships",
] as const;
const scholarshipCoverages = [
  "50-100%",
  "25-75%",
  "30-80%",
  "40-60%",
  "Full Coverage",
] as const;
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
    <section className="bg-[#F8F7F4] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl mb-14 md:mb-16"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#9B1C1C] mb-4">
            {t("subtitle")}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-[1.1]">
            {t("title")}
          </h2>
        </motion.div>

        {/* Featured first scholarship */}
        {(() => {
          const featuredKey = scholarshipKeys[0];
          const featuredCoverage = scholarshipCoverages[0];
          const featuredDeadline = scholarshipDeadlines[0];
          const featuredEligibility = t.raw(
            `items.${featuredKey}.eligibility`
          ) as string[];

          return (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="bg-[#0F172A] text-white mb-6 md:mb-8"
            >
              <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
                <div className="p-8 sm:p-10 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#E8B4B4] mb-4">
                      Featured
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                      {t(`items.${featuredKey}.name`)}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      {t(`items.${featuredKey}.description`)}
                    </p>
                  </div>
                  <div className="mt-10">
                    <p className="text-5xl sm:text-6xl font-extrabold tabular-nums tracking-tight text-white">
                      {featuredCoverage}
                    </p>
                    <p className="text-xs uppercase tracking-wider text-slate-500 mt-2">
                      {t("coverage")}
                    </p>
                  </div>
                </div>

                <div className="p-8 sm:p-10 md:p-12">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-5">
                    {t("eligibility")}
                  </p>
                  <ul className="space-y-0 divide-y divide-white/10 mb-10">
                    {featuredEligibility.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-baseline gap-4 py-3.5 first:pt-0 last:pb-0"
                      >
                        <span className="text-xs font-mono text-slate-500 tabular-nums shrink-0">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="text-slate-200 text-sm sm:text-base">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-6 border-t border-white/10">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">
                      {t("applicationDeadline")}
                    </p>
                    <p className="text-lg font-semibold">{featuredDeadline}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })()}

        {/* Remaining scholarships as compact rows */}
        <div className="border-t border-slate-300">
          {scholarshipKeys.slice(1).map((key, index) => {
            const coverage = scholarshipCoverages[index + 1];
            const deadline = scholarshipDeadlines[index + 1];
            const eligibility = t.raw(`items.${key}.eligibility`) as string[];

            return (
              <motion.article
                key={key}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,0.55fr)_minmax(0,1.2fr)] gap-5 md:gap-8 py-8 border-b border-slate-300"
              >
                <div>
                  <h3 className="text-xl font-bold text-[#0F172A] tracking-tight mb-2">
                    {t(`items.${key}.name`)}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {t(`items.${key}.description`)}
                  </p>
                  <p className="text-xs text-slate-400 mt-4">
                    {t("applicationDeadline")}:{" "}
                    <span className="font-semibold text-[#0F172A]">
                      {deadline}
                    </span>
                  </p>
                </div>

                <div className="md:text-center md:border-x md:border-slate-200 md:px-4 flex md:flex-col md:items-center md:justify-center gap-2">
                  <p className="text-3xl font-extrabold text-[#9B1C1C] tabular-nums tracking-tight">
                    {coverage}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">
                    {t("coverage")}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-3">
                    {t("eligibility")}
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {eligibility.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-slate-600"
                      >
                        <span className="mt-2 w-1 h-1 shrink-0 bg-[#9B1C1C]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-12">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#0F172A] text-white text-sm font-semibold uppercase tracking-[0.12em] px-7 py-3.5 hover:bg-[#9B1C1C] transition-colors"
          >
            {t("contact")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

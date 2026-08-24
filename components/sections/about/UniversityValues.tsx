"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const valueKeys = [
  "academicExcellence",
  "globalPerspective",
  "inclusiveCommunity",
  "innovation",
  "integrity",
  "excellence",
] as const;

export default function UniversityValues() {
  const t = useTranslations("about.values");

  return (
    <section className="bg-white section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-12 lg:gap-20 items-start">
          {/* Sticky intro column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:sticky lg:top-36"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#9B1C1C] mb-4">
              {t("subtitle")}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-[1.1] mb-6">
              {t("title")}
            </h2>
            <div className="h-1 w-14 bg-[#0F172A]" />
          </motion.div>

          {/* Values as editorial rows */}
          <div className="border-t border-slate-200">
            {valueKeys.map((key, index) => (
              <motion.article
                key={key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="group grid sm:grid-cols-[4.5rem_1fr] gap-4 sm:gap-8 py-8 border-b border-slate-200"
              >
                <span className="text-3xl sm:text-4xl font-extralight text-slate-300 tabular-nums leading-none group-hover:text-[#9B1C1C] transition-colors duration-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2 tracking-tight">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-[15px] max-w-xl">
                    {t(`items.${key}.description`)}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

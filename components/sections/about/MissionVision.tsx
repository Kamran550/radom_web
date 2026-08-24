"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const valueItems = [
  "excellence",
  "globalCitizenship",
  "diversity",
  "innovation",
  "ethicalLeadership",
] as const;

export default function MissionVision() {
  const t = useTranslations("about.missionVision");

  return (
    <section className="relative overflow-hidden bg-[#F8F7F4]">
      {/* Atmospheric top band */}
      <div className="absolute inset-x-0 top-0 h-64 bg-linear-to-b from-[#0F172A]/4 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-20 max-w-2xl"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#9B1C1C] mb-4">
            {t("subtitle")}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-[1.1]">
            {t("title")}
          </h2>
        </motion.div>

        {/* Mission — featured statement */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65 }}
          className="relative mb-10 md:mb-14"
        >
          <div className="bg-[#0F172A] text-white px-8 py-12 sm:px-12 sm:py-16 md:px-16 md:py-20">
            <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] gap-10 lg:gap-16 items-start">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-[#E8B4B4] mb-4">
                  01
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                  {t("mission.title")}
                </h3>
                <div className="mt-6 h-px w-16 bg-[#9B1C1C]" />
              </div>
              <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-light">
                {t("mission.description")}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Vision + Core values — split composition */}
        <div className="grid lg:grid-cols-12 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 bg-white border border-slate-200/80 p-8 sm:p-10 md:p-12"
          >
            <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-[#9B1C1C] mb-4">
              02
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight mb-5">
              {t("vision.title")}
            </h3>
            <p className="text-slate-600 leading-relaxed text-[15px] sm:text-base">
              {t("vision.description")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 border border-slate-200/80 bg-white p-8 sm:p-10 md:p-12"
          >
            <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-[#9B1C1C] mb-4">
              03
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight mb-8">
              {t("coreValues.title")}
            </h3>
            <ul className="space-y-0 divide-y divide-slate-100">
              {valueItems.map((item, index) => (
                <li
                  key={item}
                  className="flex items-baseline gap-5 py-4 first:pt-0 last:pb-0"
                >
                  <span className="text-xs font-mono text-slate-400 tabular-nums shrink-0 w-6">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[#0F172A] font-medium text-[15px] sm:text-base leading-snug">
                    {t(`coreValues.items.${item}`)}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

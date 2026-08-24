"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const milestoneYears = ["2001", "2005", "2015", "2022"] as const;

export default function AboutHistory() {
  const t = useTranslations("about.history");

  return (
    <section className="bg-[#0F172A] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl mb-14 md:mb-20"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#E8B4B4] mb-4">
            {t("subtitle")}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1]">
            {t("title")}
          </h2>
        </motion.div>

        {/* Horizontal year rail on desktop; stacked on mobile */}
        <div className="relative">
          <div className="hidden md:block absolute top-11 left-0 right-0 h-px bg-white/15" />

          <ol className="grid md:grid-cols-4 gap-10 md:gap-6">
            {milestoneYears.map((year, index) => (
              <motion.li
                key={year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative"
              >
                <div className="flex md:flex-col gap-5 md:gap-0">
                  <div className="shrink-0 md:mb-8">
                    <span className="relative z-10 inline-flex items-center justify-center w-14 h-14 rounded-full border border-white/25 bg-[#0F172A] text-sm font-bold tracking-wider text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <p className="text-3xl sm:text-4xl font-extrabold text-[#9B1C1C] tabular-nums mb-3 tracking-tight">
                      {year}
                    </p>
                    <h3 className="text-lg font-bold mb-3 tracking-tight">
                      {t(`milestones.${year}.title`)}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {t(`milestones.${year}.description`)}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>

      {/* Full-bleed campus break */}
      <div className="relative h-56 sm:h-72 md:h-96 w-full">
        <Image
          src="/images/radom-campus.jpg"
          alt="RIU Campus"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0F172A] via-transparent to-transparent opacity-80" />
      </div>
    </section>
  );
}

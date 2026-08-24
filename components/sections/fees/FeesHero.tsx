"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function FeesHero() {
  const t = useTranslations("fees.hero");

  return (
    <section className="relative bg-[#F8F7F4] pt-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(155,28,28,0.06),transparent_50%)] pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-slate-200" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#9B1C1C] mb-5">
              Tuition &amp; Financing
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-extrabold text-[#0F172A] leading-[1.05] tracking-tight mb-6">
              {t("title")}
            </h1>
            <div className="flex gap-5">
              <span className="w-1 shrink-0 bg-[#9B1C1C] rounded-full" aria-hidden />
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                {t("subtitle")}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="bg-[#0F172A] text-white p-8 sm:p-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#E8B4B4] mb-6">
                Starting from
              </p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl sm:text-6xl font-extrabold tracking-tight tabular-nums">
                  €2,800
                </span>
                <span className="text-slate-400 text-sm">/year</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-8">
                Flexible payment plans and scholarships available across all degree levels.
              </p>
              <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                {[
                  { label: "Programs", value: "4+" },
                  { label: "Plans", value: "4" },
                  { label: "Aid types", value: "5" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-xl font-bold tabular-nums">{stat.value}</p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutHero() {
  const t = useTranslations("about.hero");

  return (
    <section className="relative min-h-[78vh] flex items-end overflow-hidden pt-28">
      {/* Full-bleed campus atmosphere */}
      <div className="absolute inset-0">
        <Image
          src="/images/radom-hero-campus.jpg"
          alt="Radom International University campus"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-[#0F172A]/78" />
        <div className="absolute inset-0 bg-linear-to-t from-[#0F172A] via-[#0F172A]/55 to-[#0F172A]/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(155,28,28,0.22),transparent_55%)]" />
      </div>

      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#E8B4B4] mb-6">
              Radom International University
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold text-white leading-[1.05] tracking-tight mb-6">
              {t("title")}
            </h1>

            <div className="flex items-stretch gap-5 mb-8">
              <span className="w-1 shrink-0 bg-[#9B1C1C] rounded-full" aria-hidden />
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                {t("subtitle")}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-10 md:mt-14 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/15 pt-8"
          >
            {["Science", "Management", "Global Citizenship"].map((item) => (
              <span
                key={item}
                className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const programKeys = ["bachelors", "masters", "doctoral", "online"] as const;
const programConfig = [
  { annualFee: 4000, totalFee: 14000, popular: false },
  { annualFee: 4000, totalFee: 14000, popular: true },
  { annualFee: 4000, totalFee: 14000, popular: false },
  { annualFee: 2800, totalFee: 8400, popular: false },
] as const;

export default function ProgramPriceTable() {
  const t = useTranslations("fees.priceTable");

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 lg:gap-20 mb-14 md:mb-16"
        >
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#9B1C1C] mb-4">
              {t("subtitle")}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-[1.1]">
              {t("title")}
            </h2>
          </div>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed self-end max-w-md lg:justify-self-end">
            {t("note")}
          </p>
        </motion.div>

        {/* Rate-sheet layout */}
        <div className="border-t border-[#0F172A]">
          {/* Column headers — desktop */}
          <div className="hidden md:grid grid-cols-[minmax(0,1.4fr)_minmax(0,0.7fr)_minmax(0,0.7fr)_minmax(0,1.6fr)] gap-6 py-4 border-b border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Program
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Annual
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              {t("total")}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Includes
            </span>
          </div>

          {programKeys.map((key, index) => {
            const config = programConfig[index];
            const name = t(`programs.${key}.name`);
            const duration = t(`programs.${key}.duration`);
            const features = t.raw(`programs.${key}.features`) as string[];

            return (
              <motion.article
                key={key}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className={`relative grid md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.7fr)_minmax(0,0.7fr)_minmax(0,1.6fr)] gap-4 md:gap-6 py-8 md:py-10 border-b border-slate-200 ${
                  config.popular ? "bg-[#0F172A]/2.5" : ""
                }`}
              >
                {config.popular && (
                  <span className="absolute top-0 left-0 text-[9px] font-bold uppercase tracking-[0.18em] bg-[#9B1C1C] text-white px-3 py-1">
                    {t("mostPopular")}
                  </span>
                )}

                <div className={config.popular ? "pt-5 md:pt-4" : ""}>
                  <span className="text-xs font-mono text-slate-300 tabular-nums mb-2 block">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                    {name}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">{duration}</p>
                </div>

                <div className="flex md:block items-baseline gap-2">
                  <p className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tabular-nums tracking-tight">
                    €{config.annualFee.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">{t("year")}</p>
                </div>

                <div className="flex md:block items-baseline gap-2">
                  <p className="text-xl font-bold text-slate-700 tabular-nums">
                    €{config.totalFee.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-400 mt-1 md:block hidden">
                    program total
                  </p>
                </div>

                <ul className="space-y-2">
                  {features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-slate-600"
                    >
                      <span className="mt-2 w-1 h-1 shrink-0 bg-[#9B1C1C]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const planKeys = [
  "fullPayment",
  "semesterPayment",
  "monthlyPayment",
  "installmentPlan",
] as const;
const planDiscounts = ["10%", "5%", "0%", "Custom"] as const;
const planRecommended = [false, true, false, false] as const;

export default function PaymentPlans() {
  const t = useTranslations("fees.paymentPlans");

  return (
    <section className="bg-[#0F172A] text-white py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl mb-14 md:mb-16"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#E8B4B4] mb-4">
            {t("subtitle")}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1]">
            {t("title")}
          </h2>
        </motion.div>

        <div className="space-y-0 border-t border-white/15">
          {planKeys.map((key, index) => {
            const discount = planDiscounts[index];
            const recommended = planRecommended[index];
            const name = t(`plans.${key}.name`);
            const description = t(`plans.${key}.description`);
            const benefits = t.raw(`plans.${key}.benefits`) as string[];

            return (
              <motion.article
                key={key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="group grid lg:grid-cols-[8rem_minmax(0,1fr)_minmax(0,1.2fr)] gap-6 lg:gap-10 py-10 md:py-12 border-b border-white/15"
              >
                {/* Discount figure */}
                <div>
                  {recommended && (
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#E8B4B4] mb-2">
                      {t("recommended")}
                    </p>
                  )}
                  <p
                    className={`text-4xl sm:text-5xl font-extrabold tabular-nums tracking-tight ${
                      recommended ? "text-[#E8B4B4]" : "text-white"
                    }`}
                  >
                    {discount === "Custom" ? "—" : discount}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">
                    {discount === "Custom" ? t("customTerms") : t("off")}
                  </p>
                </div>

                {/* Name + description */}
                <div>
                  <span className="text-xs font-mono text-slate-500 tabular-nums mb-2 block">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight mb-3">
                    {name}
                  </h3>
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-md">
                    {description}
                  </p>
                </div>

                {/* Benefits */}
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 self-center">
                  {benefits.map((benefit, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-slate-300"
                    >
                      <span className="mt-1.5 w-1.5 h-px shrink-0 bg-[#9B1C1C]" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#0F172A] text-sm font-semibold uppercase tracking-[0.12em] px-7 py-3.5 hover:bg-[#9B1C1C] hover:text-white transition-colors"
          >
            {t("contact")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

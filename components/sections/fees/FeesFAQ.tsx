"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";

const faqKeys = [
  "q1",
  "q2",
  "q3",
  "q4",
  "q5",
  "q6",
  "q7",
  "q8",
  "q9",
  "q10",
] as const;

export default function FeesFAQ() {
  const t = useTranslations("fees.faq");

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-12 lg:gap-20">
          {/* Sticky intro */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:sticky lg:top-36 self-start"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#9B1C1C] mb-4">
              {t("subtitle")}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-[1.1] mb-6">
              {t("title")}
            </h2>
            <div className="h-1 w-14 bg-[#0F172A] mb-8" />
            <p className="text-slate-600 text-sm mb-3">{t("contact")}</p>
            <Link
              href="/contact"
              className="text-sm font-semibold text-[#9B1C1C] hover:text-[#7F1616] underline underline-offset-4 decoration-[#9B1C1C]/40"
            >
              {t("contactLink")}
            </Link>
          </motion.div>

          {/* Single-column numbered accordion */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <Accordion type="single" collapsible className="w-full border-t border-slate-200">
              {faqKeys.map((key, index) => (
                <AccordionItem
                  key={key}
                  value={`item-${index}`}
                  className="border-b border-slate-200 border-t-0 px-0 shadow-none"
                >
                  <AccordionTrigger className="text-left py-5 hover:no-underline group gap-4">
                    <span className="flex items-start gap-4 sm:gap-6">
                      <span className="text-xs font-mono text-slate-300 tabular-nums mt-1 shrink-0 group-hover:text-[#9B1C1C] transition-colors">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base sm:text-lg font-semibold text-[#0F172A] group-hover:text-[#9B1C1C] transition-colors leading-snug">
                        {t(`items.${key}.question`)}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 pl-10 sm:pl-12 text-slate-600 text-sm sm:text-base leading-relaxed">
                    {t(`items.${key}.answer`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

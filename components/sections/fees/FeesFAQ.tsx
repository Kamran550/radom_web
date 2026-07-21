"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const faqKeys = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10"] as const;

export default function FeesFAQ() {
  const t = useTranslations("fees.faq");

  return (
    <section className="section-padding bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="section-label">{t("subtitle")}</span>
          <h2 className="heading-xl">{t("title")}</h2>
        </div>

        {/* FAQ Accordion — two columns */}
        <div className="grid md:grid-cols-2 gap-4">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqKeys.slice(0, 5).map((key, index) => (
              <AccordionItem
                key={key}
                value={`item-${index}`}
                className="border border-slate-200 rounded-lg px-5 bg-[#F8F7F4] shadow-none"
              >
                <AccordionTrigger className="text-left text-sm font-semibold text-[#0F172A] py-3 hover:no-underline hover:text-[#059669]">
                  {t(`items.${key}.question`)}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-sm leading-relaxed pb-3">
                  {t(`items.${key}.answer`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqKeys.slice(5).map((key, index) => (
              <AccordionItem
                key={key}
                value={`item-${index + 5}`}
                className="border border-slate-200 rounded-lg px-5 bg-[#F8F7F4] shadow-none"
              >
                <AccordionTrigger className="text-left text-sm font-semibold text-[#0F172A] py-3 hover:no-underline hover:text-[#059669]">
                  {t(`items.${key}.question`)}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-sm leading-relaxed pb-3">
                  {t(`items.${key}.answer`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact link */}
        <div className="mt-10 text-center">
          <p className="text-slate-600 mb-2 text-sm">{t("contact")}</p>
          <Link
            href="/contact"
            className="text-[#059669] hover:text-[#047857] font-semibold text-sm underline underline-offset-2"
          >
            {t("contactLink")}
          </Link>
        </div>
      </div>
    </section>
  );
}

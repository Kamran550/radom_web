"use client";

import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

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
    <section className="section-padding bg-[#F8F7F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <span className="section-label">{t("subtitle")}</span>
          <h2 className="heading-xl">{t("title")}</h2>
        </div>

        {/* Price cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programKeys.map((key, index) => {
            const config = programConfig[index];
            const name = t(`programs.${key}.name`);
            const duration = t(`programs.${key}.duration`);
            const features = t.raw(`programs.${key}.features`) as string[];

            return (
              <div
                key={key}
                className={cn(
                  "bg-white rounded-xl border overflow-hidden card-hover",
                  config.popular ? "border-[#059669]" : "border-slate-200"
                )}
              >
                {config.popular && (
                  <div className="bg-[#059669] text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 text-center">
                    {t("mostPopular")}
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-[#0F172A] mb-1">
                        {name}
                      </h3>
                      <p className="text-sm text-slate-500">{duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-extrabold text-[#059669]">
                        €{config.annualFee.toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-500">/{t("year")}</p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-500 mb-4">
                    {t("total")}: <span className="font-semibold text-[#0F172A]">€{config.totalFee.toLocaleString()}</span>
                  </p>

                  <div className="border-t border-slate-100 pt-4">
                    <ul className="space-y-2">
                      {features.map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                          <Check className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <p className="mt-8 text-sm text-slate-500 text-center">{t("note")}</p>
      </div>
    </section>
  );
}

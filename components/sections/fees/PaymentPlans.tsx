"use client";

import { Calendar, CreditCard, Wallet, DollarSign } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const planKeys = [
  "fullPayment",
  "semesterPayment",
  "monthlyPayment",
  "installmentPlan",
] as const;
const planIcons = [DollarSign, Calendar, CreditCard, Wallet] as const;
const planDiscounts = ["10%", "5%", "0%", "Custom"] as const;
const planRecommended = [false, true, false, false] as const;

export default function PaymentPlans() {
  const t = useTranslations("fees.paymentPlans");

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="section-label">{t("subtitle")}</span>
          <h2 className="heading-xl">{t("title")}</h2>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {planKeys.map((key, index) => {
            const Icon = planIcons[index];
            const discount = planDiscounts[index];
            const recommended = planRecommended[index];
            const name = t(`plans.${key}.name`);
            const description = t(`plans.${key}.description`);
            const benefits = t.raw(`plans.${key}.benefits`) as string[];

            return (
              <div
                key={key}
                className={cn(
                  "rounded-xl border p-6 card-hover bg-white",
                  recommended ? "border-[#059669]" : "border-slate-200"
                )}
              >
                {recommended && (
                  <div className="text-xs font-bold text-[#059669] uppercase tracking-widest mb-3">
                    ★ {t("recommended")}
                  </div>
                )}

                <div className="flex items-start gap-4 mb-4">
                  <div className="w-11 h-11 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#059669]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-lg">{name}</h3>
                    {discount !== "Custom" ? (
                      <p className="text-[#059669] font-bold text-lg">
                        {discount} {t("off")}
                      </p>
                    ) : (
                      <p className="text-[#059669] font-semibold text-sm">
                        {t("customTerms")}
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-slate-600 text-sm mb-4">{description}</p>

                <ul className="space-y-1.5">
                  {benefits.map((benefit: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-[#059669] font-bold shrink-0">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link href="/contact" className="btn-primary">
            {t("contact")}
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import { applyInfo } from "@/constants/apply-info";
import { Link } from "@/i18n/routing";
import { ArrowRight, CheckCheck, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ApplyCTA() {
  const t = useTranslations("cta");

  return (
    <section className="bg-[#F8F7F4] section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-10 items-start">

          {/* Left — main CTA (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <span className="section-label">{t("title")}</span>
            <h2 className="heading-xl">{t("title")}</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              {t("description")}
            </p>

            {/* Benefits list */}
            <ul className="space-y-3">
              {applyInfo.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCheck className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/apply" className="btn-primary">
                {t("button")}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/programs" className="btn-outline">
                {t("learnMore")}
              </Link>
            </div>
          </div>

          {/* Right — Deadline card (2 cols) */}
          <div className="lg:col-span-2">
            <div className="bg-[#0F172A] rounded-2xl p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#059669] flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold">{t("deadlineTitle")}</h3>
              </div>

              <p className="text-3xl font-extrabold text-[#10B981] mb-2">
                {applyInfo.deadline}
              </p>

              <p className="text-slate-400 text-sm mb-6">{t("applicationsOpen")}</p>

              <div className="flex items-center gap-2 pt-4 border-t border-slate-700">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
                  Applications Open
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

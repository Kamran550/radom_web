"use client";

import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";

export default function ContactHero() {
  const t = useTranslations("contact.hero");

  return (
    <section className="bg-[#0F172A] pt-32">
      <div className="h-1 bg-[#059669]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — text */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-[#059669]" />
              <span className="text-[#10B981] text-xs font-bold uppercase tracking-widest">
                {t("badge")}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              {t("title")}
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
              {t("subtitle")}
            </p>
          </div>

          {/* Right — info card */}
          <div className="hidden lg:block">
            <div className="bg-[#1E293B] rounded-2xl p-8 border border-slate-700">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#059669] flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">{t("quickResponse")}</p>
                  <p className="text-slate-400 text-sm">{t("helpAvailable")}</p>
                </div>
              </div>
              <div className="border-t border-slate-700 pt-4 space-y-2">
                <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Office Hours</p>
                <p className="text-slate-300 text-sm">Mon – Fri: 9:00 AM – 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

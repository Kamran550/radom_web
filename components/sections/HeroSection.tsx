"use client";

import { heroData } from "@/constants/hero";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { ArrowRight, GraduationCap, Globe } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative w-full min-h-screen bg-[#0F172A] pt-32 flex flex-col">
      {/* Top accent line */}
      <div className="h-1 bg-[#059669] w-full" />

      <div className="flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — Text */}
            <div className="space-y-8">
              {/* Label */}
              <div className="flex items-center gap-3">
                <span className="inline-block w-8 h-px bg-[#059669]" />
                <span className="text-[#10B981] text-xs font-bold uppercase tracking-widest">
                  {t("badge")}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
                {t("title")}
              </h1>

              {/* Subtitle */}
              <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
                {t("subtitle")}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link href="/apply" className="btn-primary">
                  {t("primaryButton")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/programs" className="btn-outline-white">
                  {t("secondaryButton")}
                </Link>
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-8 pt-4 border-t border-slate-800">
                <div>
                  <p className="text-2xl font-bold text-white">25+</p>
                  <p className="text-sm text-slate-500 mt-0.5">{t("stats.yearsExperience")}</p>
                </div>
                <div className="w-px bg-slate-800" />
                <div>
                  <p className="text-2xl font-bold text-white">50+</p>
                  <p className="text-sm text-slate-500 mt-0.5">{t("stats.countries")}</p>
                </div>
                <div className="w-px bg-slate-800" />
                <div>
                  <p className="text-2xl font-bold text-white">EU</p>
                  <p className="text-sm text-slate-500 mt-0.5">{t("stats.excellence")}</p>
                </div>
              </div>
            </div>

            {/* Right — Image */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700">
                <div className="aspect-[4/5] relative">
                  <Image
                    src={heroData.backgroundImage}
                    alt="RIU Campus"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-[#0F172A]/30" />
                </div>

                {/* Overlay badge — top left */}
                <div className="absolute top-6 left-6 bg-[#059669] text-white px-4 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    <span className="text-sm font-semibold">{t("cards.academic")}</span>
                  </div>
                </div>

                {/* Overlay badge — bottom right */}
                <div className="absolute bottom-6 right-6 bg-white text-[#0F172A] px-4 py-2 rounded-lg shadow-lg">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#059669]" />
                    <span className="text-sm font-semibold">{t("cards.innovation")}</span>
                  </div>
                </div>
              </div>

              {/* Decorative corner block */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-2 border-[#059669] rounded-lg opacity-30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

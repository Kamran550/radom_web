"use client";

import { aboutPreviewData } from "@/constants/about";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const checkPoints = [
  "academicStandard",
  "globalNetwork",
  "studentSupport",
] as const;

export default function AboutPreview() {
  const t = useTranslations("aboutPreview");

  return (
    <section className="section-padding bg-[#F8F7F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <div className="aspect-[4/3] relative">
                <Image
                  src={aboutPreviewData.image}
                  alt="RIU Campus"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -right-5 bg-[#0F172A] text-white px-5 py-4 rounded-xl shadow-xl">
              <p className="text-2xl font-bold text-[#10B981]">25+</p>
              <p className="text-xs text-slate-400 mt-0.5">{t("yearsExperience")}</p>
            </div>
          </div>

          {/* Right — Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <span className="section-label">{t("badge")}</span>
            <h2 className="heading-xl">{t("title")}</h2>

            <p className="text-slate-600 text-lg leading-relaxed">
              {t("description")}
            </p>

            {/* Check list */}
            <ul className="space-y-3 pt-2">
              {checkPoints.map((key) => (
                <li key={key} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0" />
                  <span className="text-slate-700 text-sm font-medium">
                    {t(`checkpoints.${key}`)}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/about"
              className="btn-primary mt-2 inline-flex"
            >
              {t("button")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

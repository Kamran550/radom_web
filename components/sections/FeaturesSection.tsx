"use client";

import {
  GraduationCap,
  Globe,
  Users,
  Award,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import { useTranslations } from "next-intl";

const features = [
  { icon: GraduationCap, key: "academicExcellence" },
  { icon: Globe, key: "globalNetwork" },
  { icon: Users, key: "diverseCommunity" },
  { icon: Award, key: "recognizedDegrees" },
  { icon: BookOpen, key: "modernFacilities" },
  { icon: TrendingUp, key: "careerSupport" },
];

export default function FeaturesSection() {
  const t = useTranslations("features");

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <span className="section-label">{t("subtitle")}</span>
          <h2 className="heading-xl">{t("title")}</h2>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.key}
                className="p-6 border border-slate-200 rounded-xl card-hover bg-white"
              >
                <div className="feature-icon">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-2">
                  {t(`${feature.key}.title`)}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {t(`${feature.key}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import {
  GraduationCap,
  Globe,
  Users,
  Lightbulb,
  Shield,
  Award,
} from "lucide-react";
import { useTranslations } from "next-intl";

const valueKeys = [
  "academicExcellence",
  "globalPerspective",
  "inclusiveCommunity",
  "innovation",
  "integrity",
  "excellence",
] as const;

const valueIcons = [GraduationCap, Globe, Users, Lightbulb, Shield, Award] as const;

export default function UniversityValues() {
  const t = useTranslations("about.values");

  return (
    <section className="section-padding bg-[#F8F7F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <span className="section-label">{t("subtitle")}</span>
          <h2 className="heading-xl">{t("title")}</h2>
        </div>

        {/* Values grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {valueKeys.map((key, index) => {
            const Icon = valueIcons[index];
            return (
              <div
                key={key}
                className="bg-white border border-slate-200 rounded-xl p-6 card-hover"
              >
                <div className="feature-icon">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-[#0F172A] text-lg mb-2">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {t(`items.${key}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

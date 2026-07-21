"use client";

import { Target, Eye, Heart } from "lucide-react";
import { useTranslations } from "next-intl";

const cards = [
  { key: "mission", icon: Target, color: "#059669" },
  { key: "vision", icon: Eye, color: "#0F172A" },
  { key: "coreValues", icon: Heart, color: "#D97706" },
] as const;

export default function MissionVision() {
  const t = useTranslations("about.missionVision");

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-label">{t("subtitle")}</span>
          <h2 className="heading-xl">{t("title")}</h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="border border-slate-200 rounded-xl p-8 card-hover">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-5"
              style={{ backgroundColor: `${cards[0].color}15` }}
            >
              <Target className="w-6 h-6" style={{ color: cards[0].color }} />
            </div>
            <h3 className="heading-md mb-3">{t("mission.title")}</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              {t("mission.description")}
            </p>
          </div>

          {/* Vision */}
          <div className="border border-slate-200 rounded-xl p-8 card-hover bg-[#0F172A] text-white" style={{ borderColor: '#0F172A' }}>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5 bg-white/10">
              <Eye className="w-6 h-6 text-[#10B981]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{t("vision.title")}</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              {t("vision.description")}
            </p>
          </div>

          {/* Core Values */}
          <div className="border border-slate-200 rounded-xl p-8 card-hover">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5 bg-amber-50">
              <Heart className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="heading-md mb-3">{t("coreValues.title")}</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              {(["excellence", "globalCitizenship", "diversity", "innovation", "ethicalLeadership"] as const).map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#059669] shrink-0" />
                  <span>{t(`coreValues.items.${item}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

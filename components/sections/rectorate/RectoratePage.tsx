"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Mail, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type LeadershipMember = {
  id: string;
  name: string;
  position: string;
  email: string;
};

export default function RectoratePage() {
  const t = useTranslations("about.rectorate");
  const tAdmin = useTranslations("about.administrativeUnits");
  const [activeTab, setActiveTab] = useState<"profile" | "welcomeMessage">(
    "profile"
  );

  const leadership: LeadershipMember[] = [
    {
      id: "rector",
      name: t("profile.fullNameValue"),
      position: t("profile.positionValue"),
      email: t("profile.emailValue"),
    },
    {
      id: "vice-rector",
      name: tAdmin("viceRector.name"),
      position: tAdmin("viceRector.position"),
      email: tAdmin("viceRector.email"),
    },
    {
      id: "rector-advisor",
      name: tAdmin("rectorAdvisor.name"),
      position: tAdmin("rectorAdvisor.position"),
      email: tAdmin("rectorAdvisor.email"),
    },
    {
      id: "secretary-general",
      name: tAdmin("secretaryGeneral.name"),
      position: tAdmin("secretaryGeneral.position"),
      email: tAdmin("secretaryGeneral.email"),
    },
    {
      id: "office-director",
      name: tAdmin("officeDirector.name"),
      position: tAdmin("officeDirector.position"),
      email: tAdmin("officeDirector.email"),
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8F7F4] font-sans pt-32 pb-20">
      {/* Hero */}
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#9B1C1C] mb-4">
              Leadership
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight mb-4">
              {t("title")}
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
              Leadership, excellence, and vision for higher education
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-14">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex mb-10 border-b border-slate-200"
        >
          {(
            [
              { key: "profile", label: t("tabs.profile") },
              { key: "welcomeMessage", label: t("tabs.welcomeMessage") },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative px-5 sm:px-8 py-3.5 text-sm font-semibold tracking-wide transition-colors ${
                activeTab === tab.key
                  ? "text-[#0F172A]"
                  : "text-slate-500 hover:text-[#0F172A]"
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <motion.span
                  layoutId="rectorateTab"
                  className="absolute inset-x-0 -bottom-px h-0.5 bg-[#9B1C1C]"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === "profile" ? (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="space-y-8"
            >
              {/* Featured Rector — text card */}
              <article className="bg-white border border-slate-200 overflow-hidden">
                <div className="bg-[#0F172A] px-8 py-10 sm:px-12 sm:py-12">
                  <div className="inline-flex items-center gap-2 mb-5">
                    <Award className="h-4 w-4 text-[#E8B4B4]" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E8B4B4]">
                      {t("profile.positionValue")}
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
                    {t("profile.fullNameValue")}
                  </h2>
                  <a
                    href={`mailto:${t("profile.emailValue")}`}
                    className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    {t("profile.emailValue")}
                  </a>
                </div>

                <div className="p-8 sm:p-10 md:p-12">
                  <h3 className="text-xl font-bold text-[#0F172A] mb-6 tracking-tight">
                    {t("profile.title")}
                  </h3>
                  <div className="space-y-5 text-slate-600 leading-relaxed">
                    <p>{t("profile.description")}</p>
                    <p>{t("profile.qualifications")}</p>
                  </div>
                </div>
              </article>

              {/* Full leadership — text-only cards */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500 mb-5">
                  University Leadership
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                  {leadership.map((member, index) => (
                    <article
                      key={member.id}
                      className={`bg-white border border-slate-200 p-6 sm:p-7 ${
                        index === 0 ? "sm:col-span-2 lg:col-span-3 border-l-4 border-l-[#9B1C1C]" : ""
                      }`}
                    >
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9B1C1C] mb-3">
                        {member.position}
                      </p>
                      <h4
                        className={`font-bold text-[#0F172A] tracking-tight mb-4 ${
                          index === 0 ? "text-2xl" : "text-lg"
                        }`}
                      >
                        {member.name}
                      </h4>
                      <a
                        href={`mailto:${member.email}`}
                        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#9B1C1C] transition-colors break-all"
                      >
                        <Mail className="h-3.5 w-3.5 shrink-0" />
                        {member.email}
                      </a>
                    </article>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="welcomeMessage"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="bg-white border border-slate-200 p-8 sm:p-10 md:p-12 max-w-4xl"
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-3">
                {t("welcomeMessage.title")}
              </h2>
              <div className="h-0.5 w-16 bg-[#9B1C1C] mb-8" />

              <div className="space-y-5 text-slate-600 leading-relaxed">
                <p className="text-xl font-semibold text-[#0F172A]">
                  {t("welcomeMessage.greeting")}
                </p>
                <p>{t("welcomeMessage.paragraph1")}</p>
                <p>{t("welcomeMessage.paragraph2")}</p>
                <p>{t("welcomeMessage.paragraph3")}</p>
                <p className="font-medium text-[#0F172A] pt-2">
                  {t("welcomeMessage.closing")}
                </p>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-200">
                <p className="text-sm text-slate-500 mb-2">
                  {t("welcomeMessage.signature")}
                </p>
                <p className="text-2xl font-bold text-[#0F172A]">
                  {t("welcomeMessage.signatureName")}
                </p>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9B1C1C] mt-1">
                  {t("welcomeMessage.signatureTitle")}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

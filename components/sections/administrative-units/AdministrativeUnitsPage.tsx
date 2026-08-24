"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Mail, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function AdministrativeUnitsPage() {
  const t = useTranslations("about.administrativeUnits");

  const staff = [
    {
      id: "vice-rector",
      positionKey: "viceRector.position",
      nameKey: "viceRector.name",
      emailKey: "viceRector.email",
    },
    {
      id: "rector-advisor",
      positionKey: "rectorAdvisor.position",
      nameKey: "rectorAdvisor.name",
      emailKey: "rectorAdvisor.email",
    },
    {
      id: "secretary-general",
      positionKey: "secretaryGeneral.position",
      nameKey: "secretaryGeneral.name",
      emailKey: "secretaryGeneral.email",
    },
    {
      id: "office-director",
      positionKey: "officeDirector.position",
      nameKey: "officeDirector.name",
      emailKey: "officeDirector.email",
    },
  ] as const;

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
            <div className="inline-flex items-center gap-2 mb-4">
              <Users className="h-4 w-4 text-[#9B1C1C]" />
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#9B1C1C]">
                Administration
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight mb-4">
              {t("title")}
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
              {t("subtitle")}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-14">
        <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
          {staff.map((member, index) => (
            <motion.article
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="group bg-white border border-slate-200 p-7 sm:p-8 hover:border-[#0F172A]/30 transition-colors duration-300"
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9B1C1C]">
                  {t(member.positionKey)}
                </span>
                <span className="text-xs font-mono text-slate-300 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight mb-6 leading-snug min-h-14">
                {t(member.nameKey)}
              </h2>

              <div className="pt-5 border-t border-slate-100">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-2 bg-slate-50 border border-slate-100">
                    <Mail className="h-4 w-4 text-[#9B1C1C]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Email
                    </p>
                    <a
                      href={`mailto:${t(member.emailKey)}`}
                      className="text-sm font-semibold text-[#0F172A] hover:text-[#9B1C1C] transition-colors break-all"
                    >
                      {t(member.emailKey)}
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
}

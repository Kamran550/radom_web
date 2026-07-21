"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Building2, Check, ArrowRightLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type ApplicantType = "student" | "agency" | "transfer";

interface ApplicantTypeSelectorProps {
  selectedType: ApplicantType | null;
  onSelect: (type: ApplicantType) => void;
}

export default function ApplicantTypeSelector({
  selectedType,
  onSelect,
}: ApplicantTypeSelectorProps) {
  const t = useTranslations("apply.applicantType");

  const options: { type: ApplicantType; icon: React.ReactNode; label: string; desc: string }[] = [
    {
      type: "student",
      icon: <User className="w-10 h-10" />,
      label: t("student"),
      desc: t("studentDesc"),
    },
    {
      type: "agency",
      icon: <Building2 className="w-10 h-10" />,
      label: t("agency"),
      desc: t("agencyDesc"),
    },
    {
      type: "transfer",
      icon: <ArrowRightLeft className="w-10 h-10" />,
      label: t("transfer"),
      desc: t("transferDesc"),
    },
  ];

  return (
    <div>
      <Card className="shadow-sm border border-slate-200">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold text-center text-[#0F172A]">
            {t("title")}
          </CardTitle>
          <p className="text-slate-500 text-center mt-2">{t("subtitle")}</p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {options.map(({ type, icon, label, desc }) => {
              const isSelected = selectedType === type;
              return (
                <button
                  key={type}
                  onClick={() => onSelect(type)}
                  className={cn(
                    "relative w-full p-6 rounded-xl border-2 flex flex-col items-center gap-4 text-center",
                    isSelected
                      ? "border-[#059669] bg-emerald-50"
                      : "border-slate-200 bg-white hover:border-[#059669] hover:bg-emerald-50/40"
                  )}
                >
                  {/* Check badge */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#059669] flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center",
                    isSelected
                      ? "bg-[#059669] text-white"
                      : "bg-slate-100 text-slate-500"
                  )}>
                    {icon}
                  </div>
                  <div>
                    <h3 className={cn(
                      "text-lg font-bold mb-1",
                      isSelected ? "text-[#059669]" : "text-[#0F172A]"
                    )}>
                      {label}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

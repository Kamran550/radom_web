"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Check, Languages } from "lucide-react";
import { Faculty } from "@/lib/types/faculty";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export type TeachingLanguage = "EN" | "TR";

interface FacultySelectorProps {
  faculties: Faculty[];
  selectedFacultyId: number | null;
  onSelect: (faculty: Faculty) => void;
  selectedLanguage: TeachingLanguage | null;
  onLanguageSelect: (language: TeachingLanguage) => void;
}

export default function FacultySelector({
  faculties,
  selectedFacultyId,
  onSelect,
  selectedLanguage,
  onLanguageSelect,
}: FacultySelectorProps) {
  const t = useTranslations("apply.facultySelector");
  const langT = useTranslations("apply.facultySelector.languageSelection");

  if (faculties.length === 0) {
    return (
      <Card className="shadow-sm border border-slate-200">
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <p className="text-slate-500">{t("noFaculties")}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const selectedFaculty = faculties.find((f) => f.id === selectedFacultyId);

  return (
    <div className="space-y-6">
      {/* Faculty Selection */}
      <Card className="shadow-sm border border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#0F172A]">
            <BookOpen className="w-5 h-5 text-[#059669]" />
            {t("title")}
          </CardTitle>
          <p className="text-sm text-slate-500 mt-2">{t("subtitle")}</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[480px] overflow-y-auto pr-1">
            {faculties.map((faculty) => {
              const isSelected = selectedFacultyId === faculty.id;
              return (
                <button
                  key={faculty.id}
                  onClick={() => onSelect(faculty)}
                  className={cn(
                    "relative w-full p-4 rounded-xl border-2 text-left",
                    isSelected
                      ? "border-[#059669] bg-emerald-50"
                      : "border-slate-200 bg-white hover:border-[#059669] hover:bg-emerald-50/40"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={cn(
                      "font-medium text-sm leading-snug",
                      isSelected ? "text-[#059669]" : "text-[#0F172A]"
                    )}>
                      {faculty.name}
                    </span>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#059669] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected notice */}
          {selectedFacultyId && selectedFaculty && (
            <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <p className="text-sm font-medium text-emerald-800">
                {t("selected")}:{" "}
                <span className="font-bold">{selectedFaculty.name}</span>
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Language Selection */}
      {selectedFacultyId && (
        <Card className="shadow-sm border border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#0F172A]">
              <Languages className="w-5 h-5 text-[#059669]" />
              {langT("title")}
            </CardTitle>
            <p className="text-sm text-slate-500 mt-2">{langT("subtitle")}</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(["EN", "TR"] as TeachingLanguage[]).map((lang) => {
                const isSelected = selectedLanguage === lang;
                const flag = lang === "EN" ? "🇬🇧" : "🇹🇷";
                const label = lang === "EN" ? langT("english") : langT("turkish");
                return (
                  <button
                    key={lang}
                    onClick={() => onLanguageSelect(lang)}
                    className={cn(
                      "relative w-full p-4 rounded-xl border-2 flex items-center justify-between gap-2",
                      isSelected
                        ? "border-[#059669] bg-emerald-50"
                        : "border-slate-200 bg-white hover:border-[#059669] hover:bg-emerald-50/40"
                    )}
                  >
                    <span className={cn(
                      "font-semibold flex items-center gap-2",
                      isSelected ? "text-[#059669]" : "text-[#0F172A]"
                    )}>
                      <span className="text-xl">{flag}</span>
                      {label}
                    </span>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#059669] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {selectedLanguage && (
              <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <p className="text-sm font-medium text-emerald-800">
                  {langT("selected")}:{" "}
                  <span className="font-bold">
                    {selectedLanguage === "EN" ? langT("english") : langT("turkish")}
                  </span>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

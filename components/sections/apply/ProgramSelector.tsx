"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, BookOpen, Check } from "lucide-react";
import { ProgramService } from "@/lib/services/program.service";
import { Program } from "@/lib/types/program";
import { ApiClientError } from "@/lib/api/client";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface ProgramSelectorProps {
  onSelect: (program: Program) => void;
  selectedProgramId?: number;
  degreeId: number;
  facultyId: number;
  teachingLanguage: "EN" | "TR";
}

export default function ProgramSelector({
  onSelect,
  selectedProgramId,
  degreeId,
  facultyId,
  teachingLanguage,
}: ProgramSelectorProps) {
  const t = useTranslations("apply.programSelector");
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrograms = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ProgramService.getByDegreeAndFaculty(
        degreeId,
        facultyId,
        teachingLanguage
      );
      console.log("programs data", data);
      setPrograms(data);
    } catch (err) {
      const errorMessage =
        err instanceof ApiClientError
          ? err.message
          : err instanceof Error
          ? err.message
          : t("error");
      setError(errorMessage);
      console.error("Failed to fetch programs:", err);
    } finally {
      setLoading(false);
    }
  }, [degreeId, facultyId, teachingLanguage, t]);

  useEffect(() => {
    if (degreeId && facultyId) {
      fetchPrograms();
    }
  }, [degreeId, facultyId, fetchPrograms]);

  if (loading) {
    return (
      <Card className="shadow-sm border border-slate-200">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-[#059669] mb-4" />
            <p className="text-slate-500">{t("loading")}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="shadow-sm border border-red-200">
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <p className="text-red-600 mb-2 font-medium">{t("error")}</p>
            <p className="text-sm text-slate-500 mb-5">{error}</p>
            <Button
              variant="outline"
              onClick={fetchPrograms}
              className="border-[#059669] text-[#059669] hover:bg-[#059669] hover:text-white"
            >
              {t("retry")}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (programs.length === 0) {
    return (
      <Card className="shadow-sm border border-slate-200">
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <p className="text-slate-500">{t("noPrograms")}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[#0F172A]">
          <BookOpen className="w-5 h-5 text-[#059669]" />
          {t("title")}
        </CardTitle>
        <p className="text-sm text-slate-500 mt-2">{t("subtitle")}</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {programs.map((program) => {
            const isSelected = selectedProgramId === program.id;
            return (
              <button
                key={program.id}
                onClick={() => onSelect(program)}
                className={cn(
                  "relative w-full p-4 rounded-xl border-2 text-left",
                  isSelected
                    ? "border-[#059669] bg-emerald-50"
                    : "border-slate-200 bg-white hover:border-[#059669] hover:bg-emerald-50/40"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex flex-col gap-1">
                    <span className={cn(
                      "font-semibold text-sm",
                      isSelected ? "text-[#059669]" : "text-[#0F172A]"
                    )}>
                      {program.name}
                    </span>
                    {program.price_per_year && (
                      <span className="text-xs text-slate-500">
                        ${program.price_per_year}/year
                      </span>
                    )}
                  </div>
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
      </CardContent>
    </Card>
  );
}

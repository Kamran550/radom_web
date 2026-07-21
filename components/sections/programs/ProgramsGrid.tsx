"use client";

import React, { useState, useMemo } from "react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, GraduationCap, Clock, ArrowRight } from "lucide-react";
import { programs, categories, Program } from "@/constants/programs";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export default function ProgramsGrid() {
  const t = useTranslations("programs.grid");
  const tCategories = useTranslations("programs.categories");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      const matchesCategory =
        selectedCategory === "all" || program.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.degree.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters row */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-10 pb-8 border-b border-slate-200">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md border transition-colors",
                  selectedCategory === category.id
                    ? "bg-[#059669] text-white border-[#059669]"
                    : "text-slate-600 border-slate-300 hover:border-[#059669] hover:text-[#059669] bg-white"
                )}
              >
                {tCategories(category.id)}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 border-slate-300 focus:border-[#059669] focus:ring-[#059669] text-sm"
            />
          </div>
        </div>

        {/* Results count */}
        {filteredPrograms.length > 0 && (
          <p className="text-sm text-slate-500 mb-6">
            {t("found")} <span className="font-semibold text-[#0F172A]">{filteredPrograms.length}</span>{" "}
            {filteredPrograms.length === 1 ? t("programs") : t("programsPlural")}
          </p>
        )}

        {/* Programs grid */}
        {filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPrograms.map((program, index) => (
              <ProgramCard key={program.id} program={program} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-slate-500 mb-4">{t("noResults")}</p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="border-[#059669] text-[#059669] hover:bg-[#059669] hover:text-white"
            >
              {t("clearFilters")}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

function ProgramCard({ program, index }: { program: Program; index: number }) {
  const t = useTranslations("programs.grid");

  const categoryBadgeClass: Record<string, string> = {
    undergraduate: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    graduate: "bg-blue-50 text-blue-700 border border-blue-200",
    doctoral: "bg-purple-50 text-purple-700 border border-purple-200",
    online: "bg-amber-50 text-amber-700 border border-amber-200",
    professional: "bg-slate-50 text-slate-700 border border-slate-200",
  };

  return (
    <div className={cn(
      "border rounded-xl overflow-hidden card-hover bg-white",
      program.featured ? "border-[#059669]" : "border-slate-200"
    )}>
      {/* Featured banner */}
      {program.featured && (
        <div className="bg-[#059669] text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 text-center">
          {t("featuredProgram")}
        </div>
      )}

      <div className="p-6">
        {/* Degree badge + icon */}
        <div className="flex items-start justify-between mb-4">
          <span className={cn(
            "text-xs font-semibold px-3 py-1 rounded-full",
            categoryBadgeClass[program.category] || "bg-slate-50 text-slate-600"
          )}>
            {program.degree}
          </span>
          {program.featured && (
            <GraduationCap className="w-5 h-5 text-[#059669]" />
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-[#0F172A] mb-2 hover:text-[#059669] transition-colors">
          {program.title}
        </h3>

        {/* Duration */}
        <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-3">
          <Clock className="w-4 h-4" />
          <span>{program.duration}</span>
        </div>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed mb-5">
          {program.description}
        </p>

        {/* Divider */}
        <div className="border-t border-slate-100 pt-4 mb-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
            {t("keyFeatures")}
          </h4>
          <ul className="space-y-1">
            {program.features.slice(0, 3).map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-[#059669] mt-1.5 shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Career tags */}
        <div className="mb-5">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
            {t("careerPaths")}
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {program.career.slice(0, 2).map((career, idx) => (
              <span
                key={idx}
                className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full"
              >
                {career}
              </span>
            ))}
            {program.career.length > 2 && (
              <span className="text-xs text-slate-400">
                +{program.career.length - 2} {t("more")}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link
            href={`/programs/${program.id}`}
            className="flex-1 btn-outline text-sm py-2 px-4 justify-center"
          >
            {t("learnMore")}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/apply"
            className="btn-primary text-sm py-2 px-4"
          >
            {t("apply")}
          </Link>
        </div>
      </div>
    </div>
  );
}

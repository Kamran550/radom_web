"use client";

import React, { useState, useMemo } from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  User,
  Clock,
  ArrowRight,
  Search,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { news, newsCategories, NewsItem } from "@/constants/news";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 6;

export default function NewsGrid() {
  const t = useTranslations("news.grid");
  const tCategories = useTranslations("news.categories");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags?.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedNews = filteredNews.slice(startIndex, endIndex);

  const featuredNews = news.filter((item) => item.featured).slice(0, 2);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Featured Section */}
        {featuredNews.length > 0 &&
          selectedCategory === "all" &&
          currentPage === 1 && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <span className="inline-block w-8 h-px bg-[#059669]" />
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#059669] flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 fill-[#059669]" />
                  {t("featuredNews")}
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                {featuredNews.map((item, index) => (
                  <FeaturedNewsCard key={item.id} item={item} index={index} />
                ))}
              </div>
              <div className="mt-12 border-t border-slate-200" />
            </div>
          )}

        {/* Filters Row */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-10 pb-8 border-b border-slate-200">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {newsCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md border",
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

        {/* Results Count */}
        {filteredNews.length > 0 && (
          <p className="text-sm text-slate-500 mb-6">
            {t("found")} <span className="font-semibold text-[#0F172A]">{filteredNews.length}</span>{" "}
            {filteredNews.length === 1 ? t("article") : t("articles")}
          </p>
        )}

        {/* News Grid */}
        {paginatedNews.length > 0 ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
              {paginatedNews.map((item, index) => (
                <NewsCard key={item.id} item={item} index={index} />
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
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

function FeaturedNewsCard({ item }: { item: NewsItem; index: number }) {
  const t = useTranslations("news.grid");

  return (
    <Link href={`/news/${item.slug}`} className="group block">
      <div className="border border-[#059669] rounded-xl overflow-hidden bg-white card-hover h-full flex flex-col">
        {/* Featured banner */}
        <div className="bg-[#059669] text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 text-center flex items-center justify-center gap-1.5">
          <Star className="w-3 h-3 fill-white" />
          {t("featured")}
        </div>

        {item.image && (
          <div className="relative w-full h-52 overflow-hidden shrink-0">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="p-6 flex flex-col flex-1">
          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-slate-500 mb-3 flex-wrap">
            <span className="uppercase font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[11px]">
              {item.category}
            </span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(item.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            {item.readTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {item.readTime} {t("min")}
              </div>
            )}
          </div>

          <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#059669] mb-2 line-clamp-2">
            {item.title}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-5 line-clamp-3 flex-1">
            {item.excerpt}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <User className="w-3.5 h-3.5" />
              <span>{item.author}</span>
            </div>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-[#059669]">
              {t("readMore")}
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function NewsCard({ item }: { item: NewsItem; index: number }) {
  const t = useTranslations("news.grid");

  return (
    <Link href={`/news/${item.slug}`} className="group block">
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white card-hover h-full flex flex-col">
        {item.image && (
          <div className="relative w-full h-44 overflow-hidden shrink-0">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
            />
            {item.featured && (
              <div className="absolute top-3 left-3">
                <span className="bg-[#059669] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-2.5 h-2.5 fill-white" />
                  {t("featured")}
                </span>
              </div>
            )}
          </div>
        )}

        <div className="p-5 flex flex-col flex-1">
          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-slate-500 mb-2.5 flex-wrap">
            <span className="uppercase font-semibold px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[11px]">
              {item.category}
            </span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(item.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>

          <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#059669] mb-2 line-clamp-2 flex-1">
            {item.title}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">
            {item.excerpt}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <User className="w-3 h-3" />
              <span>{item.author}</span>
            </div>
            {item.readTime && (
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Clock className="w-3 h-3" />
                <span>{item.readTime} {t("min")}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 flex items-center justify-center rounded-md border border-slate-300 text-slate-600 hover:border-[#059669] hover:text-[#059669] disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {getPageNumbers().map((page, index) => (
        <React.Fragment key={index}>
          {page === "..." ? (
            <span className="px-2 text-slate-400 text-sm">...</span>
          ) : (
            <button
              onClick={() => onPageChange(page as number)}
              className={cn(
                "w-9 h-9 flex items-center justify-center rounded-md text-sm font-medium border",
                currentPage === page
                  ? "bg-[#059669] text-white border-[#059669]"
                  : "border-slate-300 text-slate-600 hover:border-[#059669] hover:text-[#059669]"
              )}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 flex items-center justify-center rounded-md border border-slate-300 text-slate-600 hover:border-[#059669] hover:text-[#059669] disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

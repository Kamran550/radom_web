"use client";

import React, { useState, useRef, useEffect, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronDown, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const locales = [
  { code: "en", label: "EN" },
  { code: "tr", label: "TR" },
  { code: "ru", label: "RU" },
] as const;

const TOP_BAR_PHONE = "+32 483 38 31 70";
const TOP_BAR_EMAIL = "international@radomuniversity.pl";

export function NavbarDemo() {
  return <Navbar />;
}

function Navbar() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const tCategories = useTranslations("programs.categories");
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);

  const aboutDropdownRef = useRef<HTMLDivElement>(null);
  const programsDropdownRef = useRef<HTMLDivElement>(null);

  const leftLinks = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/fees`, label: t("fees") },
  ];

  const rightLinks = [
    { href: `/${locale}/news`, label: t("news") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  const aboutDropdownItems = [
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/about/rectorate`, label: t("rectorate") },
    {
      href: `/${locale}/about/administrative-units`,
      label: t("administrativeUnits"),
    },
  ];

  const programsDropdownItems = [
    { href: `/${locale}/programs`, label: tCategories("all") },
    { href: `/${locale}/programs`, label: tCategories("undergraduate") },
    { href: `/${locale}/programs`, label: tCategories("graduate") },
    { href: `/${locale}/programs`, label: tCategories("doctoral") },
  ];

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale === locale) return;
    startTransition(() => {
      const segments = pathname.split("/");
      const pathWithoutLocale = segments.slice(2).join("/") || "";
      router.push(
        `/${newLocale}${pathWithoutLocale ? `/${pathWithoutLocale}` : ""}`
      );
      router.refresh();
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        aboutDropdownRef.current &&
        !aboutDropdownRef.current.contains(event.target as Node)
      ) {
        setAboutDropdownOpen(false);
      }
      if (
        programsDropdownRef.current &&
        !programsDropdownRef.current.contains(event.target as Node)
      ) {
        setProgramsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinkClass =
    "inline-flex items-center gap-1 px-3 py-2 text-[16px] font-semibold uppercase tracking-[0.14em] text-[#0F172A] hover:text-[#9B1C1C] transition-colors";

  const dropdownPanelClass =
    "absolute top-full left-0 mt-0 w-56 bg-white border border-[#0F172A]/10 border-t-[#9B1C1C] border-t-2 shadow-lg z-50 py-2";

  const dropdownItemClass =
    "block px-4 py-2.5 text-[12px] font-medium uppercase tracking-[0.08em] text-[#0F172A] hover:bg-slate-50 hover:text-[#9B1C1C] transition-colors";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Top information bar */}
        <div className="bg-[#0F172A] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-9 gap-4">
              <div className="flex items-center gap-3 sm:gap-5 min-w-0 text-[11px] sm:text-xs tracking-wide font-mono">
                <span className="truncate text-white/95">
                  {t("admissionsOpen")}
                </span>
                <a
                  href={`tel:${TOP_BAR_PHONE.replace(/\s/g, "")}`}
                  className="hidden md:inline hover:text-white/80 transition-colors shrink-0"
                >
                  {TOP_BAR_PHONE}
                </a>
                <a
                  href={`mailto:${TOP_BAR_EMAIL}`}
                  className="hidden lg:inline hover:text-white/80 transition-colors shrink-0"
                >
                  {TOP_BAR_EMAIL}
                </a>
              </div>

              <div
                className="flex items-center gap-0.5 shrink-0"
                role="group"
                aria-label="Language"
              >
                {locales.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    disabled={isPending}
                    onClick={() => handleLocaleChange(lang.code)}
                    className={cn(
                      "px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider transition-colors",
                      locale === lang.code
                        ? "bg-white/15 text-white"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main navigation bar */}
        <div className="bg-white border-b-2 border-[#0F172A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex items-center h-[96px] lg:h-[120px] w-full">
              {/* Desktop navigation */}
              <div className="hidden lg:flex items-center w-full">
                {/* Left links — aligned toward logo */}
                <div className="flex flex-1 items-center justify-end gap-2 pe-14 xl:pe-20 min-w-0">
                  <div
                    ref={aboutDropdownRef}
                    className="relative"
                    onMouseEnter={() => setAboutDropdownOpen(true)}
                    onMouseLeave={() => setAboutDropdownOpen(false)}
                  >
                    <button
                      type="button"
                      className={cn(
                        navLinkClass,
                        aboutDropdownOpen && "text-[#9B1C1C]"
                      )}
                      aria-expanded={aboutDropdownOpen}
                    >
                      {t("about")}
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform",
                          aboutDropdownOpen && "rotate-180"
                        )}
                      />
                    </button>
                    {aboutDropdownOpen && (
                      <div className={dropdownPanelClass}>
                        {aboutDropdownItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={dropdownItemClass}
                            onClick={() => setAboutDropdownOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {leftLinks.map((link) => (
                    <Link key={link.href} href={link.href} className={navLinkClass}>
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Center logo */}
                <Link
                  href={`/${locale}`}
                  className="flex items-center shrink-0 mx-2"
                >
                  <Image
                    src="/images/RADOM-logo-dark.png"
                    alt="Radom International University"
                    width={280}
                    height={104}
                    className="object-contain h-20 lg:h-24 w-auto"
                    priority
                  />
                </Link>

                {/* Right links + Apply */}
                <div className="flex flex-1 items-center min-w-0 ps-14 xl:ps-20">
                  <div className="flex items-center gap-2">
                    <div
                      ref={programsDropdownRef}
                      className="relative"
                      onMouseEnter={() => setProgramsDropdownOpen(true)}
                      onMouseLeave={() => setProgramsDropdownOpen(false)}
                    >
                      <button
                        type="button"
                        className={cn(
                          navLinkClass,
                          programsDropdownOpen && "text-[#9B1C1C]"
                        )}
                        aria-expanded={programsDropdownOpen}
                      >
                        {t("programs")}
                        <ChevronDown
                          className={cn(
                            "h-3.5 w-3.5 transition-transform",
                            programsDropdownOpen && "rotate-180"
                          )}
                        />
                      </button>
                      {programsDropdownOpen && (
                        <div className={dropdownPanelClass}>
                          {programsDropdownItems.map((item) => (
                            <Link
                              key={`${item.href}-${item.label}`}
                              href={item.href}
                              className={dropdownItemClass}
                              onClick={() => setProgramsDropdownOpen(false)}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                    {rightLinks.map((link) => (
                      <Link key={link.href} href={link.href} className={navLinkClass}>
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  <Link
                    href={`/${locale}/apply`}
                    className="inline-flex items-center justify-center bg-[#0F172A] text-white text-[12px] font-semibold uppercase tracking-[0.16em] px-5 py-2.5 ml-auto ms-14 xl:ms-20 shrink-0 hover:bg-[#9B1C1C] transition-colors"
                  >
                    {t("apply")}
                  </Link>
                </div>
              </div>

              {/* Mobile center logo */}
              <Link
                href={`/${locale}`}
                className="lg:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center shrink-0 z-10"
              >
                <Image
                  src="/images/RADOM-logo-dark.png"
                  alt="Radom International University"
                  width={280}
                  height={104}
                  className="object-contain h-20 w-auto"
                  priority
                />
              </Link>

              {/* Mobile controls */}
              <div className="lg:hidden flex items-center justify-between w-full">
                <div className="w-10" />
                <button
                  type="button"
                  aria-label="Toggle menu"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="w-10 h-10 flex items-center justify-center text-[#0F172A] hover:bg-slate-100 transition-colors"
                >
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-[#0F172A]/50"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="absolute top-[9.75rem] right-0 bottom-0 w-[min(100%,340px)] bg-white shadow-2xl flex flex-col border-l-2 border-[#0F172A]">
            <nav className="flex-1 overflow-y-auto py-4 px-3">
              <div>
                <button
                  type="button"
                  onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0F172A] hover:text-[#9B1C1C]"
                >
                  <span>{t("about")}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      mobileAboutOpen && "rotate-180"
                    )}
                  />
                </button>
                {mobileAboutOpen && (
                  <div className="ml-3 border-l-2 border-[#9B1C1C]/40 pl-2 space-y-0.5 mb-2">
                    {aboutDropdownItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2.5 text-[12px] font-medium uppercase tracking-[0.08em] text-slate-600 hover:text-[#9B1C1C]"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {[...leftLinks].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0F172A] hover:text-[#9B1C1C]"
                >
                  {link.label}
                </Link>
              ))}

              <div>
                <button
                  type="button"
                  onClick={() => setMobileProgramsOpen(!mobileProgramsOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0F172A] hover:text-[#9B1C1C]"
                >
                  <span>{t("programs")}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      mobileProgramsOpen && "rotate-180"
                    )}
                  />
                </button>
                {mobileProgramsOpen && (
                  <div className="ml-3 border-l-2 border-[#9B1C1C]/40 pl-2 space-y-0.5 mb-2">
                    {programsDropdownItems.map((item) => (
                      <Link
                        key={`${item.href}-${item.label}`}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2.5 text-[12px] font-medium uppercase tracking-[0.08em] text-slate-600 hover:text-[#9B1C1C]"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {rightLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0F172A] hover:text-[#9B1C1C]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="px-5 py-5 border-t border-slate-200 space-y-4">
              <div className="flex items-center justify-center gap-1">
                {locales.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    disabled={isPending}
                    onClick={() => handleLocaleChange(lang.code)}
                    className={cn(
                      "px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors",
                      locale === lang.code
                        ? "bg-[#0F172A] text-white"
                        : "text-[#0F172A]/60 hover:text-[#0F172A] hover:bg-slate-100"
                    )}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
              <Link
                href={`/${locale}/apply`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center bg-[#0F172A] text-white text-[13px] font-semibold uppercase tracking-[0.16em] py-3 hover:bg-[#9B1C1C] transition-colors"
              >
                {t("apply")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

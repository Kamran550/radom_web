"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import "./footer.css";

const contactInfo = {
  phones: ["+32 483 38 31 70", "+90 505 621 26 26"],
  emails: ["info@radomuniversity.pl", "international@radomuniversity.pl"],
  address: ["Jurija Gagarina 12, 11070, Beograd", "Radom, Poland"],
};

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/radom",
    icon: Facebook,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/radom",
    icon: Instagram,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/school/radom",
    icon: Linkedin,
  },
] as const;

const indexLinks = [
  { href: "/about", key: "about", tagKey: "about" },
  { href: "/programs", key: "programs", tagKey: "programs" },
  { href: "/fees", key: "fees", tagKey: "fees" },
  { href: "/contact", key: "contact", tagKey: "contact" },
  { href: "/apply", key: "apply", tagKey: "apply" },
  { href: "/e-library", key: "eLibrary", tagKey: "eLibrary" },
] as const;

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 17L17 7M17 7H9M17 7V15"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Footer() {
  const t = useTranslations("footer");
  const tLinks = useTranslations("footer.links");
  const tTags = useTranslations("footer.indexTags");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="riu-index-footer">
      <div className="riu-footer-watermark" aria-hidden="true">
        RJ
      </div>

      <div className="riu-footer-inner">
        {/* Top intro row */}
        <div className="riu-footer-intro">
          <div className="riu-footer-intro__left">
            <span className="riu-footer-eyebrow">{t("eyebrow")}</span>
            <h2 className="riu-footer-headline">{t("headline")}</h2>
          </div>
          <Link href="/apply" className="riu-footer-apply-link">
            {t("applyNow")}
            <ArrowIcon />
          </Link>
        </div>

        {/* Giant index list */}
        <nav aria-label={t("quickLinks")}>
          <ul className="riu-footer-index">
            {indexLinks.map((item, index) => (
              <li key={item.href} className="riu-footer-index__item">
                <Link href={item.href} className="riu-footer-index__link">
                  <span className="riu-footer-index__word">
                    {tLinks(item.key)}
                  </span>
                  <span className="riu-footer-index__meta">
                    <span className="riu-footer-index__tag">
                      {tTags(item.tagKey)}
                    </span>
                    <span className="riu-footer-index__num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="riu-footer-index__arrow" aria-hidden="true">
                      <ArrowIcon />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom info strip */}
        <div className="riu-footer-info">
          <div className="riu-footer-brand">
            <Link href="/" className="riu-footer-brand__lockup">
              <span className="riu-footer-brand__monogram">
                <span className="riu-mono-r">R</span>
                <span className="riu-mono-j">J</span>
              </span>
              <span className="riu-footer-brand__name">{t("brandName")}</span>
            </Link>
            <p className="riu-footer-brand__desc">{t("description")}</p>
            <div className="riu-footer-social">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="riu-footer-social__link"
                    aria-label={t(`social.${social.name.toLowerCase()}`)}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="riu-footer-col">
            <span className="riu-footer-col__heading">{t("phone")}</span>
            <ul className="riu-footer-col__lines">
              {contactInfo.phones.map((phone) => (
                <li key={phone}>
                  <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="riu-footer-col">
            <span className="riu-footer-col__heading">{t("email")}</span>
            <ul className="riu-footer-col__lines">
              {contactInfo.emails.map((email) => (
                <li key={email}>
                  <a href={`mailto:${email}`}>{email}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="riu-footer-col">
            <span className="riu-footer-col__heading">{t("address")}</span>
            <ul className="riu-footer-col__lines">
              {contactInfo.address.map((line) => (
                <li key={line} className="riu-muted">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal row */}
        <div className="riu-footer-legal">
          <p className="riu-footer-legal__copy">
            {t("copyright", { year: currentYear })}
          </p>
          <div className="riu-footer-legal__links">
            <Link href="/privacy">{t("privacyPolicy")}</Link>
            <Link href="/terms">{t("termsOfService")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

"use client";

import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

const contactInfo = {
  phone: {
    primary: "+32 483 38 31 70",
    secondary: "+90 505 621 26 26",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM",
  },
  email: {
    primary: "info@radomuniversity.pl",
    admissions: "international@radomuniversity.pl",
    support: "rectorate@radomuniversity.pl",
  },
  address: {
    city: "Jurija Gagarina 12, 11070, Beograd, Radom",
    country: "Radom",
  },
  hours: {
    weekdays: "Monday - Friday: 9:00 AM - 6:00 PM",
    saturday: "Saturday: Closed",
    sunday: "Sunday: Closed",
  },
};

const cards = [
  {
    icon: Phone,
    labelKey: "phone" as const,
    content: (
      <div className="space-y-1.5">
        <a
          href={`tel:${contactInfo.phone.primary.replace(/\s/g, "")}`}
          className="block text-[#059669] font-semibold hover:text-[#047857] transition-colors"
        >
          {contactInfo.phone.primary}
        </a>
        <a
          href={`tel:${contactInfo.phone.secondary.replace(/\s/g, "")}`}
          className="block text-slate-600 text-sm hover:text-[#059669] transition-colors"
        >
          {contactInfo.phone.secondary}
        </a>
        <p className="text-xs text-slate-400 pt-1">{contactInfo.phone.hours}</p>
      </div>
    ),
  },
  {
    icon: Mail,
    labelKey: "email" as const,
    content: (
      <div className="space-y-2">
        <a
          href={`mailto:${contactInfo.email.primary}`}
          className="block text-[#059669] font-semibold hover:text-[#047857] transition-colors text-sm break-all"
        >
          {contactInfo.email.primary}
        </a>
        <a
          href={`mailto:${contactInfo.email.admissions}`}
          className="block text-slate-600 text-xs hover:text-[#059669] transition-colors break-all"
        >
          {contactInfo.email.admissions}
        </a>
        <a
          href={`mailto:${contactInfo.email.support}`}
          className="block text-slate-600 text-xs hover:text-[#059669] transition-colors break-all"
        >
          {contactInfo.email.support}
        </a>
      </div>
    ),
  },
  {
    icon: MapPin,
    labelKey: "address" as const,
    content: (
      <div className="text-slate-600 text-sm space-y-1">
        <p>{contactInfo.address.city}</p>
        <p className="font-semibold text-[#0F172A]">{contactInfo.address.country}</p>
      </div>
    ),
  },
];

export default function ContactInfo() {
  const t = useTranslations("contact.info");

  return (
    <section className="section-padding bg-[#F8F7F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="section-label">{t("subtitle")}</span>
          <h2 className="heading-xl">{t("title")}</h2>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {cards.map(({ icon: Icon, labelKey, content }) => (
            <div
              key={labelKey}
              className="bg-white rounded-xl border border-slate-200 p-6 card-hover"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-[#059669]" />
              </div>
              <h3 className="font-bold text-[#0F172A] mb-3">{t(labelKey)}</h3>
              {content}
            </div>
          ))}
        </div>

        {/* Office hours strip */}
        <div className="bg-[#0F172A] text-white rounded-xl p-6 flex flex-col md:flex-row items-center gap-4">
          <Clock className="w-6 h-6 text-[#10B981] shrink-0" />
          <div>
            <h3 className="font-bold mb-1">{t("officeHours")}</h3>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-400">
              <span>{contactInfo.hours.weekdays}</span>
              <span>{contactInfo.hours.saturday}</span>
              <span>{contactInfo.hours.sunday}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

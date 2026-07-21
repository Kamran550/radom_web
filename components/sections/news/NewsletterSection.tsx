"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function NewsletterSection() {
  const t = useTranslations("news.newsletter");
  const [email, setEmail] = useState<string>("");
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log("Newsletter subscription:", email);
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <section className="bg-[#0F172A] py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#059669]/20 border border-[#059669]/30 mb-6">
          <Mail className="w-6 h-6 text-[#059669]" />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          {t("title")}
        </h2>
        <p className="text-slate-400 mb-8 max-w-lg mx-auto">
          {t("description")}
        </p>

        {isSubscribed ? (
          <div className="bg-[#059669]/10 border border-[#059669]/30 rounded-xl p-6 flex flex-col items-center gap-3">
            <CheckCircle className="w-10 h-10 text-[#059669]" />
            <p className="text-white font-semibold">{t("thankYou")}</p>
            <p className="text-sm text-slate-400">{t("successMessage")}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder={t("emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-[#1E293B] border-slate-700 text-white placeholder:text-slate-500 focus:border-[#059669] focus:ring-[#059669]"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              {t("subscribe")}
            </button>
          </form>
        )}

        <p className="text-xs text-slate-600 mt-5">{t("privacy")}</p>
      </div>
    </section>
  );
}

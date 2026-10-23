import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "tr", "ru"],

  // Used when no locale matches
  defaultLocale: "en",

  // hreflang HTML <head>-də hər səhifənin metadata-sı ilə verilir (lib/seo.ts);
  // middleware-in Link header-i prefikssiz x-default URL-i göstərirdi
  alternateLinks: false,
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

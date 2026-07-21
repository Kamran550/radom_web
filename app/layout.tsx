import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "600", "700"],
  style: ["normal", "italic"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["500"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  // Əsas məlumatlar
  title: {
    default:
      "RIU - Radom İnternational University | Study in Radom",
    template: "%s | RIU - Radom İnternational University",
  },
  description:
    "RIU - Radom İnternational University. International education in Radom with bachelor's, master's and PhD programs. Quality education through science and management.",

  // Açar sözlər
  keywords: [
    "RIU",
    "radom",
    "radomuniversity.pl",
    "Radom İnternational University",
    "Radom university",
    "Radom university",
    "international university Radom",
    "international university",
    "science and management university",
    "study in Radom",
    "education in Radom",
    "PhD Radom",
    "PhD in Radom",
    "bachelor degree Radom",
    "bachelor programs in Radom",
    "master degree Radom",
    "master programs in Radom",
    "doctoral programs in Radom",
    "Belgrade university",
    "Radom university",
    "Radom education",
  ],

  // Müəllif və yaradıcı
  authors: [
    {
      name: "Radom İnternational University",
      url: "https://radomuniversity.pl",
    },
  ],
  creator: "Radom İnternational University",
  publisher: "Radom İnternational University",

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Canonical URL
  metadataBase: new URL("https://radomuniversity.pl"),
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      ru: "/ru",
      tr: "/tr",
    },
  },

  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ru_RU", "tr_TR"],
    url: "https://radomuniversity.pl",
    siteName: "Radom İnternational University",
    title: "Radom İnternational University | Study in Radom",
    description:
      "Radom İnternational University. International education in Radom with bachelor's, master's and PhD programs. Quality education through science and management.",
    images: [
      {
        url: "/images/RADOM-logo-dark.png",
        width: 1200,
        height: 630,
        alt: "Radom İnternational University Logo",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Radom İnternational University",
    description:
      "Radom İnternational University. International education in Radom with bachelor's, master's and PhD programs.",
    images: ["/images/RADOM-logo-dark.png"],
    creator: "@radom_edu",
    site: "@radom_edu",
  },

  // Verification - Domain ilə verification edilib, kod lazım deyil

  // Category
  category: "education",

  // Icons / Favicon
  icons: {
    icon: [
      { url: "/images/RADOM-logo-dark.png", sizes: "any", type: "image/png" },
      { url: "/images/RADOM-logo-dark.png", sizes: "32x32", type: "image/png" },
      { url: "/images/RADOM-logo-dark.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      {
        url: "/images/RADOM-logo-dark.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: "/images/RADOM-logo-dark.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${ibmPlexMono.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

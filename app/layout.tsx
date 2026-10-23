import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces, IBM_Plex_Mono, Inter } from "next/font/google";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
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
  // Əsas məlumatlar (canonical və hreflang hər səhifədə ayrıca təyin olunur)
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Radom International University (RIU) | Study in Radom, Poland",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Official website of Radom International University (RIU) in Radom, Poland: bachelor's, master's and PhD programs in engineering, IT, aviation, law, business and health.",
  applicationName: SITE_NAME,

  // Müəllif və yaradıcı
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

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

  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    images: [
      {
        url: "/images/RADOM-logo-dark.png",
        width: 1024,
        height: 1024,
        alt: SITE_NAME,
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    images: ["/images/RADOM-logo-dark.png"],
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

import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, DM_Sans } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import FloatingChat from "./components/FloatingChat";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import ClickToSource from "./components/ClickToSource";
import UrlTracker from "./components/UrlTracker";
import CommentOverlay from "./components/comments/CommentOverlay";
import { PostHogProvider } from "./components/PostHogProvider";
import Analytic from "./components/Analytic";
import BootLoadTracker from "./components/BootLoadTracker";
import { PROFESSIONAL_NAME, PROFESSIONAL_TAGLINE, PROFESSIONAL_IMAGES } from "../professionalConstants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wavecrestlegacy.com"),
  title: {
    default: `${PROFESSIONAL_NAME} | Real Estate, Acquisitions & Legacy Planning`,
    template: `%s | ${PROFESSIONAL_NAME}`,
  },
  description: PROFESSIONAL_TAGLINE,
  keywords: [
    "real estate acquisitions",
    "owner financing",
    "rent to own",
    "lease option homes",
    "real estate holding company",
    "legacy planning",
    "Houston real estate",
    PROFESSIONAL_NAME.toLowerCase(),
  ],
  authors: [{ name: PROFESSIONAL_NAME }],
  openGraph: {
    title: `${PROFESSIONAL_NAME} | Real Estate, Acquisitions & Legacy Planning`,
    description: PROFESSIONAL_TAGLINE,
    type: "website",
    siteName: PROFESSIONAL_NAME,
    images: [
      {
        url: PROFESSIONAL_IMAGES[1]?.url || PROFESSIONAL_IMAGES[0]?.url,
        width: 1200,
        height: 630,
        alt: PROFESSIONAL_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PROFESSIONAL_NAME} | Real Estate, Acquisitions & Legacy Planning`,
    description: PROFESSIONAL_TAGLINE,
    images: [PROFESSIONAL_IMAGES[1]?.url || PROFESSIONAL_IMAGES[0]?.url],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${dmSans.variable} antialiased`}
      >
        <PostHogProvider>
          <Analytic />
          <BootLoadTracker />
          <Suspense fallback={null}>
            <UrlTracker />
          </Suspense>
          <ClickToSource debug_mode={process.env.CLICK_TO_SOURCE_DEBUG || 'false'} />
          <Navigation />
          <main>{children}</main>
          <Footer />
          <FloatingChat />
          <CommentOverlay />
        </PostHogProvider>
      </body>
    </html>
  );
}

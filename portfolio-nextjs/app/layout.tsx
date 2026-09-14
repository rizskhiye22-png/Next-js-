import type { Metadata, Viewport } from "next";
import { Baloo_2, Inter, Zen_Maru_Gothic } from "next/font/google";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import "./globals.css";

export const runtime = "edge";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-baloo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const zenMaru = Zen_Maru_Gothic({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-zenmaru",
  display: "swap",
});

const SITE_URL = "https://YOUR-DOMAIN-HERE.pages.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Maul — Japanese Literature × Caregiving × Web Development",
  description:
    "Portfolio Maul (Irfan Faiz Maulana) — Sastra Jepang, pengalaman kerja kaigo di Jepang, web development, dan JLPT learning tools untuk pelajar Indonesia.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Maul — Japanese Literature × Caregiving × Web Development",
    description:
      "Portfolio Maul — Sastra Jepang, pengalaman kerja kaigo di Jepang, web development, dan JLPT learning tools untuk pelajar Indonesia.",
    url: SITE_URL,
    images: [{ url: "/assets/images/og-image.jpg" }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.svg", apple: "/assets/images/apple-touch-icon.png" },
};

export const viewport: Viewport = {
  themeColor: "#5B9BD8",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Irfan Faiz Maulana",
  alternateName: "Maul",
  url: SITE_URL,
  jobTitle: "Care Worker & Web Developer",
  knowsLanguage: ["id", "ja"],
  sameAs: ["https://tiktok.com/@themars227", "https://instagram.com/i_fzml"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${baloo.variable} ${inter.variable} ${zenMaru.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}

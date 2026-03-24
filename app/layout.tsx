import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Fauzan Taslim Hidayat | Portfolio",
  description:
    "Fauzan Taslim Hidayat | Portfolio",
  icons: {
    icon: "/logo-fauzan.svg",
    shortcut: "/logo-fauzan.svg",
    apple: "/logo-fauzan.svg",
  },
  keywords: [
    "Software Quality Engineer",
    "QA",
    "Test Automation",
    "Fauzan Taslim Hidayat",
    "Portfolio",
    "Software Tester",
    "Jakarta",
  ],
  authors: [{ name: "Fauzan Taslim Hidayat" }],
  creator: "Fauzan Taslim Hidayat",
  openGraph: {
    title: "Fauzan Taslim Hidayat | Software Quality Engineer",
    description: "Portfolio of Fauzan Taslim Hidayat — Software Quality Engineer specializing in test automation, CI/CD, and quality assurance.",
    url: "https://fauzantaslim.my.id", // Recommend updating this to the actual domain
    siteName: "Fauzan Taslim Hidayat | Portfolio",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fauzan Taslim Hidayat | Software Quality Engineer",
    description: "Fauzan Taslim Hidayat | Portfolio",
    creator: "@yourtwitterhandle", // Update with actual or remove
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-black text-white">
        <Preloader />
        {children}
      </body>
    </html>
  );
}

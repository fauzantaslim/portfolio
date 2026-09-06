import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";
import { ThemeProvider } from "next-themes";

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
    "Fauzan Taslim Hidayat | Portfolio | Software Quality Engineer & Backend Developer based in Bogor, Indonesia. Specializing in test automation, QA strategy, REST API development, and CI/CD pipelines. Open to new opportunities.",
  icons: {
    icon: "/logo-fauzan.svg",
    shortcut: "/logo-fauzan.svg",
    apple: "/logo-fauzan.svg",
  },
  keywords: [
    "Software Quality Engineer",
    "QA Engineer",
    "Test Automation",
    "Backend Developer",
    "Fauzan Taslim Hidayat",
    "Portfolio",
    "Software Tester",
    "Jakarta",
    "Bogor",
    "REST API",
    "CI/CD",
  ],
  authors: [{ name: "Fauzan Taslim Hidayat" }],
  creator: "Fauzan Taslim Hidayat",
  alternates: {
    canonical: "https://fauzantaslim.my.id",
  },
  openGraph: {
    title: "Fauzan Taslim Hidayat | Software Quality Engineer & Backend Dev",
    description: "Portfolio of Fauzan Taslim Hidayat — SQE specializing in test automation, QA strategy, and REST API development. Based in Bogor, Indonesia.",
    url: "https://fauzantaslim.my.id",
    siteName: "Fauzan Taslim Hidayat | Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://fauzantaslim.my.id/ojan.png",
        width: 1200,
        height: 630,
        alt: "Fauzan Taslim Hidayat — Software Quality Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fauzan Taslim Hidayat | Software Quality Engineer",
    description: "SQE & Backend Developer portfolio — test automation, QA strategy, REST API. Based in Bogor, Indonesia.",
    images: ["https://fauzantaslim.my.id/ojan.png"],
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
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external icon CDN for faster StackSection loads */}
        <link rel="preconnect" href="https://cdn.simpleicons.org" />
        <link rel="dns-prefetch" href="https://cdn.simpleicons.org" />
      </head>
      <body className="min-h-screen bg-background text-foreground" suppressHydrationWarning>
        {/* Skip link for keyboard users (WCAG 2.4.1) */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <Preloader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

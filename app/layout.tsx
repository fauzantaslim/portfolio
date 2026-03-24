import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Preloader from "../components/Preloader";
import RetroNavbar from "../components/RetroNavbar";
import PageTransitionProvider from "../components/PageTransitionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fauza Retro Portfolio",
  description: "Retro themed multi-page portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <PageTransitionProvider>
          <Preloader />
          <RetroNavbar />
          <main className="mx-auto my-10 w-[min(1100px,92vw)] pb-12">{children}</main>
        </PageTransitionProvider>
      </body>
    </html>
  );
}

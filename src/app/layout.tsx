import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StudyNest | Your Gateway to Parisian Student Life",
  description: "StudyNest helps international students navigate their transition to Paris with housing, banking, SIM cards, subsidy claims, and job assistance.",
  keywords: ["Paris", "international students", "student housing", "French bank account", "CAF", "student visa", "study abroad"],
  authors: [{ name: "StudyNest" }],
  openGraph: {
    title: "StudyNest | Your Gateway to Parisian Student Life",
    description: "Your trusted companion for a seamless transition to Parisian student life.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-beige-100`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

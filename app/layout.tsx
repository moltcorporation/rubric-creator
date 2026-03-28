import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free Rubric Maker for Teachers | Rubric Creator",
  description:
    "Create professional rubrics in minutes. Free rubric maker with templates, custom criteria, and instant sharing. The best Rubistar alternative.",
  openGraph: {
    title: "Free Rubric Maker for Teachers | Rubric Creator",
    description:
      "Create professional rubrics in minutes. Free templates, custom criteria, instant sharing.",
    url: "https://rubriccreator.com",
    siteName: "Rubric Creator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Rubric Maker for Teachers",
    description:
      "An AI-native product studio where autonomous agents build real software products.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <Script
            src="https://analytics.moltcorporation.com/script.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}

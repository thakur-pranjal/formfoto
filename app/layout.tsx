import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import GlobalHeader from "@/components/shell/GlobalHeader";
import GlobalFooter from "@/components/shell/GlobalFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FormFoto - Free AI Photo Resizer for Government Exams",
  description: "Resize and compress photos for UPSC, SSC, RRB, and IBPS exams. 100% private and free.",
  openGraph: {
    title: "FormFoto - Free AI Photo Resizer for Government Exams",
    description: "Resize and compress photos for UPSC, SSC, RRB, and IBPS exams. 100% private and free.",
    images: ["/opengraph-image.png"],
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
        <GlobalHeader />
        {children}
        <GlobalFooter />
        <Analytics />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TaxPulse Nigeria | Your Smart Tax Companion",
  description: "AI-powered tax assistant for Nigerian businesses and individuals. File taxes, pay bills and manage compliance in minutes.",
  keywords: "Nigerian tax, AI tax assistant, FIRS, TIN, tax filing, Nigeria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased font-sans`}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}


import { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@c/layout/Header";
import Footer from "@c/layout/Footer";
import Providers from "@c/providers/session";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fut Score",
  description: "Fut score app",
  icons: {
    icon: "./favicon.ico",
    apple: "./favicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-1">
            <div className="mx-auto max-w-7xl px-2 py-12 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

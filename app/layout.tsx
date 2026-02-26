import type { Metadata } from "next";
import { ReactNode } from "react";
import Navbar from "@/components/custom/Navbar";
import Providers from "@/components/custom/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fut Score",
  description: "Fut score app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}

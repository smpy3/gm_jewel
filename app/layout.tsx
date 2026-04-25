// Root layout: applies global typography, background gradients, and app-wide providers.
import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/Providers";

const body = Manrope({ subsets: ["latin"], variable: "--font-body", weight: ["300", "400", "500", "600", "700"] });
const display = Playfair_Display({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "Ghanshyam Modi — Jewelry Showcase",
  description: "A premium, animation-forward jewelry showcase featuring video + photo galleries from the media collection."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} scroll-smooth`}>
      <body className="noise font-[var(--font-body)]">
        <div className="fixed inset-0 -z-10 bg-mesh-ink" />
        <div className="fixed inset-0 -z-10 bg-radial-fade" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

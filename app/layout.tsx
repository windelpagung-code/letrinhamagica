import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "LetrinhaMágica — Atividades Educativas para Crianças",
    template: "%s | LetrinhaMágica",
  },
  description:
    "Plataforma de atividades educativas para crianças de 3 a 7 anos. PDFs imprimíveis, worksheets interativos e gerador com IA.",
  keywords: ["atividades educativas", "crianças", "alfabetização", "educação infantil", "BNCC"],
  openGraph: {
    title: "LetrinhaMágica",
    description: "Atividades educativas para crianças de 3 a 7 anos",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${geist.variable} ${jakarta.variable} h-full`}>
      <body className="min-h-full bg-white antialiased">
        {children}
        <Toaster position="top-right" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

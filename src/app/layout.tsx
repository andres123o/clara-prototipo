import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import { Header } from "@/components/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

export const metadata: Metadata = {
  title: "Clara Colombia · propuesta de Andrés Cristancho",
  description: "Verificador de facturas DIAN y jugadas de growth para Clara en Colombia.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} ${dmSans.variable}`}>
      <body className="min-h-dvh">
        <Header />
        <main className="relative isolate px-4 pb-24 sm:px-8 lg:px-12">
          <div className="glow" aria-hidden />
          {children}
        </main>
      </body>
    </html>
  );
}

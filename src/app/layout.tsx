import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });


export const metadata: Metadata = {
  title: "Clara Colombia · propuesta de Andrés Cristancho",
  description: "Verificador de facturas DIAN y jugadas de growth para Clara en Colombia.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Cada gasto con su factura DIAN antes del cierre",
    description: "Prototipo y jugadas de growth para Clara en Colombia, por Andrés Cristancho.",
    locale: "es_CO",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="min-h-dvh">
        <Header />
        <main className="px-4 pb-24 sm:px-8 lg:px-12">
          {children}
        </main>
      </body>
    </html>
  );
}

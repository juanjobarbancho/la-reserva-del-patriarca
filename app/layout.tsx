import type { Metadata } from "next";
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
  title: "La Reserva del Patriarca | Viviendas en Córdoba",
  description: "Descubre tu nuevo hogar en La Reserva del Patriarca. 37 viviendas de calidad con 2-4 dormitorios, piscina, zonas verdes y jardines privativos en Córdoba.",
  keywords: "viviendas Córdoba, pisos en venta, La Reserva del Patriarca, inmobiliaria, promoción obra nueva, Ciudad Jardín",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

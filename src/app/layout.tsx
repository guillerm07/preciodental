import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "PrecioDental — Compara precios dentales en España",
    template: "%s | PrecioDental",
  },
  description:
    "Compara precios de tratamientos dentales en España. Datos reales de aseguradoras, cadenas y clínicas. Implantes, ortodoncia, blanqueamiento y más.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://preciodental.net"
  ),
  openGraph: {
    siteName: "PrecioDental",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

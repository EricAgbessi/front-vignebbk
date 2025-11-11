import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./Providers/providers";
import { cavas } from "./fonts/cavas";
import TanstackQueryProvider from "./Providers/TanstackQueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VIGNEBBK - Vins • Champagnes • Cognac",
  description:
    "Votre caviste en ligne - Découvrez notre sélection de vins, champagnes et cognacs",
  manifest: "/manifest.json",
  themeColor: "#810b15",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "VIGNEBBK",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${geistSans.variable} ${cavas.variable} ${geistMono.variable} antialiased`}
      >
        <TanstackQueryProvider>
          <ThemeProvider
            attribute="class" // Permet d'appliquer 'dark' ou 'light' à la balise <html>
            defaultTheme="system" // Thème par défaut basé sur le système de l'utilisateur
            enableSystem // Active la détection de la préférence système (préféré)
            disableTransitionOnChange // Ajout important
          >
            {children}
          </ThemeProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}

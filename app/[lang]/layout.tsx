import type { Metadata } from "next";
import { Montserrat, Oswald } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Glovance Trading | Connecting Qatar to the World",
  description: "Glovance Trading is an international company based in Qatar, specializing in the import and export of a wide range of products.",
};

import { getDictionary } from "@/dictionaries/get-dictionary";
import type { Locale } from "@/i18n-config";

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
      </head>
      <body
        className={`${montserrat.variable} ${oswald.variable} antialiased bg-background-light dark:bg-background-dark text-text-dark dark:text-text-light font-sans transition-colors duration-300 min-h-screen flex flex-col`}
      >
        <Navbar dict={dict.navbar} currentLang={lang} />
        <main className="flex-grow">
          {children}
        </main>
        <Footer dict={dict.footer} />
      </body>
    </html>
  );
}

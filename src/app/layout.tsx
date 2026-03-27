import type { Metadata } from "next";
import { Syne, IBM_Plex_Serif, JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ScrollTop } from "@/components/layout/ScrollTop";
import { getWebSiteJsonLd } from "@/lib/jsonld";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const ibmPlexSerif = IBM_Plex_Serif({
  variable: "--font-ibm-plex-serif",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mist3rth.github.io/Reflex.io"),
  title: {
    default: "Reflexe.io | Le journal des mécanismes d'influence",
    template: "%s | Reflexe.io",
  },
  description: "Décryptage des biais cognitifs et de leur exploitation par les industries du digital et les ingénieries d'influence.",
  keywords: ["biais cognitifs", "influence", "digital", "psychologie", "manipulation", "design persuasif", "dark patterns"],
  authors: [{ name: "Thierry Thiesson" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://mist3rth.github.io/Reflex.io",
    siteName: "Reflexe.io",
    title: "Reflexe.io | Le journal des mécanismes d'influence",
    description: "Décryptage des biais cognitifs et de leur exploitation par les industries du digital et les ingénieries d'influence.",
    images: [
      {
        url: "/images/og-image.webp", // Next.js metadataBase will prefix this with https://mist3rth.github.io/Reflex.io
        width: 1200,
        height: 630,
        alt: "Reflexe.io - Architecture des biais et du contrôle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reflexe.io | Thierry Thiesson",
    description: "Analyse des mécanismes de manipulation cognitive et des biais dans l'écosystème numérique.",
    images: ["/images/og-image.webp"],
  },
  icons: {
    icon: "/Reflex.io/icon.webp?v=2",
    shortcut: "/Reflex.io/icon.webp?v=2",
    apple: "/Reflex.io/icon.webp?v=2",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${syne.variable} ${ibmPlexSerif.variable} ${jetbrainsMono.variable}`}>
      <body className="flex flex-col min-h-screen">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-brand-bg-secondary focus:z-50 focus:outline-none focus:ring-2 focus:ring-brand-accent-red">
          Aller au contenu principal
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebSiteJsonLd()) }}
        />
        <Nav />
        <main id="main" className="flex-grow pt-20 md:pt-28">
          {children}
        </main>
        <Footer />
        <ScrollTop />
        <GoogleAnalytics gaId="G-WJQYNN90FP" />
      </body>
    </html>
  );
}

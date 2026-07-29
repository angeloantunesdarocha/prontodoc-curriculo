import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./voice-print-fixes.css";
import "./classic-resume.css";
import "./smart-resume.css";
import VoiceFieldEnhancer from "./VoiceFieldEnhancer";
import {
  AUTHOR_NAME,
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "./site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "Currículo Grátis pelo Celular — Crie e Baixe em PDF | ProntoDoc",
    template: "%s | ProntoDoc",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "criar currículo pelo celular",
    "currículo profissional",
    "currículo primeiro emprego",
    "currículo ATS",
    "simulador de entrevista",
    "entrevista de emprego por voz",
    "modelo de currículo",
  ],
  authors: [{ name: AUTHOR_NAME, url: absoluteUrl("/autor/angelo-antunes") }],
  creator: AUTHOR_NAME,
  publisher: SITE_NAME,
  category: "Emprego e carreira",
  alternates: {
    canonical: "/",
    languages: { "pt-BR": "/" },
    types: { "application/rss+xml": absoluteUrl("/feed.xml") },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: "Currículo Grátis pelo Celular — Crie e Baixe em PDF",
    description: SITE_DESCRIPTION,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "ProntoDoc — Currículo e entrevista pelo celular" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ProntoDoc — Currículo e entrevista pelo celular",
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: [
      "4qn2wjN3WFlEzJ6kWFpFTQb66V-cDMIYHSuZmb7fI60",
      "WMR9Cf62VXVgP476h_vRLPHrPuJMGJA0adWVdzjl4w4",
    ],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.webmanifest",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  email: SITE_EMAIL,
  logo: absoluteUrl("/favicon.svg"),
  founder: { "@id": `${SITE_URL}/#author` },
};

const authorJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#author`,
  name: AUTHOR_NAME,
  url: absoluteUrl("/autor/angelo-antunes"),
  email: SITE_EMAIL,
  jobTitle: "Criador do ProntoDoc",
  worksFor: { "@id": `${SITE_URL}/#organization` },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "pt-BR",
  description: SITE_DESCRIPTION,
  publisher: { "@id": `${SITE_URL}/#organization` },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software`,
  name: SITE_NAME,
  url: SITE_URL,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Currículo e preparação para entrevistas",
  operatingSystem: "Web",
  inLanguage: "pt-BR",
  description: SITE_DESCRIPTION,
  author: { "@id": `${SITE_URL}/#organization` },
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "0",
    highPrice: "29.90",
    priceCurrency: "BRL",
    offerCount: "6",
  },
};

const institutionalLinks = [
  ["Como funciona", "/como-funciona"],
  ["Guias", "/guias"],
  ["Currículo", "/guias/curriculo"],
  ["Entrevista", "/guias/entrevista"],
  ["Profissões", "/guias/profissoes"],
  ["Sobre", "/sobre"],
  ["Autor", "/autor/angelo-antunes"],
  ["Política editorial", "/politica-editorial"],
  ["Segurança", "/seguranca"],
  ["Privacidade", "/privacidade"],
  ["Termos", "/termos"],
  ["Contato", "/contato"],
  ["Parcerias", "/parcerias"],
] as const;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {[organizationJsonLd, authorJsonLd, websiteJsonLd, softwareJsonLd].map((data, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          />
        ))}
        <VoiceFieldEnhancer />
        {children}
        <footer
          aria-label="Informações e áreas do ProntoDoc"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.7rem 1.15rem",
            padding: "1.25rem 1rem",
            borderTop: "1px solid #dbe2ee",
            background: "#ffffff",
            fontSize: "0.88rem",
            lineHeight: 1.4,
          }}
        >
          {institutionalLinks.map(([label, href]) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
          <a href="/feed.xml" type="application/rss+xml">RSS</a>
        </footer>
      </body>
    </html>
  );
}

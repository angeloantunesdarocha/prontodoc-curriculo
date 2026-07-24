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
  metadataBase: new URL("https://prontodoc-curriculo.angeloantunesdarocha.chatgpt.site"),
  title: {
    default: "ProntoDoc — Currículo profissional pelo celular",
    template: "%s | ProntoDoc",
  },
  description:
    "Crie currículo profissional e treine entrevistas por voz no celular, com preparação adaptada à vaga e guias gratuitos para todo o Brasil.",
  alternates: { canonical: "/" },
  verification: {
    google: "4qn2wjN3WFlEzJ6kWFpFTQb66V-cDMIYHSuZmb7fI60",
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ProntoDoc",
              url: "https://prontodoc-curriculo.angeloantunesdarocha.chatgpt.site",
              email: "angeloantunesdarocha@gmail.com",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "ProntoDoc",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              inLanguage: "pt-BR",
              offers: { "@type": "AggregateOffer", lowPrice: "0", highPrice: "29.90", priceCurrency: "BRL" },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}

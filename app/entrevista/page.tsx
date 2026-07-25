import type { Metadata } from "next";
import InterviewSimulator from "./simulator";
import { AUTHOR_NAME, SITE_URL } from "../site";

export const metadata: Metadata = {
  title: "Simulador de entrevista de emprego por voz",
  description: "Treine entrevista de emprego pelo celular com perguntas para sua profissão, avaliação objetiva e relatório de preparação.",
  authors: [{ name: AUTHOR_NAME, url: `${SITE_URL}/autor/angelo-antunes` }],
  alternates: { canonical: "/entrevista" },
  openGraph: {
    title: "Simulador de entrevista de emprego por voz",
    description: "Responda três perguntas grátis, fale ou digite e receba orientações para melhorar a clareza.",
    url: `${SITE_URL}/entrevista`,
    type: "website",
    locale: "pt_BR",
    images: ["/opengraph-image"],
  },
};

const applicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Simulador de entrevista ProntoDoc",
  url: `${SITE_URL}/entrevista`,
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  inLanguage: "pt-BR",
  description: "Simulador de entrevista de emprego por voz ou texto, com três perguntas gratuitas e avaliação educativa.",
  author: { "@id": `${SITE_URL}/#organization` },
  offers: [
    { "@type": "Offer", price: "0", priceCurrency: "BRL", name: "Treino grátis" },
    { "@type": "Offer", price: "9.90", priceCurrency: "BRL", name: "Entrevista completa" },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "O ProntoDoc inventa uma resposta por mim?",
      acceptedAnswer: { "@type": "Answer", text: "Não. O simulador ajuda a organizar experiências verdadeiras e sinaliza quando faltam exemplos." },
    },
    {
      "@type": "Question",
      name: "Meu áudio é armazenado?",
      acceptedAnswer: { "@type": "Answer", text: "O ProntoDoc não grava um arquivo de áudio próprio nesta versão. O navegador pode transformar a fala em texto." },
    },
    {
      "@type": "Question",
      name: "Funciona sem microfone?",
      acceptedAnswer: { "@type": "Answer", text: "Sim. Todas as respostas também podem ser digitadas." },
    },
  ],
};

export default function InterviewPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <InterviewSimulator />
    </>
  );
}

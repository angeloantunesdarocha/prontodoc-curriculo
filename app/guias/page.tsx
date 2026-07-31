import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "./catalog";
import { SITE_URL } from "../site";

export const metadata: Metadata = {
  title: "Guias de currículo e entrevista de emprego",
  description: "Aprenda como fazer currículo pelo celular, montar um currículo para primeiro emprego, adaptar seu currículo para ATS e se preparar para entrevistas.",
  alternates: { canonical: "/guias" },
  openGraph: {
    title: "Guias de currículo e entrevista de emprego",
    description: "Orientações práticas sobre currículo, primeiro emprego, candidatura e entrevista.",
    url: `${SITE_URL}/guias`,
    type: "website",
    locale: "pt_BR",
  },
};

const hubs = [
  {
    href: "/guias/curriculo",
    label: "Currículo",
    title: "Do primeiro currículo à versão ATS",
    text: "Modelos, objetivos profissionais, envio por e-mail e adaptação para cada vaga.",
  },
  {
    href: "/guias/entrevista",
    label: "Entrevista",
    title: "Respostas, perguntas e preparação",
    text: "Treine situações comuns, entrevista online e perguntas específicas por área.",
  },
  {
    href: "/guias/profissoes",
    label: "Por profissão",
    title: "Conteúdo direcionado ao cargo",
    text: "Currículo e entrevista para motorista, recepção, vendas, caixa, produção e outras funções.",
  },
];

export default function GuidesPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Guias de currículo e entrevista do ProntoDoc",
    numberOfItems: guides.length,
    itemListElement: guides.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/guias/${guide.slug}`,
      name: guide.title,
    })),
  };

  return (
    <main className="content-site">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <nav className="topbar" aria-label="Navegação principal">
        <Link className="brand" href="/"><span className="brand-mark">▤</span>ProntoDoc</Link>
        <div className="article-actions">
          <Link className="secondary-button compact-button" href="/entrevista">Treinar entrevista</Link>
          <Link className="primary-button compact-button" href="/#editor">Criar currículo</Link>
        </div>
      </nav>

      <header className="content-hero">
        <span className="eyebrow">Central do Currículo</span>
        <h1>Como fazer currículo e se preparar para uma entrevista</h1>
        <p>Conteúdo gratuito, direto e responsável para quem está procurando emprego em qualquer lugar do Brasil.</p>
      </header>

      <section className="guide-grid" aria-label="Áreas de conteúdo">
        {hubs.map((hub) => (
          <article className="guide-card" key={hub.href}>
            <span>{hub.label}</span>
            <h2><Link href={hub.href}>{hub.title}</Link></h2>
            <p>{hub.text}</p>
            <Link className="text-link" href={hub.href}>Explorar esta área →</Link>
          </article>
        ))}
      </section>

      <aside className="content-cta">
        <h2>Pronto para transformar orientação em candidatura?</h2>
        <p>Crie pelo celular, compare com a vaga e escolha uma versão ATS ou visual.</p>
        <Link className="primary-button" href="/#editor">Criar meu currículo grátis</Link>
      </aside>

      <footer>
        <Link className="brand" href="/"><span className="brand-mark">▤</span>ProntoDoc</Link>
        <p><Link href="/sobre">Sobre</Link> · <Link href="/politica-editorial">Política editorial</Link> · <Link href="/privacidade">Privacidade</Link> · <Link href="/contato">Contato</Link></p>
        <span>© 2026</span>
      </footer>
    </main>
  );
}

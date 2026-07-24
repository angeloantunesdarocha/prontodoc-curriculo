import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "./data";

export const metadata: Metadata = {
  title: "Central do Currículo — Guias gratuitos",
  description: "Guias gratuitos para criar currículo, buscar o primeiro emprego e se preparar para entrevistas pelo celular.",
  alternates: { canonical: "/guias" },
};

export default function GuidesPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Guias de currículo do ProntoDoc",
    itemListElement: guides.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://prontodoc-curriculo.vercel.app/guias/${guide.slug}`,
      name: guide.title,
    })),
  };

  return (
    <main className="content-site">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <nav className="topbar">
        <Link className="brand" href="/"><span className="brand-mark">▤</span>ProntoDoc</Link>
        <div className="article-actions"><Link className="secondary-button compact-button" href="/entrevista">Treinar entrevista</Link><Link className="primary-button compact-button" href="/#editor">Criar currículo</Link></div>
      </nav>
      <header className="content-hero">
        <span className="eyebrow">Central do Currículo</span>
        <h1>Orientação prática do currículo à entrevista</h1>
        <p>Conteúdo gratuito, direto e responsável para quem está procurando emprego em qualquer lugar do Brasil.</p>
      </header>
      <section className="guide-grid" aria-label="Guias disponíveis">
        {guides.map((guide) => (
          <article className="guide-card" key={guide.slug}>
            <span>{guide.category} · {guide.readingTime}</span>
            <h2><Link href={`/guias/${guide.slug}`}>{guide.title}</Link></h2>
            <p>{guide.description}</p>
            <Link className="text-link" href={`/guias/${guide.slug}`}>Ler guia completo →</Link>
          </article>
        ))}
      </section>
      <aside className="content-cta">
        <h2>Pronto para montar o seu?</h2>
        <p>Crie pelo celular, compare com a vaga e escolha uma versão ATS ou visual.</p>
        <Link className="primary-button" href="/#editor">Criar meu currículo grátis</Link>
      </aside>
      <footer><Link className="brand" href="/"><span className="brand-mark">▤</span>ProntoDoc</Link><p>Informação útil para oportunidades reais.</p><span>© 2026</span></footer>
    </main>
  );
}

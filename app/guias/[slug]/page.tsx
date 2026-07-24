import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuide, guides } from "../data";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guias/${guide.slug}` },
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: "article",
      locale: "pt_BR",
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const url = `https://prontodoc-curriculo.vercel.app/guias/${guide.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: "2026-07-24",
    dateModified: "2026-07-24",
    inLanguage: "pt-BR",
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: "ProntoDoc", url: "https://prontodoc-curriculo.vercel.app" },
    publisher: { "@type": "Organization", name: "ProntoDoc" },
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  const shareUrl = `https://wa.me/?text=${encodeURIComponent(`${guide.title} — ${url}`)}`;

  return (
    <main className="content-site">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <nav className="topbar">
        <Link className="brand" href="/"><span className="brand-mark">▤</span>ProntoDoc</Link>
        <Link className="secondary-button compact-button" href="/guias">Todos os guias</Link>
      </nav>
      <article className="article-layout">
        <header className="article-header">
          <nav className="breadcrumb" aria-label="Navegação estrutural">
            <Link href="/">Início</Link><span>›</span><Link href="/guias">Guias</Link><span>›</span><span>{guide.category}</span>
          </nav>
          <span className="kicker">{guide.category} · {guide.readingTime} de leitura</span>
          <h1>{guide.title}</h1>
          <p>{guide.intro}</p>
          <div className="article-actions">
            <Link className="primary-button" href="/#editor">Criar currículo grátis</Link>
            <Link className="secondary-button" href="/entrevista">Treinar entrevista</Link>
            <a className="secondary-button" href={shareUrl} target="_blank" rel="noopener noreferrer">Compartilhar no WhatsApp</a>
          </div>
        </header>
        <div className="article-body">
          {guide.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
            </section>
          ))}
          <section className="article-faq">
            <h2>Perguntas frequentes</h2>
            {guide.faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </section>
          <aside className="question-box">
            <span className="kicker">Pergunta da comunidade</span>
            <h2>Tem uma dúvida sobre currículo?</h2>
            <p>Envie uma pergunta real. Ela poderá virar uma resposta pública depois de revisão, sem divulgar seus dados pessoais.</p>
            <a className="secondary-button" href={`mailto:angeloantunesdarocha@gmail.com?subject=${encodeURIComponent("Dúvida para a Central do Currículo")}&body=${encodeURIComponent(`Olá, ProntoDoc!\n\nMinha dúvida é:\n\nGuia consultado: ${guide.title}\n\nAutorizo a publicação anônima da pergunta: sim/não`)}`}>Enviar minha dúvida</a>
          </aside>
          <aside className="content-cta">
            <h2>Transforme a orientação em candidatura</h2>
            <p>Preencha seus dados, cole a vaga e gere seu currículo pelo celular.</p>
            <Link className="primary-button" href="/#editor">Começar agora</Link>
          </aside>
        </div>
      </article>
      <footer><Link className="brand" href="/"><span className="brand-mark">▤</span>ProntoDoc</Link><p>Currículos claros para oportunidades reais.</p><span>© 2026</span></footer>
    </main>
  );
}

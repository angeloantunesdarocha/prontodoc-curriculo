import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuide, getRelatedGuides, guides } from "../catalog";
import { AUTHOR_NAME, CONTENT_UPDATED_AT, SITE_URL } from "../../site";

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
    authors: [{ name: AUTHOR_NAME, url: `${SITE_URL}/autor/angelo-antunes` }],
    category: guide.category,
    alternates: { canonical: `/guias/${guide.slug}` },
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: "article",
      locale: "pt_BR",
      url: `${SITE_URL}/guias/${guide.slug}`,
      publishedTime: `${CONTENT_UPDATED_AT}T12:00:00-03:00`,
      modifiedTime: `${CONTENT_UPDATED_AT}T12:00:00-03:00`,
      authors: [`${SITE_URL}/autor/angelo-antunes`],
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
      images: ["/opengraph-image"],
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const url = `${SITE_URL}/guias/${guide.slug}`;
  const related = getRelatedGuides(guide);
  const wordCount = [guide.intro, ...guide.sections.flatMap((section) => section.paragraphs), ...guide.faqs.flatMap((faq) => [faq.question, faq.answer])]
    .join(" ")
    .trim()
    .split(/\s+/)
    .length;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: guide.title,
    description: guide.description,
    datePublished: CONTENT_UPDATED_AT,
    dateModified: CONTENT_UPDATED_AT,
    inLanguage: "pt-BR",
    mainEntityOfPage: url,
    wordCount,
    articleSection: guide.category,
    author: { "@id": `${SITE_URL}/#author`, "@type": "Person", name: AUTHOR_NAME, url: `${SITE_URL}/autor/angelo-antunes` },
    publisher: { "@id": `${SITE_URL}/#organization`, "@type": "Organization", name: "ProntoDoc", url: SITE_URL },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    image: `${SITE_URL}/opengraph-image`,
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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Guias", item: `${SITE_URL}/guias` },
      { "@type": "ListItem", position: 3, name: guide.title, item: url },
    ],
  };

  const shareUrl = `https://wa.me/?text=${encodeURIComponent(`${guide.title} — ${url}`)}`;

  return (
    <main className="content-site">
      {[articleJsonLd, faqJsonLd, breadcrumbJsonLd].map((data, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      ))}

      <nav className="topbar" aria-label="Navegação principal">
        <Link className="brand" href="/"><span className="brand-mark">▤</span>ProntoDoc</Link>
        <div className="article-actions">
          <Link className="secondary-button compact-button" href="/guias">Todos os guias</Link>
          <Link className="primary-button compact-button" href="/#editor">Criar currículo</Link>
        </div>
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
            <span className="kicker">Transparência editorial</span>
            <h2>Como este conteúdo foi preparado</h2>
            <p>O ProntoDoc prioriza orientações práticas, privacidade e informações que o candidato consiga comprovar. Não recomendamos inventar experiências, cursos, resultados ou competências.</p>
            <div className="article-actions">
              <Link className="secondary-button" href="/politica-editorial">Ler política editorial</Link>
              <Link className="secondary-button" href="/autor/angelo-antunes">Conhecer o autor</Link>
            </div>
          </aside>

          <section aria-labelledby="leia-tambem">
            <span className="kicker">Continue sua preparação</span>
            <h2 id="leia-tambem">Leia também</h2>
            <div className="guide-grid">
              {related.map((item) => (
                <article className="guide-card" key={item.slug}>
                  <span>{item.category} · {item.readingTime}</span>
                  <h3><Link href={`/guias/${item.slug}`}>{item.title}</Link></h3>
                  <p>{item.description}</p>
                  <Link className="text-link" href={`/guias/${item.slug}`}>Abrir guia →</Link>
                </article>
              ))}
            </div>
          </section>

          <aside className="question-box">
            <span className="kicker">Pergunta da comunidade</span>
            <h2>Tem uma dúvida sobre currículo ou entrevista?</h2>
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

      <footer>
        <Link className="brand" href="/"><span className="brand-mark">▤</span>ProntoDoc</Link>
        <p><Link href="/sobre">Sobre</Link> · <Link href="/politica-editorial">Editorial</Link> · <Link href="/privacidade">Privacidade</Link> · <Link href="/contato">Contato</Link></p>
        <span>© 2026</span>
      </footer>
    </main>
  );
}

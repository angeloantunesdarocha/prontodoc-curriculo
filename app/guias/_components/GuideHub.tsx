import Link from "next/link";
import type { Guide } from "../data";

export default function GuideHub({
  eyebrow,
  title,
  description,
  guides,
}: {
  eyebrow: string;
  title: string;
  description: string;
  guides: Guide[];
}) {
  return (
    <main className="content-site">
      <nav className="topbar" aria-label="Navegação principal">
        <Link className="brand" href="/"><span className="brand-mark">▤</span>ProntoDoc</Link>
        <div className="article-actions">
          <Link className="secondary-button compact-button" href="/guias">Todos os guias</Link>
          <Link className="primary-button compact-button" href="/#editor">Criar currículo</Link>
        </div>
      </nav>

      <header className="content-hero">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </header>

      <section className="guide-grid" aria-label={title}>
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
        <h2>Coloque a preparação em prática</h2>
        <p>Crie seu currículo, compare com a vaga e treine respostas pelo celular.</p>
        <div className="article-actions">
          <Link className="primary-button" href="/#editor">Criar currículo grátis</Link>
          <Link className="secondary-button" href="/entrevista">Treinar entrevista</Link>
        </div>
      </aside>

      <footer>
        <Link className="brand" href="/"><span className="brand-mark">▤</span>ProntoDoc</Link>
        <p><Link href="/sobre">Sobre</Link> · <Link href="/politica-editorial">Editorial</Link> · <Link href="/privacidade">Privacidade</Link></p>
        <span>© 2026</span>
      </footer>
    </main>
  );
}

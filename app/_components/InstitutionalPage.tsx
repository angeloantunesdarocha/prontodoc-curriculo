import Link from "next/link";
import type { ReactNode } from "react";

export default function InstitutionalPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <main className="content-site">
      <nav className="topbar" aria-label="Navegação principal">
        <Link className="brand" href="/"><span className="brand-mark">▤</span>ProntoDoc</Link>
        <div className="article-actions">
          <Link className="secondary-button compact-button" href="/guias">Guias</Link>
          <Link className="primary-button compact-button" href="/#editor">Criar currículo</Link>
        </div>
      </nav>

      <article className="article-layout">
        <header className="article-header">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{intro}</p>
        </header>
        <div className="article-body">{children}</div>
      </article>

      <footer>
        <Link className="brand" href="/"><span className="brand-mark">▤</span>ProntoDoc</Link>
        <p><Link href="/sobre">Sobre</Link> · <Link href="/politica-editorial">Editorial</Link> · <Link href="/seguranca">Segurança</Link> · <Link href="/privacidade">Privacidade</Link> · <Link href="/termos">Termos</Link> · <Link href="/contato">Contato</Link></p>
        <span>© 2026</span>
      </footer>
    </main>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="content-site">
      <nav className="topbar">
        <Link className="brand" href="/"><span className="brand-mark">▤</span>ProntoDoc</Link>
      </nav>
      <article className="article-layout">
        <header className="article-header">
          <span className="eyebrow">Página não encontrada</span>
          <h1>Este endereço não está disponível</h1>
          <p>O conteúdo pode ter mudado de lugar ou o endereço pode ter sido digitado incorretamente.</p>
          <div className="article-actions">
            <Link className="primary-button" href="/guias">Procurar nos guias</Link>
            <Link className="secondary-button" href="/">Ir para o início</Link>
            <Link className="secondary-button" href="/entrevista">Treinar entrevista</Link>
          </div>
        </header>
      </article>
    </main>
  );
}

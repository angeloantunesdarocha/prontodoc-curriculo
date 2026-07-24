import type { Metadata } from "next";
import Link from "next/link";
import InstitutionalPage from "../../_components/InstitutionalPage";
import { SITE_URL } from "../../site";

export const metadata: Metadata = {
  title: "Ângelo Antunes — Criador do ProntoDoc",
  description: "Conheça Ângelo Antunes, criador do ProntoDoc e responsável pelo desenvolvimento e revisão editorial do projeto.",
  alternates: { canonical: "/autor/angelo-antunes" },
};

export default function AuthorPage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#author`,
    name: "Ângelo Antunes",
    url: `${SITE_URL}/autor/angelo-antunes`,
    email: "angeloantunesdarocha@gmail.com",
    jobTitle: "Criador do ProntoDoc",
    knowsAbout: ["Desenvolvimento de software", "Currículo pelo celular", "Preparação digital para candidaturas"],
  };

  return (
    <InstitutionalPage
      eyebrow="Autor e responsável"
      title="Ângelo Antunes"
      intro="Criador do ProntoDoc, estudante de Sistemas de Informação e responsável pela construção, manutenção e revisão dos conteúdos publicados no projeto."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <section>
        <h2>Relação com o projeto</h2>
        <p>Ângelo criou o ProntoDoc a partir de uma necessidade prática: permitir que uma pessoa prepare currículo e entrevista usando o celular, sem depender de programas complicados.</p>
        <p>Ele é responsável por desenvolver a ferramenta, organizar a Central do Currículo, revisar os fluxos de uso e corrigir problemas relatados pelos usuários.</p>
      </section>
      <section>
        <h2>Limites e transparência</h2>
        <p>Os conteúdos do ProntoDoc são educativos. Não representam aconselhamento jurídico, garantia de contratação ou posição oficial de empresas e plataformas de recrutamento.</p>
        <p>Orientações que possam mudar são revisadas, e erros podem ser comunicados diretamente pelo canal de contato.</p>
      </section>
      <section>
        <h2>Contato</h2>
        <p>Para dúvidas, correções, parcerias ou relatos sobre o funcionamento do site:</p>
        <a className="secondary-button" href="mailto:angeloantunesdarocha@gmail.com">angeloantunesdarocha@gmail.com</a>
      </section>
      <aside className="question-box">
        <h2>Veja como o conteúdo é produzido</h2>
        <p>A política editorial explica critérios de clareza, honestidade, revisão e proteção de dados.</p>
        <Link className="secondary-button" href="/politica-editorial">Política editorial</Link>
      </aside>
    </InstitutionalPage>
  );
}

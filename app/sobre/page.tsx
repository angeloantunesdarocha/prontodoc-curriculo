import type { Metadata } from "next";
import Link from "next/link";
import InstitutionalPage from "../_components/InstitutionalPage";

export const metadata: Metadata = {
  title: "Sobre o ProntoDoc",
  description: "Conheça a proposta do ProntoDoc, sua origem e os princípios usados para orientar currículo e entrevista.",
  alternates: { canonical: "/sobre" },
};

export default function AboutPage() {
  return (
    <InstitutionalPage
      eyebrow="Sobre o projeto"
      title="Tecnologia prática para quem está procurando uma oportunidade"
      intro="O ProntoDoc foi criado para ajudar pessoas a preparar currículo, candidatura e entrevista usando principalmente o celular, com linguagem simples e preços claros."
    >
      <section>
        <h2>O problema que queremos resolver</h2>
        <p>Muitas pessoas precisam procurar emprego sem computador, sem programas pagos e sem orientação individual. Ao mesmo tempo, modelos prontos podem incentivar informações genéricas ou experiências que a pessoa não possui.</p>
        <p>O ProntoDoc organiza dados verdadeiros, ajuda a comparar o currículo com uma vaga e oferece treino de entrevista em voz alta. A ferramenta não garante contratação e não substitui a decisão de empresas ou recrutadores.</p>
      </section>
      <section>
        <h2>Nossos princípios</h2>
        <ul>
          <li>Não inventar experiências, cursos, resultados ou habilidades.</li>
          <li>Explicar limites e preços antes da compra.</li>
          <li>Proteger documentos e dados pessoais.</li>
          <li>Priorizar funcionamento no celular e linguagem acessível.</li>
          <li>Revisar conteúdos quando práticas e plataformas mudarem.</li>
        </ul>
      </section>
      <section>
        <h2>Quem criou</h2>
        <p>O projeto foi criado por Ângelo Antunes, estudante de Sistemas de Informação e desenvolvedor de soluções digitais voltadas a necessidades práticas.</p>
        <Link className="secondary-button" href="/autor/angelo-antunes">Conhecer o autor</Link>
      </section>
      <aside className="content-cta">
        <h2>Experimente a ferramenta</h2>
        <p>Comece gratuitamente, revise tudo antes de baixar e mantenha somente informações verdadeiras.</p>
        <Link className="primary-button" href="/#editor">Criar currículo</Link>
      </aside>
    </InstitutionalPage>
  );
}

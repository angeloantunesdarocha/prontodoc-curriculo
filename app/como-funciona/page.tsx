import type { Metadata } from "next";
import Link from "next/link";
import InstitutionalPage from "../_components/InstitutionalPage";

export const metadata: Metadata = {
  title: "Como funciona o ProntoDoc",
  description: "Entenda como criar currículo, adaptar à vaga, gerar PDF e treinar entrevista por voz no celular.",
  alternates: { canonical: "/como-funciona" },
};

export default function HowItWorksPage() {
  return (
    <InstitutionalPage
      eyebrow="Passo a passo"
      title="Do currículo à entrevista usando o celular"
      intro="O ProntoDoc reúne preenchimento, análise inicial da vaga, versões de currículo e treino falado em uma experiência simples."
    >
      <section>
        <h2>1. Preencha ou conte sua experiência</h2>
        <p>Informe contato, objetivo, formação, experiências e habilidades. No navegador compatível, você também pode falar e revisar a transcrição antes de usar o texto.</p>
      </section>
      <section>
        <h2>2. Compare com a vaga</h2>
        <p>Cole o anúncio para identificar palavras e requisitos presentes ou ausentes. A análise é inicial e não deve ser usada para acrescentar algo que você não possui.</p>
      </section>
      <section>
        <h2>3. Escolha a apresentação</h2>
        <p>A versão ATS prioriza leitura simples e texto selecionável. A versão visual permite uma apresentação diferente e foto opcional. A escolha depende do canal e das instruções da empresa.</p>
      </section>
      <section>
        <h2>4. Revise e salve em PDF</h2>
        <p>Confira telefone, e-mail, datas, cargos e ortografia. Abra o PDF depois de salvar para verificar se nada ficou cortado.</p>
      </section>
      <section>
        <h2>5. Treine a entrevista</h2>
        <p>O simulador começa imediatamente com três perguntas gratuitas. Você pode personalizar o cargo e colar a vaga quando desejar. As respostas podem ser faladas ou digitadas.</p>
      </section>
      <aside className="question-box">
        <h2>O que o ProntoDoc não faz</h2>
        <ul>
          <li>Não garante emprego ou aprovação.</li>
          <li>Não substitui os critérios da empresa.</li>
          <li>Não deve ser usado para inventar experiência.</li>
          <li>Não solicita documentos pessoais na criação do currículo.</li>
        </ul>
      </aside>
      <div className="article-actions">
        <Link className="primary-button" href="/#editor">Criar currículo</Link>
        <Link className="secondary-button" href="/entrevista">Treinar entrevista</Link>
      </div>
    </InstitutionalPage>
  );
}

import type { Metadata } from "next";
import InstitutionalPage from "../_components/InstitutionalPage";

export const metadata: Metadata = {
  title: "Política editorial",
  description: "Conheça os critérios usados pelo ProntoDoc para produzir, revisar e corrigir conteúdos sobre currículo e entrevista.",
  alternates: { canonical: "/politica-editorial" },
};

export default function EditorialPolicyPage() {
  return (
    <InstitutionalPage
      eyebrow="Transparência"
      title="Política editorial do ProntoDoc"
      intro="Esta política explica como selecionamos temas, escrevemos orientações, tratamos exemplos e corrigimos informações."
    >
      <section>
        <h2>Finalidade dos conteúdos</h2>
        <p>Os guias ajudam pessoas a organizar informações profissionais verdadeiras, compreender etapas de candidatura e praticar respostas. O conteúdo é educativo e não garante aprovação, entrevista ou contratação.</p>
      </section>
      <section>
        <h2>Critérios de publicação</h2>
        <ul>
          <li>Responder uma dúvida real de quem procura emprego.</li>
          <li>Usar linguagem direta e adequada ao celular.</li>
          <li>Separar exemplos de afirmações sobre a realidade do usuário.</li>
          <li>Não incentivar mentiras, documentos falsos ou qualificações inexistentes.</li>
          <li>Evitar exposição de CPF, RG, dados bancários, placas e informações de terceiros.</li>
        </ul>
      </section>
      <section>
        <h2>Autoria, revisão e atualizações</h2>
        <p>Os artigos identificam o responsável e a data de revisão. Conteúdos relacionados a plataformas, ferramentas ou práticas que possam mudar devem ser atualizados quando uma alteração relevante for confirmada.</p>
        <p>Textos podem receber apoio de ferramentas digitais e inteligência artificial na organização, mas são revisados antes da publicação. A responsabilidade editorial permanece com o ProntoDoc.</p>
      </section>
      <section>
        <h2>Correções</h2>
        <p>Erros factuais, links quebrados e orientações desatualizadas podem ser comunicados por e-mail. Correções relevantes são incorporadas ao conteúdo e a data de revisão é atualizada.</p>
        <a className="secondary-button" href="mailto:angeloantunesdarocha@gmail.com?subject=Corre%C3%A7%C3%A3o%20editorial%20ProntoDoc">Solicitar correção</a>
      </section>
      <section>
        <h2>Publicidade e pagamentos</h2>
        <p>Conteúdo educativo e oferta comercial devem permanecer claramente separados. Preços, limitações e forma de liberação do produto devem ser apresentados antes da compra.</p>
      </section>
    </InstitutionalPage>
  );
}

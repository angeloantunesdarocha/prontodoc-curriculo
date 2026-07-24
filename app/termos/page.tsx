import type { Metadata } from "next";
import InstitutionalPage from "../_components/InstitutionalPage";

export const metadata: Metadata = {
  title: "Termos de uso",
  description: "Consulte as condições de uso do editor de currículo, simulador de entrevista, conteúdos e produtos ProntoDoc.",
  alternates: { canonical: "/termos" },
};

export default function TermsPage() {
  return (
    <InstitutionalPage
      eyebrow="Condições de uso"
      title="Termos de uso do ProntoDoc"
      intro="Ao utilizar o site, o usuário concorda com estas condições. Última revisão: 24 de julho de 2026."
    >
      <section>
        <h2>Finalidade do serviço</h2>
        <p>O ProntoDoc fornece ferramentas e conteúdos educativos para organização de currículo, candidatura e preparação para entrevistas. O serviço não representa empregadores, não seleciona candidatos e não garante contratação.</p>
      </section>
      <section>
        <h2>Responsabilidade pelas informações</h2>
        <p>O usuário deve revisar o documento e manter apenas informações verdadeiras. É proibido usar a ferramenta para criar experiências, certificados, referências, documentos ou resultados falsos.</p>
        <p>O usuário também é responsável por confirmar telefone, e-mail, datas, ortografia e adequação à vaga antes de enviar o currículo.</p>
      </section>
      <section>
        <h2>Conteúdo e avaliações automáticas</h2>
        <p>Pontuações de alinhamento e entrevista são estimativas educativas baseadas no texto informado. Elas não reproduzem necessariamente critérios de empresas, plataformas ou recrutadores.</p>
      </section>
      <section>
        <h2>Produtos pagos</h2>
        <p>Preços e recursos de cada produto são apresentados antes do pagamento. A compra não garante emprego, entrevista ou aprovação. Quando a liberação depender de conferência de pagamento, o usuário deve seguir as instruções mostradas no site.</p>
      </section>
      <section>
        <h2>Disponibilidade</h2>
        <p>Recursos que dependem do navegador, microfone, câmera, internet, hospedagem ou serviços de terceiros podem apresentar indisponibilidade. O ProntoDoc pode corrigir, alterar ou descontinuar funcionalidades para segurança e melhoria do serviço.</p>
      </section>
      <section>
        <h2>Uso aceitável</h2>
        <p>Não é permitido tentar invadir o serviço, contornar pagamentos, automatizar abuso, prejudicar outros usuários ou utilizar o site para atividades ilegais.</p>
      </section>
      <section>
        <h2>Contato</h2>
        <a className="secondary-button" href="mailto:angeloantunesdarocha@gmail.com?subject=Termos%20ProntoDoc">Enviar dúvida sobre os termos</a>
      </section>
    </InstitutionalPage>
  );
}

import type { Metadata } from "next";
import InstitutionalPage from "../_components/InstitutionalPage";

export const metadata: Metadata = {
  title: "Contato e suporte",
  description: "Fale com o ProntoDoc sobre suporte, pagamento, correções de conteúdo, privacidade ou parceria.",
  alternates: { canonical: "/contato" },
};

const contacts = [
  {
    title: "Suporte técnico",
    text: "Informe a página, o aparelho, o navegador e o que aconteceu. Não envie senhas ou documentos pessoais.",
    subject: "Suporte técnico ProntoDoc",
  },
  {
    title: "Pagamento e liberação",
    text: "Informe o produto escolhido, e-mail utilizado e número da operação. Envie comprovante somente quando necessário.",
    subject: "Pagamento ProntoDoc",
  },
  {
    title: "Correção de conteúdo",
    text: "Envie o endereço do guia, o trecho e a informação que precisa ser revisada.",
    subject: "Correção editorial ProntoDoc",
  },
  {
    title: "Parcerias",
    text: "Escolas, cursos, projetos sociais e criadores podem propor materiais ou ações educativas.",
    subject: "Parceria com o ProntoDoc",
  },
];

export default function ContactPage() {
  return (
    <InstitutionalPage
      eyebrow="Atendimento"
      title="Contato e suporte"
      intro="Escolha o assunto e envie as informações necessárias para que a solicitação possa ser entendida e respondida."
    >
      <section className="guide-grid">
        {contacts.map((contact) => (
          <article className="guide-card" key={contact.title}>
            <h2>{contact.title}</h2>
            <p>{contact.text}</p>
            <a className="text-link" href={`mailto:angeloantunesdarocha@gmail.com?subject=${encodeURIComponent(contact.subject)}`}>Enviar e-mail →</a>
          </article>
        ))}
      </section>
      <section>
        <h2>Canal principal</h2>
        <p><a href="mailto:angeloantunesdarocha@gmail.com">angeloantunesdarocha@gmail.com</a></p>
        <p>O ProntoDoc não solicita senha, código de autenticação, dados completos de cartão ou documentos pessoais por e-mail.</p>
      </section>
    </InstitutionalPage>
  );
}

import type { Metadata } from "next";
import InstitutionalPage from "../_components/InstitutionalPage";

export const metadata: Metadata = {
  title: "Segurança e proteção de dados",
  description: "Veja como o ProntoDoc reduz exposição de dados e quais cuidados o usuário deve adotar ao criar e enviar currículo.",
  alternates: { canonical: "/seguranca" },
};

export default function SecurityPage() {
  return (
    <InstitutionalPage
      eyebrow="Segurança"
      title="Cuidados para proteger sua candidatura"
      intro="O ProntoDoc foi projetado para reduzir a coleta de dados, mas a segurança também depende das informações incluídas e dos canais usados pelo candidato."
    >
      <section>
        <h2>Não coloque documentos no currículo</h2>
        <p>Evite CPF, RG, número completo da CNH, dados bancários, senhas, placas, endereço residencial completo e fotografias de documentos. Empresas podem solicitar comprovações em etapas posteriores e por canais oficiais.</p>
      </section>
      <section>
        <h2>Confirme o destinatário</h2>
        <p>Antes de enviar por WhatsApp ou e-mail, confirme se o contato pertence à empresa. Desconfie de cobranças para participar de seleção, pedidos de senha, instalação de aplicativos desconhecidos e solicitações urgentes de pagamento.</p>
      </section>
      <section>
        <h2>Armazenamento no aparelho</h2>
        <p>O rascunho do currículo pode permanecer salvo no navegador. Em aparelho compartilhado, limpe os dados após terminar e evite deixar arquivos pessoais na pasta de downloads sem proteção.</p>
      </section>
      <section>
        <h2>Pagamento</h2>
        <p>Use somente a página oficial aberta pelo ProntoDoc e confira o destinatário mostrado no Mercado Pago. O ProntoDoc não solicita senha, código de autenticação ou dados completos de cartão por mensagem.</p>
      </section>
      <section>
        <h2>Relatar problema</h2>
        <p>Falhas técnicas ou suspeitas de segurança podem ser relatadas com descrição do problema, página afetada e forma de reprodução. Não envie senhas nem documentos pessoais.</p>
        <a className="secondary-button" href="mailto:angeloantunesdarocha@gmail.com?subject=Seguran%C3%A7a%20ProntoDoc">Relatar problema de segurança</a>
      </section>
    </InstitutionalPage>
  );
}

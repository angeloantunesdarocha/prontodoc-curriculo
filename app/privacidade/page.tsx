import type { Metadata } from "next";
import InstitutionalPage from "../_components/InstitutionalPage";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: "Entenda como o ProntoDoc trata dados digitados, arquivos, voz, pagamentos e contatos.",
  alternates: { canonical: "/privacidade" },
};

export default function PrivacyPage() {
  return (
    <InstitutionalPage
      eyebrow="Proteção de dados"
      title="Política de privacidade"
      intro="Esta política descreve o funcionamento atual do ProntoDoc e os cuidados adotados para reduzir a coleta de informações pessoais. Última revisão: 24 de julho de 2026."
    >
      <section>
        <h2>Dados do currículo</h2>
        <p>Na versão atual, os dados preenchidos no editor são armazenados no próprio navegador do usuário por meio do armazenamento local do aparelho. O ProntoDoc não cria automaticamente uma conta nem envia o conteúdo completo do currículo para um banco de dados próprio.</p>
        <p>Ao limpar dados do navegador, trocar de aparelho ou usar modo anônimo, essas informações podem ser perdidas.</p>
      </section>
      <section>
        <h2>Microfone, voz e fotografia</h2>
        <p>O navegador solicita permissão antes de acessar microfone ou câmera. A fala pode ser convertida em texto pelo recurso de reconhecimento do navegador. O ProntoDoc não grava um arquivo de áudio próprio nesta versão.</p>
        <p>Fotografias escolhidas para o currículo são processadas no navegador para exibição e geração do documento. Não envie imagens de documentos pessoais.</p>
      </section>
      <section>
        <h2>Pagamentos</h2>
        <p>Pagamentos são processados pelo Mercado Pago. Quando necessário para abrir o checkout, o e-mail informado pode ser encaminhado ao provedor de pagamento. Dados de cartão, conta ou chave de pagamento não são recebidos diretamente pelo ProntoDoc.</p>
        <p>O tratamento realizado pelo Mercado Pago também segue os termos e políticas próprios da plataforma.</p>
      </section>
      <section>
        <h2>Contato por e-mail</h2>
        <p>Quando o usuário envia mensagem, pergunta, comprovante ou pedido de suporte, o endereço de e-mail e o conteúdo enviado são usados para responder e tratar a solicitação.</p>
      </section>
      <section>
        <h2>Logs técnicos</h2>
        <p>Serviços de hospedagem podem registrar informações técnicas necessárias para segurança e funcionamento, como endereço IP, horário, rota acessada, navegador e erros da aplicação.</p>
      </section>
      <section>
        <h2>Direitos e solicitações</h2>
        <p>Solicitações relacionadas a dados enviados diretamente ao ProntoDoc podem ser encaminhadas ao e-mail abaixo. Para dados mantidos somente no navegador, o usuário pode limpar o armazenamento do site nas configurações do aparelho.</p>
        <a className="secondary-button" href="mailto:angeloantunesdarocha@gmail.com?subject=Privacidade%20ProntoDoc">Falar sobre privacidade</a>
      </section>
    </InstitutionalPage>
  );
}

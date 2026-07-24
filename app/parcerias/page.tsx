import type { Metadata } from "next";
import Link from "next/link";
import InstitutionalPage from "../_components/InstitutionalPage";

export const metadata: Metadata = {
  title: "Parcerias educacionais e comunitárias",
  description: "Escolas, cursos, projetos sociais e criadores podem usar e compartilhar materiais gratuitos do ProntoDoc.",
  alternates: { canonical: "/parcerias" },
};

export default function PartnershipsPage() {
  return (
    <InstitutionalPage
      eyebrow="Parcerias"
      title="Materiais para apoiar quem está procurando emprego"
      intro="O ProntoDoc busca colaboração com escolas, faculdades, cursos, projetos sociais, associações e criadores de conteúdo que atendem estudantes e trabalhadores."
    >
      <section>
        <h2>O que pode ser compartilhado</h2>
        <ul>
          <li>Guias gratuitos de currículo e entrevista.</li>
          <li>Roteiros para primeiro emprego e Jovem Aprendiz.</li>
          <li>Orientações de privacidade e prevenção de golpes.</li>
          <li>Links para criação de currículo e treino de entrevista.</li>
        </ul>
      </section>
      <section>
        <h2>Formas de colaboração</h2>
        <p>Parceiros podem indicar dúvidas reais da comunidade, sugerir profissões para novos guias, compartilhar materiais em turmas e eventos ou convidar o projeto para ações educativas.</p>
        <p>Não vendemos links e não participamos de esquemas de avaliações ou recomendações falsas. Referências devem existir porque o material foi considerado útil.</p>
      </section>
      <section>
        <h2>Material inicial</h2>
        <div className="guide-grid">
          <article className="guide-card">
            <h3>Primeiro emprego</h3>
            <p>Conteúdos para quem ainda não possui experiência registrada.</p>
            <Link className="text-link" href="/guias/curriculo-para-primeiro-emprego">Abrir material →</Link>
          </article>
          <article className="guide-card">
            <h3>Jovem Aprendiz</h3>
            <p>Currículo, entrevista e cuidados para programas de aprendizagem.</p>
            <Link className="text-link" href="/guias/curriculo-jovem-aprendiz">Abrir material →</Link>
          </article>
          <article className="guide-card">
            <h3>Segurança</h3>
            <p>Dados que não devem ser colocados no currículo e cuidados com falsas vagas.</p>
            <Link className="text-link" href="/seguranca">Abrir material →</Link>
          </article>
        </div>
      </section>
      <aside className="content-cta">
        <h2>Proponha uma parceria</h2>
        <p>Apresente a instituição, o público atendido e a ação imaginada.</p>
        <a className="primary-button" href="mailto:angeloantunesdarocha@gmail.com?subject=Parceria%20com%20o%20ProntoDoc">Entrar em contato</a>
      </aside>
    </InstitutionalPage>
  );
}

import type { Metadata } from "next";
import GuideHub from "../_components/GuideHub";
import { guideCollections } from "../catalog";

export const metadata: Metadata = {
  title: "Currículo e entrevista por profissão",
  description: "Encontre orientações para motorista, recepcionista, vendedor, caixa, produção, serviços gerais e outras profissões.",
  alternates: { canonical: "/guias/profissoes" },
};

export default function ProfessionGuidesPage() {
  return (
    <GuideHub
      eyebrow="Preparação por profissão"
      title="Currículo e entrevista direcionados ao cargo"
      description="Veja atividades, habilidades, cuidados e perguntas comuns para funções específicas, sempre sem inventar experiências."
      guides={guideCollections.profissoes}
    />
  );
}

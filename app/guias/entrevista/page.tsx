import type { Metadata } from "next";
import GuideHub from "../_components/GuideHub";
import { guideCollections } from "../catalog";

export const metadata: Metadata = {
  title: "Guias de entrevista de emprego: perguntas e respostas",
  description: "Prepare respostas verdadeiras, treine perguntas comuns e organize sua entrevista de emprego pelo celular.",
  alternates: { canonical: "/guias/entrevista" },
};

export default function InterviewGuidesPage() {
  return (
    <GuideHub
      eyebrow="Central de entrevista"
      title="Prepare respostas claras antes da entrevista"
      description="Perguntas comuns, situações por profissão, entrevista online e exemplos para quem busca o primeiro emprego."
      guides={guideCollections.entrevista}
    />
  );
}

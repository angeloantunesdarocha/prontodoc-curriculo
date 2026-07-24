import type { Metadata } from "next";
import GuideHub from "../_components/GuideHub";
import { guideCollections } from "../catalog";

export const metadata: Metadata = {
  title: "Guias de currículo: modelos, primeiro emprego e ATS",
  description: "Aprenda a criar currículo pelo celular, escolher objetivo profissional, adaptar à vaga e preparar uma versão ATS.",
  alternates: { canonical: "/guias/curriculo" },
};

export default function CurriculumGuidesPage() {
  return (
    <GuideHub
      eyebrow="Central de currículo"
      title="Currículo claro para cada oportunidade"
      description="Modelos, exemplos e cuidados para primeiro emprego, estágio, profissões, envio e plataformas de seleção."
      guides={guideCollections.curriculo}
    />
  );
}

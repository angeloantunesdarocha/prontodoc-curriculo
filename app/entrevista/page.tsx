import type { Metadata } from "next";
import InterviewSimulator from "./simulator";

export const metadata: Metadata = {
  title: "Simulador de entrevista de emprego por voz",
  description:
    "Treine entrevista de emprego pelo celular com perguntas para sua profissão, avaliação objetiva e relatório de preparação.",
  alternates: { canonical: "/entrevista" },
};

export default function InterviewPage() {
  return <InterviewSimulator />;
}

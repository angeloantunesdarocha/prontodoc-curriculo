export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://prontodoc-curriculo.vercel.app"
).replace(/\/+$/, "");

export const plans = {
  pdf: {
    id: "pdf",
    title: "ProntoDoc — PDF Profissional",
    description: "Currículo profissional em PDF, pronto para enviar às empresas",
    amount: 4.9,
    fallbackUrl: "https://mpago.la/1A5QAR6",
  },
  versions: {
    id: "versions",
    title: "ProntoDoc — 3 versões do currículo",
    description: "Três versões profissionais adaptadas para diferentes oportunidades",
    amount: 9.9,
    fallbackUrl: "https://mpago.la/1uaXJCr",
  },
  kit: {
    id: "kit",
    title: "ProntoDoc — Kit Candidatura",
    description: "Currículo, carta de apresentação e mensagem para WhatsApp",
    amount: 14.9,
    fallbackUrl: "https://mpago.la/1A5QAR6",
  },
  interview: {
    id: "interview",
    title: "ProntoDoc — Entrevista Completa",
    description: "Simulação com até 12 perguntas e relatório de preparação",
    amount: 9.9,
    fallbackUrl: "https://mpago.la/1A5QAR6",
  },
  vacancy: {
    id: "vacancy",
    title: "ProntoDoc — Preparação para a Vaga",
    description: "Currículo adaptado, entrevista direcionada e relatório",
    amount: 19.9,
    fallbackUrl: "https://mpago.la/1A5QAR6",
  },
  journey: {
    id: "journey",
    title: "ProntoDoc — Jornada de Contratação",
    description: "Três entrevistas, currículo, carta e mensagem para WhatsApp",
    amount: 29.9,
    fallbackUrl: "https://mpago.la/1A5QAR6",
  },
} as const;

export type PlanId = keyof typeof plans;

export function isPlanId(value: unknown): value is PlanId {
  return typeof value === "string" && value in plans;
}

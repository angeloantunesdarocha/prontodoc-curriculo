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
    fallbackUrl: "https://www.mercadopago.com.br/link-tools/details/c84b3dd0-e80b-450f-81cb-f272e3412536",
  },
  versions: {
    id: "versions",
    title: "ProntoDoc — 3 versões do currículo",
    description: "Três versões profissionais adaptadas para diferentes oportunidades",
    amount: 9.9,
    fallbackUrl: "https://www.mercadopago.com.br/link-tools/details/0e0720e6-bb63-47bd-9722-179174128ab2",
  },
  kit: {
    id: "kit",
    title: "ProntoDoc — Kit Candidatura",
    description: "Currículo, carta de apresentação e mensagem para WhatsApp",
    amount: 14.9,
    fallbackUrl: "https://www.mercadopago.com.br/link-tools/details/f72a223f-9367-4b3d-8239-2305def62e14",
  },
  interview: {
    id: "interview",
    title: "ProntoDoc — Entrevista Completa",
    description: "Simulação com até 12 perguntas e relatório de preparação",
    amount: 9.9,
    fallbackUrl: "https://www.mercadopago.com.br/link-tools/details/2b96f0f7-37c6-4cce-a74c-40200ab33216",
  },
  vacancy: {
    id: "vacancy",
    title: "ProntoDoc — Preparação para a Vaga",
    description: "Currículo adaptado, entrevista direcionada e relatório",
    amount: 19.9,
    fallbackUrl: "https://www.mercadopago.com.br/link-tools/details/2f9ea6bf-8fb3-474f-93d2-0ff9e131a5bb",
  },
  journey: {
    id: "journey",
    title: "ProntoDoc — Jornada de Contratação",
    description: "Três entrevistas, currículo, carta e mensagem para WhatsApp",
    amount: 29.9,
    fallbackUrl: "https://www.mercadopago.com.br/link-tools/details/80694f34-d7f5-4186-986d-ef28d7627f6b",
  },
} as const;

export type PlanId = keyof typeof plans;

export function isPlanId(value: unknown): value is PlanId {
  return typeof value === "string" && value in plans;
}

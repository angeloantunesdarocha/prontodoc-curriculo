export const SITE_NAME = "ProntoDoc";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://prontodoc-curriculo.vercel.app").replace(/\/$/, "");
export const SITE_DESCRIPTION =
  "Crie seu currículo online grátis pelo celular, gere um PDF profissional e treine entrevistas de emprego com preparação para cada vaga.";
export const SITE_EMAIL = "angeloantunesdarocha@gmail.com";
export const AUTHOR_NAME = "Ângelo Antunes";
export const INDEXNOW_KEY = "7e9b0a6c4f2d48e6a1c3b5d7f9e0a2c4";
export const CONTENT_UPDATED_AT = "2026-07-27";

export function absoluteUrl(path = "/") {
  return new URL(path, `${SITE_URL}/`).toString();
}

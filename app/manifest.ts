import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ProntoDoc — Currículo e entrevista",
    short_name: "ProntoDoc",
    description: "Crie currículo profissional e treine entrevistas pelo celular.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f5ef",
    theme_color: "#165dff",
    lang: "pt-BR",
    categories: ["business", "education", "productivity"],
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}

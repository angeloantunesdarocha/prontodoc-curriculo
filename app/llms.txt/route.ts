import { guideCollections } from "../guias/catalog";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "../site";

export async function GET() {
  const featured = [
    ...guideCollections.curriculo.slice(0, 8),
    ...guideCollections.entrevista.slice(0, 6),
  ];

  const text = `# ${SITE_NAME}\n\n> ${SITE_DESCRIPTION}\n\n## Páginas principais\n\n- [Criar currículo](${SITE_URL}/)\n- [Treinar entrevista](${SITE_URL}/entrevista)\n- [Central de guias](${SITE_URL}/guias)\n- [Sobre o projeto](${SITE_URL}/sobre)\n- [Política editorial](${SITE_URL}/politica-editorial)\n\n## Guias em destaque\n\n${featured.map((guide) => `- [${guide.title}](${SITE_URL}/guias/${guide.slug}): ${guide.description}`).join("\n")}\n\n## Uso responsável\n\nO ProntoDoc ajuda a organizar informações verdadeiras. Não garante contratação e não recomenda inventar experiências, cursos, resultados ou habilidades.\n\n## Contato\n\n- ${SITE_URL}/contato\n`;

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

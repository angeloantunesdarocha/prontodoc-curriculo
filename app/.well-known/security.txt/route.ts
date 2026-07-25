import { SITE_EMAIL, SITE_URL } from "../../site";

export async function GET() {
  const body = [
    `Contact: mailto:${SITE_EMAIL}`,
    `Canonical: ${SITE_URL}/.well-known/security.txt`,
    `Policy: ${SITE_URL}/seguranca`,
    "Preferred-Languages: pt-BR, en",
    "Expires: 2027-07-24T23:59:59Z",
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}

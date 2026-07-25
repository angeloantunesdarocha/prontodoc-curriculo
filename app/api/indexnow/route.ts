import { INDEXNOW_KEY, SITE_URL } from "../../site";

function extractUrls(xml: string) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)]
    .map((match) => match[1].trim())
    .filter((url) => url === SITE_URL || url.startsWith(`${SITE_URL}/`))
    .slice(0, 10000);
}

export async function POST(request: Request) {
  const expectedSecret = process.env.INDEXNOW_API_SECRET;
  const providedSecret = request.headers.get("x-indexnow-secret");

  if (!expectedSecret || providedSecret !== expectedSecret) {
    return Response.json({ error: "Não autorizado." }, { status: 401 });
  }

  try {
    const sitemapResponse = await fetch(`${SITE_URL}/sitemap.xml`, { cache: "no-store" });
    if (!sitemapResponse.ok) {
      return Response.json({ error: "Sitemap indisponível." }, { status: 502 });
    }

    const urls = extractUrls(await sitemapResponse.text());
    if (!urls.length) {
      return Response.json({ error: "Nenhuma URL encontrada." }, { status: 422 });
    }

    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: new URL(SITE_URL).host,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
    });

    if (![200, 202].includes(response.status)) {
      return Response.json({ error: "IndexNow recusou o envio.", status: response.status }, { status: 502 });
    }

    return Response.json({ submitted: urls.length, status: response.status });
  } catch (error) {
    console.error("IndexNow submission error", error);
    return Response.json({ error: "Não foi possível enviar as URLs." }, { status: 500 });
  }
}

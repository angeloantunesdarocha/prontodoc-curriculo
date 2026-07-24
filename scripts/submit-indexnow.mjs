const siteUrl = (process.env.SITE_URL || "https://prontodoc-curriculo.vercel.app").replace(/\/$/, "");
const key = "7e9b0a6c4f2d48e6a1c3b5d7f9e0a2c4";
const sitemapUrl = `${siteUrl}/sitemap.xml`;

function extractUrls(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)]
    .map((match) => match[1].trim())
    .filter((url) => url.startsWith(`${siteUrl}/`) || url === siteUrl)
    .slice(0, 10000);
}

async function main() {
  const sitemapResponse = await fetch(sitemapUrl, {
    headers: { "User-Agent": "ProntoDoc-IndexNow/1.0" },
  });

  if (!sitemapResponse.ok) {
    throw new Error(`Sitemap indisponível: ${sitemapResponse.status} ${sitemapResponse.statusText}`);
  }

  const urls = extractUrls(await sitemapResponse.text());
  if (!urls.length) throw new Error("Nenhuma URL encontrada no sitemap.");

  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(siteUrl).host,
      key,
      keyLocation: `${siteUrl}/${key}.txt`,
      urlList: urls,
    }),
  });

  if (![200, 202].includes(response.status)) {
    const detail = await response.text();
    throw new Error(`IndexNow recusou o envio (${response.status}): ${detail}`);
  }

  console.log(`IndexNow recebeu ${urls.length} URLs de ${siteUrl}.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

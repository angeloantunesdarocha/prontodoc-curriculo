import { guides } from "../guias/catalog";
import { CONTENT_UPDATED_AT, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "../site";

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, (character) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&apos;",
    '"': "&quot;",
  })[character] || character);
}

export async function GET() {
  const items = guides
    .map((guide) => {
      const url = `${SITE_URL}/guias/${guide.slug}`;
      return `
        <item>
          <title>${escapeXml(guide.title)}</title>
          <link>${url}</link>
          <guid isPermaLink="true">${url}</guid>
          <description>${escapeXml(guide.description)}</description>
          <category>${escapeXml(guide.category)}</category>
          <pubDate>${new Date(`${CONTENT_UPDATED_AT}T12:00:00-03:00`).toUTCString()}</pubDate>
        </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${SITE_NAME} — Guias</title>
        <link>${SITE_URL}/guias</link>
        <description>${escapeXml(SITE_DESCRIPTION)}</description>
        <language>pt-BR</language>
        <lastBuildDate>${new Date(`${CONTENT_UPDATED_AT}T12:00:00-03:00`).toUTCString()}</lastBuildDate>
        <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
        ${items}
      </channel>
    </rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

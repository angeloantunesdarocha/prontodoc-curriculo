import type { MetadataRoute } from "next";
import { guides } from "./guias/catalog";
import { CONTENT_UPDATED_AT, SITE_URL } from "./site";

const modified = new Date(CONTENT_UPDATED_AT);

const fixedPages: MetadataRoute.Sitemap = [
  { url: SITE_URL, lastModified: modified, changeFrequency: "weekly", priority: 1 },
  { url: `${SITE_URL}/guias`, lastModified: modified, changeFrequency: "weekly", priority: 0.95 },
  { url: `${SITE_URL}/guias/curriculo`, lastModified: modified, changeFrequency: "weekly", priority: 0.9 },
  { url: `${SITE_URL}/guias/entrevista`, lastModified: modified, changeFrequency: "weekly", priority: 0.9 },
  { url: `${SITE_URL}/guias/profissoes`, lastModified: modified, changeFrequency: "weekly", priority: 0.9 },
  { url: `${SITE_URL}/entrevista`, lastModified: modified, changeFrequency: "weekly", priority: 0.95 },
  { url: `${SITE_URL}/como-funciona`, lastModified: modified, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/sobre`, lastModified: modified, changeFrequency: "monthly", priority: 0.75 },
  { url: `${SITE_URL}/autor/angelo-antunes`, lastModified: modified, changeFrequency: "monthly", priority: 0.7 },
  { url: `${SITE_URL}/politica-editorial`, lastModified: modified, changeFrequency: "monthly", priority: 0.65 },
  { url: `${SITE_URL}/seguranca`, lastModified: modified, changeFrequency: "monthly", priority: 0.65 },
  { url: `${SITE_URL}/privacidade`, lastModified: modified, changeFrequency: "yearly", priority: 0.55 },
  { url: `${SITE_URL}/termos`, lastModified: modified, changeFrequency: "yearly", priority: 0.55 },
  { url: `${SITE_URL}/contato`, lastModified: modified, changeFrequency: "monthly", priority: 0.6 },
  { url: `${SITE_URL}/parcerias`, lastModified: modified, changeFrequency: "monthly", priority: 0.65 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...fixedPages,
    ...guides.map((guide) => ({
      url: `${SITE_URL}/guias/${guide.slug}`,
      lastModified: modified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

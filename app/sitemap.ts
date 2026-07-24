import type { MetadataRoute } from "next";
import { guides } from "./guias/data";

const baseUrl = "https://prontodoc-curriculo.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, lastModified: new Date("2026-07-24"), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/guias`, lastModified: new Date("2026-07-24"), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/entrevista`, lastModified: new Date("2026-07-24"), changeFrequency: "weekly", priority: 0.95 },
    ...guides.map((guide) => ({
      url: `${baseUrl}/guias/${guide.slug}`,
      lastModified: new Date("2026-07-24"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

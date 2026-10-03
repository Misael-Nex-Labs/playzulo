import type { MetadataRoute } from "next";
import { games } from "@/lib/games";

const siteUrl = "https://playzulo.vercel.app";

const categorySlugs = [
  "tocar-na-tela",
  "arrastar-e-soltar",
  "cores",
  "formas",
  "memoria",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/jogos`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/sobre`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/privacidade`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${siteUrl}/categorias/${slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const gameRoutes: MetadataRoute.Sitemap = games.map((game) => ({
    url: `${siteUrl}/jogos/${game.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [`${siteUrl}${game.image}`],
  }));

  return [...staticRoutes, ...categoryRoutes, ...gameRoutes];
}

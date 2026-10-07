import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PlayZulo — Jogos educativos e calmos para crianças",
    short_name: "PlayZulo",
    description:
      "Jogos educativos gratuitos, seguros e de baixa estimulação para crianças de 1 a 5 anos.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#fffcf5",
    theme_color: "#e0f7ff",
    orientation: "portrait-primary",
    categories: ["education", "kids", "games"],
    lang: "pt-BR",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Ver jogos",
        short_name: "Jogos",
        description: "Abrir a lista de jogos educativos calmos.",
        url: "/jogos",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Jogos para tocar",
        short_name: "Tocar",
        description: "Abrir jogos simples de toque e causa e efeito.",
        url: "/categorias/tocar",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
    ],
  };
}

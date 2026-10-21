import { Game } from "@/lib/games";

export const sunGame: Game = {
  id: "9",
  slug: "sol",
  title: "O Sol que Acorda",
  shortDescription: "Toque no sol para vê-lo brilhar no céu azul sereno.",
  fullDescription:
    "Um jogo de causa e efeito para crianças pequenas. Um sol acolhedor repousa em um céu azul suave. Ao tocar no sol, raios e brilhos aparecem com delicadeza, acompanhados por uma nota macia de madeira.\n\nA experiência incentiva a exploração e a coordenação motora em um ritmo tranquilo, sem pontuação, pressa ou estímulos agressivos.",
  category: "tocar",
  ageRange: "1-3 anos",
  icon: "Sun",
  color: "zen-yellow",
  image: "/images/sol.png",
  seo: {
    title: "O Sol que Acorda - Jogo Educativo Grátis para Crianças | PlayZulo",
    description:
      "Jogo educativo de causa e efeito para crianças de 1 a 3 anos. Toque no sol para ver raios suaves e ouvir uma nota de madeira, sem anúncios e sem pressa.",
    keywords: ["jogo do sol", "jogo de tocar", "jogo para bebês", "causa e efeito", "low-stim", "educativo grátis"],
  },
  faq: [
    {
      question: "Como a criança brinca com o sol?",
      answer: "Basta tocar no sol para ver raios suaves aparecerem e ouvir uma nota macia. A criança pode explorar livremente.",
    },
    {
      question: "O jogo tem pontuação ou tempo?",
      answer: "Não. É uma experiência de exploração sem cronômetro, pontuação ou pressão.",
    },
  ],
};

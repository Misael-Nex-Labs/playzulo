import { games } from "@/lib/games";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import GameView from "./game-view";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return games.map((game) => ({
    slug: game.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = games.find((g) => g.slug === slug);

  if (!game) return {};

  return {
    title: `${game.seo.title}`,
    description: game.seo.description,
    keywords: game.seo.keywords,
    openGraph: {
      title: game.seo.title,
      description: game.seo.description,
      type: "website",
    },
  };
}

export default async function GamePage({ params }: Props) {
  const { slug } = await params;
  const game = games.find((g) => g.slug === slug);

  if (!game) {
    notFound();
  }

  // Pegar 2 outros jogos aleatórios para a seção "Mais Jogos"
  const otherGames = games
    .filter((g) => g.slug !== slug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);

  return <GameView game={game} otherGames={otherGames} />;
}

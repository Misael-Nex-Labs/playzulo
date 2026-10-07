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

  const gameUrl = `/jogos/${game.slug}`;

  return {
    title: game.seo.title,
    description: game.seo.description,
    keywords: game.seo.keywords,
    alternates: {
      canonical: gameUrl,
    },
    openGraph: {
      title: game.seo.title,
      description: game.seo.description,
      url: gameUrl,
      type: "website",
      images: [
        {
          url: game.image,
          alt: `${game.title} no PlayZulo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: game.seo.title,
      description: game.seo.description,
      images: [game.image],
    },
  };
}

export default async function GamePage({ params }: Props) {
  const { slug } = await params;
  const game = games.find((g) => g.slug === slug);

  if (!game) {
    notFound();
  }

  const currentIndex = games.findIndex((g) => g.slug === slug);
  const otherGames = games
    .filter((g) => g.slug !== slug)
    .sort((a, b) => {
      const distanceA = (games.findIndex((g) => g.slug === a.slug) - currentIndex + games.length) % games.length;
      const distanceB = (games.findIndex((g) => g.slug === b.slug) - currentIndex + games.length) % games.length;
      return distanceA - distanceB;
    })
    .slice(0, 2);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: game.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <GameView game={game} otherGames={otherGames} />
    </>
  );
}

import { games } from "@/lib/games";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Gamepad2 } from "lucide-react";
import { notFound } from "next/navigation";

const categories = [
  {
    slug: "tocar-na-tela",
    title: "Jogos de tocar na tela",
    eyebrow: "Causa e efeito",
    description:
      "Atividades simples para a criança tocar, observar uma resposta suave e explorar no próprio ritmo.",
    gameSlugs: ["tocar-nas-bolhas", "o-jardim-que-acorda"],
  },
  {
    slug: "arrastar-e-soltar",
    title: "Jogos de arrastar e soltar",
    eyebrow: "Coordenação motora",
    description:
      "Jogos calmos para praticar movimentos de arrastar, encaixar e reconhecer relações visuais sem pressa.",
    gameSlugs: ["arrastar-formas"],
  },
  {
    slug: "cores",
    title: "Jogos de cores",
    eyebrow: "Vocabulário visual",
    description:
      "Experiências em tons pastéis para conhecer cores de um jeito tranquilo e seguro.",
    gameSlugs: ["cores-dos-bichinhos"],
  },
  {
    slug: "formas",
    title: "Jogos de formas",
    eyebrow: "Primeiras formas",
    description:
      "Atividades de reconhecimento de círculos, quadrados e triângulos com feedback visual suave.",
    gameSlugs: ["arrastar-formas"],
  },
  {
    slug: "memoria",
    title: "Jogos de memória",
    eyebrow: "Atenção e concentração",
    description:
      "Jogos de observação e pares, sem cronômetro, pontuação competitiva ou pressão para acertar rápido.",
    gameSlugs: ["memoria-dos-bichinhos"],
  },
] as const;

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);

  if (!category) return {};

  return {
    title: `${category.title} grátis | PlayZulo`,
    description: `${category.description} Jogos educativos gratuitos, seguros e de baixa estimulação para crianças de 1 a 5 anos.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryGames = category.gameSlugs
    .map((gameSlug) => games.find((game) => game.slug === gameSlug))
    .filter((game): game is (typeof games)[number] => Boolean(game));

  return (
    <div className="min-h-screen bg-zen-bg text-zen-gray font-sans pb-24">
      <nav className="w-full px-6 py-8 flex items-center justify-between max-w-6xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-zen-gray/60 hover:text-zen-gray transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-[1.02] transition-transform duration-500">
            <ArrowLeft size={16} />
          </div>
          Início
        </Link>
        <div className="flex items-center gap-6 text-sm font-bold opacity-80">
          <Link href="/jogos" className="hover:text-zen-green transition-colors">Jogos</Link>
          <Link href="/sobre" className="hover:text-zen-green transition-colors">Sobre</Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-12 space-y-14">
        <header className="text-center space-y-5 max-w-3xl mx-auto">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-zen-green-dark">
            {category.eyebrow}
          </p>
          <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight">
            {category.title}
          </h1>
          <p className="text-lg md:text-xl font-medium opacity-80 leading-relaxed">
            {category.description}
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categoryGames.map((game) => (
            <article
              key={game.slug}
              className="bg-white rounded-[3rem] overflow-hidden shadow-sm border-2 border-white hover:border-zen-cream transition-colors duration-500"
            >
              <div className="aspect-video relative overflow-hidden bg-zen-cream/30">
                <Image
                  src={game.image}
                  alt={game.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 520px"
                  className="object-cover"
                />
                <div className="absolute left-4 top-4 bg-white/90 px-4 py-1 rounded-full text-sm font-black">
                  {game.ageRange}
                </div>
              </div>
              <div className="p-8 space-y-4">
                <h2 className="text-2xl font-black font-display">{game.title}</h2>
                <p className="font-medium opacity-80 leading-relaxed">{game.shortDescription}</p>
                <Link
                  href={`/jogos/${game.slug}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-zen-green px-6 py-4 font-black text-white transition-colors duration-500 hover:bg-zen-green-dark"
                >
                  Jogar agora <Gamepad2 size={20} />
                </Link>
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-[3rem] bg-white/70 border border-white p-8 md:p-10 text-center space-y-4">
          <h2 className="text-2xl font-black font-display">Quer ver todos juntos?</h2>
          <p className="font-medium opacity-80 max-w-2xl mx-auto">
            A coleção completa reúne jogos de toque, formas, cores e memória em um só lugar.
          </p>
          <Link
            href="/jogos"
            className="inline-flex items-center justify-center rounded-full bg-zen-cream px-8 py-4 font-black transition-colors duration-500 hover:bg-zen-yellow"
          >
            Ver todos os jogos
          </Link>
        </section>
      </main>
    </div>
  );
}

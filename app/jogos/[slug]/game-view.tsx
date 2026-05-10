"use client";

import { motion } from "framer-motion";
import { Game } from "@/lib/games";
import Link from "next/link";
import { 
  ChevronRight, 
  Play, 
  Gamepad2, 
  User, 
  Clock, 
  MessageCircleQuestion,
  ArrowLeft,
  Pointer,
  Move,
  Palette,
  Shapes,
  Brain,
  Flower
} from "lucide-react";
import React, { useState } from "react";
import TocarNasBolhas from "@/components/games/TocarNasBolhas";
import { soundManager } from "@/lib/sounds";

// Mapeamento de ícones do games.ts para componentes Lucide
const iconMap: Record<string, any> = {
  Pointer,
  Move,
  Palette,
  Shapes,
  Brain,
  Flower
};

interface GameViewProps {
  game: Game;
  otherGames: Game[];
}

export default function GameView({ game, otherGames }: GameViewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const GameIcon = iconMap[game.icon] || Gamepad2;

  // Mapa de componentes de jogo reais
  const gameComponents: Record<string, React.ReactNode> = {
    'tocar-nas-bolhas': <TocarNasBolhas />,
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-zen-bg text-zen-gray font-sans pb-20"
    >
      {/* Breadcrumb e Voltar */}
      <nav className="max-w-4xl mx-auto px-6 py-6 flex flex-col gap-4">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-bold opacity-60 hover:opacity-100 transition-opacity"
        >
          <ArrowLeft size={16} />
          Voltar para o início
        </Link>
        
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-40">
          <Link href="/" className="hover:underline">Home</Link>
          <ChevronRight size={12} />
          <Link href="/jogos" className="hover:underline">Jogos</Link>
          <ChevronRight size={12} />
          <span className="text-zen-green-dark">{game.title}</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 space-y-12">
        {/* Header do Jogo */}
        <header className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-1.5 bg-white border-2 border-zen-green/30 rounded-full text-xs font-extrabold uppercase tracking-tighter text-zen-green-dark">
              {game.category}
            </span>
            <span className="px-4 py-1.5 bg-white border-2 border-zen-pink/30 rounded-full text-xs font-extrabold uppercase tracking-tighter text-zen-pink">
              {game.ageRange}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold font-display leading-tight">
            {game.title}
          </h1>
        </header>

        {/* Área do Jogo */}
        <section className="relative group">
          <div className="aspect-[4/3] md:aspect-video bg-white rounded-[2.5rem] shadow-sm border-4 border-white flex flex-col items-center justify-center p-8 text-center gap-8 overflow-hidden relative">
            {isPlaying && gameComponents[game.slug] ? (
              <div className="absolute inset-0 w-full h-full z-20">
                {gameComponents[game.slug]}
              </div>
            ) : (
              <>
                {/* Background Decorativo Suave */}
                <div 
                  className="absolute inset-0 opacity-10" 
                  style={{ backgroundColor: `var(--color-${game.color})` }}
                />
                
                <div 
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center animate-pulse"
                  style={{ 
                    backgroundColor: `var(--color-${game.color})`,
                    opacity: 0.3,
                    color: `var(--color-zen-gray)`
                  }}
                >
                  <GameIcon size={64} />
                </div>

                <button 
                  className="relative z-10 text-white px-12 py-6 rounded-full text-2xl font-extrabold flex items-center gap-4 shadow-xl hover:scale-105 transition-transform active:scale-95 border-b-4"
                  style={{ 
                    backgroundColor: `var(--color-${game.color})`,
                    borderColor: `var(--color-${game.color}-dark)`
                  }}
                  onClick={() => {
                    soundManager.unlock();
                    setIsPlaying(true);
                  }}
                >
                  <Play size={32} fill="currentColor" />
                  Clique para Iniciar
                </button>
                
                <p className="text-sm opacity-50 font-bold max-w-xs relative z-10">
                  Ambiente seguro: sem anúncios, sem compras e totalmente gratuito.
                </p>
              </>
            )}
          </div>
        </section>

        {/* Descrição e Conteúdo SEO */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-extrabold font-display">Sobre o Jogo</h2>
            <div className="space-y-4 text-lg leading-relaxed opacity-90">
              {game.fullDescription.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          <aside className="bg-white/50 rounded-[2rem] p-8 space-y-6 self-start">
            <h3 className="text-lg font-extrabold flex items-center gap-2">
              <Clock size={20} className="text-zen-green-dark" />
              Info Rápida
            </h3>
            <ul className="space-y-4 text-sm font-bold">
              <li className="flex flex-col gap-1">
                <span className="opacity-40 uppercase text-[10px]">Público-alvo</span>
                <span>Crianças de {game.ageRange}</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="opacity-40 uppercase text-[10px]">Habilidade</span>
                <span>{game.category.charAt(0).toUpperCase() + game.category.slice(1)}</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="opacity-40 uppercase text-[10px]">Estimulação</span>
                <span className="text-zen-green-dark">Baixa (Low-Stim)</span>
              </li>
            </ul>
          </aside>
        </section>

        {/* FAQ Section */}
        {game.faq.length > 0 && (
          <section className="space-y-8 pt-12">
            <div className="flex items-center gap-3 text-zen-gray/60">
              <MessageCircleQuestion size={28} />
              <h2 className="text-2xl font-extrabold font-display">Dúvidas Frequentes</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {game.faq.map((item, i) => (
                <div key={i} className="bg-white rounded-[1.5rem] p-6 md:p-8 space-y-3 shadow-sm border-2 border-transparent hover:border-zen-cream transition-colors">
                  <h4 className="text-lg font-extrabold text-zen-gray">{item.question}</h4>
                  <p className="opacity-80 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Mais Jogos (Random) */}
        <section className="pt-20 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold font-display">Mais Jogos Calmos</h2>
            <Link href="/jogos" className="text-sm font-bold text-zen-green-dark hover:underline flex items-center gap-1">
              Ver todos
              <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherGames.map((other) => (
              <Link 
                key={other.slug}
                href={`/jogos/${other.slug}`}
                className="group bg-white rounded-[2rem] p-6 flex items-center gap-6 shadow-sm hover:shadow-md transition-all hover:translate-y-[-2px] border-2 border-white hover:border-zen-cream"
              >
                <div className={`w-16 h-16 rounded-2xl bg-zen-bg flex items-center justify-center text-zen-gray group-hover:scale-110 transition-transform`}>
                  {(() => {
                    const Icon = iconMap[other.icon] || Gamepad2;
                    return <Icon size={32} />;
                  })()}
                </div>
                <div className="flex-1">
                  <h4 className="font-extrabold group-hover:text-zen-green-dark transition-colors">{other.title}</h4>
                  <p className="text-xs opacity-50">{other.ageRange}</p>
                </div>
                <ChevronRight className="opacity-20 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </motion.div>
  );
}

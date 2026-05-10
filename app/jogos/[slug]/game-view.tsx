"use client";

import { Game } from "@/lib/games";
import { 
  ArrowLeft, 
  Gamepad2, 
  MousePointer2, 
  Sprout, 
  Shapes, 
  Palette, 
  Brain,
  Play,
  Clock,
  User,
  ShieldCheck,
  ChevronRight,
  Heart
} from "lucide-react";
import React, { useState } from "react";
import TocarNasBolhas from "@/components/games/TocarNasBolhas";
import { soundManager } from "@/lib/sounds";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface GameViewProps {
  game: Game;
  otherGames: Game[];
}

// Mapeamento de ícones do games.ts para componentes Lucide
const iconMap: Record<string, any> = {
  'MousePointer2': MousePointer2,
  'Sprout': Sprout,
  'Shapes': Shapes,
  'Palette': Palette,
  'Brain': Brain,
};

export default function GameView({ game, otherGames }: GameViewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const GameIcon = iconMap[game.icon] || Gamepad2;

  // Mapa de componentes de jogo reais
  const gameComponents: Record<string, React.ReactNode> = {
    'tocar-nas-bolhas': <TocarNasBolhas />,
  };

  return (
    <div className="min-h-screen bg-zen-bg text-zen-gray font-sans pb-20 overflow-x-hidden">
      {/* Background Decorativo Dinâmico */}
      <div className="fixed inset-0 pointer-events-none opacity-20 overflow-hidden z-0">
        <div 
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[100px]" 
          style={{ backgroundColor: `var(--color-${game.color})` }}
        />
        <div 
          className="absolute top-1/2 -left-24 w-64 h-64 rounded-full blur-[80px]" 
          style={{ backgroundColor: `var(--color-${game.color})` }}
        />
      </div>

      <nav className="max-w-6xl mx-auto px-6 py-8 relative z-10">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-bold text-zen-gray/60 hover:text-zen-gray transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <ArrowLeft size={16} />
          </div>
          Voltar para Início
        </Link>
      </nav>

      <main className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={isMounted ? { opacity: 0, y: 15 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-8"
        >
          {/* Header do Jogo */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
            <div className="space-y-3">
              <div className="flex gap-2">
                <span className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-black uppercase tracking-wider bg-white shadow-sm border border-black/5`}>
                  <span className="opacity-50 mr-1">Fase:</span>
                  {game.category}
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] md:text-xs font-black uppercase tracking-wider bg-white shadow-sm border border-black/5">
                   <span className="opacity-50 mr-1">Idade:</span>
                   {game.ageRange}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight leading-tight text-zen-gray">
                {game.title}
              </h1>
            </div>
            
            <div className="hidden md:flex items-center gap-4 bg-white/50 backdrop-blur-sm p-4 rounded-3xl border border-white">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-zen-cream flex items-center justify-center text-[10px]">👶</div>
                ))}
              </div>
              <p className="text-xs font-bold opacity-60">+1.2k crianças jogaram hoje</p>
            </div>
          </header>

          {/* Área do Jogo com Glassmorphism Premium */}
          <section className="relative w-full aspect-[4/5] md:aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-[8px] md:border-[12px] border-white bg-white/40 backdrop-blur-md group">
            <AnimatePresence mode="wait">
              {isPlaying && gameComponents[game.slug] ? (
                <motion.div 
                  key="game-canvas"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 w-full h-full z-20"
                >
                  {gameComponents[game.slug]}
                </motion.div>
              ) : (
                <motion.div 
                  key="start-screen"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-8 gap-4 md:gap-8 overflow-hidden"
                >
                  {/* Imagem de Fundo Suave */}
                  <div className="absolute inset-0 z-0">
                    <Image 
                      src={game.image} 
                      alt={game.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 800px"
                      priority
                      className="object-cover opacity-20 blur-md scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/20" />
                  </div>

                  {/* Elemento Central Pulsante */}
                  <div className="relative z-10 flex flex-col items-center gap-6">
                    <motion.div 
                      animate={{ 
                        y: [0, -5, 0],
                        scale: [1, 1.02, 1]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="w-20 h-20 md:w-40 md:h-40 rounded-full flex items-center justify-center shadow-xl relative"
                      style={{ 
                        backgroundColor: `var(--${game.color})`,
                      }}
                    >
                      <div className="absolute inset-0 rounded-full border-4 border-white/40 animate-ping opacity-20" />
                      <GameIcon className="w-10 h-10 md:w-20 md:h-20 text-white drop-shadow-md" />
                    </motion.div>

                    <div className="text-center space-y-2">
                      <p className="text-lg md:text-xl font-bold text-zen-gray/80 max-w-sm px-4">
                        {game.shortDescription}
                      </p>
                    </div>

                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative z-50 text-white px-6 md:px-12 py-3 md:py-6 rounded-full text-base md:text-2xl font-black flex items-center gap-2 md:gap-4 shadow-2xl transition-all cursor-pointer border-b-4 md:border-b-8 group"
                      style={{ 
                        backgroundColor: `var(--${game.color})`,
                        borderColor: `var(--${game.color}-dark)`,
                        touchAction: "manipulation"
                      }}
                      onTap={() => {
                        setIsPlaying(true);
                        try {
                          soundManager.unlock();
                        } catch (e) {}
                      }}
                    >
                      <div className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-zen-gray transition-colors">
                        <Play className="w-3 h-3 md:w-6 md:h-6" fill="currentColor" />
                      </div>
                      <span className="drop-shadow-sm">JOGAR AGORA</span>
                    </motion.button>
                  </div>
                  
                  {/* Rodapé da tela inicial */}
                  <div className="absolute bottom-6 md:bottom-10 flex gap-4 md:gap-8 z-10 opacity-30 scale-90 md:scale-100">
                    <div className="flex items-center gap-2 text-[10px] md:text-xs font-black"><ShieldCheck size={14}/> SEGURO</div>
                    <div className="flex items-center gap-2 text-[10px] md:text-xs font-black"><Clock size={14}/> SEM PRESSÃO</div>
                    <div className="flex items-center gap-2 text-[10px] md:text-xs font-black text-zen-green"><Heart size={14}/> GRÁTIS</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Informações de SEO e Descrição */}
          <section className="grid md:grid-cols-3 gap-12 mt-12">
            <div className="md:col-span-2 space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-black flex items-center gap-2">
                  <div className="w-2 h-8 rounded-full bg-zen-green" />
                  Sobre o Jogo
                </h2>
                <div className="text-lg leading-relaxed text-zen-gray/80 whitespace-pre-line font-medium">
                  {game.fullDescription}
                </div>
              </div>

              {/* FAQ Section */}
              <div className="space-y-6 pt-8 border-t border-zen-gray/10">
                <h3 className="text-xl font-black">Dúvidas Comuns</h3>
                <div className="grid gap-4">
                  {game.faq.map((item, i) => (
                    <div key={i} className="bg-white/50 p-6 rounded-3xl border border-white">
                      <h4 className="font-black text-zen-gray mb-2">{item.question}</h4>
                      <p className="text-sm opacity-80">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-8">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm space-y-6 border border-black/5">
                <h3 className="font-black text-xl">Mais Jogos</h3>
                <div className="grid gap-4">
                  {otherGames.slice(0, 3).map(other => (
                    <Link 
                      key={other.slug} 
                      href={`/jogos/${other.slug}`}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-16 h-16 rounded-2xl overflow-hidden relative flex-shrink-0">
                        <Image 
                          src={other.image} 
                          alt={other.title} 
                          fill 
                          sizes="64px"
                          className="object-cover group-hover:scale-110 transition-transform" 
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm leading-tight group-hover:text-zen-green transition-colors">{other.title}</h4>
                        <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">{other.ageRange}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link 
                  href="/jogos"
                  className="flex items-center justify-center gap-2 py-4 bg-zen-bg rounded-2xl text-xs font-black uppercase hover:bg-zen-cream transition-colors"
                >
                  Ver Todos os Jogos <ChevronRight size={14}/>
                </Link>
              </div>
            </aside>
          </section>
        </motion.div>
      </main>
    </div>
  );
}

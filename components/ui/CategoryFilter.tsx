"use client";

import { useState } from "react";
import { Game } from "@/lib/games";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";

interface CategoryFilterProps {
  games: Game[];
}

const CATEGORIES = ["Todos", "Tocar", "Arrastar", "Cores", "Formas", "Memória"];

export default function CategoryFilter({ games }: CategoryFilterProps) {
  const [selected, setSelected] = useState<string>("Todos");

  const filteredGames = selected === "Todos"
    ? games
    : games.filter((g) => g.category.toLowerCase() === selected.toLowerCase());

  return (
    <div className="space-y-12">
      {/* Botões de Filtro */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${
              selected === cat
                ? "bg-zen-green text-white shadow-md scale-105"
                : "bg-white text-zen-gray/60 hover:bg-zen-cream hover:text-zen-gray shadow-sm border-2 border-transparent hover:border-zen-green/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de Jogos */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredGames.map((game, index) => (
            <motion.div
              layout
              key={game.slug}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="h-full"
            >
              <Link 
                href={`/jogos/${game.slug}`}
                className="flex flex-col h-full bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group hover:-translate-y-2 border-4 border-transparent hover:border-white"
                style={{ backgroundColor: `var(--${game.color})` }}
              >
                {/* Imagem do Card */}
                <div className="relative aspect-video w-full overflow-hidden bg-white/20">
                  <Image 
                    src={game.image} 
                    alt={game.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-zen-gray shadow-sm">
                    {game.ageRange}
                  </div>
                </div>

                {/* Conteúdo do Card */}
                <div className="p-8 flex flex-col flex-grow bg-white/40 backdrop-blur-sm">
                  <h3 className="text-2xl font-black font-display text-zen-gray mb-3 leading-tight group-hover:text-zen-green-dark transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-sm font-medium text-zen-gray/80 mb-6 flex-grow leading-relaxed">
                    {game.shortDescription}
                  </p>
                  
                  {/* Botão de Ação Suave */}
                  <div className="flex items-center gap-3 text-sm font-black uppercase tracking-wider text-white bg-black/10 px-6 py-4 rounded-full group-hover:bg-white group-hover:text-zen-gray transition-colors self-start shadow-sm group-hover:shadow-md">
                    <Play size={16} fill="currentColor" /> Jogar
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredGames.length === 0 && (
        <div className="text-center py-20 opacity-50">
          <p className="text-xl font-bold">Nenhum jogo encontrado nesta categoria.</p>
        </div>
      )}
    </div>
  );
}

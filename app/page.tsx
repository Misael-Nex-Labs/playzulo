"use client";

import { motion, Variants } from "framer-motion";
import { 
  Pointer, 
  Move, 
  Palette, 
  Shapes, 
  Brain, 
  ArrowRight, 
  Gamepad2, 
  Heart 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Variantes de animação do AGENTS.md
const cardVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: "blur(5px)"
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0)",
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const tapEffect: Variants = {
  tap: {
    scale: 0.98,
    rotate: 1,
    transition: {
      duration: 0.1
    }
  }
};

const categories = [
  { name: "Tocar na Tela", slug: "tocar-na-tela", icon: Pointer, color: "bg-zen-blue" },
  { name: "Arrastar e Soltar", slug: "arrastar-e-soltar", icon: Move, color: "bg-zen-green" },
  { name: "Cores", slug: "cores", icon: Palette, color: "bg-zen-yellow" },
  { name: "Formas", slug: "formas", icon: Shapes, color: "bg-zen-pink" },
  { name: "Memória", slug: "memoria", icon: Brain, color: "bg-zen-cream" },
];

const featuredGames = [
  {
    title: "Bolhas de Sabão",
    slug: "bolhas-de-sabao",
    ageRange: "1-3 anos",
    image: "https://images.unsplash.com/photo-1518173946687-a4c8a9b749f5?w=400&h=300&fit=crop",
    color: "zen-blue"
  },
  {
    title: "Pintura Zen",
    slug: "pintura-zen",
    ageRange: "2-5 anos",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop",
    color: "zen-green"
  },
  {
    title: "Onde Está o Som?",
    slug: "onde-esta-o-som",
    ageRange: "1-4 anos",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop",
    color: "zen-yellow"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zen-bg text-zen-gray font-sans overflow-x-hidden">
      {/* Header */}
      <header className="w-full py-8 px-6 md:px-12 flex flex-col items-center text-center gap-2">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex items-center"
        >
          <Link href="/">
            <Image 
              src="/logo.png" 
              alt="PlayZulo Logo" 
              width={320} 
              height={120} 
              priority
              className="h-auto w-auto max-h-32 object-contain"
            />
          </Link>
        </motion.div>
        <p className="text-lg font-regular opacity-80 max-w-md">
          Jogos educativos e calmos para crianças pequenas
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24 flex flex-col items-center text-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-5xl font-bold md:text-6xl text-zen-gray leading-tight">
              Jogos gratuitos <br/> para crianças
            </h2>
            <p className="text-xl font-regular md:text-2xl opacity-90 max-w-2xl mx-auto leading-relaxed">
              Ambiente seguro, sem anúncios agitados e focado no aprendizado suave. 
              Feito com carinho para bebês e crianças de 1 a 5 anos.
            </p>
          </motion.div>

          <motion.div
            whileTap="tap"
            variants={tapEffect}
          >
            <Link 
              href="/jogos" 
              className="bg-zen-green text-zen-bg px-10 py-5 rounded-full text-xl font-bold flex items-center gap-3 shadow-md hover:shadow-lg hover:text-white transition-all border-b-4 border-zen-green-dark"
            >
              Ver todos os jogos
              <ArrowRight size={24} />
            </Link>
          </motion.div>
        </section>

        {/* Categories Section */}
        <section className="py-16 space-y-10">
          <div className="flex items-center gap-4">
            <div className="h-1 w-12 bg-zen-yellow rounded-full" />
            <h3 className="text-2xl font-bold uppercase tracking-widest text-zen-gray/60">Categorias</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.slug}
                variants={cardVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link 
                  href={`/categorias/${cat.slug}`}
                  className="group flex flex-col items-center p-6 rounded-[2.5rem] bg-white border-2 border-transparent hover:border-zen-green transition-all hover:translate-y-[-4px] shadow-sm"
                >
                  <div 
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${cat.color}`}
                  >
                    <cat.icon size={32} className="text-zen-gray" />
                  </div>
                  <span className="font-extrabold text-center leading-tight">{cat.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Games Section */}
        <section className="py-16 space-y-10">
          <div className="flex items-center gap-4">
            <div className="h-1 w-12 bg-zen-pink rounded-full" />
            <h3 className="text-2xl font-bold uppercase tracking-widest text-zen-gray/60">Destaques</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredGames.map((game, idx) => (
              <motion.div
                key={game.slug}
                variants={cardVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="group bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow border-2 border-white hover:border-zen-cream"
              >
                <div className="aspect-video relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={game.image} 
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-bold">
                    {game.ageRange}
                  </div>
                </div>
                <div className="p-8 space-y-4">
                  <h4 className="text-2xl font-extrabold text-zen-gray font-display">{game.title}</h4>
                  <p className="text-sm opacity-80 leading-relaxed">
                    Um jogo calmo e interativo projetado especialmente para diversão sem estímulo exagerado.
                  </p>
                  <Link 
                    href={`/jogos/${game.slug}`}
                    className="inline-flex items-center justify-center w-full py-4 bg-zen-cream text-zen-gray rounded-2xl font-bold hover:bg-zen-yellow transition-colors gap-2"
                  >
                    Jogar agora
                    <Gamepad2 size={20} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-6 border-t border-zen-gray/10 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2 font-bold text-zen-gray">
              <Image 
                src="/zulo_symbol.png" 
                alt="Zulo Symbol" 
                width={24} 
                height={24} 
                className="w-6 h-6 object-contain"
              />
              PlayZulo © 2024
            </div>
            <p className="text-sm opacity-60">Feito com carinho para crianças pequenas.</p>
          </div>
          
          <div className="flex gap-8 font-bold text-zen-gray/80">
            <Link href="/sobre" className="hover:text-zen-green-dark transition-colors">Sobre</Link>
            <Link href="/privacidade" className="hover:text-zen-green-dark transition-colors">Privacidade</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

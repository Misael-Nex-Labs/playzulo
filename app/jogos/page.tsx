import { Metadata } from "next";
import { games } from "@/lib/games";
import CategoryFilter from "@/components/ui/CategoryFilter";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Jogos Educativos Gratuitos para Crianças | PlayZulo",
  description: "Explore nossa coleção de jogos de baixa estimulação. Seguros, educativos e desenhados para bebês e crianças de 1 a 5 anos.",
};

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-zen-bg text-zen-gray font-sans pb-24">
      {/* Navbar Minimalista */}
      <nav className="w-full px-6 py-8 flex items-center justify-between max-w-6xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-bold text-zen-gray/60 hover:text-zen-gray transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <ArrowLeft size={16} />
          </div>
          Início
        </Link>
        <div className="flex items-center gap-6 text-sm font-bold opacity-80">
          <Link href="/jogos" className="hover:text-zen-green transition-colors text-zen-green">Jogos</Link>
          <Link href="/sobre" className="hover:text-zen-green transition-colors">Sobre</Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto space-y-16 px-6 pt-12">
        
        {/* Header da Página */}
        <header className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-black font-display text-zen-gray tracking-tight">
            Todos os Jogos
          </h1>
          <p className="text-lg md:text-xl font-medium opacity-80 max-w-2xl mx-auto">
            Jogos educativos gratuitos para crianças de 1 a 5 anos. <br className="hidden md:block"/>
            Sem anúncios, sem pressão, focados no aprendizado suave.
          </p>
        </header>

        {/* Componente Client-Side de Filtro e Grid */}
        <section>
          <CategoryFilter games={games} />
        </section>

        {/* Banner "Em Breve" */}
        <section className="bg-zen-pink/10 border-2 border-zen-pink/20 rounded-[3rem] p-8 md:p-12 text-center space-y-4">
          <h3 className="text-2xl font-black font-display text-zen-gray">Novidades a caminho! 🚀</h3>
          <p className="text-lg font-medium opacity-80 max-w-2xl mx-auto">
            Em breve lançaremos uma nova coleção de jogos focados em <strong>alfabetização, números, inglês e vocabulário</strong>. Fique de olho!
          </p>
        </section>

      </main>
    </div>
  );
}

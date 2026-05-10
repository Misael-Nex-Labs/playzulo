import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Heart, ShieldCheck, Sparkles, Brain } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre Nós | PlayZulo",
  description: "Descubra a filosofia por trás do PlayZulo: criar um ambiente digital seguro e de baixa estimulação para bebês e crianças pequenas.",
};

export default function SobrePage() {
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
          <Link href="/jogos" className="hover:text-zen-green transition-colors">Jogos</Link>
          <Link href="/sobre" className="hover:text-zen-green transition-colors text-zen-green">Sobre</Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto space-y-16 px-6 pt-12">
        {/* Header da Página */}
        <header className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zen-pink/20 text-zen-pink mb-4">
            <Heart size={32} fill="currentColor" />
          </div>
          <h1 className="text-5xl md:text-6xl font-semibold font-display text-zen-gray tracking-tight">
            O Manifesto PlayZulo
          </h1>
          <p className="text-xl md:text-2xl font-medium opacity-80 max-w-2xl mx-auto leading-relaxed">
            Acreditamos que o primeiro contato da criança com a tecnologia deve ser um momento de calma, descoberta e segurança.
          </p>
        </header>

        {/* Seções de Conteúdo */}
        <div className="space-y-12">
          
          <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-black/5 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-zen-blue/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <h2 className="text-3xl font-black font-display flex items-center gap-3">
              <Sparkles className="text-zen-blue" size={28} /> 
              Por que "Baixa Estimulação"?
            </h2>
            <div className="text-lg opacity-80 space-y-4 leading-relaxed font-medium">
              <p>
                A internet está cheia de jogos frenéticos, com cores neon piscantes, sirenes e uma chuva de estímulos desenhados para viciar a mente infantil. Isso pode causar irritabilidade e sobrecarga sensorial em bebês e crianças pequenas (1 a 5 anos).
              </p>
              <p>
                O PlayZulo vai na direção oposta. Nós adotamos o "Manifesto Zen": paletas de cores pastéis, sons suaves de madeira ou sinos, e interações lentas. A ideia não é prender a criança por horas, mas sim oferecer alguns minutos de aprendizado de causa-e-efeito com total tranquilidade.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-black/5 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-zen-green/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/4 pointer-events-none" />
            <h2 className="text-3xl font-black font-display flex items-center gap-3">
              <ShieldCheck className="text-zen-green" size={28} /> 
              Segurança em Primeiro Lugar
            </h2>
            <div className="text-lg opacity-80 space-y-4 leading-relaxed font-medium">
              <p>
                Como pais e criadores, sabemos o quão assustador é deixar uma criança de 2 anos segurar um celular. Por isso, construímos regras inegociáveis para o PlayZulo:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Livre de Interrupções Intrusivas:</strong> Odiamos pop-ups e sirenes tanto quanto você. Nosso ambiente é pensado para não ter botões enganosos, garantindo que cliques acidentais não tirem seu filho do jogo abruptamente.</li>
                <li><strong>Zero Pressão:</strong> Não existem "vidas", "game over", contadores de tempo ou placares competitivos. A criança joga no próprio ritmo.</li>
                <li><strong>100% Gratuito:</strong> Queremos que qualquer criança possa ter acesso a um ambiente digital saudável e seguro para brincar.</li>
              </ul>
            </div>
          </section>

          <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-black/5 space-y-6 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-zen-yellow/20 rounded-full blur-3xl translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <h2 className="text-3xl font-black font-display flex items-center gap-3">
              <Brain className="text-zen-yellow" size={28} /> 
              Foco no Desenvolvimento
            </h2>
            <div className="text-lg opacity-80 space-y-4 leading-relaxed font-medium">
              <p>
                Cada jogo é desenhado com um propósito simples. Seja entender que "tocar na tela estoura a bolha" (causa e efeito), seja aprender as cores básicas ou associar formas.
              </p>
              <p>
                Nosso maior objetivo é que, ao desligar a tela, a criança volte para o mundo real calma e curiosa, pronta para brincar com seus brinquedos físicos.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-black/5 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-zen-pink/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <h2 className="text-3xl font-black font-display flex items-center gap-3">
              <Sparkles className="text-zen-pink" size={28} /> 
              O Que Vem Por Aí?
            </h2>
            <div className="text-lg opacity-80 space-y-4 leading-relaxed font-medium">
              <p>
                O PlayZulo está apenas começando! Em breve, adicionaremos uma nova categoria focada em <strong>jogos educativos estruturados</strong>, criados para apoiar a fase pré-escolar, sempre mantendo a nossa essência de baixa estimulação.
              </p>
              <p>
                Prepare-se para ver por aqui atividades interativas de <strong>alfabetização, primeiros números, inglês básico e expansão de vocabulário</strong>. Tudo pensado com muito carinho para crescer junto com seu filho.
              </p>
            </div>
          </section>

        </div>

        {/* CTA */}
        <div className="text-center pt-12">
          <Link 
            href="/jogos" 
            className="inline-flex items-center gap-3 px-10 py-5 bg-zen-green text-white rounded-full font-black text-xl hover:scale-105 transition-transform shadow-lg border-b-4 border-zen-green-dark"
          >
            Conhecer os Jogos <ArrowLeft size={20} className="rotate-180" />
          </Link>
        </div>

      </main>
    </div>
  );
}

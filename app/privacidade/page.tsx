import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Baby, Cookie, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacidade | PlayZulo",
  description:
    "Política de privacidade do PlayZulo: jogos infantis gratuitos, sem login, sem anúncios e sem coleta intencional de dados pessoais de crianças.",
};

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-zen-bg text-zen-gray font-sans pb-24">
      <nav className="w-full px-6 py-8 flex items-center justify-between max-w-5xl mx-auto">
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

      <main className="max-w-4xl mx-auto px-6 pt-12 space-y-12">
        <header className="text-center space-y-6">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-zen-blue/60 text-zen-gray">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight">
            Privacidade simples e clara
          </h1>
          <p className="text-lg md:text-xl font-medium opacity-80 leading-relaxed">
            O PlayZulo foi pensado para crianças pequenas e para famílias que querem uma experiência calma, gratuita e sem distrações comerciais.
          </p>
        </header>

        <div className="grid gap-6">
          <section className="rounded-[3rem] bg-white p-8 md:p-10 shadow-sm border border-black/5 space-y-4">
            <h2 className="text-2xl font-black font-display flex items-center gap-3">
              <Baby className="text-zen-pink" size={28} />
              Dados de crianças
            </h2>
            <p className="text-lg font-medium leading-relaxed opacity-80">
              O PlayZulo não pede nome, e-mail, foto, localização, idade exata ou qualquer cadastro da criança. Os jogos funcionam sem login e sem área de conta.
            </p>
          </section>

          <section className="rounded-[3rem] bg-white p-8 md:p-10 shadow-sm border border-black/5 space-y-4">
            <h2 className="text-2xl font-black font-display flex items-center gap-3">
              <Cookie className="text-zen-yellow" size={28} />
              Cookies e anúncios
            </h2>
            <p className="text-lg font-medium leading-relaxed opacity-80">
              Não usamos anúncios, rastreadores de publicidade ou cookies de marketing. Se no futuro adicionarmos alguma medição técnica, ela deverá ser mínima, sem identificar crianças e explicada nesta página.
            </p>
          </section>

          <section className="rounded-[3rem] bg-white p-8 md:p-10 shadow-sm border border-black/5 space-y-4">
            <h2 className="text-2xl font-black font-display flex items-center gap-3">
              <ShieldCheck className="text-zen-green" size={28} />
              Ambiente seguro
            </h2>
            <p className="text-lg font-medium leading-relaxed opacity-80">
              O projeto é estático: não possui backend próprio, banco de dados, chat, compras internas ou mensagens entre usuários. A proposta é reduzir riscos e manter a brincadeira simples.
            </p>
          </section>
        </div>

        <section className="rounded-[3rem] bg-zen-cream/60 p-8 md:p-10 text-center space-y-4 border border-white">
          <h2 className="text-2xl font-black font-display">Para pais e responsáveis</h2>
          <p className="font-medium opacity-80 leading-relaxed max-w-2xl mx-auto">
            Recomendamos que crianças pequenas usem qualquer tela com acompanhamento de um adulto e por períodos curtos. O PlayZulo ajuda a tornar esse momento mais calmo, mas não substitui brincadeiras físicas, conversa e descanso.
          </p>
          <Link
            href="/jogos"
            className="inline-flex items-center justify-center rounded-full bg-zen-green px-8 py-4 font-black text-white transition-colors duration-500 hover:bg-zen-green-dark"
          >
            Ver jogos seguros
          </Link>
        </section>
      </main>
    </div>
  );
}

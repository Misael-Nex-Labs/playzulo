"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { soundManager } from "@/lib/sounds";
import { Sprout, Star, Shapes, Palette, Heart } from "lucide-react";

interface Vowel {
  letter: string;
  word: string;
  icon: React.ElementType;
  bg: string;
  accent: string;
}

const VOWELS: Vowel[] = [
  { letter: "A", word: "Árvore", icon: Sprout, bg: "#f8bbd0", accent: "#c97f89" },
  { letter: "E", word: "Estrela", icon: Star, bg: "#e0f7ff", accent: "#5e8fb8" },
  { letter: "I", word: "Iglu", icon: Shapes, bg: "#d4e6a5", accent: "#8aa55e" },
  { letter: "O", word: "Ovo", icon: Palette, bg: "#ffe0b2", accent: "#c9914e" },
  { letter: "U", word: "Urso", icon: Heart, bg: "#fff9c4", accent: "#b08d57" },
];

export default function Letrinha() {
  const [seen, setSeen] = useState<number | null>(null);
  const SelectedIcon = seen === null ? Star : VOWELS[seen].icon;

  const handleTap = (index: number) => {
    soundManager.playStarChime(index);
    setSeen((current) => (current === index ? null : index));
  };

  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden rounded-[2rem] bg-zen-bg text-zen-gray select-none"
      style={{ touchAction: "none" }}
    >
      {/* Fundo decorativo suave */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-25 blur-3xl" style={{ backgroundColor: "var(--zen-yellow)" }} />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full opacity-25 blur-3xl" style={{ backgroundColor: "var(--zen-blue)" }} />
        <div className="pointer-events-none absolute top-8 left-6 h-12 w-12 rounded-full bg-zen-green/30 blur-[1px]" />
        <div className="pointer-events-none absolute bottom-8 right-8 h-10 w-10 rounded-full bg-zen-pink/30 blur-[1px]" />
      </div>

      {/* Dica superior */}
      <p className="relative z-10 px-3 pb-2 text-center text-xs font-black uppercase tracking-[0.22em] text-zen-gray/50">
        Toque nas vogais maiores
      </p>

      {/* Quintal: letras + palavras */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-5">
        {/* Grade de letras — o centro da brincadeira */}
        <div
          className="grid w-full max-w-md grid-cols-3 gap-3 sm:gap-5"
          aria-label="Letras do alfabeto: A, E, I, O, U. Toque para ouvir o som de cada uma."
        >
          {VOWELS.map((v, i) => (
            <motion.button
              key={v.letter}
              type="button"
              aria-label={`Letra ${v.letter}, ${v.word}`}
              onClick={(event) => {
                // Native button clicks cover keyboard activation only; pointer
                // and touch input are handled by their immediate event handlers.
                if (event.detail === 0) handleTap(i);
              }}
              onPointerDown={(event) => {
                event.preventDefault();
                if (event.pointerType === "touch") return;
                handleTap(i);
              }}
              onTouchStart={(event) => {
                event.preventDefault();
                handleTap(i);
              }}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center justify-center rounded-[2rem] border-2 border-white shadow-md transition-shadow focus:outline-none focus-visible:ring-4 focus-visible:ring-zen-green/60 h-[104px] w-[88px] sm:h-[136px] sm:w-[152px]"
              style={{
                backgroundColor: v.bg,
                cursor: "pointer",
                touchAction: "none",
              }}
            >
              <span
                className="font-display text-6xl font-black leading-tight"
                style={{ color: v.accent }}
              >
                {v.letter}
              </span>
              <span className="mt-1 text-[10px] font-black text-zen-gray/60">
                {v.word}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Pista de feedback: palavra do valor toca — o "próximo passo" claro */}
        <AnimatePresence mode="wait">
          {seen !== null ? (
            <motion.div
              key={seen}
              initial={{ opacity: 0, y: 14, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.92 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              role="status"
              aria-live="polite"
              className="flex flex-col items-center gap-3 py-5"
            >
              <span
                className="text-7xl font-black font-display leading-tight"
                style={{ color: VOWELS[seen].accent }}
              >
                {VOWELS[seen].letter}
              </span>
              <span className="flex items-center gap-3 text-lg font-black text-zen-gray/80">
                <SelectedIcon size={36} style={{ color: VOWELS[seen].accent }} strokeWidth={2} />
                {VOWELS[seen].word}
              </span>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="py-5 text-center"
            >
              <span className="text-sm font-bold text-zen-gray/50">
                Toque uma vogal — veja uma palavra e ouça um som suave.
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Rodapé */}
      <div className="relative z-10 flex justify-center pb-2 pt-1">
        <span className="text-xs font-black text-zen-gray/40 uppercase tracking-[0.2em]">
          Sem pressa — toque quando quiser
        </span>
      </div>

      <p className="relative z-10 sr-only" aria-live="polite">
        {seen === null ? "Escolha uma vogal para explorar." : `Letra ${VOWELS[seen].letter} — ${VOWELS[seen].word}. Toque outra letra para continuar.`}
      </p>
    </div>
  );
}

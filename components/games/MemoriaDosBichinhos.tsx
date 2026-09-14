"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { soundManager } from "@/lib/sounds";

type Animal = "elefante" | "leao" | "girafa" | "passarinho";

type Card = {
  id: number;
  animal: Animal;
  matched: boolean;
  faceUp: boolean;
};

const ANIMALS: Animal[] = ["elefante", "leao", "girafa", "passarinho"];
const ANIMAL_LABELS: Record<Animal, string> = {
  elefante: "Elefante",
  leao: "Leão",
  girafa: "Girafa",
  passarinho: "Passarinho",
};
const ANIMAL_COLORS: Record<Animal, string> = {
  elefante: "var(--color-zen-blue)",
  leao: "var(--color-zen-yellow)",
  girafa: "var(--color-zen-pink)",
  passarinho: "var(--color-zen-green)",
};

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function createCards(level: 1 | 2): Card[] {
  const animals = ANIMALS.slice(0, level === 1 ? 2 : 4);
  return shuffle([...animals, ...animals]).map((animal, id) => ({
    id,
    animal,
    matched: false,
    faceUp: false,
  }));
}

function AnimalGlyph({ animal }: { animal: Animal }) {
  return (
    <div className="flex flex-col items-center gap-1" aria-hidden="true">
      <div
        className="relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-white/70 shadow-sm md:h-20 md:w-20"
        style={{ backgroundColor: ANIMAL_COLORS[animal] }}
      >
        <span className="text-2xl font-black text-zen-gray md:text-3xl">
          {animal === "elefante" ? "E" : animal === "leao" ? "L" : animal === "girafa" ? "G" : "P"}
        </span>
        {animal === "elefante" && (
          <span className="absolute -bottom-2 left-1/2 h-5 w-3 -translate-x-1/2 rounded-b-full border-2 border-zen-gray/40 bg-zen-blue" />
        )}
        {animal === "leao" && (
          <span className="absolute -inset-2 -z-10 rounded-full border-4 border-zen-yellow/70" />
        )}
        {animal === "girafa" && (
          <span className="absolute -top-3 right-1 h-5 w-3 rounded-full border-2 border-zen-gray/30 bg-zen-pink" />
        )}
        {animal === "passarinho" && (
          <span className="absolute right-0 top-1 h-2 w-4 rounded-r-full bg-zen-yellow" />
        )}
      </div>
      <span className="text-xs font-bold text-zen-gray">{ANIMAL_LABELS[animal]}</span>
    </div>
  );
}

export default function MemoriaDosBichinhos() {
  const [level, setLevel] = useState<1 | 2>(1);
  const [cards, setCards] = useState<Card[]>(() => createCards(1));
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const completedLevelRef = useRef<number | null>(null);

  const pairCount = level === 1 ? 2 : 4;
  const matchedPairs = useMemo(
    () => cards.filter((card) => card.matched).length / 2,
    [cards],
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const showCelebration = matchedPairs === pairCount;

  useEffect(() => {
    if (matchedPairs !== pairCount || isChecking || completedLevelRef.current === level) return;

    completedLevelRef.current = level;
    soundManager.playSuccess();

    if (level === 1) {
      timeoutRef.current = setTimeout(() => {
        setLevel(2);
        setCards(createCards(2));
        setFlippedIds([]);
      }, 1400);
    }
  }, [isChecking, level, matchedPairs, pairCount]);

  const turnCard = (id: number) => {
    if (isChecking || showCelebration) return;

    const card = cards.find((item) => item.id === id);
    if (!card || card.matched || card.faceUp || flippedIds.includes(id)) return;

    soundManager.playPop();
    const nextFlipped = [...flippedIds, id];
    setCards((current) => current.map((item) => (item.id === id ? { ...item, faceUp: true } : item)));

    if (nextFlipped.length === 1) {
      setFlippedIds(nextFlipped);
      return;
    }

    const [firstId, secondId] = nextFlipped;
    const first = cards.find((item) => item.id === firstId);
    const second = cards.find((item) => item.id === secondId);
    if (!first || !second) return;

    setIsChecking(true);
    setFlippedIds([]);

    if (first.animal === second.animal) {
      setCards((current) =>
        current.map((item) =>
          item.id === firstId || item.id === secondId ? { ...item, matched: true, faceUp: true } : item,
        ),
      );
      setIsChecking(false);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setCards((current) =>
        current.map((item) =>
          item.id === firstId || item.id === secondId ? { ...item, faceUp: false } : item,
        ),
      );
      setIsChecking(false);
    }, 1100);
  };

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[2rem] bg-zen-cream p-4 text-zen-gray md:p-8"
      style={{ touchAction: "none" }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 20% 15%, var(--color-zen-blue), transparent 35%), radial-gradient(circle at 85% 80%, var(--color-zen-pink), transparent 30%)" }} />

      <div className="relative z-10 mb-4 text-center md:mb-6">
        <p className="text-sm font-bold opacity-70">Nível {level} · {matchedPairs} de {pairCount} pares</p>
        <p className="mt-1 text-xs opacity-60">Vire duas cartas para encontrar os bichinhos iguais.</p>
      </div>

      <div className={`relative z-10 grid w-full max-w-xl gap-3 md:gap-5 ${level === 1 ? "grid-cols-2" : "grid-cols-4"}`} style={{ perspective: 1000 }}>
        {cards.map((card) => {
          const isFaceUp = card.faceUp || card.matched;
          return (
            <motion.button
              key={card.id}
              type="button"
              aria-label={isFaceUp ? ANIMAL_LABELS[card.animal] : "Virar carta"}
              className="relative aspect-[4/5] min-h-28 rounded-3xl outline-none focus-visible:ring-4 focus-visible:ring-zen-green/60"
              style={{ touchAction: "none" }}
              onPointerDown={() => turnCard(card.id)}
              onTouchStart={(event) => event.preventDefault()}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 h-full w-full"
                animate={{ rotateY: isFaceUp ? 180 : 0 }}
                transition={{ duration: 0.55, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 flex h-full w-full items-center justify-center rounded-3xl border-4 border-zen-gray/10 bg-[#d8bd91] shadow-md" style={{ backfaceVisibility: "hidden" }}>
                  <div className="h-2/3 w-2/3 rounded-2xl border-2 border-zen-gray/20 opacity-40" style={{ background: "repeating-linear-gradient(0deg, transparent 0 12px, rgba(96,125,139,.15) 13px 15px)" }} />
                </div>
                <div className="absolute inset-0 flex h-full w-full items-center justify-center rounded-3xl border-4 border-white/70 bg-zen-bg shadow-md" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                  <AnimalGlyph animal={card.animal} />
                </div>
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      <motion.p
        initial={false}
        animate={{ opacity: showCelebration ? 1 : 0, y: showCelebration ? 0 : 8 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="relative z-10 mt-5 min-h-6 text-center text-lg font-black text-zen-gray"
        aria-live="polite"
      >
        {level === 1 ? "Parabéns! Vamos conhecer mais bichinhos." : "Parabéns! Você encontrou todos os pares."}
      </motion.p>
    </div>
  );
}

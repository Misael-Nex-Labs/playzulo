"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { soundManager } from "@/lib/sounds";

type Animal =
  | "elefante"
  | "leao"
  | "girafa"
  | "passarinho"
  | "coelho"
  | "raposa"
  | "urso"
  | "gato";

type Card = {
  id: number;
  animal: Animal;
  faceUp: boolean;
  matched: boolean;
};

const LEVEL_PAIRS = [2, 2, 4, 4, 4, 4, 5, 5, 5, 6] as const;
const ANIMALS: Animal[] = [
  "elefante",
  "leao",
  "girafa",
  "passarinho",
  "coelho",
  "raposa",
  "urso",
  "gato",
];
const ANIMAL_LABELS: Record<Animal, string> = {
  elefante: "Elefante",
  leao: "Leão",
  girafa: "Girafa",
  passarinho: "Passarinho",
  coelho: "Coelho",
  raposa: "Raposa",
  urso: "Urso",
  gato: "Gato",
};
const ANIMAL_COLORS: Record<Animal, string> = {
  elefante: "var(--color-zen-blue)",
  leao: "var(--color-zen-yellow)",
  girafa: "var(--color-zen-pink)",
  passarinho: "var(--color-zen-green)",
  coelho: "var(--color-zen-cream)",
  raposa: "#f3c8a8",
  urso: "#d8bd91",
  gato: "#c9d8d6",
};

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function createCards(level: number): Card[] {
  const animals = ANIMALS.slice(0, LEVEL_PAIRS[level - 1]);
  return shuffle([...animals, ...animals]).map((animal, id) => ({
    id,
    animal,
    faceUp: false,
    matched: false,
  }));
}

function AnimalIllustration({ animal }: { animal: Animal }) {
  const color = ANIMAL_COLORS[animal];

  return (
    <svg viewBox="0 0 120 100" className="h-[clamp(3.5rem,13vw,6.5rem)] w-[clamp(4rem,16vw,7rem)]" aria-hidden="true">
      <g stroke="var(--color-zen-gray)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" opacity="0.82">
        {animal === "elefante" && <><ellipse cx="57" cy="57" rx="35" ry="25" fill={color} /><circle cx="34" cy="44" r="17" fill={color} /><path d="M24 55c-10 10-9 24 2 25 9 1 11-9 8-17" fill="none" /><circle cx="29" cy="41" r="2" fill="var(--color-zen-gray)" /></>}
        {animal === "leao" && <><circle cx="59" cy="50" r="31" fill="var(--color-zen-yellow)" /><circle cx="59" cy="50" r="20" fill="#ffe9c9" /><circle cx="52" cy="48" r="2" fill="var(--color-zen-gray)" /><circle cx="66" cy="48" r="2" fill="var(--color-zen-gray)" /><path d="M56 56q3 3 6 0" fill="none" /></>}
        {animal === "girafa" && <><path d="M47 75V32q0-15 13-15t13 15v43" fill={color} /><ellipse cx="60" cy="78" rx="30" ry="15" fill={color} /><circle cx="60" cy="24" r="14" fill={color} /><circle cx="54" cy="23" r="2" fill="var(--color-zen-gray)" /><circle cx="68" cy="23" r="2" fill="var(--color-zen-gray)" /><circle cx="52" cy="45" r="4" fill="#e9aebd" stroke="none" /><circle cx="67" cy="62" r="4" fill="#e9aebd" stroke="none" /></>}
        {animal === "passarinho" && <><ellipse cx="58" cy="55" rx="31" ry="23" fill={color} /><circle cx="82" cy="42" r="17" fill={color} /><path d="M94 43l16 7-16 6z" fill="var(--color-zen-yellow)" /><path d="M58 54q-13-17-25 0 12 15 25 0" fill="var(--color-zen-blue)" /><circle cx="87" cy="39" r="2" fill="var(--color-zen-gray)" /></>}
        {animal === "coelho" && <><ellipse cx="60" cy="62" rx="28" ry="23" fill={color} /><circle cx="60" cy="42" r="20" fill={color} /><path d="M48 28 46 8q1-8 8 0l6 17M67 25l7-18q4-6 7 2l-4 22" fill={color} /><circle cx="54" cy="40" r="2" fill="var(--color-zen-gray)" /><circle cx="67" cy="40" r="2" fill="var(--color-zen-gray)" /><circle cx="60" cy="47" r="3" fill="#e9aebd" stroke="none" /></>}
        {animal === "raposa" && <><path d="M28 35 38 12l19 15 19-15 10 23v28q-27 22-58 0z" fill={color} /><path d="m40 27 8 20 10-10 10 10 8-20" fill="#fff1d8" stroke="none" /><circle cx="51" cy="46" r="2" fill="var(--color-zen-gray)" /><circle cx="69" cy="46" r="2" fill="var(--color-zen-gray)" /></>}
        {animal === "urso" && <><circle cx="42" cy="32" r="12" fill={color} /><circle cx="78" cy="32" r="12" fill={color} /><circle cx="60" cy="54" r="29" fill={color} /><ellipse cx="60" cy="61" rx="14" ry="11" fill="#f4dfc2" /><circle cx="51" cy="51" r="2" fill="var(--color-zen-gray)" /><circle cx="69" cy="51" r="2" fill="var(--color-zen-gray)" /></>}
        {animal === "gato" && <><path d="M31 37 34 13l20 15q6-3 12 0l20-15 3 24v27q-29 22-58 0z" fill={color} /><path d="M52 52h16" /><circle cx="49" cy="45" r="2" fill="var(--color-zen-gray)" /><circle cx="71" cy="45" r="2" fill="var(--color-zen-gray)" /><path d="M60 51q3 3 6 0" fill="none" /></>}
      </g>
    </svg>
  );
}

function CardBack() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl border-4 border-[#c5a877] bg-[#d8bd91] shadow-[0_5px_0_#b99b6d]">
      <div className="absolute inset-3 rounded-2xl border-2 border-[#b99b6d]/60" />
      <div className="absolute inset-x-5 top-1/2 h-px bg-[#b99b6d]/40 shadow-[0_-11px_0_#b99b6d33,0_11px_0_#b99b6d33]" />
      <div className="relative flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#b99b6d]/70 bg-[#ead4ad]/60 text-2xl text-zen-gray/70">✦</div>
    </div>
  );
}

export default function MemoriaDosBichinhos() {
  const [level, setLevel] = useState(1);
  const [cards, setCards] = useState<Card[]>(() => createCards(1));
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transitionRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pairCount = LEVEL_PAIRS[level - 1];
  const matchedPairs = useMemo(() => cards.filter((card) => card.matched).length / 2, [cards]);
  const complete = matchedPairs === pairCount;
  const gameFinished = level === LEVEL_PAIRS.length && complete;
  const columns = cards.length <= 4 ? "grid-cols-2" : cards.length <= 8 ? "grid-cols-4" : cards.length === 10 ? "grid-cols-5" : "grid-cols-3 sm:grid-cols-6";

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (transitionRef.current) clearTimeout(transitionRef.current);
  }, []);

  useEffect(() => {
    if (!complete || isChecking) return;
    soundManager.playSuccess();
    if (level === LEVEL_PAIRS.length) {
      return;
    }
    transitionRef.current = setTimeout(() => {
      setLevel((current) => current + 1);
      setCards(createCards(level + 1));
      setFlippedIds([]);
    }, 1100);
  }, [complete, isChecking, level]);

  const turnCard = (id: number) => {
    if (isChecking || complete || gameFinished) return;
    const card = cards.find((item) => item.id === id);
    if (!card || card.faceUp || card.matched || flippedIds.includes(id)) return;

    soundManager.playPop();
    const nextFlipped = [...flippedIds, id];
    setCards((current) => current.map((item) => item.id === id ? { ...item, faceUp: true } : item));
    if (nextFlipped.length === 1) {
      setFlippedIds(nextFlipped);
      return;
    }

    const [firstId, secondId] = nextFlipped;
    const first = cards.find((item) => item.id === firstId);
    const second = cards.find((item) => item.id === secondId);
    setFlippedIds([]);
    if (!first || !second) return;
    setIsChecking(true);

    if (first.animal === second.animal) {
      setCards((current) => current.map((item) => item.id === firstId || item.id === secondId ? { ...item, faceUp: true, matched: true } : item));
      setIsChecking(false);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setCards((current) => current.map((item) => item.id === firstId || item.id === secondId ? { ...item, faceUp: false } : item));
      setIsChecking(false);
    }, 1200);
  };

  const restart = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (transitionRef.current) clearTimeout(transitionRef.current);
    setLevel(1);
    setCards(createCards(1));
    setFlippedIds([]);
    setIsChecking(false);

  };

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col items-center justify-center overflow-hidden rounded-[2rem] bg-zen-cream p-3 text-zen-gray sm:p-5 md:p-8" style={{ touchAction: "none" }}>
      <div className="pointer-events-none absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 15% 12%, var(--color-zen-blue), transparent 35%), radial-gradient(circle at 85% 85%, var(--color-zen-pink), transparent 32%)" }} />
      <div className="relative z-10 mb-3 shrink-0 text-center sm:mb-5">
        <p className="text-sm font-bold">Nível {level} de 10 · {matchedPairs} de {pairCount} pares</p>
        <p className="mt-1 text-xs opacity-70">Vire duas cartas para encontrar os bichinhos iguais.</p>
      </div>

      <div className={`relative z-10 grid w-full max-w-[min(92vw,38rem)] ${columns} gap-2 sm:gap-3 md:gap-4`} style={{ perspective: 1000 }}>
        {cards.map((card) => {
          const faceUp = card.faceUp || card.matched;
          return (
            <motion.button key={card.id} type="button" aria-label={faceUp ? ANIMAL_LABELS[card.animal] : "Virar carta"} className="relative aspect-square min-w-0 rounded-3xl outline-none focus-visible:ring-4 focus-visible:ring-zen-green/60" style={{ touchAction: "none" }} onPointerDown={() => turnCard(card.id)} onTouchStart={(event) => event.preventDefault()} whileTap={{ scale: 0.98 }}>
              <motion.div className="absolute inset-0 h-full w-full" animate={{ rotateY: faceUp ? 180 : 0 }} transition={{ duration: 0.55, ease: "easeInOut" }} style={{ transformStyle: "preserve-3d" }}>
                <div className="absolute inset-0 h-full w-full" style={{ backfaceVisibility: "hidden" }}><CardBack /></div>
                <div className="absolute inset-0 flex h-full w-full items-center justify-center rounded-3xl border-4 border-white/70 bg-zen-bg shadow-md" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                  <AnimalIllustration animal={card.animal} />
                </div>
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      <motion.div initial={false} animate={{ opacity: complete ? 1 : 0, y: complete ? 0 : 8 }} transition={{ duration: 0.6, ease: "easeInOut" }} className="relative z-10 mt-3 min-h-7 text-center text-base font-black sm:mt-5 sm:text-lg" aria-live="polite">
        {gameFinished ? "Você encontrou todos os bichinhos!" : complete ? "Muito bem! Vamos para o próximo nível." : ""}
      </motion.div>
      {gameFinished && <motion.button type="button" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} onPointerDown={restart} onTouchStart={(event) => event.preventDefault()} className="relative z-10 mt-3 rounded-full bg-zen-green px-6 py-3 text-base font-bold text-zen-gray shadow-sm transition-colors duration-500 hover:bg-zen-green-dark">Jogar de novo</motion.button>}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { soundManager } from "@/lib/sounds";

const COLORS = [
  { name: "Rosa chá", value: "var(--zen-pink)" },
  { name: "Amarelo pêssego", value: "var(--zen-yellow)" },
  { name: "Azul céu", value: "var(--zen-blue)" },
  { name: "Verde musgo", value: "var(--zen-green)" },
  { name: "Creme", value: "var(--zen-cream)" },
  { name: "Lilás", value: "#e1bee7" },
  { name: "Pêssego", value: "#ffccbc" },
  { name: "Menta", value: "#b2dfdb" },
] as const;

import { Cat, Dog, Rabbit, Bird, Turtle, Snail, Fish, Bug, Worm, Rat, Squirrel, PiggyBank, ChevronLeft, ChevronRight } from "lucide-react";

type AnimalName =
  | "gato"
  | "cachorro"
  | "coelho"
  | "passarinho"
  | "tartaruga"
  | "caracol"
  | "peixe"
  | "joaninha"
  | "minhoca"
  | "ratinho"
  | "esquilo"
  | "porquinho";

type Animal = { name: AnimalName; label: string; colorIndex: number };

const PAGES: Animal[][] = [
  [
    { name: "gato", label: "Gato", colorIndex: 2 },
    { name: "cachorro", label: "Cachorro", colorIndex: 1 },
    { name: "coelho", label: "Coelho", colorIndex: 3 },
    { name: "passarinho", label: "Passarinho", colorIndex: 0 },
  ],
  [
    { name: "tartaruga", label: "Tartaruga", colorIndex: 0 },
    { name: "caracol", label: "Caracol", colorIndex: 1 },
    { name: "peixe", label: "Peixe", colorIndex: 3 },
    { name: "joaninha", label: "Joaninha", colorIndex: 2 },
  ],
  [
    { name: "minhoca", label: "Minhoca", colorIndex: 1 },
    { name: "ratinho", label: "Ratinho", colorIndex: 3 },
    { name: "esquilo", label: "Esquilo", colorIndex: 0 },
    { name: "porquinho", label: "Porquinho", colorIndex: 2 },
  ],
];

const ANIMAL_ICONS: Record<AnimalName, React.ElementType> = {
  gato: Cat,
  cachorro: Dog,
  coelho: Rabbit,
  passarinho: Bird,
  tartaruga: Turtle,
  caracol: Snail,
  peixe: Fish,
  joaninha: Bug,
  minhoca: Worm,
  ratinho: Rat,
  esquilo: Squirrel,
  porquinho: PiggyBank,
};

function AnimalIllustration({ name, color }: { name: AnimalName; color: string }) {
  const Icon = ANIMAL_ICONS[name];

  return (
    <div className="relative flex items-center justify-center h-24 w-24 sm:h-28 sm:w-28 pointer-events-none select-none">
      <motion.div
        animate={{ color: color }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Icon size={64} strokeWidth={1.5} className="w-16 h-16 sm:w-20 sm:h-20" />
      </motion.div>
    </div>
  );
}

export default function CoresDosBichinhos() {
  const [page, setPage] = useState(0);
  const [animals, setAnimals] = useState(PAGES[0]);
  const [activeColor, setActiveColor] = useState<{ animal: string; label: string } | null>(null);
  const lastTouchAt = useRef(0);
  const activeColorTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (activeColorTimer.current) clearTimeout(activeColorTimer.current);
  }, []);

  const changeColor = (name: AnimalName) => {
    const animal = animals.find((item) => item.name === name);
    if (!animal) return;
    const nextIndex = (animal.colorIndex + 1) % COLORS.length;
    soundManager.playPop();
    setAnimals((current) => current.map((item) => item.name === name ? { ...item, colorIndex: nextIndex } : item));
    setActiveColor({ animal: animal.label, label: COLORS[nextIndex].name });
    if (activeColorTimer.current) clearTimeout(activeColorTimer.current);
    activeColorTimer.current = setTimeout(() => setActiveColor(null), 1500);
  };

  const handleTouch = (event: React.TouchEvent, action: () => void) => {
    event.preventDefault();
    lastTouchAt.current = event.timeStamp;
    action();
  };

  const handlePointer = (event: React.PointerEvent, action: () => void) => {
    if (event.timeStamp - lastTouchAt.current >= 450) action();
  };

  const changePage = (nextPage: number) => {
    const normalized = (nextPage + PAGES.length) % PAGES.length;
    setPage(normalized);
    setAnimals(PAGES[normalized]);
    setActiveColor(null);
  };

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[2rem] bg-zen-bg p-4 text-zen-gray sm:p-7" style={{ touchAction: "none" }} onTouchStart={(event) => event.preventDefault()}>
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-zen-yellow/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-12 h-52 w-52 rounded-full bg-zen-blue/40 blur-3xl" />
      <header className="relative z-10 text-center">
        <h2 className="font-display text-xl font-bold sm:text-2xl">Toque nos bichinhos</h2>
        <p className="mt-1 text-xs text-zen-gray/70 sm:text-sm">Veja cada um mudar de cor</p>
      </header>
      <div className="relative z-10 mx-auto grid min-h-0 flex-1 w-full max-w-2xl grid-cols-2 gap-3 pt-3 sm:gap-5 sm:pt-5">
        {animals.map((animal) => {
          const color = COLORS[animal.colorIndex];
          const isActive = activeColor?.animal === animal.label;
          return <motion.button key={animal.name} type="button" aria-label={`${animal.label}, cor ${color.name}. Toque para mudar a cor`} className="relative flex min-h-0 flex-col items-center justify-center overflow-hidden rounded-[2rem] border-2 border-white/70 bg-white/55 px-1 shadow-sm cursor-pointer" whileTap={{ scale: 0.99 }} transition={{ duration: 0.45, ease: "easeInOut" }} onPointerDown={(event) => handlePointer(event, () => changeColor(animal.name))} onTouchStart={(event) => handleTouch(event, () => changeColor(animal.name))}>
            <motion.div animate={{ opacity: isActive ? [0.25, 0.65, 0.25] : 0 }} transition={{ duration: 0.8, ease: "easeInOut" }} className="pointer-events-none absolute inset-4 rounded-full bg-white blur-xl" />
            <AnimalIllustration name={animal.name} color={color.value} />
            <span className="relative mt-1 text-sm font-bold text-zen-gray/80 sm:text-base">{animal.label}</span>
            <span className="relative mt-1 text-[10px] text-zen-gray/60 sm:text-xs font-medium">{color.name}</span>
          </motion.button>;
        })}
      </div>
      <nav className="relative z-10 mt-3 flex items-center justify-center gap-5" aria-label="Páginas de bichinhos">
        <motion.button type="button" aria-label="Página anterior" className="flex h-11 w-14 items-center justify-center rounded-full bg-zen-green text-white shadow-sm cursor-pointer" whileHover={{ y: -2, scale: 1.02, filter: "brightness(0.95)" }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.3, ease: "easeOut" }} onPointerDown={(event) => handlePointer(event, () => changePage(page - 1))} onTouchStart={(event) => handleTouch(event, () => changePage(page - 1))}>
          <ChevronLeft size={24} strokeWidth={2.5} />
        </motion.button>
        <span className="text-sm text-zen-gray/70 font-medium" aria-live="polite">{page + 1} de {PAGES.length}</span>
        <motion.button type="button" aria-label="Próxima página" className="flex h-11 w-14 items-center justify-center rounded-full bg-zen-green text-white shadow-sm cursor-pointer" whileHover={{ y: -2, scale: 1.02, filter: "brightness(0.95)" }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.3, ease: "easeOut" }} onPointerDown={(event) => handlePointer(event, () => changePage(page + 1))} onTouchStart={(event) => handleTouch(event, () => changePage(page + 1))}>
          <ChevronRight size={24} strokeWidth={2.5} />
        </motion.button>
      </nav>
    </div>
  );
}

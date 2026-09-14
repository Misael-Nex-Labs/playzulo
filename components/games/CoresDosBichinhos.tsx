"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { soundManager } from "@/lib/sounds";

const COLORS = [
  { name: "Rosa chá", value: "var(--color-zen-pink)" },
  { name: "Amarelo pêssego", value: "var(--color-zen-yellow)" },
  { name: "Azul céu", value: "var(--color-zen-blue)" },
  { name: "Verde musgo", value: "var(--color-zen-green)" },
  { name: "Creme", value: "var(--color-zen-cream)" },
] as const;

type AnimalName = "elefante" | "leão" | "girafa" | "passarinho";

interface Animal {
  name: AnimalName;
  label: string;
  colorIndex: number;
}

const INITIAL_ANIMALS: Animal[] = [
  { name: "elefante", label: "Elefante", colorIndex: 2 },
  { name: "leão", label: "Leão", colorIndex: 1 },
  { name: "girafa", label: "Girafa", colorIndex: 3 },
  { name: "passarinho", label: "Passarinho", colorIndex: 0 },
];

function AnimalIllustration({ name, color }: { name: AnimalName; color: string }) {
  const shared = { backgroundColor: color, transition: "background-color 600ms ease-in-out" };

  if (name === "elefante") {
    return (
      <div className="relative h-32 w-40" aria-hidden="true">
        <div className="absolute left-8 top-8 h-20 w-28 rounded-[48%]" style={shared} />
        <div className="absolute left-2 top-8 h-20 w-14 rounded-full opacity-90" style={shared} />
        <div className="absolute left-16 top-2 h-12 w-12 rounded-full" style={shared} />
        <div className="absolute left-20 top-10 h-8 w-5 rounded-b-full bg-zen-gray/30" />
        <div className="absolute left-3 top-14 h-14 w-7 rounded-full border-4 border-white/40" />
        <div className="absolute bottom-0 left-12 h-9 w-5 rounded-b-full" style={shared} />
        <div className="absolute bottom-0 left-28 h-9 w-5 rounded-b-full" style={shared} />
        <div className="absolute left-[4.25rem] top-5 h-2 w-2 rounded-full bg-zen-gray" />
      </div>
    );
  }

  if (name === "leão") {
    return (
      <div className="relative h-32 w-40" aria-hidden="true">
        <div className="absolute left-7 top-2 h-28 w-28 rounded-full bg-zen-yellow/70" />
        <div className="absolute left-12 top-7 h-20 w-20 rounded-full" style={shared} />
        <div className="absolute left-[4.45rem] top-[3.65rem] h-3 w-3 rounded-full bg-zen-gray" />
        <div className="absolute left-[6.4rem] top-[3.65rem] h-3 w-3 rounded-full bg-zen-gray" />
        <div className="absolute left-[5.5rem] top-[4.8rem] h-3 w-5 rounded-full bg-zen-gray/40" />
        <div className="absolute bottom-0 left-14 h-8 w-5 rounded-b-full" style={shared} />
        <div className="absolute bottom-0 left-24 h-8 w-5 rounded-b-full" style={shared} />
      </div>
    );
  }

  if (name === "girafa") {
    return (
      <div className="relative h-32 w-40" aria-hidden="true">
        <div className="absolute left-[4.3rem] top-2 h-20 w-8 rounded-t-full" style={shared} />
        <div className="absolute left-14 top-0 h-12 w-16 rounded-[45%]" style={shared} />
        <div className="absolute left-8 top-[4.5rem] h-16 w-28 rounded-[48%]" style={shared} />
        <div className="absolute left-[4.7rem] top-5 h-3 w-3 rounded-full bg-zen-gray/40" />
        <div className="absolute left-[6.4rem] top-5 h-3 w-3 rounded-full bg-zen-gray/40" />
        <div className="absolute bottom-0 left-12 h-7 w-5 rounded-b-full" style={shared} />
        <div className="absolute bottom-0 left-28 h-7 w-5 rounded-b-full" style={shared} />
        <div className="absolute left-16 top-12 h-3 w-3 rounded-full bg-zen-green/60" />
        <div className="absolute left-28 top-16 h-3 w-3 rounded-full bg-zen-green/60" />
      </div>
    );
  }

  return (
    <div className="relative h-32 w-40" aria-hidden="true">
      <div className="absolute left-10 top-8 h-20 w-28 -rotate-6 rounded-[55%]" style={shared} />
      <div className="absolute left-16 top-2 h-16 w-20 rounded-full" style={shared} />
      <div className="absolute left-8 top-16 h-10 w-16 -rotate-12 rounded-[60%] bg-zen-pink/70" />
      <div className="absolute left-[5.8rem] top-6 h-3 w-3 rounded-full bg-zen-gray" />
      <div className="absolute left-[8.2rem] top-[2.3rem] border-y-[6px] border-y-transparent border-l-[14px] border-l-zen-yellow" />
      <div className="absolute bottom-1 left-16 h-7 w-4 rounded-b-full" style={shared} />
      <div className="absolute bottom-1 left-28 h-7 w-4 rounded-b-full" style={shared} />
    </div>
  );
}

export default function CoresDosBichinhos() {
  const [animals, setAnimals] = useState(INITIAL_ANIMALS);
  const [activeColor, setActiveColor] = useState<{ animal: string; label: string } | null>(null);
  const lastTouchAt = useRef(0);
  const activeColorTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const changeColor = (name: AnimalName) => {
    const animal = animals.find((item) => item.name === name);
    if (!animal) return;

    const nextIndex = (animal.colorIndex + 1) % COLORS.length;
    soundManager.playPop();
    setAnimals((current) =>
      current.map((item) => (item.name === name ? { ...item, colorIndex: nextIndex } : item)),
    );
    setActiveColor({ animal: animal.label, label: COLORS[nextIndex].name });

    if (activeColorTimer.current) clearTimeout(activeColorTimer.current);
    activeColorTimer.current = setTimeout(() => setActiveColor(null), 1500);
  };

  const handlePointerDown = (event: React.PointerEvent, name: AnimalName) => {
    if (event.timeStamp - lastTouchAt.current < 450) return;
    changeColor(name);
  };

  const handleTouchStart = (event: React.TouchEvent, name: AnimalName) => {
    lastTouchAt.current = event.timeStamp;
    changeColor(name);
  };

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-[2rem] bg-zen-bg p-4 text-zen-gray sm:p-7"
      style={{ touchAction: "none" }}
      onTouchStart={(event) => event.preventDefault()}
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-zen-yellow/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-12 h-52 w-52 rounded-full bg-zen-blue/40 blur-3xl" />

      <header className="relative z-10 text-center">
        <h2 className="font-display text-xl font-bold sm:text-2xl">Toque nos bichinhos</h2>
        <p className="mt-1 text-xs text-zen-gray/70 sm:text-sm">Veja cada um mudar de cor</p>
      </header>

      <div className="relative z-10 mx-auto grid h-[calc(100%-4.5rem)] max-w-2xl grid-cols-2 gap-3 pt-3 sm:gap-5 sm:pt-5">
        {animals.map((animal) => {
          const color = COLORS[animal.colorIndex];
          const isActive = activeColor?.animal === animal.label;
          return (
            <motion.button
              key={animal.name}
              type="button"
              aria-label={`${animal.label}, cor ${color.name}. Toque para mudar a cor`}
              className="relative flex min-h-0 flex-col items-center justify-center overflow-hidden rounded-[2rem] border-2 border-white/70 bg-white/55 px-2 shadow-sm"
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              onPointerDown={(event) => handlePointerDown(event, animal.name)}
              onTouchStart={(event) => handleTouchStart(event, animal.name)}
            >
              <motion.div
                animate={{ opacity: isActive ? [0.35, 0.7, 0.35] : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="pointer-events-none absolute inset-4 rounded-full bg-white blur-xl"
              />
              <AnimalIllustration name={animal.name} color={color.value} />
              <span className="relative mt-1 text-sm font-bold text-zen-gray/80 sm:text-base">{animal.label}</span>
              <span className="relative mt-1 text-[10px] text-zen-gray/60 sm:text-xs">{color.name}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

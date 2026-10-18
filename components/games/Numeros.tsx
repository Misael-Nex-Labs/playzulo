"use client";

import React, { useState } from "react";
import { AnimatePresence, motion, type TargetAndTransition } from "framer-motion";
import {
  Sun,
  Cloud,
  Flower2,
  Leaf,
  Star,
  Droplets,
  Bird,
  CircleDot,
  Heart,
  Apple,
  type LucideIcon,
} from "lucide-react";
import { soundManager } from "@/lib/sounds";

interface NumberTheme {
  value: number;
  word: string;
  itemLabel: string;
  bg: string;
  accent: string;
  badgeText: string;
  Icon: LucideIcon;
  animationName: string;
  getAnimate: (index: number) => TargetAndTransition;
}

const NUMBER_THEMES: NumberTheme[] = [
  {
    value: 1,
    word: "Um",
    itemLabel: "Sol brilhando",
    bg: "#ffe0b2",
    accent: "#d99b4e",
    badgeText: "#607d8b",
    Icon: Sun,
    animationName: "Giro solar suave",
    getAnimate: () => ({
      opacity: [0, 1],
      scale: [0.5, 1.02, 1],
      rotate: [0, 25, 0],
    }),
  },
  {
    value: 2,
    word: "Dois",
    itemLabel: "Nuvens flutuando",
    bg: "#e0f7ff",
    accent: "#6fa8c9",
    badgeText: "#607d8b",
    Icon: Cloud,
    animationName: "Brisa lateral",
    getAnimate: (i) => ({
      opacity: [0, 1],
      x: [i % 2 === 0 ? -18 : 18, i % 2 === 0 ? 6 : -6, 0],
      scale: [0.7, 1],
    }),
  },
  {
    value: 3,
    word: "Três",
    itemLabel: "Flores desabrochando",
    bg: "#f8bbd0",
    accent: "#c97a96",
    badgeText: "#607d8b",
    Icon: Flower2,
    animationName: "Desabrochar",
    getAnimate: () => ({
      opacity: [0, 1],
      scale: [0.3, 1.02, 1],
      rotate: [-18, 6, 0],
      y: [12, 0],
    }),
  },
  {
    value: 4,
    word: "Quatro",
    itemLabel: "Folhas caindo na brisa",
    bg: "#d4e6a5",
    accent: "#7f9142",
    badgeText: "#607d8b",
    Icon: Leaf,
    animationName: "Folha ao vento",
    getAnimate: (i) => ({
      opacity: [0, 1],
      scale: [0.6, 1.02, 1],
      y: [-20, 4, 0],
      x: [i % 2 === 0 ? -10 : 10, 0],
      rotate: [i % 2 === 0 ? -20 : 20, 0],
    }),
  },
  {
    value: 5,
    word: "Cinco",
    itemLabel: "Estrelas cintilando",
    bg: "#fff9c4",
    accent: "#c4a747",
    badgeText: "#607d8b",
    Icon: Star,
    animationName: "Brilho estelar",
    getAnimate: (i) => ({
      opacity: [0, 1],
      scale: [0.4, 1.02, 0.96, 1],
      rotate: [0, i % 2 === 0 ? 16 : -16, 0],
    }),
  },
  {
    value: 6,
    word: "Seis",
    itemLabel: "Gotinhas de chuva",
    bg: "#e0f7ff",
    accent: "#5d9ec4",
    badgeText: "#607d8b",
    Icon: Droplets,
    animationName: "Pingo suave",
    getAnimate: () => ({
      opacity: [0, 1],
      y: [-22, 3, 0],
      scale: [0.6, 1.02, 1],
    }),
  },
  {
    value: 7,
    word: "Sete",
    itemLabel: "Passarinhos cantando",
    bg: "#ffe0b2",
    accent: "#c98a4b",
    badgeText: "#607d8b",
    Icon: Bird,
    animationName: "Voo calmo",
    getAnimate: (i) => ({
      opacity: [0, 1],
      scale: [0.6, 1.02, 1],
      y: [14, -8, 0],
      x: [i % 2 === 0 ? -8 : 8, 0],
      rotate: [-8, 5, 0],
    }),
  },
  {
    value: 8,
    word: "Oito",
    itemLabel: "Bolhas subindo",
    bg: "#f8bbd0",
    accent: "#c47491",
    badgeText: "#607d8b",
    Icon: CircleDot,
    animationName: "Flutuação de bolha",
    getAnimate: (i) => ({
      opacity: [0, 1],
      y: [22, -6, 0],
      x: [0, i % 2 === 0 ? 5 : -5, 0],
      scale: [0.4, 1.02, 1],
    }),
  },
  {
    value: 9,
    word: "Nove",
    itemLabel: "Corações pulsando",
    bg: "#f8bbd0",
    accent: "#bf6988",
    badgeText: "#607d8b",
    Icon: Heart,
    animationName: "Pulso acolhedor",
    getAnimate: () => ({
      opacity: [0, 1],
      scale: [0.4, 1.02, 0.94, 1.02, 1],
    }),
  },
  {
    value: 10,
    word: "Dez",
    itemLabel: "Maçãs no pomar",
    bg: "#d4e6a5",
    accent: "#7b8f3b",
    badgeText: "#607d8b",
    Icon: Apple,
    animationName: "Balanço no galho",
    getAnimate: (i) => ({
      opacity: [0, 1],
      scale: [0.5, 1],
      rotate: [0, i % 2 === 0 ? 12 : -12, i % 2 === 0 ? -6 : 6, 0],
    }),
  },
];

export default function Numeros() {
  const [selectedNumber, setSelectedNumber] = useState<number>(1);
  const [animCycle, setAnimCycle] = useState<number>(0);
  const [countedIndices, setCountedIndices] = useState<number[]>([]);

  const currentTheme =
    NUMBER_THEMES.find((t) => t.value === selectedNumber) || NUMBER_THEMES[0];
  const ItemIcon = currentTheme.Icon;

  const triggerNumber = (num: number) => {
    soundManager.playNumberSound(num);
    setSelectedNumber(num);
    setCountedIndices([]);
    setAnimCycle((c) => c + 1);
  };

  const handleItemTap = (index: number) => {
    soundManager.playStarChime(index);
    setCountedIndices((prev) =>
      prev.includes(index) ? prev : [...prev, index]
    );
  };

  return (
    <div
      className="relative flex h-full min-h-0 w-full flex-col justify-between overflow-hidden rounded-[2rem] bg-zen-bg p-3 sm:p-5 md:p-6 text-zen-gray select-none"
      style={{ touchAction: "none" }}
    >
      {/* Fundo suave decorativo */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -right-16 -top-16 h-52 w-52 rounded-full opacity-40 blur-3xl transition-colors duration-700"
          style={{ backgroundColor: currentTheme.bg }}
        />
        <div
          className="absolute -bottom-16 -left-16 h-52 w-52 rounded-full opacity-35 blur-3xl transition-colors duration-700"
          style={{ backgroundColor: currentTheme.bg }}
        />
      </div>

      {/* Palco Principal: Número em destaque + Objetos animados */}
      <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6 md:gap-8">
        {/* Cartão do Número Grande (nunca cortado, com alto contraste suave) */}
        <AnimatePresence mode="wait">
          <motion.button
            key={`num-card-${currentTheme.value}-${animCycle}`}
            type="button"
            aria-label={`Número ${currentTheme.value}, ${currentTheme.word}. Toque para ouvir e animar novamente.`}
            onClick={() => triggerNumber(currentTheme.value)}
            onPointerDown={(event) => {
              event.preventDefault();
              if (event.pointerType === "touch") return;
              triggerNumber(currentTheme.value);
            }}
            onTouchStart={(event) => {
              event.preventDefault();
              triggerNumber(currentTheme.value);
            }}
            initial={{ opacity: 0, scale: 0.88, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.4 } }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex shrink-0 cursor-pointer flex-col items-center justify-center rounded-[2rem] border-4 border-white px-6 py-3 shadow-md sm:px-8 sm:py-5 focus:outline-none focus-visible:ring-4 focus-visible:ring-zen-green/60"
            style={{
              backgroundColor: currentTheme.bg,
              touchAction: "none",
            }}
          >
            <span
              className="font-display text-5xl font-black leading-tight sm:text-7xl md:text-8xl"
              style={{ color: "#607d8b" }}
            >
              {currentTheme.value}
            </span>
            <span className="mt-0.5 font-display text-base font-bold text-zen-gray sm:text-xl">
              {currentTheme.word}
            </span>
            <span className="text-[11px] font-bold text-zen-gray/75 sm:text-xs">
              {currentTheme.itemLabel}
            </span>
          </motion.button>
        </AnimatePresence>

        {/* Área de Contagem com Animação Exclusiva para Cada Número */}
        <div className="flex min-h-0 flex-1 items-center justify-center w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={`items-${currentTheme.value}-${animCycle}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
              transition={{ duration: 0.45 }}
              className={`grid place-items-center gap-2 sm:gap-3 ${
                currentTheme.value === 1
                  ? "grid-cols-1"
                  : currentTheme.value <= 2
                  ? "grid-cols-2"
                  : currentTheme.value <= 4
                  ? "grid-cols-2"
                  : currentTheme.value <= 6
                  ? "grid-cols-3"
                  : "grid-cols-5"
              }`}
            >
              {Array.from({ length: currentTheme.value }, (_, index) => {
                const isCounted = countedIndices.includes(index);
                return (
                  <motion.button
                    key={`${currentTheme.value}-item-${index}`}
                    type="button"
                    aria-label={`Contar ${index + 1}`}
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={
                      isCounted
                        ? { scale: [1, 1.02, 1], rotate: [0, 8, -6, 0], opacity: 1 }
                        : currentTheme.getAnimate(index)
                    }
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      duration: 0.65,
                      delay: isCounted ? 0 : index * 0.08,
                      ease: "easeOut",
                    }}
                    onClick={() => handleItemTap(index)}
                    onPointerDown={(event) => {
                      event.preventDefault();
                      if (event.pointerType === "touch") return;
                      handleItemTap(index);
                    }}
                    onTouchStart={(event) => {
                      event.preventDefault();
                      handleItemTap(index);
                    }}
                    className="relative flex h-12 w-12 sm:h-15 sm:w-15 md:h-16 md:w-16 cursor-pointer items-center justify-center rounded-2xl border-2 border-white bg-white/80 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-zen-green"
                    style={{
                      touchAction: "none",
                      backgroundColor: isCounted ? currentTheme.bg : "rgba(255,255,255,0.85)",
                    }}
                  >
                    <ItemIcon
                      className="h-6 w-6 sm:h-8 sm:w-8"
                      style={{ color: currentTheme.accent }}
                      strokeWidth={2.2}
                    />
                    <span className="absolute -bottom-1 -right-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-white text-[10px] font-black text-zen-gray shadow-xs">
                      {index + 1}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Barra Inferior: Todos os números de 1 a 10 sempre visíveis e sem cortes */}
      <nav
        aria-label="Escolha um número de 1 a 10"
        className="relative z-10 mt-2 shrink-0 rounded-3xl border-2 border-white bg-white/70 p-2 shadow-sm backdrop-blur-xs"
      >
        <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-10 sm:gap-2">
          {NUMBER_THEMES.map((item) => {
            const isSelected = item.value === selectedNumber;
            return (
              <motion.button
                key={item.value}
                type="button"
                aria-label={`Número ${item.value}`}
                aria-pressed={isSelected}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onClick={() => triggerNumber(item.value)}
                onPointerDown={(event) => {
                  event.preventDefault();
                  if (event.pointerType === "touch") return;
                  triggerNumber(item.value);
                }}
                onTouchStart={(event) => {
                  event.preventDefault();
                  triggerNumber(item.value);
                }}
                className={`flex h-10 sm:h-12 cursor-pointer items-center justify-center rounded-2xl font-display text-lg sm:text-xl font-black transition-shadow focus:outline-none focus-visible:ring-4 focus-visible:ring-zen-green/60 ${
                  isSelected
                    ? "border-2 border-zen-gray/50 shadow-sm"
                    : "border border-zen-gray/15 opacity-85 hover:opacity-100"
                }`}
                style={{
                  backgroundColor: item.bg,
                  color: "#607d8b",
                  touchAction: "none",
                }}
              >
                {item.value}
              </motion.button>
            );
          })}
        </div>
      </nav>

      <p className="sr-only" aria-live="polite">
        Número selecionado: {currentTheme.value} ({currentTheme.word}) — {currentTheme.itemLabel}.
      </p>
    </div>
  );
}

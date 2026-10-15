"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundManager } from "@/lib/sounds";

const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const COLOR_BY_NUMBER: Record<number, string> = {
  0: "var(--zen-blue)",
  1: "var(--zen-green)",
  2: "var(--zen-yellow)",
  3: "var(--zen-pink)",
  4: "var(--zen-cream)",
  5: "var(--zen-blue)",
  6: "var(--zen-green)",
  7: "var(--zen-yellow)",
  8: "var(--zen-pink)",
  9: "var(--zen-cream)",
};

export default function Numeros() {
  const [activeNumber, setActiveNumber] = useState<number | null>(null);

  const handleTap = (number: number) => {
    soundManager.playPop();
    setActiveNumber(number);
    window.setTimeout(() => setActiveNumber(null), 800);
  };

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-[2rem] bg-zen-cream text-zen-gray select-none"
      style={{ touchAction: "none" }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-zen-blue/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-zen-yellow/20 blur-3xl" />
      </div>

      <div className="relative flex h-full w-full flex-col items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {NUMBERS.map((number) => (
            <motion.div
              key={number}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: activeNumber === number ? 1 : 0.55, scale: activeNumber === number ? 1.08 : 1, y: activeNumber === number ? 0 : 0 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.4 } }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                duration: activeNumber === number ? 0.4 : 0.7,
              }}
              onClick={() => handleTap(number)}
              onPointerDown={(event) => {
                event.preventDefault();
                handleTap(number);
              }}
              className="flex flex-col items-center gap-5"
            >
              <span
                className="text-7xl font-black font-display leading-none tracking-tight"
                style={{ color: COLOR_BY_NUMBER[number] }}
              >
                {number}
              </span>
              <div className="flex items-center gap-1.5 text-sm font-bold text-zen-gray/70">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((dot) => (
                  <motion.div
                    key={dot}
                    initial={{ scale: 0 }}
                    animate={{ scale: dot < number ? 1 : 0 }}
                    transition={{
                      duration: 0.5,
                      delay: dot * 0.06,
                      ease: "easeOut",
                    }}
                    className="h-3 w-3 rounded-full bg-zen-gray/40"
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <p className="sr-only">
        Toque em um número para ouvir um som macio de madeira e ver a quantidade.
      </p>
    </div>
  );
}

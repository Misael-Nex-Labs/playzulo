"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { soundManager } from "@/lib/sounds";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const STAR_COLORS = [
  "var(--color-zen-pink)",
  "var(--color-zen-blue)",
  "var(--color-zen-cream)",
  "var(--color-zen-yellow)",
];

const STAR_COUNT = 10;

export default function ToqueNasEstrelas() {
  const [stars] = useState<Star[]>(() =>
    Array.from({ length: STAR_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * 0.82 + 0.09,
      y: Math.random() * 0.66 + 0.14,
      size: 20 + Math.random() * 26,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
    }))
  );

  const [sparks, setSparks] = useState<{ id: number; px: number; py: number }[]>([]);
  const idCounter = useRef(0);

  const sparkle = (x: number, y: number) => {
    const id = idCounter.current++;
    soundManager.playPop();
    setSparks((prev) => [...prev, { id, px: x, py: y }]);
    window.setTimeout(() => {
      setSparks((prev) => prev.filter((s) => s.id !== id));
    }, 900);
  };

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-[2rem] bg-zen-cream text-zen-gray"
      style={{ touchAction: "none" }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-zen-blue/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-zen-pink/25 blur-3xl" />
      </div>

      <div className="pointer-events-none absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute left-0 top-0 select-none"
            style={{ left: `${star.x * 100}%`, top: `${star.y * 100}%`, transform: "translate(-50%, -50%)" }}
          >
            <motion.div
              initial={{ opacity: 0.5, scale: 0.8 }}
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [0.8, 1.05, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                width: star.size,
                height: star.size,
                backgroundColor: star.color,
                borderRadius: "50%",
                boxShadow: `0 0 18px ${star.color}40`,
                cursor: "pointer",
                touchAction: "none",
              }}
              onPointerDown={(event) => {
                event.preventDefault();
                sparkle(star.x * 100, star.y * 100);
              }}
              onTouchStart={(event) => {
                event.preventDefault();
                sparkle(star.x * 100, star.y * 100);
              }}
            />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0">
        {sparks.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: `${s.px}%`,
              top: `${s.py}%`,
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: "var(--color-zen-cream)",
              boxShadow: "0 0 10px rgba(255,255,255,0.8)",
            }}
          />
        ))}
      </div>

      <p className="sr-only">Toque nas estrelas para fazer pestes suaves e ouvir um som macio de madeira.</p>
    </div>
  );
}

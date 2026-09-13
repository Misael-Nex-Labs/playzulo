"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { soundManager } from "@/lib/sounds";

interface Flower {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  centerColor: string;
  pulse: number;
}

const FLOWER_COLORS = [
  "var(--color-zen-pink)",
  "var(--color-zen-yellow)",
  "var(--color-zen-cream)",
  "var(--color-zen-blue)",
];

const CENTER_COLORS = [
  "var(--color-zen-yellow)",
  "var(--color-zen-green)",
  "var(--color-zen-pink)",
];

const MAX_FLOWERS = 25;

function FlowerShape({ flower }: { flower: Flower }) {
  return (
    <div className="relative h-full w-full" aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          className="absolute left-1/2 top-1/2 h-[48%] w-[38%] rounded-full"
          style={{
            backgroundColor: flower.color,
            transform: `translate(-50%, -50%) rotate(${index * 72}deg) translateY(-42%)`,
            transformOrigin: "center center",
            boxShadow: "inset 3px 3px 8px rgba(255,255,255,0.35)",
          }}
        />
      ))}
      <div
        className="absolute left-1/2 top-1/2 h-[30%] w-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/30"
        style={{ backgroundColor: flower.centerColor }}
      />
    </div>
  );
}

export default function OJardimQueAcorda() {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const nextId = useRef(0);
  const lastTouchAt = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const createFlower = useCallback((clientX: number, clientY: number) => {
    const container = containerRef.current;
    if (!container) return;

    const bounds = container.getBoundingClientRect();
    const flower: Flower = {
      id: nextId.current++,
      x: Math.max(5, Math.min(95, ((clientX - bounds.left) / bounds.width) * 100)),
      y: Math.max(8, Math.min(95, ((clientY - bounds.top) / bounds.height) * 100)),
      size: 62 + Math.random() * 42,
      color: FLOWER_COLORS[Math.floor(Math.random() * FLOWER_COLORS.length)],
      centerColor: CENTER_COLORS[Math.floor(Math.random() * CENTER_COLORS.length)],
      pulse: 0,
    };

    soundManager.playPop();
    setFlowers((current) => [...current, flower].slice(-MAX_FLOWERS));
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" && Date.now() - lastTouchAt.current < 500) return;
    createFlower(event.clientX, event.clientY);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    event.preventDefault();
    const touch = event.changedTouches[0];
    if (!touch) return;
    lastTouchAt.current = Date.now();
    createFlower(touch.clientX, touch.clientY);
  };

  const wakeFlower = (id: number, event: React.PointerEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    soundManager.playPop();
    setFlowers((current) =>
      current.map((flower) =>
        flower.id === id ? { ...flower, pulse: flower.pulse + 1 } : flower,
      ),
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden rounded-[2rem] bg-sky-100"
      style={{ touchAction: "none" }}
      onPointerDown={handlePointerDown}
      onTouchStart={handleTouchStart}
      role="application"
      aria-label="Jardim interativo. Toque para fazer flores nascerem."
    >
      <motion.div
        className="pointer-events-none absolute left-[8%] top-[13%] h-8 w-28 rounded-full bg-white/30 blur-sm"
        animate={{ x: [0, 18, 0], opacity: [0.3, 0.45, 0.3] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute right-[8%] top-[26%] h-6 w-20 rounded-full bg-white/25 blur-sm"
        animate={{ x: [0, -14, 0], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[24%] bg-zen-green/45" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[11%] bg-zen-cream/55" />

      <AnimatePresence initial={false}>
        {flowers.map((flower) => (
          <motion.button
            key={flower.id}
            type="button"
            aria-label="Flor do jardim"
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-zen-gray/30"
            style={{
              left: `${flower.x}%`,
              top: `${flower.y}%`,
              width: flower.size,
              height: flower.size,
            }}
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{
              opacity: 1,
              scale: flower.pulse > 0 ? [1, 1.02, 1] : 1,
            }}
            exit={{ opacity: 0, scale: 0.7, filter: "blur(5px)" }}
            transition={{
              opacity: { duration: 0.7, ease: "easeInOut" },
              scale: { duration: 0.75, ease: "easeInOut" },
            }}
            onPointerDown={(event) => wakeFlower(flower.id, event)}
            onTouchStart={(event) => event.stopPropagation()}
          >
            <FlowerShape flower={flower} />
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}

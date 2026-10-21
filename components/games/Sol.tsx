"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sun } from "lucide-react";
import { soundManager } from "@/lib/sounds";

interface Ray {
  id: number;
  x: number;
  y: number;
}

export default function Sol() {
  const [rays, setRays] = useState<Ray[]>([]);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
  }, []);

  const activateSun = () => {
    soundManager.playStarChime(0);
    if (rays.length > 0) return;

    setRays(Array.from({ length: 8 }, (_, id) => {
      const angle = (id / 8) * Math.PI * 2;
      return { id, x: Math.round(Math.cos(angle) * 94), y: Math.round(Math.sin(angle) * 94) };
    }));
    timeoutRef.current = window.setTimeout(() => {
      setRays([]);
      timeoutRef.current = null;
    }, 850);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activateSun();
    }
  };

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#cbe5f6] via-[#e0f7ff] to-[#eef9ff] text-zen-gray select-none"
      style={{ touchAction: "none" }}
      role="application"
      aria-label="Céu azul sereno. Toque no sol para vê-lo brilhar e ouvir uma nota suave."
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#ffe0b2]/40 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-[#d4e6a5]/35 blur-3xl" />
        <div className="absolute -bottom-8 inset-x-0 h-[20%] rounded-t-[50%] bg-[#ABBB6C]/35" />
      </div>

      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <motion.button
          type="button"
          aria-label="Toque no sol para fazê-lo brilhar"
          className="relative flex h-40 w-40 cursor-pointer items-center justify-center rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-zen-green/60 sm:h-48 sm:w-48 md:h-56 md:w-56"
          style={{ touchAction: "none" }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          onPointerDown={(event) => {
            event.preventDefault();
            if (event.pointerType === "touch") return;
            activateSun();
          }}
          onTouchStart={(event) => {
            event.preventDefault();
            activateSun();
          }}
          onKeyDown={handleKeyDown}
        >
          <span className="absolute inset-3 rounded-full bg-[#ffe0b2]/45 blur-xl" aria-hidden="true" />
          <Sun
            className="relative z-10 h-24 w-24 text-[#ffe0b2] drop-shadow-sm sm:h-32 sm:w-32 md:h-36 md:w-36"
            fill="currentColor"
            stroke="#eab676"
            strokeWidth={3}
            aria-hidden="true"
          />
          {rays.map((ray) => (
            <motion.span
              key={ray.id}
              initial={{ opacity: 0, x: 0, y: 0, scale: 0.6 }}
              animate={{ opacity: [0, 0.85, 0], x: ray.x, y: ray.y, scale: [0.6, 1, 0.8] }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffe0b2] shadow-sm"
              aria-hidden="true"
            />
          ))}
        </motion.button>
      </div>

      <p className="sr-only" aria-live="polite">
        Toque no sol para ver seus raios brilharem.
      </p>
    </div>
  );
}

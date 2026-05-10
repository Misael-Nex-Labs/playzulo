"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundManager } from "@/lib/sounds";

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const COLORS = ["var(--color-zen-blue)", "var(--color-zen-pink)", "var(--color-zen-yellow)", "var(--color-zen-cream)"];

export default function TocarNasBolhas() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  const spawnBubble = useCallback(() => {
    if (!containerRef.current) return;

    const { width, height } = containerRef.current.getBoundingClientRect();
    const size = Math.random() * 60 + 100; // Bolhas grandes entre 100px e 160px
    
    // Garantir que a bolha nasça dentro dos limites
    const x = Math.random() * (width - size);
    const y = Math.random() * (height - size);
    
    const newBubble: Bubble = {
      id: nextId.current++,
      x,
      y,
      size,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };

    setBubbles((prev) => {
      const updated = [...prev, newBubble];
      if (updated.length > 6) {
        return updated.slice(1); // Remove a mais antiga se houver mais de 6
      }
      return updated;
    });
  }, []);

  useEffect(() => {
    // Spawn inicial
    spawnBubble();
    
    const interval = setInterval(() => {
      spawnBubble();
    }, Math.random() * 1000 + 1000); // Entre 1s e 2s

    return () => clearInterval(interval);
  }, [spawnBubble]);

  const popBubble = (id: number) => {
    soundManager.playPop();
    setBubbles((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-zen-bg overflow-hidden cursor-pointer rounded-[2rem]"
      style={{ touchAction: "none" }}
    >
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 0.8,
              y: [bubble.y, bubble.y - 10, bubble.y], // Animação de flutuar suave
            }}
            exit={{ 
              scale: 1.5, 
              opacity: 0,
              filter: "blur(10px)"
            }}
            transition={{ 
              opacity: { duration: 0.6 },
              scale: { duration: 0.5, ease: "easeOut" },
              y: { 
                repeat: Infinity, 
                duration: 3 + Math.random() * 2, 
                ease: "easeInOut" 
              }
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              popBubble(bubble.id);
            }}
            className="absolute rounded-full border-2 border-white/30 shadow-inner"
            style={{
              left: bubble.x,
              top: bubble.y,
              width: bubble.size,
              height: bubble.size,
              backgroundColor: bubble.color,
              backdropFilter: "blur(2px)",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Instrução visual muito suave */}
      {bubbles.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <p className="text-2xl font-extrabold text-zen-gray animate-pulse">
            Espere as bolhas aparecerem...
          </p>
        </div>
      )}
    </div>
  );
}

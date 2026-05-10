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

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
}

const COLORS = [
  "var(--color-zen-blue)", 
  "var(--color-zen-pink)", 
  "var(--color-zen-yellow)", 
  "var(--color-zen-cream)"
];

export default function TocarNasBolhas() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [spawnInterval, setSpawnInterval] = useState(2000);
  const [poppedCount, setPoppedCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);
  const nextParticleId = useRef(0);

  const spawnBubble = useCallback(() => {
    if (!containerRef.current) return;

    const { width, height } = containerRef.current.getBoundingClientRect();
    
    // Tamanhos mais variados para dar um aspecto mais natural
    const size = Math.random() * 50 + 80; 
    
    // Margem reduzida para espalhar mais as bolhas
    const safePadding = width < 600 ? 15 : 40;
    
    const availableWidth = width - size - (safePadding * 2);
    const availableHeight = height - size - (safePadding * 2);

    const x = Math.random() * (availableWidth > 0 ? availableWidth : 10) + safePadding;
    const y = Math.random() * (availableHeight > 0 ? availableHeight : 10) + safePadding;
    
    const newBubble: Bubble = {
      id: nextId.current++,
      x,
      y,
      size,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };

    setBubbles((prev) => {
      const updated = [...prev, newBubble];
      // Aumenta o limite de bolhas simultâneas conforme a velocidade aumenta
      const maxBubbles = spawnInterval < 1000 ? 10 : 6;
      return updated.length > maxBubbles ? updated.slice(1) : updated;
    });
  }, [spawnInterval]);

  // Agendador dinâmico de bolhas com aleatoriedade
  useEffect(() => {
    // Adiciona uma variação de até 40% para o tempo ser imprevisível
    const jitter = (Math.random() * 0.8) + 0.6; // Entre 60% e 140% do intervalo
    const nextDelay = spawnInterval * jitter;

    const timer = setTimeout(() => {
      spawnBubble();
      
      // 20% de chance de nascer uma segunda bolha logo em seguida (efeito surpresa)
      if (Math.random() > 0.8) {
        setTimeout(spawnBubble, 250);
      }
    }, nextDelay);
    
    return () => clearTimeout(timer);
  }, [bubbles, spawnInterval, spawnBubble]);

  const popBubble = (bubble: Bubble) => {
    soundManager.playPop();
    
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(10);
    }

    // Acelera o jogo conforme a criança joga
    setPoppedCount(prev => prev + 1);
    setSpawnInterval(prev => Math.max(600, prev - 50));

    // Criar partículas exatamente no centro da bolha
    const centerX = bubble.x + bubble.size / 2;
    const centerY = bubble.y + bubble.size / 2;

    const newParticles: Particle[] = Array.from({ length: 8 }).map(() => ({
      id: nextParticleId.current++,
      x: centerX,
      y: centerY,
      vx: (Math.random() - 0.5) * 120,
      vy: (Math.random() - 0.5) * 120,
      color: bubble.color,
    }));

    setParticles((prev) => [...prev, ...newParticles]);
    setBubbles((prev) => prev.filter((b) => b.id !== bubble.id));

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find(np => np.id === p.id)));
    }, 1000);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-zen-bg overflow-hidden cursor-pointer rounded-[2rem]"
      style={{ touchAction: "none" }}
    >
      {/* Camada de Partículas */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ 
              x: p.vx, 
              y: p.vy, 
              scale: 0, 
              opacity: 0 
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute w-3 h-3 rounded-full pointer-events-none z-30"
            style={{ 
              left: p.x, 
              top: p.y, 
              backgroundColor: p.color, 
              filter: "blur(1px)" 
            }}
          />
        ))}
      </AnimatePresence>

      {/* Camada de Bolhas */}
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              // Flutuação suave
              y: [0, -15, 0], 
              x: [0, 5, 0],
            }}
            exit={{ 
              scale: 1.5, 
              opacity: 0, 
              filter: "blur(10px)",
              pointerEvents: "none" 
            }}
            transition={{ 
              scale: { type: "spring", stiffness: 100, damping: 15 },
              y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
              x: { repeat: Infinity, duration: 3, ease: "easeInOut" }
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              popBubble(bubble);
            }}
            className="absolute rounded-full shadow-lg border-2 border-white/40 z-20"
            style={{
              left: bubble.x,
              top: bubble.y,
              width: bubble.size,
              height: bubble.size,
              background: `radial-gradient(circle at 30% 30%, white 0%, transparent 15%), radial-gradient(circle at 70% 70%, transparent 0%, rgba(255,255,255,0.1) 100%), ${bubble.color}`,
              backdropFilter: "blur(4px)",
              boxShadow: `inset -10px -10px 20px rgba(0,0,0,0.05), inset 10px 10px 20px rgba(255,255,255,0.4)`,
            }}
          >
            {/* Brilho de Reflexo Interno */}
            <div className="absolute top-[15%] left-[15%] w-[25%] h-[25%] bg-white/40 rounded-full blur-[2px]" />
          </motion.div>
        ))}
      </AnimatePresence>

    </div>
  );
}

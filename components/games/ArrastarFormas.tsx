"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { soundManager } from "@/lib/sounds";

type ShapeKind = "circle" | "square" | "triangle";

type Shape = {
  id: ShapeKind;
  label: string;
  color: string;
  start: { left: string; top: string };
  target: { left: string; top: string };
};

const SHAPES: Shape[] = [
  {
    id: "circle",
    label: "Círculo",
    color: "var(--color-zen-pink)",
    start: { left: "14%", top: "14%" },
    target: { left: "15%", top: "72%" },
  },
  {
    id: "square",
    label: "Quadrado",
    color: "var(--color-zen-yellow)",
    start: { left: "43%", top: "14%" },
    target: { left: "43%", top: "72%" },
  },
  {
    id: "triangle",
    label: "Triângulo",
    color: "var(--color-zen-blue)",
    start: { left: "72%", top: "14%" },
    target: { left: "71%", top: "72%" },
  },
];

const SHAPE_SIZE = 72;

function ShapeIcon({ kind, color }: { kind: ShapeKind; color: string }) {
  const common = {
    width: SHAPE_SIZE,
    height: SHAPE_SIZE,
    backgroundColor: color,
  };

  if (kind === "triangle") {
    return (
      <div
        aria-hidden="true"
        className="h-[72px] w-[72px]"
        style={{
          ...common,
          clipPath: "polygon(50% 4%, 96% 94%, 4% 94%)",
        }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={kind === "circle" ? "h-[72px] w-[72px] rounded-full" : "h-[72px] w-[72px] rounded-2xl"}
      style={common}
    />
  );
}

function ShapeSilhouette({ kind }: { kind: ShapeKind }) {
  const base = "border-[3px] border-dashed border-zen-gray/45";

  if (kind === "triangle") {
    return (
      <div
        aria-hidden="true"
        className="h-[72px] w-[72px]"
        style={{
          clipPath: "polygon(50% 4%, 96% 94%, 4% 94%)",
          border: "3px dashed var(--color-zen-gray)",
          opacity: 0.45,
        }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`${base} ${kind === "circle" ? "rounded-full" : "rounded-2xl"} h-[72px] w-[72px]`}
    />
  );
}

export default function ArrastarFormas() {
  const areaRef = useRef<HTMLDivElement>(null);
  const [round, setRound] = useState(1);
  const [matched, setMatched] = useState<ShapeKind[]>([]);
  const showCelebration = matched.length === SHAPES.length;

  const isMatched = useCallback(
    (kind: ShapeKind) => matched.includes(kind),
    [matched],
  );

  const handleDragEnd = (kind: ShapeKind, element: HTMLDivElement | null) => {
    if (!element || !areaRef.current || isMatched(kind)) return;

    const target = areaRef.current.querySelector(`[data-target="${kind}"]`);
    if (!target) return;

    const shapeRect = element.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const shapeCenter = {
      x: shapeRect.left + shapeRect.width / 2,
      y: shapeRect.top + shapeRect.height / 2,
    };
    const isInside =
      shapeCenter.x >= targetRect.left &&
      shapeCenter.x <= targetRect.right &&
      shapeCenter.y >= targetRect.top &&
      shapeCenter.y <= targetRect.bottom;

    if (!isInside) return;

    soundManager.playSuccess();
    setMatched((current) => (current.includes(kind) ? current : [...current, kind]));
  };

  useEffect(() => {
    if (matched.length !== SHAPES.length) return;

    const nextRound = window.setTimeout(() => {
      setMatched([]);
      setRound((current) => current + 1);
    }, 1500);

    return () => window.clearTimeout(nextRound);
  }, [matched]);

  return (
    <div
      ref={areaRef}
      className="relative h-full w-full overflow-hidden rounded-[2rem] bg-zen-blue/45 text-zen-gray"
      style={{ touchAction: "none" }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-5 z-10 text-center">
        <p className="text-sm font-semibold text-zen-gray/80 md:text-base">
          Arraste cada forma para seu lugar
        </p>
        <p className="mt-1 text-xs text-zen-gray/60">Rodada {round}</p>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[35%] bg-zen-cream/60" />

      {SHAPES.map((shape) => (
        <div
          key={`${round}-${shape.id}-target`}
          data-target={shape.id}
          className="pointer-events-none absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
          style={{ left: shape.target.left, top: shape.target.top }}
          aria-label={`Lugar do ${shape.label}`}
        >
          <ShapeSilhouette kind={shape.id} />
        </div>
      ))}

      {SHAPES.map((shape) => (
        <motion.div
          key={`${round}-${shape.id}-${isMatched(shape.id) ? "matched" : "loose"}`}
          className={`absolute z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl p-2 ${
            isMatched(shape.id) ? "pointer-events-none" : "cursor-grab active:cursor-grabbing"
          }`}
          style={{
            left: isMatched(shape.id) ? shape.target.left : shape.start.left,
            top: isMatched(shape.id) ? shape.target.top : shape.start.top,
            touchAction: "none",
          }}
          drag={!isMatched(shape.id)}
          dragConstraints={areaRef}
          dragElastic={0.12}
          dragMomentum={false}
          animate={isMatched(shape.id) ? { opacity: 0.35, scale: 1 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          onPointerDown={(event) => {
            event.stopPropagation();
            if (!isMatched(shape.id)) soundManager.playPop();
          }}
          onTouchStart={(event) => event.stopPropagation()}
          onDragEnd={(event) => {
            event.stopPropagation();
            handleDragEnd(shape.id, event.currentTarget as HTMLDivElement);
          }}
          aria-label={`Arraste o ${shape.label}`}
          role="button"
          tabIndex={0}
        >
          <ShapeIcon kind={shape.id} color={shape.color} />
        </motion.div>
      ))}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: showCelebration ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-x-0 bottom-8 z-30 text-center text-lg font-bold text-zen-gray"
        aria-live="polite"
      >
        Parabéns!
      </motion.p>
    </div>
  );
}

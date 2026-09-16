"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { soundManager } from "@/lib/sounds";

const COLORS = [
  { name: "Rosa chá", value: "var(--color-zen-pink)" },
  { name: "Amarelo pêssego", value: "var(--color-zen-yellow)" },
  { name: "Azul céu", value: "var(--color-zen-blue)" },
  { name: "Verde musgo", value: "var(--color-zen-green)" },
  { name: "Creme", value: "var(--color-zen-cream)" },
] as const;

type AnimalName =
  | "elefante"
  | "leao"
  | "girafa"
  | "passarinho"
  | "coelho"
  | "raposa"
  | "tartaruga"
  | "baleia"
  | "panda"
  | "gato"
  | "sapo"
  | "urso";

type Animal = { name: AnimalName; label: string; colorIndex: number };

const PAGES: Animal[][] = [
  [
    { name: "elefante", label: "Elefante", colorIndex: 2 },
    { name: "leao", label: "Leão", colorIndex: 1 },
    { name: "girafa", label: "Girafa", colorIndex: 3 },
    { name: "passarinho", label: "Passarinho", colorIndex: 0 },
  ],
  [
    { name: "coelho", label: "Coelho", colorIndex: 0 },
    { name: "raposa", label: "Raposa", colorIndex: 1 },
    { name: "tartaruga", label: "Tartaruga", colorIndex: 3 },
    { name: "baleia", label: "Baleia", colorIndex: 2 },
  ],
  [
    { name: "panda", label: "Panda", colorIndex: 4 },
    { name: "gato", label: "Gato", colorIndex: 2 },
    { name: "sapo", label: "Sapo", colorIndex: 3 },
    { name: "urso", label: "Urso", colorIndex: 1 },
  ],
];

function AnimalIllustration({ name, color }: { name: AnimalName; color: string }) {
  const stroke = "var(--color-zen-gray)";
  const common = { fill: color, stroke, strokeWidth: 2.5, strokeLinejoin: "round" as const };

  const face = (eyesY = 46) => (
    <>
      <circle cx="42" cy={eyesY} r="2.5" fill={stroke} stroke="none" />
      <circle cx="58" cy={eyesY} r="2.5" fill={stroke} stroke="none" />
      <path d={`M48 ${eyesY + 9} Q50 ${eyesY + 12} 52 ${eyesY + 9}`} fill="none" stroke={stroke} />
    </>
  );

  let body: React.ReactNode;
  switch (name) {
    case "elefante":
      body = <><ellipse cx="50" cy="55" rx="31" ry="23" {...common} /><circle cx="50" cy="35" r="19" {...common} /><circle cx="31" cy="37" r="12" opacity=".7" {...common} /><path d="M57 42c8 9 2 25-4 28" fill="none" stroke={stroke} strokeWidth="7" strokeLinecap="round" />{face(32)}<path d="M31 74v12M68 74v12" fill="none" stroke={stroke} strokeWidth="6" strokeLinecap="round" /></>;
      break;
    case "leao":
      body = <><circle cx="50" cy="50" r="34" fill="var(--color-zen-yellow)" opacity=".65" stroke={stroke} strokeWidth="2.5" /><circle cx="50" cy="50" r="24" {...common} />{face(46)}<path d="M35 78v9M65 78v9" fill="none" stroke={stroke} strokeWidth="6" strokeLinecap="round" /></>;
      break;
    case "girafa":
      body = <><path d="M39 68V25Q39 12 50 12t11 13v43" {...common} /><ellipse cx="50" cy="68" rx="29" ry="17" {...common} /><circle cx="50" cy="20" r="17" {...common} />{face(18)}<circle cx="43" cy="39" r="3" fill="var(--color-zen-green)" stroke="none" /><circle cx="56" cy="58" r="3" fill="var(--color-zen-green)" stroke="none" /><path d="M32 79v8M68 79v8" fill="none" stroke={stroke} strokeWidth="6" strokeLinecap="round" /></>;
      break;
    case "passarinho":
      body = <><ellipse cx="50" cy="55" rx="29" ry="24" {...common} /><circle cx="53" cy="34" r="17" {...common} /><path d="M68 35l15 7-15 7z" fill="var(--color-zen-yellow)" stroke={stroke} strokeWidth="2.5" />{face(32)}<path d="M35 55q-17 7-8 19 8-3 17-11" fill="var(--color-zen-pink)" stroke={stroke} strokeWidth="2.5" /></>;
      break;
    case "coelho":
      body = <><ellipse cx="50" cy="60" rx="28" ry="22" {...common} /><circle cx="50" cy="40" r="19" {...common} /><path d="M38 26Q30 1 43 14l7 14M57 28Q67 2 69 17l-6 14" {...common} />{face(38)}<circle cx="72" cy="75" r="7" {...common} /></>;
      break;
    case "raposa":
      body = <><path d="M23 31 34 12l16 12 16-12 11 19v30q-27 28-54 0z" {...common} />{face(43)}<path d="M73 65q25 3 12 19-10 5-23-4" {...common} /></>;
      break;
    case "tartaruga":
      body = <><ellipse cx="50" cy="52" rx="34" ry="25" {...common} /><circle cx="86" cy="52" r="10" {...common} /><path d="M27 74 18 84M42 77l-3 11M67 76l5 10" fill="none" stroke={stroke} strokeWidth="6" strokeLinecap="round" /><path d="M28 48q22-23 44 0M34 61q16-16 32 0" fill="none" stroke={stroke} opacity=".45" />{face(49)}</>;
      break;
    case "baleia":
      body = <><path d="M17 58Q22 25 56 30q24 2 26 27-18 24-49 15-12-3-16-14z" {...common} /><path d="M45 30q-4-15 5-20M52 30q6-13 14-15" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" /><path d="M82 56l15-11v22z" {...common} />{face(44)}</>;
      break;
    case "panda":
      body = <><ellipse cx="50" cy="58" rx="30" ry="24" {...common} /><circle cx="50" cy="37" r="21" {...common} /><circle cx="39" cy="35" r="7" fill="var(--color-zen-gray)" opacity=".65" /><circle cx="61" cy="35" r="7" fill="var(--color-zen-gray)" opacity=".65" />{face(36)}<path d="M33 77v9M67 77v9" fill="none" stroke={stroke} strokeWidth="6" strokeLinecap="round" /></>;
      break;
    case "gato":
      body = <><path d="M29 31 36 12l14 12 14-12 7 19v31Q50 83 29 62z" {...common} />{face(43)}<path d="M30 52H13M30 59H15M70 52h17M70 59h15" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" /><path d="M72 65q20 10 10 22" fill="none" stroke={stroke} strokeWidth="7" strokeLinecap="round" /></>;
      break;
    case "sapo":
      body = <><ellipse cx="50" cy="58" rx="32" ry="24" {...common} /><circle cx="34" cy="31" r="11" {...common} /><circle cx="66" cy="31" r="11" {...common} />{face(31)}<path d="M35 67q15 12 30 0" fill="none" stroke={stroke} strokeWidth="2.5" /></>;
      break;
    default:
      body = <><circle cx="50" cy="51" r="29" {...common} /><circle cx="31" cy="29" r="11" {...common} /><circle cx="69" cy="29" r="11" {...common} />{face(45)}<path d="M30 75v10M70 75v10" fill="none" stroke={stroke} strokeWidth="7" strokeLinecap="round" /></>;
  }

  return <svg viewBox="0 0 100 100" className="h-28 w-32 sm:h-32 sm:w-36" aria-hidden="true">{body}</svg>;
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
          return <motion.button key={animal.name} type="button" aria-label={`${animal.label}, cor ${color.name}. Toque para mudar a cor`} className="relative flex min-h-0 flex-col items-center justify-center overflow-hidden rounded-[2rem] border-2 border-white/70 bg-white/55 px-1 shadow-sm" whileTap={{ scale: 0.99 }} transition={{ duration: 0.45, ease: "easeInOut" }} onPointerDown={(event) => handlePointer(event, () => changeColor(animal.name))} onTouchStart={(event) => handleTouch(event, () => changeColor(animal.name))}>
            <motion.div animate={{ opacity: isActive ? [0.25, 0.65, 0.25] : 0 }} transition={{ duration: 0.8, ease: "easeInOut" }} className="pointer-events-none absolute inset-4 rounded-full bg-white blur-xl" />
            <AnimalIllustration name={animal.name} color={color.value} />
            <span className="relative mt-1 text-sm font-bold text-zen-gray/80 sm:text-base">{animal.label}</span>
            <span className="relative mt-1 text-[10px] text-zen-gray/60 sm:text-xs">{isActive ? color.name : "Toque para explorar"}</span>
          </motion.button>;
        })}
      </div>
      <nav className="relative z-10 mt-3 flex items-center justify-center gap-5" aria-label="Páginas de bichinhos">
        <button type="button" aria-label="Página anterior" className="flex h-11 w-14 items-center justify-center rounded-full bg-zen-green text-2xl text-zen-gray shadow-sm" onPointerDown={(event) => handlePointer(event, () => changePage(page - 1))} onTouchStart={(event) => handleTouch(event, () => changePage(page - 1))}>‹</button>
        <span className="text-sm text-zen-gray/70" aria-live="polite">{page + 1} de {PAGES.length}</span>
        <button type="button" aria-label="Próxima página" className="flex h-11 w-14 items-center justify-center rounded-full bg-zen-green text-2xl text-zen-gray shadow-sm" onPointerDown={(event) => handlePointer(event, () => changePage(page + 1))} onTouchStart={(event) => handleTouch(event, () => changePage(page + 1))}>›</button>
      </nav>
    </div>
  );
}

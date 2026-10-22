# PlayZulo

**PlayZulo** — projetos de jogos educativos gratuitos de baixa estimulação (low-stim) para crianças de 1 a 5 anos.

- **Objetivo:** tráfego orgânico (SEO) e simplicidade técnica extrema.
- **Modelo:** site estático/PWA gratuito (sem backend, sem login, sem assinaturas).

## Stack

- Next.js (App Router) + TypeScript.
- Tailwind CSS.
- Framer Motion (animações suaves).
- pnpm.

Ler o guia de design completo no `AGENTS.md` da raiz.

## Estado atual

- 9 jogos ao ar (tocar-nas-bolhas, o-jardim-que-acorda, arrastar-formas, cores-dos-bichinhos, memoria-dos-bichinhos, toque-nas-estrelas, numeros, letrinha — As Vogais, sol — O Sol que Acorda).
- Categorias: tocar-na-tela, cores, formas, memoria, numeros, letras (vogais).
- Páginas básicas: /privacidade, /sobre, /jogos, sitemap, robots, manifest PWA.
- Dev: `development` (continuous improvement commits pushed directly; Misael handles merges to `main`). Deploy produção no Vercel em `main`.
- Repositório: https://github.com/Misael-Nex-Labs/playzulo

- 2026-10-12: touch-handler pairing in `tocar-nas-bolhas` for reliable iOS/tablet taps.
- 2026-10-14: completed the tocar-na-tela category page (added toque-nas-estrelas).
- 2026-10-15: paired touch handler in "O Jardim que Acorda" for reliable iOS touch.
- 2026-10-15: added the "Números" low-stim counting game (slug `numeros`) to the `numeros` category for 3-5yo children. It is a calm tap-and-peek experience: a big number appears and, when touched, pulses with a soft wood-block sound while a small set of dots reveals its quantity. No scoring, timer, lives, or harsh stimulation — just counting at the child's own pace. Registered in `lib/games.ts`, `components/games/Numeros.tsx`, `public/images/numeros.png`, `app/categorias/[slug]/page.tsx`, and `components/ui/CategoryFilter.tsx`.
- 2026-10-16: paired touch handler in Memória dos Bichinhos for reliable iOS touch.
- 2026-10-17: made Números number rows keyboard-focusable buttons, with Enter/Space activation and visible focus ring.

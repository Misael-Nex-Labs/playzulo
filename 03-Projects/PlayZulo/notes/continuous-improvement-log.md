# PlayZulo Continuous Improvement Log

Chronological notes from the `playzulo-evolution` heartbeat.

## 2026-10-22 — verify catalog image assets and content fields

**What:** Extended the game catalog tests to check that every referenced thumbnail exists in `public/images`, each game's SEO keywords are populated, and FAQ questions/answers are non-empty. This catches broken cards and incomplete parent-facing metadata before release.

**Validation:** `pnpm test` (6 checks passed), `pnpm lint` (success), and `pnpm build` (success; 25 static pages generated).


## 2026-10-13 — add "Toque nas Estrelas" low-stim cause-and-effect game

**What:** Added a sixth game, "Toque nas Estrelas" (slug `toque-nas-estrelas`), to the `tocar` (cause and effect) category for 1-3yo children. It is a calm tap-and-peek experience: soft pastel stars on a night-sky background that flash and chime (soft wood-block sound) when touched. No scoring, no timer, no lives, no harsh stimulation — just cause and effect at the child's own pace.

**Skill lane:** Site basics (privacy, sitemap, robots, 5 games, build + lint green) were healthy, so a small new game was valid. Added `components/games/ToqueNasEstrelas.tsx`, `public/images/toque-nas-estrelas.png`, and the `lib/games.ts` entry; registered the `Star` icon in `app/jogos/[slug]/game-view.tsx`.

**Validation:** `pnpm build` (success, 6 game routes prerendered) + `pnpm lint` (success, no warnings).

**Commit:** 1f7d34f on development, pushed to `origin/development`. Not merged to main; open for Misael's dev -> main review.

## 2026-10-13 — add missing dark color variants for consistent button accents

**What:** The game-view start screen renders an accent `borderColor` with `var(--{color}-dark)`. `--zen-green-dark` existed, but blue/pink/yellow/cream games had no dark variant, so their buttons fell back to the button text color (a gray border) instead of a tinted, visible accent.

**Fix:** Added `--zen-blue-dark`, `--zen-pink-dark`, `--zen-yellow-dark`, `--zen-cream-dark` to `app/globals.css`. No game or layout code changed.

**Validation:** `pnpm build` (success) + `pnpm lint` (success, no warnings).
Commit `dd73419` on development, pushed to `origin/development`. Not merged to
main; open for Misael's dev -> main review.

## 2026-10-12 — pair touch handler in bubble game

**What:** `TocarNasBolhas` reacted only to `onPointerDown`. On iOS Safari
(touch-only/tablet browsers) `PointerEvent` exists in `window` but pointer events
for touch input often never fire, so bubbles could feel unresponsive. The design
guide (`AGENTS.md`) requires pairing touch with pointer from the start.

**Fix:** Added a paired `onTouchStart` that always fires its action
(`preventDefault()` to avoid a matching pointer firing twice on dual-input
devices); `onPointerDown` now skips `pointerType === "touch"` so the action fires
exactly once. Matches the proven pattern already used in `CoresDosBichinhos`.

**Validation:** `pnpm build` (success, TypeScript clean) + `pnpm lint`
(success).

**Commit:** 2840082 on development (pushed to origin/development). Not merged to
main; open for Misael's dev -> main review.

## 2026-10-11 — deduplicate redundant categorias

**What:** The arrastar-e-soltar and formas categories both rendered the same
arrastar-formas game (gameSlugs: `["arrastar-formas"]`), creating duplicate
content and ambiguous category navigation. The game's canonical category field
in lib/games.ts is "formas".

**Fix:** Removed the redundant arrastar-e-soltar category entry from the
categorias array, sitemap route list, homepage category card, and the "Arrastar"
filter button. Kept formas as the authoritative category. No game content was
removed.

**Validation:** pnpm build (success), pnpm lint (success, no warnings).

**Commit:** e36e291 on development (pushed to origin/development). Not merged to
main.

## 2026-10-11 — touch handler fix (CoresDosBichinhos)

**What:** The touch handler on the color-change buttons and page nav was gated on
!(!("PointerEvent" in window)). Modern browsers (iOS Safari especially) report
`PointerEvent` in `window` yet never fire `pointerdown` for touch input, so the
buttons were unresponsive on iPhone/iPad browsers.

**Fix:** Touch handler now always fires its action with preventDefault(); the
pointer handler skips pointerType === "touch" to avoid double-firing on
dual-input devices.

**Validation:** pnpm build (success) + pnpm lint (success).

**Commit:** 8ab8f45 on development (pushed to origin/development). Not merged to
main. Open for Misael's dev -> main review.

## 2026-10-14 — complete the tocar-na-tela category page

**What:** The "tocar-na-tela" category page listed only 2 of the 3 touch games:
tocar-nas-bolhas and o-jardim-que-acorda were present, but toque-nas-estrelas
(was added 2026-10-13) was missing. Its sitemap entry still pointed at it, so the
category card was incomplete.

**Fix:** Added "toque-nas-estrelas" to the category's gameSlugs array in
app/categorias/[slug]/page.tsx. No game or build-code changed.

**Validation:** pnpm build (success) + pnpm lint (success, no warnings).

**Commit:** d3e25b8 on development (pushed to origin/development). Not merged to
main; open for Misael's dev -> main review.

## 2026-10-15 — pair touch handler in O Jardim que Acorda

**What:** `O Jardim que Acorda` touch handling was gated on `if ("PointerEvent" in window) return;` inside `onTouchStart`, which means the fallback never fires because every modern mobile browser ships `PointerEvent`. On touch-only/iPad browsers the flower creation still worked only because the parent `onPointerDown` handled the pointer, leaving the touch path unverified and fragile for older mobile browsers.

**Fix:** `onPointerDown` now skips `pointerType === "touch"` so the action fires exactly once; the paired `onTouchStart` always fires its action (`preventDefault()`), guaranteeing flowers appear on browsers without pointer-events support. Matches the proven pattern used in `tocar-nas-bolhas` and `CoresDosBichinhos`.

**Validation:** `pnpm build` (success, 16 game routes prerendered) + `pnpm lint` (success, no warnings).

**Commit:** 7f009a1 on development, pushed to `origin/development`. Not merged to main; open for Misael's dev -> main review.

**What:** Added a seventh game, "Números" (slug `numeros`), to the `numeros` category for 3-5yo children. It is a calm tap-and-count experience: a big number (0-9) appears on a cream background, and when touched it pulses with a soft wood-block sound while a small set of dots reveals its quantity. This fills a content gap — the site previously had no numbers/counting game, and the roadmap explicitly mentions "jogos educativos estruturados" with "números". Added `components/games/Numeros.tsx`, `public/images/numeros.png`, and the `lib/games.ts` entry; registered the `123` icon in `app/jogos/[slug]/game-view.tsx`; added the `numeros` category to `app/categorias/[slug]/page.tsx` and the "Números" filter to `components/ui/CategoryFilter.tsx`.

**Validation:** `pnpm build` (success, 22 game routes prerendered) + `pnpm lint` (success, no warnings).

**Commit:** 149a727 on development, pushed to `origin/development`. Not merged to main; open for Misael's dev -> main review.

## 2026-10-16 — include numeros category in sitemap

**What:** The `numeros` category page existed and was prerendered, but it was missing from `app/sitemap.ts` (`categorySlugs` listed only tocar-na-tela, cores, formas, memoria). This hid the category from Google's index and from `/sitemap.xml`, so the "Números" category (and its games) were not discoverable via sitemap/robots.

**Fix:** Added `"numeros"` to `categorySlugs` in `app/sitemap.ts`. No game or layout code changed; the sitemap now lists `/categorias/numeros` alongside the other four categories.

**Validation:** `pnpm build` (success) + `pnpm lint` (success, no warnings). Verified `sitemap.xml` now contains `<loc>https://playzulo.vercel.app/categorias/numeros</loc>`.

**Commit:** 7581b22 on development, pushed to `origin/development`. Not merged to main; open for Misael's dev -> main review.

Brain notes updated: `03-Projects/PlayZulo/README.md` now reflects 7 games + 5 categories.

## 2026-10-16 — pair touch handler in Memory game for reliable iOS touch

**What:** The `Memória dos Bichinhos` card showed only `onPointerDown` with no paired `onTouchStart`, so the tap did not respond on iOS Safari touch-only browsers (pointer events for touch often never fire). The proven pattern now keeps touch reliable across all games.

**Fix:** Added the paired handler to every flipped card in `components/games/MemoriaDosBichinhos.tsx`: `onPointerDown` skips `pointerType === "touch"`, and `onTouchStart` always fires the action (with `preventDefault()`). Matches the pattern used in the other games.

**Validation:** `pnpm build` (success, 22 game routes prerendered) + `pnpm lint` (success, no warnings).

**Commit:** 0726487 on development, pushed to `origin/development`. Not merged to main; open for Misael's dev -> main review.

## 2026-10-17 — make Numeros number rows keyboard-focusable buttons

**What:** The `Números` game rendered each number row as a `motion.div`, so keyboard users (and screen-reader focus) could not reach or activate the numbers. Mouse/touch was unaffected, but the game missed the accessibility goal.

**Fix:** Wrapped each number row in a `motion.button` with `type="button"`, added `onKeyDown` (Enter/Space fires `handleTap`), and reset button defaults (`p-0 m-0 border-0 bg-transparent`, `cursor-pointer`) plus a visible `focus-visible:ring-4` for keyboard focus. Mouse `onClick` and touch `onPointerDown` are unchanged, so the low-stim tap feel and sound are untouched.

**Validation:** `pnpm build` (success, 22 routes prerendered) + `pnpm lint` (success, no warnings).

**Commit:** fa604da on development, pushed to `origin/development`. Not merged to main; open for Misael's dev -> main review.


## 2026-10-19 — add "As Vogais" literacy discovery game

**What:** Added an eighth low-stim game for ages 3–5, with five large pastel vowel cards (A, E, I, O, U). Touch reveals an associated familiar word and a gentle wooden chime, with no score or timer. Added the `letras` category (labeled "Vogais" in the UI), a bespoke pastel thumbnail, homepage/category-filter/sitemap entries, SEO metadata, and route registration.

**Validation:** `pnpm build` (success, 24 static pages generated) + `pnpm lint` (success). Local HTTP checks returned 200 for `/jogos/letrinha`, `/categorias/letras`, `/sitemap.xml`, and `/images/letrinha.png`.

**Commit:** `ee88629` on development, pushed to `origin/development`; not merged to `main`.

## 2026-10-19 — remove haptics from bubble game for low-stim consistency

**What:** `TocarNasBolhas` was the only game that triggered `navigator.vibrate(10)`. Haptics are not part of PlayZulo's designed low-stim feedback (the manifesto defines sound as soft wood-block + gentle chimes), and a baby's device gets unpredictable vibration. Removed the haptics so the experience is audio + calm visual pop only.

**Fix:** Deleted the `navigator.vibrate` block inside `popBubble()` and noted the reasoning in a comment.

**Validation:** `pnpm build` (success, 24 static pages) + `pnpm lint` (success, no warnings).

**Commit:** `ca4f519` on development, pushed to `origin/development`; not merged to `main`.

**What:** `app/jogos/[slug]/game-view.tsx` registered `numeros` in `lib/games.ts` but the `gameComponents` map did not include it, so clicking the "Números" game card opened the start screen with no playable component. A broken production behavior.

**Fix:** Added `import Numeros from "@/components/games/Numeros"` and `'numeros': <Numeros />` to the `gameComponents` map.

**Validation:** `pnpm build` (success, all 22 routes prerendered) + `pnpm lint` (success, no warnings).

**Commit:** 0726487 on development, pushed to `origin/development`. Not merged to main; open for Misael's dev -> main review.

## 2026-10-20 — map the numbers game's `123` icon to the exported `Calculator` glyph

**What:** `numeros` (Números) declares icon `123` in `lib/games.ts`, but `lucide-react` does not export a `123` icon and the game-view `iconMap` had no entry for it, so the Números start screen rendered a generic `Gamepad2` placeholder instead of a number glyph. A visible, inconsistent polish defect.

**Fix:** Added `'123': Calculator` to the `iconMap` in `app/jogos/[slug]/game-view.tsx`, using the already-imported `Calculator` lucide icon. No game logic changed; the central pulsating icon now matches the site's other games.

**Validation:** `pnpm build` (success, all game routes prerendered) + `pnpm lint` (success, no warnings).

## 2026-10-21 — add "O Sol que Acorda" calm cause-and-effect game

**What:** Added a ninth game for ages 1–3: a gentle sun in a pastel sky responds to touch with soft rays and a wood-like note. Added SEO metadata, a bespoke pastel thumbnail, game/category registration, and the Sun start-screen icon. No scores, timers, or pressure.

**Validation:** `pnpm build` (success, 25 static pages generated) + `pnpm lint` (success). The route is included in the statically generated game routes.

**Commit:** `45b1852` on development, pushed to `origin/development`; not merged to `main`.

## 2026-10-22 — docs: update brain README to reflect 9 games on development

**What:** The PlayZulo brain README (`03-Projects/PlayZulo/README.md`) still listed 8 games. Updated it to reflect the current state: 9 games on `development`, 6 categories, all site basics healthy (privacy, sitemap, robots, about, manifest). No game or layout code changed.

**Validation:** `pnpm test` (6 passed), `pnpm build` (success, 25 static pages), `pnpm lint` (success). All green.

**Commit:** `5bbbd47` on `development`, pushed to `origin/development`. Not merged to `main`.

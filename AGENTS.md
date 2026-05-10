<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# PlayZulo - Instruções do Agente de IA

## 🎯 Objetivo do Projeto
O PlayZulo é um site gratuito de jogos educativos de baixa estimulação (low-stim) para crianças de 1 a 5 anos. O foco é tráfego orgânico (SEO) e simplicidade técnica extrema. 

**Modelo:** Site estático/PWA gratuito (sem backend, sem login, sem assinaturas no MVP).

## 🛠 Stack Técnica
- **Framework:** Next.js (App Router) + TypeScript.
- **Estilização:** Tailwind CSS.
- **Animações:** Framer Motion (suave) ou CSS puro.
- **Assets:** Prioridade para SVGs leves.
- **Gerenciador de Pacotes:**  Sempre usar pnpm.

## 🎨 Identidade Visual (O "Manifesto Zen")
- **Paleta:** Verde menta, Azul céu claro, Amarelo pêssego, Rosa chá, Creme.
- **Regra de Ouro:** Nada de interações abruptas. Use fade-in/fade-out e movimentos lentos.
- **Som:** Apenas frequências baixas/médias (madeira, natureza). Nada de bips agudos.
- **UI:** Botões gigantes, sem textos complicados, bordas arredondadas (rounded-3xl ou full).
- **Tipografia:**
  - **Quicksand:** Fonte principal para o corpo do site (suave e legível).
  - **Fredoka:** Fonte para títulos e elementos de destaque (lúdica e amigável).

## 🧩 Guia de Implementação de Jogos
1. **Eventos de Toque:** Sempre tratar `onTouchStart` junto com eventos de clique para evitar atrasos em tablets.
2. **Prevenção de Saída:** Implementar `pointer-events: none` em áreas críticas e evitar gestos de sistema (zoom/scroll) dentro do canvas do jogo.
3. **Causa e Efeito:** Cada ação do bebê deve gerar um feedback visual e sonoro imediato, porém suave.
- Sempre usar `touch-action: none` no elemento do canvas/área do jogo para evitar scroll acidental da página.
- Nunca depender apenas de `onClick` — sempre parear com `onPointerDown` para resposta imediata em touch.

## 📈 Diretrizes de SEO
Sempre que criar uma página de jogo (`/jogos/[slug]`):
- Incluir `title` e `description` ricos em palavras-chave (ex: "jogo educativo", "grátis", "2 anos").
- Estruturar o conteúdo com H1, H2 (Como Brincar) e FAQ em JSON-LD para Google Rich Results.

## 🚫 O que NÃO fazer (Proibido)
- **NÃO** sugerir bancos de dados ou Firebase agora.
- **NÃO** usar bibliotecas de jogos pesadas (como Phaser) a menos que seja estritamente necessário.
- **NÃO** criar sistemas de login ou áreas logadas.
- **NÃO** usar cores neon ou animações frenéticas.


# PlayZulo - Guia de Cores, Sons e Animações (Regras de Design Low-Stim)

> [!IMPORTANT]
> Este guia define o "Manifesto Zen" do PlayZulo. Siga estas regras estritamente para garantir a experiência de baixa estimulação (low-stim) proposta pelo projeto.

## 🎨 Paleta de Cores "Sonho de Bebê"
Usaremos apenas cores suaves, dessaturadas e pastéis. Nada de cores neon, vibrantes ou de alto contraste.

| Cor | Nome | Uso Recomendado | Código CSS |
| :--- | :--- | :--- | :--- |
| 🟦 | **Azul Céu Suave** | Fundo principal, textos | `#e0f7ff` |
| 🟩 | **Verde Musgo Suave** | Botões de ação, destaques | `#ABBB6C` |
| 🟢 | **Verde Acento** | Bordas e estados de hover | `#9AA557` |
| 💛 | **Amarelo Pêssego** | Elementos secundários | `#ffe0b2` |
| 🌸 | **Rosa Chá** | Destaques especiais | `#f8bbd0` |
| ⬜ | **Creme** | Cartões, painéis | `#fff9c4` |
| ⬛ | **Cinza Suave** | Texto, bordas | `#607d8b` |

### Regras de Contraste
- **Nunca** usar texto preto puro sobre fundo claro.
- Usar **Cinza Suave** (607d8b) para todo o texto.
- Para links e botões, usar **Verde Musgo** (#ABBB6C) com texto em **Cinza Suave** (#607d8b).

---

## 🔈 Diretrizes de Áudio (Regra de Ouro: "Sons de Madeira")

### ❌ Sons Proibidos (Agudos/Agressivos)
- Bipes eletrônicos (Beep/Boop)
- Buzinas
- Sons de "Erro" agudos
- Zumbidos sintéticos
- Sons de transição (swish) rápidos

### ✅ Sons Permitidos (Baixa Frequência)
Todos os sons devem ser gravados ou sintetizados em baixa frequência para evitar sobrecarga sensorial.
1. **Toque/Clique:** Som de madeira batendo (clave/woodblock suave) ou sino de latão muito abafado.
2. **Recompensa:** Um som de sino longo e flutuante (chimes/hang drum) com reverb.
3. **Mistura de Cores:** Sons de xilofone ou metal suave.
4. **Fundo:** Ruído branco very subtle (ondas do mar ou vento suave).

---

## 🌸 Regras de Animação (Framer Motion / CSS)

### 1. Filosofia Geral
- **Tempo:** Todas as animações devem durar **mínimo de 400ms**.
- **Suavidade:** Usar curvas `easeInOut` ou `spring` com baixo `damping`.
- **Frequência:** Evitar repetir a mesma animação em sequência rápida.

### 2. Padrões de Animação por Tipo

#### A. Entrada em Tela (`initial`/`animate`)
**Elemento:** Cartões de jogo, Seções.
```typescript
const cardVariants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: "blur(5px)" // Suavização extra
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0)",
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};
```

#### B. Efeito Hover/Ativação (`hover`)
**Elemento:** Botões, Imagens de jogos.
```typescript
const buttonVariants = {
  initial: { y: 0, scale: 1 },
  hover: {
    y: -2, // Move para cima sutilmente
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 100, // Molas macias
      duration: 0.3
    }
  }
};
```

#### C. Efeitos de Clique/Toque (`tap`)
**Elemento:** Áreas de interação do usuário.
```typescript
const tapEffect = {
  tap: {
    scale: 0.98,
    rotate: 1, // Rotação mínima
    transition: {
      duration: 0.1
    }
  }
};
```

#### D. Animações de Slides/Carrosséis
**Elemento:** Carrossel de jogos na Home.
- **Regra:** O slide deve ser "arrastado" pelo usuário, não automático.
- **Transição:** Usar `drag="x"` e garantir que a inércia seja suave (`timeConstant: 150`).

### 3. O Que Evitar Absolutamente
- **Swish/Swing:** Evitar rotações rápidas ou balanços bruscos.
- **Blink:** Nunca usar `flash` ou `blink` em cores ou opacidade.
- **Scale Up:** Aumentar o tamanho do elemento mais que **2%** para evitar sensação de "inchaço".
- **Bounce:** Evitar saltos agressivos; preferir o movimento suave de subir/descer.

---

## 🎯 Resumo de Implementação (Checklist para o Agente)
Ao criar um novo componente de jogo, verifique:

1. [ ] **Paleta:** Estou usando apenas cores Pastel/Creme?
2. [ ] **Contraste:** O texto é legível (Cinza Suave)?
3. [ ] **Animação:** A transição dura mais de 400ms?
4. [ ] **Efeito:** Estou usando `easeOut` ou `spring` suave?
5. [ ] **Som:** O som é de madeira/metal suave e de baixa frequência?
6. [ ] **Proibido:** Removi qualquer `swish`, `blink` ou `beep` agudo?

---

## 🏷️ Convenção de Nomenclatura dos Jogos
- Slug: `kebab-case` (ex: `tocar-nas-bolhas`)
- Componente: `PascalCase` (ex: `TocarNasBolhas.tsx`)
- Arquivo de dados: registrar em `lib/games.ts` com `title`, `slug`, `category`, `ageRange` e `description`.


<!-- END:nextjs-agent-rules -->

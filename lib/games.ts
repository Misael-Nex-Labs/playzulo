import { MousePointer2, Sprout, Shapes, Palette, Brain } from "lucide-react";

export interface Game {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: 'tocar' | 'arrastar' | 'cores' | 'formas' | 'memoria';
  ageRange: '1-3 anos' | '3-5 anos';
  icon: string; // Nome do ícone do Lucide
  color: string; // Nome da cor zen (ex: zen-green)
  image: string; // Caminho da imagem local
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  faq: {
    question: string;
    answer: string;
  }[];
}

export const games: Game[] = [
  {
    id: '1',
    slug: 'tocar-nas-bolhas',
    title: 'Tocar nas Bolhas',
    shortDescription: 'Estoure bolhas coloridas e suaves com um toque.',
    fullDescription: 'Um jogo de causa e efeito projetado para os mais novos. Bolhas coloridas em tons pastéis aparecem suavemente na tela. Ao tocá-las, elas estouram com um som macio de madeira e liberam partículas relaxantes.\n\nIdeal para desenvolver a coordenação motora fina e a atenção visual, sem sobrecarga sensorial. As cores foram cuidadosamente selecionadas para manter a criança calma e focada.',
    category: 'tocar',
    ageRange: '1-3 anos',
    icon: 'MousePointer2',
    color: 'zen-green',
    image: '/images/tocar-nas-bolhas.png',
    seo: {
      title: 'Jogo de Tocar nas Bolhas Grátis para Bebês | PlayZulo',
      description: 'Jogo educativo de estourar bolhas para crianças de 1 a 3 anos. Sem anúncios, baixa estimulação e sons suaves.',
      keywords: ['jogo de bolhas', 'jogo para bebês', 'educativo grátis', 'low-stim']
    },
    faq: [
      { question: 'Como esse jogo ajuda meu filho?', answer: 'Ajuda na coordenação motora fina e no entendimento de causa e efeito.' },
      { question: 'É seguro para crianças de 1 ano?', answer: 'Sim, o design é simples e não possui elementos que causem frustração.' }
    ]
  },
  {
    id: '2',
    slug: 'o-jardim-que-acorda',
    title: 'O Jardim que Acorda',
    shortDescription: 'Toque nas flores para vê-las florescer suavemente.',
    fullDescription: 'Explore um jardim mágico onde cada toque faz uma flor brotar ou se abrir. Com animações lentas e sons de natureza, o Jardim que Acorda é uma experiência contemplativa para crianças pequenas.\n\nO jogo incentiva a curiosidade e a exploração espacial, apresentando diferentes tipos de flores e cores de forma lúdica e tranquila.',
    category: 'tocar',
    ageRange: '1-3 anos',
    icon: 'Sprout',
    color: 'zen-pink',
    image: '/images/o-jardim-que-acorda.png',
    seo: {
      title: 'O Jardim que Acorda - Jogo Sensorial para Crianças',
      description: 'Jogo de natureza e flores para crianças pequenas. Estimulação visual suave e sons relaxantes.',
      keywords: ['jogo de jardim', 'flores para crianças', 'jogo sensorial', 'montessori']
    },
    faq: [
      { question: 'O jogo tem fim?', answer: 'Não, o jardim é infinito e permite exploração livre.' }
    ]
  },
  {
    id: '3',
    slug: 'arrastar-formas',
    title: 'Arrastar Formas',
    shortDescription: 'Encaixe círculos, quadrados e triângulos nos lugares certos.',
    fullDescription: 'Um clássico jogo de encaixe digital. A criança deve arrastar formas geométricas básicas para suas silhuetas correspondentes. Cada acerto é celebrado com um brilho suave e um som harmônico.\n\nEste jogo trabalha o reconhecimento de formas e a percepção visual, preparando a base para conceitos matemáticos iniciais de forma divertida e sem pressão.',
    category: 'formas',
    ageRange: '3-5 anos',
    icon: 'Shapes',
    color: 'zen-blue',
    image: '/images/arrastar-formas.png',
    seo: {
      title: 'Jogo de Formas Geométricas para Crianças | PlayZulo',
      description: 'Aprenda círculos, quadrados e triângulos com este jogo de arrastar e soltar educativo e gratuito.',
      keywords: ['formas geométricas', 'jogo de encaixe', 'educativo 3 anos', 'desenvolvimento infantil']
    },
    faq: [
      { question: 'As formas mudam de lugar?', answer: 'Sim, a cada nova rodada as formas aparecem em posições diferentes.' }
    ]
  },
  {
    id: '4',
    slug: 'cores-dos-bichinhos',
    title: 'Cores dos Bichinhos',
    shortDescription: 'Toque nos animais para mudar suas cores pastéis.',
    fullDescription: 'Conheça bichinhos fofos e ajude-os a mudar de cor! Ao tocar no elefante, no leão ou na girafa, eles alternam entre as cores da paleta zen. Uma forma relaxante de aprender o nome das cores.\n\nSem cronômetros ou pontuação, a criança pode explorar as combinações de cores no seu próprio ritmo, desenvolvendo o vocabulário e a identificação visual.',
    category: 'cores',
    ageRange: '1-3 anos',
    icon: 'Palette',
    color: 'zen-yellow',
    image: '/images/cores-dos-bichinhos.png',
    seo: {
      title: 'Aprenda Cores com Animais - Jogo para Bebês',
      description: 'Jogo interativo para ensinar cores aos bebês usando animais fofos e tons pastéis.',
      keywords: ['aprender cores', 'animais para bebês', 'jogo educativo cores', 'estimulação visual']
    },
    faq: [
      { question: 'Quais animais estão no jogo?', answer: 'Elefante, leão, girafa e passarinho.' }
    ]
  },
  {
    id: '5',
    slug: 'memoria-dos-bichinhos',
    title: 'Memória dos Bichinhos',
    shortDescription: 'Encontre os pares de animais em um jogo de memória calmo.',
    fullDescription: 'Um jogo de memória simplificado, com menos cartas e ilustrações claras. O objetivo é encontrar os pares de bichinhos escondidos atrás das cartas de madeira.\n\nDiferente de outros jogos de memória, aqui não há pressa. O foco é a concentração e a memorização visual, com feedbacks sonoros que acalmam em vez de agitar.',
    category: 'memoria',
    ageRange: '3-5 anos',
    icon: 'Brain',
    color: 'zen-cream',
    image: '/images/memoria-dos-bichinhos.png',
    seo: {
      title: 'Jogo de Memória Grátis para Crianças | PlayZulo',
      description: 'Desenvolva a memória do seu filho com este jogo de cartas suave e educativo.',
      keywords: ['jogo de memória', 'memória para crianças', 'desenvolvimento cognitivo', 'jogos zen']
    },
    faq: [
      { question: 'Quantas cartas tem o jogo?', answer: 'Começa com 4 cartas e aumenta gradualmente até 8.' }
    ]
  }
];

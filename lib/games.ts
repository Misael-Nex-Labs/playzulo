export interface Game {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: 'tocar' | 'arrastar' | 'cores' | 'formas' | 'memoria';
  ageRange: '1-3 anos' | '3-5 anos';
  icon: string;
  image: string;
  color: string;
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
    shortDescription: 'Um jogo simples e relaxante de estourar bolhas coloridas na tela.',
    fullDescription: 'O Tocar nas Bolhas foi desenvolvido para estimular a coordenação motora fina de forma suave. As bolhas aparecem calmamente e, ao serem tocadas, produzem um som de madeira suave, evitando sobressaltos.\n\nIdeal para bebês que estão começando a explorar o toque na tela, este jogo não possui pontuação ou pressões, permitindo que a criança brinque no seu próprio ritmo, promovendo uma experiência de aprendizado positiva e sem estresse.',
    category: 'tocar',
    ageRange: '1-3 anos',
    icon: 'Pointer',
    image: 'https://images.unsplash.com/photo-1518173946687-a4c8a9b749f5?w=400&h=300&fit=crop',
    color: 'zen-blue',
    seo: {
      title: 'Tocar nas Bolhas | Jogo Educativo para Bebês | PlayZulo',
      description: 'Jogo gratuito para bebês estourarem bolhas. Atividade de baixa estimulação para coordenação motora fina.',
      keywords: ['jogo para bebês', 'estourar bolhas', 'coordenação motora fina', 'jogo educativo grátis', 'low-stim']
    },
    faq: [
      {
        question: 'Como este jogo ajuda no desenvolvimento?',
        answer: 'Ele ajuda na coordenação olho-mão e no reconhecimento de causa e efeito de forma calma.'
      },
      {
        question: 'É seguro para crianças de 1 ano?',
        answer: 'Sim, não há elementos rápidos, sons agudos ou anúncios que possam assustar a criança.'
      }
    ]
  },
  {
    id: '2',
    slug: 'o-jardim-que-acorda',
    title: 'O Jardim que Acorda',
    shortDescription: 'Toque nas flores e animais para ver a natureza ganhar vida suavemente.',
    fullDescription: 'Neste jardim encantado, cada toque revela uma pequena surpresa da natureza. Flores desabrocham e borboletas voam com movimentos lentos e fluidos, respeitando a sensibilidade visual dos pequenos.\n\nExplorar o jardim ajuda a criança a identificar elementos da natureza e cores de forma lúdica. É uma excelente ferramenta para momentos de calma, proporcionando um ambiente digital seguro e acolhedor.',
    category: 'tocar',
    ageRange: '1-3 anos',
    icon: 'Flower',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop',
    color: 'zen-green',
    seo: {
      title: 'O Jardim que Acorda | Explorar Natureza para Crianças | PlayZulo',
      description: 'Jogo interativo de natureza para crianças pequenas. Descubra flores e animais com toques suaves.',
      keywords: ['jogo de natureza', 'jogo infantil grátis', 'descobrir cores', 'jogo de toque', 'educação infantil']
    },
    faq: [
      {
        question: 'O jogo tem fim?',
        answer: 'O jardim é um espaço de exploração livre, sem tempo ou fim, incentivando a curiosidade natural.'
      }
    ]
  },
  {
    id: '3',
    slug: 'arrastar-formas',
    title: 'Arrastar Formas',
    shortDescription: 'Encaixe as formas geométricas nos lugares certos com movimentos suaves.',
    fullDescription: 'Um clássico pedagógico adaptado para o mundo digital de baixa estimulação. A criança deve arrastar círculos, quadrados e triângulos para seus moldes correspondentes no cenário.\n\nEste exercício fortalece a percepção espacial e o reconhecimento de padrões geométricos. As cores pastéis e os feedbacks sonoros de baixa frequência garantem que o foco permaneça no aprendizado cognitivo sem sobrecarga sensorial.',
    category: 'formas',
    ageRange: '3-5 anos',
    icon: 'Shapes',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop',
    color: 'zen-pink',
    seo: {
      title: 'Arrastar Formas | Jogo de Formas Geométricas | PlayZulo',
      description: 'Aprenda formas geométricas brincando. Jogo de arrastar e soltar para crianças de 3 a 5 anos.',
      keywords: ['formas geométricas', 'arrastar e soltar', 'jogo pedagógico', 'geometria para crianças', 'desenvolvimento cognitivo']
    },
    faq: [
      {
        question: 'Quais formas meu filho vai aprender?',
        answer: 'As formas básicas como círculo, quadrado, triângulo e estrela.'
      }
    ]
  },
  {
    id: '4',
    slug: 'cores-dos-bichinhos',
    title: 'Cores dos Bichinhos',
    shortDescription: 'Identifique e agrupe os animais por suas cores suaves.',
    fullDescription: 'Os bichinhos estão procurando suas casinhas coloridas. Ajude cada um deles a encontrar o lugar certo baseando-se nas cores pastéis da nossa paleta zen.\n\nEste jogo foca no aprendizado das cores primárias e secundárias de forma contextualizada. Além das cores, a criança entra em contato com diferentes animais, enriquecendo seu vocabulário e percepção visual de maneira tranquila.',
    category: 'cores',
    ageRange: '1-3 anos',
    icon: 'Palette',
    image: 'https://images.unsplash.com/photo-1528731708534-816fe59f90cb?w=400&h=300&fit=crop',
    color: 'zen-yellow',
    seo: {
      title: 'Cores dos Bichinhos | Aprender Cores Brincando | PlayZulo',
      description: 'Jogo educativo de cores com animais. Estimulação visual suave para bebês e crianças.',
      keywords: ['aprender cores', 'jogo de animais', 'jogo educativo', 'cores pastéis', 'alfabetização visual']
    },
    faq: [
      {
        question: 'O jogo ajuda no vocabulário?',
        answer: 'Sim, ao identificar o animal e sua respectiva cor, a criança reforça novas palavras.'
      }
    ]
  },
  {
    id: '5',
    slug: 'memoria-dos-bichinhos',
    title: 'Memória dos Bichinhos',
    shortDescription: 'Encontre os pares de animais neste clássico jogo de memória calmo.',
    fullDescription: 'O tradicional jogo de memória reimaginado para evitar a frustração. Com um número reduzido de cartas e ilustrações amigáveis, o foco é o exercício da memória de curto prazo e concentração.\n\nAs cartas viram com uma animação lenta de fade, e o sucesso é celebrado com um som de sino longo e relaxante. É a introdução perfeita aos jogos de regras para crianças pequenas.',
    category: 'memoria',
    ageRange: '3-5 anos',
    icon: 'Brain',
    image: 'https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?w=400&h=300&fit=crop',
    color: 'zen-cream',
    seo: {
      title: 'Memória dos Bichinhos | Jogo de Memória Infantil | PlayZulo',
      description: 'Jogo de memória grátis e calmo para crianças. Melhore a concentração com bichinhos fofos.',
      keywords: ['jogo de memória', 'concentração infantil', 'exercício mental', 'jogo grátis', 'bichinhos']
    },
    faq: [
      {
        question: 'Quantas cartas o jogo possui?',
        answer: 'Começamos com poucos pares para não sobrecarregar e aumentamos gradualmente conforme o acerto.'
      }
    ]
  }
];

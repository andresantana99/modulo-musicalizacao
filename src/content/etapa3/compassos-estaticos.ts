export type NotaId = 'minima' | 'seminima' | 'colcheia' | 'semicolcheia';

export type PaginaCompassoEstatico = {
  texto: string;
  compasso1: NotaId[];
  compasso2: NotaId[];
};

export const FIGURAS_ETAPA3 = [
  { id: 'minima'      as const, nome: 'Mínima',      cor: '#820742', arquivo: 'minima.png',      duracao: 2    },
  { id: 'seminima'    as const, nome: 'Semínima',    cor: '#17867C', arquivo: 'seminima.png',    duracao: 1    },
  { id: 'colcheia'    as const, nome: 'Colcheia',    cor: '#E6972A', arquivo: 'colcheia.png',    duracao: 0.5  },
  { id: 'semicolcheia'as const, nome: 'Semicolcheia',cor: '#B9C303', arquivo: 'semicolcheia.png',duracao: 0.25 },
];

export const COMPASSOS_ESTATICOS: Record<number, PaginaCompassoEstatico> = {
  1: {
    texto: 'Neste ambiente teremos um metrônomo marcando a unidade de tempo. Isto equivale a uma semínima. Nossos exercícios consistirão em dois compassos com 4 unidades de tempo cada. Observe o resultado do compasso com 8 semínimas:',
    compasso1: ['seminima', 'seminima', 'seminima', 'seminima'],
    compasso2: ['seminima', 'seminima', 'seminima', 'seminima'],
  },
  2: {
    texto: 'Nossos exercícios consistirão em dois compassos com 4 unidades de tempo cada. Vamos substituir a segunda semínima por duas colcheias:',
    compasso1: ['seminima', 'colcheia', 'colcheia', 'seminima', 'seminima'],
    compasso2: ['seminima', 'seminima', 'seminima', 'seminima'],
  },
  3: {
    texto: 'Nossos exercícios consistirão em dois compassos com 4 unidades de tempo cada. Vamos substituir a primeira semínima por duas colcheias:',
    compasso1: ['colcheia', 'colcheia', 'colcheia', 'colcheia', 'seminima', 'seminima'],
    compasso2: ['seminima', 'seminima', 'seminima', 'seminima'],
  },
  4: {
    texto: 'Nossos exercícios consistirão em dois compassos com 4 unidades de tempo cada. Agora confira o resultado da substituição da última semínima por quatro semicolcheias:',
    compasso1: ['colcheia', 'colcheia', 'colcheia', 'colcheia', 'seminima', 'seminima'],
    compasso2: ['seminima', 'seminima', 'seminima', 'semicolcheia', 'semicolcheia', 'semicolcheia', 'semicolcheia'],
  },
  5: {
    texto: 'Nossos exercícios consistirão em dois compassos com 4 unidades de tempo cada. Observe o resultado com 4 Mínimas:',
    compasso1: ['minima', 'minima'],
    compasso2: ['minima', 'minima'],
  },
  6: {
    texto: 'Nossos exercícios consistirão em dois compassos com 4 unidades de tempo cada. Confira o resultado da substituição da última mínima por quatro colcheias:',
    compasso1: ['minima', 'minima'],
    compasso2: ['minima', 'colcheia', 'colcheia', 'colcheia', 'colcheia'],
  },
  7: {
    texto: 'Nossos exercícios consistirão em dois compassos com 4 unidades de tempo cada. Confira o resultado da substituição da segunda mínima por duas semínimas:',
    compasso1: ['minima', 'seminima', 'seminima'],
    compasso2: ['minima', 'colcheia', 'colcheia', 'colcheia', 'colcheia'],
  },
};

export interface EtapaConfig {
  numero: number;
  titulo: string;
  descricao: string;
  cor: string;
  totalPaginas: number;
}

export const etapas: EtapaConfig[] = [
  {
    numero: 1,
    titulo: 'Conhecendo as figuras musicais',
    descricao: 'Introdução às figuras rítmicas e suas cores associadas.',
    cor: '#E6972A',
    totalPaginas: 19,
  },
  {
    numero: 2,
    titulo: 'Elementos da bateria',
    descricao: 'Bumbo, caixa, chimbal e sua notação em cores.',
    cor: '#2D9CDB',
    totalPaginas: 26,
  },
  {
    numero: 3,
    titulo: 'Atividades de reforço',
    descricao: 'Exercícios práticos para fixar os conceitos.',
    cor: '#27AE60',
    totalPaginas: 9,
  },
  {
    numero: 4,
    titulo: 'Vídeos de orquestra',
    descricao: 'Exemplos visuais de execução orquestral.',
    cor: '#9B51E0',
    totalPaginas: 4,
  },
];

export type Opcao = { id: string; texto: string };

export type AtividadeMultiplaEscolha = {
  id: string;
  tipo: 'multipla-escolha';
  enunciado: string;
  opcoes: Opcao[];
  correta: string;
  explicacao?: string;
};

export type Atividade = AtividadeMultiplaEscolha;

const atividadesPorEtapa: Record<number, Atividade[]> = {
  1: [
    {
      id: 'e1-q1',
      tipo: 'multipla-escolha',
      enunciado: 'Qual figura rítmica corresponde à unidade de referência na teoria musical usada neste módulo?',
      opcoes: [
        { id: 'a', texto: 'Semibreve' },
        { id: 'b', texto: 'Semínima' },
        { id: 'c', texto: 'Colcheia' },
      ],
      correta: 'b',
      explicacao: 'A semínima é a figura usada como unidade de tempo neste módulo.',
    },
    {
      id: 'e1-q2',
      tipo: 'multipla-escolha',
      enunciado: 'Para representar ritmos matematicamente, utilizamos o conceito de:',
      opcoes: [
        { id: 'a', texto: 'Frações' },
        { id: 'b', texto: 'Polinômios' },
        { id: 'c', texto: 'Matrizes' },
      ],
      correta: 'a',
    },
  ],
  2: [
    {
      id: 'e2-q1',
      tipo: 'multipla-escolha',
      enunciado: 'Duas colcheias equivalem, em duração, a quantas semínimas?',
      opcoes: [
        { id: 'a', texto: '2 semínimas' },
        { id: 'b', texto: '1 semínima' },
        { id: 'c', texto: 'Meia semínima' },
      ],
      correta: 'b',
      explicacao: 'Cada colcheia vale metade de uma semínima, então duas colcheias = uma semínima.',
    },
  ],
  3: [
    {
      id: 'e3-q1',
      tipo: 'multipla-escolha',
      enunciado: 'Em um compasso 4/4, quantas semínimas cabem?',
      opcoes: [
        { id: 'a', texto: '2' },
        { id: 'b', texto: '4' },
        { id: 'c', texto: '8' },
      ],
      correta: 'b',
    },
  ],
  4: [
    {
      id: 'e4-q1',
      tipo: 'multipla-escolha',
      enunciado: 'Qual elemento da bateria costuma marcar o tempo forte (1 e 3) em um ritmo binário simples?',
      opcoes: [
        { id: 'a', texto: 'Chimbal' },
        { id: 'b', texto: 'Bumbo' },
        { id: 'c', texto: 'Caixa' },
      ],
      correta: 'b',
    },
  ],
};

export function getAtividades(etapa: number): Atividade[] {
  return atividadesPorEtapa[etapa] ?? [];
}

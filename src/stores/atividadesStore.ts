import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Resposta = {
  atividadeId: string;
  opcaoEscolhida: string;
  acertou: boolean;
  respondidoEm: number;
};

type State = {
  respostas: Record<string, Resposta>;
  registrar: (r: Resposta) => void;
  resetEtapa: (ids: string[]) => void;
};

export const useAtividadesStore = create<State>()(
  persist(
    (set) => ({
      respostas: {},
      registrar: (r) =>
        set((s) => ({ respostas: { ...s.respostas, [r.atividadeId]: r } })),
      resetEtapa: (ids) =>
        set((s) => {
          const copia = { ...s.respostas };
          for (const id of ids) delete copia[id];
          return { respostas: copia };
        }),
    }),
    { name: 'atividades-respostas' },
  ),
);

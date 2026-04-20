import { beforeEach, describe, expect, it } from 'vitest';
import { useAtividadesStore } from '@/stores/atividadesStore';

describe('atividadesStore', () => {
  beforeEach(() => {
    useAtividadesStore.setState({ respostas: {} });
  });

  it('registra resposta indexada por atividadeId', () => {
    useAtividadesStore.getState().registrar({
      atividadeId: 'e1-q1',
      opcaoEscolhida: 'b',
      acertou: true,
      respondidoEm: 123,
    });
    expect(useAtividadesStore.getState().respostas['e1-q1'].acertou).toBe(true);
  });

  it('sobrescreve resposta anterior da mesma atividade', () => {
    const s = useAtividadesStore.getState();
    s.registrar({ atividadeId: 'x', opcaoEscolhida: 'a', acertou: false, respondidoEm: 1 });
    s.registrar({ atividadeId: 'x', opcaoEscolhida: 'b', acertou: true, respondidoEm: 2 });
    expect(useAtividadesStore.getState().respostas['x'].opcaoEscolhida).toBe('b');
  });

  it('resetEtapa remove apenas os ids informados', () => {
    const s = useAtividadesStore.getState();
    s.registrar({ atividadeId: 'a', opcaoEscolhida: '1', acertou: true, respondidoEm: 1 });
    s.registrar({ atividadeId: 'b', opcaoEscolhida: '1', acertou: true, respondidoEm: 1 });
    s.resetEtapa(['a']);
    const { respostas } = useAtividadesStore.getState();
    expect(respostas['a']).toBeUndefined();
    expect(respostas['b']).toBeDefined();
  });
});

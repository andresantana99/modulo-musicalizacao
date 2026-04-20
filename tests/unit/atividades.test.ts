import { describe, expect, it } from 'vitest';
import { getAtividades } from '@/content/atividades';

describe('getAtividades', () => {
  it('retorna array vazio para etapa sem atividades', () => {
    expect(getAtividades(99)).toEqual([]);
  });

  it('cada atividade tem a opção correta entre as opções', () => {
    for (const etapa of [1, 2, 3, 4]) {
      for (const at of getAtividades(etapa)) {
        expect(at.opcoes.some((o) => o.id === at.correta)).toBe(true);
      }
    }
  });

  it('IDs de atividades são únicos globalmente', () => {
    const ids = [1, 2, 3, 4].flatMap((e) => getAtividades(e).map((a) => a.id));
    expect(new Set(ids).size).toBe(ids.length);
  });
});

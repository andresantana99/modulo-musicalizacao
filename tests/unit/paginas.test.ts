import { describe, expect, it } from 'vitest';
import { getPagina, resolverBase } from '@/content/paginas';

describe('resolverBase', () => {
  it('substitui todas as ocorrências de {{BASE}}', () => {
    const html = '<img src="{{BASE}}img/a.png"><img src="{{BASE}}img/b.png">';
    expect(resolverBase(html, '/modulo-musicalizacao/')).toBe(
      '<img src="/modulo-musicalizacao/img/a.png"><img src="/modulo-musicalizacao/img/b.png">',
    );
  });

  it('não altera HTML sem placeholder', () => {
    expect(resolverBase('<p>texto</p>', '/x/')).toBe('<p>texto</p>');
  });
});

describe('getPagina', () => {
  it('retorna undefined para etapa inexistente', () => {
    expect(getPagina(99, 1)).toBeUndefined();
  });

  it('retorna undefined para página fora do intervalo', () => {
    expect(getPagina(1, 999)).toBeUndefined();
  });

  it('retorna conteúdo válido para etapa 1 página 1', () => {
    const p = getPagina(1, 1);
    expect(p).toBeDefined();
    expect(p?.pagina).toBe(1);
    expect(typeof p?.html).toBe('string');
  });
});

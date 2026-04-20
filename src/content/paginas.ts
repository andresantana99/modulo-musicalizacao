import etapa1 from './etapa1/paginas.json';
import etapa2 from './etapa2/paginas.json';
import etapa3 from './etapa3/paginas.json';
import etapa4 from './etapa4/paginas.json';

export type PaginaConteudo = { pagina: number; html: string };

const mapa: Record<number, PaginaConteudo[]> = {
  1: etapa1 as PaginaConteudo[],
  2: etapa2 as PaginaConteudo[],
  3: etapa3 as PaginaConteudo[],
  4: etapa4 as PaginaConteudo[],
};

export function getPagina(etapa: number, pagina: number): PaginaConteudo | undefined {
  return mapa[etapa]?.find((p) => p.pagina === pagina);
}

export function resolverBase(html: string, base: string): string {
  return html.replaceAll('{{BASE}}', base);
}

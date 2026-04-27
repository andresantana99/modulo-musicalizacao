import { useEffect, useRef, type ComponentType } from 'react';
import { Link, useParams } from 'react-router-dom';
import { etapas } from '@/content/etapas.config';
import { getPagina, resolverBase } from '@/content/paginas';
import MontaCompasso from '@/components/atividade/MontaCompasso';
import MetronomoInline from '@/components/atividade/MetronomoInline';

const COMPONENTES_PAGINA: Record<string, ComponentType> = {
  '3-8': MontaCompasso,
  '3-9': MetronomoInline,
};

export default function Etapa() {
  const { numero, pagina } = useParams<{ numero: string; pagina?: string }>();
  const etapaNum = Number(numero);
  const paginaNum = Number(pagina ?? '1');
  const etapa = etapas.find((e) => e.numero === etapaNum);
  const articleRef = useRef<HTMLElement | null>(null);

  // Imagens injetadas via dangerouslySetInnerHTML às vezes ficavam em "ponto"
  // antes de carregar (quando o browser inferia loading: lazy ou decoding: async).
  // Forçar eager + sync evita o flash de placeholder.
  useEffect(() => {
    const imgs = articleRef.current?.querySelectorAll('img') ?? [];
    imgs.forEach((img) => {
      img.loading = 'eager';
      img.decoding = 'sync';
    });
  }, [paginaNum, etapaNum]);

  if (!etapa) {
    return (
      <section className="container text-center p-4">
        <h2>Etapa não encontrada</h2>
        <Link to="/etapas" className="btn btn-primary">
          Voltar para seleção
        </Link>
      </section>
    );
  }

  const totalPaginas = etapa.totalPaginas;
  const paginaAnterior = paginaNum > 1 ? paginaNum - 1 : null;
  const proximaPagina = paginaNum < totalPaginas ? paginaNum + 1 : null;

  const chave = `${etapa.numero}-${paginaNum}`;
  const ComponenteCustom = COMPONENTES_PAGINA[chave];
  const conteudo = ComponenteCustom ? null : getPagina(etapa.numero, paginaNum);
  const html = conteudo ? resolverBase(conteudo.html, import.meta.env.BASE_URL) : null;

  return (
    <section className="container p-3">
      <header
        className="etapa-header"
        style={{ ['--etapa-cor' as string]: etapa.cor } as React.CSSProperties}
      >
        <h2>
          Etapa {etapa.numero} — {etapa.titulo}
        </h2>
        <progress
          value={paginaNum}
          max={totalPaginas}
          aria-label={`Progresso: página ${paginaNum} de ${totalPaginas}`}
        />
        <p className="small text-body-secondary mb-0 mt-2">
          Página {paginaNum} de {totalPaginas}
        </p>
      </header>

      {ComponenteCustom ? (
        <article className="etapa-conteudo" aria-live="polite" ref={articleRef}>
          <ComponenteCustom />
        </article>
      ) : html ? (
        <article
          className="etapa-conteudo"
          aria-live="polite"
          ref={articleRef}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <article className="etapa-conteudo" aria-live="polite" ref={articleRef}>
          <p>
            <em>Conteúdo indisponível para a página {paginaNum}.</em>
          </p>
        </article>
      )}

      <nav className="etapa-nav" aria-label="Navegação entre páginas">
        <div className="etapa-nav-inner">
          {paginaAnterior ? (
            <Link to={`/etapa/${etapa.numero}/pagina/${paginaAnterior}`} className="btn btn-secondary">
              ← Anterior
            </Link>
          ) : (
            <Link to="/etapas" className="btn btn-outline-secondary">
              ← Sair da etapa
            </Link>
          )}

          <span className="etapa-nav-copy">© UFPA, {new Date().getFullYear()}</span>

          {proximaPagina ? (
            <Link to={`/etapa/${etapa.numero}/pagina/${proximaPagina}`} className="btn btn-primary">
              Próxima →
            </Link>
          ) : (
            <Link to={`/etapa/${etapa.numero}/atividades`} className="btn btn-success">
              Ir para atividades →
            </Link>
          )}
        </div>
      </nav>
    </section>
  );
}

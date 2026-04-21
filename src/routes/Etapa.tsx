import type { ComponentType } from 'react';
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
        <article className="etapa-conteudo" aria-live="polite">
          <ComponenteCustom />
        </article>
      ) : (
        (() => {
          const conteudo = getPagina(etapa.numero, paginaNum);
          if (!conteudo) {
            return (
              <article className="etapa-conteudo" aria-live="polite">
                <p>
                  <em>Conteúdo indisponível para a página {paginaNum}.</em>
                </p>
              </article>
            );
          }
          const html = resolverBase(conteudo.html, import.meta.env.BASE_URL);
          return (
            <article
              className="etapa-conteudo"
              aria-live="polite"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        })()
      )}

      <nav className="etapa-nav" aria-label="Navegação entre páginas">
        {paginaAnterior ? (
          <Link to={`/etapa/${etapa.numero}/pagina/${paginaAnterior}`} className="btn btn-secondary">
            ← Anterior
          </Link>
        ) : (
          <Link to="/etapas" className="btn btn-outline-secondary">
            ← Sair da etapa
          </Link>
        )}

        {proximaPagina ? (
          <Link to={`/etapa/${etapa.numero}/pagina/${proximaPagina}`} className="btn btn-primary">
            Próxima →
          </Link>
        ) : (
          <Link to={`/etapa/${etapa.numero}/atividades`} className="btn btn-success">
            Ir para atividades →
          </Link>
        )}
      </nav>
    </section>
  );
}

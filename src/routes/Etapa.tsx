import { Link, useParams } from 'react-router-dom';
import { etapas } from '@/content/etapas.config';
import { getPagina, resolverBase } from '@/content/paginas';

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

  return (
    <section className="container">
      <header className="mb-3" style={{ borderLeft: `6px solid ${etapa.cor}`, paddingLeft: 12 }}>
        <h2>
          Etapa {etapa.numero} — {etapa.titulo}
        </h2>
        <progress
          value={paginaNum}
          max={totalPaginas}
          className="w-100"
          aria-label={`Progresso: página ${paginaNum} de ${totalPaginas}`}
        />
        <p className="small text-body-secondary">
          Página {paginaNum} de {totalPaginas}
        </p>
      </header>

      {(() => {
        const conteudo = getPagina(etapa.numero, paginaNum);
        if (!conteudo) {
          return (
            <article className="p-3 border rounded mb-3" aria-live="polite">
              <p>
                <em>Conteúdo indisponível para a página {paginaNum}.</em>
              </p>
            </article>
          );
        }
        const html = resolverBase(conteudo.html, import.meta.env.BASE_URL);
        return (
          <article
            className="mb-3"
            aria-live="polite"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      })()}

      <nav className="d-flex justify-content-between" aria-label="Navegação entre páginas">
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

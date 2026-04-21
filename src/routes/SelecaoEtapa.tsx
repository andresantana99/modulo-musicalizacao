import { Link } from 'react-router-dom';
import { etapas } from '@/content/etapas.config';

export default function SelecaoEtapa() {
  return (
    <section className="container p-3">
      <header className="text-center mb-4">
        <h2 className="mb-2">Selecione uma etapa</h2>
        <p className="text-body-secondary mb-0">
          Cada etapa apresenta um conjunto de conceitos e exercícios práticos.
        </p>
      </header>
      <div className="row g-3">
        {etapas.map((etapa) => (
          <div key={etapa.numero} className="col-md-4 col-sm-6">
            <Link
              to={`/etapa/${etapa.numero}/pagina/1`}
              className="etapa-card text-decoration-none text-reset"
              style={{ ['--etapa-cor' as string]: etapa.cor } as React.CSSProperties}
            >
              <div className="small text-body-secondary fw-semibold text-uppercase">
                Etapa {etapa.numero}
              </div>
              <h5 className="mt-1 mb-1">{etapa.titulo}</h5>
              <p className="small text-body-secondary mb-0">{etapa.descricao}</p>
            </Link>
          </div>
        ))}
        <div className="col-md-4 col-sm-6">
          <Link
            to="/metronomo"
            className="etapa-card text-decoration-none text-reset"
            style={{ ['--etapa-cor' as string]: '#17867c' } as React.CSSProperties}
          >
            <div className="small text-body-secondary fw-semibold text-uppercase">Ferramenta</div>
            <h5 className="mt-1 mb-1">Metrônomo Visual</h5>
            <p className="small text-body-secondary mb-0">Prática livre de andamento e figuras.</p>
          </Link>
        </div>
      </div>
    </section>
  );
}

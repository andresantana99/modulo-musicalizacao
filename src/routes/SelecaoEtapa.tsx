import { Link } from 'react-router-dom';
import { etapas } from '@/content/etapas.config';

export default function SelecaoEtapa() {
  return (
    <section className="container text-center">
      <h2 className="p-3">Selecione uma etapa</h2>
      <div className="row justify-content-center">
        {etapas.map((etapa) => (
          <div key={etapa.numero} className="col-md-4 col-sm-6 py-2">
            <Link
              to={`/etapa/${etapa.numero}/pagina/1`}
              className="btn btn-light border w-100 p-3"
              style={{ borderLeft: `6px solid ${etapa.cor}` }}
            >
              <h5>
                <strong>Etapa {etapa.numero}</strong>
              </h5>
              <p className="m-0">{etapa.titulo}</p>
            </Link>
          </div>
        ))}
        <div className="col-md-4 col-sm-6 py-2">
          <Link to="/metronomo" className="btn btn-light border w-100 p-3">
            <h5>
              <strong>Metrônomo</strong>
            </h5>
            <p className="m-0">Prática visual de ritmos</p>
          </Link>
        </div>
      </div>
    </section>
  );
}

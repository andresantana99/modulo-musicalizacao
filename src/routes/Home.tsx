import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="container p-4">
      <div className="text-center mb-5 pt-3">
        <h1 className="display-5 fw-bold mb-2">Módulo de Musicalização</h1>
        <p className="lead text-body-secondary mx-auto" style={{ maxWidth: 640 }}>
          Uma plataforma educacional que usa cores como linguagem para ensinar conceitos de ritmo
          e música — especialmente pensada para pessoas surdas.
        </p>
      </div>
      <div className="row g-3 justify-content-center">
        <div className="col-lg-5 col-md-6">
          <Link to="/etapa/1/pagina/1" className="etapa-card text-decoration-none text-reset"
            style={{ ['--etapa-cor' as string]: '#e6972a' } as React.CSSProperties}>
            <div className="small text-body-secondary fw-semibold text-uppercase">Começar</div>
            <h4 className="mt-1 mb-1">É a sua primeira vez aqui?</h4>
            <p className="text-body-secondary mb-0">Comece do zero, pela Etapa 1.</p>
          </Link>
        </div>
        <div className="col-lg-5 col-md-6">
          <Link to="/etapas" className="etapa-card text-decoration-none text-reset"
            style={{ ['--etapa-cor' as string]: '#2d9cdb' } as React.CSSProperties}>
            <div className="small text-body-secondary fw-semibold text-uppercase">Continuar</div>
            <h4 className="mt-1 mb-1">Já acessou antes?</h4>
            <p className="text-body-secondary mb-0">Escolha a etapa desejada.</p>
          </Link>
        </div>
      </div>
    </section>
  );
}

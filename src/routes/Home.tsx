import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="container text-center">
      <div className="row justify-content-center p-3">
        <div className="col">
          <h2>
            <strong>Escolha uma opção:</strong>
          </h2>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 py-2">
          <Link to="/etapa/1/pagina/1" className="btn btn-light border w-100 h-100 p-4">
            <h5>
              <strong>É a sua primeira vez na nossa plataforma?</strong>
            </h5>
            <p className="m-0">Comece do zero!</p>
          </Link>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 py-2">
          <Link to="/etapas" className="btn btn-light border w-100 h-100 p-4">
            <h5>
              <strong>Já acessou nossa plataforma antes?</strong>
            </h5>
            <p className="m-0">Escolha a etapa desejada!</p>
          </Link>
        </div>
      </div>
    </section>
  );
}

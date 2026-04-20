import { Link } from 'react-router-dom';
import BotoesAcessibilidade from '@/components/acessibilidade/BotoesAcessibilidade';

export default function Header() {
  return (
    <header
      id="header"
      className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom"
    >
      <Link to="/" className="d-flex align-items-center mb-2 mb-md-0 text-decoration-none text-reset">
        <img
          src={`${import.meta.env.BASE_URL}img/logo-ufpa.svg`}
          width={90}
          height={52}
          alt="Logotipo da Universidade Federal do Pará"
        />
        &ensp;
        <h1 className="h4 m-0">Módulo de Musicalização para Sons Percussivos</h1>
      </Link>
      <BotoesAcessibilidade />
    </header>
  );
}

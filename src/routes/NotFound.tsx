import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="container text-center p-5">
      <h2>Página não encontrada</h2>
      <p>A rota acessada não existe.</p>
      <Link to="/" className="btn btn-primary">
        Voltar para a página inicial
      </Link>
    </section>
  );
}

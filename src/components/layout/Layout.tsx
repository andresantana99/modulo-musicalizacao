import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  const { pathname } = useLocation();
  // Em etapas a nav fixa já exibe o copyright — footer desnecessário
  const mostrarFooter = !pathname.startsWith('/etapa/');

  return (
    <div className="container page-container">
      <Header />
      <main id="conteudo">
        <Outlet />
      </main>
      {mostrarFooter && <Footer />}
    </div>
  );
}

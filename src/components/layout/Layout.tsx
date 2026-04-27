import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  const { pathname } = useLocation();
  // Páginas de conteúdo de etapa têm a .etapa-nav fixa (com copyright) — footer desnecessário.
  // Já a tela de atividades (/etapa/N/atividades) não tem nav, então o footer deve aparecer.
  const naPaginaConteudo = /^\/etapa\/\d+(\/pagina\/\d+)?$/.test(pathname);
  const mostrarFooter = !naPaginaConteudo;

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

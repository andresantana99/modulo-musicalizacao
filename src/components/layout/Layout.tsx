import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  const { pathname } = useLocation();
  // Páginas de conteúdo de etapa têm a .etapa-nav fixa (com copyright) — footer desnecessário.
  // Já a tela de atividades (/etapa/N/atividades) não tem nav, então o footer deve aparecer.
  const naPaginaConteudo = /^\/etapa\/\d+(\/pagina\/\d+)?$/.test(pathname);
  const mostrarFooter = !naPaginaConteudo;

  // React Router não restaura scroll em mudança de rota — no celular as telas
  // pareciam abrir "no meio". Resetar para o topo a cada navegação.
  // requestAnimationFrame garante que o scroll só acontece após o paint —
  // sem isso, mudança interna de estado em telas com aria-live podia disparar
  // recálculo de scroll no meio da rolagem.
  useEffect(() => {
    const id = requestAnimationFrame(() => window.scrollTo(0, 0));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

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

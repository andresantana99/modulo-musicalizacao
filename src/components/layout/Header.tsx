import type React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BotoesAcessibilidade from '@/components/acessibilidade/BotoesAcessibilidade';
import Modal from '@/components/ui/Modal';

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const naHome = pathname === '/';
  const [confirmacaoAberta, setConfirmacaoAberta] = useState(false);

  const aoClicarTitulo = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (naHome) return;
    setConfirmacaoAberta(true);
  };

  const confirmarSaida = () => {
    setConfirmacaoAberta(false);
    navigate('/');
  };

  return (
    <>
      <header
        id="header"
        className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 px-3 mb-4 border-bottom"
        style={{
          background: 'var(--surface-1)',
          borderColor: 'var(--border-soft)',
          borderRadius: 'var(--radius-md)',
        } as React.CSSProperties}
      >
        <a
          href="#/"
          onClick={aoClicarTitulo}
          className={`d-flex align-items-center mb-2 mb-md-0 text-decoration-none text-reset ${naHome ? 'pe-none' : ''}`}
          aria-disabled={naHome}
          title={naHome ? '' : 'Voltar para a tela inicial'}
        >
          <img
            src={`${import.meta.env.BASE_URL}img/logo-ufpa.svg`}
            width={90}
            height={52}
            alt="Logotipo da Universidade Federal do Pará"
            className="header-logo"
          />
          &ensp;
          <h1 className="h4 m-0">Módulo de Musicalização para Sons Percussivos</h1>
        </a>
        <BotoesAcessibilidade />
      </header>

      <Modal
        aberto={confirmacaoAberta}
        titulo="Voltar para a tela inicial?"
        mensagem="Você será redirecionado para a página inicial do módulo. O progresso das etapas é perdido."
        textoConfirmar="Sim, voltar"
        textoCancelar="Cancelar"
        onConfirmar={confirmarSaida}
        onCancelar={() => setConfirmacaoAberta(false)}
      />
    </>
  );
}

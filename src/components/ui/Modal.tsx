import { useEffect, useRef } from 'react';

type Props = {
  aberto: boolean;
  titulo: string;
  mensagem: string;
  textoConfirmar?: string;
  textoCancelar?: string;
  onConfirmar: () => void;
  onCancelar: () => void;
};

export default function Modal({
  aberto,
  titulo,
  mensagem,
  textoConfirmar = 'Confirmar',
  textoCancelar = 'Cancelar',
  onConfirmar,
  onCancelar,
}: Props) {
  const confirmarRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!aberto) return;
    confirmarRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancelar();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [aberto, onCancelar]);

  if (!aberto) return null;

  return (
    <div className="modal-overlay">
      {/* Botão invisível por trás do dialog: click fora fecha. Esc também
          fecha (registrado no useEffect). */}
      <button
        type="button"
        className="modal-overlay-bg"
        aria-label="Fechar diálogo"
        onClick={onCancelar}
        tabIndex={-1}
      />
      <div
        className="modal-dialog-custom"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        aria-describedby="modal-mensagem"
      >
        <h2 id="modal-titulo" className="modal-titulo">{titulo}</h2>
        <p id="modal-mensagem" className="modal-mensagem">{mensagem}</p>
        <div className="modal-acoes">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onCancelar}
          >
            {textoCancelar}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onConfirmar}
            ref={confirmarRef}
          >
            {textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
}

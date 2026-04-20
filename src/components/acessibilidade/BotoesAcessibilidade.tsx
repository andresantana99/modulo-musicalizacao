import useAcessibilidade from '@/hooks/useAcessibilidade';

export default function BotoesAcessibilidade() {
  const { alternarContraste, aumentarZoom, diminuirZoom } = useAcessibilidade();

  return (
    <ul className="nav justify-content-center mb-md-0 text-end">
      <li>
        <button
          type="button"
          className="nav-link px-2 btn btn-light"
          onClick={diminuirZoom}
          aria-label="Diminuir tamanho da fonte"
          title="Diminuir a fonte"
        >
          A-
        </button>
      </li>
      <li>
        <button
          type="button"
          className="nav-link px-2 btn btn-light"
          onClick={aumentarZoom}
          aria-label="Aumentar tamanho da fonte"
          title="Aumentar a fonte"
        >
          A+
        </button>
      </li>
      <li>
        <button
          type="button"
          className="nav-link px-2 btn btn-light"
          onClick={alternarContraste}
          aria-label="Alternar alto contraste"
          title="Alto contraste"
        >
          ◐
        </button>
      </li>
    </ul>
  );
}

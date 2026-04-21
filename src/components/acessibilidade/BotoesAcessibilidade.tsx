import useAcessibilidade from '@/hooks/useAcessibilidade';

export default function BotoesAcessibilidade() {
  const { tema, alternarContraste, aumentarZoom, diminuirZoom } = useAcessibilidade();
  const isDark = tema === 'dark';

  return (
    <ul className="nav justify-content-center mb-md-0 text-end gap-1">
      <li>
        <button
          type="button"
          className="nav-link px-2 btn btn-sm btn-outline-secondary"
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
          className="nav-link px-2 btn btn-sm btn-outline-secondary"
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
          className={`nav-link px-2 btn btn-sm ${isDark ? 'btn-warning' : 'btn-outline-secondary'}`}
          onClick={alternarContraste}
          aria-label={isDark ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
          aria-pressed={isDark}
          title={isDark ? 'Modo claro' : 'Modo escuro'}
        >
          {isDark ? '☀' : '☾'}
        </button>
      </li>
    </ul>
  );
}

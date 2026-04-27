type Figura = { nome: string; cor: string; arquivo: string };

type Props = { figuras: Figura[] };

export default function LegendaFiguras({ figuras }: Props) {
  const base = import.meta.env.BASE_URL;
  return (
    <div className="legenda-figuras mt-3">
      <p className="legenda-figuras-titulo">Legenda</p>
      <ul className="legenda-figuras-grid">
        {figuras.map((f) => (
          <li key={f.nome} className="legenda-figura-item">
            <span className="legenda-figura-chip" style={{ backgroundColor: f.cor }}>
              <img
                src={`${base}img/${f.arquivo}`}
                alt=""
                aria-hidden="true"
                className="legenda-figura-img"
              />
            </span>
            <span className="legenda-figura-nome">{f.nome}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

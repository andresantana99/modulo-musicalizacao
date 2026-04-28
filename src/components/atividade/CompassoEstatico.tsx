import { useParams } from 'react-router-dom';
import LegendaFiguras from '@/components/figura/LegendaFiguras';
import { COMPASSOS_ESTATICOS, FIGURAS_ETAPA3, type NotaId } from '@/content/etapa3/compassos-estaticos';

const FIGURAS_MAP = Object.fromEntries(FIGURAS_ETAPA3.map((f) => [f.id, f])) as Record<
  NotaId,
  (typeof FIGURAS_ETAPA3)[number]
>;

export default function CompassoEstatico() {
  const { pagina } = useParams<{ pagina?: string }>();
  const paginaNum = Number(pagina ?? '1');
  const dados = COMPASSOS_ESTATICOS[paginaNum];

  if (!dados) return null;

  return (
    <div className="monta-compasso">
      <div className="monta-compasso-intro">
        <p>{dados.texto}</p>
      </div>

      <CompassoBloco titulo="1º Compasso" notas={dados.compasso1} />
      <CompassoBloco titulo="2º Compasso" notas={dados.compasso2} />

      <LegendaFiguras figuras={FIGURAS_ETAPA3} />
    </div>
  );
}

function CompassoBloco({ titulo, notas }: { titulo: string; notas: NotaId[] }) {
  const totalDuracao = notas.reduce((acc, id) => acc + FIGURAS_MAP[id].duracao, 0);
  const COMPASSO_TEMPOS = 4;
  const porcentagem = Math.min((totalDuracao / COMPASSO_TEMPOS) * 100, 100);

  return (
    <div className="compasso-bloco mb-3">
      <div className="d-flex justify-content-between align-items-baseline mb-1">
        <strong>{titulo}</strong>
        <small className="text-body-secondary">
          {totalDuracao} / {COMPASSO_TEMPOS} tempos
        </small>
      </div>
      <div className="compasso-pista">
        {notas.map((id, i) => {
          const fig = FIGURAS_MAP[id];
          return (
            <div
              key={i}
              className="compasso-nota"
              style={{ backgroundColor: fig.cor, flexGrow: fig.duracao }}
              title={fig.nome}
            >
              <img
                src={`${import.meta.env.BASE_URL}img/${fig.arquivo}`}
                alt=""
                aria-hidden="true"
                className="compasso-nota-img"
              />
            </div>
          );
        })}
      </div>
      <div className="progress mt-1" style={{ height: 4 }} aria-hidden="true">
        <div className="progress-bar bg-success" style={{ width: `${porcentagem}%` }} />
      </div>
    </div>
  );
}

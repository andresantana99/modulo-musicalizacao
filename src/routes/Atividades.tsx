import { Link, useParams } from 'react-router-dom';
import { etapas } from '@/content/etapas.config';
import { getAtividades } from '@/content/atividades';
import { useAtividadesStore } from '@/stores/atividadesStore';
import { QuizPergunta } from '@/components/atividade/QuizPergunta';

export default function Atividades() {
  const { numero } = useParams<{ numero: string }>();
  const etapaNum = Number(numero);
  const etapa = etapas.find((e) => e.numero === etapaNum);
  const atividades = getAtividades(etapaNum);
  const respostas = useAtividadesStore((s) => s.respostas);
  const registrar = useAtividadesStore((s) => s.registrar);
  const resetEtapa = useAtividadesStore((s) => s.resetEtapa);

  if (!etapa) {
    return (
      <section className="container text-center p-4">
        <h2>Etapa não encontrada</h2>
        <Link to="/etapas" className="btn btn-primary">
          Voltar
        </Link>
      </section>
    );
  }

  if (atividades.length === 0) {
    return (
      <section className="container p-4">
        <h2>Atividades — Etapa {etapa.numero}</h2>
        <p className="text-body-secondary">
          Nenhuma atividade cadastrada para esta etapa ainda.
        </p>
        <Link to={`/etapa/${etapa.numero}`} className="btn btn-secondary">
          Voltar à etapa
        </Link>
      </section>
    );
  }

  const respondidas = atividades.filter((a) => respostas[a.id]);
  const acertos = respondidas.filter((a) => respostas[a.id].acertou).length;
  const tudoRespondido = respondidas.length === atividades.length;

  return (
    <section className="container p-3">
      <header className="mb-3" style={{ borderLeft: `6px solid ${etapa.cor}`, paddingLeft: 12 }}>
        <h2>
          Atividades — Etapa {etapa.numero}: {etapa.titulo}
        </h2>
        <p className="small text-body-secondary mb-0">
          {respondidas.length} de {atividades.length} respondidas · {acertos} acerto(s)
        </p>
      </header>

      {atividades.map((at) => (
        <QuizPergunta
          key={at.id}
          atividade={at}
          respostaAnterior={respostas[at.id]?.opcaoEscolhida}
          onResponder={(opcaoId, acertou) =>
            registrar({
              atividadeId: at.id,
              opcaoEscolhida: opcaoId,
              acertou,
              respondidoEm: Date.now(),
            })
          }
        />
      ))}

      {tudoRespondido && (
        <div className="alert alert-info" role="status">
          <h3 className="h5 mb-2">Relatório final</h3>
          <p className="mb-2">
            Você acertou <strong>{acertos}</strong> de <strong>{atividades.length}</strong> (
            {Math.round((acertos / atividades.length) * 100)}%).
          </p>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm me-2"
            onClick={() => resetEtapa(atividades.map((a) => a.id))}
          >
            Refazer atividades
          </button>
          <Link to="/etapas" className="btn btn-success btn-sm">
            Concluir etapa
          </Link>
        </div>
      )}

      <nav className="mt-3">
        <Link to={`/etapa/${etapa.numero}`} className="btn btn-outline-secondary">
          ← Voltar ao conteúdo
        </Link>
      </nav>
    </section>
  );
}

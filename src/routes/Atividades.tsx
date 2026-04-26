import type React from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { etapas } from '@/content/etapas.config';
import type { Atividade } from '@/content/atividades';
import { getAtividades } from '@/content/atividades';
import { useAtividadesStore } from '@/stores/atividadesStore';
import { QuizPergunta } from '@/components/atividade/QuizPergunta';

const PTS_ACERTO = 10;
const PTS_BONUS_PERFEITO = 20;

function calcEstrelas(acertos: number, total: number): 0 | 1 | 2 | 3 {
  if (total === 0 || acertos === 0) return 0;
  if (acertos === total) return 3;
  if (acertos / total >= 0.5) return 2;
  return 1;
}

type TelaFinalProps = {
  etapa: { numero: number; titulo: string; cor: string };
  atividades: Atividade[];
  acertos: number;
  pontos: number;
  estrelas: 0 | 1 | 2 | 3;
  onResetar: () => void;
};

function TelaFinal({ etapa, atividades, acertos, pontos, estrelas, onResetar }: TelaFinalProps) {
  const erros = atividades.length - acertos;
  const pct = Math.round((acertos / atividades.length) * 100);
  const proximaEtapa = etapas.find((e) => e.numero === etapa.numero + 1);

  const mensagens: Record<0 | 1 | 2 | 3, string> = {
    0: 'Não desanime! Reveja o conteúdo e tente novamente.',
    1: 'Bom começo! Com mais prática você vai melhorar.',
    2: 'Muito bem! Você está no caminho certo.',
    3: 'Parabéns! Desempenho perfeito! 🏆',
  };

  const estrelaDisplay = ['', '⭐', '⭐⭐', '⭐⭐⭐'][estrelas];

  return (
    <section className="container p-3">
      <div className="resultado-card" style={{ '--etapa-cor': etapa.cor } as React.CSSProperties}>
        <div className="resultado-topo">
          <div className="resultado-estrelas" aria-label={`${estrelas} de 3 estrelas`}>
            {[1, 2, 3].map((s) => (
              <span key={s} className={`resultado-estrela ${s <= estrelas ? 'ativa' : ''}`}>
                ★
              </span>
            ))}
          </div>
          <h2 className="resultado-titulo">{mensagens[estrelas]}</h2>
          {estrelaDisplay && (
            <p className="resultado-rating">{estrelaDisplay}</p>
          )}
        </div>

        <div className="resultado-stats">
          <div className="resultado-stat">
            <span className="resultado-stat-valor resultado-stat-pontos">{pontos}</span>
            <span className="resultado-stat-label">pontos</span>
          </div>
          <div className="resultado-stat">
            <span className="resultado-stat-valor text-success">{acertos}</span>
            <span className="resultado-stat-label">acerto{acertos !== 1 ? 's' : ''}</span>
          </div>
          <div className="resultado-stat">
            <span className="resultado-stat-valor text-danger">{erros}</span>
            <span className="resultado-stat-label">erro{erros !== 1 ? 's' : ''}</span>
          </div>
          <div className="resultado-stat">
            <span className="resultado-stat-valor">{pct}%</span>
            <span className="resultado-stat-label">aproveitamento</span>
          </div>
        </div>

        {acertos === atividades.length && (
          <div className="resultado-bonus">
            🏆 Bônus perfeito: +{PTS_BONUS_PERFEITO} pontos!
          </div>
        )}

        <div className="resultado-acoes">
          <button type="button" className="btn btn-outline-secondary" onClick={onResetar}>
            ↻ Tentar novamente
          </button>
          {proximaEtapa ? (
            <>
              <Link to="/etapas" className="btn btn-outline-primary">
                Ver todas as etapas
              </Link>
              <Link
                to={`/etapa/${proximaEtapa.numero}/pagina/1`}
                className="btn btn-success btn-lg"
                style={{ ['--etapa-cor' as string]: proximaEtapa.cor } as React.CSSProperties}
              >
                Próxima etapa →
              </Link>
            </>
          ) : (
            <Link to="/etapas" className="btn btn-success btn-lg">
              Concluir etapa →
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Atividades() {
  const { numero } = useParams<{ numero: string }>();
  const etapaNum = Number(numero);
  const etapa = etapas.find((e) => e.numero === etapaNum);
  const atividades = getAtividades(etapaNum);
  const respostas = useAtividadesStore((s) => s.respostas);
  const registrar = useAtividadesStore((s) => s.registrar);
  const resetEtapa = useAtividadesStore((s) => s.resetEtapa);

  const [indiceAtual, setIndiceAtual] = useState(() => {
    const primeiro = atividades.findIndex((a) => !respostas[a.id]);
    return primeiro === -1 ? 0 : primeiro;
  });
  const [respondidaAgora, setRespondidaAgora] = useState(false);
  const [pontosFlash, setPontosFlash] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);

  if (!etapa) {
    return (
      <section className="container text-center p-4">
        <h2>Etapa não encontrada</h2>
        <Link to="/etapas" className="btn btn-primary">Voltar</Link>
      </section>
    );
  }

  if (atividades.length === 0) {
    const proximaEtapaSemAtividade = etapas.find((e) => e.numero === etapa.numero + 1);
    return (
      <section className="container p-3">
        <div
          className="resultado-card"
          style={{ '--etapa-cor': etapa.cor } as React.CSSProperties}
        >
          <div className="resultado-topo">
            <div className="resultado-estrelas" aria-hidden="true">
              {[1, 2, 3].map((s) => (
                <span key={s} className="resultado-estrela ativa">★</span>
              ))}
            </div>
            <h2 className="resultado-titulo">Etapa {etapa.numero} concluída!</h2>
            <p className="text-body-secondary mb-0">
              Esta etapa não possui atividades de quiz. Você já pode avançar.
            </p>
          </div>
          <div className="resultado-acoes mt-3">
            <Link
              to={`/etapa/${etapa.numero}/pagina/1`}
              className="btn btn-outline-secondary"
            >
              ← Voltar ao conteúdo
            </Link>
            {proximaEtapaSemAtividade ? (
              <>
                <Link to="/etapas" className="btn btn-outline-primary">
                  Ver todas as etapas
                </Link>
                <Link
                  to={`/etapa/${proximaEtapaSemAtividade.numero}/pagina/1`}
                  className="btn btn-success btn-lg"
                >
                  Próxima etapa →
                </Link>
              </>
            ) : (
              <Link to="/etapas" className="btn btn-success btn-lg">
                Concluir etapa →
              </Link>
            )}
          </div>
        </div>
      </section>
    );
  }

  const respondidas = atividades.filter((a) => respostas[a.id]);
  const acertos = respondidas.filter((a) => respostas[a.id].acertou).length;
  const tudoRespondido = respondidas.length === atividades.length;

  const pontosSessao =
    respondidas.reduce((acc, a) => acc + (respostas[a.id].acertou ? PTS_ACERTO : 0), 0) +
    (acertos === atividades.length ? PTS_BONUS_PERFEITO : 0);

  const estrelas = calcEstrelas(acertos, atividades.length);

  if (tudoRespondido && !respondidaAgora) {
    return (
      <TelaFinal
        etapa={etapa}
        atividades={atividades}
        acertos={acertos}
        pontos={pontosSessao}
        estrelas={estrelas}
        onResetar={() => {
          resetEtapa(atividades.map((a) => a.id));
          setIndiceAtual(0);
          setRespondidaAgora(false);
          setPontosFlash(null);
          setStreak(0);
        }}
      />
    );
  }

  const idxReal = Math.min(indiceAtual, atividades.length - 1);
  const atividadeAtual = atividades[idxReal];
  const numeroExibido = respondidas.length + (respondidaAgora ? 0 : 1);
  const progresso = (respondidas.length / atividades.length) * 100;

  const handleResponder = (opcaoId: string, acertou: boolean) => {
    registrar({
      atividadeId: atividadeAtual.id,
      opcaoEscolhida: opcaoId,
      acertou,
      respondidoEm: Date.now(),
    });
    setRespondidaAgora(true);
    setPontosFlash(acertou ? PTS_ACERTO : 0);
    setStreak(acertou ? streak + 1 : 0);
  };

  const avancar = () => {
    setRespondidaAgora(false);
    setPontosFlash(null);
    if (tudoRespondido) return;
    setIndiceAtual((i) => i + 1);
  };

  return (
    <section className="container p-3">
      <div
        className="atividade-header mb-4"
        style={{ '--etapa-cor': etapa.cor } as React.CSSProperties}
      >
        <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <div className="d-flex align-items-center gap-2">
            <span
              className="badge rounded-pill"
              style={{ backgroundColor: etapa.cor }}
            >
              Etapa {etapa.numero}
            </span>
            <span className="text-body-secondary small fw-semibold">
              Pergunta {numeroExibido} de {atividades.length}
            </span>
          </div>
          <div className="d-flex align-items-center gap-2">
            {streak >= 2 && (
              <span className="atividade-streak">🔥 {streak} seguidas!</span>
            )}
            <span className="atividade-pontos-badge">{pontosSessao} pts</span>
            {pontosFlash !== null && (
              <span
                key={pontosSessao}
                className={`atividade-pts-flash ${pontosFlash > 0 ? 'ok' : 'miss'}`}
              >
                {pontosFlash > 0 ? `+${pontosFlash}` : '±0'}
              </span>
            )}
          </div>
        </div>

        <div className="progress" style={{ height: 8 }} aria-label="Progresso das atividades">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${progresso}%`, backgroundColor: etapa.cor, transition: 'width 500ms ease' }}
            aria-valuenow={progresso}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>

      <QuizPergunta
        key={atividadeAtual.id}
        atividade={atividadeAtual}
        respostaAnterior={respostas[atividadeAtual.id]?.opcaoEscolhida}
        onResponder={handleResponder}
      />

      {respondidaAgora && (
        <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
          <Link to={`/etapa/${etapa.numero}`} className="btn btn-outline-secondary">
            ← Voltar ao conteúdo
          </Link>
          <button type="button" className="btn btn-primary btn-lg" onClick={avancar}>
            {tudoRespondido ? 'Ver resultado →' : 'Próxima pergunta →'}
          </button>
        </div>
      )}

      {!respondidaAgora && (
        <nav className="mt-2">
          <Link to={`/etapa/${etapa.numero}`} className="btn btn-outline-secondary btn-sm">
            ← Voltar ao conteúdo
          </Link>
        </nav>
      )}
    </section>
  );
}

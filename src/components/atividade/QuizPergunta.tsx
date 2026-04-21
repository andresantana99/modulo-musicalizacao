import { useId, useState } from 'react';
import type { Atividade } from '@/content/atividades';

type Props = {
  atividade: Atividade;
  respostaAnterior?: string;
  onResponder: (opcaoId: string, acertou: boolean) => void;
};

const LETRAS = ['A', 'B', 'C', 'D', 'E'];

export function QuizPergunta({ atividade, respostaAnterior, onResponder }: Props) {
  const [escolha, setEscolha] = useState<string | null>(respostaAnterior ?? null);
  const [enviada, setEnviada] = useState(Boolean(respostaAnterior));
  const groupId = useId();

  const submeter = () => {
    if (!escolha || enviada) return;
    setEnviada(true);
    onResponder(escolha, escolha === atividade.correta);
  };

  const acertou = enviada && escolha === atividade.correta;

  return (
    <div className="quiz-card">
      <fieldset role="radiogroup" id={groupId}>
        <legend>{atividade.enunciado}</legend>
        <div className="quiz-opcoes">
          {atividade.opcoes.map((op, i) => {
            const id = `${atividade.id}-${op.id}`;
            const marcadaCerta = enviada && op.id === atividade.correta;
            const marcadaErrada = enviada && op.id === escolha && op.id !== atividade.correta;
            const classe = marcadaCerta ? 'correta' : marcadaErrada ? 'errada' : enviada ? 'desabilitada' : '';
            const marca = marcadaCerta ? '✓' : marcadaErrada ? '✗' : null;
            return (
              <div key={op.id}>
                <input
                  className="quiz-opcao-input"
                  type="radio"
                  id={id}
                  name={atividade.id}
                  value={op.id}
                  checked={escolha === op.id}
                  onChange={() => !enviada && setEscolha(op.id)}
                  disabled={enviada}
                  aria-label={`${LETRAS[i]} - ${op.texto}`}
                />
                <label className={`quiz-opcao-label ${classe}`} htmlFor={id}>
                  <span className="quiz-opcao-bolha">{LETRAS[i]}</span>
                  <span>{op.texto}</span>
                  {marca && <span className="quiz-opcao-marca">{marca}</span>}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>

      {!enviada && (
        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={submeter}
          disabled={!escolha}
        >
          Responder
        </button>
      )}

      {enviada && (
        <div
          className={`quiz-feedback mt-3 ${acertou ? 'quiz-feedback-ok' : 'quiz-feedback-erro'}`}
          role="status"
          aria-live="polite"
        >
          <span className="quiz-feedback-icone">{acertou ? '🎉' : '💡'}</span>
          <div>
            <strong>{acertou ? 'Resposta correta!' : 'Resposta incorreta.'}</strong>
            {atividade.explicacao && <p className="mb-0 mt-1 small">{atividade.explicacao}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

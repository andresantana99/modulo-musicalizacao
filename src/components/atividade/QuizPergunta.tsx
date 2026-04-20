import { useId, useState } from 'react';
import type { Atividade } from '@/content/atividades';

type Props = {
  atividade: Atividade;
  respostaAnterior?: string;
  onResponder: (opcaoId: string, acertou: boolean) => void;
};

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
    <fieldset className="border rounded p-3 mb-3">
      <legend className="fs-5">{atividade.enunciado}</legend>
      <div role="radiogroup" aria-labelledby={groupId}>
        {atividade.opcoes.map((op) => {
          const id = `${atividade.id}-${op.id}`;
          const marcadaCerta = enviada && op.id === atividade.correta;
          const marcadaErrada = enviada && op.id === escolha && op.id !== atividade.correta;
          return (
            <div key={op.id} className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id={id}
                name={atividade.id}
                value={op.id}
                checked={escolha === op.id}
                onChange={() => setEscolha(op.id)}
                disabled={enviada}
              />
              <label
                className={`form-check-label ${marcadaCerta ? 'text-success fw-bold' : ''} ${marcadaErrada ? 'text-danger' : ''}`}
                htmlFor={id}
              >
                {op.texto}
                {marcadaCerta && ' ✓'}
                {marcadaErrada && ' ✗'}
              </label>
            </div>
          );
        })}
      </div>

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
          className={`alert mt-3 ${acertou ? 'alert-success' : 'alert-warning'}`}
          role="status"
          aria-live="polite"
        >
          {acertou ? 'Resposta correta!' : 'Resposta incorreta.'}
          {atividade.explicacao && <p className="mb-0 mt-1 small">{atividade.explicacao}</p>}
        </div>
      )}
    </fieldset>
  );
}

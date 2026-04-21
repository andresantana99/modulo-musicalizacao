import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { QuizPergunta } from '@/components/atividade/QuizPergunta';
import type { Atividade } from '@/content/atividades';

const atividade: Atividade = {
  id: 'teste-q1',
  tipo: 'multipla-escolha',
  enunciado: 'Quanto é 2+2?',
  opcoes: [
    { id: 'a', texto: '3' },
    { id: 'b', texto: '4' },
    { id: 'c', texto: '5' },
  ],
  correta: 'b',
  explicacao: 'Soma básica.',
};

describe('QuizPergunta', () => {
  it('desabilita botão até escolher opção', () => {
    render(<QuizPergunta atividade={atividade} onResponder={() => {}} />);
    expect(screen.getByRole('button', { name: /responder/i })).toBeDisabled();
  });

  it('reporta acerto quando opção correta é escolhida', () => {
    const onResponder = vi.fn();
    render(<QuizPergunta atividade={atividade} onResponder={onResponder} />);
    fireEvent.click(screen.getByLabelText(/4/));
    fireEvent.click(screen.getByRole('button', { name: /responder/i }));
    expect(onResponder).toHaveBeenCalledWith('b', true);
    expect(screen.getByRole('status')).toHaveTextContent(/correta/i);
  });

  it('reporta erro quando opção incorreta é escolhida e exibe explicação', () => {
    const onResponder = vi.fn();
    render(<QuizPergunta atividade={atividade} onResponder={onResponder} />);
    fireEvent.click(screen.getByLabelText(/3/));
    fireEvent.click(screen.getByRole('button', { name: /responder/i }));
    expect(onResponder).toHaveBeenCalledWith('a', false);
    expect(screen.getByRole('status')).toHaveTextContent(/incorreta/i);
    expect(screen.getByRole('status')).toHaveTextContent(/soma básica/i);
  });

  it('quando já respondida, renderiza em modo de leitura sem botão', () => {
    render(
      <QuizPergunta
        atividade={atividade}
        respostaAnterior="b"
        onResponder={() => {}}
      />,
    );
    expect(screen.queryByRole('button', { name: /responder/i })).toBeNull();
    expect(screen.getByRole('status')).toHaveTextContent(/correta/i);
  });
});

import { useCallback, useEffect, useRef, useState } from 'react';

type Figura = {
  id: 'seminima' | 'colcheia' | 'semicolcheia' | 'minima';
  nome: string;
  cor: string;
  duracao: number;
};

const FIGURAS: Figura[] = [
  { id: 'semicolcheia', nome: 'Semicolcheia', cor: '#B9C303', duracao: 0.25 },
  { id: 'colcheia',     nome: 'Colcheia',     cor: '#E6972A', duracao: 0.5  },
  { id: 'seminima',     nome: 'Semínima',     cor: '#17867C', duracao: 1    },
  { id: 'minima',       nome: 'Mínima',       cor: '#820742', duracao: 2    },
];

const COMPASSO_TEMPOS = 4;
const BPM = 80;

type NotaColocada = { figura: Figura; inicio: number };

function totalDuracao(notas: NotaColocada[]): number {
  return notas.reduce((acc, n) => acc + n.figura.duracao, 0);
}

export default function MontaCompasso() {
  const [compasso1, setCompasso1] = useState<NotaColocada[]>([]);
  const [compasso2, setCompasso2] = useState<NotaColocada[]>([]);
  const [tocando, setTocando] = useState(false);
  const [indiceAtivo, setIndiceAtivo] = useState<number | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const clickBufferRef = useRef<AudioBuffer | null>(null);
  const timeoutsRef = useRef<number[]>([]);

  const garantirAudio = useCallback(async () => {
    if (!audioCtxRef.current) {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new Ctx();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') await ctx.resume();
    if (!clickBufferRef.current) {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}audio/clap.wav`);
        const arr = await res.arrayBuffer();
        clickBufferRef.current = await ctx.decodeAudioData(arr);
      } catch {
        // fallback silencioso
      }
    }
    return ctx;
  }, []);

  const tocarClick = useCallback((quando: number) => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    if (clickBufferRef.current) {
      const src = ctx.createBufferSource();
      src.buffer = clickBufferRef.current;
      src.connect(ctx.destination);
      src.start(quando);
    } else {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = 1000;
      gain.gain.setValueAtTime(0.3, quando);
      gain.gain.exponentialRampToValueAtTime(0.001, quando + 0.05);
      osc.connect(gain).connect(ctx.destination);
      osc.start(quando);
      osc.stop(quando + 0.06);
    }
  }, []);

  const parar = useCallback(() => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
    setTocando(false);
    setIndiceAtivo(null);
  }, []);

  const tocar = useCallback(async () => {
    if (tocando) {
      parar();
      return;
    }
    if (compasso1.length + compasso2.length === 0) return;
    const ctx = await garantirAudio();
    setTocando(true);

    const notas = [...compasso1, ...compasso2].map((n, idx) => ({
      figura: n.figura,
      inicio: 0,
      idx,
    }));
    let offset = 0;
    const agenda = notas.map((n) => {
      const tempoInicio = offset;
      offset += n.figura.duracao;
      return { ...n, inicio: tempoInicio };
    });

    const beatDur = 60 / BPM;
    const t0 = ctx.currentTime + 0.1;
    agenda.forEach((n) => {
      const scheduledAt = t0 + n.inicio * beatDur;
      tocarClick(scheduledAt);
      const delayMs = (scheduledAt - ctx.currentTime) * 1000;
      const handleShow = window.setTimeout(() => setIndiceAtivo(n.idx), delayMs);
      timeoutsRef.current.push(handleShow);
    });
    const fim = window.setTimeout(
      () => parar(),
      (offset * beatDur + 0.3) * 1000,
    );
    timeoutsRef.current.push(fim);
  }, [tocando, compasso1, compasso2, garantirAudio, tocarClick, parar]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      audioCtxRef.current?.close();
    };
  }, []);

  const adicionar = (fig: Figura) => {
    const t1 = totalDuracao(compasso1);
    const t2 = totalDuracao(compasso2);
    if (t1 + fig.duracao <= COMPASSO_TEMPOS) {
      setCompasso1((s) => [...s, { figura: fig, inicio: 0 }]);
    } else if (t2 + fig.duracao <= COMPASSO_TEMPOS) {
      setCompasso2((s) => [...s, { figura: fig, inicio: 0 }]);
    }
  };

  const limpar = () => {
    parar();
    setCompasso1([]);
    setCompasso2([]);
  };

  const totalGeral = compasso1.length + compasso2.length;
  const t1 = totalDuracao(compasso1);
  const t2 = totalDuracao(compasso2);
  const cheio1 = t1 >= COMPASSO_TEMPOS;

  return (
    <div className="monta-compasso">
      <div className="monta-compasso-intro">
        <p>
          Chegou a hora de colocar em prática! Utilize as figuras rítmicas que você aprendeu para
          montar <strong>dois compassos no tempo de 4/4</strong> (cada compasso suporta até 4
          tempos).
        </p>
        <p className="mb-0">
          Clique nas figuras abaixo para adicioná-las à sequência e, quando estiver pronto, clique
          em <strong>Tocar sequência</strong> para ouvir o ritmo que você criou.
        </p>
      </div>

      <Compasso
        titulo="1º Compasso"
        notas={compasso1}
        preenchido={t1}
        indiceAtivoGlobal={indiceAtivo}
        indiceInicial={0}
      />
      <Compasso
        titulo="2º Compasso"
        notas={compasso2}
        preenchido={t2}
        indiceAtivoGlobal={indiceAtivo}
        indiceInicial={compasso1.length}
      />

      <h4 className="mt-4 mb-3">Clique nas figuras para montar o compasso:</h4>
      <div className="row g-2">
        {FIGURAS.map((f) => {
          const cabe = !cheio1 || (cheio1 && t2 + f.duracao <= COMPASSO_TEMPOS);
          return (
            <div key={f.id} className="col-6 col-md-3">
              <button
                type="button"
                className="figura-botao w-100"
                style={{ backgroundColor: f.cor }}
                onClick={() => adicionar(f)}
                disabled={!cabe || tocando}
              >
                {f.nome}
                <span className="figura-botao-tempo">{f.duracao}T</span>
              </button>
            </div>
          );
        })}
      </div>

      <div className="d-flex gap-2 justify-content-center flex-wrap mt-4">
        <button
          type="button"
          className={`btn btn-lg ${tocando ? 'btn-danger' : 'btn-success'}`}
          onClick={tocar}
          disabled={totalGeral === 0}
          aria-pressed={tocando}
        >
          {tocando ? '■ Parar' : '▶ Tocar sequência'}
        </button>
        <button
          type="button"
          className="btn btn-lg btn-outline-secondary"
          onClick={limpar}
          disabled={totalGeral === 0}
        >
          ↻ Limpar
        </button>
      </div>
    </div>
  );
}

type CompassoProps = {
  titulo: string;
  notas: NotaColocada[];
  preenchido: number;
  indiceAtivoGlobal: number | null;
  indiceInicial: number;
};

function Compasso({ titulo, notas, preenchido, indiceAtivoGlobal, indiceInicial }: CompassoProps) {
  const porcentagem = (preenchido / COMPASSO_TEMPOS) * 100;
  return (
    <div className="compasso-bloco mb-3">
      <div className="d-flex justify-content-between align-items-baseline mb-1">
        <strong>{titulo}</strong>
        <small className="text-body-secondary">
          {preenchido} / {COMPASSO_TEMPOS} tempos
        </small>
      </div>
      <div className="compasso-pista">
        {notas.length === 0 ? (
          <span className="compasso-vazio">—</span>
        ) : (
          notas.map((n, i) => {
            const idxGlobal = indiceInicial + i;
            const ativa = indiceAtivoGlobal === idxGlobal;
            return (
              <div
                key={i}
                className={`compasso-nota ${ativa ? 'compasso-nota-ativa' : ''}`}
                style={{
                  backgroundColor: n.figura.cor,
                  flexGrow: n.figura.duracao,
                }}
                title={n.figura.nome}
              >
                {n.figura.nome.charAt(0)}
              </div>
            );
          })
        )}
      </div>
      <div className="progress mt-1" style={{ height: 4 }} aria-hidden="true">
        <div
          className="progress-bar bg-success"
          style={{ width: `${porcentagem}%` }}
        />
      </div>
    </div>
  );
}

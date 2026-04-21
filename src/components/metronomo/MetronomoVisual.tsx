import { useCallback, useEffect, useRef, useState } from 'react';

type Figura = {
  nome: string;
  cor: string;
  beatsPorCiclo: number;
};

const FIGURAS: Figura[] = [
  { nome: 'Semicolcheia', cor: '#B9C303', beatsPorCiclo: 0.25 },
  { nome: 'Colcheia',     cor: '#E6972A', beatsPorCiclo: 0.5  },
  { nome: 'Semínima',     cor: '#17867C', beatsPorCiclo: 1    },
  { nome: 'Mínima',       cor: '#820742', beatsPorCiclo: 2    },
  { nome: 'Semibreve',    cor: '#c2410c', beatsPorCiclo: 4    },
];

const BPM_MIN = 20;
const BPM_MAX = 200;

type Props = {
  compacto?: boolean;
};

export default function MetronomoVisual({ compacto = false }: Props) {
  const [bpm, setBpm] = useState(60);
  const [tocando, setTocando] = useState(false);
  const [beat, setBeat] = useState(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const clickBufferRef = useRef<AudioBuffer | null>(null);
  const startTimeRef = useRef<number>(0);
  const proximoBeatRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

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

  useEffect(() => {
    if (!tocando) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const beatDur = 60 / bpm;
    startTimeRef.current = ctx.currentTime;
    proximoBeatRef.current = ctx.currentTime;

    const loop = () => {
      const agora = ctx.currentTime;
      while (proximoBeatRef.current < agora + 0.1) {
        tocarClick(proximoBeatRef.current);
        proximoBeatRef.current += beatDur;
      }
      const beatsPassados = (agora - startTimeRef.current) / beatDur;
      setBeat(beatsPassados);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [tocando, bpm, tocarClick]);

  const alternar = useCallback(async () => {
    if (tocando) {
      setTocando(false);
      setBeat(0);
    } else {
      await garantirAudio();
      setTocando(true);
    }
  }, [tocando, garantirAudio]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      audioCtxRef.current?.close();
    };
  }, []);

  const figuras = compacto ? FIGURAS.slice(0, 4) : FIGURAS;

  return (
    <div className="metronomo-visual">
      <div className="metronomo-painel mb-4">
        <div className="metronomo-bpm" aria-live="polite">
          <span className="metronomo-bpm-valor">{bpm}</span>
          <span className="metronomo-bpm-unidade">BPM</span>
        </div>
        <div className="metronomo-controles">
          <label htmlFor="bpm-range" className="form-label small text-body-secondary">
            Andamento
          </label>
          <input
            id="bpm-range"
            type="range"
            className="form-range"
            min={BPM_MIN}
            max={BPM_MAX}
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            aria-valuemin={BPM_MIN}
            aria-valuemax={BPM_MAX}
            aria-valuenow={bpm}
          />
          <div className="d-flex gap-2 justify-content-center flex-wrap mt-2">
            {[30, 60, 90, 120].map((v) => (
              <button
                key={v}
                type="button"
                className={`btn btn-sm ${bpm === v ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setBpm(v)}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          className={`btn btn-lg w-100 mt-3 ${tocando ? 'btn-danger' : 'btn-success'}`}
          onClick={alternar}
          aria-pressed={tocando}
        >
          {tocando ? '■ Parar' : '▶ Iniciar'}
        </button>
      </div>

      <div className="row g-3 justify-content-center">
        {figuras.map((f) => {
          const fase = tocando ? (beat / f.beatsPorCiclo) % 1 : 0;
          const ativa = fase < 0.5;
          return (
            <div key={f.nome} className={compacto ? 'col-6 col-md-3' : 'col-12 col-md-4'}>
              <div
                className="figura-card"
                style={{
                  backgroundColor: f.cor,
                  opacity: tocando && !ativa ? 0.3 : 1,
                  transform: tocando && ativa ? 'scale(1.04)' : 'scale(1)',
                }}
                role="img"
                aria-label={`${f.nome} — ${ativa ? 'ativa' : 'em pausa'}`}
              >
                {f.nome}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

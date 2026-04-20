import { useCallback, useEffect, useRef, useState } from 'react';

type Figura = {
  nome: string;
  cor: string;
  beatsPorCiclo: number;
};

const FIGURAS: Figura[] = [
  { nome: 'Semínima', cor: '#1e3a8a', beatsPorCiclo: 1 },
  { nome: 'Colcheia', cor: '#b91c1c', beatsPorCiclo: 0.5 },
  { nome: 'Semicolcheia', cor: '#166534', beatsPorCiclo: 0.25 },
  { nome: 'Mínima', cor: '#ca8a04', beatsPorCiclo: 2 },
  { nome: 'Semibreve', cor: '#c2410c', beatsPorCiclo: 4 },
];

const BPM_MIN = 20;
const BPM_MAX = 200;

export default function Metronomo() {
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
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
        // fallback silencioso: sintetizar click curto
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

  return (
    <section className="container text-center p-4">
      <h2 className="mb-3">Metrônomo Visual</h2>

      <div className="mb-3" aria-live="polite">
        <strong className="fs-3">{bpm} BPM</strong>
      </div>

      <div className="mb-3 mx-auto" style={{ maxWidth: 420 }}>
        <label htmlFor="bpm" className="form-label">
          Andamento (batidas por minuto)
        </label>
        <input
          id="bpm"
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
      </div>

      <button
        type="button"
        className={`btn ${tocando ? 'btn-danger' : 'btn-primary'} mb-4`}
        onClick={alternar}
        aria-pressed={tocando}
      >
        {tocando ? 'Parar' : 'Iniciar'}
      </button>

      <div className="row g-3 justify-content-center">
        {FIGURAS.map((f) => {
          const fase = tocando ? (beat / f.beatsPorCiclo) % 1 : 0;
          const ativa = fase < 0.5;
          return (
            <div key={f.nome} className="col-12 col-md-4">
              <div
                className="p-4 rounded text-white fw-bold"
                style={{
                  backgroundColor: f.cor,
                  opacity: tocando && !ativa ? 0.25 : 1,
                  transition: 'opacity 60ms linear',
                  minHeight: 110,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                role="img"
                aria-label={`${f.nome} — ${ativa ? 'ativa' : 'em pausa'}`}
              >
                {f.nome.toUpperCase()}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

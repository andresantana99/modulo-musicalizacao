import MetronomoVisual from '@/components/metronomo/MetronomoVisual';

export default function MetronomoInline() {
  return (
    <div className="metronomo-inline">
      <div className="monta-compasso-intro">
        <p>
          Por fim, neste exercício teremos a demonstração de um <strong>Metrônomo</strong>.
          Configure a duração dos intervalos, clique em <strong>Iniciar</strong> e se divirta.
        </p>
        <p className="mb-0">
          Defina a frequência dos intervalos usando o controle abaixo ou os valores pré-definidos,
          em batidas por minuto (BPM). Em seguida, basta clicar em <strong>Iniciar</strong>.
        </p>
      </div>

      <MetronomoVisual compacto />
    </div>
  );
}

import MetronomoVisual from '@/components/metronomo/MetronomoVisual';

export default function MetronomoInline() {
  return (
    <div className="p-3 mb-4 bg-body-tertiary rounded-3">
      <div className="text-center mb-4">
        <p className="fs-5 mb-0">
          Por fim, neste exercício teremos a demonstração de um Metrônomo. Configure a duração
          dos intervalos de tempo do metrônomo, clique em <strong>Iniciar</strong> e se divirta.
        </p>
      </div>

      <p className="fs-6 mb-3">
        Defina a frequência dos intervalos usando o controle abaixo ou os valores pré-definidos,
        em batidas por minuto (BPM). Em seguida, basta clicar em <strong>Iniciar</strong>:
      </p>

      <MetronomoVisual compacto />
    </div>
  );
}

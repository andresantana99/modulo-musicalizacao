import MetronomoVisual from '@/components/metronomo/MetronomoVisual';

export default function Metronomo() {
  return (
    <section className="container p-4">
      <header className="mb-4 text-center">
        <h2 className="mb-1">Metrônomo Visual</h2>
        <p className="text-body-secondary mb-0">
          Visualize o pulso rítmico através de cores. Ajuste o andamento e observe as figuras.
        </p>
      </header>
      <MetronomoVisual />
    </section>
  );
}

import { HashRouter, Route, Routes } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Home from '@/routes/Home';
import SelecaoEtapa from '@/routes/SelecaoEtapa';
import Etapa from '@/routes/Etapa';
import Atividades from '@/routes/Atividades';
import Metronomo from '@/routes/Metronomo';
import NotFound from '@/routes/NotFound';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/etapas" element={<SelecaoEtapa />} />
          <Route path="/etapa/:numero" element={<Etapa />} />
          <Route path="/etapa/:numero/pagina/:pagina" element={<Etapa />} />
          <Route path="/etapa/:numero/atividades" element={<Atividades />} />
          <Route path="/metronomo" element={<Metronomo />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

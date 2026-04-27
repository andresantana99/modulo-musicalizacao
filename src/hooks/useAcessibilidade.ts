import { useEffect } from 'react';
import { useUIStore } from '@/stores/uiStore';

const ZOOM_MIN = 70;
const ZOOM_MAX = 180;
const ZOOM_STEP = 10;

export default function useAcessibilidade() {
  const { tema, zoom, setTema, setZoom } = useUIStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', tema);
  }, [tema]);

  useEffect(() => {
    // font-size no <html> escala todos os rem (Bootstrap fs-*, nosso CSS) consistentemente
    // em desktop e mobile. body.style.zoom era instável no Safari iOS e em conteúdo legacy
    // injetado via dangerouslySetInnerHTML — só escalava partes do React puro.
    document.documentElement.style.setProperty('--zoom', String(zoom));
    document.documentElement.style.fontSize = `${zoom}%`;
    document.body.style.removeProperty('zoom');
  }, [zoom]);

  return {
    tema,
    zoom,
    alternarContraste: () => setTema(tema === 'light' ? 'dark' : 'light'),
    aumentarZoom: () => setZoom(Math.min(ZOOM_MAX, zoom + ZOOM_STEP)),
    diminuirZoom: () => setZoom(Math.max(ZOOM_MIN, zoom - ZOOM_STEP)),
  };
}

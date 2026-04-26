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
    document.documentElement.style.setProperty('--zoom', String(zoom));
    document.body.style.setProperty('zoom', `${zoom}%`);
  }, [zoom]);

  return {
    tema,
    zoom,
    alternarContraste: () => setTema(tema === 'light' ? 'dark' : 'light'),
    aumentarZoom: () => setZoom(Math.min(ZOOM_MAX, zoom + ZOOM_STEP)),
    diminuirZoom: () => setZoom(Math.max(ZOOM_MIN, zoom - ZOOM_STEP)),
  };
}

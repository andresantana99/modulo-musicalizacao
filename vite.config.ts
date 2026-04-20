import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// Base path para GitHub Pages: https://<user>.github.io/modulo-musicalizacao/
// Em dev (npm run dev), base = '/'. Em build, usa VITE_BASE ou default abaixo.
const base = process.env.VITE_BASE ?? '/modulo-musicalizacao/';

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    css: false,
  },
});

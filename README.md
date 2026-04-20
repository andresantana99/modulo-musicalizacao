# Módulo de Musicalização para Sons Percussivos

Plataforma educacional acessível para ensino de música a pessoas surdas, usando **cores** como linguagem principal em lugar do som. Projeto vinculado à Universidade Federal do Pará (UFPA).

## Stack (v2)

- **Front-end:** React 18 + Vite + TypeScript
- **Roteamento:** React Router (HashRouter, compatível com GitHub Pages)
- **Estado:** Zustand
- **UI:** Bootstrap 5
- **Backend:** Supabase (Auth + Postgres com RLS) — _a ser integrado na Semana 4_
- **Testes:** Vitest (unit) + Playwright (E2E)
- **CI/CD:** GitHub Actions → GitHub Pages

## Pré-requisitos

- Node.js ≥ 20
- npm ≥ 10

## Scripts

```bash
npm install        # instala dependências
npm run dev        # dev server (http://localhost:5173)
npm run build      # build de produção em dist/
npm run preview    # serve o build localmente
npm run lint       # ESLint
npm run typecheck  # TypeScript strict
npm run test       # testes unitários (Vitest)
npm run test:e2e   # testes E2E (Playwright)
npm run format     # Prettier
```

## Estrutura

```
src/
├─ routes/          páginas (Home, Etapa, Metrônomo, etc.)
├─ components/      componentes reutilizáveis
│  ├─ layout/       Header, Footer, Layout
│  ├─ acessibilidade/ zoom, contraste, VLibras
│  ├─ etapa/        conteúdo e navegação de páginas
│  ├─ atividade/    quizzes e feedback
│  └─ metronomo/    controles e visualização rítmica
├─ hooks/           useAuth, useProgresso, useAcessibilidade
├─ services/        supabase.ts, authService, progressService, ...
├─ stores/          Zustand (auth, progress, ui)
├─ content/         conteúdo pedagógico (MDX) + config de etapas
└─ styles/          CSS global e tema

legacy/             versão original em HTML/jQuery (referência)
docs/               artefatos de TCC (arquitetura, ER, casos de uso)
supabase/           migrations SQL versionadas
```

## Roadmap

Refatoração em 10 semanas (ver plano arquitetural completo). Fase atual: **Semana 1 — Setup & Scaffold**.

## Licença

MIT — ver [LICENSE](./LICENSE).

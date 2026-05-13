# Módulo de Musicalização para Sons Percussivos

Plataforma educacional acessível para ensino de música a pessoas surdas, usando **cores** como linguagem principal em lugar do som. Projeto vinculado à Universidade Federal do Pará (UFPA), desenvolvido como Trabalho de Conclusão de Curso de Engenharia da Computação.

A aplicação está organizada em 4 etapas pedagógicas (figuras musicais, elementos da bateria, atividades de reforço, vídeos de orquestra) com quizzes pontuados, metrônomo visual e um construtor de compasso interativo.

## Stack

- **Front-end:** React 18 + Vite + TypeScript (strict mode)
- **Roteamento:** React Router v6 (HashRouter — compatível com GitHub Pages)
- **Estado:** Zustand com middleware `persist` (sincronização automática com `localStorage`)
- **UI:** Bootstrap 5 + CSS variables (tema light/dark via `data-bs-theme`)
- **Acessibilidade:** VLibras, ARIA, controles de zoom (70–180%), scroll restoration manual
- **Testes:** Vitest + React Testing Library (15 casos unitários)
- **Qualidade:** ESLint (strict, `--max-warnings 0`) + Prettier + TypeScript strict
- **CI/CD:** GitHub Actions → GitHub Pages

## Pré-requisitos

- Node.js ≥ 20
- npm ≥ 10

## Scripts

```bash
npm install        # instala dependências
npm run dev        # dev server (http://localhost:5173)
npm run build      # build de produção em dist/
npm run preview    # serve o build localmente em http://localhost:4173/modulo-musicalizacao/
npm run lint       # ESLint (falha em qualquer warning)
npm run typecheck  # TypeScript strict, sem emitir arquivos
npm run test       # testes unitários (Vitest)
npm run test:watch # Vitest em modo watch
npm run format     # Prettier
```

## Estrutura

```
src/
├─ App.tsx              roteador (HashRouter + Routes)
├─ main.tsx             entry point
├─ routes/              Home, SelecaoEtapa, Etapa, Atividades, Metronomo, NotFound
├─ components/
│  ├─ layout/           Header, Footer, Layout
│  ├─ acessibilidade/   BotoesAcessibilidade (zoom + tema)
│  ├─ atividade/        QuizPergunta, MontaCompasso, MetronomoInline, CompassoEstatico
│  ├─ figura/           LegendaFiguras
│  ├─ metronomo/        MetronomoVisual
│  └─ ui/               Modal genérico (confirmação)
├─ hooks/               useAcessibilidade
├─ stores/              atividadesStore (quizzes), uiStore (tema/zoom)
├─ content/             dados pedagógicos versionados
│  ├─ etapas.config.ts  metadados das 4 etapas
│  ├─ atividades.ts     seed de quizzes
│  ├─ paginas.ts        loader unificado (getPagina, resolverBase)
│  └─ etapaN/           paginas.json por etapa
└─ styles/              global.css + theme.css

tests/unit/             suíte Vitest
docs/                   documentação completa (arquitetura, casos de uso, ADRs, diagramas)
public/                 assets estáticos (img/, audio/)
```

## Documentação

Toda a documentação técnica está em [`docs/`](docs/), incluindo arquitetura, casos de uso, decisões arquiteturais (ADRs), tecnologias, estratégia de testes, hospedagem e melhorias futuras. Comece por [`docs/README.md`](docs/README.md).

Para o texto consolidado em português técnico-acadêmico (pronto para inserir no documento de TCC), ver [`docs/tcc-texto.md`](docs/tcc-texto.md). Os diagramas UML e de arquitetura estão em [`docs/diagramas/`](docs/diagramas/) (fontes Mermaid + PNGs renderizados).

## Hospedagem

A aplicação é publicada em **GitHub Pages** a cada `push` na branch `main`. O pipeline (`.github/workflows/deploy.yml`) executa em sequência: `lint` → `typecheck` → `test` → `build` → `deploy`. Qualquer falha em um dos passos bloqueia a publicação.

URL pública: `https://<usuário>.github.io/modulo-musicalizacao/`

## Status do projeto

Aplicação funcional, validada pelo autor do TCC. Funcionalidades dependentes de _backend_ (autenticação, dashboard de professor, analytics, sincronização entre dispositivos) estão catalogadas como melhorias futuras em [`docs/melhorias-futuras.md`](docs/melhorias-futuras.md).

## Setup local

Ver [`SETUP.md`](SETUP.md) para instruções de ambiente (incluindo opção de Node.js portátil para Windows sem privilégios de administrador).

## Licença

MIT — ver [LICENSE](./LICENSE).

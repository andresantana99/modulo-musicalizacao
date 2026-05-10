# Engenharia de Software

## Padrões aplicados

| Padrão | Onde se manifesta no código |
|---|---|
| **Arquitetura em camadas** | Apresentação ([`src/routes/`](../src/routes/), [`src/components/`](../src/components/)) → Lógica ([`src/hooks/`](../src/hooks/), [`src/stores/`](../src/stores/)) → Conteúdo ([`src/content/`](../src/content/)) |
| **Separation of Concerns** | Cada componente React tem responsabilidade única; o conteúdo pedagógico está fora da lógica de renderização |
| **Single Source of Truth** | Stores Zustand ([`atividadesStore`](../src/stores/atividadesStore.ts), [`uiStore`](../src/stores/uiStore.ts)) — qualquer componente lê o mesmo estado |
| **Strict TypeScript** | `tsconfig.json` com `strict: true`, `noUnusedLocals`, `noUnusedParameters` — contratos explícitos em toda a base |
| **Conteúdo declarativo** | Etapas/atividades declaradas como dado tipado ([`etapas.config.ts`](../src/content/etapas.config.ts), [`atividades.ts`](../src/content/atividades.ts)) e renderizadas por componentes genéricos — elimina duplicação |
| **Idempotência de hooks** | `useAcessibilidade` e `Layout` usam `useEffect` com cleanup correto e `requestAnimationFrame` para evitar efeitos colaterais não desejados |

---

## Estrutura de diretórios

```
src/
├── App.tsx                      Router (HashRouter + Routes)
├── main.tsx                     Entry point: monta App, importa CSS
├── components/                  Componentes React reutilizáveis
│   ├── acessibilidade/          BotoesAcessibilidade (zoom + tema)
│   ├── atividade/               QuizPergunta, MontaCompasso, MetronomoInline, CompassoEstatico
│   ├── figura/                  LegendaFiguras (legenda figura↔cor compartilhada)
│   ├── layout/                  Layout, Header, Footer
│   ├── metronomo/               MetronomoVisual (componente da rota /metronomo)
│   └── ui/                      Modal genérico
├── hooks/                       useAcessibilidade
├── stores/                      atividadesStore (quizzes), uiStore (tema/zoom)
├── content/                     Dados pedagógicos versionados
│   ├── etapas.config.ts         Metadados das 4 etapas
│   ├── atividades.ts            Seed de quizzes
│   ├── paginas.ts               Loader unificado (getPagina, resolverBase)
│   ├── etapaN/paginas.json      Conteúdo HTML por página
│   └── etapa3/compassos-estaticos.ts  Estrutura tipada dos compassos da Etapa 3
├── routes/                      Páginas/rotas: Home, SelecaoEtapa, Etapa, Atividades, Metronomo, NotFound
└── styles/                      global.css + theme.css (variáveis CSS, dark mode, overrides)
```

Cada diretório tem responsabilidade única e nome em português alinhado com o domínio (etapa, atividade, figura, metronomo). Essa regra simplifica a leitura para revisores não-técnicos (autor do TCC, banca).

---

## Decisões arquiteturais (ADRs)

Os ADRs abaixo são curtos por intenção: cada um lista o **contexto**, a **decisão** e a **consequência**. Servem como rastro de raciocínio defensável em banca.

### ADR-01 — React + Vite (em vez de Next.js)

- **Contexto:** SPA hospedada em GitHub Pages (servidor estático puro, sem Node em runtime).
- **Decisão:** React 18 + Vite. O build gera arquivos estáticos prontos para servir.
- **Consequência:** Next.js traria SSR/Server Components que não rodam em GitHub Pages; Vite oferece o subset exato necessário (HMR rápido, build otimizado, configuração mínima).

### ADR-02 — `HashRouter` (em vez de `BrowserRouter`)

- **Contexto:** GitHub Pages não faz reescrita de rotas para `index.html` em paths que não existem fisicamente.
- **Decisão:** `HashRouter` — rotas como `/#/etapa/1/pagina/3`.
- **Consequência:** evita o _hack_ de duplicar `index.html` como `404.html`; trade-off é a presença do `#` na URL. Para o público-alvo (estudantes acessando via QR code/link), o trade-off é irrelevante.

### ADR-03 — Zustand (em vez de Redux ou Context)

- **Contexto:** Apenas dois pedaços de estado global (preferências de UI, respostas dos quizzes).
- **Decisão:** Zustand com middleware `persist`.
- **Consequência:** API minimalista (uma função `create`, hooks tipados), zero boilerplate, persistência transparente em `localStorage`. Redux exigiria reducers + actions + provider para o mesmo resultado — over-engineering aqui. Context API teria o ônus de re-renderizar todo o subtree em cada mudança.

### ADR-04 — Conteúdo em JSON + `dangerouslySetInnerHTML` (em vez de MDX)

- **Contexto:** O conteúdo pedagógico autoral existia em ~70 arquivos HTML legacy (jQuery + Bootstrap inline) que precisavam ser preservados sem perda de fidelidade.
- **Decisão:** Conversão automática (script único, hoje removido após uso) para `[{pagina, html}]` em JSON, renderizado via `dangerouslySetInnerHTML`. Imagens usam placeholder `{{BASE}}` resolvido em runtime.
- **Consequência:** MDX exigiria parsing/transformação de tabelas Bootstrap, classes inline e estrutura variada — qualquer falha no parser implicaria perda de conteúdo do autor. JSON+innerHTML preserva 100% fiel ao original com menos código. O risco de XSS é mitigado: o HTML não vem de input do usuário, é estaticamente versionado.

### ADR-05 — Bootstrap 5 (em vez de Tailwind ou CSS puro)

- **Contexto:** O conteúdo legacy usa classes Bootstrap (tabelas `.table`, `.col`, `.fs-*`, etc.) inline.
- **Decisão:** Manter Bootstrap 5 como dependência — o conteúdo migrado renderiza nativamente. Estilos próprios em `theme.css` usam variáveis CSS Bootstrap (`--bs-*`) para integrar com light/dark mode (`data-bs-theme`).
- **Consequência:** Trocar por Tailwind exigiria reescrever as classes em todos os 70+ pedaços de HTML — alto risco para zero ganho funcional. Bootstrap também já oferece dark mode pronto e responsividade testada.

### ADR-06 — Sem backend no escopo defendido (Supabase como melhoria futura)

- **Contexto:** O sistema funciona como módulo educacional autônomo — pode ser distribuído como link público sem cadastro.
- **Decisão:** Persistência apenas em `localStorage`; sem autenticação; sem dashboard de professor.
- **Consequência:** Reduz drasticamente complexidade (sem RLS, sem migrações SQL, sem gestão de credenciais), elimina ponto único de falha em runtime, custo zero. Funcionalidades dependentes de backend (turmas, progresso atravessando dispositivos, analytics) ficam catalogadas em [`melhorias-futuras.md`](melhorias-futuras.md) com escopo proposto.

---

## Estratégia de migração de conteúdo

O sistema original era um conjunto de páginas HTML estáticas com lógica replicada por etapa. A migração para React seguiu o princípio de **preservar o conteúdo, substituir o continente**:

1. Cada página HTML legacy (`pagina_N_etapaN.html`) foi convertida para uma entrada `{ pagina, html }` em [`src/content/etapaN/paginas.json`](../src/content/).
2. Os caminhos de imagens (`../../assets/img/foo.png`) foram normalizados para `{{BASE}}img/foo.png`. O placeholder `{{BASE}}` é substituído em runtime por `import.meta.env.BASE_URL` — `'/'` em desenvolvimento, `'/modulo-musicalizacao/'` em produção.
3. Todo o conteúdo é renderizado por uma única rota `Etapa.tsx` parametrizada — eliminando ~6 arquivos JS quase-idênticos do legacy.
4. Páginas que requerem interatividade (quizzes, MontaCompasso, MetronomoInline) são detectadas por chave (`etapa-pagina`) e renderizadas como componentes React em vez de HTML.

A conversão foi automatizada via script único (executado uma vez e depois removido com a pasta `legacy/`). O conteúdo final vive 100% em `src/content/` e é versionado.

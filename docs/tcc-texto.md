# Sistema desenvolvido — Módulo de Musicalização para Surdos

> **Como usar este arquivo:** o texto abaixo é escrito em terceira pessoa, em tom técnico-acadêmico, pronto para ser inserido no documento do TCC (Word/LaTeX). Cada subseção indica em comentário qual imagem do diretório `diagramas/png/` deve ser inserida com legenda. As referências a arquivos do projeto entre crases (`src/...`) podem ser preservadas como código inline ou substituídas por descrição textual.

---

## 1. Arquitetura

### 1.1 Visão geral

O sistema foi implementado como uma _Single Page Application_ (SPA) construída em React 18 com TypeScript e empacotada pela ferramenta Vite. O artefato resultante do processo de _build_ consiste em um conjunto de arquivos estáticos (HTML, CSS e JavaScript) servido diretamente pelo serviço GitHub Pages, sem a necessidade de servidor de aplicação dedicado. Toda a lógica de execução ocorre no navegador do usuário; a persistência de preferências e respostas é mantida localmente, no `localStorage` do próprio cliente.

A escolha por uma arquitetura puramente cliente é deliberada. O público-alvo do módulo — alunos surdos em escolas públicas, frequentemente acessando o conteúdo a partir de dispositivos móveis com conexões de qualidade variável — beneficia-se de um _bundle_ pequeno, carregado uma única vez, com navegação subsequente instantânea entre as páginas conceituais. Adicionalmente, a ausência de servidor reduz custos operacionais a zero e simplifica a distribuição (basta divulgar uma URL).

### 1.2 Modelo em camadas

A aplicação é organizada em três camadas com responsabilidades estritamente delimitadas. A camada de **Apresentação** reúne os componentes React responsáveis pela renderização e interação (rotas em `src/routes/` e componentes em `src/components/`). A camada de **Lógica de UI** contém os _hooks_ e as _stores_ Zustand que orquestram estado e efeitos colaterais (`src/hooks/`, `src/stores/`). A camada de **Conteúdo declarativo** abriga os dados pedagógicos versionados em arquivos JSON e TypeScript (`src/content/`).

A separação entre conteúdo e lógica é o princípio organizador do projeto. O conteúdo pedagógico autoral foi convertido para arquivos JSON (`src/content/etapaN/paginas.json`) e é renderizado por uma única rota genérica (`Etapa.tsx`) parametrizada por número de etapa e página, eliminando duplicação inerente à abordagem original baseada em arquivos HTML independentes.

### 1.3 Diagrama de implantação

> **[Inserir imagem `diagramas/png/01-implantacao.png`]**
>
> **Legenda sugerida:** Figura X — Diagrama de implantação do sistema. O navegador do usuário consome arquivos estáticos servidos pelo GitHub Pages, que são publicados automaticamente pelo pipeline GitHub Actions. A persistência ocorre no `localStorage` do cliente. O componente Supabase, em destaque pontilhado, representa um caminho de evolução fora do escopo defendido.

A figura apresenta os componentes em tempo de execução. Observa-se que não há serviço de aplicação no caminho do usuário: o GitHub Pages atua como servidor de arquivos estáticos, e toda a lógica é avaliada no cliente.

### 1.4 Diagrama de componentes

> **[Inserir imagem `diagramas/png/02-componentes.png`]**
>
> **Legenda sugerida:** Figura X — Diagrama de componentes da aplicação. A árvore parte do componente raiz `App` e ramifica para o `Layout` (responsável pelo cabeçalho, rodapé e área de conteúdo) e em seguida para as rotas e seus componentes especializados. As _stores_ Zustand são consumidas como dependências transversais.

A árvore de componentes é deliberadamente rasa. O `App` configura o roteador e o `Layout` provê a moldura comum (`Header`, `Footer`); cada rota carrega seus componentes específicos. Componentes interativos da Etapa 3 (`MontaCompasso`, `MetronomoInline`, `CompassoEstatico`) e o componente de quiz (`QuizPergunta`) constituem o núcleo de interatividade pedagógica.

---

## 2. Engenharia de software

### 2.1 Padrões aplicados

O projeto aplica padrões clássicos de engenharia de software adequados ao seu porte. A **arquitetura em camadas** separa apresentação, lógica e dados. O princípio de **separação de responsabilidades** é exercido pela componentização React, com cada componente concentrando uma única responsabilidade. O padrão de **fonte única de verdade** é materializado pelas _stores_ Zustand: qualquer componente que necessite consultar respostas de quiz ou preferências de UI lê do mesmo lugar, garantindo consistência. A configuração TypeScript em modo estrito (`strict: true`, `noUnusedLocals: true`, `noUnusedParameters: true`) impõe contratos explícitos em toda a base, capturando erros em tempo de compilação. Por fim, o **conteúdo declarativo** — etapas e atividades expressas como dados tipados — desacopla autoria pedagógica de código de renderização.

### 2.2 Decisões arquiteturais (ADRs)

As decisões arquiteturais relevantes foram registradas como ADRs curtos, listados no arquivo `docs/engenharia-software.md`. Sintetizam-se aqui as principais:

- **React + Vite em vez de Next.js**, porque a hospedagem em GitHub Pages exige _bundle_ estático, e o _Server-Side Rendering_ do Next.js não é executável neste ambiente.
- **`HashRouter` em vez de `BrowserRouter`**, evitando o _hack_ de duplicar o `index.html` como `404.html` para contornar a ausência de reescrita de rotas no GitHub Pages.
- **Zustand em vez de Redux ou Context API**, porque o escopo de estado global é pequeno (duas _stores_) e Zustand oferece API minimalista, persistência transparente e _re-rendering_ seletivo.
- **Conteúdo em JSON com `dangerouslySetInnerHTML`**, em vez de MDX, para preservar fidelidade ao conteúdo HTML original com tabelas Bootstrap e estilos inline.
- **Manutenção do Bootstrap 5**, porque o conteúdo migrado utiliza suas classes nativamente; substituí-lo exigiria reescrita extensiva sem ganho funcional.

### 2.3 Estrutura de diretórios

A organização de diretórios reflete o modelo em camadas. O diretório `src/components/` é subdividido por domínio (`atividade/`, `figura/`, `layout/`, `metronomo/`, `acessibilidade/`, `ui/`), e o diretório `src/content/` agrupa o conteúdo de cada etapa em subdiretórios próprios. Os nomes dos diretórios estão em português, alinhados ao vocabulário pedagógico do trabalho, simplificando a leitura por revisores não-técnicos.

### 2.4 Casos de uso

> **[Inserir imagem `diagramas/png/03-casos-de-uso.png`]**
>
> **Legenda sugerida:** Figura X — Diagrama de casos de uso. No escopo defendido, o único ator humano é o aluno, que interage diretamente com o sistema sem necessidade de autenticação. O ator Professor está catalogado entre as melhorias futuras, dependendo da introdução de _backend_.

O sistema atende a sete casos de uso principais, todos acessíveis pelo Aluno: selecionar uma etapa (UC-01), navegar pelas páginas conceituais (UC-02), realizar uma atividade de quiz (UC-03), visualizar o resultado da atividade (UC-04), utilizar o metrônomo visual em modo _standalone_ (UC-05), ajustar parâmetros de acessibilidade — tema e zoom (UC-06) — e construir um compasso interativo na Etapa 3 (UC-07). A descrição completa de cada caso, com pré-condições, fluxo principal, fluxos alternativos e pós-condições, está em `docs/casos-de-uso.md`.

### 2.5 Diagrama de sequência: realizar atividade

> **[Inserir imagem `diagramas/png/04-sequencia-quiz.png`]**
>
> **Legenda sugerida:** Figura X — Diagrama de sequência do caso de uso UC-03 (Realizar atividade). O componente `Atividades.tsx` busca as questões da etapa, renderiza-as via `QuizPergunta.tsx`, e a resposta do aluno é registrada na _store_ `useAtividadesStore`, que persiste em `localStorage`.

O diagrama acima evidencia a aplicação do princípio de fonte única de verdade: a resposta não é replicada em estado local de componente, mas armazenada na _store_ global, de onde a tela final lê para compor o relatório.

### 2.6 Diagrama de sequência: navegação por páginas

> **[Inserir imagem `diagramas/png/05-sequencia-navegacao.png`]**
>
> **Legenda sugerida:** Figura X — Diagrama de sequência da navegação entre páginas conceituais (UC-02). O componente `Etapa.tsx` consulta os metadados da etapa, recupera o HTML da página solicitada via função `getPagina`, resolve o placeholder de caminho base e renderiza o conteúdo. O `Layout` reseta o _scroll_ ao topo a cada mudança de rota.

A figura ilustra o mecanismo de placeholder `{{BASE}}`: o conteúdo armazenado nos arquivos JSON usa caminhos relativos abstratos para imagens, que são substituídos em tempo de execução pelo valor de `import.meta.env.BASE_URL`. Esse mecanismo permite que o mesmo _bundle_ funcione tanto em ambiente de desenvolvimento (servido em `/`) quanto em produção (servido em `/modulo-musicalizacao/`).

### 2.7 Fluxo de rotas

> **[Inserir imagem `diagramas/png/06-fluxo-rotas.png`]**
>
> **Legenda sugerida:** Figura X — Diagrama de estados das rotas da SPA. A partir da Home, o aluno acessa a tela de seleção e dela navega para uma etapa específica. As páginas de uma etapa avançam linearmente até as atividades; em seguida, o aluno pode prosseguir para a próxima etapa ou retornar à seleção.

O diagrama de estados foi derivado da configuração declarativa de rotas em `src/App.tsx`, em conjunto com a estrutura de páginas definida em `src/content/etapas.config.ts` (que lista as quatro etapas com seus respectivos totais de páginas).

---

## 3. Tecnologias utilizadas

### 3.1 Stack principal (React + Vite + TypeScript)

A combinação React, Vite e TypeScript foi escolhida pela maturidade do ecossistema, pela rapidez do ciclo de desenvolvimento e pela segurança que a tipagem estática oferece. O **Vite** atua tanto como servidor de desenvolvimento (com _Hot Module Replacement_ instantâneo) quanto como ferramenta de _build_ de produção (utilizando esbuild para transformação e Rollup para empacotamento). O **TypeScript** em modo estrito captura inconsistências de tipo antes da execução, e o **React 18** provê o modelo declarativo de componentes funcionais com _hooks_, suficiente para a complexidade do projeto.

### 3.2 Gerenciamento de estado (Zustand)

O estado global é mantido em duas _stores_ implementadas com **Zustand**: `useAtividadesStore` (respostas dos quizzes) e `useUIStore` (preferências de tema e zoom). O middleware `persist` da biblioteca sincroniza automaticamente o conteúdo das _stores_ com o `localStorage` do navegador, sem código adicional. A escolha por Zustand em detrimento de Redux ou Context API é justificada pelo escopo restrito do estado global, que não compensaria o _boilerplate_ característico daquelas alternativas.

### 3.3 Estilização (Bootstrap + variáveis CSS / dark mode)

O sistema utiliza **Bootstrap 5** como framework de estilização base, complementado por uma camada de CSS customizado (`src/styles/theme.css`). O suporte a tema claro e escuro é implementado através do atributo `data-bs-theme` no elemento `<html>`, alternado pela _store_ de UI; variáveis CSS (`--text-primary`, `--surface-2`, `--etapa-cor`, entre outras) garantem coerência visual em ambos os modos. A paleta do tema escuro adota tons _slate_ azulados, escolhidos para reduzir cansaço visual em sessões longas.

### 3.4 Roteamento (React Router HashRouter)

O **React Router v6** é configurado com `HashRouter`, que codifica a rota corrente no fragmento da URL (`/#/etapa/1/pagina/3`). Essa escolha contorna a limitação do GitHub Pages, que não consegue reescrever URLs arbitrárias para o `index.html`. Com `HashRouter`, qualquer URL é resolvida no cliente sem suporte do servidor, eliminando a necessidade de soluções alternativas como o redirecionamento via página `404.html`.

### 3.5 Acessibilidade (VLibras, ARIA, controles de zoom)

A acessibilidade foi tratada como pilar central do projeto, dada a natureza do público-alvo. O widget **VLibras** é integrado para tradução em tempo real para a Língua Brasileira de Sinais. Os controles de zoom (variando entre 70% e 180%) atuam sobre o `font-size` do elemento `<html>`, garantindo que toda a tipografia em unidades `rem` — incluindo o conteúdo legacy renderizado via `dangerouslySetInnerHTML` — escale consistentemente em qualquer dispositivo. O sistema implementa _scroll restoration_ manual (não fornecido pelo React Router v6 por padrão) para evitar que páginas abram em posições intermediárias em dispositivos móveis. Atributos ARIA (`aria-live`, `aria-label`, `aria-current`) são aplicados em controles e contêineres dinâmicos, e a regra de lint `eslint-plugin-jsx-a11y` impõe verificações automáticas de acessibilidade durante o desenvolvimento.

---

## 4. Testes

### 4.1 Estratégia de testes unitários

A estratégia de testes adotada concentra-se na cobertura das **camadas de conteúdo e lógica de negócio**, isto é, partes do sistema cujo comportamento incorreto comprometeria silenciosamente a experiência educacional. São testadas: a integridade do conteúdo declarativo das atividades (cada quiz tem uma resposta correta listada nas opções, e os identificadores são globalmente únicos); a lógica de carregamento das páginas conceituais (a função `getPagina` retorna o conteúdo esperado e a função `resolverBase` substitui corretamente o placeholder de caminho); a _store_ de respostas (registro, sobrescrita e reinicialização funcionam como especificado); e o componente `QuizPergunta` (interação de seleção, identificação de acertos e erros, transição para modo de leitura após resposta).

### 4.2 Ferramentas (Vitest + Testing Library + jsdom)

A ferramenta de execução é o **Vitest**, escolhida por compartilhar o pipeline de transformação do Vite (mesma configuração de TypeScript e JSX, sem necessidade de Babel separado). A **React Testing Library** orienta os testes a interagir com os componentes do mesmo modo que um usuário (consultando elementos por _role_, _label_ ou texto visível), o que torna a suíte resiliente a refatorações internas. A biblioteca **@testing-library/jest-dom** fornece _matchers_ semânticos (`toBeInTheDocument`, `toBeDisabled`), e **jsdom** provê uma implementação de DOM em Node.js, permitindo executar a suíte sem navegador.

### 4.3 Cobertura atual

A suíte atual é composta por **15 casos de teste** distribuídos em quatro arquivos no diretório `tests/unit/`. A execução completa leva aproximadamente quatro segundos. A cobertura é alta nas áreas de conteúdo e na _store_ de atividades; é parcial ou nula em componentes que dependem da Web Audio API (cuja simulação em jsdom seria frágil) e no _hook_ de acessibilidade (cuja validação adequada ocorre em testes de ponta a ponta, atualmente catalogados entre as melhorias futuras).

---

## 5. Hospedagem e CI/CD

### 5.1 GitHub Pages como plataforma estática

A aplicação é hospedada no **GitHub Pages**, serviço gratuito de hospedagem estática integrado ao GitHub. O serviço atende plenamente os requisitos da aplicação: serve arquivos estáticos com HTTPS automático, é distribuído por CDN e não exige configuração adicional além do _workflow_ de publicação. O custo operacional é nulo dentro dos limites do plano gratuito, o que é compatível com o caráter educacional e público do trabalho. A limitação inerente à plataforma — ausência de _runtime_ servidor — é o que motiva enquadrar funcionalidades dependentes de _backend_ (autenticação, dashboard de professor, analytics) como melhorias futuras.

### 5.2 Pipeline GitHub Actions

> **[Inserir imagem `diagramas/png/07-pipeline-cicd.png`]**
>
> **Legenda sugerida:** Figura X — Pipeline de integração contínua e implantação contínua, definido em `.github/workflows/deploy.yml`. Cada `push` para a branch principal dispara a sequência de validação e publicação automatizada.

O pipeline é definido no arquivo `.github/workflows/deploy.yml` e estruturado em dois _jobs_ encadeados. O primeiro (`build`) executa a sequência: _checkout_ do código, instalação do Node.js 20 com cache do registro npm, instalação reprodutível de dependências (`npm ci`), análise estática (`npm run lint`), verificação de tipos (`npm run typecheck`), execução da suíte de testes unitários (`npm run test`) e, finalmente, geração do _bundle_ de produção (`npm run build`) com a variável `VITE_BASE` definida para o subcaminho do GitHub Pages. O artefato resultante (diretório `dist/`) é enviado ao GitHub via `actions/upload-pages-artifact`. O segundo _job_ (`deploy`) consome esse artefato e o publica utilizando `actions/deploy-pages`, com permissões mínimas e suporte a OIDC.

### 5.3 Gates de qualidade automatizados

O pipeline funciona como uma rede de proteção contra regressões: nenhum código com erro de _lint_, erro de tipo ou teste com falha alcança o usuário final. O comando de _lint_ é executado com a opção `--max-warnings 0`, de modo que mesmo avisos (incluindo violações de regras de acessibilidade impostas pelo `eslint-plugin-jsx-a11y`) bloqueiam o _deploy_. Essa configuração transforma a branch `main` em fonte única de verdade: o que está nela está em produção e passou pelos gates de qualidade.

---

## 6. Possíveis melhorias futuras

As melhorias listadas a seguir foram catalogadas durante o desenvolvimento e ficaram conscientemente fora do escopo defendido. Estão descritas com detalhamento em `docs/melhorias-futuras.md`.

### 6.1 Backend com Supabase (autenticação e progresso por aluno)

Atualmente a persistência de progresso e respostas dos quizzes ocorre exclusivamente em `localStorage`, o que impede continuidade entre dispositivos e acompanhamento por terceiros. A introdução do **Supabase** (BaaS baseado em PostgreSQL) é o caminho natural de evolução: forneceria autenticação (e-mail/senha e OAuth Google), tabelas relacionais para perfis, progresso e respostas, e _Row Level Security_ para isolar dados por usuário. A camada de serviços a ser introduzida em `src/services/` encapsularia o cliente `supabase-js`, e os componentes existentes passariam a consumi-la via _hooks_, sem alteração no consumidor.

### 6.2 Dashboard do professor

Uma vez implementado o _backend_, torna-se viável adicionar um perfil de **Professor** capaz de criar turmas, gerar códigos de convite e acompanhar o progresso individual e agregado dos alunos. As tabelas adicionais incluiriam `turmas` (vinculada ao professor por meio de chave estrangeira) e estendiam-se as políticas RLS para conceder ao professor acesso de leitura ao progresso dos alunos da própria turma. Componentes gráficos para visualização de séries temporais (utilizando bibliotecas como **recharts**) seriam introduzidos em rotas protegidas por _role_.

### 6.3 Analytics anônimo de uso

Para subsidiar evoluções pedagógicas, planeja-se a coleta de eventos anônimos de uso (visualização de página, início e conclusão de atividade, uso do metrônomo) com identificador de sessão gerado no navegador. Os eventos seriam armazenados em uma tabela `eventos`, cuja análise agregada permitiria identificar páginas mais e menos acessadas, taxa de conclusão por etapa e tempo médio por atividade. A abordagem dispensa coleta de dados pessoais identificáveis.

### 6.4 Testes E2E com Playwright

A cobertura atual de testes é exclusivamente unitária. A próxima evolução natural é a introdução de **testes de ponta a ponta** com a ferramenta **Playwright**, executando o fluxo completo do aluno (acesso à Home, navegação até uma etapa, conclusão das páginas, realização do quiz e verificação da tela final) em navegadores reais (Chromium, Firefox, WebKit). Esses testes complementariam a suíte unitária, capturando regressões em interação, roteamento e renderização que escapam aos testes em ambiente jsdom.

### 6.5 Conteúdo da Etapa 5

A configuração do sistema (`src/content/etapas.config.ts`) hoje declara quatro etapas. O plano original previa uma quinta etapa, cujo conteúdo pedagógico ainda não foi finalizado pelo autor do trabalho. A inclusão futura é trivial do ponto de vista de engenharia: basta adicionar uma entrada na configuração e um arquivo `paginas.json` correspondente no diretório `src/content/etapa5/`; o componente genérico de etapa renderizará o novo conteúdo sem alterações.

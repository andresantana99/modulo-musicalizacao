# Tecnologias Utilizadas

## Visão geral

A stack é deliberadamente minimalista: cada dependência tem função única e justificável. O `package.json` pós-limpeza contém **5 dependências de runtime** e **18 de desenvolvimento**, todas listadas e justificadas abaixo.

A escolha geral favorece **ferramentas modernas com zero/baixa configuração** (Vite, Vitest, Zustand) em vez de soluções clássicas com mais cerimônia (Webpack, Jest, Redux).

---

## Runtime (`dependencies`)

| Pacote | Versão | Finalidade |
|---|---|---|
| **react** | ^18.3.1 | Biblioteca de UI declarativa. Modelo de componentes funcionais com hooks. |
| **react-dom** | ^18.3.1 | _Renderer_ React para o DOM do navegador. |
| **react-router-dom** | ^6.26.0 | Roteamento client-side. Usado com `HashRouter` (compatível com GitHub Pages). |
| **zustand** | ^4.5.5 | Gerenciamento de estado global. Usado com middleware `persist` para sincronização automática com `localStorage`. |
| **bootstrap** | ^5.3.3 | Framework CSS. Provê grid, classes utilitárias e tema light/dark via `data-bs-theme`. Necessário porque o conteúdo pedagógico legacy usa classes Bootstrap inline. |

---

## Desenvolvimento (`devDependencies`)

### Build e linguagem

| Pacote | Versão | Finalidade |
|---|---|---|
| **vite** | ^5.4.3 | Build tool e servidor de desenvolvimento. Usa esbuild para transformação rápida e Rollup para empacotar produção. |
| **@vitejs/plugin-react** | ^4.3.1 | Plugin Vite para React (Fast Refresh, transformação JSX). |
| **typescript** | ^5.5.4 | Compilador TypeScript. Configurado com `strict` mode em [`tsconfig.json`](../tsconfig.json). |
| **@types/react** / **@types/react-dom** | ^18.3.x | Tipos TypeScript para React/DOM. |

### Testes

| Pacote | Versão | Finalidade |
|---|---|---|
| **vitest** | ^2.0.5 | Test runner. Compatível com a API do Jest mas roda direto sobre o pipeline do Vite (mesma transformação, sem Babel separado). |
| **@testing-library/react** | ^16.0.1 | Renderização e _querying_ de componentes React em testes, focado em comportamento do usuário. |
| **@testing-library/jest-dom** | ^6.5.0 | Matchers semânticos para DOM (`toBeInTheDocument`, `toBeDisabled`, etc.). |
| **jsdom** | ^25.0.0 | Implementação de DOM em Node.js — necessária para testes que usam `document` sem navegador. |

### Qualidade de código

| Pacote | Versão | Finalidade |
|---|---|---|
| **eslint** | ^8.57.0 | Linter. Configurado em [`.eslintrc.cjs`](../.eslintrc.cjs). |
| **@typescript-eslint/parser** | ^8.5.0 | Parser ESLint para TypeScript. |
| **@typescript-eslint/eslint-plugin** | ^8.5.0 | Regras ESLint específicas de TypeScript. |
| **eslint-plugin-react** | ^7.35.2 | Regras para React (validação de JSX, hooks). |
| **eslint-plugin-react-hooks** | ^4.6.2 | Regras das _Rules of Hooks_ (dependências de `useEffect`, ordem de chamadas). |
| **eslint-plugin-react-refresh** | ^0.4.12 | Avisos para componentes incompatíveis com Fast Refresh. |
| **eslint-plugin-jsx-a11y** | ^6.10.0 | Regras de acessibilidade em JSX (alt em imagens, roles ARIA, foco). Importante dado o público-alvo. |
| **eslint-config-prettier** | ^9.1.0 | Desativa regras de ESLint que conflitariam com o Prettier. |
| **prettier** | ^3.3.3 | Formatador automático. Configuração em [`.prettierrc`](../.prettierrc). |

---

## Configurações principais

### TypeScript ([`tsconfig.json`](../tsconfig.json))

- `target: ES2022`
- `strict: true` — todos os _strict checks_ (incluindo `strictNullChecks`, `noImplicitAny`)
- `noUnusedLocals: true`, `noUnusedParameters: true` — pega código morto na compilação
- Path alias `@/*` → `src/*`

### ESLint ([`.eslintrc.cjs`](../.eslintrc.cjs))

Configuração combinando:
- `eslint:recommended`
- `@typescript-eslint/recommended`
- `react/recommended` + `react/jsx-runtime` (sem `import React`)
- `react-hooks/recommended`
- `jsx-a11y/recommended`
- `prettier` (último — desativa conflitos)

Regra adicional: `--max-warnings 0` no script `lint` — qualquer warning quebra o CI.

### Prettier ([`.prettierrc`](../.prettierrc))

- Aspas simples
- Trailing commas em tudo
- Largura 100 colunas
- 2 espaços de indentação

### Vite ([`vite.config.ts`](../vite.config.ts))

- `base` configurável via env `VITE_BASE` (default `/modulo-musicalizacao/` para GitHub Pages)
- Path alias `@/` → `src/`
- Configuração do Vitest embutida (jsdom, setup file)

---

## Tecnologias do navegador (sem dependência npm)

Algumas funcionalidades usam APIs nativas do navegador, sem biblioteca:

- **Web Audio API (`AudioContext`)** — clock preciso para o metrônomo e MontaCompasso. Mais confiável que `setInterval` (não sofre _drift_).
- **`requestAnimationFrame`** — sincronização visual com o áudio usando o mesmo clock (`ctx.currentTime`).
- **`localStorage`** — persistência client-side (acessada via Zustand `persist`).
- **CSS Variables** — paleta light/dark e cores por etapa (`--etapa-cor`).
- **VLibras Widget** — script externo carregado da VLibras (acessibilidade LIBRAS).

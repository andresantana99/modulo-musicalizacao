# Testes Automatizados

## Filosofia

A suíte de testes cobre as **camadas de conteúdo e lógica de negócio** — as partes do sistema cujo comportamento incorreto silenciosamente quebraria a experiência educacional. Especificamente:

- **Integridade do seed pedagógico** — toda atividade de quiz tem uma resposta correta listada nas opções; IDs são únicos.
- **Lógica de carregamento de páginas** — `getPagina` retorna o conteúdo certo; `resolverBase` substitui o placeholder corretamente.
- **Comportamento da store de atividades** — registro, sobrescrita, reset funcionam como esperado.
- **Renderização e interação do quiz** — botão correto fica desabilitado até seleção, acertos e erros são reportados.

Áreas **não cobertas** por testes (por design no escopo atual):

- Componentes interativos com áudio (`MontaCompasso`, `MetronomoVisual`) — testar `AudioContext` em jsdom requer mocks frágeis e benefício marginal; validação visual no preview cobre essas funcionalidades.
- `useAcessibilidade` — efeitos colaterais em `document.documentElement`; cobertura via E2E é mais apropriada (ver [`melhorias-futuras.md`](melhorias-futuras.md)).

---

## Ferramentas

| Ferramenta | Função |
|---|---|
| **Vitest** | Test runner. Compartilha pipeline com o Vite (mesma transformação TS/JSX), zero configuração extra. |
| **@testing-library/react** | API para renderizar componentes e fazer queries semanticamente (por _role_, _label_, texto). |
| **@testing-library/jest-dom** | Matchers do tipo `toBeInTheDocument`, `toBeDisabled` — tornam asserções legíveis. |
| **jsdom** | Implementação DOM em Node.js usada como `environment` do Vitest. |

A configuração do Vitest está em [`vite.config.ts`](../vite.config.ts):

```ts
test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: ['./tests/setup.ts'],
  css: false,
}
```

O arquivo [`tests/setup.ts`](../tests/setup.ts) apenas importa `@testing-library/jest-dom/vitest` para registrar os matchers globalmente.

---

## Inventário dos testes

A suíte tem **15 casos de teste** distribuídos em 4 arquivos. Toda a suíte roda em ~4 segundos.

### [`tests/unit/paginas.test.ts`](../tests/unit/paginas.test.ts) — 5 casos

Função `getPagina(etapa, pagina)`:
- retorna `undefined` para etapa inválida
- retorna `undefined` para página fora do range
- retorna conteúdo HTML válido para etapa 1 página 1

Função `resolverBase(html, base)`:
- substitui `{{BASE}}` pelo valor passado
- preserva HTML sem placeholder

### [`tests/unit/atividades.test.ts`](../tests/unit/atividades.test.ts) — 3 casos

Validação do seed declarativo em [`src/content/atividades.ts`](../src/content/atividades.ts):
- retorna array vazio para etapa sem atividades (e.g., Etapa 4)
- a opção marcada como correta existe no array de opções (em todas as atividades)
- IDs de atividade são globalmente únicos

### [`tests/unit/atividadesStore.test.ts`](../tests/unit/atividadesStore.test.ts) — 3 casos

Store Zustand:
- `registrar` adiciona resposta nova
- `registrar` sobrescreve resposta anterior do mesmo `atividadeId`
- `resetEtapa` remove apenas as respostas dos IDs passados, preservando outras

### [`tests/unit/QuizPergunta.test.tsx`](../tests/unit/QuizPergunta.test.tsx) — 4 casos

Componente `QuizPergunta`:
- botão "Confirmar" desabilitado até o aluno selecionar uma opção
- ao acertar, dispara callback com `acertou=true`
- ao errar, dispara callback com `acertou=false`
- após responder, entra em "modo leitura" (opções não editáveis)

---

## Como rodar

```bash
npm run test              # roda toda a suíte uma vez
npm run test:watch        # modo watch (re-roda ao salvar)
```

A suíte é executada automaticamente no CI ([`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml)) **antes** de qualquer build. Se algum teste falhar, o deploy não acontece.

---

## Cobertura atual

A cobertura está focada na **lógica determinística e na camada de conteúdo**. Estimativa qualitativa:

| Área | Cobertura |
|---|---|
| `src/content/` (paginas, atividades) | Alta |
| `src/stores/atividadesStore` | Alta |
| `src/components/atividade/QuizPergunta` | Alta |
| Demais componentes (Etapa, Layout, Header, etc.) | Indireta (typecheck + smoke manual) |
| Hooks (`useAcessibilidade`) | Não coberta |
| Componentes com `AudioContext` | Não coberta |

A próxima evolução natural — **testes E2E com Playwright** para o fluxo aluno completo — está descrita em [`melhorias-futuras.md`](melhorias-futuras.md).

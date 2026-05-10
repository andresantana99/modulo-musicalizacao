# Melhorias Futuras

Os itens abaixo foram **conscientemente adiados** para depois da defesa do TCC. Cada um está catalogado com escopo, motivação e arquitetura proposta para servir de roteiro de continuação do trabalho.

A ordem reflete prioridade prática: 1 e 2 desbloqueiam 3; 4 é independente; 5 depende do autor.

---

## 1. Backend com Supabase (autenticação + progresso por aluno)

> **Origem:** Semana 4 do plano original.

### Motivação

Atualmente o progresso (respostas dos quizzes, preferências de UI) vive apenas em `localStorage` — não atravessa dispositivos nem permite acompanhamento por terceiros. Para uso em sala de aula real, o aluno precisa de identidade persistente.

### Arquitetura proposta

- **BaaS:** Supabase (Postgres + Auth + Realtime).
- **Auth:** e-mail/senha + Google OAuth.
- **Tabelas iniciais:**

```sql
create table users_profile (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text not null,
  tipo text not null check (tipo in ('aluno','professor')),
  turma_id uuid references turmas(id),
  criado_em timestamptz default now()
);

create table progresso (
  id uuid primary key default gen_random_uuid(),
  aluno_id uuid references users_profile(id) on delete cascade,
  etapa int not null,
  pagina_atual int not null default 1,
  concluida boolean default false,
  atualizado_em timestamptz default now(),
  unique(aluno_id, etapa)
);

create table respostas (
  id uuid primary key default gen_random_uuid(),
  aluno_id uuid references users_profile(id) on delete cascade,
  atividade_id text not null,
  opcao_escolhida text not null,
  acertou boolean,
  respondido_em timestamptz default now()
);
```

- **Row Level Security (RLS):** aluno só lê/escreve registros onde `aluno_id = auth.uid()`.
- **Camada nova em `src/services/`:** `authService`, `progressService`, `activityService` — encapsulam o `supabase-js`. Os componentes existentes consumem essas serviços via hooks (`useAuth`, `useProgresso`); o restante da aplicação não muda.
- **Modo offline:** mantém `localStorage` como cache de fallback; sincronização em background quando online.

### Esforço estimado

~2 semanas (criação do projeto, migrações SQL, services, telas de Login/Cadastro/Perfil, RLS).

---

## 2. Dashboard do Professor

> **Origem:** Semana 7 do plano original. Depende de (1).

### Motivação

Permitir que o professor crie turmas, distribua o link aos alunos e acompanhe progresso individual e agregado.

### Arquitetura proposta

Tabelas adicionais:

```sql
create table turmas (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  professor_id uuid references users_profile(id),
  codigo_convite text unique
);
```

Rotas novas (protegidas por role `professor`):
- `/professor/turmas` — listar turmas, gerar código de convite
- `/professor/turma/:id` — visão agregada da turma (médias, distribuição de acertos)
- `/professor/aluno/:id` — progresso individual (gráfico por etapa, tempo médio por atividade)

Bibliotecas adicionais sugeridas:
- `recharts` ou `visx` para gráficos
- `@dnd-kit` se introduzir atividades de ordenação

### Esforço estimado

~1,5 semana após (1).

---

## 3. Analytics anônimo de uso

> **Origem:** Semana 8 do plano original.

### Motivação

Entender padrões de uso (páginas mais vistas, tempo médio por etapa, taxa de abandono) para orientar evoluções pedagógicas. Sem PII — apenas métricas agregadas.

### Arquitetura proposta

```sql
create table eventos (
  id bigserial primary key,
  sessao_id uuid not null,        -- gerado no browser, vive em sessionStorage
  aluno_id uuid,                  -- opcional, só se logado
  tipo text not null,             -- 'pagina_vista', 'atividade_iniciada', 'atividade_concluida', 'metronomo_usado'
  payload jsonb,
  criado_em timestamptz default now()
);
```

- `analyticsService.track(tipo, payload)` — fire-and-forget, batched para reduzir requests.
- Tela `/analytics` (acesso restrito) com heatmap de páginas mais vistas e funil de progresso.

### Esforço estimado

~1 semana após (1).

---

## 4. Testes E2E com Playwright

> **Origem:** Semana 9 do plano original (parcialmente entregue — apenas unitários foram feitos).

### Motivação

A suíte unitária cobre lógica determinística mas não valida o sistema **integralmente** do ponto de vista do aluno. Um teste E2E executando o fluxo completo (Home → Etapa → Atividade → Resultado) detecta regressões em interação, roteamento e renderização que escapam aos unitários.

### Arquitetura proposta

- Reintroduzir `@playwright/test` em devDeps.
- Criar `playwright.config.ts` com targets para Chromium, Firefox e Webkit.
- Suíte mínima em `tests/e2e/`:
  - `aluno-completa-etapa-1.spec.ts` — navega da Home, completa as 19 páginas da Etapa 1, responde quiz, vê tela final.
  - `metronomo.spec.ts` — abre `/metronomo`, ajusta BPM, valida que indicadores visuais aparecem.
  - `acessibilidade.spec.ts` — alterna dark mode, aumenta zoom, verifica que preferências persistem em reload.
- Adicionar `npm run test:e2e` ao pipeline GitHub Actions (etapa após `npm run test`).

### Esforço estimado

~3 dias.

### Por que foi removido por enquanto

A dependência foi instalada mas nunca configurada/executada — manter dependência sem uso violava o princípio de "remover o que não é usado". A reintrodução será deliberada, com configuração e testes no mesmo commit.

---

## 5. Conteúdo da Etapa 5

A configuração em [`src/content/etapas.config.ts`](../src/content/etapas.config.ts) atualmente lista 4 etapas. O plano original previa uma quinta etapa, mas o conteúdo pedagógico não foi finalizado pelo autor do TCC.

Quando o conteúdo estiver disponível:

1. Adicionar uma 5ª entrada em `etapas.config.ts` com `numero: 5`, `titulo`, `cor`, `totalPaginas`, `icone`.
2. Criar `src/content/etapa5/paginas.json` com `[{pagina, html}]`.
3. Atualizar `src/content/paginas.ts` para incluir o novo arquivo no mapa.
4. Opcionalmente, adicionar quizzes em `src/content/atividades.ts` sob a chave `5`.

Nenhuma alteração em código de UI é necessária — a rota `Etapa.tsx` é genérica.

-- Módulo de Musicalização — migração inicial
-- Executar via `supabase db push` ou no SQL Editor do painel Supabase.

-- ─── Tabelas ────────────────────────────────────────────────────────────
create table if not exists turmas (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  professor_id uuid,
  codigo_convite text unique,
  criado_em timestamptz default now()
);

create table if not exists users_profile (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text not null,
  tipo text not null check (tipo in ('aluno','professor')),
  turma_id uuid references turmas(id) on delete set null,
  criado_em timestamptz default now()
);

alter table turmas
  add constraint turmas_professor_fk
  foreign key (professor_id) references users_profile(id) on delete set null;

create table if not exists progresso (
  id uuid primary key default gen_random_uuid(),
  aluno_id uuid not null references users_profile(id) on delete cascade,
  etapa int not null,
  pagina_atual int not null default 1,
  concluida boolean not null default false,
  atualizado_em timestamptz default now(),
  unique(aluno_id, etapa)
);

create table if not exists atividades (
  id uuid primary key default gen_random_uuid(),
  etapa int not null,
  ordem int not null,
  tipo text not null check (tipo in ('multipla-escolha','ordenar-ritmo','identificar-cor')),
  enunciado text not null,
  payload jsonb not null default '{}'::jsonb,
  criado_em timestamptz default now(),
  unique(etapa, ordem)
);

create table if not exists respostas (
  id uuid primary key default gen_random_uuid(),
  aluno_id uuid not null references users_profile(id) on delete cascade,
  atividade_id uuid not null references atividades(id) on delete cascade,
  resposta jsonb not null,
  acertou boolean not null,
  tempo_ms int,
  respondido_em timestamptz default now()
);

create table if not exists eventos (
  id bigserial primary key,
  sessao_id uuid,
  aluno_id uuid references users_profile(id) on delete set null,
  tipo text not null,
  payload jsonb default '{}'::jsonb,
  criado_em timestamptz default now()
);

-- ─── Row Level Security ─────────────────────────────────────────────────
alter table users_profile enable row level security;
alter table turmas        enable row level security;
alter table progresso     enable row level security;
alter table atividades    enable row level security;
alter table respostas     enable row level security;
alter table eventos       enable row level security;

create policy "aluno_le_proprio_perfil" on users_profile
  for select using (id = auth.uid());

create policy "aluno_escreve_proprio_perfil" on users_profile
  for update using (id = auth.uid());

create policy "aluno_le_proprio_progresso" on progresso
  for select using (aluno_id = auth.uid());

create policy "aluno_escreve_proprio_progresso" on progresso
  for all using (aluno_id = auth.uid()) with check (aluno_id = auth.uid());

create policy "atividades_leitura_autenticados" on atividades
  for select using (auth.role() = 'authenticated');

create policy "aluno_envia_respostas" on respostas
  for insert with check (aluno_id = auth.uid());

create policy "aluno_le_proprias_respostas" on respostas
  for select using (aluno_id = auth.uid());

create policy "eventos_insert_anonimo" on eventos
  for insert with check (true);

-- Professor vê alunos da própria turma
create policy "professor_le_progresso_turma" on progresso
  for select using (
    exists (
      select 1 from users_profile p
      join users_profile a on a.turma_id = p.turma_id
      where p.id = auth.uid() and p.tipo = 'professor' and a.id = progresso.aluno_id
    )
  );

# Modelo de Dados

> **Status:** rascunho (Semana 1). SQL oficial em `supabase/migrations/`.

## Entidades

```mermaid
erDiagram
  users_profile ||--o{ progresso : possui
  users_profile ||--o{ respostas : envia
  users_profile }o--|| turmas : pertence
  turmas ||--o{ users_profile : contem
  atividades ||--o{ respostas : gera
  atividades }o--|| etapas : pertence_a

  users_profile {
    uuid id PK
    text nome
    text tipo "aluno|professor"
    uuid turma_id FK
  }
  turmas {
    uuid id PK
    text nome
    uuid professor_id FK
    text codigo_convite
  }
  progresso {
    uuid id PK
    uuid aluno_id FK
    int etapa
    int pagina_atual
    bool concluida
  }
  atividades {
    uuid id PK
    int etapa
    int ordem
    text tipo
    jsonb payload
  }
  respostas {
    uuid id PK
    uuid aluno_id FK
    uuid atividade_id FK
    jsonb resposta
    bool acertou
    int tempo_ms
  }
  eventos {
    bigint id PK
    uuid sessao_id
    text tipo
    jsonb payload
  }
```

## Políticas RLS (resumo)

- `progresso`: aluno lê/escreve apenas com `aluno_id = auth.uid()`; professor lê se `aluno` pertence à sua turma.
- `respostas`: idem.
- `atividades`: leitura pública autenticada; escrita apenas via service role.
- `eventos`: inserção anônima permitida; leitura apenas service role.

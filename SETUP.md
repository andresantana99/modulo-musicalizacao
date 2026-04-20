# Setup local (Windows)

## 1. Node.js

Este projeto usa **Node 20+**. Se ainda não tem Node instalado:

- **Opção A — instalador oficial:** https://nodejs.org/en/download/prebuilt-installer
- **Opção B — portable (sem admin):** baixar o zip de https://nodejs.org/dist/v20.18.0/node-v20.18.0-win-x64.zip, extrair em `C:\Users\<seu-user>\nodejs\` e adicionar a pasta ao PATH:

  ```powershell
  [Environment]::SetEnvironmentVariable(
    "Path",
    $env:Path + ";C:\Users\$env:USERNAME\nodejs\node-v20.18.0-win-x64",
    "User"
  )
  ```

  (Feche e reabra o terminal depois.)

## 2. Dependências

```bash
npm install
```

## 3. Rodar em dev

```bash
npm run dev
```

Abre em `http://localhost:5173`.

## 4. Supabase (quando chegar a hora — Semana 4)

1. Criar projeto em https://supabase.com
2. Copiar URL + anon key no painel Settings → API
3. Criar `.env.local` baseado em `.env.example`:
   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```
4. Rodar a migração `supabase/migrations/0001_init.sql` no SQL Editor do painel.

## 5. Deploy (GitHub Pages)

O workflow `.github/workflows/deploy.yml` faz deploy automático ao push em `main`.

Pré-requisitos no repositório:
- Settings → Pages → Source: **GitHub Actions**
- Settings → Secrets and variables → Actions → adicionar `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`

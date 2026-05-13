# Setup local

Instruções para preparar o ambiente de desenvolvimento. Para visão geral do projeto, ver [`README.md`](README.md).

## 1. Node.js (versão 20 ou superior)

Este projeto exige **Node 20+** e **npm 10+** (versões declaradas em `package.json`, campo `engines`).

### Opção A — Instalador oficial

Baixar e instalar a versão LTS em https://nodejs.org/en/download/prebuilt-installer.

### Opção B — Portable (Windows, sem privilégios de administrador)

1. Baixar o zip de https://nodejs.org/dist/v20.18.0/node-v20.18.0-win-x64.zip
2. Extrair em `C:\Users\<seu-user>\nodejs\`
3. Adicionar a pasta ao PATH (PowerShell):

   ```powershell
   [Environment]::SetEnvironmentVariable(
     "Path",
     $env:Path + ";C:\Users\$env:USERNAME\nodejs\node-v20.18.0-win-x64",
     "User"
   )
   ```

4. Fechar e reabrir o terminal.

Verificar a instalação:

```bash
node -v   # deve ser ≥ v20
npm -v    # deve ser ≥ 10
```

## 2. Instalar dependências

Na raiz do projeto:

```bash
npm install
```

A instalação cria a pasta `node_modules/` e respeita as versões exatas registradas em `package-lock.json` quando executado com `npm ci` (modo usado pelo CI).

## 3. Variáveis de ambiente

O projeto usa apenas uma variável, opcional em desenvolvimento:

- `VITE_BASE` — caminho público do _bundle_. Em dev, não definir (Vite usa `/`). Em produção, o pipeline define `/modulo-musicalizacao/`.

O arquivo [`.env.example`](./.env.example) contém o exemplo. Para customizar localmente, criar `.env.local` (já ignorado pelo Git).

## 4. Rodar em modo desenvolvimento

```bash
npm run dev
```

O servidor abre em `http://localhost:5173`. O _Hot Module Replacement_ recarrega componentes ao salvar.

## 5. Pré-visualizar build de produção

```bash
npm run build      # gera dist/
npm run preview    # serve dist/ em http://localhost:4173/modulo-musicalizacao/
```

O caminho de produção inclui `/modulo-musicalizacao/` para simular o GitHub Pages.

## 6. Rodar verificações localmente (espelha o CI)

Para reproduzir exatamente o que o pipeline GitHub Actions executa antes de publicar:

```bash
npm ci             # instalação reprodutível
npm run lint       # ESLint (--max-warnings 0)
npm run typecheck  # tsc --noEmit
npm run test       # 15 testes unitários Vitest
npm run build      # bundle de produção
```

Cada comando deve terminar com exit code 0. Falha em qualquer um bloquearia o deploy.

## 7. Deploy

O workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) faz deploy automático a cada `push` na branch `main`. Não há ação manual — basta dar push.

Configuração única no repositório:
- **Settings → Pages → Source:** GitHub Actions

Não há _secrets_ a configurar. O sistema não depende de variáveis sensíveis em produção.

## Problemas comuns

**`npm run dev` reclama de porta ocupada.** Outro processo está usando 5173 — fechar o outro servidor ou rodar `npm run dev -- --port 5174`.

**Imagens aparecem quebradas em `npm run preview`.** O preview serve em `/modulo-musicalizacao/`. Confirmar que a URL no navegador inclui esse caminho.

**`npm run lint` falha por warning.** O CI bloqueia em qualquer warning. Rodar `npm run format` para corrigir formatação automaticamente; demais warnings exigem ajuste manual.

**TypeScript reclama de tipos faltando após editar JSON em `src/content/`.** Reiniciar o servidor TS do VS Code (Ctrl+Shift+P → "TypeScript: Restart TS server").

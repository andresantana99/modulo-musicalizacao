# Documentação — Módulo de Musicalização para Surdos

Esta pasta contém a documentação técnica do sistema, escrita para servir como base do trabalho de TCC e como referência para quem for evoluir o projeto.

## Ordem de leitura sugerida

1. **[Arquitetura](arquitetura.md)** — visão geral, camadas, roteamento, persistência, acessibilidade.
2. **[Engenharia de Software](engenharia-software.md)** — padrões, estrutura de diretórios, ADRs, estratégia de migração.
3. **[Casos de Uso](casos-de-uso.md)** — atores e fluxos do sistema do ponto de vista do aluno.
4. **[Tecnologias](tecnologias.md)** — todas as dependências runtime/dev e suas finalidades.
5. **[Testes](testes.md)** — filosofia, ferramentas e inventário da suíte unitária.
6. **[Hospedagem e CI/CD](hospedagem.md)** — GitHub Pages e pipeline GitHub Actions.
7. **[Melhorias Futuras](melhorias-futuras.md)** — funcionalidades adiadas com escopo proposto.

## Para o TCC

O arquivo **[`tcc-texto.md`](tcc-texto.md)** consolida o conteúdo das seções acima em texto técnico-acadêmico contínuo, pronto para colar no documento final. Cada seção referencia as imagens correspondentes em `diagramas/png/`.

## Diagramas

A pasta [`diagramas/`](diagramas/) contém:

- `src/*.mmd` — fontes editáveis em [Mermaid](https://mermaid.js.org/) (renderizam no GitHub).
- `png/*.png` — versões renderizadas para uso direto no documento do TCC.

Para regenerar os PNGs após editar uma fonte:

```bash
# Em PowerShell (Windows):
$diagrams = Get-ChildItem "docs\diagramas\src\*.mmd"
foreach ($d in $diagrams) {
  $out = "docs\diagramas\png\" + $d.BaseName + ".png"
  npx --yes -p @mermaid-js/mermaid-cli mmdc -i $d.FullName -o $out -t neutral -b white -w 1600
}
```

```bash
# Em Bash:
for f in docs/diagramas/src/*.mmd; do
  out="docs/diagramas/png/$(basename "$f" .mmd).png"
  npx --yes -p @mermaid-js/mermaid-cli mmdc -i "$f" -o "$out" -t neutral -b white -w 1600
done
```

## Inventário de diagramas

| Arquivo | Descrição |
|---|---|
| `01-implantacao.png` | Diagrama de implantação (browser ↔ GitHub Pages ↔ Actions) |
| `02-componentes.png` | Componentes React e suas dependências |
| `03-casos-de-uso.png` | UML — casos de uso do ator Aluno |
| `04-sequencia-quiz.png` | Sequência: aluno responde uma questão |
| `05-sequencia-navegacao.png` | Sequência: aluno troca de página em uma etapa |
| `06-fluxo-rotas.png` | Diagrama de estado das rotas da SPA |
| `07-pipeline-cicd.png` | Pipeline GitHub Actions de build e deploy |

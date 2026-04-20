#!/usr/bin/env node
/**
 * Converte legacy/views/etapaN/pagina_*_etapaN.html em src/content/etapaN/paginas.json.
 * Reescreve `../../assets/img/` -> `{{BASE}}img/` (placeholder resolvido em runtime).
 */
import { readFile, readdir, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SRC_DIR = join(ROOT, 'legacy', 'views');
const OUT_DIR = join(ROOT, 'src', 'content');

const ETAPAS = [1, 2, 3, 4];

function rewriteHtml(html) {
  return html
    .replaceAll('../../assets/img/', '{{BASE}}img/')
    .replaceAll('../../assets/audio/', '{{BASE}}audio/')
    .replaceAll('../../clap.wav', '{{BASE}}audio/clap.wav')
    .trim();
}

async function migrateEtapa(etapa) {
  const dir = join(SRC_DIR, `etapa${etapa}`);
  if (!existsSync(dir)) {
    console.warn(`[etapa${etapa}] pasta não encontrada, pulando`);
    return;
  }
  const files = (await readdir(dir)).filter((f) => /^pagina_\d+_etapa\d+\.html$/.test(f));
  const paginas = [];
  for (const file of files) {
    const m = file.match(/^pagina_(\d+)_etapa\d+\.html$/);
    if (!m) continue;
    const numero = Number(m[1]);
    const raw = await readFile(join(dir, file), 'utf8');
    paginas.push({ pagina: numero, html: rewriteHtml(raw) });
  }
  paginas.sort((a, b) => a.pagina - b.pagina);
  const outDir = join(OUT_DIR, `etapa${etapa}`);
  await mkdir(outDir, { recursive: true });
  await writeFile(
    join(outDir, 'paginas.json'),
    JSON.stringify(paginas, null, 2) + '\n',
    'utf8',
  );
  console.log(`[etapa${etapa}] ${paginas.length} páginas migradas`);
}

for (const e of ETAPAS) await migrateEtapa(e);
console.log('\n✓ Migração concluída.');

import {
  readdirSync,
  statSync,
  writeFileSync,
  readFileSync,
  existsSync,
  realpathSync,
} from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SDD_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CATALOG_PATH = join(SDD_ROOT, 'catalog.json');

// With NX_WORKSPACE_ROOT_PATH pointing elsewhere, every `nx …` run from here targets THAT
// workspace and reports success — warned on the first line, before anything else.
{
  const nxRoot = process.env.NX_WORKSPACE_ROOT_PATH;
  if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url) && nxRoot && resolve(nxRoot) !== join(SDD_ROOT, '..')) {
    console.warn(
      `[rebuild-catalog] ⚠ NX_WORKSPACE_ROOT_PATH=${nxRoot} is not this repo (${join(SDD_ROOT, '..')}) — any \`nx\` command run here targets THAT workspace.`,
    );
  }
}

export function buildCatalog() {
  const skillsDir = join(SDD_ROOT, 'skills');
  const journalDir = join(SDD_ROOT, 'memory', 'journal');
  return {
    $schema: './schemas/catalog.schema.json',
    _description:
      'Manifest generado del contenido de sdd/ para consumo del visor (sdd/docs) en hosting estatico sin listado de directorios. Regenerar con: pnpm sdd:rebuild-catalog. NUNCA editar a mano — pnpm sdd:validate falla si esta desactualizado.',
    agents: readdirSync(join(SDD_ROOT, 'agents'))
      .filter((f) => f.endsWith('.agent.md'))
      .sort()
      .map((file) => ({ file })),
    skills: readdirSync(skillsDir)
      .filter((entry) => statSync(join(skillsDir, entry)).isDirectory())
      .sort()
      .flatMap((dir) =>
        readdirSync(join(skillsDir, dir)).includes('SKILL.md')
          ? [{ dir, file: 'SKILL.md' }]
          : [],
      ),
    prompts: readdirSync(join(SDD_ROOT, 'prompts'))
      .filter((f) => f.endsWith('.prompt.md'))
      .sort()
      .map((file) => ({ file })),
    schemas: readdirSync(join(SDD_ROOT, 'schemas'))
      .filter((f) => f.endsWith('.schema.json') && f !== 'catalog.schema.json')
      .sort()
      .map((file) => ({ file })),
    // El journal se nombra YYYY-MM-DD-...: orden descendente = más reciente primero.
    memory: existsSync(journalDir)
      ? readdirSync(journalDir)
          .filter((f) => f.endsWith('.md'))
          .sort()
          .reverse()
          .map((file) => ({ file }))
      : [],
  };
}

// import.meta.url ya viene resuelto; process.argv[1] no. En macOS el tmpdir es
// /var -> /private/var, así que sin realpath el script se ejecutaba como import y
// no escribía nada, en silencio.
const realPath = (p) => {
  try {
    return realpathSync(p);
  } catch {
    return p;
  }
};
const isMain =
  process.argv[1] &&
  realPath(fileURLToPath(import.meta.url)) === realPath(process.argv[1]);
if (isMain) {
  const catalog = buildCatalog();
  const serialized = JSON.stringify(catalog, null, 2) + '\n';
  const previous = existsSync(CATALOG_PATH)
    ? readFileSync(CATALOG_PATH, 'utf8')
    : '';
  writeFileSync(CATALOG_PATH, serialized);
  console.log(
    `[rebuild-catalog] ${serialized === previous ? 'unchanged' : 'wrote'} sdd/catalog.json — ` +
      `${catalog.agents.length} agents, ${catalog.skills.length} skills, ` +
      `${catalog.prompts.length} prompts, ${catalog.schemas.length} schemas, ` +
      `${catalog.memory.length} journal entries`,
  );
}

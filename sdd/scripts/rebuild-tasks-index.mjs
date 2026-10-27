#!/usr/bin/env node
// Rebuilds sdd/tasks.json (lightweight index) from the canonical per-cycle
// task files at sdd/specs/*/cycles/cycle-XX/tasks.json. The per-cycle files
// are the single source of truth; the index is always derivable. Run after
// creating or closing a cycle, or whenever the index looks stale:
//
//   pnpm sdd:rebuild-tasks-index
//
// With --check it does not write: it exits 1 if the current index differs
// from the regenerated one (used by validate-sdd.mjs and CI).
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const SDD_ROOT = resolve(__dirname, '..');
const SPECS_DIR = join(SDD_ROOT, 'specs');
const INDEX_PATH = join(SDD_ROOT, 'tasks.json');
const CHECK_ONLY = process.argv.includes('--check');

// With NX_WORKSPACE_ROOT_PATH pointing elsewhere, every `nx …` run from here targets THAT
// workspace and reports success — warned on the first line, before anything else.
{
  const nxRoot = process.env.NX_WORKSPACE_ROOT_PATH;
  if (!CHECK_ONLY && nxRoot && resolve(nxRoot) !== resolve(SDD_ROOT, '..')) {
    console.warn(
      `[rebuild-tasks-index] ⚠ NX_WORKSPACE_ROOT_PATH=${nxRoot} is not this repo (${resolve(SDD_ROOT, '..')}) — any \`nx\` command run here targets THAT workspace.`,
    );
  }
}

const specs = {};
const specIds = readdirSync(SPECS_DIR, { withFileTypes: true })
  .filter((e) => e.isDirectory() && e.name.startsWith('spec-'))
  .map((e) => e.name)
  .sort();

for (const specId of specIds) {
  const cyclesDir = join(SPECS_DIR, specId, 'cycles');
  if (!existsSync(cyclesDir)) continue;
  const cycleKeys = readdirSync(cyclesDir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && /^cycle-\d{2}$/.test(e.name))
    .map((e) => e.name)
    .sort();

  for (const cycleKey of cycleKeys) {
    const tasksPath = join(cyclesDir, cycleKey, 'tasks.json');
    if (!existsSync(tasksPath)) continue;
    const cycleTasks = JSON.parse(readFileSync(tasksPath, 'utf8'));

    let status = 'in-progress';
    const cycleJsonPath = join(cyclesDir, cycleKey, 'cycle.json');
    if (existsSync(cycleJsonPath)) {
      status = JSON.parse(readFileSync(cycleJsonPath, 'utf8')).status ?? status;
    }

    specs[specId] ??= { cycles: {} };
    specs[specId].cycles[cycleKey] = {
      file: `sdd/specs/${specId}/cycles/${cycleKey}/tasks.json`,
      module: cycleTasks.module,
      apps: cycleTasks.apps,
      status,
      tasks_total: cycleTasks.tasks.length,
      tasks_done: cycleTasks.tasks.filter((t) => t.status === 'done').length,
    };
  }
}

const index = {
  $schema: './schemas/tasks-index.schema.json',
  _comment:
    'Lightweight index over per-cycle task files. Canonical task data lives in each sdd/specs/{spec-id}/cycles/cycle-XX/tasks.json. Do not edit task detail here. Regenerate with: pnpm sdd:rebuild-tasks-index',
  sdd_version: '4.0',
  specs,
};

const next = JSON.stringify(index, null, 2) + '\n';

if (CHECK_ONLY) {
  // Compare content, not line endings: a Windows checkout with core.autocrlf=true hands us CRLF
  // and the index was reported stale on every run even when it was up to date.
  const current = existsSync(INDEX_PATH)
    ? readFileSync(INDEX_PATH, 'utf8').replace(/\r\n/g, '\n')
    : '';
  if (current !== next) {
    console.error(
      '[rebuild-tasks-index] sdd/tasks.json is stale. Run: pnpm sdd:rebuild-tasks-index',
    );
    process.exit(1);
  }
  console.log('[rebuild-tasks-index] index is up to date');
} else {
  writeFileSync(INDEX_PATH, next);
  const cycles = Object.values(specs).reduce(
    (n, s) => n + Object.keys(s.cycles).length,
    0,
  );
  console.log(
    `[rebuild-tasks-index] wrote index for ${Object.keys(specs).length} specs / ${cycles} cycles`,
  );
}

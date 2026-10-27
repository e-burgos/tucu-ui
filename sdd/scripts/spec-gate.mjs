#!/usr/bin/env node
// SPEC GATE as a command: answers the gate deterministically instead of an agent reading
// ten files by hand. Run with: pnpm sdd:gate <spec-id|slug> [cycle-XX] [--json]
//   GATE A (no cycle)  → can a cycle be opened for this spec?
//   GATE B (cycle-XX)  → can implementation start in this cycle? (flow-aware: full/reduced/lite)
// Exits 0 when the gate passes, 1 when blocked, 2 on usage errors.
import { existsSync, readdirSync, readFileSync } from 'fs';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const SDD = resolve(__dirname, '..');
const REPO = resolve(SDD, '..');

const DOCS_BY_FLOW = {
  full: ['brief.yaml', 'functional.md', 'planner.md', 'architect.md'],
  reduced: ['brief.yaml'],
  lite: ['plan.md'],
};

const args = process.argv.slice(2);
const json = args.includes('--json');
const positional = args.filter((a) => !a.startsWith('--'));

if (args.includes('--help') || args.includes('-h') || positional.length === 0) {
  console.log(`Usage: pnpm sdd:gate <spec-id|slug> [cycle-XX] [--json]

  No cycle    → GATE A (opening): can a cycle be opened for this spec?
  With cycle  → GATE B (implementation): can code be written in that cycle?
                (per flow: full → brief/functional/planner/architect · reduced → brief · lite → plan.md)
  --json      → structured output for agents

Exits 0 if the gate passes, 1 if it is blocked, 2 on a usage error.`);
  process.exit(positional.length === 0 && !args.includes('--help') && !args.includes('-h') ? 2 : 0);
}

function loadJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function usageError(message) {
  if (json) console.log(JSON.stringify({ error: message }, null, 2));
  else console.error(`[spec-gate] ✗ ${message}`);
  process.exit(2);
}

const specsIndex = loadJson(join(SDD, 'specs', 'index.json'));
const globalJson = loadJson(join(SDD, 'global.json'));

function resolveSpec(query) {
  const exact = specsIndex.specs.find((s) => s.id === query);
  if (exact) return exact;
  const matches = specsIndex.specs.filter(
    (s) => s.id.endsWith(`-${query}`) || s.id.includes(query),
  );
  if (matches.length === 1) return matches[0];
  if (matches.length > 1)
    usageError(`"${query}" is ambiguous: ${matches.map((s) => s.id).join(', ')}`);
  usageError(
    `spec "${query}" is not in sdd/specs/index.json (${specsIndex.specs.length} registered)`,
  );
}

function normalizeCycle(raw) {
  const m = /^(?:cycle-)?(\d{1,2})$/.exec(raw);
  if (!m) usageError(`invalid cycle "${raw}" — use cycle-XX`);
  return `cycle-${m[1].padStart(2, '0')}`;
}

function cyclesOf(spec) {
  const dir = join(REPO, spec.folder, 'cycles');
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((d) => /^cycle-\d{2}$/.test(d))
    .sort()
    .map((id) => {
      const file = join(dir, id, 'cycle.json');
      let data = null;
      try {
        data = existsSync(file) ? loadJson(file) : null;
      } catch {
        data = null;
      }
      return { id, dir: join(dir, id), data };
    });
}

function moduleEntry(spec) {
  for (const bucket of ['pending_modules', 'in_progress_modules', 'completed_modules']) {
    const entry = (globalJson[bucket] ?? []).find((m) => m.spec === spec.id);
    if (entry) return { bucket, entry };
  }
  return null;
}

const suggestedFlow = () => (globalJson.profile === 'solo' ? 'lite' : 'full');

function gateA(spec) {
  const checks = [];
  const specFile = join(REPO, spec.file);
  checks.push({
    id: 'A1',
    label: 'Spec registered in specs/index.json and its file exists',
    ok: existsSync(specFile),
    detail: existsSync(specFile) ? spec.file : `missing ${spec.file}`,
  });
  const mod = moduleEntry(spec);
  const modOk = !!mod && mod.bucket !== 'completed_modules';
  checks.push({
    id: 'A2',
    label: 'Module in pending_modules or in_progress_modules of global.json',
    ok: modOk,
    detail: mod
      ? `${mod.entry.module} → ${mod.bucket}`
      : 'no ModuleEntry — harness add spec registers it; if the spec already exists, add it to pending_modules',
  });
  const cycles = cyclesOf(spec);
  const open = cycles.filter((c) => c.data?.status === 'in-progress');
  checks.push({
    id: 'A3',
    label: 'No other cycle of this spec is in-progress',
    ok: open.length === 0,
    detail: open.length ? `open: ${open.map((c) => c.id).join(', ')} — close it first` : 'no open cycles',
  });
  const missingDeps = (spec.depends_on ?? []).filter(
    (dep) => specsIndex.specs.find((s) => s.id === dep)?.status !== 'completed',
  );
  checks.push({
    id: 'A4',
    label: 'Spec dependencies (depends_on) completed',
    ok: missingDeps.length === 0,
    detail: missingDeps.length ? `pending: ${missingDeps.join(', ')}` : 'no pending dependencies',
  });
  checks.push({
    id: 'A5',
    label: 'The spec is neither completed nor cancelled',
    ok: spec.status !== 'completed' && spec.status !== 'cancelled',
    detail: `status: ${spec.status}`,
  });
  // The next number comes from the cycles that were actually opened (a cycle.json exists), not
  // from the directories: cycles/cycle-01/artifacts/ captured before opening the cycle is still
  // cycle-01, not a reason to suggest cycle-02.
  const opened = cycles.filter((c) => c.data);
  const last = opened.length ? Math.max(...opened.map((c) => Number(c.id.slice(6)))) : 0;
  return {
    gate: 'A',
    checks,
    next: {
      cycle: `cycle-${String(last + 1).padStart(2, '0')}`,
      flow: suggestedFlow(),
      profile: globalJson.profile ?? 'team',
    },
  };
}

function gateB(spec, cycleId) {
  const checks = [];
  const cycle = cyclesOf(spec).find((c) => c.id === cycleId);
  const cycleDir = cycle?.dir ?? join(REPO, spec.folder, 'cycles', cycleId);
  const rel = (name) => join(spec.folder, 'cycles', cycleId, name);
  const data = cycle?.data ?? null;
  checks.push({
    id: 'B1',
    label: 'cycle.json exists with status in-progress',
    ok: data?.status === 'in-progress',
    detail: data ? `status: ${data.status}` : `missing ${rel('cycle.json')} — the orchestrator creates it when opening the cycle`,
  });
  const mod = moduleEntry(spec);
  checks.push({
    id: 'B2',
    label: 'Module in in_progress_modules of global.json',
    ok: mod?.bucket === 'in_progress_modules',
    detail: mod ? `${mod.entry.module} → ${mod.bucket}` : 'no ModuleEntry in global.json',
  });
  let tasks = null;
  try {
    tasks = existsSync(join(cycleDir, 'tasks.json')) ? loadJson(join(cycleDir, 'tasks.json')) : null;
  } catch {
    tasks = null;
  }
  const taskCount = tasks?.tasks?.length ?? 0;
  checks.push({
    id: 'B3',
    label: 'Cycle tasks.json with at least one task',
    ok: taskCount > 0,
    detail: tasks ? `${taskCount} task(s)` : `missing ${rel('tasks.json')}`,
  });
  const flow = data?.flow ?? tasks?.flow ?? 'full';
  const docs = DOCS_BY_FLOW[flow] ?? DOCS_BY_FLOW.full;
  const missingDocs = docs.filter((d) => !existsSync(join(cycleDir, d)));
  checks.push({
    id: 'B4',
    label: `Cycle documents required by flow ${flow}: ${docs.join(', ')}`,
    ok: missingDocs.length === 0,
    detail: missingDocs.length ? `missing: ${missingDocs.join(', ')}` : 'complete',
  });
  const apps = data?.apps ?? mod?.entry.apps ?? [];
  const missingCtx = apps.filter((app) => {
    const [category, name] = app.split('/');
    return !existsSync(join(SDD, 'context', category, name, 'constitution.md'));
  });
  checks.push({
    id: 'B5',
    label: 'constitution.md of every subproject in the cycle',
    ok: apps.length > 0 && missingCtx.length === 0,
    detail:
      apps.length === 0
        ? 'the cycle declares no apps[]'
        : missingCtx.length
          ? `missing: ${missingCtx.map((a) => `context/${a}/constitution.md`).join(', ')}`
          : apps.join(', '),
  });
  return { gate: 'B', checks, flow, cycle: cycleId };
}

const spec = resolveSpec(positional[0]);
const cycleId = positional[1] ? normalizeCycle(positional[1]) : null;
const result = cycleId ? gateB(spec, cycleId) : gateA(spec);
const passed = result.checks.every((c) => c.ok);

if (json) {
  console.log(JSON.stringify({ spec: spec.id, passed, ...result }, null, 2));
} else {
  const title =
    result.gate === 'A'
      ? `SPEC GATE A — opening a cycle · ${spec.id}`
      : `SPEC GATE B — implementation · ${spec.id} · ${result.cycle} (flow: ${result.flow})`;
  console.log(`\n${title}`);
  for (const c of result.checks) {
    console.log(`  ${c.ok ? '✔' : '✘'} ${c.id}. ${c.label}\n      ${c.detail}`);
  }
  const pending = result.checks.filter((c) => !c.ok).length;
  console.log(
    passed
      ? `\n→ APPROVED${result.gate === 'A' ? ` — next cycle: ${result.next.cycle}, suggested flow: ${result.next.flow} (profile: ${result.next.profile}; [LITE]/[FULL] in the request override it)` : ''}`
      : `\n→ BLOCKED — ${pending} pending condition(s). Complete them before continuing.`,
  );
}
process.exit(passed ? 0 : 1);

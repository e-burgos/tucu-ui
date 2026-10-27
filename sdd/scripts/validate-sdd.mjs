#!/usr/bin/env node
// Validates every SDD JSON registry against its strict schema in sdd/schemas/
// plus cross-registry consistency rules. Run with: pnpm sdd:validate
// Exits non-zero on any error so it can gate CI or a pre-commit hook.
import { readFileSync, readdirSync, existsSync } from 'fs';
import { createHash } from 'crypto';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/** CRLF -> LF for text content (a NUL byte in the first 8 KB means binary: untouched). */
function normalizeEol(content) {
  if (content.subarray(0, 8192).includes(0)) return content;
  if (!content.includes(0x0d)) return content;
  const out = Buffer.allocUnsafe(content.length);
  let j = 0;
  for (let i = 0; i < content.length; i++) {
    if (content[i] === 0x0d && content[i + 1] === 0x0a) continue;
    out[j++] = content[i];
  }
  return out.subarray(0, j);
}
const SDD = resolve(__dirname, '..');
const REPO = resolve(SDD, '..');

// First line on purpose: with NX_WORKSPACE_ROOT_PATH pointing elsewhere (an IDE session
// whose primary directory is another repo), every `nx …` run from here executes the targets
// of THAT workspace and reports success. The registries below are fine; the build is not.
const NX_ROOT_ENV = process.env.NX_WORKSPACE_ROOT_PATH;
if (NX_ROOT_ENV && resolve(NX_ROOT_ENV) !== REPO) {
  console.warn(
    `[validate-sdd] ⚠ NX_WORKSPACE_ROOT_PATH=${NX_ROOT_ENV} is not this repo (${REPO}) — any \`nx\` command run here targets THAT workspace. Unset it before lint/test/build.`,
  );
}

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

const errors = [];
const fail = (file, msg) => errors.push(`${file}: ${msg}`);
const warnings = [];
const warn = (file, msg) => warnings.push(`${file}: ${msg}`);

function loadJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

const sample = (files) =>
  files.slice(0, 3).join(', ') + (files.length > 3 ? `, +${files.length - 3} more` : '');

const compiledCache = new Map();
function compiled(schemaFile) {
  if (!compiledCache.has(schemaFile)) {
    compiledCache.set(
      schemaFile,
      ajv.compile(loadJson(join(SDD, 'schemas', schemaFile))),
    );
  }
  return compiledCache.get(schemaFile);
}

function validate(dataPath, schemaFile) {
  const abs = join(SDD, dataPath);
  if (!existsSync(abs)) {
    fail(dataPath, 'file not found');
    return null;
  }
  let data;
  try {
    data = loadJson(abs);
  } catch (e) {
    fail(dataPath, `invalid JSON: ${e.message}`);
    return null;
  }
  const validateFn = compiled(schemaFile);
  if (!validateFn(data)) {
    for (const err of validateFn.errors) {
      fail(dataPath, `${err.instancePath || '/'} ${err.message}`);
    }
  }
  return data;
}

// ---- 1. Schema validation of every registry ----
const tasksIndex = validate('tasks.json', 'tasks-index.schema.json');
const globalJson = validate('global.json', 'global.schema.json');
const specsIndex = validate('specs/index.json', 'specs-index.schema.json');
const fixesJson = validate('fixes.json', 'fixes.schema.json');
validate('api.json', 'api.schema.json');
validate('schema.json', 'db-schema.schema.json');
validate('components.json', 'components.schema.json');

const cycleFiles = [];
const cycleTasksFiles = [];
for (const spec of readdirSync(join(SDD, 'specs'), { withFileTypes: true })) {
  if (!spec.isDirectory() || !spec.name.startsWith('spec-')) continue;
  const cyclesDir = join(SDD, 'specs', spec.name, 'cycles');
  if (!existsSync(cyclesDir)) continue;
  for (const cyc of readdirSync(cyclesDir)) {
    if (!/^cycle-\d{2}$/.test(cyc)) continue;
    const base = `specs/${spec.name}/cycles/${cyc}`;
    if (existsSync(join(SDD, base, 'cycle.json')))
      cycleFiles.push(`${base}/cycle.json`);
    if (existsSync(join(SDD, base, 'tasks.json')))
      cycleTasksFiles.push(`${base}/tasks.json`);
  }
}
const cycles = new Map(
  cycleFiles.map((f) => [f, validate(f, 'cycle.schema.json')]),
);
const cycleTasks = new Map(
  cycleTasksFiles.map((f) => [f, validate(f, 'cycle-tasks.schema.json')]),
);

// ---- 2. Per-cycle task rules ----
// reduced (refactor without stories) and lite (single actor, plan.md) may leave user_stories empty.
const LITE_FLOWS = new Set(['reduced', 'lite']);
for (const [file, ct] of cycleTasks) {
  if (!ct) continue;
  const ids = new Set();
  for (const t of ct.tasks) {
    if (ids.has(t.id)) fail(file, `duplicate task id ${t.id}`);
    ids.add(t.id);
  }
  for (const t of ct.tasks) {
    for (const dep of t.depends_on) {
      if (!ids.has(dep)) fail(file, `${t.id} depends_on unknown task ${dep}`);
    }
    if (t.user_stories.length === 0 && !LITE_FLOWS.has(ct.flow)) {
      fail(file, `${t.id} has empty user_stories but flow is neither "reduced" nor "lite"`);
    }
  }
}

// ---- 3. Index ↔ per-cycle consistency (regeneration check) ----
try {
  execFileSync(
    'node',
    [join(__dirname, 'rebuild-tasks-index.mjs'), '--check'],
    {
      stdio: 'pipe',
    },
  );
} catch {
  fail(
    'tasks.json',
    'index is stale vs per-cycle files (run pnpm sdd:rebuild-tasks-index)',
  );
}

// ---- 4. specs/index.json ↔ filesystem ↔ global.json ↔ cycle.json ----
const draftCandidates = [];
if (specsIndex && globalJson) {
  const completedModules = new Map(
    globalJson.completed_modules.map((m) => [m.spec, m]),
  );
  // Every module registered in global.json must point at a spec of the index; a spec
  // created by `harness add spec` lands in pending_modules automatically since v0.11.0.
  for (const bucket of ['pending_modules', 'in_progress_modules', 'completed_modules']) {
    for (const m of globalJson[bucket] ?? []) {
      if (!specsIndex.specs.some((x) => x.id === m.spec))
        warn('global.json', `${bucket}: module ${m.module} points at unknown spec ${m.spec}`);
    }
  }
  for (const s of specsIndex.specs) {
    if (!existsSync(join(REPO, s.folder)))
      fail('specs/index.json', `${s.id}: folder does not exist`);
    if (!existsSync(join(REPO, s.file)))
      fail('specs/index.json', `${s.id}: spec file does not exist (${s.file})`);
    if (s.status === 'completed' && !s.completed_at)
      fail('specs/index.json', `${s.id}: completed without completed_at`);
    if (s.status === 'in-progress' && s.completed_at)
      fail('specs/index.json', `${s.id}: in-progress with completed_at set`);
    if (s.status === 'draft' && s.completed_at)
      fail('specs/index.json', `${s.id}: draft with completed_at set`);
    const hasCycles =
      existsSync(join(REPO, s.folder, 'cycles')) &&
      readdirSync(join(REPO, s.folder, 'cycles')).some((d) => /^cycle-\d{2}$/.test(d));
    if (s.status === 'draft' && hasCycles)
      warn(
        'specs/index.json',
        `${s.id}: has cycles but status is draft — the orchestrator sets in-progress when it opens cycle-01`,
      );
    if (s.status === 'in-progress' && !hasCycles) draftCandidates.push(s.id);
    if (s.status === 'completed' && !completedModules.has(s.id))
      fail(
        'specs/index.json',
        `${s.id}: completed but missing in global.json completed_modules`,
      );
    for (const dep of s.depends_on) {
      if (!specsIndex.specs.some((x) => x.id === dep))
        fail('specs/index.json', `${s.id}: depends_on unknown spec ${dep}`);
    }
  }
  for (const spec of completedModules.keys()) {
    const entry = specsIndex.specs.find((x) => x.id === spec);
    if (!entry)
      fail(
        'global.json',
        `completed module ${spec} not registered in specs/index.json`,
      );
    else if (entry.status !== 'completed')
      fail(
        'global.json',
        `module ${spec} completed in global.json but "${entry.status}" in specs/index.json`,
      );
  }
}
// Specs registered before v0.11.0 were born in-progress; since then they are born draft and
// the orchestrator promotes them when it opens cycle-01. Never rewritten here — suggested.
if (draftCandidates.length)
  warn(
    'specs/index.json',
    `${draftCandidates.length} spec(s) in-progress without any cycle — since v0.11.0 a spec with no cycle is "draft"; set status: draft (${sample(draftCandidates)})`,
  );

// ---- 5. cycle.json rules + TELEMETRÍA GATE ----
// Telemetry became mandatory in the protocol in v0.9.0 and per-agent in v0.11.0. Units closed
// before the cutoff keep validating green (warnings only): nobody can rewrite history. Units
// closed from the cutoff on fail without provider/model + tokens.
const TELEMETRY_GATE_CUTOFF = '2026-09-02';
const isGatedUnit = (date) => typeof date === 'string' && date >= TELEMETRY_GATE_CUTOFF;
const providerOf = (u) => u?.provider_model ?? u?.model_tier ?? null;
const canonicalModel = (key) =>
  /^(haiku|sonnet|opus|fable)$/.test(key) ? `claude/${key}` : key;
const hasTokens = (u) =>
  Number.isInteger(u?.tokens_in) && Number.isInteger(u?.tokens_out);

const cyclesWithoutTelemetry = [];
const cyclesWithoutProvider = [];
const cyclesWithoutByAgent = [];
const cyclesIncompleteUsage = [];
const tasksWithoutUsage = [];

function checkDeclaredEstimate(file, where, u) {
  if (u && u.approx === false && u.source === 'declared-estimate')
    fail(
      file,
      `${where}: approx: false with source: declared-estimate — a declared estimate is approximate by definition (set approx: true or record the real source)`,
    );
}

for (const [file, c] of cycles) {
  if (!c) continue;
  if (c.status === 'completed') {
    if (!c.completed_at) fail(file, 'completed without completed_at');
    if (!c.reviewer_report) fail(file, 'completed without reviewer_report');
    if (c.metrics) {
      // A skipped task is resolved (not applicable), not pending. Records written
      // before tasks_skipped existed have no skipped tasks, so ?? 0 leaves their
      // arithmetic exactly as it was.
      const resolved = c.metrics.tasks_completed + (c.metrics.tasks_skipped ?? 0);
      if (resolved < c.metrics.tasks_total)
        fail(
          file,
          `completed with ${resolved}/${c.metrics.tasks_total} tasks resolved (done + skipped)`,
        );
      if (resolved > c.metrics.tasks_total)
        warn(
          file,
          `tasks_completed + tasks_skipped (${resolved}) exceeds tasks_total (${c.metrics.tasks_total})`,
        );
    }
    // Outside the metrics guard on purpose: a cycle closed with metrics: null has no
    // telemetry either, and that is exactly what this gate is for.
    const usage = c.metrics?.usage;
    const gated = isGatedUnit(c.completed_at);
    const byAgent = Array.isArray(usage?.by_agent) ? usage.by_agent : [];
    const byTier = usage?.by_tier ?? {};
    const hasProvider =
      Object.keys(byTier).length > 0 || byAgent.some((a) => providerOf(a));

    if (!usage) {
      if (gated)
        fail(
          file,
          'completed without metrics.usage — since v0.11.0 a cycle is not closed until every agent recorded provider/model + tokens (by_agent) and the reviewer summed them into by_tier; with no counter, declare an estimate with approx: true',
        );
      else cyclesWithoutTelemetry.push(file);
    } else {
      if (!hasProvider) {
        if (gated)
          fail(
            file,
            'metrics.usage has no provider/model — declare by_agent[].provider_model (claude/sonnet, gemini/pro, copilot/claude-sonnet) and derive by_tier from it',
          );
        else cyclesWithoutProvider.push(file);
      }
      if (gated && !hasTokens(usage)) fail(file, 'metrics.usage without tokens_in/tokens_out');
      if (gated && byAgent.length === 0) cyclesWithoutByAgent.push(file);
      if (gated && (typeof usage.approx !== 'boolean' || !usage.source))
        cyclesIncompleteUsage.push(file);

      checkDeclaredEstimate(file, 'metrics.usage', usage);
      for (const [tier, u] of Object.entries(byTier))
        checkDeclaredEstimate(file, `metrics.usage.by_tier.${tier}`, u);
      byAgent.forEach((a, i) =>
        checkDeclaredEstimate(file, `metrics.usage.by_agent[${i}] (${a.agent})`, a),
      );

      // by_tier is derived from by_agent: same totals, same per-model split.
      if (byAgent.length > 0 && Object.keys(byTier).length > 0) {
        const fromAgents = {};
        for (const a of byAgent) {
          const key = canonicalModel(a.provider_model);
          fromAgents[key] ??= { tokens_in: 0, tokens_out: 0 };
          fromAgents[key].tokens_in += a.tokens_in ?? 0;
          fromAgents[key].tokens_out += a.tokens_out ?? 0;
        }
        const tiers = {};
        for (const [key, u] of Object.entries(byTier)) {
          const k = canonicalModel(key);
          tiers[k] ??= { tokens_in: 0, tokens_out: 0 };
          tiers[k].tokens_in += u.tokens_in ?? 0;
          tiers[k].tokens_out += u.tokens_out ?? 0;
        }
        const keys = new Set([...Object.keys(fromAgents), ...Object.keys(tiers)]);
        const mismatched = [...keys].filter(
          (k) =>
            (fromAgents[k]?.tokens_in ?? 0) !== (tiers[k]?.tokens_in ?? 0) ||
            (fromAgents[k]?.tokens_out ?? 0) !== (tiers[k]?.tokens_out ?? 0),
        );
        if (mismatched.length)
          warn(
            file,
            `sum(by_agent) != by_tier for ${mismatched.join(', ')} — by_tier is derived from by_agent; re-sum at close`,
          );
      }
      // Top-level totals must be the sum of the per-agent (or per-tier) breakdown.
      const breakdown = byAgent.length > 0 ? byAgent : Object.values(byTier);
      if (breakdown.length > 0 && hasTokens(usage)) {
        const sumIn = breakdown.reduce((n, u) => n + (u.tokens_in ?? 0), 0);
        const sumOut = breakdown.reduce((n, u) => n + (u.tokens_out ?? 0), 0);
        if (sumIn !== usage.tokens_in || sumOut !== usage.tokens_out)
          warn(
            file,
            `metrics.usage tokens (${usage.tokens_in}/${usage.tokens_out}) differ from the sum of ${byAgent.length > 0 ? 'by_agent' : 'by_tier'} (${sumIn}/${sumOut})`,
          );
      }
    }

    // Per-task: whoever executes records when the task closes. Gated cycles list the
    // done tasks that never got their usage (the orchestrator should not have marked them done).
    if (gated) {
      const ct = cycleTasks.get(file.replace(/cycle\.json$/, 'tasks.json'));
      for (const t of ct?.tasks ?? []) {
        if (t.status !== 'done') continue;
        if (!t.usage || !providerOf(t.usage) || !hasTokens(t.usage))
          tasksWithoutUsage.push(`${file.replace(/\/cycle\.json$/, '')}#${t.id}`);
        checkDeclaredEstimate(file, `tasks.json ${t.id}.usage`, t.usage);
      }
    }
  }
  for (const doc of Object.values(c.documents)) {
    if (!existsSync(join(REPO, doc)))
      fail(file, `documents entry does not exist: ${doc}`);
  }

  // flow: lite (v0.13.0) — plan.md replaces brief/functional/planner/architect. The SPEC
  // GATE is the same; only the shape differs, so drift is reported, never blocked.
  const cycleDir = join(SDD, file.replace(/\/cycle\.json$/, ''));
  if (c.status === 'in-progress' && !existsSync(join(cycleDir, 'tasks.json')))
    warn(file, 'in-progress without tasks.json — GATE B (implementation) cannot pass until the planner (or the solo actor) writes it');
  if (c.flow === 'lite') {
    if (!existsSync(join(cycleDir, 'plan.md')))
      warn(file, 'flow: lite without plan.md — the lite cycle document (objective, stories, tasks, decisions) is missing');
    const grew = (c.tables_created?.length ?? 0) + (c.endpoints_implemented?.length ?? 0);
    if (c.status === 'completed' && grew > 0)
      warn(
        file,
        `flow: lite created ${c.tables_created.length} table(s) / ${c.endpoints_implemented.length} endpoint(s) — contracts other subprojects consume deserve a full cycle: open the next cycle of this spec as flow: full`,
      );
  }
  // artifacts[]: paths relative to the cycle directory (`artifacts/x`, what the docs suggest)
  // or to the repo root; a directory counts. Until v0.15.0 only repo-relative paths resolved.
  for (const art of c.artifacts) {
    if (!existsSync(join(cycleDir, art)) && !existsSync(join(REPO, art)))
      fail(file, `artifact does not exist: ${art} (looked relative to the cycle directory and to the repo root)`);
  }
}

// Aggregated so an old repo gets one line instead of a wall.
if (cyclesWithoutTelemetry.length)
  warn(
    'cycle.json',
    `${cyclesWithoutTelemetry.length} completed cycle(s) without metrics.usage — record tokens + by_tier at close; with no counter available declare an estimate with approx: true (${sample(cyclesWithoutTelemetry)})`,
  );
if (cyclesWithoutProvider.length)
  warn(
    'cycle.json',
    `${cyclesWithoutProvider.length} completed cycle(s) with metrics.usage but no by_tier — declare the model as provider/model, e.g. copilot/claude-sonnet (${sample(cyclesWithoutProvider)})`,
  );
if (cyclesWithoutByAgent.length)
  warn(
    'cycle.json',
    `${cyclesWithoutByAgent.length} completed cycle(s) without metrics.usage.by_agent — every agent records its unit when it closes (agent, provider_model, effort, tokens, approx, source); the reviewer sums, never reconstructs (${sample(cyclesWithoutByAgent)})`,
  );
if (cyclesIncompleteUsage.length)
  warn(
    'cycle.json',
    `${cyclesIncompleteUsage.length} completed cycle(s) whose metrics.usage lacks an explicit approx and/or source (${sample(cyclesIncompleteUsage)})`,
  );
if (tasksWithoutUsage.length)
  warn(
    'tasks.json',
    `${tasksWithoutUsage.length} done task(s) in cycles closed since ${TELEMETRY_GATE_CUTOFF} without usage.provider_model + tokens — the executor records when the task closes and the orchestrator does not mark done without it (${sample(tasksWithoutUsage)})`,
  );

// A cycle that closed with skipped tasks must say so in metrics.tasks_skipped, or the
// Costs/Tasks views read those tasks as pending.
for (const [file, ct] of cycleTasks) {
  if (!ct) continue;
  const skipped = ct.tasks.filter((t) => t.status === 'skipped').length;
  if (skipped === 0) continue;
  const cycleFile = file.replace(/tasks\.json$/, 'cycle.json');
  const cycle = cycles.get(cycleFile);
  if (!cycle || cycle.status !== 'completed' || !cycle.metrics) continue;
  if ((cycle.metrics.tasks_skipped ?? 0) !== skipped)
    warn(
      cycleFile,
      `tasks.json has ${skipped} skipped task(s) but metrics.tasks_skipped is ${cycle.metrics.tasks_skipped ?? 0}`,
    );
}

// ---- 6. fixes.json rules + FIX GATE telemetry ----
if (fixesJson) {
  const ids = new Set();
  const fixesWithoutUsage = [];
  for (const f of fixesJson.fixes) {
    if (ids.has(f.id)) fail('fixes.json', `duplicate fix id ${f.id}`);
    ids.add(f.id);
    if (!existsSync(join(REPO, f.fix_document)))
      fail(
        'fixes.json',
        `${f.id}: fix_document does not exist (${f.fix_document})`,
      );
    const resolved = ['implemented', 'validated', 'absorbed'].includes(f.status);
    if (resolved && !f.resolved_at)
      fail('fixes.json', `${f.id}: status ${f.status} without resolved_at`);
    if (resolved) {
      const complete = f.usage && providerOf(f.usage) && hasTokens(f.usage);
      if (!complete) {
        if (isGatedUnit(f.resolved_at))
          fail(
            'fixes.json',
            `${f.id}: resolved without usage.provider_model + tokens — the FIX GATE does not close a fix until whoever resolved it recorded provider/model, effort, tokens, approx and source (declared estimate with approx: true when there is no counter)`,
          );
        else fixesWithoutUsage.push(f.id);
      }
      checkDeclaredEstimate('fixes.json', `${f.id}.usage`, f.usage);
      const byAgent = Array.isArray(f.usage?.by_agent) ? f.usage.by_agent : [];
      byAgent.forEach((a, i) =>
        checkDeclaredEstimate('fixes.json', `${f.id}.usage.by_agent[${i}] (${a.agent})`, a),
      );
      if (byAgent.length > 0 && hasTokens(f.usage)) {
        const sumIn = byAgent.reduce((n, u) => n + (u.tokens_in ?? 0), 0);
        const sumOut = byAgent.reduce((n, u) => n + (u.tokens_out ?? 0), 0);
        if (sumIn !== f.usage.tokens_in || sumOut !== f.usage.tokens_out)
          warn(
            'fixes.json',
            `${f.id}: usage tokens (${f.usage.tokens_in}/${f.usage.tokens_out}) differ from the sum of by_agent (${sumIn}/${sumOut})`,
          );
      }
    }
  }
  if (fixesWithoutUsage.length)
    warn(
      'fixes.json',
      `${fixesWithoutUsage.length} resolved fix(es) without usage.provider_model + tokens (closed before ${TELEMETRY_GATE_CUTOFF}, kept as warning) (${sample(fixesWithoutUsage)})`,
    );
}

// ---- 7. Cycle root whitelist (6 files for full/reduced, plan.md for lite) ----
const ALLOWED = new Set([
  'brief.yaml',
  'functional.md',
  'planner.md',
  'architect.md',
  'plan.md',
  'cycle.json',
  'tasks.json',
  'artifacts',
]);
for (const spec of readdirSync(join(SDD, 'specs'), { withFileTypes: true })) {
  if (!spec.isDirectory() || !spec.name.startsWith('spec-')) continue;
  const cyclesDir = join(SDD, 'specs', spec.name, 'cycles');
  if (!existsSync(cyclesDir)) continue;
  for (const cyc of readdirSync(cyclesDir)) {
    if (!/^cycle-\d{2}$/.test(cyc)) continue;
    for (const entry of readdirSync(join(cyclesDir, cyc))) {
      if (!ALLOWED.has(entry))
        fail(
          `specs/${spec.name}/cycles/${cyc}`,
          `disallowed file in cycle root: ${entry} (move to artifacts/)`,
        );
    }
  }
}

// ---- 8. CONTEXTO GATE: additive fragment name format + consolidation threshold ----
const CONTEXT_CATEGORIES = ['apps', 'libs', 'tools'];
const CYCLE_FRAGMENT_RE = /^\d{4}-\d{2}-\d{2}-spec-[a-z0-9-]+-cycle-\d{2}\.md$/;
const FIX_FRAGMENT_RE = /^\d{4}-\d{2}-\d{2}-fix-[a-z0-9-]+\.md$/;
const CONSOLIDATION_THRESHOLD = 5;

function updatesDir(category, name) {
  return join(SDD, 'context', category, name, 'updates');
}

// Consolidation legitimately deletes fragments, so a completed cycle is also satisfied by a
// subproject context consolidated at/after the cycle's completion date.
function consolidatedSince(category, name, completedAt) {
  if (!completedAt) return false;
  const promptPath = join(SDD, 'context', category, name, 'context_prompt.md');
  if (!existsSync(promptPath)) return false;
  const header = /actualizaci[oó]n:.*Fecha:\s*(\d{4}-\d{2}-\d{2})/i.exec(
    readFileSync(promptPath, 'utf8'),
  );
  return header !== null && header[1] >= completedAt;
}

for (const category of CONTEXT_CATEGORIES) {
  const categoryDir = join(SDD, 'context', category);
  if (!existsSync(categoryDir)) continue;
  for (const proj of readdirSync(categoryDir, { withFileTypes: true })) {
    if (!proj.isDirectory()) continue;
    const dir = updatesDir(category, proj.name);
    if (!existsSync(dir)) continue;
    const label = `context/${category}/${proj.name}/updates`;
    const fragments = readdirSync(dir).filter((f) => f !== '.gitkeep');
    for (const entry of fragments) {
      if (!CYCLE_FRAGMENT_RE.test(entry) && !FIX_FRAGMENT_RE.test(entry)) {
        fail(
          label,
          `malformed fragment name: ${entry} (expected YYYY-MM-DD-spec-[gh-user]-[NNN][-slug]-cycle-[XX].md or YYYY-MM-DD-fix-[gh-user]-[seq].md)`,
        );
      }
    }
    if (fragments.length >= CONSOLIDATION_THRESHOLD) {
      warn(
        label,
        `${fragments.length} fragments accumulated (>= ${CONSOLIDATION_THRESHOLD}) — due for consolidation into constitution.md/context_prompt.md`,
      );
    }
  }
}

// ---- 9. CONTEXTO GATE: closed cycle must have its additive fragment ----
// Mechanism went live with this migration; earlier completed cycles predate it and are exempt.
const CONTEXT_GATE_CUTOFF = '2026-08-03';
const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

for (const [file, c] of cycles) {
  if (!c || c.status !== 'completed') continue;
  if (c.completed_at && c.completed_at < CONTEXT_GATE_CUTOFF) continue;
  const m =
    /^specs\/(spec-[a-z0-9-]+)\/cycles\/(cycle-\d{2})\/cycle\.json$/.exec(file);
  if (!m) continue;
  const [, specFolder, cycleKey] = m;
  const shortIdMatch = /^spec-([a-z0-9-]+?)-(\d{3})-/.exec(specFolder);
  const shortSpecId = shortIdMatch
    ? `spec-${shortIdMatch[1]}-${shortIdMatch[2]}`
    : specFolder;
  for (const app of c.apps) {
    const [category, name] = app.split('/');
    const dir = updatesDir(category, name);
    const label = `context/${category}/${name}/updates`;
    if (!existsSync(dir)) {
      fail(file, `completed cycle touches ${app} but ${label} does not exist`);
      continue;
    }
    const fragmentRe = new RegExp(
      `^\\d{4}-\\d{2}-\\d{2}-${escapeRegExp(shortSpecId)}(-[a-z0-9-]+)?-${cycleKey}\\.md$`,
    );
    const hasFragment = readdirSync(dir).some((f) => fragmentRe.test(f));
    if (!hasFragment && !consolidatedSince(category, name, c.completed_at)) {
      fail(
        file,
        `completed without an additive context fragment in ${label} (expected YYYY-MM-DD-${shortSpecId}[-slug]-${cycleKey}.md) and the base context_prompt.md header shows no consolidation at/after ${c.completed_at}`,
      );
    }
  }
}

// ---- 10. MEMORIA GATE: journal entry naming + distillation threshold + lessons cap ----
// memory/ ships with the kit since v0.4; older installs may lack it — absence is not an error.
const MEMORY_JOURNAL_DIR = join(SDD, 'memory', 'journal');
const MEMORY_LESSONS = join(SDD, 'memory', 'lessons.md');
const DISTILLATION_THRESHOLD = 5;
const LESSONS_LINE_CAP = 120;

if (existsSync(MEMORY_JOURNAL_DIR)) {
  const entries = readdirSync(MEMORY_JOURNAL_DIR).filter(
    (f) => f !== '.gitkeep',
  );
  for (const entry of entries) {
    if (!CYCLE_FRAGMENT_RE.test(entry) && !FIX_FRAGMENT_RE.test(entry)) {
      fail(
        'memory/journal',
        `malformed journal entry name: ${entry} (expected YYYY-MM-DD-spec-[gh-user]-[NNN][-slug]-cycle-[XX].md or YYYY-MM-DD-fix-[gh-user]-[seq].md)`,
      );
    }
  }
  if (entries.length >= DISTILLATION_THRESHOLD) {
    warn(
      'memory/journal',
      `${entries.length} journal entries accumulated (>= ${DISTILLATION_THRESHOLD}) — due for distillation into memory/lessons.md (orchestrator, single actor)`,
    );
  }
}

if (existsSync(MEMORY_LESSONS)) {
  const lessonsLines = readFileSync(MEMORY_LESSONS, 'utf8').split('\n').length;
  if (lessonsLines > LESSONS_LINE_CAP) {
    warn(
      'memory/lessons.md',
      `${lessonsLines} lines exceed the ${LESSONS_LINE_CAP}-line cap — prune obsolete lessons (this file is read whole at every session start)`,
    );
  }
}

// ---- 11. Pricing (Costs dashboard input) — ships with the kit since v0.4; absence is not an error ----
if (existsSync(join(SDD, 'pricing.json'))) {
  validate('pricing.json', 'pricing.schema.json');
}

// ---- 12. Tools (rtk switch) — ships with the kit since v0.12; absence is not an error ----
if (existsSync(join(SDD, 'tools.json'))) {
  validate('tools.json', 'tools.schema.json');
}

// ---- 12b. Rule zero (model/effort/context) — warning only: repos from before v0.17 lack it ----
{
  const START = '<!-- regla-cero:start -->';
  const END = '<!-- regla-cero:end -->';
  for (const name of ['CLAUDE.md', 'AGENTS.md', 'GEMINI.md']) {
    const file = join(REPO, name);
    if (!existsSync(file)) continue;
    const text = readFileSync(file, 'utf8');
    if (!text.includes(START) || !text.includes(END))
      warn(
        name,
        'rule-zero block (<!-- regla-cero:start/end -->) is missing — run `harness update sdd` (a hybrid file keeps your copy; the kit version lands next to it as *.new)',
      );
  }
  const claudeSettings = join(REPO, '.claude', 'settings.json');
  if (existsSync(join(REPO, '.claude'))) {
    let installed = false;
    try {
      const hooks = JSON.parse(readFileSync(claudeSettings, 'utf8').replace(/^﻿/, ''))?.hooks?.SessionStart;
      installed =
        Array.isArray(hooks) &&
        hooks.some((entry) =>
          (entry?.hooks ?? []).some((h) => typeof h?.command === 'string' && h.command.includes('rule-zero-hook.mjs')),
        );
    } catch {
      // missing or non-JSON settings: reported as not installed below
    }
    if (!installed)
      warn(
        '.claude/settings.json',
        'SessionStart hook for rule zero is missing — run `pnpm setup:agents` (installs sdd/scripts/rule-zero-hook.mjs so the model/effort rule is re-injected on every session start)',
      );
  }
}

// ---- 13. Workspace invariant promised by init-nx-workspace (TS solution setup only) ----
// When tsconfig.base.json declares `customConditions`, Nx keys every lib's conditional exports
// with the root package.json `name`: if they differ, TypeScript resolves to dist instead of src.
// The kit's own nx-workspace template uses legacy `paths` and has no customConditions, so a
// repo generated from it is not checked. Warning, not failure: the kit never breaks a repo
// over a workspace setting it did not write.
{
  const tsBase = join(REPO, 'tsconfig.base.json');
  const rootPkg = join(REPO, 'package.json');
  if (existsSync(tsBase) && existsSync(rootPkg)) {
    try {
      const conditions = JSON.parse(readFileSync(tsBase, 'utf8'))?.compilerOptions?.customConditions;
      const name = JSON.parse(readFileSync(rootPkg, 'utf8'))?.name;
      if (Array.isArray(conditions) && typeof name === 'string' && !conditions.includes(name))
        warn(
          'tsconfig.base.json',
          `customConditions [${conditions.join(', ')}] does not include the root package.json name "${name}" — with the TS solution setup Nx keys the libs' conditional exports with that name, so types resolve to dist instead of src (init-nx-workspace invariant)`,
        );
    } catch {
      // JSONC or a file the kit does not own: nothing to check.
    }
  }
}

// ---- Content catalog: schema + freshness vs filesystem (viewer depends on it) ----
const catalogJson = validate('catalog.json', 'catalog.schema.json');
if (catalogJson) {
  // A URL, not a path: Node's ESM loader rejects absolute Windows paths ("C:\..." is read as
  // protocol "c:" — ERR_UNSUPPORTED_ESM_URL_SCHEME). On POSIX a bare path only worked by accident.
  const { buildCatalog } = await import(new URL('./rebuild-catalog.mjs', import.meta.url));
  const expected = buildCatalog();
  for (const section of ['agents', 'skills', 'prompts', 'schemas', 'memory']) {
    const have = JSON.stringify(catalogJson[section] ?? []);
    const want = JSON.stringify(expected[section]);
    if (have !== want) {
      fail(
        'catalog.json',
        `${section} is stale vs sdd/ filesystem (run pnpm sdd:rebuild-catalog)`,
      );
    }
  }
}

// ---- Portability: global.json owns the project name/description, nobody duplicates it ----
// sdd/ must be copyable into another repo without edits, so no file of the portable kit may
// hardcode what global.json declares. Dev-authored content is exempt on purpose: specs/,
// fixes/ and subproject contexts under context/[apps|libs|tools]/ legitimately name things.
const KIT_FILES = [
  'README.md',
  'context/constitution.md',
  'context/context_prompt.md',
  'dual-harness/AGENTS.md',
  'dual-harness/CLAUDE.md',
];
const KIT_DIRS = [
  'agents',
  'documentation',
  'prompts',
  'skills',
  'schemas',
  'docs',
  'templates',
];
const TEXT_FILE_RE = /\.(md|mdx|json|ya?ml|mjs|c?js|html|css|tsx?)$/;

function walkTextFiles(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkTextFiles(path));
    else if (TEXT_FILE_RE.test(entry.name)) out.push(path);
  }
  return out;
}

if (globalJson) {
  // Short values would produce false positives on ordinary prose, so they are skipped.
  const owned = [
    ['project', globalJson.project],
    ['description', globalJson.description],
  ].filter(
    ([, value]) => typeof value === 'string' && value.trim().length >= 5,
  );

  // A kit file that is byte-identical to what the kit shipped CANNOT have leaked the
  // project name: whatever it says, it said before this repo existed. Skipping those
  // kills a whole class of false positives — a project named `legacy`, `example` or
  // `catalog` used to fail here because the kit's own prose contains the word — without
  // weakening the rule: a generator writing the name into a kit file changes its hash,
  // so it is still caught. Installs with no manifest keep the previous behaviour.
  let pristine = new Set();
  const manifestPath = join(SDD, 'kit.json');
  if (existsSync(manifestPath)) {
    try {
      const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
      for (const [rel, hash] of Object.entries(manifest.files ?? {})) {
        const abs = join(SDD, rel);
        if (!existsSync(abs)) continue;
        // Same rule as the CLI's kit-manifest: CRLF folded to LF for text files, so a Windows
        // checkout with core.autocrlf=true still matches the hash the kit shipped.
        const actual = createHash('sha256').update(normalizeEol(readFileSync(abs))).digest('hex');
        if (actual === hash) pristine.add(abs);
      }
    } catch {
      pristine = new Set();
    }
  }

  const kitFiles = [
    ...KIT_FILES.map((file) => join(SDD, file)),
    ...KIT_DIRS.flatMap((dir) => walkTextFiles(join(SDD, dir))),
  ].filter((path) => existsSync(path) && !pristine.has(path));

  // Word-boundary match: a project named "shop" must not be reported because an app is
  // called "shop-api", and a subproject legitimately named after the repo is not a leak.
  const escapeRe = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const ownedRe = owned.map(([prop, value]) => [
    prop,
    value,
    new RegExp(`(?<![A-Za-z0-9_-])${escapeRe(value)}(?![A-Za-z0-9_-])`),
  ]);

  for (const path of kitFiles) {
    const content = readFileSync(path, 'utf8');
    for (const [prop, value, re] of ownedRe) {
      if (re.test(content)) {
        fail(
          path.slice(SDD.length + 1),
          `hardcodes global.json "${prop}" ("${value}") — point to sdd/global.json instead so sdd/ stays portable`,
        );
      }
    }
  }
}

// ---- Report ----
const checked = 8 + cycleFiles.length + cycleTasksFiles.length;
if (warnings.length) {
  console.warn(`\n[validate-sdd] ${warnings.length} warning(s):\n`);
  for (const w of warnings) console.warn('  ⚠ ' + w);
}
if (errors.length) {
  console.error(
    `\n[validate-sdd] ${errors.length} error(s) in ${checked} files:\n`,
  );
  for (const e of errors) console.error('  ✗ ' + e);
  process.exit(1);
}
console.log(
  `\n[validate-sdd] OK — ${checked} files valid, cross-checks passed`,
);

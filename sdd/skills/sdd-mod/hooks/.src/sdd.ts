// Pure SDD logic of the mod: reads sdd/ through a small reader and judges edits. No import
// from 'claude-code' at run time, so the CLI's own vitest suite exercises it as is.
import type {
  ActiveCycle,
  CycleTask,
  ModSettings,
  OpenFix,
  Snapshot,
} from '../../.claude-plugin/contract';

export type Reader = {
  read: (path: string) => Promise<string>;
  list: (path: string) => Promise<{ name: string; kind: string }[]>;
};

export type Verdict =
  | { kind: 'allow' }
  | { kind: 'warn'; reason: string }
  | { kind: 'deny'; reason: string };

// Kit and harness surfaces are not "code": SDD records, agent config and root markdown.
const EXEMPT_DIRS = new Set([
  'sdd',
  '.claude',
  '.github',
  '.gemini',
  '.agents',
  '.agent',
  '.vscode',
  '.idea',
]);

const OPEN_FIX = new Set(['pending', 'in-progress']);

export function readSettings(tools: unknown): ModSettings {
  const mod = (tools as { claude_mod?: { enabled?: unknown; gate?: unknown } })
    ?.claude_mod;
  return {
    enabled: mod?.enabled === true,
    gate: mod?.gate === 'warn' ? 'warn' : 'block',
  };
}

async function readJson(reader: Reader, path: string): Promise<any> {
  return JSON.parse(await reader.read(path));
}

async function activeCycles(reader: Reader, root: string): Promise<ActiveCycle[]> {
  const index = await readJson(reader, `${root}/sdd/specs/index.json`);
  const out: ActiveCycle[] = [];
  for (const spec of index.specs ?? []) {
    if (spec.status === 'completed' || spec.status === 'cancelled') continue;
    const dir = `${root}/${spec.folder}/cycles`;
    const entries = await reader.list(dir).catch(() => []);
    for (const entry of entries) {
      if (!/^cycle-\d{2}$/.test(entry.name)) continue;
      const cycle = await readJson(reader, `${dir}/${entry.name}/cycle.json`).catch(
        () => null,
      );
      if (cycle?.status !== 'in-progress') continue;
      const tasks = await readJson(reader, `${dir}/${entry.name}/tasks.json`).catch(
        () => null,
      );
      out.push({
        spec: spec.id,
        title: spec.title ?? spec.id,
        cycle: entry.name,
        flow: cycle.flow ?? tasks?.flow ?? 'full',
        tasks: (tasks?.tasks ?? []).map(
          (t: CycleTask): CycleTask => ({ id: t.id, title: t.title, status: t.status }),
        ),
      });
    }
  }
  return out.sort((a, b) => `${a.spec}/${a.cycle}`.localeCompare(`${b.spec}/${b.cycle}`));
}

async function openFixes(reader: Reader, root: string): Promise<OpenFix[]> {
  const fixes = await readJson(reader, `${root}/sdd/fixes.json`).catch(() => null);
  return (fixes?.fixes ?? [])
    .filter((f: OpenFix) => OPEN_FIX.has(f.status))
    .map((f: OpenFix): OpenFix => ({ id: f.id, title: f.title, status: f.status }));
}

export async function loadSnapshot(reader: Reader, root: string): Promise<Snapshot> {
  const tools = await readJson(reader, `${root}/sdd/tools.json`).catch(() => null);
  const settings = readSettings(tools);
  if (!settings.enabled) return { settings, cycles: [], fixes: [] };
  try {
    const [cycles, fixes] = await Promise.all([
      activeCycles(reader, root),
      openFixes(reader, root),
    ]);
    return { settings, cycles, fixes };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { settings, cycles: [], fixes: [], error: message.slice(0, 120) };
  }
}

/** Path relative to the repo root with `/` separators, or null when it lands outside it. */
export function relativeToRoot(root: string, filePath: string): string | null {
  const norm = (p: string) => p.replace(/\\/g, '/');
  const base = norm(root).replace(/\/+$/, '');
  const raw = norm(filePath);
  const isAbsolute = raw.startsWith('/') || /^[A-Za-z]:\//.test(raw);
  const parts: string[] = [];
  for (const part of (isAbsolute ? raw : `${base}/${raw}`).split('/')) {
    if (part === '' || part === '.') continue;
    if (part === '..') parts.pop();
    else parts.push(part);
  }
  const full = (raw.startsWith('/') || base.startsWith('/') ? '/' : '') + parts.join('/');
  if (!full.startsWith(`${base}/`)) return null;
  return full.slice(base.length + 1);
}

export function isCodePath(rel: string): boolean {
  const [first, ...rest] = rel.split('/');
  if (rest.length === 0) return !/\.md$/i.test(first ?? '');
  return !EXEMPT_DIRS.has(first ?? '');
}

export function judgeEdit(snapshot: Snapshot, root: string, filePath: string): Verdict {
  if (!snapshot.settings.enabled || snapshot.error) return { kind: 'allow' };
  const rel = relativeToRoot(root, filePath);
  if (rel === null || !isCodePath(rel)) return { kind: 'allow' };
  if (snapshot.cycles.length > 0 || snapshot.fixes.length > 0) return { kind: 'allow' };
  const reason =
    `SPEC GATE: no hay ningún ciclo in-progress ni un fix abierto, así que todavía no se ` +
    `escribe código (${rel}). Abrí un ciclo (pnpm sdd:gate <spec> → sdd-orchestrator) o ` +
    `registrá el cambio con [FIX]/[BUGFIX]/[HOTFIX]. Reglas: sdd/dual-harness/rules/sdd-gates.md.`;
  return snapshot.settings.gate === 'block'
    ? { kind: 'deny', reason }
    : { kind: 'warn', reason };
}

export function progress(cycle: ActiveCycle): string {
  const counted = cycle.tasks.filter((t) => t.status !== 'skipped');
  const done = counted.filter((t) => t.status === 'done').length;
  return `${done}/${counted.length}`;
}

/** One line for the band above the prompt; null when there is nothing to show. */
export function bandLine(snapshot: Snapshot): string | null {
  if (!snapshot.settings.enabled) return null;
  if (snapshot.error) return `SDD ▸ no pude leer sdd/ (${snapshot.error}) · gate en pausa`;
  const parts: string[] = [];
  const [first, ...others] = snapshot.cycles;
  if (first) {
    parts.push(
      `${first.spec} · ${first.cycle} · ${first.flow} · ${progress(first)} tareas`,
    );
    if (others.length > 0) parts.push(`+${others.length} ciclo(s)`);
  }
  if (snapshot.fixes.length > 0) parts.push(`${snapshot.fixes.length} fix abierto(s)`);
  if (parts.length === 0) {
    const effect = snapshot.settings.gate === 'block' ? 'bloqueado' : 'con aviso';
    return `SDD ▸ sin ciclo ni fix en curso · escribir código: ${effect} · /sdd`;
  }
  return `SDD ▸ ${parts.join(' · ')} · /sdd`;
}

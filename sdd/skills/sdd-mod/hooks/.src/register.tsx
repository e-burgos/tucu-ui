// Claude Code mod of the SDD kit. Off unless sdd/tools.json → claude_mod.enabled is true
// (`pnpm sdd:mod -- --enable`); the switch is re-read on every refresh, no reload needed.
// The rules stay in sdd/dual-harness/rules/sdd-gates.md: this only shows and applies them.
// Sources live in dot-directories on purpose: TypeScript's `**/*` globs skip them, so the host
// project's tsc / next build never tries to compile a module that imports 'claude-code'.
import { atom, read, update } from 'claude-code';
import type { EngineInterface, Register } from 'claude-code';

import type { Snapshot } from '../../.claude-plugin/contract';
import { bandLine, judgeEdit, loadSnapshot, progress } from './sdd';

const snapshot = atom({ plugin: 'sdd-mod', key: 'snapshot' } as const, null);
const PANE = 'sdd-status';
const OFF_HINT = 'El mod SDD está apagado. Prendelo con: pnpm sdd:mod -- --enable';

async function refresh($: EngineInterface): Promise<Snapshot> {
  const root = await $.session.root();
  const next = await loadSnapshot(
    {
      read: (path) => $.fs.read(path),
      list: async (path) => (await $.fs.list(path)).map(({ name, kind }) => ({ name, kind })),
    },
    root,
  );
  await update($, snapshot, () => next);
  return next;
}

// A gate that cannot read sdd/ lets the edit through: sdd:validate and CI stay the safety net.
async function gate($: EngineInterface, filePath: string) {
  try {
    const current = await refresh($);
    return judgeEdit(current, await $.session.root(), filePath);
  } catch {
    return { kind: 'allow' } as const;
  }
}

export const register: Register = (on) => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'sdd',
      description: 'SDD: ciclos en curso, tareas, fixes abiertos y modo del gate',
    });
    await refresh($).catch(() => undefined);
    return next(e);
  });

  on('turn.complete', async ($, e, next) => {
    await refresh($).catch(() => undefined);
    return next(e);
  });

  on('tool.call', { tool: 'Edit' }, async ($, e, next) => {
    const verdict = await gate($, e.file_path);
    if (verdict.kind === 'deny') return { deny: verdict.reason };
    if (verdict.kind === 'warn') $.ui.toast(verdict.reason);
    return next(e);
  });

  on('tool.call', { tool: 'Write' }, async ($, e, next) => {
    const verdict = await gate($, e.file_path);
    if (verdict.kind === 'deny') return { deny: verdict.reason };
    if (verdict.kind === 'warn') $.ui.toast(verdict.reason);
    return next(e);
  });

  on('tool.call', { tool: 'NotebookEdit' }, async ($, e, next) => {
    const verdict = await gate($, e.notebook_path);
    if (verdict.kind === 'deny') return { deny: verdict.reason };
    if (verdict.kind === 'warn') $.ui.toast(verdict.reason);
    return next(e);
  });

  on('command.run', { command: 'sdd' }, async ($) => {
    const current = await refresh($);
    if (!current.settings.enabled) return { text: OFF_HINT };
    await $.ui.open({ id: PANE, title: 'SDD' });
    return { text: bandLine(current) ?? 'SDD' };
  });

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const current = await read($, snapshot);
    const line = current ? bandLine(current) : null;
    if (e.props.hasSurvey || line === null || current === null) return next(e);
    const { Text } = $.ui.resolve(e);
    const idle = current.cycles.length === 0 && current.fixes.length === 0;
    const color = current.error ? 'warning' : idle ? 'suggestion' : 'success';
    return (
      <Text color={color} wrap="truncate-end">
        {line}
      </Text>
    );
  });

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Text } = $.ui.resolve(e);
    const current = await read($, snapshot);
    if (current === null || !current.settings.enabled) {
      return <Text dimColor>{OFF_HINT}</Text>;
    }
    const gateText =
      current.settings.gate === 'block'
        ? 'Gate: bloquea ediciones de código sin ciclo ni fix abierto'
        : 'Gate: solo avisa (claude_mod.gate = "warn")';
    return (
      <Box flexDirection="column">
        <Text dimColor>{gateText}</Text>
        {current.error && <Text color="warning">No pude leer sdd/: {current.error}</Text>}
        {current.cycles.length === 0 && <Text dimColor>Sin ciclos in-progress.</Text>}
        {current.cycles.map((cycle) => (
          <Box flexDirection="column" marginTop={1}>
            <Text bold>
              {cycle.spec} · {cycle.cycle} · {cycle.flow} · {progress(cycle)}
            </Text>
            {cycle.tasks.map((task) => (
              <Text dimColor={task.status === 'done' || task.status === 'skipped'}>
                {task.status === 'done' ? '✓' : task.status === 'in-progress' ? '▸' : '·'}{' '}
                {task.id} {task.title}
              </Text>
            ))}
          </Box>
        ))}
        {current.fixes.length > 0 && (
          <Box flexDirection="column" marginTop={1}>
            <Text bold>Fixes abiertos</Text>
            {current.fixes.map((fix) => (
              <Text>
                {fix.id} · {fix.status} · {fix.title}
              </Text>
            ))}
          </Box>
        )}
        <Text dimColor>pnpm sdd:gate {'<spec>'} [cycle-XX] · pnpm sdd:validate</Text>
      </Box>
    );
  });
};

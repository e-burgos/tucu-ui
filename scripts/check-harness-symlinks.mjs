#!/usr/bin/env node

/**
 * Verifies the three-harness setup (Claude Code, GitHub Copilot, Antigravity)
 * is wired correctly: every per-tool agent/prompt/skill/instructions file is
 * a symlink pointing at its canonical source under harness/ (or AGENTS.md for
 * the root instructions files) — never a hand-maintained copy.
 *
 * There is no "generate" step here on purpose: since every per-tool file is
 * a real symlink to the same bytes, there is nothing to regenerate. Editing
 * the canonical source under harness/ (or AGENTS.md) IS the update — every
 * tool sees it immediately, with zero extra step. If this check ever fails,
 * someone replaced a symlink with a real file (most likely by editing it
 * in an editor that materializes it) — restore the symlink, don't "fix
 * content" on both sides.
 *
 * Usage: node scripts/check-harness-symlinks.mjs
 */

import { lstatSync, readlinkSync, existsSync } from 'node:fs';
import { resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// [symlink path, expected target path] — both relative to ROOT.
const EXPECTED_SYMLINKS = [
  ['CLAUDE.md', 'AGENTS.md'],
  ['GEMINI.md', 'AGENTS.md'],
  ['.claude/agents/tucu-ui-expert.md', 'harness/agents/tucu-ui-expert.md'],
  ['.claude/agents/tucu-ui-docs-sync.md', 'harness/agents/tucu-ui-docs-sync.md'],
  ['.claude/commands/tucu-ui-expert.md', 'harness/prompts/tucu-ui-expert.md'],
  ['.claude/skills/sdd', 'harness/skills/sdd'],
  ['.claude/skills/publish', 'harness/skills/publish'],
  ['.github/agents/tucu-ui-expert.agent.md', 'harness/agents/tucu-ui-expert.md'],
  ['.github/agents/tucu-ui-docs-sync.agent.md', 'harness/agents/tucu-ui-docs-sync.md'],
  ['.github/prompts/tucu-ui-expert.prompt.md', 'harness/prompts/tucu-ui-expert.md'],
  ['.agent/workflows/tucu-ui-expert.md', 'harness/prompts/tucu-ui-expert.md'],
  ['.agent/rules/tucu-ui-expert.md', 'harness/agents/tucu-ui-expert.md'],
  ['.agent/rules/tucu-ui-docs-sync.md', 'harness/agents/tucu-ui-docs-sync.md'],
];

const errors = [];

for (const [link, target] of EXPECTED_SYMLINKS) {
  const linkPath = resolve(ROOT, link);
  const targetPath = resolve(ROOT, target);

  if (!existsSync(linkPath)) {
    errors.push(`${link} — missing entirely`);
    continue;
  }

  const stat = lstatSync(linkPath);
  if (!stat.isSymbolicLink()) {
    errors.push(`${link} — exists but is a real file/directory, not a symlink (someone edited it directly?)`);
    continue;
  }

  const resolvedTarget = resolve(dirname(linkPath), readlinkSync(linkPath));
  if (resolvedTarget !== targetPath) {
    errors.push(
      `${link} — points at ${relative(ROOT, resolvedTarget)}, expected ${target}`
    );
    continue;
  }

  if (!existsSync(targetPath)) {
    errors.push(`${link} — points at ${target}, which doesn't exist`);
  }
}

if (errors.length > 0) {
  console.error(`\x1b[31m✗\x1b[0m ${errors.length} harness symlink issue(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  console.error(
    '\nRecreate the broken symlink(s) — e.g. `ln -sf ../../harness/agents/<name>.md .claude/agents/<name>.md` — never hand-copy content.'
  );
  process.exit(1);
}

console.log(`\x1b[32m✓\x1b[0m all ${EXPECTED_SYMLINKS.length} harness symlinks are intact and resolve correctly.`);

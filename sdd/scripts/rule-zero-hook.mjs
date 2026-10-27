#!/usr/bin/env node
// Re-injects the kit's "regla cero" (model / effort / context optimisation) as session context.
//   Claude Code : SessionStart (startup|resume|clear|compact) → node sdd/scripts/rule-zero-hook.mjs claude
//
// Contract: NEVER fail and NEVER be noisy. If the harness file or the markers are missing,
// print nothing and exit 0 — the session simply starts without the extra context.

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const START = '<!-- regla-cero:start -->';
const END = '<!-- regla-cero:end -->';
const HARNESS_FILES = { claude: 'CLAUDE.md', gemini: 'GEMINI.md' };

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');

function candidateRoots() {
  const roots = [
    process.env.CLAUDE_PROJECT_DIR,
    process.env.GEMINI_PROJECT_DIR,
    REPO_ROOT,
    process.cwd(),
  ];
  return roots.filter(Boolean);
}

function extractBlock(text) {
  const from = text.indexOf(START);
  const to = text.indexOf(END);
  if (from === -1 || to === -1 || to < from) return null;
  return text.slice(from + START.length, to).trim() || null;
}

function readBlock(agent) {
  const name = HARNESS_FILES[agent];
  if (!name) return null;
  for (const root of candidateRoots()) {
    for (const file of [join(root, name), join(root, 'sdd', 'dual-harness', name)]) {
      if (!existsSync(file)) continue;
      const block = extractBlock(readFileSync(file, 'utf8'));
      if (block) return block;
    }
  }
  return null;
}

try {
  const agent = process.argv[2] ?? 'claude';
  const block = readBlock(agent);
  if (block && agent === 'claude') {
    process.stdout.write(
      `${JSON.stringify({
        hookSpecificOutput: { hookEventName: 'SessionStart', additionalContext: block },
      })}\n`,
    );
  }
} catch {
  // silent by contract
}
process.exit(0);

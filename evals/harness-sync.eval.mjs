#!/usr/bin/env node

/**
 * Fixtures for the three-harness setup (Claude Code, GitHub Copilot,
 * Antigravity). Run with: node --test evals/
 *
 * The architecture is symlink-based, not generated: harness/ (+ AGENTS.md)
 * is the only place with real content; every per-tool file is a symlink to
 * it. These fixtures verify that property holds — no duplicated content, no
 * broken links, no leftover generated copies.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, lstatSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function readCanonicalFiles(dir) {
  const full = resolve(ROOT, dir);
  return readdirSync(full)
    .filter((f) => f.endsWith('.md'))
    .map((f) => ({ name: f, raw: readFileSync(resolve(full, f), 'utf-8') }));
}

test('canonical agent specs (harness/agents/) have required frontmatter', () => {
  for (const file of readCanonicalFiles('harness/agents')) {
    const match = file.raw.match(/^---\n([\s\S]*?)\n---\n/);
    assert.ok(match, `${file.name} is missing a YAML frontmatter block`);
    assert.match(match[1], /^name:\s*\S+/m, `${file.name} frontmatter missing 'name'`);
    assert.match(match[1], /^description:\s*\S+/m, `${file.name} frontmatter missing 'description'`);
  }
});

test('canonical prompt specs (harness/prompts/) have required frontmatter and no tool-specific placeholders', () => {
  for (const file of readCanonicalFiles('harness/prompts')) {
    const match = file.raw.match(/^---\n([\s\S]*?)\n---\n/);
    assert.ok(match, `${file.name} is missing a YAML frontmatter block`);
    assert.match(match[1], /^description:\s*\S+/m, `${file.name} frontmatter missing 'description'`);
    for (const placeholder of ['$ARGUMENTS', '${input:args}', '{{ARGS}}']) {
      assert.ok(
        !file.raw.includes(placeholder),
        `${file.name} contains tool-specific placeholder "${placeholder}" — this file is shared verbatim via symlink across tools, it can't rely on any single tool's substitution syntax`
      );
    }
  }
});

test('every per-tool harness file is a symlink resolving to harness/ or AGENTS.md (never a real copy)', () => {
  execFileSync('node', ['scripts/check-harness-symlinks.mjs'], { cwd: ROOT, stdio: 'pipe' });
});

test('symlinked content is byte-identical to its canonical source (sanity check on top of path resolution)', () => {
  const pairs = [
    ['.claude/agents/tucu-ui-expert.md', 'harness/agents/tucu-ui-expert.md'],
    ['.github/prompts/tucu-ui-expert.prompt.md', 'harness/prompts/tucu-ui-expert.md'],
    ['CLAUDE.md', 'AGENTS.md'],
  ];
  for (const [link, source] of pairs) {
    const linkContent = readFileSync(resolve(ROOT, link), 'utf-8');
    const sourceContent = readFileSync(resolve(ROOT, source), 'utf-8');
    assert.equal(linkContent, sourceContent, `${link} content diverged from ${source} — should be impossible via a real symlink`);
  }
});

test('.agents/ was fully removed — its Nx-skill mirror was dead weight for the three active harnesses', () => {
  assert.throws(
    () => lstatSync(resolve(ROOT, '.agents')),
    '.agents/ should no longer exist — it was a local mirror of Nx-bundled skills that no active harness (Claude Code, Copilot, Antigravity) ever actually read from that path'
  );
});

#!/usr/bin/env node
// Switch for the kit's Claude Code mod (sdd/skills/sdd-mod/). Claude Code loads it on its own
// from .claude/skills/ (setup-agents links it); this only flips sdd/tools.json → claude_mod,
// which the mod re-reads on every turn.
//
//   node sdd/scripts/sdd-mod.mjs --status        JSON: enabled, gate, linked
//   node sdd/scripts/sdd-mod.mjs --enable        claude_mod.enabled = true
//   node sdd/scripts/sdd-mod.mjs --disable       claude_mod.enabled = false
//   node sdd/scripts/sdd-mod.mjs --gate=warn     claude_mod.gate = warn | block

import { existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { REPO_ROOT, TOOLS_FILE, readJsonFile } from './rtk-common.mjs';

const GATES = new Set(['block', 'warn']);
const PLUGIN_MANIFEST = join('sdd-mod', '.claude-plugin', 'plugin.json');

const log = (line) => process.stdout.write(`${line}\n`);

function readTools() {
  if (existsSync(TOOLS_FILE) && readJsonFile(TOOLS_FILE) === null) {
    process.stderr.write('✗ sdd/tools.json is not valid JSON — fix it and re-run pnpm sdd:mod\n');
    process.exit(1);
  }
  return (
    readJsonFile(TOOLS_FILE) ?? {
      $schema: './schemas/tools.schema.json',
      rtk: { enabled: true, auto_install: true },
    }
  );
}

function writeMod(patch) {
  const tools = readTools();
  tools.claude_mod = { enabled: false, gate: 'block', ...(tools.claude_mod ?? {}), ...patch };
  writeFileSync(TOOLS_FILE, `${JSON.stringify(tools, null, 2)}\n`, 'utf8');
  return tools.claude_mod;
}

function status() {
  const mod = readTools().claude_mod ?? {};
  return {
    enabled: mod.enabled === true,
    gate: mod.gate === 'warn' ? 'warn' : 'block',
    kit_files: existsSync(join(REPO_ROOT, 'sdd', 'skills', PLUGIN_MANIFEST)),
    linked: existsSync(join(REPO_ROOT, '.claude', 'skills', PLUGIN_MANIFEST)),
  };
}

const args = process.argv.slice(2);
const gateArg = args.find((a) => a.startsWith('--gate='))?.slice('--gate='.length);

if (gateArg !== undefined && !GATES.has(gateArg)) {
  process.stderr.write(`✗ --gate must be block or warn (got "${gateArg}")\n`);
  process.exit(2);
}

if (args.includes('--enable') || args.includes('--disable') || gateArg) {
  const patch = {};
  if (args.includes('--enable')) patch.enabled = true;
  if (args.includes('--disable')) patch.enabled = false;
  if (gateArg) patch.gate = gateArg;
  const mod = writeMod(patch);
  log(`claude_mod: enabled=${mod.enabled} gate=${mod.gate} (sdd/tools.json)`);
  if (mod.enabled && !status().linked) {
    log('⚠ .claude/skills/sdd-mod is missing — run pnpm setup:agents so Claude Code can load it');
  }
} else {
  log(JSON.stringify(status(), null, 2));
}

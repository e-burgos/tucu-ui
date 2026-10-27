#!/usr/bin/env node
// Bridge between the agent's pre-command hook and the rtk binary.
//   Claude Code : PreToolUse (matcher Bash)            → node sdd/scripts/rtk-hook.mjs claude
//   Gemini CLI  : BeforeTool (matcher run_shell_command) → node sdd/scripts/rtk-hook.mjs gemini
//
// Contract: NEVER block a command and NEVER be noisy. Any condition that is not
// "rtk enabled + binary present + rtk answered" ends in a silent passthrough (no stdout,
// exit 0), which both harnesses read as "run the original command untouched".

import { spawnSync } from 'node:child_process';
import { findRtkBinary, rtkSettings } from './rtk-common.mjs';

const SUPPORTED_AGENTS = new Set(['claude', 'gemini']);
const RTK_TIMEOUT_MS = 8000;

function readStdin() {
  return new Promise((done) => {
    if (process.stdin.isTTY) return done('');
    const chunks = [];
    process.stdin.on('data', (chunk) => chunks.push(chunk));
    process.stdin.on('end', () => done(Buffer.concat(chunks).toString('utf8')));
    process.stdin.on('error', () => done(''));
  });
}

async function main() {
  const agent = process.argv[2] ?? 'claude';
  const input = await readStdin();
  if (!SUPPORTED_AGENTS.has(agent) || !input.trim()) return;
  if (!rtkSettings().enabled) return;

  const bin = findRtkBinary();
  if (!bin) return;

  const result = spawnSync(bin, ['hook', agent], {
    input,
    encoding: 'utf8',
    timeout: RTK_TIMEOUT_MS,
    windowsHide: true,
    env: {
      ...process.env,
      // The kit never opts the dev into rtk's telemetry; belt and braces.
      RTK_TELEMETRY_DISABLED: process.env.RTK_TELEMETRY_DISABLED ?? '1',
    },
  });
  if (result.status !== 0 || !result.stdout) return;
  process.stdout.write(result.stdout);
}

main()
  .catch(() => {})
  .finally(() => process.exit(0));

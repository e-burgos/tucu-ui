#!/usr/bin/env node

/**
 * PreToolUse guardrail for the Bash tool — a mechanical backstop for the
 * small set of commands that are unambiguously catastrophic and never
 * legitimate in normal agent workflow, regardless of what the model was
 * asked to do. This is NOT a substitute for the model's own judgment on
 * risky-but-sometimes-valid operations (git reset --hard, rm -rf on a repo
 * subpath, etc.) — those stay governed by instructions, not this hook.
 *
 * Protocol: reads the PreToolUse JSON payload from stdin. To block, print a
 * reason to stderr and exit 2 (Claude Code feeds stderr back to the model
 * and cancels the tool call). Exit 0 to allow.
 */

const DENY_PATTERNS = [
  {
    // Whole-filesystem or home-directory wipe: `rm -rf /`, `rm -rf /*`, `rm -rf ~`
    pattern: /\brm\s+(-\w*[rf]\w*[rf]?\w*\s+)+(\/\*?|~)(\s|$)/,
    reason: 'rm -rf targeting / or ~ (whole filesystem or home directory wipe)',
  },
  {
    // Classic bash fork bomb
    pattern: /:\(\)\s*\{\s*:\s*\|\s*:\s*&\s*\}\s*;\s*:/,
    reason: 'shell fork bomb',
  },
  {
    // Writing raw bytes to a block device
    pattern: /\bdd\s+.*\bof=\/dev\/(sd|nvme|disk|hd)/,
    reason: 'dd writing directly to a block device',
  },
  {
    // Force-pushing directly to main/master (--force-with-lease is exempt — it's the safe variant)
    pattern: /\bgit\s+push\b.*(--force(?!-with-lease)\b|\s-f\b).*\b(origin\s+)?(main|master)\b/,
    reason: 'force-push directly to main/master',
  },
];

let input = '';
process.stdin.setEncoding('utf-8');
process.stdin.on('data', (chunk) => (input += chunk));
process.stdin.on('end', () => {
  let payload;
  try {
    payload = JSON.parse(input);
  } catch {
    process.exit(0); // malformed payload — fail open, don't block on our own bug
  }

  if (payload.tool_name !== 'Bash') process.exit(0);

  const command = payload.tool_input?.command;
  if (typeof command !== 'string') process.exit(0);

  for (const { pattern, reason } of DENY_PATTERNS) {
    if (pattern.test(command)) {
      process.stderr.write(
        `Blocked by .claude/hooks/pretooluse-guard.mjs: ${reason}.\n` +
          `If this command is genuinely intended, ask the user to run it manually.\n`
      );
      process.exit(2);
    }
  }

  process.exit(0);
});

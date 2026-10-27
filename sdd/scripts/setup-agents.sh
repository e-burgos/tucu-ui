#!/usr/bin/env bash
# setup-agents.sh
# Creates/regenerates symlinks so .claude, .github, .agents, .agent and .gemini point to the
# sdd/ sources, and ensures root AGENTS.md / CLAUDE.md / GEMINI.md point to sdd/dual-harness/.
# Safe to re-run at any time (idempotent + force-refresh of its own symlinks).
#
# NEVER destructive: anything that is a real file or directory (the team's own agents,
# skills, commands or root instruction files) is KEPT. When the target is a real directory
# the kit items are linked inside it; when a kit item collides with a real one, yours stays
# and the kit version lands next to it as <name>.new for you to merge (same convention as
# `harness update sdd`). Until v0.11.0 this script did `rm -rf` on real targets.
# Usage: pnpm setup:agents

set -e
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"

CONFLICTS=()

# write_new TARGET ABS_SOURCE LABEL
# The kit version next to yours: a copy for files, a pointer note for directories (a real
# directory named *.new would be discovered as a skill/agent by some harnesses).
write_new() {
  local target="$1" abs="$2" label="$3"
  if [ -d "$abs" ]; then
    printf 'Kept your %s. The kit version lives at %s — merge what you need there, then delete this note.\n' \
      "$label" "${abs#"$ROOT"/}" > "$target.new"
  else
    cp "$abs" "$target.new"
  fi
  echo "conflict (kept yours): $label — kit version at $label.new"
  CONFLICTS+=("$label")
}

# link_item TARGET REL_SOURCE ABS_SOURCE LABEL
# symlink → refresh · missing → create · real file/dir → keep + .new
# same_content A B — byte-equal ignoring line endings (a copy Git converted to CRLF still matches).
same_content() {
  [ -f "$1" ] && [ -f "$2" ] || return 1
  cmp -s <(tr -d '\r' < "$1") <(tr -d '\r' < "$2")
}

link_item() {
  local target="$1" rel="$2" abs="$3" label="$4"
  if [ -L "$target" ]; then
    if [ "$(readlink "$target")" = "$rel" ]; then
      echo "kept     symlink : $label (already points at the kit)"
    else
      ln -sfn "$rel" "$target"
      echo "refreshed symlink : $label"
    fi
  elif [ -e "$target" ]; then
    # A real file with the kit's exact content is the kit's own copy (`harness configure sdd`
    # writes one while absorbing, and leaves one when linking failed): link it, don't keep it.
    if same_content "$target" "$abs"; then
      rm -f "$target"
      ln -sfn "$rel" "$target"
      echo "replaced copy    : $label (same content as the kit file)"
    else
      write_new "$target" "$abs" "$label"
    fi
  else
    ln -sfn "$rel" "$target"
    echo "created  symlink : $label"
  fi
}

# prune_stale_links DIR
# Two kinds of link into sdd/ are always ours and always wrong, and both survive a plain
# re-run because nothing ever removed them:
#   · dangling — what is left after a `*.new` conflict is resolved and the file deleted.
#   · named `*.new` — created by setup-agents before it learned to skip merge artifacts;
#     while the `.new` still exists the entry is a duplicate skill/agent/prompt that every
#     harness discovers.
# Links resolving outside sdd/ are the user's and are never touched.
prune_stale_links() {
  local dir="$1"
  [ -d "$dir" ] || return 0
  for entry in "$dir"/* "$dir"/.[!.]*; do
    [ -L "$entry" ] || continue
    case "$(readlink "$entry")" in
      */sdd/*|sdd/*) ;;
      *) continue ;;
    esac
    if [ ! -e "$entry" ]; then
      rm -f "$entry"
      echo "pruned dangling  : ${entry#"$ROOT"/}"
    else
      case "$(basename "$entry")" in
        *.new)
          rm -f "$entry"
          echo "pruned .new link : ${entry#"$ROOT"/}"
          ;;
      esac
    fi
  done
}

# link_items DIR REL_BASE ABS_SOURCE_DIR LABEL
# One relative symlink per kit item inside an existing real directory.
link_items() {
  local dir="$1" relbase="$2" src="$3" label="$4"
  mkdir -p "$dir"
  prune_stale_links "$dir"
  for item in "$src"/*; do
    [ -e "$item" ] || continue
    local name
    name="$(basename "$item")"
    # `*.new` is a merge artifact of `update sdd`, not a surface: linking it would expose a
    # duplicate skill/agent/prompt to every harness, and leave a dangling link once resolved.
    case "$name" in
      *.new) continue ;;
    esac
    # A Claude Code plugin (sdd/skills/sdd-mod) has no SKILL.md: only .claude/ gets it.
    if [ -d "$item/.claude-plugin" ]; then
      case "$label" in
        .claude/*) ;;
        *) continue ;;
      esac
    fi
    link_item "$dir/$name" "$relbase/$name" "$item" "$label/$name"
  done
}

# link_dir TARGET REL_SOURCE REL_BASE_FOR_ITEMS ABS_SOURCE LABEL
# Whole-directory symlink when the target is free or already a symlink. A REAL directory
# (the team's own .claude/agents, .claude/skills, .claude/commands, .github/agents…) is kept
# and the kit items are linked inside it.
link_dir() {
  local target="$1" rel="$2" relitems="$3" abs="$4" label="$5"
  mkdir -p "$(dirname "$target")"
  if [ -L "$target" ]; then
    # Igual que link_item: si ya apunta al kit, no tocarlo (cada re-creación imprimía
    # "refreshed" para cada uno de los 5 symlinks de directorio, en cada corrida).
    if [ "$(readlink "$target")" = "$rel" ]; then
      echo "kept     symlink : $label (already points at the kit)"
      return 0
    fi
    ln -sfn "$rel" "$target"
    echo "refreshed symlink : $label"
  elif [ -d "$target" ]; then
    echo "merging into real dir: $label (your files are kept)"
    link_items "$target" "$relitems" "$abs" "${label%% ->*}"
  else
    ln -sfn "$rel" "$target"
    echo "created  symlink : $label"
  fi
}

# ─── 1. agents ────────────────────────────────────────────────────────────────
link_dir "$ROOT/.claude/agents" "../sdd/agents" "../../sdd/agents" "$ROOT/sdd/agents" ".claude/agents -> sdd/agents"
link_dir "$ROOT/.github/agents" "../sdd/agents" "../../sdd/agents" "$ROOT/sdd/agents" ".github/agents -> sdd/agents"

# ─── 2. skills ────────────────────────────────────────────────────────────────
# .claude/skills → full symlink (or per-skill links inside the team's real directory)
link_dir "$ROOT/.claude/skills" "../sdd/skills" "../../sdd/skills" "$ROOT/sdd/skills" ".claude/skills -> sdd/skills"

# .github/skills: individual symlinks per SDD skill (preserves the repo's own skills)
link_items "$ROOT/.github/skills" "../../sdd/skills" "$ROOT/sdd/skills" ".github/skills"

# ─── 3. prompts ───────────────────────────────────────────────────────────────
# .claude/prompts → full symlink (referencia manual)
link_dir "$ROOT/.claude/prompts" "../sdd/prompts" "../../sdd/prompts" "$ROOT/sdd/prompts" ".claude/prompts -> sdd/prompts"

# .claude/commands → los prompts como slash commands de Claude Code (/start-sdd-cycle.prompt, etc.)
link_dir "$ROOT/.claude/commands" "../sdd/prompts" "../../sdd/prompts" "$ROOT/sdd/prompts" ".claude/commands -> sdd/prompts"

# .github/prompts: individual symlinks per SDD prompt (preserves non-SDD Copilot prompts)
link_items "$ROOT/.github/prompts" "../../sdd/prompts" "$ROOT/sdd/prompts" ".github/prompts"

# ─── 4. dual-harness: root AGENTS.md, CLAUDE.md and GEMINI.md ────────────────
# A real root file is kept (+ .new). `harness configure sdd` absorbs it into sdd/dual-harness/
# before calling this script, so on a fresh install these become symlinks right away.
for name in AGENTS.md CLAUDE.md GEMINI.md; do
  link_item "$ROOT/$name" "sdd/dual-harness/$name" "$ROOT/sdd/dual-harness/$name" "$name"
done

# .github/copilot-instructions.md: a REAL file on purpose (GitHub's server-side readers do
# not follow symlinks). Seeded once from the kit; afterwards it belongs to the project.
mkdir -p "$ROOT/.github"
if [ -e "$ROOT/.github/copilot-instructions.md" ]; then
  echo "kept             : .github/copilot-instructions.md (yours)"
else
  cp "$ROOT/sdd/dual-harness/copilot-instructions.md" "$ROOT/.github/copilot-instructions.md"
  echo "created  file    : .github/copilot-instructions.md (seeded from sdd/dual-harness/)"
fi

# ─── 5. Antigravity / Gemini CLI ─────────────────────────────────────────────

# .agents/rules: individual symlinks per SDD rule (preserves user rules)
link_items "$ROOT/.agents/rules" "../../sdd/dual-harness/rules" "$ROOT/sdd/dual-harness/rules" ".agents/rules"

# .agents/skills: individual symlinks per SDD skill (shared SKILL.md standard:
# Antigravity and Gemini CLI both read this directory; preserves user skills)
link_items "$ROOT/.agents/skills" "../../sdd/skills" "$ROOT/sdd/skills" ".agents/skills"

# .agent/workflows: SDD prompts as Antigravity workflows (/start-sdd-cycle, ...)
mkdir -p "$ROOT/.agent/workflows"
for prompt_file in "$ROOT/sdd/prompts/"*.prompt.md; do
  stem=$(basename "$prompt_file" .prompt.md)
  link_item "$ROOT/.agent/workflows/$stem.md" "../../sdd/prompts/$stem.prompt.md" "$prompt_file" ".agent/workflows/$stem.md"
done

# .gemini/commands: generated TOML wrappers so Gemini CLI exposes the SDD prompts
# as slash commands. Regenerated on every run; user commands (no marker) untouched.
mkdir -p "$ROOT/.gemini/commands"
for prompt_file in "$ROOT/sdd/prompts/"*.prompt.md; do
  stem=$(basename "$prompt_file" .prompt.md)
  target="$ROOT/.gemini/commands/$stem.toml"
  if [ -f "$target" ] && ! grep -q "generated by setup-agents" "$target"; then
    echo "skipped (real file): .gemini/commands/$stem.toml"
    continue
  fi
  cat > "$target" <<EOF
# generated by setup-agents from sdd/prompts/$stem.prompt.md — do not edit
description = "SDD: $stem (fuente: sdd/prompts/$stem.prompt.md)"

prompt = """
@{sdd/prompts/$stem.prompt.md}

{{args}}
"""
EOF
  echo "generated        : .gemini/commands/$stem.toml"
done

# .gemini/settings.json: make Gemini CLI also read AGENTS.md (merge, never clobber, and do not
# rewrite it when both names are already there — setup-rtk.mjs formats the same file its own way)
if command -v node >/dev/null 2>&1; then
  node -e '
    const fs = require("fs");
    const path = require("path");
    const file = path.join(process.argv[1], ".gemini", "settings.json");
    let settings = {};
    try { settings = JSON.parse(fs.readFileSync(file, "utf8")); } catch {}
    settings.context = settings.context || {};
    const current = settings.context.fileName;
    const names = Array.isArray(current) ? current : current ? [current] : [];
    for (const name of ["GEMINI.md", "AGENTS.md"]) {
      if (!names.includes(name)) names.push(name);
    }
    settings.context.fileName = names;
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify(settings, null, 2) + "\n");
  ' "$ROOT" && echo "merged           : .gemini/settings.json (context.fileName)"
else
  echo "skipped (no node): .gemini/settings.json — add context.fileName [GEMINI.md, AGENTS.md] manually"
fi

# rtk: pre-command hooks for Claude Code / Gemini CLI + the binary itself (best effort;
# sdd/tools.json is the switch, `pnpm sdd:rtk -- --disable` turns it off).
if command -v node >/dev/null 2>&1; then
  node "$ROOT/sdd/scripts/setup-rtk.mjs" || true
else
  echo "skipped (no node): rtk hooks — run pnpm sdd:rtk once node is available"
fi

echo ""
if [ "${#CONFLICTS[@]}" -gt 0 ]; then
  echo "⚠ ${#CONFLICTS[@]} item(s) kept as yours — the kit version is next to each as *.new:"
  for c in "${CONFLICTS[@]}"; do echo "    ~ $c  →  $c.new"; done
  echo "  Merge what you need, delete the .new (or delete yours and re-run pnpm setup:agents)."
  echo "  Root AGENTS.md/CLAUDE.md/GEMINI.md: \`harness configure sdd\` absorbs them into sdd/dual-harness/ for you."
fi
echo "done."

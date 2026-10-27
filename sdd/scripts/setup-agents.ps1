# setup-agents.ps1
# Creates/regenerates directory junctions so .claude, .github, .agents, .agent and .gemini
# point to the sdd/ sources, and ensures root AGENTS.md / CLAUDE.md / GEMINI.md point to
# sdd/dual-harness/. Safe to re-run at any time (idempotent + force-refresh of its own links).
# Links are created the way Git creates them (relative symlinks via mklink, which needs no admin
# rights once Developer Mode is on); when that is not possible it falls back to a junction for
# directories and a hardlink for files. A link that already points at the kit is left alone, so
# re-running on a checkout that Git already wired keeps `git status` clean.
#
# NEVER destructive: anything that is a real file or directory (the team's own agents,
# skills, commands or root instruction files) is KEPT. When the target is a real directory
# the kit items are linked inside it; when a kit item collides with a real one, yours stays
# and the kit version lands next to it as <name>.new for you to merge (same convention as
# `harness update sdd`). Until v0.11.0 this script removed real targets.
# Usage: pnpm setup:agents

# sdd/scripts -> sdd -> repo root (mirror of setup-agents.sh: "$(dirname "$0")/../..").
# Until v0.14.1 this went up one level only, so every link landed inside sdd/ and the root
# AGENTS.md/CLAUDE.md that `harness configure sdd` had just removed were never recreated.
$root = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
if (-not (Test-Path -LiteralPath (Join-Path $root "sdd\agents"))) {
    throw "setup-agents: repo root resolved to '$root' but sdd\agents is not there - refusing to link anything"
}
# A PathNotFound or a failed New-Item must stop the script instead of scrolling by and ending
# in "done.": `harness configure sdd` trusts this exit code.
$ErrorActionPreference = 'Stop'
$script:Conflicts = @()

# Set-Content -Encoding UTF8 writes a BOM in PowerShell 5.1, and Node's JSON.parse (setup-rtk.mjs
# merges the rtk hook into .gemini/settings.json right after this script) rejects it as invalid
# JSON. Everything this script generates is written as UTF-8 without BOM.
$script:Utf8NoBom = New-Object System.Text.UTF8Encoding($false)
function Write-Utf8NoBom($path, $text) {
    [System.IO.File]::WriteAllText($path, $text, $script:Utf8NoBom)
}

function Is-Link($item) {
    return ($item.LinkType -eq "Junction" -or $item.LinkType -eq "SymbolicLink" -or $item.LinkType -eq "HardLink")
}

# A checkout with core.symlinks=false (Git for Windows' default) writes each symlink of the repo
# as a plain file whose only content is the link target. When that target points into sdd/ the
# file is ours, not the team's: it has to become a working link, not be kept as "yours" + *.new.
function Is-DegradedLink($item) {
    if ($item.PSIsContainer -or $item.Length -gt 512) { return $false }
    $content = Get-Content -LiteralPath $item.FullName -Raw -ErrorAction SilentlyContinue
    if (-not $content) { return $false }
    $content = $content.Trim()
    if ($content -match '[\r\n]') { return $false }
    return ($content -match '^(\.\.[\\/])*sdd[\\/][^\s]+$')
}

# Where a link points, as an absolute path (junction targets are absolute; symlink targets may
# be relative to the link's own directory).
function Get-LinkTargetPath($item) {
    $t = $item.Target | Select-Object -First 1
    if (-not $t) { return $null }
    if ([System.IO.Path]::IsPathRooted($t)) { return $t }
    return Join-Path ([System.IO.Path]::GetDirectoryName($item.FullName)) $t
}

function Test-LinkPointsTo($item, $source) {
    $t = Get-LinkTargetPath $item
    if (-not $t) { return $false }
    try {
        $a = (Resolve-Path -LiteralPath $t).ProviderPath.TrimEnd('\')
        $b = (Resolve-Path -LiteralPath $source).ProviderPath.TrimEnd('\')
        return ($a -ieq $b)
    } catch { return $false }
}

# Remove-Link TARGET - removes the junction/symlink/hardlink itself, never what it points to.
# Remove-Item -Recurse follows a directory link in PowerShell 5.1 and deletes the target's files,
# and Get-Item may resolve a dangling link and fail: read the attributes of the entry itself.
function Remove-Link($target) {
    $attrs = [System.IO.File]::GetAttributes($target)
    if ($attrs -band [System.IO.FileAttributes]::Directory) { [System.IO.Directory]::Delete($target) }
    else { [System.IO.File]::Delete($target) }
}

# A real root file whose content equals the kit source is the kit's own copy (what `harness
# configure sdd` writes while absorbing, or the fallback when linking failed last time), not the
# team's: it becomes a link instead of being kept as "yours" + *.new forever. Line endings are
# ignored so a copy Git converted to CRLF still matches.
function Is-KitCopy($item, $source) {
    if ($item.PSIsContainer -or -not (Test-Path -LiteralPath $source -PathType Leaf)) { return $false }
    if ($item.Length -gt 4MB) { return $false }
    $a = [System.IO.File]::ReadAllText($item.FullName) -replace "`r`n", "`n"
    $b = [System.IO.File]::ReadAllText($source) -replace "`r`n", "`n"
    return ($a -eq $b)
}

# Write-New TARGET SOURCE LABEL — the kit version next to yours: a copy for files, a pointer
# note for directories (a real directory named *.new would be discovered as a skill by some harnesses).
function Write-New {
    param($target, $source, $label)
    $newPath = "$target.new"
    if (Test-Path $source -PathType Container) {
        $rel = $source.Substring($root.Length).TrimStart('\', '/') -replace '\\', '/'
        Set-Content -Path $newPath -Value "Kept your $label. The kit version lives at $rel - merge what you need there, then delete this note."
    } else {
        Copy-Item -Path $source -Destination $newPath -Force
    }
    Write-Host "conflict (kept yours): $label - kit version at $label.new"
    $script:Conflicts += $label
}

# Relative path from the link's directory to its source, in Windows form (what mklink stores).
# Computed on path segments - System.Uri reads '#' as a fragment and decodes '%20', so a repo
# under C:\Projects\C#\ or a folder literally named 'a%20b' would get a broken target.
function Get-RelativeTarget($target, $source) {
    $from = [System.IO.Path]::GetFullPath((Split-Path -Path $target -Parent)).TrimEnd('\').Split('\')
    $to = [System.IO.Path]::GetFullPath($source).TrimEnd('\').Split('\')
    $common = 0
    while ($common -lt $from.Length -and $common -lt $to.Length -and ($from[$common] -ieq $to[$common])) { $common++ }
    if ($common -eq 0) { return [System.IO.Path]::GetFullPath($source) }   # different drive: absolute
    $up = @()
    for ($i = $common; $i -lt $from.Length; $i++) { $up += '..' }
    $down = @($to[$common..($to.Length - 1)])
    return (($up + $down) -join '\')
}

# New-Link TARGET SOURCE
# 1. A relative symlink through mklink: the same object Git creates with core.symlinks=true, so
#    a later `git status` stays clean. mklink needs no admin rights when Developer Mode is on
#    (PowerShell 5.1's New-Item -ItemType SymbolicLink always demands elevation, so its symlink
#    branch never ran for a normal user and every file ended up as a hardlink).
# 2. Otherwise a junction for directories (never needs rights) and a hardlink for files.
function New-Link {
    param($target, $source)
    $isDir = Test-Path -LiteralPath $source -PathType Container
    $rel = Get-RelativeTarget $target $source
    $switch = if ($isDir) { '/D ' } else { '' }
    & cmd /c "mklink $switch`"$target`" `"$rel`" >nul 2>&1"
    if ($LASTEXITCODE -eq 0) { return }
    if ($isDir) {
        New-Item -ItemType Junction -Path $target -Target $source | Out-Null
    } else {
        New-Item -ItemType HardLink -Path $target -Value $source | Out-Null
    }
}

# Link-Item TARGET SOURCE LABEL
# link -> refresh · missing -> create · real file/dir -> keep + .new
function Link-Item {
    param($target, $source, $label)
    $null = New-Item -ItemType Directory -Force -Path (Split-Path $target)
    if (Test-Path -LiteralPath $target) {
        $item = Get-Item -LiteralPath $target -Force
        if (Is-Link $item) {
            if (Test-LinkPointsTo $item $source) {
                Write-Host "kept      link    : $label (already points at the kit)"
                return
            }
            Remove-Link $target
            New-Link $target $source
            Write-Host "refreshed link    : $label"
        } elseif (Is-DegradedLink $item) {
            [System.IO.File]::Delete($item.FullName)
            New-Link $target $source
            Write-Host "replaced degraded : $label (plain file left by a checkout without core.symlinks)"
        } elseif (Is-KitCopy $item $source) {
            [System.IO.File]::Delete($item.FullName)
            New-Link $target $source
            Write-Host "replaced copy     : $label (same content as the kit file)"
        } else {
            Write-New $target $source $label
        }
    } else {
        New-Link $target $source
        Write-Host "created   link    : $label"
    }
}

# Prune-StaleLinks DIR — a broken link into sdd/ is always ours and always noise: it is what
# is left after a `*.new` conflict is resolved and the file deleted. Links resolving anywhere
# else are the user's and are left alone.
function Prune-StaleLinks {
    param($dir)
    if (-not (Test-Path $dir)) { return }
    foreach ($entry in Get-ChildItem $dir -Force -ErrorAction SilentlyContinue) {
        if (-not $entry.LinkType) { continue }
        $rawTarget = $entry.Target | Select-Object -First 1
        if (-not $rawTarget) { continue }
        if ($rawTarget -notmatch '[\\/]sdd[\\/]|^sdd[\\/]') { continue }
        # A relative symlink target is relative to the link's own directory, not to the cwd.
        $resolves = Test-Path -LiteralPath (Get-LinkTargetPath $entry)
        if (-not $resolves) {
            Remove-Link $entry.FullName
            Write-Host "pruned dangling  : $($entry.Name)"
        }
        elseif ($entry.Name -like "*.new") {
            Remove-Link $entry.FullName
            Write-Host "pruned .new link : $($entry.Name)"
        }
    }
}

# Link-Items DIR SOURCE_DIR LABEL — one link per kit item inside an existing real directory.
function Link-Items {
    param($dir, $sourceDir, $label, $filter = "*")
    $null = New-Item -ItemType Directory -Force -Path $dir
    Prune-StaleLinks $dir
    foreach ($item in Get-ChildItem $sourceDir -Filter $filter -Force) {
        # `*.new` is a merge artifact of `update sdd`, not a surface to expose.
        if ($item.Name -like "*.new") { continue }
        # A Claude Code plugin (sdd/skills/sdd-mod) has no SKILL.md: only .claude/ gets it.
        if ((Test-Path (Join-Path $item.FullName ".claude-plugin")) -and -not $label.StartsWith(".claude/")) { continue }
        Link-Item (Join-Path $dir $item.Name) $item.FullName "$label/$($item.Name)"
    }
}

# Link-Dir TARGET SOURCE LABEL
# Whole-directory junction when the target is free or already a link. A REAL directory
# (the team's own .claude/agents, .claude/skills, .claude/commands, .github/agents...) is kept
# and the kit items are linked inside it.
function Link-Dir {
    param($target, $source, $label)
    $null = New-Item -ItemType Directory -Force -Path (Split-Path $target)
    if (Test-Path -LiteralPath $target) {
        $item = Get-Item -LiteralPath $target -Force
        if (Is-Link $item) {
            if (Test-LinkPointsTo $item $source) {
                Write-Host "kept      link    : $label (already points at the kit)"
                return
            }
            Remove-Link $target
            New-Link $target $source
            Write-Host "refreshed link    : $label"
        } elseif (Is-DegradedLink $item) {
            [System.IO.File]::Delete($item.FullName)
            New-Link $target $source
            Write-Host "replaced degraded : $label (plain file left by a checkout without core.symlinks)"
        } else {
            Write-Host "merging into real dir: $label (your files are kept)"
            Link-Items $target $source ($label -replace ' ->.*$', '')
        }
    } else {
        New-Link $target $source
        Write-Host "created   link    : $label"
    }
}

# ─── 1. agents ────────────────────────────────────────────────────────────────
$agentSource = Join-Path $root "sdd\agents"
Link-Dir (Join-Path $root ".claude\agents") $agentSource ".claude/agents -> sdd/agents"
Link-Dir (Join-Path $root ".github\agents") $agentSource ".github/agents -> sdd/agents"

# ─── 2. skills ────────────────────────────────────────────────────────────────
$skillsSource = Join-Path $root "sdd\skills"

# .claude/skills → full junction (or per-skill links inside the team's real directory)
Link-Dir (Join-Path $root ".claude\skills") $skillsSource ".claude/skills -> sdd/skills"

# .github/skills: individual junctions per SDD skill (preserves the repo's own skills)
Link-Items (Join-Path $root ".github\skills") $skillsSource ".github/skills"

# ─── 3. prompts ───────────────────────────────────────────────────────────────
$promptsSource = Join-Path $root "sdd\prompts"

# .claude/prompts → full junction
Link-Dir (Join-Path $root ".claude\prompts") $promptsSource ".claude/prompts -> sdd/prompts"

# .claude/commands → prompts as Claude Code slash commands
Link-Dir (Join-Path $root ".claude\commands") $promptsSource ".claude/commands -> sdd/prompts"

# .github/prompts: individual links per SDD prompt (preserves non-SDD prompts)
Link-Items (Join-Path $root ".github\prompts") $promptsSource ".github/prompts" "*.prompt.md"

# ─── 4. dual-harness: root AGENTS.md, CLAUDE.md and GEMINI.md ────────────────
# A real root file is kept (+ .new). `harness configure sdd` absorbs it into sdd/dual-harness/
# before calling this script, so on a fresh install these become links right away.
$dualHarnessDir = Join-Path $root "sdd\dual-harness"
foreach ($name in @("AGENTS.md", "CLAUDE.md", "GEMINI.md")) {
    Link-Item (Join-Path $root $name) (Join-Path $dualHarnessDir $name) $name
}

# .github/copilot-instructions.md: a REAL file on purpose (GitHub's server-side readers do
# not follow links). Seeded once from the kit; afterwards it belongs to the project.
$copilotTarget = Join-Path $root ".github\copilot-instructions.md"
New-Item -ItemType Directory -Force -Path (Join-Path $root ".github") | Out-Null
if (Test-Path $copilotTarget) {
    Write-Host "kept             : .github/copilot-instructions.md (yours)"
} else {
    Copy-Item -Path (Join-Path $dualHarnessDir "copilot-instructions.md") -Destination $copilotTarget
    Write-Host "created  file    : .github/copilot-instructions.md (seeded from sdd/dual-harness/)"
}

# ─── 5. Antigravity / Gemini CLI ─────────────────────────────────────────────

# .agents/rules: individual links per SDD rule (preserves user rules)
Link-Items (Join-Path $root ".agents\rules") (Join-Path $dualHarnessDir "rules") ".agents/rules" "*.md"

# .agents/skills: individual junctions per SDD skill (shared SKILL.md standard:
# Antigravity and Gemini CLI both read this directory; preserves user skills)
Link-Items (Join-Path $root ".agents\skills") $skillsSource ".agents/skills"

# .agent/workflows: SDD prompts as Antigravity workflows (/start-sdd-cycle, ...)
$workflowsDir = Join-Path $root ".agent\workflows"
$null = New-Item -ItemType Directory -Force -Path $workflowsDir
foreach ($promptFile in Get-ChildItem $promptsSource -Filter "*.prompt.md") {
    $stem = $promptFile.Name -replace "\.prompt\.md$", ""
    Link-Item (Join-Path $workflowsDir "$stem.md") $promptFile.FullName ".agent/workflows/$stem.md"
}

# .gemini/commands: generated TOML wrappers so Gemini CLI exposes the SDD prompts
# as slash commands. Regenerated on every run; user commands (no marker) untouched.
$geminiCommandsDir = Join-Path $root ".gemini\commands"
$null = New-Item -ItemType Directory -Force -Path $geminiCommandsDir
foreach ($promptFile in Get-ChildItem $promptsSource -Filter "*.prompt.md") {
    $stem = $promptFile.Name -replace "\.prompt\.md$", ""
    $target = Join-Path $geminiCommandsDir "$stem.toml"
    if ((Test-Path $target) -and -not (Select-String -Path $target -Pattern "generated by setup-agents" -Quiet)) {
        Write-Host "skipped (real file): .gemini/commands/$stem.toml"
        continue
    }
    $toml = @"
# generated by setup-agents from sdd/prompts/$stem.prompt.md - do not edit
description = "SDD: $stem (fuente: sdd/prompts/$stem.prompt.md)"

prompt = """
@{sdd/prompts/$stem.prompt.md}

{{args}}
"""
"@
    Write-Utf8NoBom $target $toml
    Write-Host "generated        : .gemini/commands/$stem.toml"
}

# PSCustomObject -> hashtable, recursively. `ConvertFrom-Json -AsHashtable` exists only from
# PowerShell 6 and this script runs under Windows PowerShell 5.1 (`pnpm setup:agents` invokes
# `powershell`): there the parameter is unknown, the call throws, and until v0.14.1 the catch
# swallowed it and the block below rewrote settings.json with nothing but context.fileName.
function ConvertTo-Hashtable($obj) {
    if ($obj -is [System.Collections.IDictionary]) { return $obj }
    if ($obj -is [System.Management.Automation.PSCustomObject]) {
        $h = @{}
        foreach ($p in $obj.PSObject.Properties) { $h[$p.Name] = ConvertTo-Hashtable $p.Value }
        return $h
    }
    # Unary comma: without it PowerShell unrolls the array on return - [] becomes $null and
    # ["mcp"] becomes "mcp", and the merge below would write that back into the user's file.
    if ($obj -is [array]) { return ,@($obj | ForEach-Object { ConvertTo-Hashtable $_ }) }
    return $obj
}

# .gemini/settings.json: make Gemini CLI also read AGENTS.md (merge, never clobber)
$settingsPath = Join-Path $root ".gemini\settings.json"
$null = New-Item -ItemType Directory -Force -Path (Split-Path $settingsPath)
$settings = @{}
$settingsReadable = $true
if (Test-Path -LiteralPath $settingsPath) {
    try { $settings = ConvertTo-Hashtable (Get-Content -LiteralPath $settingsPath -Raw | ConvertFrom-Json) }
    catch { $settingsReadable = $false }
}
if (-not $settingsReadable) {
    # Never overwrite what we could not read.
    Write-Host "! skipped         : .gemini/settings.json could not be parsed - left untouched (add GEMINI.md and AGENTS.md to context.fileName by hand)"
} else {
    if (-not $settings.ContainsKey("context") -or $null -eq $settings["context"]) { $settings["context"] = @{} }
    $current = $settings["context"]["fileName"]
    $names = @()
    if ($current -is [array]) { $names = @($current) } elseif ($current) { $names = @($current) }
    $missing = @("GEMINI.md", "AGENTS.md") | Where-Object { $names -notcontains $_ }
    if ($missing.Count -eq 0) {
        # Nothing to add: leave the file byte-for-byte alone. ConvertTo-Json here and
        # JSON.stringify in setup-rtk.mjs format the same content differently, so rewriting it
        # on every run made each run dirty the file the other one had just written.
        Write-Host "present          : .gemini/settings.json (context.fileName)"
    } else {
        $settings["context"]["fileName"] = @($names + $missing)
        Write-Utf8NoBom $settingsPath (($settings | ConvertTo-Json -Depth 10) + "`n")
        Write-Host "merged           : .gemini/settings.json (context.fileName)"
    }
}

# rtk: pre-command hooks for Claude Code / Gemini CLI + the binary itself (best effort;
# sdd/tools.json is the switch, `pnpm sdd:rtk -- --disable` turns it off).
if (Get-Command node -ErrorAction SilentlyContinue) {
    & node (Join-Path $root "sdd\scripts\setup-rtk.mjs")
} else {
    Write-Host "skipped (no node): rtk hooks - run pnpm sdd:rtk once node is available"
}

# The root instruction files are what every harness reads first. `harness configure sdd` removes
# the originals after absorbing them into sdd/dual-harness/ and relies on this script to link
# them back; if linking failed for any reason, a real copy is worse than a link but infinitely
# better than a repo with no instructions at all.
foreach ($name in @("AGENTS.md", "CLAUDE.md", "GEMINI.md")) {
    $rootFile = Join-Path $root $name
    $sourceFile = Join-Path $dualHarnessDir $name
    if (-not (Test-Path -LiteralPath $rootFile) -and (Test-Path -LiteralPath $sourceFile -PathType Leaf)) {
        Copy-Item -LiteralPath $sourceFile -Destination $rootFile
        Write-Host "! copied  file    : $name (could not link it - re-run pnpm setup:agents to try again)"
    }
}

Write-Host ""
if ($script:Conflicts.Count -gt 0) {
    Write-Host "! $($script:Conflicts.Count) item(s) kept as yours - the kit version is next to each as *.new:"
    foreach ($c in $script:Conflicts) { Write-Host "    ~ $c  ->  $c.new" }
    Write-Host "  Merge what you need, delete the .new (or delete yours and re-run pnpm setup:agents)."
    Write-Host "  Root AGENTS.md/CLAUDE.md/GEMINI.md: 'harness configure sdd' absorbs them into sdd/dual-harness/ for you."
}
Write-Host "done."

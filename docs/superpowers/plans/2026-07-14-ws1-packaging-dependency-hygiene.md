# WS1 — Packaging & Dependency Hygiene Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `@e-burgos/tucu-ui@2.6.1` with a clean dependency tree, working tree-shaking, and a smaller/safer npm artifact (spec findings PKG-1..PKG-8).

**Architecture:** All changes are configuration and import-level edits in `ui/tucu-ui` plus one publish-script guard. No component behavior changes. Each task is independently buildable and committable; the final task measures the artifact and gates the release.

**Tech Stack:** pnpm 9 workspace, Nx 22 (`pnpm nx run tucu-ui:build`), Vite 7 lib mode + `vite-plugin-dts`, Tailwind CSS v4 vite plugin.

## Global Constraints

- Release type: **patch** (`2.6.1`) — no public API changes, no component behavior changes.
- Package manager: always `pnpm` (`pnpm install`, `pnpm nx run …`). Node >= 22.
- Library build command: `pnpm nx run tucu-ui:build` (output: `dist/ui/tucu-ui`).
- Lint command: `pnpm tucu-ui:lint`.
- Commits in English, conventional-commit style, one commit per task.
- Work happens on branch `feat/tucu-ui-audit-remediation` (already checked out).
- **Spec deviation (PKG-3), agreed:** `documentation/` chunks in dist are lazy chunks of *exported* showcase pages (`MacOSShowcase`, `UiComponents`, … are public API consumed by `apps/test-lib` and documented for consumers). They must NOT be removed in a patch. PKG-3 is addressed by bundling the 698 per-file `.d.ts` into one rolled-up `index.d.ts`. Extracting demo pages from the package is deferred (spec WS2+/3.0 candidate).

## Baseline (measure before touching anything — Task 0)

Record these numbers; Task 8 compares against them:
- `npm pack --dry-run` in `dist/ui/tucu-ui` → tarball size + file count.
- `du -sh dist/ui/tucu-ui` and `find dist/ui/tucu-ui -name '*.d.ts' | wc -l`.

---

### Task 0: Baseline metrics

**Files:**
- Create: `docs/superpowers/plans/ws1-baseline.txt` (scratch record, committed for traceability)

**Interfaces:**
- Consumes: current `dist/ui/tucu-ui` (rebuild first).
- Produces: baseline numbers used by Task 8's acceptance check.

- [ ] **Step 1: Rebuild the library from a clean state**

Run:
```bash
pnpm nx run tucu-ui:build
```
Expected: build succeeds, `dist/ui/tucu-ui/index.mjs`, `index.js`, `index.css`, `index.d.ts` exist.

- [ ] **Step 2: Record baseline**

Run:
```bash
{
  echo "== WS1 baseline $(date +%F) =="
  (cd dist/ui/tucu-ui && npm pack --dry-run 2>&1 | tail -5)
  du -sh dist/ui/tucu-ui
  find dist/ui/tucu-ui -name '*.d.ts' | wc -l
} | tee docs/superpowers/plans/ws1-baseline.txt
```
Expected: file written with package size (~15MB unpacked), total files, and `.d.ts` count (~698).

- [ ] **Step 3: Commit**

```bash
git add docs/superpowers/plans/ws1-baseline.txt
git commit -m "chore(ws1): record packaging baseline metrics"
```

---

### Task 1: Remove MCP server from runtime dependencies (PKG-1)

**Files:**
- Modify: `ui/tucu-ui/package.json` (dependencies block)

**Interfaces:**
- Consumes: nothing.
- Produces: dependency tree without `@e-burgos/tucu-ui-mcp`; later tasks assume this entry is gone.

- [ ] **Step 1: Verify nothing in library source imports the MCP package**

Run:
```bash
grep -rn "from '@e-burgos/tucu-ui-mcp'\|require('@e-burgos/tucu-ui-mcp'" ui/tucu-ui/src || echo CLEAN
```
Expected: `CLEAN` (only doc-string mentions exist, e.g. `demo/pages/mcp/**` code samples — those are strings, not imports).

- [ ] **Step 2: Remove the dependency**

In `ui/tucu-ui/package.json`, delete this line from `dependencies`:
```json
    "@e-burgos/tucu-ui-mcp": "^0.6.0",
```

- [ ] **Step 3: Reinstall and build**

Run:
```bash
pnpm install
pnpm nx run tucu-ui:build
```
Expected: install and build succeed.

- [ ] **Step 4: Verify it is gone from the resolved tree**

Run:
```bash
grep -n "tucu-ui-mcp" ui/tucu-ui/package.json dist/ui/tucu-ui/package.json || echo REMOVED
```
Expected: `REMOVED`.

- [ ] **Step 5: Commit**

```bash
git add ui/tucu-ui/package.json pnpm-lock.yaml
git commit -m "fix(deps): drop @e-burgos/tucu-ui-mcp from library runtime dependencies"
```

---

### Task 2: Remove duplicated `react-router` and `@tanstack/table-core` deps (PKG-4)

**Files:**
- Modify: `ui/tucu-ui/package.json`
- Modify: `ui/tucu-ui/src/datatable/tanstack-table/index.ts`
- Modify: `ui/tucu-ui/src/datatable/common/helpers/convertColumns.ts:4`

**Interfaces:**
- Consumes: nothing.
- Produces: all TanStack types are imported from `@tanstack/react-table` (which re-exports `table-core`); no source file references `@tanstack/table-core` or bare `react-router`.

- [ ] **Step 1: Confirm no source imports from bare `react-router`**

Run:
```bash
grep -rn "from 'react-router'" ui/tucu-ui/src --include='*.ts*' | grep -v "react-router-dom" || echo CLEAN
```
Expected: `CLEAN`. (If any line appears, change that import to `react-router-dom` — v7 re-exports everything — before continuing.)

- [ ] **Step 2: Fix the double re-export in tanstack-table/index.ts**

Replace the entire content of `ui/tucu-ui/src/datatable/tanstack-table/index.ts`:
```ts
export * from '@tanstack/react-table';
```
(The previous second line `export * from '@tanstack/table-core';` was redundant — `@tanstack/react-table` already re-exports the core.)

- [ ] **Step 3: Fix the RowData import**

In `ui/tucu-ui/src/datatable/common/helpers/convertColumns.ts`, replace:
```ts
import { ColumnDef } from '@tanstack/react-table';
import { RowData } from '@tanstack/table-core';
```
with:
```ts
import { ColumnDef, RowData } from '@tanstack/react-table';
```

- [ ] **Step 4: Remove both deps from package.json**

In `ui/tucu-ui/package.json` `dependencies`, delete:
```json
    "@tanstack/table-core": "^8.21.3",
```
```json
    "react-router": "^7.16.0",
```

- [ ] **Step 5: Reinstall, typecheck via build, lint**

Run:
```bash
pnpm install
pnpm nx run tucu-ui:build
pnpm tucu-ui:lint
```
Expected: both succeed (dts generation in the build is the typecheck).

- [ ] **Step 6: Commit**

```bash
git add ui/tucu-ui/package.json pnpm-lock.yaml ui/tucu-ui/src/datatable/tanstack-table/index.ts ui/tucu-ui/src/datatable/common/helpers/convertColumns.ts
git commit -m "fix(deps): remove redundant react-router and @tanstack/table-core dependencies"
```

---

### Task 3: Replace `lodash` with `lodash-es` (PKG-5)

**Files:**
- Modify: `ui/tucu-ui/package.json`
- Modify: `ui/tucu-ui/src/datatable/hooks/useScrollableTable.tsx:2`

**Interfaces:**
- Consumes: nothing.
- Produces: single lodash import site now `import { debounce } from 'lodash-es'`.

- [ ] **Step 1: Confirm the only lodash import site**

Run:
```bash
grep -rn "lodash" ui/tucu-ui/src --include='*.ts*' | grep -v "lodash-es"
```
Expected: exactly one hit — `ui/tucu-ui/src/datatable/hooks/useScrollableTable.tsx:2:import debounce from 'lodash/debounce';`. (If more appear, convert each the same way in this task.)

- [ ] **Step 2: Change the import**

In `ui/tucu-ui/src/datatable/hooks/useScrollableTable.tsx`, replace:
```ts
import debounce from 'lodash/debounce';
```
with:
```ts
import { debounce } from 'lodash-es';
```

- [ ] **Step 3: Swap the dependency**

In `ui/tucu-ui/package.json`:
- `dependencies`: replace `"lodash": "^4.18.1"` with `"lodash-es": "^4.17.21"`.
- `devDependencies`: replace `"@types/lodash": "^4.17.24"` with `"@types/lodash-es": "^4.17.12"`.

- [ ] **Step 4: Reinstall and build**

Run:
```bash
pnpm install
pnpm nx run tucu-ui:build
```
Expected: success.

- [ ] **Step 5: Verify no CJS lodash in the ESM bundle**

Run:
```bash
grep -c "require(\"lodash\"\|require('lodash'" dist/ui/tucu-ui/index.mjs || echo NO_CJS_LODASH
```
Expected: `NO_CJS_LODASH` (or `0`).

- [ ] **Step 6: Commit**

```bash
git add ui/tucu-ui/package.json pnpm-lock.yaml ui/tucu-ui/src/datatable/hooks/useScrollableTable.tsx
git commit -m "fix(deps): replace lodash with lodash-es for ESM tree-shaking"
```

---

### Task 4: Enable tree-shaking with `sideEffects` allowlist (PKG-2)

**Files:**
- Modify: `ui/tucu-ui/package.json:39`

**Interfaces:**
- Consumes: nothing.
- Produces: `"sideEffects": ["**/*.css"]` — Task 8's tree-shaking smoke test relies on this.

- [ ] **Step 1: Change the field**

In `ui/tucu-ui/package.json`, replace:
```json
  "sideEffects": true,
```
with:
```json
  "sideEffects": ["**/*.css"],
```

- [ ] **Step 2: Rebuild and check the field propagates to dist**

Run:
```bash
pnpm nx run tucu-ui:build
node -e "console.log(JSON.stringify(require('./dist/ui/tucu-ui/package.json').sideEffects))"
```
Expected: `["**/*.css"]`.

- [ ] **Step 3: Commit**

```bash
git add ui/tucu-ui/package.json
git commit -m "fix(pkg): scope sideEffects to CSS files to enable tree-shaking"
```

---

### Task 5: Clean up `exports` map — remove non-standard `style` occurrences (PKG-6, PKG-8)

**Files:**
- Modify: `ui/tucu-ui/package.json:8` (root `style` field) and the `"."` export condition block

**Interfaces:**
- Consumes: nothing.
- Produces: CSS is exposed ONLY via the `"./styles"` subpath (unchanged, already used by consumers as `@e-burgos/tucu-ui/styles`).

- [ ] **Step 1: Remove root-level `style` field**

In `ui/tucu-ui/package.json`, delete the line:
```json
  "style": "./index.css",
```

- [ ] **Step 2: Remove the invalid `style` condition from the `"."` export**

Replace:
```json
    ".": {
      "types": "./index.d.ts",
      "style": "./index.css",
      "import": "./index.mjs",
      "require": "./index.js"
    },
```
with:
```json
    ".": {
      "types": "./index.d.ts",
      "import": "./index.mjs",
      "require": "./index.js"
    },
```
Keep `"./styles": "./index.css"` untouched. Keep legacy `main`/`module`/`types` fields untouched (PKG-8: kept deliberately for legacy tooling; `exports` is the source of truth).

- [ ] **Step 3: Rebuild and verify resolution**

Run:
```bash
pnpm nx run tucu-ui:build
node -e "console.log(require.resolve('./dist/ui/tucu-ui/index.css'))"
node -e "const e=require('./dist/ui/tucu-ui/package.json').exports; console.log(e['./styles'], JSON.stringify(e['.']))"
```
Expected: css path prints; `./styles` → `./index.css`; `"."` has no `style` key.

- [ ] **Step 4: Commit**

```bash
git add ui/tucu-ui/package.json
git commit -m "fix(pkg): drop non-standard style field and exports condition"
```

---

### Task 6: Bundle type definitions into a single rolled-up `index.d.ts` (PKG-3)

**Files:**
- Modify: `ui/tucu-ui/vite.config.ts:42-45` (dts plugin options)

**Interfaces:**
- Consumes: nothing.
- Produces: one `index.d.ts` at dist root (instead of ~698 mirrored files); `types` entries in package.json already point at `./index.d.ts` so no package.json change is needed.

- [ ] **Step 1: Enable rollupTypes**

In `ui/tucu-ui/vite.config.ts`, replace:
```ts
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
```
with:
```ts
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
      rollupTypes: true,
    }),
```

- [ ] **Step 2: Rebuild and count `.d.ts` files**

Run:
```bash
pnpm nx run tucu-ui:build
find dist/ui/tucu-ui -name '*.d.ts' | wc -l
ls -lh dist/ui/tucu-ui/index.d.ts
```
Expected: count drops from ~698 to a single-digit number (rollup emits `index.d.ts`; a couple of auxiliary files are acceptable); `index.d.ts` exists and is non-trivial (> 100KB).

**Fallback if rollup fails** (api-extractor errors on complex types are possible): revert Step 1, instead narrow what dts mirrors by excluding demo sources:
```ts
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
      exclude: ['src/demo/**', 'src/__tests__/**', 'src/__mocks__/**'],
    }),
```
Then verify the build still type-resolves `import { Button } from '@e-burgos/tucu-ui'` (note: demo page exports lose explicit types under the fallback — if `src/index.ts` re-exports demo pages, the fallback is NOT acceptable; stop and surface to the human).

- [ ] **Step 3: Type-consumer smoke test**

Run:
```bash
cat > /tmp/ws1-types-check.ts <<'EOF'
import type { CollapseProps } from './dist/ui/tucu-ui/index';
const p: CollapseProps = { label: 'x' };
EOF
pnpm exec tsc --noEmit --skipLibCheck --moduleResolution bundler --module esnext /tmp/ws1-types-check.ts
```
Expected: exits 0 (adjust the imported type name if `CollapseProps` is not exported — pick any exported prop type from `dist/ui/tucu-ui/index.d.ts`).

- [ ] **Step 4: Commit**

```bash
git add ui/tucu-ui/vite.config.ts
git commit -m "fix(build): roll up type definitions into a single index.d.ts"
```

---

### Task 7: Publish script verifies build artifacts before publishing (PKG-7)

**Files:**
- Modify: `scripts/publish.mjs` (add helper + two call sites)

**Interfaces:**
- Consumes: nothing.
- Produces: `verifyDistArtifacts()` — throws (via existing `error()` helper, which exits) when any required artifact is missing; called in publish-only mode and in the bump-mode publish path, in both cases immediately before the `pnpm npm publish` execution.

- [ ] **Step 1: Add the verification helper**

In `scripts/publish.mjs`, after the existing helper functions (near `versionExistsOnNpm`, around line 90), add:
```js
/**
 * Aborts the publish when any required build artifact is missing from dist.
 */
function verifyDistArtifacts() {
  const distDir = resolve(ROOT, 'dist/ui/tucu-ui');
  const required = ['index.js', 'index.mjs', 'index.d.ts', 'index.css', 'package.json'];
  const missing = required.filter((f) => !existsSync(resolve(distDir, f)));
  if (missing.length > 0) {
    error(
      `dist/ui/tucu-ui is missing required artifacts: ${missing.join(', ')}.\n` +
        '  Run "pnpm nx run tucu-ui:build" and retry.'
    );
  }
  success('Dist artifacts verified (index.js, index.mjs, index.d.ts, index.css, package.json).');
}
```
Ensure `existsSync` is imported at the top of the file — extend the existing `node:fs` import (e.g. `import { readFileSync, writeFileSync, existsSync } from 'node:fs';` — match the file's current import style).

- [ ] **Step 2: Call it before both publish executions**

In the publish-only block, insert `verifyDistArtifacts();` immediately before:
```js
  log(`Publishing ${packageName}@${currentVersion} to npm...`);
```
Locate the bump-mode publish execution later in the file (search for the second `pnpm npm publish` occurrence) and insert `verifyDistArtifacts();` immediately before it as well.

- [ ] **Step 3: Verify the failure path**

Run:
```bash
mv dist/ui/tucu-ui/index.mjs /tmp/ws1-index.mjs
node scripts/publish.mjs publish --skip-build --dry-run; echo "exit=$?"
mv /tmp/ws1-index.mjs dist/ui/tucu-ui/index.mjs
```
Expected: script aborts with the "missing required artifacts: index.mjs" message and non-zero exit BEFORE any npm command runs. (If `--dry-run` is not honored in publish-only mode, do NOT run without it — inspect the code path instead and rely on the missing-file abort happening before the publish exec.)

- [ ] **Step 4: Verify the success path (dry)**

Run:
```bash
node scripts/publish.mjs publish --skip-build --dry-run; echo "exit=$?"
```
Expected: "Dist artifacts verified" appears; no real publish occurs (dry-run).

- [ ] **Step 5: Commit**

```bash
git add scripts/publish.mjs
git commit -m "fix(publish): verify dist artifacts exist before publishing"
```

---

### Task 8: Final verification, artifact measurement, and tree-shaking smoke test

**Files:**
- Modify: `docs/superpowers/plans/ws1-baseline.txt` (append "after" numbers)
- Create: `/tmp/ws1-treeshake/` (throwaway consumer, NOT committed)

**Interfaces:**
- Consumes: everything from Tasks 1-7.
- Produces: go/no-go evidence for the `2.6.1` release.

- [ ] **Step 1: Full rebuild + lint + tests**

Run:
```bash
pnpm install
pnpm nx run tucu-ui:build
pnpm tucu-ui:lint
pnpm nx run tucu-ui:test 2>/dev/null || echo "NOTE: no test target — skipped"
```
Expected: build and lint pass.

- [ ] **Step 2: Measure and append to baseline record**

Run:
```bash
{
  echo "== WS1 after $(date +%F) =="
  (cd dist/ui/tucu-ui && npm pack --dry-run 2>&1 | tail -5)
  du -sh dist/ui/tucu-ui
  find dist/ui/tucu-ui -name '*.d.ts' | wc -l
} | tee -a docs/superpowers/plans/ws1-baseline.txt
```
Expected vs baseline: `.d.ts` count collapsed to ≤ 5; unpacked size reduced (CSS is untouched in WS1, so most of the drop comes from the d.ts tree); file count significantly lower.

- [ ] **Step 3: Tree-shaking smoke test with a throwaway Vite consumer**

Run:
```bash
rm -rf /tmp/ws1-treeshake && mkdir -p /tmp/ws1-treeshake/src && cd /tmp/ws1-treeshake
cat > package.json <<'EOF'
{ "name": "ws1-treeshake", "private": true, "type": "module" }
EOF
cat > src/main.ts <<'EOF'
import { Button } from '@e-burgos/tucu-ui';
console.log(typeof Button);
EOF
cat > index.html <<'EOF'
<!doctype html><html><body><script type="module" src="/src/main.ts"></script></body></html>
EOF
npm install vite react react-dom /Users/macbookprom2/github/UI/tucu-ui/dist/ui/tucu-ui
npx vite build
grep -rl "recharts\|ResponsiveContainer" dist/assets/ && echo "FAIL: chart code bundled" || echo "PASS: tree-shaken"
du -sh dist/assets
```
Expected: `PASS: tree-shaken` — importing only `Button` must not pull recharts/DataTable code into the consumer bundle. (If `Button` is not an export name, pick any small exported component from `dist/ui/tucu-ui/index.d.ts`.)
**If FAIL:** the barrel `src/index.ts` or intermediate chunks still defeat tree-shaking — record the finding, do not block the release on it (it's an improvement over `sideEffects: true` regardless), and surface it to the human for triage.

- [ ] **Step 4: Showcase visual sanity check**

Run the showcase and click through 3 pages (home, /components/ui-components, /components/datatable):
```bash
pnpm test-lib
```
Expected: no blank pages, no console errors related to missing modules/styles.

- [ ] **Step 5: Commit the measurement record**

```bash
git add docs/superpowers/plans/ws1-baseline.txt
git commit -m "chore(ws1): record post-remediation packaging metrics"
```

- [ ] **Step 6: Release gate (human)**

Do NOT publish from this plan. Report the before/after numbers and hand off:
the human triggers `pnpm tucu-ui:publish:patch` (which now runs the Task 7
artifact guard) after reviewing the branch/PR.

# tucu-ui Library Audit — Remediation Spec

**Date:** 2026-07-14
**Scope:** `ui/tucu-ui` (published as `@e-burgos/tucu-ui@2.6.0`)
**Status:** Approved backlog — each workstream is an independent implementation cycle
**Out of scope:** `apps/demo`, `apps/test-lib` app shell, `tools/mcp-server` internals, Nx/CI config

## 1. Context & Goals

End-to-end audit of the tucu-ui component library covering code bugs, visual
discrepancies, dependency health, packaging, and CSS architecture. Findings were
produced by four parallel specialized review agents (dependencies, packaging,
components+hooks, datatable+themes), an adversarial verification pass over every
critical/high code finding (5/5 confirmed, 0 refuted), and a live browser review
of the showcase app (`apps/test-lib`, light/dark + macOS themes).

Goal: a prioritized, actionable backlog organized into 6 workstreams, each
shippable as its own release cycle via an implementation plan.

**Severity legend:** 🔴 critical · 🟠 high · 🟡 medium · ⚪ low
**`[V]`** = adversarially verified against source by an independent agent.
**`[L]`** = reproduced/observed live in the browser during the visual review.

---

## 2. WS1 — Packaging & Dependency Hygiene

**Target release: `2.6.1` (patch, config-only, highest impact/effort ratio).**
Reduces the published package from 15MB to ~9MB (before WS2 lands) and restores
tree-shaking for every consumer.

### PKG-1 🔴 MCP server shipped as runtime dependency
`ui/tucu-ui/package.json` — `@e-burgos/tucu-ui-mcp@^0.6.0` is listed under
`dependencies`. Every consumer installs an MCP agentic server they never import.
**Fix:** remove from `dependencies` (move to repo tooling / devDependencies).
**Acceptance:** `npm ls @e-burgos/tucu-ui-mcp` in a fresh consumer install returns empty.

### PKG-2 🔴 `sideEffects: true` disables tree-shaking
`ui/tucu-ui/package.json:39`. Consumers bundle the entire library even when
importing one component.
**Fix:** set `"sideEffects": ["**/*.css"]`.
**Acceptance:** a Vite/Rollup consumer importing only `Button` does not include
DataTable/recharts chunks in its production bundle (verify with bundle analyzer).

### PKG-3 🔴 `files: ["**/*"]` ships 698 `.d.ts` + 3MB documentation chunks
The npm tarball includes demo/documentation `Section-*.js` chunks that consumers
never load.
**Fix:** restrict `files` to the real entry artifacts (`index.js`, `index.mjs`,
`index.d.ts`, `index.css`, `README.md`, `CHANGELOG.md`) or exclude the
`documentation/` output from the build; verify the vite `chunkFileNames` rule
isn't emitting demo chunks into the lib output.
**Acceptance:** `npm pack --dry-run` lists no `documentation/` files; tarball ≤ half current size.

### PKG-4 🟠 Duplicated dependencies
`react-router` + `react-router-dom@7` (dom re-exports router in v7) and
`@tanstack/table-core` + `@tanstack/react-table` (react-table already depends on core).
**Fix:** remove `react-router` and `@tanstack/table-core`; import everything from
the remaining packages.
**Acceptance:** build + tests green with both packages removed.

### PKG-5 🟠 `lodash` (CJS) instead of `lodash-es`
Blocks tree-shaking of utility imports in an ESM library.
**Fix:** replace dependency and imports with `lodash-es` (types via `@types/lodash-es`).
**Acceptance:** no `require("lodash")` in the built `index.mjs`.

### PKG-6 🟡 Non-standard `style` field in root and in exports conditions
`style` is not a valid Node.js exports condition; it appears both at package root
and inside the `"."` export.
**Fix:** keep the `./styles` subpath export as the single CSS entry; drop the
non-standard occurrences.
**Acceptance:** CSS import works via `@e-burgos/tucu-ui/styles` in Vite and webpack.

### PKG-7 ⚪ Publish script does not verify build artifacts
`scripts/publish.mjs` can publish a stale/incomplete `dist`.
**Fix:** assert `index.js`, `index.mjs`, `index.d.ts`, `index.css` exist (and are
newer than the last git tag, optionally) before `npm publish`.
**Acceptance:** publish aborts with a clear error when any artifact is missing.

### PKG-8 ⚪ Legacy `main`/`module`/`types` duplicate `exports`
Keep for compatibility, but document `exports` as the source of truth.

---

## 3. WS2 — Tailwind CSS Architecture (dual export)

**Target release: `2.7.0` (non-breaking, additive).**
Root cause of consumer utility classes being overridden (observed by the
maintainer in real projects; import order `tailwindcss` → `tucu-ui/styles` is
currently mandatory and still leaks styles into the app).

**Diagnosis (three combined mechanisms):**
1. `src/assets/css/globals.css:22` does `@import 'tailwindcss'` — the published
   `index.css` is a **full compiled Tailwind build** (preflight + theme + all
   utilities, 3.7MB). A Tailwind-using consumer ends up with two complete
   Tailwind instances whose `theme/base/components/utilities` layers merge;
   within each layer, last import wins → order sensitivity.
2. `src/assets/css/base.css` intentionally places `html:root` / `html.dark`
   rules (font-family, color, background, border-color + semantic vars)
   **outside any `@layer`**, which beats every layered consumer rule regardless
   of import order.
3. `@theme` registers custom color steps (`blue-0..90`, etc.) and unprefixed
   custom utilities (`text-h1`, `text-body`, …) that merge into the shared
   layers; `@source` directives scan `node_modules` of framer-motion / swiper /
   recharts (globals.css:816-819), generating junk utilities and most of the
   3.7MB.

### CSS-1 🔴 Add a tokens-only `./theme` export for Tailwind consumers
**Fix:** new build artifact `theme.css` containing: `@theme` tokens, component
styles wrapped in `@layer tucu-ui`, `@utility` registrations, and the current
unlayered root rules re-scoped into `@layer tucu-ui` (or under an opt-in
`.tucu-ui-root` class) — **no** `@import 'tailwindcss'`, no preflight, no
generated utilities. Add `"./theme": "./theme.css"` to `exports`.
Consumer usage:
```css
@import 'tailwindcss';
@import '@e-burgos/tucu-ui/theme';
@source '../node_modules/@e-burgos/tucu-ui';
```
**Acceptance:** in a test consumer app, arbitrary import order does not alter
app-defined utility classes; tucu-ui components render correctly with the
consumer's single Tailwind instance generating utilities.

### CSS-2 🟠 Remove `@source` scans of `node_modules`
framer-motion/lucide/swiper/recharts sources must not be scanned for class names.
**Acceptance:** compiled `index.css` drops significantly (target ≤ 1MB); visual
regression pass over the showcase shows no missing styles.

### CSS-3 🟠 Eliminate always-win unlayered root rules from the compiled bundle
Keep `./styles` working for non-Tailwind consumers, but move the unlayered
`html:root`/`html.dark` rules into a named layer so they no longer defeat
consumer CSS by design. Document `./styles` as the no-Tailwind path and
`./theme` as the Tailwind path; add a deprecation note for mixing `./styles`
with a consumer Tailwind build.
**Acceptance:** consumer utilities (e.g. `bg-red-500` on body) win over library
defaults when using `./theme`; showcase unaffected.

### CSS-4 🟡 Prefix custom utilities
`text-h1`, `text-body`, `text-caption`, etc. are generic enough to collide with
consumer code. Prefix as `tucu-text-h1` (keep old names as deprecated aliases in
`./styles` only).
**Acceptance:** `./theme` exposes only prefixed utilities.

---

## 4. WS3 — Functional Bugs

**Target release: `2.6.2` (or fold into `2.7.0`).**

### BUG-1 🟠 [V] FormField silently breaks react-hook-form binding
`src/components/forms/form-field.tsx:94` — `baseProps` spreads `...field` first,
then `...children.props` last; for any child other than
Select/Checkbox/Radio/PinCode, a consumer-supplied `value`/`onChange` replaces
RHF's binding.
**Fix:** spread `children.props` first and apply `field` bindings on top for the
generic branch (mirroring the special-cased branches).
**Acceptance:** test: `<FormField name="email"><Input onChange={spy} /></FormField>`
— both the spy and RHF state receive the change.

### BUG-2 🟠 [V] PinCode writes the literal string "undefined"
`src/components/inputs/pin-code.tsx:148` — clearing a digit via forward-delete /
select-all / cut makes `inputValues[inputValues.length - 1]` return `undefined`,
which coerces to `"undefined"` when assigned to `input.value`.
**Fix:** `inputRefs.current[index].value = inputValues.at(-1) ?? '';` and clear
the corresponding state slot.
**Acceptance:** unit test simulating an onChange with empty value leaves the box empty.

### BUG-3 🟠 [V] DataTable "first page" button can set `pageSize: 0`
`src/datatable/components/ManualPagination/index.tsx:111` — uses
`pagination?.pageSize || 0` while every sibling button uses the local `pageSize`
(defaulted to 5). `pageSize: 0` → `pageCount = Infinity`, broken pagination UI.
**Fix:** use the local `pageSize` variable.
**Acceptance:** with `manualPagination.pagination` undefined, clicking "first
page" keeps a valid page size.

### BUG-4 🟠 [V] DataTable reset restores stale customized state
`src/datatable/context/index.tsx:654` — `resetStoreData` clears the persisted
store but then re-applies `initialState` from a closure computed from the
pre-reset store values; the visible table never resets until a full reload.
**Fix:** compute hard defaults (independent of `storeXxx` values) and use those
in `resetStoreData`.
**Acceptance:** customize order/sort/filters → click reset → table visually
returns to defaults without reload.

### BUG-5 🟡 Modal close animation timer mismatch
`src/components/dialog/modal.tsx:86` — unmounts after 200ms while transitions
are `duration-300`; visible flash on close. **Fix:** align timings.

### BUG-6 🟡 Escape closes every stacked Modal
`modal.tsx:126` — each open modal registers its own document-level Escape
handler. **Fix:** shared open-modal stack; only topmost closes.

### BUG-7 🟡 Body scroll can stay locked forever
`src/hooks/use-lock-body-scroll.ts` — effect cleanup restores `paddingRight` but
removes `overflow: hidden` only on the `else` branch, not on unmount.
**Fix:** unconditionally remove the override in cleanup.
**Acceptance:** navigating away with an open modal leaves the page scrollable.

### BUG-8 🟡 Toast: index keys + store sync clobbers dismiss animations
`src/components/notifications/toast.tsx:58,82` — `key={index}` plus
unconditional `setVisibleToasts(toasts)` resets a toast mid-dismiss when another
toast arrives. **Fix:** key by `toast.id`; merge store updates preserving local
`dismissing` flags.

### BUG-9 🟡 DataTable `initialColumns` memo omits core deps
`src/datatable/context/index.tsx:391` — `defaultColumns`, `offset`,
`isSubComponent`, `isRowActions`, `isRowSelection` missing from deps; column prop
updates after mount are silently ignored. **Fix:** complete the dependency array
(and remove the eslint-disable).

### BUG-10 🟡 `removeTableCache` doesn't reset live stores
`src/datatable/hooks/useResetCacheVersion.ts:49` — clears localStorage only;
mounted tables keep stale in-memory state. **Fix:** also reset the matching
store in `storeMap`.

### BUG-11 🟡 zustand persist lacks `version`/`migrate`
`src/datatable/hooks/useDataTableStore.tsx:190` — whole-`tableData` replacement
on rehydrate makes any future `ITableData` field addition silently `undefined`
for existing users. **Fix:** add `version` + `migrate` (or field-level merge).

### BUG-12 ⚪ CommandPalette overlay not portaled
`src/components/macos/sonoma/feedback/command-palette.tsx` — `fixed inset-0`
rendered in-tree breaks under transformed ancestors (framer-motion containers).
**Fix:** `createPortal(..., document.body)` like Modal/Drawer/Select.

---

## 5. WS4 — Accessibility

**Target release: `2.7.0`.**

### A11Y-1 🟠 [V] Modal has no focus trap
`src/components/dialog/modal.tsx` — Tab escapes the open dialog into background
content (WCAG 2.4.3); DrawerContainer already implements the correct pattern.
**Fix:** reuse Drawer's Tab-cycle logic (extract a `useFocusTrap` hook shared by
Modal, Drawer, CommandPalette).
**Acceptance:** keyboard-only walkthrough cannot leave an open modal.

### A11Y-2 🟡 CommandPalette (`aria-modal`) has no focus trap
Same fix via the shared hook.

### A11Y-3 ⚪ Select `aria-controls` points to a non-existent id
`src/components/inputs/select.tsx:532` — trigger references
`select-listbox` but the portal dropdown has no id. **Fix:** `useId()`-based id
applied to the dropdown.

### A11Y-4 ⚪ Hardcoded duplicate id in TabListMobileSelect
`src/components/tabs/tab.tsx:505` — `tablist-mobile-listbox` duplicates across
instances. **Fix:** per-instance `useId()`.

### A11Y-5 ⚪ Collapse trigger missing `aria-expanded`/`aria-controls` and `type="button"`
`src/components/common/collapse.tsx:43` — inside a form the trigger submits;
screen readers get no expanded state. **Fix:** add `type="button"`,
`aria-expanded`, `aria-controls` + content id.

---

## 6. WS5 — Performance

**Target release: `2.7.x`.**

### PERF-1 🟡 `use-window-scroll` walks the entire DOM per scroll tick
`src/hooks/use-window-scroll.ts:52` — `querySelectorAll('*')` +
`getComputedStyle` on every scroll event (bound to window, document capture, and
every scrollable container). Severe jank on non-trivial pages.
**Fix:** discover scrollable containers once (mount + MutationObserver) and cache.
**Acceptance:** scroll handler does no `querySelectorAll` in profiling trace.

### PERF-2 ⚪ DataTable scroll debounce recreated per render
`src/datatable/hooks/useScrollableTable.tsx:46` — new lodash `debounce` instance
every render defeats debouncing. **Fix:** memoize + cancel on unmount.

### PERF-3 🟡 3.7MB compiled CSS
Resolved structurally by CSS-2 (tracked here for the `./styles` artifact).

---

## 7. WS6 — Dependency Updates & Theme/UX Polish

**Target release: `2.7.x`.**

### DEP-1 🟡 swiper 2 majors behind (`^12.2.0` → `^14.x`)
Review v13/v14 breaking changes; the vendored `swiper-react` wrapper must be
re-validated.

### DEP-2 🟡 Minor updates batch
`lucide-react` 1.17→1.24 (lockfile pinned behind range), `react-hook-form`
7.77→7.81, `recharts` 3.8→3.9, `framer-motion` patches.
**Acceptance:** `pnpm update` + showcase visual pass green.

### UX-1 🟡 [L] Switching color scheme discards the user's light/dark preference
`src/themes/hooks/use-theme.tsx:100,110` — `getDefaultConfigForScheme` hardcodes
`mode: 'dark'` for `macos`/`macos-tahoe`; reproduced live (light mode reverted
to dark on entering the macOS showcase).
**Fix:** preserve the current `mode` on scheme switch (only apply scheme default
when no explicit user preference exists).
**Acceptance:** set light → switch scheme → mode stays light.

### UX-2 ⚪ [L] Switch label layout is fragile
`src/components/inputs/switch.tsx:138-174` — both ON/OFF labels always rendered
at fixed pixel offsets inside a 56px track (knob hides the inactive one); custom
longer labels overflow. Also dead code: `backgroundImage: url('')` (line 121).
**Fix:** render only the active label (or size the track to content); remove the
dead style. Consider `aria-hidden` on the covered label meanwhile.

### UX-3 ⚪ [L] PinCode demo shares one state across its 4 examples
`src/demo/pages/components/input-components-sections/PinCodeSection.tsx:15` —
typing in one demo fills all four. **Fix:** independent state per example.

---

## 8. Release Plan Summary

| Release | Workstreams | Nature |
|---------|-------------|--------|
| `2.6.1` | WS1 (PKG-1..8) | Patch, config-only, immediate |
| `2.6.2` | WS3 verified bugs (BUG-1..4) | Patch |
| `2.7.0` | WS2 (CSS dual export), WS3 remainder, WS4 | Minor, additive |
| `2.7.x` | WS5, WS6 | Minor/patches |

Every workstream gets its own implementation plan (superpowers:writing-plans),
branch (`fix/ws1-packaging`, `feat/ws2-css-theme-export`, …), and a verification
pass (build + tests + showcase visual check) before release.

## 9. Risks & Notes

- **WS2 is the highest-risk workstream**: the `./theme` artifact needs a real
  consumer test app (Tailwind v4 + Vite) in CI or as a manual checklist before
  release. `apps/demo` (package-consumer app) is the natural testbed.
- PKG-3/CSS-2 both shrink the artifact; land PKG-3 first (independent) and
  re-measure before CSS-2.
- 37 findings total; 5 were adversarially verified (`[V]`) and 3 reproduced
  live (`[L]`). The remaining medium/low findings had a single reviewer —
  re-confirm each against source during implementation before coding the fix.
- Unverified findings that turn out invalid should be closed with a note in the
  implementation plan, not silently dropped.

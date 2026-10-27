# spec-e-burgos-002 cycle-01 — journal

## Qué pasó
Una dependencia nueva de la librería (tailwind-merge) pasó typecheck, tests y build, pero salió inlineada con una ruta `../node_modules/.pnpm/...` porque la lista de externals de Vite era manual. Recién falló al abrir la demo contra el tarball. Además, `pnpm tucu-ui:test-local` reescribió todos los `package.json` del workspace y dos entraron en commits.

## Lección
Probar todo cambio de dependencias de la librería contra el tarball (`pnpm tucu-ui:test-local` + abrir la demo) antes de cerrar, y revertir los `package.json`/lockfile que ese script reescribe antes de cualquier `git add`.

## Costo evitable
Un rebuild más dos commits de reversión. El check `check-built-imports` ahora lo detecta en CI.

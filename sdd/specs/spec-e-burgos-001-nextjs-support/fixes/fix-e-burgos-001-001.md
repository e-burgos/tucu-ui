# FIX-e-burgos-001-001 — Checkout limpio roto (next-demo y .nxignore)

| Campo | Valor |
| ----- | ----- |
| **Tipo** | BUGFIX |
| **Severidad** | high |
| **Spec** | spec-e-burgos-001-nextjs-support |
| **Estado** | implemented |

## Problema

`apps/next-demo` dependía de `file:../../dist/ui/tucu-ui` dentro del workspace pnpm. En un checkout limpio `dist/` no existe, y `pnpm install --frozen-lockfile` falla con `ENOENT` antes de llegar al build. Los workflows `publish-tucu-ui` y `publish-mcp` arrancan con ese install, así que habrían fallado al pushear los tags de 3.4.0 y 0.10.0.

## Problema 2

La instalación del kit SDD reemplazó `.nxignore` (quedó solo `sdd/templates`) y se perdió `examples/`. En un checkout limpio Nx procesa las configs de `examples/micro-frontends`, que importan paquetes no instalados, y falla `Failed to process project graph`: los builds de los workflows de publicación no corren.

## Solución

- `.nxignore` vuelve a ignorar `examples/` y conserva `sdd/templates`.

- `pnpm-workspace.yaml` excluye `apps/next-demo`, igual que `examples/`.
- `apps/next-demo` tiene su propio `pnpm-lock.yaml` y `packageManager` fijado (`pnpm@9.15.1`).
- `sync-lib` instala con `pnpm install --ignore-workspace --frozen-lockfile` después de `tucu-ui:build`; `lint` también depende de `sync-lib`.

## Validación

Clon limpio de main reprodujo el `ENOENT` y, una vez resuelto, el fallo del grafo de Nx. Con el fix, en un clon limpio corren `pnpm install --frozen-lockfile`, `pnpm nx run tucu-ui:build` y `tucu-ui-mcp:build` (los pasos de `publish-*`). Con el fix el lockfile raíz no referencia `dist/`, y `pnpm nx run-many -t lint e2e -p next-demo` queda en verde.

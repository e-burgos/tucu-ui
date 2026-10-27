# spec-e-burgos-002 cycle-03 — componentes

## Qué pasó
- Los cuatro implementadores agregaron tokens en `assets/css/tokens/*.css`, importados desde `theme-core.css`. Tests, typecheck, build y los checks pasaron, pero `dist` no incluía la carpeta `tokens/`, porque el plugin de copia solo conocía `macos/`. Solo apareció al levantar la demo con el tarball: Tailwind no resolvía el `@import`.
- `./next` se tipa con un `.d.ts` escrito a mano, y `ThemeModeScript` salió en 3.6.0 sin declarar. Lo reportó un consumidor.

## Lección
- Todo archivo que la librería publica fuera del grafo de JS (CSS copiado, `.d.ts` a mano) necesita un check automático de paridad; los tests unitarios no lo ven. Ya existen dos: CSS `@import` en `check-built-imports` y exports/tipos de `./next` en vitest.

## Costo evitable
- Un release roto evitado por la prueba en el navegador (3.7.0) y una release con tipos faltantes (3.6.0).

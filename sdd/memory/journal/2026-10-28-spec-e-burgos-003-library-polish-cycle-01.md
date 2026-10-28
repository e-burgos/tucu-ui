# spec-e-burgos-003-library-polish cycle-01 (2026-10-28)

## Qué pasó
Después de corregir Button, volví a correr `pnpm tucu-ui:test-local`. La demo siguió mostrando el build anterior: el tarball conserva el nombre de la versión (`e-burgos-tucu-ui-3.9.1.tgz`) y pnpm reutilizó el paquete en caché. Además, la demo corre con la clase `macos` en `html`, cuyas reglas pisan los colores de Alert, Button e inputs. Por eso la comparación light/dark no medía los tokens. Y alternar `html.dark` a mano hace que la app re-sincronice el modo, lo que mete ruido en toda la página.

## Lección
Al repetir `test-local` sin cambiar la versión, sincronizar `dist/ui/tucu-ui/` sobre el paquete instalado (o verificar con `cmp`) y borrar `apps/demo/node_modules/.vite`. Para verificar la cascada de tokens, montar elementos sueltos con sus `data-*` fuera del shell macOS y quitar la clase `macos`.

## Costo evitable
Unas tres vueltas de build + reinicio de la demo midiendo un build viejo, y diagnósticos falsos de «override que no gana», hasta notar el caché y el tema macOS.

# Constitución — libs/tucu-docs

> Versión 1.0 | Última actualización: cycle-0 (inicial)
> Ruta real: `ui/tucu-docs` (id lógico SDD `libs/tucu-docs`). Paquete `@e-burgos/tucu-docs` 0.0.0, no se publica en npm.

## 1. Propósito

- **Tipo:** react docs pages library (privada)
- **Rol en el sistema:** páginas de documentación de la librería (https://ui.estebanburgos.com.ar): introducción, design-system, componentes, formularios, datatable, macOS, blockchain, features y MCP, con ejemplos vivos que consumen `@e-burgos/tucu-ui`. La monta `apps/demo`, que es quien se despliega como sitio.

## 2. Stack tecnológico

- React + `react-dom`
- Dependencia directa de `@e-burgos/tucu-ui` (usa `ThemeProvider`, `LucideIcons` y componentes)
- TypeScript; sin build propio: sus targets Nx son solo `lint`

## 3. Estructura y patrones

- `src/index.ts` reexporta `src/pages`
- `src/pages/<sección>/`: `introduction`, `design-system`, `components`, `form-system`, `datatable`, `macos`, `blockchain`, `features`, `mcp`
- Una página por tema, con ejemplos que importan solo desde la API pública de `@e-burgos/tucu-ui`

## 4. Convenciones propias

- Los ejemplos de la doc usan únicamente la API pública de la lib; nada de imports internos de `ui/tucu-ui/src`
- Todo componente o prop nuevo de la lib se documenta acá y se refleja en el MCP
- Sin comentarios en el código (excepción: una línea en inglés para un POR QUÉ no obvio)
- Verificación: `pnpm nx run tucu-docs:lint` y build de `apps/demo` (`pnpm nx run demo:build`)

> Las actualizaciones por ciclo/fix van como fragmentos aditivos en `updates/` —
> este archivo base solo lo modifica la consolidación (ver `sdd/context/context_prompt.md` sección 6).

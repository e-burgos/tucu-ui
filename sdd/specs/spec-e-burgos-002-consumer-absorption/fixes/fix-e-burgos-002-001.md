# FIX-e-burgos-002-001 — DrawerContainer bloquea los clics de su contenido, y la demo usaba tucu-ui 3.1.0

- **Tipo:** BUGFIX · **Severidad:** high · **Fecha:** 2026-10-27
- **Reporte:** el dueño, en la demo: en una ventana angosta, el menú de contenidos (TOC) en drawer no responde a ningún clic, y páginas nuevas como `/design-system/layout-system/marketing-layout` no funcionan.

## Causa
1. `DrawerContainer` pone `pointer-events-none` en el wrapper del panel (que en mobile ocupa todo el ancho, para que el backdrop reciba el clic de cierre), pero dejaba a los hijos heredarlo. Solo funcionaban los consumidores que agregaban `pointer-events-auto` por su cuenta (Sidebar, SidebarMenu y el TOC de Tahoe). El TOC default y el de Sonoma no respondían. Ya pasaba en 3.4.0.
2. `apps/demo` y `ui/tucu-docs` declaraban `@e-burgos/tucu-ui: ^3.1.0` y el lockfile resolvía 3.1.0. Las páginas de docs de 3.5 a 3.9 importan componentes que esa versión no tiene. Las pruebas de los ciclos usaron el tarball local (`test-local`), que oculta ese desfase.

## Arreglo
- `DrawerContainer` envuelve los children en `<div data-tucu="drawer-content" class="pointer-events-auto h-full w-fit max-w-full">`. El backdrop sigue cerrando con un clic fuera del panel.
- `apps/demo` y `ui/tucu-docs` pasan a `^3.9.1`, que es este patch, publicado.
- Test: `src/__tests__/dialog/drawer-container.test.tsx` (los hijos reciben el clic dentro del wrapper `pointer-events-none`).

## Verificación
- La demo con el tarball, a 888 px: el TOC despliega categorías, navega y cierra el drawer.
- Recorrido de las 215 rutas de la documentación sin errores de render.

# FIX-e-burgos-003-002 — El cierre del Select no deja un timer suelto

> Tipo: BUGFIX · Severidad: low · Spec: spec-e-burgos-003-library-polish · 2026-11-13

## Problema
`closeDropdown` del `Select` arma un `setTimeout` de 100 ms (la animación de salida) y devuelve su
limpieza, pero nadie la usa. Si el `Select` se desmonta antes de los 100 ms el timer dispara igual
(en jsdom, Vitest lo reporta como error no manejado), y si se vuelve a abrir antes de los 100 ms el
timer viejo cierra el dropdown recién abierto. Los consumidores (sdd-harness Studio) esperaban
100 ms entre aperturas en sus tests para esquivarlo.

## Solución
El timer de cierre vive en un ref: abrir lo cancela, cerrar de nuevo lo reemplaza y el desmontaje
lo limpia. Además el trigger trata «cerrándose» como cerrado: mientras corre la animación de salida
`isOpen` sigue en `true`, y un clic volvía a cerrar en vez de abrir. Tests: reabrir antes de los
100 ms deja el dropdown abierto, sin reapertura cierra a los 100 ms, y desmontar con el cierre
pendiente no deja timers.

## Archivos
- `ui/tucu-ui/src/components/inputs/select.tsx`
- `ui/tucu-ui/src/__tests__/inputs/select-close-timer.test.tsx`

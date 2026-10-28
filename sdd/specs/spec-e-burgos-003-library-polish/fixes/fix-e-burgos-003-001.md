# FIX-e-burgos-003-001 — Tone Tokens: los temas macOS ganan sobre los tokens

- **Tipo:** IMPROVEMENT · **Severidad:** low · **Fecha:** 2026-10-28
- **Reporte:** cierre del cycle-01: el ejemplo vivo de override por token de la sección «Tone Tokens» no se ve en la demo.

## Causa
Las reglas de los temas macOS (`html.macos-tahoe [data-tucu='alert'][data-variant=…]` y su par de Sonoma) están fuera de `@layer`, así que les ganan a las reglas de tono de `@layer components` y al `className` del consumidor. La demo corre con macOS, por eso las dos alertas del ejemplo se veían iguales.

## Arreglo
- `ToneTokensSection.tsx`: aviso de que con un tema macOS activo sus colores ganan y los tokens de tono aplican con los temas por defecto.
- El texto del ejemplo vivo indica cambiar a un tema por defecto para ver el override.
- La librería no cambia; el cambio de cascada de macOS queda en el backlog de la spec.

## Verificación
- Demo en el navegador: la sección muestra el aviso y el texto nuevo sin errores de consola.

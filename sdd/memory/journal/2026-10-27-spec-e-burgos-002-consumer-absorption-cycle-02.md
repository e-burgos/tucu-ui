# spec-e-burgos-002 cycle-02 — temas

## Qué pasó
- `.claude/launch.json` declara el puerto 4200 para la demo, pero Vite la sirve en 3000. La primera navegación quedó en negro y se perdieron vueltas recargando hasta leer `preview_logs`.
- Los comandos de shell que encadenaban `git commit` con `sed -n` o `grep -n` fueron bloqueados por el hook `block-no-verify`, que confunde `-n` con `--no-verify`.

## Lección
- Ante una preview en blanco, leer `preview_logs` para confirmar el puerto real antes de recargar. En un comando con `git commit`, no encadenar otros comandos con `-n`.

## Costo evitable
- Unas 6 llamadas de herramienta (recargas de la preview y commits reintentados).

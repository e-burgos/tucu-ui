# macOS Sonoma 14 — Design Resources

Archivos CSS listos para usar en la implementación del Spec 03.

## Estructura

```
css/
  macos-fonts.css         → @font-face declarations para SF Pro (local + woff2 fallback)
  macos-foundations.css   → Tokens globales: tipografía, radii, spacing, colors, transitions
  macos-buttons.css       → Overrides para Button (solid/ghost/transparent × colores × shapes)
  macos-cards.css         → Overrides para Card, CardContainer, InfoCard, PanelCard, etc.
  macos-inputs.css        → Overrides para Input, Select, Checkbox, Radio, Switch, etc.
  macos-dialogs.css       → Overrides para Modal, Drawer, Sidebar
  macos-tables.css        → Overrides para BasicTable, Pagination
  macos-navigation.css    → Overrides para Tabs, ParamTab, CollapsibleMenu
  macos-feedback.css      → Overrides para Alert, Badge, Toast, Spinner, Progressbar
  macos-typography.css    → Overrides para headings, paragraphs, links
  macos-layouts.css       → Overrides para header, sidebar, scrollbar
  macos-misc.css          → Overrides para Carousel, Tooltip, Tag, Avatar, etc.
  index.css               → Barrel import
```

## Fuentes tipográficas

Los archivos `.woff2` de SF Pro no están incluidos (licencia Apple).

### Cómo obtener los `.woff2`:

1. Ir a https://developer.apple.com/fonts/
2. Descargar "SF Pro" (DMG)
3. Montar el DMG → instalar el .pkg
4. Los `.otf` quedan en `/Library/Fonts/SF-Pro-Display-*.otf` y `/Library/Fonts/SF-Pro-Text-*.otf`
5. Convertir a `.woff2`:

   ```bash
   # Instalar woff2 tools
   brew install woff2

   # Convertir los archivos necesarios
   cd /Library/Fonts
   for f in SF-Pro-Display-Regular SF-Pro-Display-Medium SF-Pro-Display-Semibold SF-Pro-Display-Bold \
            SF-Pro-Text-Regular SF-Pro-Text-Medium SF-Pro-Text-Semibold; do
     woff2_compress "${f}.otf"
   done
   ```

6. Copiar los `.woff2` resultantes a `ui/tucu-ui/src/assets/fonts/sf-pro/`

### Archivos necesarios

| Archivo                         | Weight | Optical Size    |
| ------------------------------- | ------ | --------------- |
| `SF-Pro-Display-Regular.woff2`  | 400    | Display (≥20pt) |
| `SF-Pro-Display-Medium.woff2`   | 500    | Display         |
| `SF-Pro-Display-Semibold.woff2` | 600    | Display         |
| `SF-Pro-Display-Bold.woff2`     | 700    | Display         |
| `SF-Pro-Text-Regular.woff2`     | 400    | Text (<20pt)    |
| `SF-Pro-Text-Medium.woff2`      | 500    | Text            |
| `SF-Pro-Text-Semibold.woff2`    | 600    | Text            |

## Referencias oficiales

- [Apple HIG — Typography](https://developer.apple.com/design/human-interface-guidelines/typography)
- [Apple HIG — Color](https://developer.apple.com/design/human-interface-guidelines/color)
- [Apple HIG — Materials](https://developer.apple.com/design/human-interface-guidelines/materials)
- [Apple HIG — Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)
- [Apple HIG — Toggles](https://developer.apple.com/design/human-interface-guidelines/toggles)
- [Apple Fonts](https://developer.apple.com/fonts/)

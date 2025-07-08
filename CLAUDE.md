# CodeViz Research Context

> **Note**: This file contains research context from CodeViz. Most recent contexts are at the bottom.

---

## Research Query

Costruir el mapa completo de esta repositorio

*Session: 3325f2c08510f509812b0d62a1d7c87b | Generated: 7/4/2025, 9:50:20 AM*

### Analysis Summary

# Repositorio `tucu-ui` - Mapa Completo

Este repositorio, `tucu-ui`, es una monorepo que alberga una biblioteca de componentes de interfaz de usuario (`ui/tucu-ui`) y una aplicación de demostración (`apps/demo`) que consume estos componentes. Está configurado con Nx, lo que facilita la gestión de múltiples proyectos dentro de un único repositorio.

## Arquitectura de Alto Nivel

El proyecto se estructura en dos componentes principales:

*   **`ui/tucu-ui`**: La biblioteca central de componentes de UI.
*   **`apps/demo`**: Una aplicación de demostración que utiliza y muestra los componentes de `tucu-ui`.

La relación principal es que `apps/demo` depende de `ui/tucu-ui` para sus elementos de interfaz de usuario.

## Componentes Principales

### **`ui/tucu-ui`**

La biblioteca **`tucu-ui`** [package.json](ui/tucu-ui/package.json) es el corazón de este repositorio, proporcionando un conjunto reutilizable de componentes de React, hooks y utilidades para construir interfaces de usuario.

#### Propósito
Actúa como un sistema de diseño y una colección de bloques de construcción de UI que pueden ser consumidos por otras aplicaciones.

#### Partes Internas Clave
La estructura interna de `ui/tucu-ui` se organiza principalmente dentro de su directorio [src](ui/tucu-ui/src):

*   **`components/`**: Contiene la mayoría de los componentes de UI, organizados por categorías funcionales.
    *   **`auth/`**: Componentes relacionados con la autenticación, como formularios de inicio de sesión y registro [sign-in-form.tsx](ui/tucu-ui/src/components/auth/sign-in-form.tsx).
    *   **`blockchain/`**: Componentes específicos para interacciones con blockchain, como tarjetas de monedas y colecciones NFT [coin-card.tsx](ui/tucu-ui/src/components/blockchain/coin-card.tsx).
    *   **`buttons/`**: Componentes de botones reutilizables [button/index.tsx](ui/tucu-ui/src/components/buttons/button/index.tsx).
    *   **`cards/`**: Componentes de tarjetas para mostrar información estructurada [author-card.tsx](ui/tucu-ui/src/components/cards/author-card.tsx).
    *   **`common/`**: Componentes de UI de uso general.
    *   **`forms/`**: Elementos y estructuras para la construcción de formularios.
    *   **`headlessui/`**: Componentes que probablemente envuelven o extienden componentes de la biblioteca Headless UI.
    *   **`icons/`**: Componentes para iconos SVG.
    *   **`layouts/`**: Componentes para la estructura general de la página o secciones.
    *   **`notifications/`**: Componentes para mostrar notificaciones o mensajes al usuario.
    *   **`typography/`**: Componentes para la gestión de estilos de texto.
    *   **`utils/`**: Utilidades de componentes.
*   **`hooks/`**: Contiene una colección de hooks personalizados de React que encapsulan lógica reutilizable [use-breakpoint.ts](ui/tucu-ui/src/hooks/use-breakpoint.ts), [use-copy-to-clipboard.ts](ui/tucu-ui/src/components/auth/sign-in-form.tsx).
*   **`libs/`**: Contiene bibliotecas de utilidad o funciones auxiliares que no son componentes de React ni hooks [range-map.ts](ui/tucu-ui/src/libs/range-map.ts).
*   **`themes/`**: Gestiona la configuración de temas y estilos, incluyendo la integración con Tailwind CSS [tailwind.theme.config.js](ui/tucu-ui/src/themes/tailwind.theme.config.js) y hooks para el manejo de temas [use-theme.tsx](ui/tucu-ui/src/themes/use-theme.tsx).
*   **`assets/`**: Almacena recursos estáticos como imágenes [images/logo.svg](ui/tucu-ui/src/assets/images/logo.svg) y archivos CSS globales o específicos [css/globals.css](ui/tucu-ui/src/assets/css/globals.css).
*   **`storybook/`**: Contiene configuraciones y archivos de historias para Storybook, utilizados para desarrollar, documentar y probar componentes de forma aislada.
*   **`index.ts`**: El archivo de entrada principal de la biblioteca, que exporta todos los componentes y hooks públicos [index.ts](ui/tucu-ui/src/index.ts).
*   **`styles.css`**: Archivo CSS principal para estilos globales o base [styles.css](ui/tucu-ui/src/styles.css).

#### Relaciones Externas
**`tucu-ui`** es una biblioteca independiente diseñada para ser importada y utilizada por otras aplicaciones. Sus componentes y hooks son consumidos directamente por proyectos como `apps/demo`.

### **`apps/demo`**

La aplicación **`demo`** [package.json](apps/demo/package.json) es una aplicación de ejemplo que demuestra el uso de la biblioteca `ui/tucu-ui`.

#### Propósito
Sirve como un entorno de prueba y una referencia para ver cómo los componentes de `tucu-ui` se integran en una aplicación real.

#### Partes Internas Clave
La estructura interna de `apps/demo` se encuentra en su directorio [src](apps/demo/src):

*   **`main.tsx`**: El punto de entrada principal de la aplicación React, donde se renderiza el componente raíz [main.tsx](apps/demo/src/main.tsx).
*   **`pages/`**: Contiene los diferentes componentes de página que componen la aplicación de demostración.
    *   **`App1.tsx`**: Una página de ejemplo [App1.tsx](apps/demo/src/pages/App1.tsx).
    *   **`App2.tsx`**: Otra página de ejemplo [App2.tsx](apps/demo/src/pages/App2.tsx).
    *   **`Layout.tsx`**: Un componente de diseño que probablemente define la estructura común de las páginas [Layout.tsx](apps/demo/src/pages/Layout.tsx).
*   **`index.css`**: Estilos específicos de la aplicación de demostración [index.css](apps/demo/src/index.css).
*   **`vite-env.d.ts`**: Archivo de declaración de tipos para Vite [vite-env.d.ts](apps/demo/src/vite-env.d.ts).

#### Relaciones Externas
**`apps/demo`** importa y utiliza activamente los componentes, hooks y utilidades exportados por la biblioteca **`ui/tucu-ui`**. Por ejemplo, las páginas dentro de `pages/` probablemente importan y renderizan componentes de `ui/tucu-ui/components`.

## Configuración y Herramientas del Repositorio

El repositorio utiliza varias herramientas y archivos de configuración para su desarrollo y construcción:

*   **Nx**: Un sistema de compilación extensible para monorepos, configurado a través de [nx.json](nx.json) y [project.json](ui/tucu-ui/project.json) (para cada proyecto).
*   **TypeScript**: Para el tipado estático, con configuraciones en [tsconfig.base.json](tsconfig.base.json), [tsconfig.json](ui/tucu-ui/tsconfig.json), etc.
*   **ESLint**: Para el linting de código, configurado en [.eslintrc.json](.eslintrc.json) y [eslint.config.js](apps/demo/eslint.config.js).
*   **Prettier**: Para el formato de código, con configuración en [.prettierrc](.prettierrc).
*   **Jest**: Para pruebas unitarias, configurado en [jest.config.ts](jest.config.ts).
*   **Vite**: Un bundler para el desarrollo frontend, configurado en [vite.config.ts](ui/tucu-ui/vite.config.ts) y [vite.config.ts](apps/demo/vite.config.ts).
*   **Tailwind CSS**: Un framework CSS utility-first, configurado en [tailwind.config.js](ui/tucu-ui/tailwind.config.js).
*   **Storybook**: Para el desarrollo y documentación de componentes de UI, configurado en [.storybook/main.ts](ui/tucu-ui/.storybook/main.ts).
*   **npm**: Para la gestión de paquetes, con [package.json](package.json) y [package-lock.json](package-lock.json) en la raíz y en cada proyecto.
*   **Git**: Para el control de versiones, con un archivo [.gitignore](.gitignore) para especificar archivos y directorios a ignorar.
*   **Netlify**: Configuración para despliegue continuo en [netlify.toml](netlify.toml).
*   **EditorConfig**: Para mantener estilos de codificación consistentes entre diferentes editores e IDEs [.editorconfig](.editorconfig).
*   **VS Code**: Configuración específica del editor en [.vscode/settings.json](.vscode/settings.json).


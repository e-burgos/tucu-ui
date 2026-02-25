# Tucu UI

Una moderna y completa librería de componentes React construida con TypeScript, Tailwind CSS v4, y diseñada para crear aplicaciones web listas para producción. Incluye **generación automática de layouts**, **sistema de routing avanzado** con soporte para Standalone y Micro Frontends (MFE), **sistemas de formularios potentes** con React Hook Form, **5000+ iconos**, **componentes especializados para blockchain**, y **cumplimiento de accesibilidad WCAG 2.1 AA**.

## 🌟 Documentación

- **📚 [Documentación en Vivo](https://tucu-ui.netlify.app/)** - Documentación completa de componentes
- **🔧 [Ejemplos de Componentes](https://tucu-ui.netlify.app/components)** - Ve todas las variaciones y casos de uso

## 🚀 Características Principales

### **🎨 Generación Automática de Layouts**

Layouts completos de aplicación con configuración mínima vía ThemeProvider - sin necesidad de codificar layouts manualmente.

### **📝 Sistema de Formularios Avanzado**

Validación centralizada alimentada por React Hook Form con manejo de errores integrado y accesibilidad.

### **🪙 Componentes Listos para Blockchain**

Componentes especializados para aplicaciones DeFi, mercados NFT, y billeteras crypto.

### **🎭 Sistema de Temas Avanzado**

34+ presets de color con arquitectura de 12 capas (primary, dark primary, secondary, dark secondary, accent, dark accent, muted, dark muted, backgrounds). Incluye colores modernos (Bufus Blue, Coral, Mint, Lavender), soporte para colores secundarios/accent, modo oscuro/claro, soporte RTL, y preferencias de usuario persistentes. Sistema de colores dinámico con variables CSS para brand, secondary, accent, y colores semánticos.

### **🎯 5000+ Iconos Integrados**

Integración completa de Lucide React + 97+ iconos diseñados personalizadamente incluyendo iconos blockchain/crypto, controles de layout, marcas sociales, y elementos UI especializados.

### **💬 Sistema de Tooltip**

Componente Tooltip flexible con renderizado basado en portal (`createPortal`), 4 opciones de posicionamiento (top, bottom, left, right), 7 temas de color, reposicionamiento automático inteligente dentro del viewport, delays configurables de entrada/salida, y accesibilidad compatible con ARIA.

### **♿ Accesibilidad Primero**

Componentes compatibles con WCAG 2.1 AA con atributos ARIA apropiados y navegación por teclado.

### **📱 Responsive Mobile-First**

Diseño responsive en todos los componentes con soporte para pantallas ultra-anchas (hasta 4K).

### **🌐 Sistema de Routing Avanzado**

Integración incorporada de React Router con soporte para dos patrones arquitectónicos:

- **Standalone App** (por defecto): Generación automática de rutas desde menuItems con soporte de rutas anidadas (`enableNestedRoutes`)
- **Micro Frontends (MFE)**: Configuración explícita de rutas con basePath y protección de rutas

### **🎨 Integración Completa de Tailwind CSS v4**

Implementación completa de Tailwind CSS v4 con 15 categorías comprehensivas de utilidades automáticamente disponibles:

- **Layout & Positioning**: Aspect ratio, display, position, z-index, overflow
- **Sizing**: Width, height, max/min dimensions con valores arbitrarios
- **Spacing**: Padding, margin, gap con breakpoints responsive
- **Typography**: Font families, sizes, weights, spacing, colors, decoration
- **Flexbox & Grid**: Sistema de layout completo con todas las propiedades
- **Background**: Colores, gradientes, imágenes, posicionamiento, attachment, repeat, size
- **Borders**: Radius, width, colores, estilos, outlines, offsets
- **Effects**: Sombras, opacidad, modos de mezcla, box-shadow utilities
- **Filters**: Blur, brightness, contrast, grayscale, hue-rotate, invert, saturate, sepia
- **Tables**: Layout, border spacing, border collapse, caption side
- **Transitions & Animation**: Propiedades, duration, timing, delay, clases de animation
- **Transforms**: Backface visibility, perspective, rotate, scale, skew, translate
- **Interactivity**: Cursores, scroll behavior, snap, touch actions, user select, will-change
- **SVG**: Fill, stroke, stroke-width utilities
- **Accessibility**: Forced-color-adjust utilities

Todas las utilidades están configuradas a través de directivas `@source inline()` optimizadas para máximo rendimiento.

## 🔧 Stack Tecnológico Principal

Construido sobre librerías líderes en la industria para máxima confiabilidad:

- **[React 18+](https://react.dev/)** - React moderno con hooks y características concurrentes
- **[TypeScript](https://www.typescriptlang.org/)** - Seguridad de tipos completa y excelente DX
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Integración completa de Tailwind v4 incluida con todas las utilidades pre-configuradas
- **[React Hook Form](https://react-hook-form.com/)** - Manejo de formularios eficiente y validación
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Gestión de estado ligera para temas
- **[Lucide React](https://lucide.dev/)** - Librería de iconos hermosa y consistente
- **[Framer Motion](https://www.framer.com/motion/)** - Animaciones y transiciones suaves
- **[Recharts](https://recharts.org/)** - Librería de gráficos composable para visualización de datos
- **[Swiper](https://swiperjs.com/)** - Slider táctil móvil moderno
- **[Vitest](https://vitest.dev/)** - Framework de testing unitario rápido alimentado por Vite

## 📦 Instalación

```bash
npm install @e-burgos/tucu-ui

// o con pnpm

pnpm install @e-burgos/tucu-ui
```

### Importar Estilos de Tucu UI

Agrega la siguiente importación a tu archivo CSS principal (generalmente `index.css` o `main.css`) para incluir todos los estilos de Tucu UI y utilidades de Tailwind CSS:

```css
@import '@e-burgos/tucu-ui/styles';
```

**Nota:** Tucu UI incluye una configuración completa de Tailwind CSS v4 con todas las utilidades pre-configuradas. No se requiere instalación o configuración adicional de Tailwind CSS.

### Personalización Avanzada de Colores

Tucu UI soporta un sistema de theming de colores multi-capa con 34+ presets de colores integrados:

```css
:root {
  --color-brand: #0184bf; /* Color de marca primario */
  --color-secondary: #00d6f2; /* Color secundario */
  --color-accent: #f26522; /* Color de acento */
  --color-dark: #0d1321; /* Fondo de tema oscuro */
  --color-light: #fcfcfc; /* Fondo de tema claro */
}
```

Presets de color disponibles incluyen:

**Colores Básicos:** Green, Black, Blue, Red, Purple, Orange, Rose, Pink, Yellow, Lime, Teal, Cyan

**Colores Extendidos:** Navy, Maroon, Brown, Gray, Silver, Gold, Coral, Salmon, Chocolate, Tan, Beige

**Colores Modernos:** Mint, Lavender, Violet, BufusBlue, Bufus, BufusAccent, BufusDark

**Colores de Tema:** ThemeLight, ThemeDark

## 🎯 Inicio Rápido

### 1. **Uso Básico de Componentes**

```tsx
import { Button, CardContainer, Input, Alert } from '@e-burgos/tucu-ui';

function App() {
  return (
    <CardContainer className="p-6">
      <h2 className="text-2xl font-bold mb-4">Bienvenido a Tucu UI</h2>
      <Input placeholder="Ingresa tu nombre" className="mb-4" />
      <Button size="large" className="w-full">
        Comenzar
      </Button>
      <Alert variant="success" className="mt-4">
        ¡Estás listo para construir UIs increíbles!
      </Alert>
    </CardContainer>
  );
}
```

### 2. **Patrón Standalone App (Por Defecto)**

El patrón por defecto para aplicaciones standalone con generación automática de rutas:

```tsx
import { ThemeProvider, LucideIcons } from '@e-burgos/tucu-ui';

const menuItems = [
  {
    name: 'Dashboard',
    path: '/',
    icon: <LucideIcons.Home />,
    component: <DashboardPage />,
  },
  {
    name: 'Análisis',
    path: '/analytics',
    icon: <LucideIcons.BarChart3 />,
    component: <AnalyticsPage />,
    dropdownItems: [
      {
        name: 'Reportes',
        path: '/analytics/reports',
        component: <ReportsPage />,
      },
      {
        name: 'Insights',
        path: '/analytics/insights',
        component: <InsightsPage />,
      },
    ],
  },
  {
    name: 'Configuración',
    path: '/settings',
    icon: <LucideIcons.Settings />,
    component: <SettingsPage />,
  },
];

function App() {
  return (
    <ThemeProvider
      // Configuración de Layout
      layout="minimal" // 'classic' | 'minimal' | 'none'
      menuItems={menuItems} // Requerido para patrón Standalone
      logo={{ name: 'Mi', secondName: 'App' }}
      // Configuración de Tema
      brandColor="Blue"
      mode="light"
      // Autenticación (Requerido)
      isAuthenticated={true} // Estado de autenticación
      loginUrl="/login" // Opcional: URL de redirección para usuarios no autenticados
      // Opcional: Sobrescribir generación automática de rutas
      customRoutes={<CustomRoutes />}
      // Personalización de UI
      showSettings={true}
      rightButton={<UserMenu />}
    />
  );
}
```

### 3. **Patrón Micro Frontends (MFE)**

Para arquitecturas de micro-frontends con configuración explícita de rutas:

```tsx
import { ThemeProvider } from '@e-burgos/tucu-ui';

const appRoutesConfig = [
  {
    key: 'home',
    path: '/',
    element: <HomePage />,
    isPublic: true, // Ruta pública
  },
  {
    key: 'dashboard',
    path: '/dashboard',
    element: <DashboardPage />,
    isPublic: false, // Ruta privada, requiere autenticación
  },
  {
    key: 'settings',
    path: '/settings',
    element: <SettingsPage />,
    isPublic: false,
  },
];

function MfeApp() {
  return (
    <ThemeProvider
      architecturalPatterns="mfe" // Activa modo MFE
      basePath="/mi-app" // Ruta base para el micro frontend
      appRoutesConfig={appRoutesConfig} // Requerido para MFE
      isAuthenticated={true} // Estado de autenticación (Requerido)
      loginUrl="/login" // URL de redirección para usuarios no autenticados (Requerido)
      logo={{ name: 'MFE', secondName: 'App' }}
      showSettings
    />
  );
}
```

**Diferencias Clave:**

- **Standalone**: Usa `menuItems` para generación automática de rutas
- **MFE**: Usa `basePath` y `appRoutesConfig` para configuración explícita de rutas con protección
- TypeScript asegura que uses las props correctas para cada patrón

### **Referencia de Props de ThemeProvider**

#### **Props Comunes (Ambos Patrones)**

| Prop                 | Tipo                                  | Default     | Descripción                                                                                             |
| -------------------- | ------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------- |
| `layout`             | `'classic' \| 'minimal' \| 'none'`    | `'minimal'` | Tipo de layout: Classic (sidebar), Minimal (nav horizontal), None (sin layout)                          |
| `logo`               | `{name: string, secondName?: string}` | -           | Configuración del logo de la aplicación                                                                 |
| `brandColor`         | `PresetColorType`                     | -           | Preset de color de marca primario (auto-deshabilitado si `customPaletteColor.primary` está configurado) |
| `mode`               | `'light' \| 'dark'`                   | `'light'`   | Modo de tema inicial                                                                                    |
| `customPaletteColor` | `object`                              | -           | Personalización avanzada de colores                                                                     |
| `showSettings`       | `boolean`                             | `false`     | Mostrar botón de toggle del panel de configuración                                                      |
| `rightButton`        | `React.ReactNode`                     | -           | Componente personalizado para área header superior derecha                                              |
| `headerClassName`    | `string`                              | -           | Clases CSS personalizadas para contenedor header                                                        |
| `contentClassName`   | `string`                              | -           | Clases CSS personalizadas para área de contenido principal                                              |
| `className`          | `string`                              | -           | Clases CSS personalizadas para layout completo                                                          |
| `fullWidth`          | `boolean`                             | `false`     | Habilitar layout de ancho completo (remueve restricciones de max-width)                                 |
| `settingActions`     | `ISettingAction`                      | -           | Controlar qué configuraciones están deshabilitadas en el panel de configuración                         |

#### **Props del Patrón Standalone App**

| Prop                    | Tipo                            | Default        | Descripción                                                 |
| ----------------------- | ------------------------------- | -------------- | ----------------------------------------------------------- |
| `architecturalPatterns` | `'standalone'`                  | `'standalone'` | Patrón arquitectónico (por defecto, puede omitirse)         |
| `menuItems`             | `StandaloneAppRoutesMenuItem[]` | Requerido      | Elementos del menú de navegación con configuración de rutas |
| `isAuthenticated`       | `boolean`                       | Requerido      | Estado de autenticación para protección de rutas            |
| `loginUrl`              | `string`                        | -              | Opcional: URL de redirección para usuarios no autenticados  |
| `customRoutes`          | `ReactElement<typeof Routes>`   | -              | Opcional: Sobrescribir generación automática de rutas       |
| `withRouterProvider`    | `boolean`                       | `true`         | Habilitar configuración automática de React Router          |

#### **Props del Patrón Micro Frontends (MFE)**

| Prop                    | Tipo                  | Default   | Descripción                                                    |
| ----------------------- | --------------------- | --------- | -------------------------------------------------------------- |
| `architecturalPatterns` | `'mfe'`               | Requerido | Debe establecerse en `'mfe'` para activar modo MFE             |
| `basePath`              | `string`              | Requerido | Ruta base para el micro frontend (ej., `/mi-app`)              |
| `appRoutesConfig`       | `IAppRouteConfig[]`   | Requerido | Configuración explícita de rutas con protección                |
| `isAuthenticated`       | `boolean`             | Requerido | Estado de autenticación para protección de rutas               |
| `loginUrl`              | `string`              | Requerido | URL de redirección para usuarios no autenticados               |
| `menuItems`             | `AppRoutesMenuItem[]` | -         | Opcional: Elementos del menú de navegación (separado de rutas) |

**Nota:** TypeScript asegura la seguridad de tipos - no puedes mezclar props de Standalone y MFE. El sistema de tipos mostrará errores en tiempo de compilación si usas props incorrectas para el patrón seleccionado.

### **Hook useTheme - API Completa**

El hook `useTheme` proporciona control programático completo sobre el sistema de temas:

```tsx
import { useTheme } from '@e-burgos/tucu-ui';

function ControlesTema() {
  const {
    // Estado Actual
    mode, // 'light' | 'dark'
    layout, // 'classic' | 'minimal' | 'none'
    direction, // 'ltr' | 'rtl'
    preset, // Preset de color primario actual
    secondaryPreset, // Preset de color secundario actual
    accentPreset, // Preset de color acento actual
    darkPreset, // Preset de tema oscuro actual
    lightPreset, // Preset de tema claro actual
    logo, // Configuración de logo actual
    isSettingsOpen, // Estado abierto del panel de configuración
    showSettings, // Visibilidad del botón de configuración
    settingActions, // Configuración de acciones actual

    // Setters de Estado
    setMode, // (mode: 'light' | 'dark') => void
    setLayout, // (layout: 'classic' | 'minimal' | 'none') => void
    setDirection, // (direction: 'ltr' | 'rtl') => void
    setPreset, // (preset: IThemeItem) => void
    setSecondaryPreset, // (secondaryPreset: IThemeItem) => void
    setAccentPreset, // (accentPreset: IThemeItem) => void
    setDarkPreset, // (darkPreset: IThemeItem) => void
    setLightPreset, // (lightPreset: IThemeItem) => void
    setLogo, // (logo: LogoType) => void
    setIsSettingsOpen, // (isOpen: boolean) => void
    setShowSettings, // (show: boolean) => void
    setSettingActions, // (actions: ISettingAction) => void
    restoreDefaultColors, // () => void - Resetear todos los colores a valores por defecto
  } = useTheme();

  return (
    <div>
      {/* Controles de Modo de Tema */}
      <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>Cambiar a Modo {mode === 'light' ? 'Oscuro' : 'Claro'}</button>

      {/* Controles de Layout */}
      <button onClick={() => setLayout('classic')}>Layout Clásico</button>
      <button onClick={() => setLayout('minimal')}>Layout Minimal</button>
      <button onClick={() => setLayout('none')}>Sin Layout</button>

      {/* Controles de Dirección */}
      <button onClick={() => setDirection(direction === 'ltr' ? 'rtl' : 'ltr')}>Cambiar a {direction === 'ltr' ? 'RTL' : 'LTR'}</button>

      {/* Controles de Color */}
      <button onClick={() => setPreset({ label: 'Morado', value: '#9370DB' })}>Tema Morado</button>

      <button onClick={() => setSecondaryPreset({ label: 'Azul', value: '#3B82F6' })}>Azul Secundario</button>

      {/* Controles del Panel de Configuración */}
      <button onClick={() => setIsSettingsOpen(!isSettingsOpen)}>{isSettingsOpen ? 'Cerrar' : 'Abrir'} Configuración</button>

      <button onClick={() => setShowSettings(!showSettings)}>{showSettings ? 'Ocultar' : 'Mostrar'} Botón de Configuración</button>

      {/* Resetear Colores */}
      <button onClick={restoreDefaultColors}>Resetear a Colores por Defecto</button>
    </div>
  );
}
```

### **Estructura de Elementos del Menú**

#### **Patrón Standalone App**

```tsx
interface StandaloneAppRoutesMenuItem {
  name: string; // Nombre para mostrar
  path: string; // Ruta de navegación (ruta de la URL)
  href?: string; // Opcional: URL de enlace externo (si es diferente de path)
  icon?: React.ReactNode; // Icono opcional
  component: JSX.Element; // Componente de página a renderizar
  isPublic?: boolean; // Si la ruta es públicamente accesible (por defecto: true)
  dropdownItems?: StandaloneAppRoutesMenuItem[]; // Elementos de submenú anidados
  hide?: boolean; // Ocultar de la navegación (por defecto: false)
  onClick?: () => void; // Manejador de click opcional
}
```

#### **Patrón Micro Frontends (MFE)**

```tsx
interface IAppRouteConfig extends RouteProps {
  key: string; // Identificador único para la ruta
  path: string; // Ruta
  element: JSX.Element; // Componente a renderizar
  isPublic?: boolean; // Si la ruta es accesible públicamente
  disabled?: boolean; // Si la ruta está deshabilitada
}

interface AppRoutesMenuItem {
  name: string; // Nombre para mostrar (para menú de navegación)
  path: string; // Ruta de navegación
  href?: string; // Opcional: URL de enlace externo (si es diferente de path)
  icon?: React.ReactNode; // Icono opcional
  hide?: boolean; // Ocultar de la navegación (por defecto: false)
  onClick?: () => void; // Manejador de click opcional
  // Nota: component NO se usa en patrón MFE - las rutas se definen en appRoutesConfig
}
```

### **Presets de Color Disponibles**

Tucu UI incluye 34+ presets de colores integrados con arquitectura de 12 capas:

**Colores Básicos:** Green, Black, Blue, Red, Purple, Orange, Rose, Pink, Yellow, Lime, Teal, Cyan

**Colores Extendidos:** Navy, Maroon, Brown, Gray, Silver, Gold, Coral, Salmon, Chocolate, Tan, Beige

**Colores Modernos:** Mint, Lavender, Violet, BufusBlue, Bufus, BufusAccent, BufusDark

**Colores de Tema:** ThemeLight, ThemeDark

Cada preset incluye 12 capas de color: primary, dark primary, secondary, dark secondary, accent, dark accent, muted, dark muted, y variaciones de backgrounds.

### **Persistencia de Tema**

Todas las configuraciones del tema (colores, layout, modo, dirección) se persisten automáticamente en localStorage y se restauran al recargar la aplicación.

**¡Eso es todo!** Tu aplicación completa con ruteo, navegación, temas y diseño responsive está lista.

**Nota:** Para documentación completa de todos los props disponibles en ThemeProvider y el hook useTheme, consulta las secciones "Referencia de Props de ThemeProvider" y "Hook useTheme - API Completa" más arriba.

## 🎨 Sistema de Layouts

### **Tres Tipos de Layout**

#### **1. Layout Classic** - Dashboard Tradicional

- Sidebar fijo con navegación expandible
- Header con logo y acciones
- Perfecto para paneles admin y aplicaciones complejas

#### **2. Layout Minimal** - Moderno y Limpio

- Barra de navegación horizontal
- Efectos de blur en el fondo
- Ideal para aplicaciones centradas en contenido

#### **3. Layout None** - Máxima Flexibilidad

- Sin estructura de layout predefinida
- Perfecto para páginas de auth y diseños personalizados

### **Patrones Arquitectónicos**

Tucu UI soporta dos patrones arquitectónicos para diferentes casos de uso:

#### **Patrón Standalone App (Por Defecto)**

- Generación automática de rutas desde `menuItems`
- Configuración simple con navegación basada en menú
- Perfecto para aplicaciones de página única
- `customRoutes` opcional para necesidades de routing avanzadas

#### **Patrón Micro Frontends (MFE)**

- Configuración explícita de rutas con `appRoutesConfig`
- Protección de rutas con `isPublic` e `isAuthenticated`
- Soporte de ruta base para integración de micro-frontends
- TypeScript asegura el uso correcto de props para cada patrón

### **Características Automáticas**

- ✅ **Diseño Responsive** - Drawer móvil, adaptaciones para tablet
- ✅ **Modo Oscuro/Claro** - Cambio automático de tema
- ✅ **Soporte RTL** - Soporte completo para idiomas de derecha a izquierda
- ✅ **Colores de Marca** - 34+ presets de color con arquitectura multi-capa
- ✅ **Panel de Configuración** - Personalización de usuario incorporada
- ✅ **Integración de Ruteo** - Generación automática de rutas (Standalone) o configuración explícita (MFE)
- ✅ **Seguridad de Tipos** - Uniones discriminadas de TypeScript aseguran el uso correcto del patrón

### **Gestión de Temas**

```tsx
import { useTheme } from '@e-burgos/tucu-ui';

function ControlesTema() {
  const {
    mode, // 'light' | 'dark'
    layout, // 'classic' | 'minimal' | 'none'
    direction, // 'ltr' | 'rtl'
    preset, // Preset de color actual
    setMode,
    setLayout,
    setDirection,
    setPreset,
  } = useTheme();

  return (
    <div>
      <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>Cambiar a Modo {mode === 'light' ? 'Oscuro' : 'Claro'}</button>

      <button onClick={() => setLayout('classic')}>Cambiar a Layout Clásico</button>

      <button onClick={() => setDirection(direction === 'ltr' ? 'rtl' : 'ltr')}>Cambiar a {direction === 'ltr' ? 'RTL' : 'LTR'}</button>

      <button onClick={() => setPreset({ label: 'Morado', value: '#9370DB' })}>Tema Morado</button>
    </div>
  );
}
```

**Nota:** Para documentación completa del hook `useTheme` incluyendo todos los métodos disponibles, consulta la sección "Hook useTheme - API Completa" más arriba.

## 📝 Sistema de Formularios Avanzado

### **Componentes de Formularios Integrales**

```tsx
import { Form, FormField, Input, Textarea, Checkbox, RadioGroup, Select, PinCode, FileInput, Button } from '@e-burgos/tucu-ui';
```

### **Validación Centralizada**

```tsx
interface DatosFormularioUsuario {
  email: string;
  password: string;
  pais: string;
  newsletter: boolean;
}

function FormularioRegistroUsuario() {
  const manejarEnvio = (data: DatosFormularioUsuario) => {
    console.log('Formulario enviado:', data);
  };

  return (
    <Form<DatosFormularioUsuario>
      onSubmit={manejarEnvio}
      useFormProps={{
        defaultValues: {
          email: '',
          password: '',
          pais: '',
          newsletter: false,
        },
        mode: 'onChange',
      }}
    >
      <FormField<DatosFormularioUsuario>
        name="email"
        label="Dirección de Email"
        rules={{
          required: 'Email es requerido',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Dirección de email inválida',
          },
        }}
      >
        <Input type="email" placeholder="Ingresa tu email" />
      </FormField>

      <FormField<DatosFormularioUsuario>
        name="password"
        label="Contraseña"
        rules={{
          required: 'Contraseña es requerida',
          minLength: {
            value: 8,
            message: 'La contraseña debe tener al menos 8 caracteres',
          },
        }}
      >
        <Input type="password" placeholder="Ingresa tu contraseña" />
      </FormField>

      <FormField<DatosFormularioUsuario> name="pais" label="País">
        <Select
          options={[
            { name: 'México', value: 'mx' },
            { name: 'Colombia', value: 'co' },
            { name: 'Argentina', value: 'ar' },
          ]}
        />
      </FormField>

      <FormField<DatosFormularioUsuario> name="newsletter" label="Suscripción al Newsletter">
        <Checkbox>Suscribirse a nuestro newsletter</Checkbox>
      </FormField>

      <Button type="submit" size="large" className="w-full">
        Crear Cuenta
      </Button>
    </Form>
  );
}
```

### **Componentes de Formularios Especializados**

```tsx
// Input de Código PIN
<FormField name="codigoVerificacion" label="Código de Verificación">
  <PinCode length={6} type="number" placeholder="-" />
</FormField>

// Subida de Archivos con Drag & Drop
<FormField name="documentos" label="Subir Documentos">
  <FileInput
    multiple
    accept="imgAndPdf"
    placeholderText="Arrastra archivos aquí o haz clic para subir"
  />
</FormField>

// Grupos de Botones Radio
<FormField name="suscripcion" label="Elige Plan">
  <RadioGroup
    options={[
      { value: 'basico', label: 'Básico - $9/mes' },
      { value: 'pro', label: 'Pro - $29/mes' },
      { value: 'empresa', label: 'Empresa - $99/mes' },
    ]}
    direction="vertical"
  />
</FormField>
```

## 🪙 Componentes Blockchain y DeFi

### **Componentes de Criptomonedas**

```tsx
import { CoinCard, CoinInfoCard, LivePriceFeed, TransactionInfo, CurrencySwapIcons } from '@e-burgos/tucu-ui';

function PortfolioCrypto() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Tarjetas de Balance del Portfolio */}
      <CoinCard name="Bitcoin" symbol="BTC" logo="/icons/bitcoin.svg" balance="1.25" usdBalance="45,000" change="+5.2%" isChangePositive={true} color="#FDEDD4" />

      {/* Feed de Precio en Vivo con Gráfico */}
      <LivePriceFeed name="Ethereum" symbol="ETH" icon={<EthereumIcon />} balance="10.5" usdBalance="33,600" change="+2.8%" isChangePositive={true} prices={historialPrecios} />

      {/* Detalles de Transacción */}
      <div className="space-y-3">
        <TransactionInfo label="Comisión de Gas" value="0.002 ETH" />
        <TransactionInfo label="Red" value="Ethereum Mainnet" />
        <TransactionInfo label="Estado" value="Confirmado" />
      </div>
    </div>
  );
}
```

### **Componentes NFT**

```tsx
import { NFTGrid, CollectionCard } from '@e-burgos/tucu-ui';

function GaleriaNFT() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <NFTGrid author="ArtistaDigital" authorImage="/avatars/artista.jpg" image="/nfts/obra-123.jpg" name="Obra Maestra Digital #123" collection="Colección Abstracta" price="2.5 ETH" />

      <CollectionCard
        item={{
          name: 'BAYC',
          title: 'Bored Ape Yacht Club',
          cover_image: '/collections/bayc.jpg',
          number_of_artwork: 10000,
          user: { name: 'Yuga Labs', avatar: '/avatars/yuga.jpg' },
        }}
      />
    </div>
  );
}
```

## 🎯 Sistema de Iconos Completo

### **5000+ Iconos Lucide**

```tsx
import { LucideIcons } from '@e-burgos/tucu-ui';

function MuestraIconos() {
  return (
    <div className="flex gap-4">
      {/* Iconos de Navegación */}
      <LucideIcons.Home className="w-6 h-6" />
      <LucideIcons.Settings className="w-6 h-6" />
      <LucideIcons.User className="w-6 h-6" />

      {/* Iconos de Acción */}
      <LucideIcons.Plus className="w-6 h-6 text-green-500" />
      <LucideIcons.Trash2 className="w-6 h-6 text-red-500" />
      <LucideIcons.Edit className="w-6 h-6 text-blue-500" />

      {/* Iconos de Comunicación */}
      <LucideIcons.Mail className="w-6 h-6" />
      <LucideIcons.Phone className="w-6 h-6" />
      <LucideIcons.MessageCircle className="w-6 h-6" />
    </div>
  );
}
```

### **97+ Iconos Personalizados**

```tsx
import {
  // Blockchain/Crypto
  Bitcoin,
  Ethereum,
  Cardano,
  Bnb,
  Doge,
  Tether,
  Usdc,

  // Controles de Layout
  ClassicLayoutIcon,
  MinimalLayoutIcon,
  ModernLayoutIcon,
  RetroLayoutIcon,

  // Navegación & UI
  HomeIcon,
  SearchIcon,
  MenuIcon,
  Close,
  ArrowRight,
  ArrowUp,
  ArrowLinkIcon,

  // Redes Sociales
  Facebook,
  Twitter,
  Instagram,
  Github,
  Telegram,

  // DeFi & Trading
  SwapIcon,
  ExchangeIcon,
  TradingBotIcon,
  Farm,
  Pool,
  VoteIcon,
  GasIcon,
  LivePricing,

  // Status & Feedback
  Check,
  Checkmark,
  Warning,
  InfoIcon,
  InfoCircle,
  QuestionIcon,
  VerifiedIcon,
  Verified,

  // Actions & Controls
  Plus,
  PlusCircle,
  Edit,
  Trash2,
  Copy,
  Upload,
  Download,
  ExportIcon,
  Refresh,
  Power,
  ShutDownIcon,
  Unlock,
  LockIcon,

  // Media & Content
  PlayIcon,
  MediaPlayIcon,
  Book,
  Document,
  CalendarIcon,
  Tag,
  TagIcon,

  // Data Visualization
  SpikeBar,
  TrendArrowUpIcon,
  TrendArrowDownIcon,
  BarChart3,

  // Layout & Design
  Grid3X3,
  CompactGrid,
  NormalGrid,
  LeftAlign,
  RightAlign,
  DotsIcon,
  HorizontalThreeDots,
  VerticalThreeDots,

  // Specialty
  Tucu,
  Compass,
  Flash,
  Flow,
  LevelIcon,
  SandClock,
  Star,
  StarFill,
} from '@e-burgos/tucu-ui';
```

## 🔧 Librería de Componentes UI

### **Layout y Navegación**

```tsx
import { Modal, Drawer, CardContainer, PanelActionCard, Carousel, CarouselCards, CarouselImage } from '@e-burgos/tucu-ui';

// Modal con Accesibilidad
<Modal
  isOpen={estaAbierto}
  setIsOpen={setEstaAbierto}
  text={{
    title: 'Confirmar Acción',
    content: '¿Estás seguro de que quieres proceder?',
    button: 'Confirmar',
    backButton: 'Cancelar',
  }}
  onSubmit={manejarConfirmar}
/>

// Drawer Responsive
<Drawer
  type="sidebar-menu"
  isOpen={drawerAbierto}
  setIsOpen={setDrawerAbierto}
  menuItems={menuItems}
  position="left"
/>

// Tarjetas de Acción
<PanelActionCard
  title="Configuración de Usuario"
  actions={[
    { label: 'Guardar', onClick: manejarGuardar },
    { label: 'Cancelar', variant: 'ghost', onClick: manejarCancelar },
  ]}
>
  <FormularioConfiguracion />
</PanelActionCard>
```

### **Componentes Carousel**

Sistema completo de carousel con múltiples variantes:

```tsx
import { Carousel, CarouselCards, CarouselImage } from '@e-burgos/tucu-ui';

// Carousel Básico
<Carousel
  slidesPerView={1}
  spaceBetween={20}
  showNavigation
  showPagination
  autoplay={{ delay: 3000 }}
  loop
>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</Carousel>

// Carousel de Tarjetas
<CarouselCards
  cards={[
    { title: 'Tarjeta 1', description: 'Descripción 1', content: <div>Contenido 1</div> },
    { title: 'Tarjeta 2', description: 'Descripción 2', content: <div>Contenido 2</div> },
  ]}
  showNavigation
  showPagination
/>

// Carousel de Imágenes
<CarouselImage
  images={[
    { src: '/imagen1.jpg', alt: 'Imagen 1', title: 'Título 1' },
    { src: '/imagen2.jpg', alt: 'Imagen 2', title: 'Título 2' },
  ]}
  showNavigation
  showPagination
/>
```

### **Componente Tooltip**

```tsx
import { Tooltip } from '@e-burgos/tucu-ui';

// Tooltip Básico
<Tooltip content="Editar perfil" placement="top">
  <button>Pasa el cursor</button>
</Tooltip>

// Tooltip con color personalizado y delay
<Tooltip content="Eliminar elemento" color="danger" enterDelay={300} arrow>
  <button>Eliminar</button>
</Tooltip>

// Tooltip con contenido enriquecido
<Tooltip
  content={<div><strong>Pro tip:</strong> Usa atajos de teclado para navegar más rápido.</div>}
  placement="right"
  color="primary"
  arrow
>
  <span>Ayuda</span>
</Tooltip>
```

### **Componentes de Retroalimentación**

```tsx
import { Alert, useToastStore } from '@e-burgos/tucu-ui';

// Mensajes de Alerta
<Alert variant="success" dismissible>
  ¡Tus cambios han sido guardados exitosamente!
</Alert>

<Alert variant="warning">
  Tu sesión expirará en 5 minutos.
</Alert>

// Notificaciones Toast
function EjemploToast() {
  const { addToast } = useToastStore();

  const mostrarToast = () => {
    addToast({
      id: Date.now().toString(),
      title: '¡Éxito!',
      message: 'Tu perfil ha sido actualizado',
      variant: 'success',
    });
  };

  return <Button onClick={mostrarToast}>Mostrar Toast</Button>;
}
```

## 🎣 Hooks de Utilidad

Colección completa de hooks personalizados de React para patrones comunes:

```tsx
import { useBreakpoint, useIsMobile, useCopyToClipboard, useClickAway, useElementSize, useMeasure, useLockBodyScroll, useToastStore, useGridSwitcher } from '@e-burgos/tucu-ui';

function EjemploUtilidades() {
  // Hooks Responsive
  const breakpoint = useBreakpoint(); // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  const { isMobile } = useIsMobile();

  // Medición de Elementos
  const [ref, { width, height }] = useElementSize();
  const [measureRef, bounds] = useMeasure();

  // Hooks de Interacción
  const [textoCopiado, copiar] = useCopyToClipboard();
  const clickAwayRef = useRef(null);
  useClickAway(clickAwayRef, () => setIsOpen(false));

  // Gestión de Estado UI
  const { addToast, dismissToast, toasts } = useToastStore();
  const { isGridCompact, setIsGridCompact } = useGridSwitcher();

  return (
    <div>
      <p>Breakpoint actual: {breakpoint}</p>
      {isMobile && <ComponenteSoloMobile />}

      <div ref={ref}>
        Tamaño: {width} × {height}px
      </div>

      <button onClick={() => copiar('¡Hola Mundo!')}>{textoCopiado ? '¡Copiado!' : 'Copiar Texto'}</button>

      <button
        onClick={() =>
          addToast({
            id: Date.now().toString(),
            title: '¡Éxito!',
            message: 'Operación completada',
            variant: 'success',
          })
        }
      >
        Mostrar Toast
      </button>
    </div>
  );
}
```

## 🚀 Autenticación Lista para Usar

```tsx
import { SignInForm, SignUpForm, ForgetPasswordForm, ResetPinForm } from '@e-burgos/tucu-ui';

// Flujo completo de autenticación
function PaginasAuth() {
  return (
    <ThemeProvider layout="none" menuItems={[]} isAuthenticated={false} loginUrl="/login">
      <div className="min-h-screen flex items-center justify-center">
        {/* Inicio de sesión con validación */}
        <SignInForm forgetPasswordPath="/olvide-contraseña" />

        {/* Registro con términos */}
        <SignUpForm />

        {/* Restablecimiento de contraseña */}
        <ForgetPasswordForm onSubmit={manejarRestablecerContraseña} resetPinPath="/restablecer-pin" />
      </div>
    </ThemeProvider>
  );
}
```

## 📚 Ejemplos Completos

### **Páginas Introductorias y Documentación**

Tucu UI incluye páginas comprehensivas de documentación para ayudarte a comenzar:

- **Introduction** - Guía de overview y getting started
- **TailwindV4** - Guía completa de integración de Tailwind CSS v4 con 15 categorías de utilidades
- **Features** - Explora todas las características y utilidades disponibles
  - **Routing System** - Patrones arquitectónicos Standalone y MFE
  - **Icons System** - 5000+ iconos de Lucide + 97+ iconos personalizados
  - **Hooks Utilities** - Hooks personalizados de React para patrones comunes
  - **Accessibility** - Cumplimiento WCAG 2.1 AA y mejores prácticas
- **Components** - Overview de librería de componentes y patrones de uso
  - **UI Components** - 43+ componentes UI (botones, tarjetas, diálogos, tooltips, notificaciones, etc.)
  - **Input Components** - 11+ componentes de entrada de formularios
  - **Blockchain Components** - 9+ componentes especializados DeFi/Web3
- **Form System** - Solución completa de formularios con validación
  - **Form Examples** - Ejemplos interactivos y patrones del mundo real
  - **Code Examples** - Patrones de implementación y mejores prácticas
- **Theming Guide** - Opciones avanzadas de theming y personalización
- **Design System** - Principios de diseño visual y guidelines
- **Colors** - Paleta completa de colores y sistema de theming
- **Layout System** - Patrones responsive de layout y técnicas

### **15 Páginas de Documentación de Utilidades Tailwind CSS v4**

Documentación comprehensiva para todas las utilidades de Tailwind:

- **Layout Utilities** - Aspect ratio, display, position, z-index, overflow
- **Flexbox & Grid Utilities** - Documentación completa del sistema de layout
- **Background Utilities** - Colores, gradientes, imágenes, posicionamiento
- **Borders Utilities** - Radius, width, colores, estilos, outlines
- **Typography Utilities** - Fonts, sizes, weights, spacing, colores
- **Effects Utilities** - Sombras, opacidad, modos de mezcla
- **Filters Utilities** - Blur, brightness, contrast, y más
- **Tables Utilities** - Layout, spacing, propiedades de display
- **Transitions & Animations** - Animaciones y transiciones smooth
- **Transforms Utilities** - Rotate, scale, skew, translate
- **Interactivity Utilities** - Cursores, scroll, touch actions
- **SVG Utilities** - Fill, stroke, stroke-width
- **Accessibility Utilities** - Utilidades de lector de pantalla y foco

### **Dashboard Moderno (Patrón Standalone)**

```tsx
import { ThemeProvider, LucideIcons, useTheme } from '@e-burgos/tucu-ui';

const elementosMenuDashboard = [
  {
    name: 'Resumen',
    path: '/',
    icon: <LucideIcons.LayoutDashboard />,
    component: <PaginaResumen />,
  },
  {
    name: 'Análisis',
    path: '/analytics',
    icon: <LucideIcons.BarChart3 />,
    component: <PaginaAnalisis />,
    dropdownItems: [
      {
        name: 'Reportes',
        path: '/analytics/reports',
        component: <PaginaReportes />,
      },
      {
        name: 'Tiempo Real',
        path: '/analytics/realtime',
        component: <PaginaTiempoReal />,
      },
    ],
  },
  {
    name: 'Usuarios',
    path: '/usuarios',
    icon: <LucideIcons.Users />,
    component: <PaginaUsuarios />,
  },
];

function Dashboard() {
  return (
    <ThemeProvider
      layout="classic"
      menuItems={elementosMenuDashboard} // Patrón Standalone (por defecto)
      isAuthenticated={true}
      loginUrl="/login"
      logo={{ name: 'Panel', secondName: 'Admin' }}
      brandColor="BufusBlue"
      showSettings={true}
      rightButton={<MenuPerfilUsuario />}
    />
  );
}
```

### **Aplicación DeFi (Patrón Standalone)**

```tsx
import { ThemeProvider, CoinCard, LivePriceFeed, LucideIcons } from '@e-burgos/tucu-ui';

const elementosMenuDefi = [
  {
    name: 'Portfolio',
    path: '/',
    icon: <LucideIcons.Wallet />,
    component: <PaginaPortfolio />,
  },
  {
    name: 'Swap',
    path: '/swap',
    icon: <LucideIcons.ArrowLeftRight />,
    component: <PaginaSwap />,
  },
  {
    name: 'Staking',
    path: '/staking',
    icon: <LucideIcons.Coins />,
    component: <PaginaStaking />,
  },
];

function AppDeFi() {
  return (
    <ThemeProvider
      layout="minimal"
      menuItems={elementosMenuDefi} // Patrón Standalone
      isAuthenticated={true}
      loginUrl="/login"
      logo={{ name: 'DeFi', secondName: 'Portfolio' }}
      brandColor="Green"
      rightButton={<ConectorWallet />}
    />
  );
}
```

### **Aplicación Micro Frontend (Patrón MFE)**

```tsx
import { ThemeProvider, LucideIcons } from '@e-burgos/tucu-ui';

const appRoutesConfig = [
  {
    key: 'portfolio',
    path: '/',
    element: <PaginaPortfolio />,
    isPublic: false,
  },
  {
    key: 'swap',
    path: '/swap',
    element: <PaginaSwap />,
    isPublic: false,
  },
  {
    key: 'staking',
    path: '/staking',
    element: <PaginaStaking />,
    isPublic: false,
  },
];

function AppDeFiMFE() {
  const estaAutenticado = useAuth(); // Tu hook de autenticación

  return (
    <ThemeProvider
      architecturalPatterns="mfe" // Patrón MFE
      basePath="/defi-app"
      appRoutesConfig={appRoutesConfig}
      isAuthenticated={estaAutenticado}
      loginUrl="/login" // Requerido para patrón MFE
      logo={{ name: 'DeFi', secondName: 'MFE' }}
      brandColor="Green"
    />
  );
}
```

### **Plataforma E-commerce (Patrón Standalone)**

```tsx
import { ThemeProvider, LucideIcons, Form, FormField, Input } from '@e-burgos/tucu-ui';

const elementosMenuEcommerce = [
  {
    name: 'Productos',
    path: '/productos',
    icon: <LucideIcons.Package />,
    component: <PaginaProductos />,
  },
  {
    name: 'Órdenes',
    path: '/ordenes',
    icon: <LucideIcons.ShoppingCart />,
    component: <PaginaOrdenes />,
  },
  {
    name: 'Clientes',
    path: '/clientes',
    icon: <LucideIcons.Users />,
    component: <PaginaClientes />,
  },
];

function AdminEcommerce() {
  return (
    <ThemeProvider
      layout="classic"
      menuItems={elementosMenuEcommerce} // Patrón Standalone
      isAuthenticated={true}
      loginUrl="/login"
      logo={{ name: 'Tienda', secondName: 'Admin' }}
      brandColor="Purple"
      showSettings={true}
    />
  );
}
```

## 🎨 Personalización y Temas

### **Sistema Avanzado de Colores**

Tucu UI soporta un sistema de theming de colores multi-capa con 34+ presets y arquitectura de 12 capas:

```tsx
<ThemeProvider
  brandColor="BufusBlue" // Color de marca primario
  secondaryColor="Bufus" // Color secundario para acentos
  accentColor="BufusAccent" // Color de acento para highlights
  darkColor="ThemeDark" // Color base de tema oscuro
  lightColor="ThemeLight" // Color base de tema claro
  // ... otras opciones
/>
```

### **Propiedades CSS Personalizadas**

```css
:root {
  --color-brand: #0184bf; /* Color de marca primario */
  --color-secondary: #00d6f2; /* Color secundario */
  --color-accent: #f26522; /* Color de acento */
  --color-dark: #0d1321; /* Fondo de tema oscuro */
  --color-light: #fcfcfc; /* Fondo de tema claro */
  --color-body: var(--color-light);
  --color-sidebar-body: #f8fafc;
  --color-light-dark: #171e2e;
  --color-dark-light: #f8fafc;

  /* Mezcla dinámica de colores */
  --color-muted: color-mix(in oklab, var(--color-brand) 50%, transparent);
  --color-success: var(--color-emerald-500);
  --color-warning: var(--color-orange-500);
  --color-error: var(--color-red-500);
  --color-info: var(--color-blue-500);
}
```

### **Extendiendo la Configuración de Tailwind**

```js
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/tucu-ui/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'rgb(var(--color-brand) / <alpha-value>)',
          50: '#eff6ff',
          // ... más tonos
        },
      },
      spacing: {
        13: '3.375rem', // Espaciado personalizado usado por Tucu UI
      },
    },
  },
};
```

## ♿ Características de Accesibilidad

Tucu UI está construido pensando en la accesibilidad:

- ✅ **Cumplimiento WCAG 2.1 AA** - Cumple estándares de accesibilidad
- ✅ **Navegación por Teclado** - Soporte completo de teclado en todos los componentes
- ✅ **Soporte para Lectores de Pantalla** - Atributos ARIA apropiados y HTML semántico
- ✅ **Gestión de Foco** - Indicadores de foco visibles y orden lógico de tabulación
- ✅ **Contraste de Color** - Ratios de contraste suficientes en todos los temas
- ✅ **Preferencias de Movimiento** - Respeta las preferencias de movimiento del usuario

## 🔧 Desarrollo y Contribuciones

### **Configuración de Desarrollo**

```bash
# Clonar el repositorio
git clone <repository-url>

# Instalar dependencias
pnpm install

# Ejecutar el demo para desarrollo
pnpm nx run demo:serve

# Construir la librería
pnpm nx run tucu-ui:build

# Ejecutar pruebas
pnpm nx run tucu-ui:test
```

### **Estructura del Monorepo Nx**

```
tucu-ui/
├── apps/
│   ├── demo/                 # Documentación y app demo (tucu-ui.netlify.app)
│   └── test-lib/             # Playground de testing de la librería
├── examples/
│   ├── standalone/           # Ejemplo de arquitectura Standalone
│   └── micro-frontends/      # Ejemplo de arquitectura Micro Frontends
├── ui/
│   └── tucu-ui/             # Librería principal (@e-burgos/tucu-ui)
│       ├── src/
│       │   ├── components/   # Todos los componentes UI (70+)
│       │   ├── hooks/        # Hooks de utilidad
│       │   ├── themes/       # Sistema de temas (Zustand + tokens CSS)
│       │   └── styles.css    # Configuración Tailwind CSS v4
│       └── package.json
├── scripts/                  # Scripts de build y generación
└── nx.json                   # Configuración del workspace Nx
```

## 📄 Licencia

Licencia MIT - ¡siéntete libre de usar en tus proyectos!

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor:

1. **Haz fork del repositorio**
2. **Crea una rama de característica**
3. **Agrega pruebas para nuevas características**
4. **Actualiza la documentación**
5. **Envía un pull request**

## 🌐 Comunidad y Soporte

- **📚 [Documentación](https://tucu-ui.netlify.app/)** - Guías completas y ejemplos
- **🐛 [Issues](https://github.com/e-burgos/tucu-ui/issues)** - Reportar bugs y solicitar características
- **💬 [Discusiones](https://github.com/e-burgos/tucu-ui/discussions)** - Soporte de la comunidad e ideas

---

**Tucu UI** - Construye aplicaciones React hermosas, accesibles y listas para producción con confianza.

_Perfecto para dashboards, plataformas e-commerce, aplicaciones DeFi, y cualquier aplicación web moderna que demande calidad y consistencia._

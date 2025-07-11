# Tucu UI

Una moderna y completa librería de componentes React construida con TypeScript, Tailwind CSS, y diseñada para crear aplicaciones web listas para producción con **generación automática de layouts**, **sistemas de formularios potentes**, y **componentes especializados para blockchain**.

## 🌟 Storybook y Documentación

- **📚 [Documentación en Vivo](https://main--683712ba90eaad206f988c65.chromatic.com/?path=/docs/1-documentation-1-introduction--documentation)** - Documentación completa de componentes
- **🎨 [Storybook Interactivo](https://main--683712ba90eaad206f988c65.chromatic.com/)** - Explora componentes en acción
- **🔧 [Ejemplos de Componentes](https://main--683712ba90eaad206f988c65.chromatic.com/?path=/story/ui-components-buttons-button--default)** - Ve todas las variaciones y casos de uso

## 🚀 Características Principales

### **🎨 Generación Automática de Layouts**

Layouts completos de aplicación con configuración mínima vía ThemeProvider - sin necesidad de codificar layouts manualmente.

### **📝 Sistema de Formularios Avanzado**

Validación centralizada alimentada por React Hook Form con manejo de errores integrado y accesibilidad.

### **🪙 Componentes Listos para Blockchain**

Componentes especializados para aplicaciones DeFi, mercados NFT, y billeteras crypto.

### **🎭 Sistema de Temas Completo**

6 presets de color, modo oscuro/claro, soporte RTL, y preferencias de usuario persistentes.

### **🎯 5000+ Iconos Integrados**

Integración completa de Lucide React + 90+ iconos diseñados personalizadamente para iconografía integral.

### **♿ Accesibilidad Primero**

Componentes compatibles con WCAG 2.1 AA con atributos ARIA apropiados y navegación por teclado.

### **📱 Responsive Mobile-First**

Diseño responsive en todos los componentes con soporte para pantallas ultra-anchas (hasta 4K).

### **🌐 Ruteo Integrado**

Integración incorporada de React Router para desarrollo SPA sin problemas.

## 🔧 Stack Tecnológico Principal

Construido sobre librerías líderes en la industria para máxima confiabilidad:

- **[React 18+](https://react.dev/)** - React moderno con hooks y características concurrentes
- **[TypeScript](https://www.typescriptlang.org/)** - Seguridad de tipos completa y excelente DX
- **[Tailwind CSS](https://tailwindcss.com/)** - Estilos utility-first con tokens de diseño personalizados
- **[React Hook Form](https://react-hook-form.com/)** - Manejo de formularios eficiente y validación
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Gestión de estado ligera para temas
- **[Lucide React](https://lucide.dev/)** - Librería de iconos hermosa y consistente
- **[Framer Motion](https://www.framer.com/motion/)** - Animaciones y transiciones suaves

## 📦 Instalación

```bash
npm install tucu-ui
```

### Configuración de Tailwind CSS

Agrega Tucu UI a tu configuración de Tailwind para habilitar todas las características de estilo:

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/tucu-ui/**/*.{js,ts,jsx,tsx}', // Agrega esta línea
  ],
  // ... resto de tu configuración
};
```

## 🎯 Inicio Rápido

### 1. **Uso Básico de Componentes**

```tsx
import { Button, Card, Input, Alert } from 'tucu-ui';

function App() {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Bienvenido a Tucu UI</h2>
      <Input placeholder="Ingresa tu nombre" className="mb-4" />
      <Button size="large" className="w-full">
        Comenzar
      </Button>
      <Alert variant="success" className="mt-4">
        ¡Estás listo para construir UIs increíbles!
      </Alert>
    </Card>
  );
}
```

### 2. **App Completa con Layout Auto-Generado**

```tsx
import { ThemeProvider, LucideIcons } from 'tucu-ui';

const menuItems = [
  {
    name: 'Dashboard',
    href: '/',
    icon: <LucideIcons.Home />,
    component: <DashboardPage />,
  },
  {
    name: 'Análisis',
    href: '/analytics',
    icon: <LucideIcons.BarChart3 />,
    component: <AnalyticsPage />,
    dropdownItems: [
      {
        name: 'Reportes',
        href: '/analytics/reports',
        component: <ReportsPage />,
      },
      {
        name: 'Insights',
        href: '/analytics/insights',
        component: <InsightsPage />,
      },
    ],
  },
  {
    name: 'Configuración',
    href: '/settings',
    icon: <LucideIcons.Settings />,
    component: <SettingsPage />,
  },
];

function App() {
  return (
    <ThemeProvider
      // Configuración de Layout
      layout="minimal" // 'classic' | 'minimal' | 'none'
      menuItems={menuItems}
      logo={{ name: 'Mi', secondName: 'App' }}
      // Configuración de Tema
      brandColor="Blue" // 'Green' | 'Black' | 'Blue' | 'Red' | 'Purple' | 'Orange'
      showSettings={true}
      // Características Adicionales
      rightButton={<UserMenu />}
    />
  );
}
```

**¡Eso es todo!** Tu aplicación completa con ruteo, navegación, temas y diseño responsive está lista.

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

### **Características Automáticas**

- ✅ **Diseño Responsive** - Drawer móvil, adaptaciones para tablet
- ✅ **Modo Oscuro/Claro** - Cambio automático de tema
- ✅ **Soporte RTL** - Soporte completo para idiomas de derecha a izquierda
- ✅ **Colores de Marca** - 6 presets de color predefinidos
- ✅ **Panel de Configuración** - Personalización de usuario incorporada
- ✅ **Integración de Ruteo** - Generación automática de rutas

### **Gestión de Temas**

```tsx
import { useTheme } from 'tucu-ui';

function ControlesTema() {
  const {
    mode, // 'light' | 'dark'
    layout, // 'classic' | 'minimal' | 'none'
    direction, // 'ltr' | 'rtl'
    preset, // Preset de color actual
    setMode,
    setLayout,
    setPreset,
  } = useTheme();

  return (
    <div>
      <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>Cambiar a Modo {mode === 'light' ? 'Oscuro' : 'Claro'}</button>

      <button onClick={() => setLayout('classic')}>Cambiar a Layout Clásico</button>

      <button onClick={() => setPreset({ label: 'Purple', value: '#9370DB' })}>Tema Morado</button>
    </div>
  );
}
```

## 📝 Sistema de Formularios Avanzado

### **Componentes de Formularios Integrales**

```tsx
import { Form, FormField, Input, Textarea, Checkbox, RadioGroup, InputSelect, PinCode, FileInput, Button } from 'tucu-ui';
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
        <InputSelect
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
import { CoinCard, CoinInfoCard, LivePriceFeed, TransactionInfo, CurrencySwapIcons } from 'tucu-ui';

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
import { NFTGrid, CollectionCard } from 'tucu-ui';

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
import { LucideIcons } from 'tucu-ui';

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

### **90+ Iconos Personalizados**

```tsx
import {
  // Blockchain/Crypto
  Bitcoin,
  Ethereum,
  Cardano,

  // Controles de Layout
  ClassicLayoutIcon,
  MinimalLayoutIcon,

  // Navegación
  HomeIcon,
  SearchIcon,

  // Redes Sociales
  Facebook,
  Twitter,
  Instagram,
  Github,

  // Específicos para DeFi
  SwapIcon,
  ExchangeIcon,
  TradingBotIcon,
} from 'tucu-ui';
```

## 🔧 Librería de Componentes UI

### **Layout y Navegación**

```tsx
import { Modal, Drawer, CardContainer, PanelActionCard } from 'tucu-ui';

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

### **Componentes de Retroalimentación**

```tsx
import { Alert, Toast, useToast } from 'tucu-ui';

// Mensajes de Alerta
<Alert variant="success" dismissible>
  ¡Tus cambios han sido guardados exitosamente!
</Alert>

<Alert variant="warning">
  Tu sesión expirará en 5 minutos.
</Alert>

// Notificaciones Toast
function EjemploToast() {
  const { toast } = useToast();

  const mostrarToast = () => {
    toast({
      title: '¡Éxito!',
      message: 'Tu perfil ha sido actualizado',
      variant: 'success',
    });
  };

  return <Button onClick={mostrarToast}>Mostrar Toast</Button>;
}
```

## 🎣 Hooks de Utilidad

```tsx
import { useBreakpoint, useIsMobile, useCopyToClipboard, useClickAway, useElementSize, useLockBodyScroll } from 'tucu-ui';

function EjemploUtilidades() {
  const breakpoint = useBreakpoint();
  const esMobile = useIsMobile();
  const [textoCopiado, copiar] = useCopyToClipboard();

  return (
    <div>
      <p>Breakpoint actual: {breakpoint}</p>
      {esMobile && <ComponenteSoloMobile />}

      <button onClick={() => copiar('¡Hola Mundo!')}>{textoCopiado ? '¡Copiado!' : 'Copiar Texto'}</button>
    </div>
  );
}
```

## 🚀 Autenticación Lista para Usar

```tsx
import { SignInForm, SignUpForm, ForgetPasswordForm, ResetPinForm } from 'tucu-ui';

// Flujo completo de autenticación
function PaginasAuth() {
  return (
    <ThemeProvider layout="none" menuItems={[]}>
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

### **Dashboard Moderno**

```tsx
import { ThemeProvider, LucideIcons, useTheme } from 'tucu-ui';

const elementosMenuDashboard = [
  {
    name: 'Resumen',
    href: '/',
    icon: <LucideIcons.LayoutDashboard />,
    component: <PaginaResumen />,
  },
  {
    name: 'Análisis',
    href: '/analytics',
    icon: <LucideIcons.BarChart3 />,
    component: <PaginaAnalisis />,
    dropdownItems: [
      {
        name: 'Reportes',
        href: '/analytics/reports',
        component: <PaginaReportes />,
      },
      {
        name: 'Tiempo Real',
        href: '/analytics/realtime',
        component: <PaginaTiempoReal />,
      },
    ],
  },
  {
    name: 'Usuarios',
    href: '/usuarios',
    icon: <LucideIcons.Users />,
    component: <PaginaUsuarios />,
  },
];

function Dashboard() {
  return <ThemeProvider layout="classic" menuItems={elementosMenuDashboard} logo={{ name: 'Panel', secondName: 'Admin' }} brandColor="Blue" showSettings={true} rightButton={<MenuPerfilUsuario />} />;
}
```

### **Aplicación DeFi**

```tsx
import { ThemeProvider, CoinCard, LivePriceFeed, LucideIcons } from 'tucu-ui';

const elementosMenuDefi = [
  {
    name: 'Portfolio',
    href: '/',
    icon: <LucideIcons.Wallet />,
    component: <PaginaPortfolio />,
  },
  {
    name: 'Swap',
    href: '/swap',
    icon: <LucideIcons.ArrowLeftRight />,
    component: <PaginaSwap />,
  },
  {
    name: 'Staking',
    href: '/staking',
    icon: <LucideIcons.Coins />,
    component: <PaginaStaking />,
  },
];

function AppDeFi() {
  return <ThemeProvider layout="minimal" menuItems={elementosMenuDefi} logo={{ name: 'DeFi', secondName: 'Portfolio' }} brandColor="Green" rightButton={<ConectorWallet />} />;
}
```

### **Plataforma E-commerce**

```tsx
import { ThemeProvider, LucideIcons, Form, FormField, Input } from 'tucu-ui';

const elementosMenuEcommerce = [
  {
    name: 'Productos',
    href: '/productos',
    icon: <LucideIcons.Package />,
    component: <PaginaProductos />,
  },
  {
    name: 'Órdenes',
    href: '/ordenes',
    icon: <LucideIcons.ShoppingCart />,
    component: <PaginaOrdenes />,
  },
  {
    name: 'Clientes',
    href: '/clientes',
    icon: <LucideIcons.Users />,
    component: <PaginaClientes />,
  },
];

function AdminEcommerce() {
  return <ThemeProvider layout="classic" menuItems={elementosMenuEcommerce} logo={{ name: 'Tienda', secondName: 'Admin' }} brandColor="Purple" showSettings={true} />;
}
```

## 🎨 Personalización y Temas

### **Propiedades CSS Personalizadas**

```css
:root {
  --color-brand: 42 82 190; /* Valores RGB para soporte alpha */
  /* Tucu UI usará automáticamente tus colores de marca */
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
npm install

# Ejecutar Storybook para desarrollo
npm run tucu-ui

# Construir la librería
npm run tucu-ui:build

# Ejecutar pruebas
npm test
```

### **Estructura del Monorepo Nx**

```
tucu-ui/
├── apps/
│   └── demo/                 # Aplicación demo
├── ui/
│   └── tucu-ui/             # Librería principal
│       ├── src/
│       │   ├── components/   # Todos los componentes UI
│       │   ├── hooks/       # Hooks de utilidad
│       │   ├── themes/      # Sistema de temas
│       │   └── storybook/   # Documentación
│       └── package.json
└── nx.json                  # Configuración Nx
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

- **📚 [Documentación](https://main--683712ba90eaad206f988c65.chromatic.com/?path=/docs/1-documentation-1-introduction--documentation)** - Guías completas y ejemplos
- **🎨 [Storybook](https://main--683712ba90eaad206f988c65.chromatic.com/)** - Explorador interactivo de componentes
- **🐛 [Issues](https://github.com/e-burgos/tucu-ui/issues)** - Reportar bugs y solicitar características
- **💬 [Discusiones](https://github.com/e-burgos/tucu-ui/discussions)** - Soporte de la comunidad e ideas

---

**Tucu UI** - Construye aplicaciones React hermosas, accesibles y listas para producción con confianza.

_Perfecto para dashboards, plataformas e-commerce, aplicaciones DeFi, y cualquier aplicación web moderna que demande calidad y consistencia._

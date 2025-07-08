# Tucu UI

Una moderna librería de componentes React construida con Tailwind CSS, diseñada para crear aplicaciones web robustas con **generación automática de layouts**, sistemas de formularios completos y componentes especializados tanto para desarrollo tradicional como para DApps.

## 🚀 Características Principales

- **🎨 Generación Automática de Layouts** - Layouts completos de aplicación con configuración mínima vía ThemeProvider
- **📝 Sistema de Formularios Potente** - Validación centralizada con React Hook Form
- **🎯 Componentes Listos para DApps** - Componentes especializados para aplicaciones descentralizadas
- **🌐 Ruteo Integrado** - Sistema de ruteo incorporado para SPAs
- **🎨 Iconografía Completa** - Iconos internos + integración completa con Lucide Icons
- **🌍 Soporte RTL** - Soporte completo para idiomas de derecha a izquierda
- **📱 Diseño Responsive** - Enfoque mobile-first en todos los componentes

## 🔧 Dependencias Core

Tucu UI está construido sobre estas potentes librerías:

- **[React Hook Form](https://react-hook-form.com/)** - Para manejo de formularios eficiente y validación
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Para gestión de estado ligera
- **[Tailwind CSS](https://tailwindcss.com/)** - Para estilos utility-first

## 📦 Instalación

```bash
npm install tucu-ui
```

## 🎯 Inicio Rápido

### Uso Básico de Componentes

```tsx
import { Button, Card, Input } from 'tucu-ui';
import 'tucu-ui/styles';

function App() {
  return (
    <Card>
      <h2>Bienvenido a Tucu UI</h2>
      <Input placeholder="Ingresa tu nombre" />
      <Button>Comenzar</Button>
    </Card>
  );
}
```

### Configuración de Tailwind CSS

```js
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/tucu-ui/**/*.{js,ts,jsx,tsx}'],
  // ... resto de tu configuración
};
```

## 🎨 Generación Automática de Layouts

El **ThemeProvider** es la característica más poderosa de Tucu UI - genera layouts completos de aplicación automáticamente con configuración mínima.

### App Completa con ThemeProvider

```tsx
import { ThemeProvider } from 'tucu-ui';

const menuItems = [
  {
    name: 'Dashboard',
    href: '/',
    icon: <DashboardIcon />,
    component: <DashboardPage />,
  },
  {
    name: 'Análisis',
    href: '/analytics',
    icon: <AnalyticsIcon />,
    component: <AnalyticsPage />,
    dropdownItems: [
      {
        name: 'Reportes',
        href: '/analytics/reports',
        component: <ReportsPage />,
      },
    ],
  },
];

function App() {
  return (
    <ThemeProvider
      logo={{ name: 'Mi', secondName: 'App' }}
      layout="minimal" // 'none' | 'minimal' | 'classic'
      menuItems={menuItems}
      brandColor="Blue" // 'Green' | 'Black' | 'Blue' | 'Red' | 'Purple' | 'Orange'
      showSettings={true}
      rightButton={<MenuUsuario />}
    />
  );
}
```

**¡Eso es todo!** Tu aplicación completa con ruteo, navegación y temas está lista.

### Layouts Disponibles

#### 1. **Layout Minimal**

- Header limpio con navegación horizontal
- Sidebar responsive para móvil
- Perfecto para dashboards modernos

#### 2. **Layout Classic**

- Sidebar fijo con navegación vertical
- Header con logo y acciones
- Ideal para aplicaciones administrativas

#### 3. **Layout None**

- Sin layout predefinido
- Máxima flexibilidad para diseños personalizados

### Características del Sistema de Temas

#### Presets de Colores

```tsx
const presetsDisponibles = [
  'Green', // #009e60 - Por defecto
  'Black', // #323743
  'Blue', // #2a52be
  'Red', // #e34234
  'Purple', // #9370DB
  'Orange', // #ffa500
];
```

#### Hook useTheme

```tsx
import { useTheme } from 'tucu-ui';

function ControlesTema() {
  const {
    mode, // 'light' | 'dark'
    layout, // 'none' | 'minimal' | 'classic'
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
    </div>
  );
}
```

#### Sistema de Ruteo Integrado

El ThemeProvider maneja automáticamente el ruteo basado en tus `menuItems`:

```tsx
const menuItems = [
  {
    name: 'Productos',
    href: '/productos',
    component: <ListaProductos />,
    dropdownItems: [
      {
        name: 'Crear Producto',
        href: '/productos/crear',
        component: <CrearProducto />,
      },
    ],
  },
];

// Las rutas se generan automáticamente:
// / -> Inicio
// /productos -> Componente ListaProductos
// /productos/crear -> Componente CrearProducto
```

## 📝 Sistema de Formularios Avanzado

Tucu UI proporciona un sistema de formularios completo con validación centralizada alimentado por React Hook Form.

### Componentes de Formularios Disponibles

```tsx
import { Form, FormField, Input, Textarea, Checkbox, Radio, RadioGroup, InputSelect, InputSwitch, PinCode, FileInput, ToggleBar } from 'tucu-ui';
```

### Validación Centralizada

```tsx
import { Form, FormField, Input, Button } from 'tucu-ui';

// Definir esquema de validación
const esquemaValidacion = {
  email: {
    required: 'Email es requerido',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Dirección de email inválida',
    },
  },
  password: {
    required: 'Contraseña es requerida',
    minLength: {
      value: 8,
      message: 'La contraseña debe tener al menos 8 caracteres',
    },
  },
};

function FormularioLogin() {
  const manejarEnvio = (valores) => {
    console.log('Valores del formulario:', valores);
  };

  return (
    <Form
      onSubmit={manejarEnvio}
      validationSchema={esquemaValidacion}
      useFormProps={{
        defaultValues: { email: '', password: '' },
        mode: 'onChange',
      }}
    >
      <FormField name="email" label="Email">
        <Input type="email" placeholder="Ingresa tu email" />
      </FormField>

      <FormField name="password" label="Contraseña">
        <Input type="password" placeholder="Ingresa tu contraseña" />
      </FormField>

      <Button type="submit">Iniciar Sesión</Button>
    </Form>
  );
}
```

### Componentes de Input Especializados

#### Input Select con Opciones

```tsx
<FormField name="pais" label="País">
  <InputSelect
    options={[
      { name: 'México', value: 'mx' },
      { name: 'Colombia', value: 'co' },
      { name: 'Argentina', value: 'ar' },
    ]}
  />
</FormField>
```

#### Input de Código PIN

```tsx
<FormField name="codigoVerificacion" label="Código de Verificación">
  <PinCode length={6} type="number" placeholder="-" />
</FormField>
```

#### Subida de Archivos

```tsx
<FormField name="documentos" label="Subir Documentos">
  <FileInput multiple accept="imgAndPdf" placeholderText="Arrastra archivos aquí o haz clic para subir" />
</FormField>
```

#### Grupo de Radio

```tsx
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

### Hook useFormContext

Accede a métodos del formulario desde cualquier componente hijo:

```tsx
import { useFormContext } from 'react-hook-form';

function AccionesFormulario() {
  const {
    formState: { isValid, isDirty, errors },
    reset,
    trigger,
    setValue,
    getValues,
    watch,
  } = useFormContext();

  const valorEmail = watch('email');

  return (
    <div>
      <p>Email actual: {valorEmail}</p>
      <Button disabled={!isValid}>Enviar</Button>
      <Button type="button" onClick={() => reset()}>
        Reiniciar
      </Button>
    </div>
  );
}
```

## 🎯 Componentes para DApps y Blockchain

Tucu UI incluye componentes especializados para aplicaciones descentralizadas e interfaces blockchain.

### Componentes de Criptomonedas

```tsx
import {
  CoinCard,
  CoinInfoCard,
  CoinListBox,
  LivePriceFeed,
  TransactionInfo,
  CurrencySwapIcons
} from 'tucu-ui';

// Tarjeta de moneda para portfolio
<CoinCard
  name="Bitcoin"
  symbol="BTC"
  logo="/bitcoin-logo.svg"
  balance="0.5"
  usdBalance="25,000"
  change="+5.2%"
  isChangePositive={true}
  color="#F7931A"
/>

// Gráfico de precio en vivo
<LivePriceFeed
  name="Ethereum"
  symbol="ETH"
  icon={<EthereumIcon />}
  balance="10.5"
  usdBalance="18,750"
  change="+2.8%"
  isChangePositive={true}
  prices={historialPrecios}
/>

// Detalles de transacción
<TransactionInfo
  label="Comisión de Gas"
  value="0.002 ETH"
/>
```

### Componentes NFT

```tsx
import { NFTGrid, CollectionCard } from 'tucu-ui';

<NFTGrid author="ArtistaDigital" authorImage="/avatar-artista.jpg" image="/imagen-nft.jpg" name="Obra Maestra Digital #123" collection="Colección Abstracta" price="2.5 ETH" />;
```

## 🎨 Sistema de Iconos Completo

### Integración con Iconos Lucide

Acceso directo a todos los iconos de [Lucide React](https://lucide.dev/):

```tsx
// Importación directa
import { AlertCircle, Bell, Calendar } from 'tucu-ui/lucide-react';

// O usando namespace
import { LucideIcons } from 'tucu-ui';

function MiComponente() {
  return (
    <div>
      <AlertCircle size={24} color="red" />
      <LucideIcons.Bell size={24} />
      <LucideIcons.Calendar size={24} />
    </div>
  );
}
```

### Librería de Iconos Internos

Extensa colección de iconos internos organizados por categorías:

```tsx
import {
  // Blockchain/Crypto
  Bitcoin,
  Ethereum,
  Tether,
  Cardano,
  Bnb,
  Usdc,

  // Layout
  ClassicLayoutIcon,
  MinimalLayoutIcon,
  ModernLayoutIcon,

  // Navegación
  ArrowUp,
  ArrowRight,
  ChevronDown,
  ChevronForward,

  // Redes Sociales
  Facebook,
  Twitter,
  Instagram,
  Github,
  Telegram,

  // Interfaz
  SearchIcon,
  HomeIcon,
  ProfileIcon,
  Close,
  Plus,

  // Específicos para DApps
  SwapIcon,
  ExchangeIcon,
  TradingBotIcon,
  FarmIcon,
  PoolIcon,
} from 'tucu-ui';
```

## 🔧 Componentes de Layout y Navegación

### Sistema de Modales

```tsx
import { Modal } from 'tucu-ui';

<Modal
  isOpen={modalAbierto}
  setIsOpen={setModalAbierto}
  text={{
    title: 'Confirmar Transacción',
    content: '¿Estás seguro de que quieres proceder con esta transacción?',
    button: 'Confirmar',
    backButton: 'Cancelar',
  }}
  onSubmit={manejarConfirmacion}
  onClose={manejarCierre}
/>;
```

### Drawer/Sidebar

```tsx
import { Drawer } from 'tucu-ui';

<Drawer type="sidebar-menu" isOpen={drawerAbierto} setIsOpen={setDrawerAbierto} menuItems={elementosNavegacion} logo={{ name: 'Mi', secondName: 'App' }} position="left" />;
```

### Componentes de Tarjetas

```tsx
import { CardContainer, CardTitle, PanelActionCard } from 'tucu-ui';

<PanelActionCard
  title="Configuración de Usuario"
  actions={[
    { label: 'Guardar', onClick: manejarGuardar },
    { label: 'Cancelar', variant: 'ghost', onClick: manejarCancelar },
  ]}
>
  <FormularioConfiguracion />
</PanelActionCard>;
```

## 🎣 Hooks de Utilidad

```tsx
import { useBreakpoint, useClickAway, useCopyToClipboard, useElementSize, useIsMobile, useIsMount, useLockBodyScroll, useWindowScroll } from 'tucu-ui';

// Detección de breakpoint responsive
function ComponenteResponsive() {
  const breakpoint = useBreakpoint();
  const esMobile = useIsMobile();

  return (
    <div>
      Breakpoint actual: {breakpoint}
      {esMobile && <ComponenteSoloMobile />}
    </div>
  );
}

// Funcionalidad copiar al portapapeles
function BotonCompartir({ url }) {
  const [textoCopiado, copiar] = useCopyToClipboard();

  return <button onClick={() => copiar(url)}>{textoCopiado ? '¡Copiado!' : 'Compartir'}</button>;
}
```

## 🚀 Autenticación Lista para Usar

```tsx
import {
  SignInForm,
  SignUpForm,
  ForgetPasswordForm,
  ResetPinForm
} from 'tucu-ui';

// Formulario completo de inicio de sesión con validación
<SignInForm forgetPasswordPath="/olvide-contraseña" />

// Formulario de registro con aceptación de términos
<SignUpForm />

// Flujo de restablecimiento de contraseña
<ForgetPasswordForm
  onSubmit={manejarRestablecerContraseña}
  resetPinPath="/restablecer-pin"
/>
```

## 📚 Ejemplos Completos

### Aplicación de Dashboard Moderna

```tsx
import { ThemeProvider } from 'tucu-ui';
import { HomeIcon, AnalyticsIcon, UsersIcon, SettingsIcon } from 'tucu-ui';

const elementosMenuDashboard = [
  {
    name: 'Resumen',
    href: '/',
    icon: <HomeIcon />,
    component: <PaginaResumen />,
  },
  {
    name: 'Análisis',
    href: '/analisis',
    icon: <AnalyticsIcon />,
    component: <PaginaAnalisis />,
    dropdownItems: [
      {
        name: 'Reportes',
        href: '/analisis/reportes',
        component: <PaginaReportes />,
      },
      {
        name: 'Insights',
        href: '/analisis/insights',
        component: <PaginaInsights />,
      },
    ],
  },
  {
    name: 'Usuarios',
    href: '/usuarios',
    icon: <UsersIcon />,
    component: <PaginaUsuarios />,
  },
  {
    name: 'Configuración',
    href: '/configuracion',
    icon: <SettingsIcon />,
    component: <PaginaConfiguracion />,
  },
];

function Dashboard() {
  return <ThemeProvider layout="classic" menuItems={elementosMenuDashboard} logo={{ name: 'Panel', secondName: 'Admin' }} brandColor="Blue" showSettings={true} rightButton={<MenuPerfilUsuario />} />;
}
```

### Aplicación de Portfolio DeFi

```tsx
import { ThemeProvider, CoinCard, LivePriceFeed, TransactionInfo } from 'tucu-ui';

const elementosMenuPortfolio = [
  {
    name: 'Portfolio',
    href: '/',
    icon: <WalletIcon />,
    component: <ResumenPortfolio />,
  },
  {
    name: 'Trading',
    href: '/trading',
    icon: <ExchangeIcon />,
    component: <PaginaTrading />,
  },
  {
    name: 'Historial',
    href: '/historial',
    icon: <HistoryIcon />,
    component: <HistorialTransacciones />,
  },
];

function AppDeFi() {
  return (
    <ThemeProvider layout="minimal" menuItems={elementosMenuPortfolio} logo={{ name: 'DeFi', secondName: 'Portfolio' }} brandColor="Green" rightButton={<ConectorWallet />}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CoinCard name="Bitcoin" symbol="BTC" balance="0.5" usdBalance="25,000" change="+5.2%" isChangePositive={true} />
        <LivePriceFeed name="Ethereum" symbol="ETH" balance="10.5" usdBalance="18,750" change="+2.8%" isChangePositive={true} prices={historialPrecioEth} />
        <TransactionInfo label="Valor Total del Portfolio" value="$43,750" />
      </div>
    </ThemeProvider>
  );
}
```

## 🎨 Personalización

### Propiedades CSS Personalizadas

```css
:root {
  --brand: #tu-color-marca;
  --brand-secondary: #tu-color-secundario;
  /* Tucu UI respetará estas variables */
}
```

### Extendiendo Tailwind

```js
// tailwind.config.js
module.exports = {
  extend: {
    colors: {
      brand: {
        DEFAULT: '#tu-color',
        50: '#tu-color-50',
        // ... más tonos
      },
    },
  },
};
```

## 🔧 Desarrollo

```bash
# Clonar el repositorio
git clone <repository-url>

# Instalar dependencias
npm install

# Ejecutar Storybook
npm run storybook

# Ejecutar tests
npm run test

# Construir librería
npm run build
```

## 📄 Licencia

MIT

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor, abre un issue primero para discutir lo que te gustaría cambiar.

## 🌐 Documentación

- **English**: [README.md](./README.md)
- **Español**: [README-es.md](./README-es.md)

---

**Tucu UI** - Componentes React modernos para aplicaciones web de próxima generación.

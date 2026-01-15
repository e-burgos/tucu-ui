# Tucu UI

A modern, comprehensive React component library built with TypeScript, Tailwind CSS v4, and designed for creating production-ready web applications. Features **automatic layout generation**, **advanced routing system** with Standalone and Micro Frontends (MFE) support, **powerful form systems** with React Hook Form, **5000+ icons**, **specialized blockchain components**, and **WCAG 2.1 AA accessibility compliance**.

## 🌟 Documentation

- **📚 [Live Documentation](https://tucu-ui.netlify.app/)** - Complete component documentation
- **🔧 [Component Examples](https://tucu-ui.netlify.app/components)** - See all variations and use cases

## 🚀 Key Features

### **🎨 Automatic Layout Generation**

Complete application layouts with minimal configuration via ThemeProvider - no manual layout coding required.

### **📝 Advanced Form System**

Centralized validation powered by React Hook Form with built-in error handling and accessibility.

### **🪙 Blockchain-Ready Components**

Specialized components for DeFi applications, NFT marketplaces, and crypto wallets.

### **🎭 Advanced Theming System**

34+ color presets with 12-layer color architecture (primary, dark primary, secondary, dark secondary, accent, dark accent, muted, dark muted, backgrounds). Includes modern colors (Bufus Blue, Coral, Mint, Lavender), secondary/accent color support, dark/light mode, RTL support, and persistent user preferences. Dynamic color system with CSS variables for brand, secondary, accent, and semantic colors.

### **🎯 5000+ Icons Integrated**

Complete Lucide React integration + 97+ custom-designed icons including blockchain/crypto icons, layout controls, social brands, and specialized UI elements.

### **♿ Accessibility First**

WCAG 2.1 AA compliant components with proper ARIA attributes and keyboard navigation.

### **📱 Mobile-First Responsive**

Responsive design across all components with support for ultra-wide displays (up to 4K).

### **🌐 Advanced Routing System**

Built-in React Router integration with support for two architectural patterns:

- **Standalone App** (default): Automatic route generation from menuItems
- **Micro Frontends (MFE)**: Explicit route configuration with basePath and route protection

### **🎨 Tailwind CSS v4 Complete Integration**

Full Tailwind CSS v4 implementation with 15 comprehensive utility categories automatically available:

- **Layout & Positioning**: Aspect ratio, display, position, z-index, overflow
- **Sizing**: Width, height, max/min dimensions with arbitrary values
- **Spacing**: Padding, margin, gap with responsive breakpoints
- **Typography**: Font families, sizes, weights, spacing, colors, decoration
- **Flexbox & Grid**: Complete layout system with all properties
- **Background**: Colors, gradients, images, positioning, attachment, repeat, size
- **Borders**: Radius, width, colors, styles, outlines, offsets
- **Effects**: Shadows, opacity, blend modes, box-shadow utilities
- **Filters**: Blur, brightness, contrast, grayscale, hue-rotate, invert, saturate, sepia
- **Tables**: Layout, border spacing, border collapse, caption side
- **Transitions & Animation**: Properties, duration, timing, delay, animation classes
- **Transforms**: Backface visibility, perspective, rotate, scale, skew, translate
- **Interactivity**: Cursors, scroll behavior, snap, touch actions, user select, will-change
- **SVG**: Fill, stroke, stroke-width utilities
- **Accessibility**: Forced-color-adjust utilities

All utilities are configured through optimized `@source inline()` directives for maximum performance.

## 🔧 Core Technology Stack

Built on industry-leading libraries for maximum reliability:

- **[React 18+](https://react.dev/)** - Modern React with hooks and concurrent features
- **[TypeScript](https://www.typescriptlang.org/)** - Full type safety and excellent DX
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Complete Tailwind v4 integration included with all utilities pre-configured
- **[React Hook Form](https://react-hook-form.com/)** - Performant form handling and validation
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management for theming
- **[Lucide React](https://lucide.dev/)** - Beautiful, consistent icon library
- **[Framer Motion](https://www.framer.com/motion/)** - Smooth animations and transitions
- **[Recharts](https://recharts.org/)** - Composable charting library for data visualization
- **[Swiper](https://swiperjs.com/)** - Modern mobile touch slider

## 📦 Installation

```bash
npm install @e-burgos/tucu-ui

// or with pnpm

pnpm install @e-burgos/tucu-ui
```

### Import Tucu UI Styles

Add the following import to your main CSS file (usually `index.css` or `main.css`) to include all Tucu UI styles and Tailwind CSS utilities:

```css
@import '@e-burgos/tucu-ui/styles';
```

**Note:** Tucu UI includes a complete Tailwind CSS v4 setup with all utilities pre-configured. No additional Tailwind CSS installation or configuration is required.

### Advanced Color Customization

Tucu UI supports advanced color theming with multiple color layers:

```css
:root {
  --color-brand: #0184bf; /* Primary brand color */
  --color-secondary: #00d6f2; /* Secondary color */
  --color-accent: #f26522; /* Accent color */
  --color-dark: #0d1321; /* Dark theme background */
  --color-light: #fcfcfc; /* Light theme background */
}
```

Available color presets include: Green, Black, Blue, Red, Purple, Orange, Rose, Pink, Yellow, Lime, Teal, Cyan, Navy, Maroon, Brown, Gray, Silver, Gold, Coral, Salmon, Chocolate, Tan, Beige, Mint, Lavender, Violet, Bufus, BufusBlue, BufusDark, BufusAccent, ThemeLight, ThemeDark.

## 🎯 Quick Start

### 1. **Basic Component Usage**

```tsx
import { Button, CardContainer, Input, Alert } from '@e-burgos/tucu-ui';

function App() {
  return (
    <CardContainer className="p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome to Tucu UI</h2>
      <Input placeholder="Enter your name" className="mb-4" />
      <Button size="large" className="w-full">
        Get Started
      </Button>
      <Alert variant="success" className="mt-4">
        You're ready to build amazing UIs!
      </Alert>
    </CardContainer>
  );
}
```

### 2. **Standalone App Pattern (Default)**

The default pattern for standalone applications with automatic route generation:

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
    name: 'Analytics',
    path: '/analytics',
    icon: <LucideIcons.BarChart3 />,
    component: <AnalyticsPage />,
    dropdownItems: [
      {
        name: 'Reports',
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
    name: 'Settings',
    path: '/settings',
    icon: <LucideIcons.Settings />,
    component: <SettingsPage />,
  },
];

function App() {
  return (
    <ThemeProvider
      // Layout Configuration
      layout="minimal" // 'classic' | 'minimal' | 'none'
      menuItems={menuItems} // Required for Standalone pattern
      logo={{ name: 'My', secondName: 'App' }}
      // Theme Configuration
      brandColor="Blue"
      mode="light"
      // Authentication (Required)
      isAuthenticated={true} // Authentication state
      loginUrl="/login" // Optional: redirect URL for unauthenticated users
      // Optional: Override automatic route generation
      customRoutes={<CustomRoutes />}
      // UI Customization
      showSettings={true}
      rightButton={<UserMenu />}
    />
  );
}
```

### 3. **Micro Frontends (MFE) Pattern**

For micro-frontend architectures with explicit route configuration:

```tsx
import { ThemeProvider } from '@e-burgos/tucu-ui';

const appRoutesConfig = [
  {
    key: 'home',
    path: '/',
    element: <HomePage />,
    isPublic: true, // Public route
  },
  {
    key: 'dashboard',
    path: '/dashboard',
    element: <DashboardPage />,
    isPublic: false, // Private route, requires authentication
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
      architecturalPatterns="mfe" // Activates MFE mode
      basePath="/my-app" // Base path for the micro frontend
      appRoutesConfig={appRoutesConfig} // Required for MFE
      isAuthenticated={true} // Authentication state (Required)
      loginUrl="/login" // Redirect URL for unauthenticated users (Required)
      logo={{ name: 'MFE', secondName: 'App' }}
      showSettings
    />
  );
}
```

**Key Differences:**

- **Standalone**: Uses `menuItems` for automatic route generation
- **MFE**: Uses `basePath` and `appRoutesConfig` for explicit route configuration with protection
- TypeScript ensures you use the correct props for each pattern

### **ThemeProvider Props Reference**

#### **Common Props (Both Patterns)**

| Prop                 | Type                                  | Default     | Description                                                                       |
| -------------------- | ------------------------------------- | ----------- | --------------------------------------------------------------------------------- |
| `layout`             | `'classic' \| 'minimal' \| 'none'`    | `'minimal'` | Layout type: Classic (sidebar), Minimal (horizontal nav), None (no layout)        |
| `logo`               | `{name: string, secondName?: string}` | -           | Application logo configuration                                                    |
| `brandColor`         | `PresetColorType`                     | -           | Primary brand color preset (auto-disabled if `customPaletteColor.primary` is set) |
| `mode`               | `'light' \| 'dark'`                   | `'light'`   | Initial theme mode                                                                |
| `customPaletteColor` | `object`                              | -           | Advanced color customization                                                      |
| `showSettings`       | `boolean`                             | `false`     | Display settings panel toggle button                                              |
| `rightButton`        | `React.ReactNode`                     | -           | Custom component for top-right header area                                        |
| `headerClassName`    | `string`                              | -           | Custom CSS classes for header container                                           |
| `contentClassName`   | `string`                              | -           | Custom CSS classes for main content area                                          |
| `className`          | `string`                              | -           | Custom CSS classes for entire layout                                              |
| `fullWidth`          | `boolean`                             | `false`     | Enable full-width layout (removes max-width constraints)                          |
| `settingActions`     | `ISettingAction`                      | -           | Control which settings are disabled in the settings panel                         |

#### **Standalone App Pattern Props**

| Prop                    | Type                            | Default        | Description                                      |
| ----------------------- | ------------------------------- | -------------- | ------------------------------------------------ |
| `architecturalPatterns` | `'standalone'`                  | `'standalone'` | Architectural pattern (default, can be omitted)  |
| `menuItems`             | `StandaloneAppRoutesMenuItem[]` | Required       | Navigation menu items with routing configuration |
| `isAuthenticated`       | `boolean`                       | Required       | Authentication state for route protection        |
| `loginUrl`              | `string`                        | -              | Optional: Redirect URL for unauthenticated users |
| `customRoutes`          | `ReactElement<typeof Routes>`   | -              | Optional: Override automatic route generation    |
| `withRouterProvider`    | `boolean`                       | `true`         | Enable automatic React Router setup              |

#### **Micro Frontends (MFE) Pattern Props**

| Prop                    | Type                  | Default  | Description                                            |
| ----------------------- | --------------------- | -------- | ------------------------------------------------------ |
| `architecturalPatterns` | `'mfe'`               | Required | Must be set to `'mfe'` to activate MFE mode            |
| `basePath`              | `string`              | Required | Base path for the micro frontend (e.g., `/my-app`)     |
| `appRoutesConfig`       | `IAppRouteConfig[]`   | Required | Explicit route configuration with protection           |
| `isAuthenticated`       | `boolean`             | Required | Authentication state for route protection              |
| `loginUrl`              | `string`              | Required | Redirect URL for unauthenticated users                 |
| `menuItems`             | `AppRoutesMenuItem[]` | -        | Optional: Navigation menu items (separate from routes) |

**Note:** TypeScript ensures type safety - you cannot mix Standalone and MFE props. The type system will show errors at compile time if you use incorrect props for the selected pattern.

### **useTheme Hook - Complete API**

The `useTheme` hook provides full programmatic control over the theme system:

```tsx
import { useTheme } from '@e-burgos/tucu-ui';

function ThemeControls() {
  const {
    // Current State
    mode, // 'light' | 'dark'
    layout, // 'classic' | 'minimal' | 'none'
    direction, // 'ltr' | 'rtl'
    preset, // Current primary color preset
    secondaryPreset, // Current secondary color preset
    accentPreset, // Current accent color preset
    darkPreset, // Current dark theme preset
    lightPreset, // Current light theme preset
    logo, // Current logo configuration
    isSettingsOpen, // Settings panel open state
    showSettings, // Settings button visibility
    settingActions, // Current settings configuration

    // State Setters
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
    restoreDefaultColors, // () => void - Reset all colors to defaults
  } = useTheme();

  return (
    <div>
      {/* Theme Mode Controls */}
      <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>Toggle to {mode === 'light' ? 'Dark' : 'Light'} Mode</button>

      {/* Layout Controls */}
      <button onClick={() => setLayout('classic')}>Classic Layout</button>
      <button onClick={() => setLayout('minimal')}>Minimal Layout</button>
      <button onClick={() => setLayout('none')}>No Layout</button>

      {/* Direction Controls */}
      <button onClick={() => setDirection(direction === 'ltr' ? 'rtl' : 'ltr')}>Switch to {direction === 'ltr' ? 'RTL' : 'LTR'}</button>

      {/* Color Controls */}
      <button onClick={() => setPreset({ label: 'Purple', value: '#9370DB' })}>Purple Theme</button>

      <button onClick={() => setSecondaryPreset({ label: 'Blue', value: '#3B82F6' })}>Blue Secondary</button>

      {/* Settings Panel Controls */}
      <button onClick={() => setIsSettingsOpen(!isSettingsOpen)}>{isSettingsOpen ? 'Close' : 'Open'} Settings</button>

      <button onClick={() => setShowSettings(!showSettings)}>{showSettings ? 'Hide' : 'Show'} Settings Button</button>

      {/* Reset Colors */}
      <button onClick={restoreDefaultColors}>Reset to Default Colors</button>
    </div>
  );
}
```

### **Menu Items Structure**

#### **Standalone App Pattern**

```tsx
interface StandaloneAppRoutesMenuItem {
  name: string; // Display name
  path: string; // Navigation URL path (route path)
  href?: string; // Optional: external link URL (if different from path)
  icon?: React.ReactNode; // Optional icon component
  component: JSX.Element; // Page component to render
  isPublic?: boolean; // Whether route is publicly accessible (default: true)
  dropdownItems?: StandaloneAppRoutesMenuItem[]; // Nested submenu items
  hide?: boolean; // Hide from navigation (default: false)
  onClick?: () => void; // Optional click handler
}
```

#### **Micro Frontends (MFE) Pattern**

```tsx
interface IAppRouteConfig extends RouteProps {
  key: string; // Unique identifier for the route
  path: string; // Route path
  element: JSX.Element; // Component to render
  isPublic?: boolean; // Whether the route is publicly accessible
  disabled?: boolean; // Whether the route is disabled
}

interface AppRoutesMenuItem {
  name: string; // Display name (for navigation menu)
  path: string; // Navigation URL path
  href?: string; // Optional: external link URL (if different from path)
  icon?: React.ReactNode; // Optional icon component
  hide?: boolean; // Hide from navigation (default: false)
  onClick?: () => void; // Optional click handler
  // Note: component is NOT used in MFE pattern - routes are defined in appRoutesConfig
}
```

### **Available Color Presets**

Tucu UI includes 34+ built-in color presets with 12-layer color architecture:

**Basic Colors:** Green, Black, Blue, Red, Purple, Orange, Rose, Pink, Yellow, Lime, Teal, Cyan

**Extended Colors:** Navy, Maroon, Brown, Gray, Silver, Gold, Coral, Salmon, Chocolate, Tan, Beige

**Modern Colors:** Mint, Lavender, Violet, BufusBlue, Bufus, BufusAccent, BufusDark

**Theme Colors:** ThemeLight, ThemeDark

Each preset includes 12 color layers: primary, dark primary, secondary, dark secondary, accent, dark accent, muted, dark muted, and background variations.

### **Theme Persistence**

All theme settings (colors, layout, mode, direction) are automatically persisted to localStorage and restored on app reload.

**That's it!** Your complete application with routing, navigation, theming, and responsive design is ready.

## 🎨 Layout System

### **Three Layout Types**

#### **1. Classic Layout** - Traditional Dashboard

- Fixed sidebar with expandable navigation
- Header with logo and actions
- Perfect for admin panels and complex applications

#### **2. Minimal Layout** - Modern & Clean

- Horizontal navigation bar
- Backdrop blur effects
- Ideal for content-focused applications

#### **3. None Layout** - Maximum Flexibility

- No predefined layout structure
- Perfect for auth pages and custom designs

### **Architectural Patterns**

Tucu UI supports two architectural patterns for different use cases:

#### **Standalone App Pattern (Default)**

- Automatic route generation from `menuItems`
- Simple configuration with menu-driven navigation
- Perfect for single-page applications
- Optional `customRoutes` for advanced routing needs

#### **Micro Frontends (MFE) Pattern**

- Explicit route configuration with `appRoutesConfig`
- Route protection with `isPublic` and `isAuthenticated`
- Base path support for micro-frontend integration
- TypeScript ensures correct prop usage for each pattern

### **Automatic Features**

- ✅ **Responsive Design** - Mobile drawer, tablet adaptations
- ✅ **Dark/Light Mode** - Automatic theme switching
- ✅ **RTL Support** - Full right-to-left language support
- ✅ **Brand Colors** - 34+ color presets with multi-layer architecture
- ✅ **Settings Panel** - Built-in user customization
- ✅ **Routing Integration** - Automatic route generation (Standalone) or explicit configuration (MFE)
- ✅ **Type Safety** - TypeScript discriminated unions ensure correct pattern usage

### **Theme Management**

```tsx
import { useTheme } from '@e-burgos/tucu-ui';

function ThemeControls() {
  const {
    mode, // 'light' | 'dark'
    layout, // 'classic' | 'minimal' | 'none'
    direction, // 'ltr' | 'rtl'
    preset, // Current color preset
    setMode,
    setLayout,
    setPreset,
  } = useTheme();

  return (
    <div>
      <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>Toggle {mode === 'light' ? 'Dark' : 'Light'} Mode</button>

      <button onClick={() => setLayout('classic')}>Switch to Classic Layout</button>

      <button onClick={() => setPreset({ label: 'Purple', value: '#9370DB' })}>Purple Theme</button>
    </div>
  );
}
```

## 📝 Advanced Form System

### **Comprehensive Form Components**

```tsx
import { Form, FormField, Input, Textarea, Checkbox, RadioGroup, Select, PinCode, FileInput, Button } from '@e-burgos/tucu-ui';
```

### **Centralized Validation**

```tsx
interface UserFormData {
  email: string;
  password: string;
  country: string;
  newsletter: boolean;
}

function UserRegistrationForm() {
  const handleSubmit = (data: UserFormData) => {
    console.log('Form submitted:', data);
  };

  return (
    <Form<UserFormData>
      onSubmit={handleSubmit}
      useFormProps={{
        defaultValues: {
          email: '',
          password: '',
          country: '',
          newsletter: false,
        },
        mode: 'onChange',
      }}
    >
      <FormField<UserFormData>
        name="email"
        label="Email Address"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        }}
      >
        <Input type="email" placeholder="Enter your email" />
      </FormField>

      <FormField<UserFormData>
        name="password"
        label="Password"
        rules={{
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters',
          },
        }}
      >
        <Input type="password" placeholder="Enter your password" />
      </FormField>

      <FormField<UserFormData> name="country" label="Country">
        <Select
          options={[
            { name: 'United States', value: 'us' },
            { name: 'Canada', value: 'ca' },
            { name: 'Mexico', value: 'mx' },
          ]}
        />
      </FormField>

      <FormField<UserFormData> name="newsletter" label="Newsletter Subscription">
        <Checkbox>Subscribe to our newsletter</Checkbox>
      </FormField>

      <Button type="submit" size="large" className="w-full">
        Create Account
      </Button>
    </Form>
  );
}
```

### **Specialized Form Components**

```tsx
// PIN Code Input
<FormField name="verificationCode" label="Verification Code">
  <PinCode length={6} type="number" placeholder="-" />
</FormField>

// File Upload with Drag & Drop
<FormField name="documents" label="Upload Documents">
  <FileInput
    multiple
    accept="imgAndPdf"
    placeholderText="Drop files here or click to upload"
  />
</FormField>

// Radio Button Groups
<FormField name="subscription" label="Choose Plan">
  <RadioGroup
    options={[
      { value: 'basic', label: 'Basic - $9/month' },
      { value: 'pro', label: 'Pro - $29/month' },
      { value: 'enterprise', label: 'Enterprise - $99/month' },
    ]}
    direction="vertical"
  />
</FormField>
```

## 🪙 Blockchain & DeFi Components

### **Cryptocurrency Components**

```tsx
import { CoinCard, CoinInfoCard, LivePriceFeed, TransactionInfo, CurrencySwapIcons } from '@e-burgos/tucu-ui';

function CryptoPortfolio() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Portfolio Balance Cards */}
      <CoinCard name="Bitcoin" symbol="BTC" logo="/icons/bitcoin.svg" balance="1.25" usdBalance="45,000" change="+5.2%" isChangePositive={true} color="#FDEDD4" />

      {/* Live Price Feed with Chart */}
      <LivePriceFeed name="Ethereum" symbol="ETH" icon={<EthereumIcon />} balance="10.5" usdBalance="33,600" change="+2.8%" isChangePositive={true} prices={priceHistory} />

      {/* Transaction Details */}
      <div className="space-y-3">
        <TransactionInfo label="Gas Fee" value="0.002 ETH" />
        <TransactionInfo label="Network" value="Ethereum Mainnet" />
        <TransactionInfo label="Status" value="Confirmed" />
      </div>
    </div>
  );
}
```

### **NFT Components**

```tsx
import { NFTGrid, CollectionCard } from '@e-burgos/tucu-ui';

function NFTGallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <NFTGrid author="CryptoArtist" authorImage="/avatars/artist.jpg" image="/nfts/artwork-123.jpg" name="Digital Masterpiece #123" collection="Abstract Collection" price="2.5 ETH" />

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

## 🎯 Complete Icon System

### **5000+ Lucide Icons**

```tsx
import { LucideIcons } from '@e-burgos/tucu-ui';

function IconShowcase() {
  return (
    <div className="flex gap-4">
      {/* Navigation Icons */}
      <LucideIcons.Home className="w-6 h-6" />
      <LucideIcons.Settings className="w-6 h-6" />
      <LucideIcons.User className="w-6 h-6" />

      {/* Action Icons */}
      <LucideIcons.Plus className="w-6 h-6 text-green-500" />
      <LucideIcons.Trash2 className="w-6 h-6 text-red-500" />
      <LucideIcons.Edit className="w-6 h-6 text-blue-500" />

      {/* Communication Icons */}
      <LucideIcons.Mail className="w-6 h-6" />
      <LucideIcons.Phone className="w-6 h-6" />
      <LucideIcons.MessageCircle className="w-6 h-6" />
    </div>
  );
}
```

### **97+ Custom Icons**

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

  // Layout Controls
  ClassicLayoutIcon,
  MinimalLayoutIcon,
  ModernLayoutIcon,
  RetroLayoutIcon,

  // Navigation & UI
  HomeIcon,
  SearchIcon,
  MenuIcon,
  Close,
  ArrowRight,
  ArrowUp,
  ArrowLinkIcon,

  // Social Brands
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

## 🔧 UI Components Library

### **Layout & Navigation**

```tsx
import { Modal, Drawer, CardContainer, PanelActionCard, Carousel, CarouselCards, CarouselImage } from '@e-burgos/tucu-ui';

// Modal with Accessibility
<Modal
  isOpen={isOpen}
  setIsOpen={setIsOpen}
  text={{
    title: 'Confirm Action',
    content: 'Are you sure you want to proceed?',
    button: 'Confirm',
    backButton: 'Cancel',
  }}
  onSubmit={handleConfirm}
/>

// Responsive Drawer
<Drawer
  type="sidebar-menu"
  isOpen={isDrawerOpen}
  setIsOpen={setIsDrawerOpen}
  menuItems={menuItems}
  position="left"
/>

// Action Cards
<PanelActionCard
  title="User Settings"
  actions={[
    { label: 'Save', onClick: handleSave },
    { label: 'Cancel', variant: 'ghost', onClick: handleCancel },
  ]}
>
  <UserSettingsForm />
</PanelActionCard>
```

### **Carousel Components**

Complete carousel system with multiple variants:

```tsx
import { Carousel, CarouselCards, CarouselImage } from '@e-burgos/tucu-ui';

// Basic Carousel
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

// Card Carousel
<CarouselCards
  cards={[
    { title: 'Card 1', description: 'Description 1', content: <div>Content 1</div> },
    { title: 'Card 2', description: 'Description 2', content: <div>Content 2</div> },
  ]}
  showNavigation
  showPagination
/>

// Image Carousel
<CarouselImage
  images={[
    { src: '/image1.jpg', alt: 'Image 1', title: 'Title 1' },
    { src: '/image2.jpg', alt: 'Image 2', title: 'Title 2' },
  ]}
  showNavigation
  showPagination
/>
```

### **Feedback Components**

```tsx
import { Alert, useToastStore } from '@e-burgos/tucu-ui';

// Alert Messages
<Alert variant="success" dismissible>
  Your changes have been saved successfully!
</Alert>

<Alert variant="warning">
  Your session will expire in 5 minutes.
</Alert>

// Toast Notifications
function ToastExample() {
  const { addToast } = useToastStore();

  const showToast = () => {
    addToast({
      id: Date.now().toString(),
      title: 'Success!',
      message: 'Your profile has been updated',
      variant: 'success',
    });
  };

  return <Button onClick={showToast}>Show Toast</Button>;
}
```

## 🎣 Utility Hooks

Comprehensive collection of custom React hooks for common patterns:

```tsx
import { useBreakpoint, useIsMobile, useCopyToClipboard, useClickAway, useElementSize, useMeasure, useLockBodyScroll, useToastStore, useGridSwitcher } from '@e-burgos/tucu-ui';

function UtilityExample() {
  // Responsive Hooks
  const breakpoint = useBreakpoint(); // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  const { isMobile } = useIsMobile();

  // Element Measurement
  const [ref, { width, height }] = useElementSize();
  const [measureRef, bounds] = useMeasure();

  // Interaction Hooks
  const [copiedText, copy] = useCopyToClipboard();
  const clickAwayRef = useRef(null);
  useClickAway(clickAwayRef, () => setIsOpen(false));

  // UI State Management
  const { addToast, dismissToast, toasts } = useToastStore();
  const { isGridCompact, setIsGridCompact } = useGridSwitcher();

  return (
    <div>
      <p>Current breakpoint: {breakpoint}</p>
      {isMobile && <MobileOnlyComponent />}

      <div ref={ref}>
        Size: {width} × {height}px
      </div>

      <button onClick={() => copy('Hello World!')}>{copiedText ? 'Copied!' : 'Copy Text'}</button>

      <button
        onClick={() =>
          addToast({
            id: Date.now().toString(),
            title: 'Success!',
            message: 'Operation completed',
            variant: 'success',
          })
        }
      >
        Show Toast
      </button>
    </div>
  );
}
```

## 🚀 Ready-to-Use Authentication

```tsx
import { SignInForm, SignUpForm, ForgetPasswordForm, ResetPinForm } from '@e-burgos/tucu-ui';

// Complete authentication flow
function AuthPages() {
  return (
    <ThemeProvider layout="none" menuItems={[]} isAuthenticated={false} loginUrl="/login">
      <div className="min-h-screen flex items-center justify-center">
        {/* Sign In with validation */}
        <SignInForm forgetPasswordPath="/forgot-password" />

        {/* Sign Up with terms */}
        <SignUpForm />

        {/* Password Reset */}
        <ForgetPasswordForm onSubmit={handlePasswordReset} resetPinPath="/reset-pin" />
      </div>
    </ThemeProvider>
  );
}
```

## 📚 Complete Examples

### **Introduction & Documentation Pages**

Tucu UI includes comprehensive documentation pages to help you get started:

- **Introduction** - Overview and getting started guide
- **TailwindV4** - Complete Tailwind CSS v4 integration guide with 15 utility categories
- **Features** - Explore all available features and utilities
  - **Routing System** - Standalone and MFE architectural patterns
  - **Icons System** - 5000+ Lucide icons + 97+ custom icons
  - **Hooks Utilities** - Custom React hooks for common patterns
  - **Accessibility** - WCAG 2.1 AA compliance and best practices
- **Components** - Component library overview and usage patterns
  - **UI Components** - 43+ UI components (buttons, cards, dialogs, notifications, etc.)
  - **Input Components** - 11+ form input components
  - **Blockchain Components** - 9+ specialized DeFi/Web3 components
- **Form System** - Complete form solution with validation
  - **Form Examples** - Interactive examples and real-world patterns
  - **Code Examples** - Implementation patterns and best practices
- **Theming Guide** - Advanced theming and customization options
- **Design System** - Visual design principles and guidelines
- **Colors** - Complete color palette and theming system
- **Layout System** - Responsive layout patterns and techniques

### **15 Tailwind CSS v4 Utility Documentation Pages**

Comprehensive documentation for all Tailwind utilities:

- **Layout Utilities** - Aspect ratio, display, position, z-index, overflow
- **Flexbox & Grid Utilities** - Complete layout system documentation
- **Background Utilities** - Colors, gradients, images, positioning
- **Borders Utilities** - Radius, width, colors, styles, outlines
- **Typography Utilities** - Fonts, sizes, weights, spacing, colors
- **Effects Utilities** - Shadows, opacity, blend modes
- **Filters Utilities** - Blur, brightness, contrast, and more
- **Tables Utilities** - Layout, spacing, display properties
- **Transitions & Animations** - Smooth animations and transitions
- **Transforms Utilities** - Rotate, scale, skew, translate
- **Interactivity Utilities** - Cursors, scroll, touch actions
- **SVG Utilities** - Fill, stroke, stroke-width
- **Accessibility Utilities** - Screen reader and focus utilities

### **Modern Dashboard (Standalone Pattern)**

```tsx
import { ThemeProvider, LucideIcons, useTheme } from '@e-burgos/tucu-ui';

const dashboardMenuItems = [
  {
    name: 'Overview',
    path: '/',
    icon: <LucideIcons.LayoutDashboard />,
    component: <OverviewPage />,
  },
  {
    name: 'Analytics',
    path: '/analytics',
    icon: <LucideIcons.BarChart3 />,
    component: <AnalyticsPage />,
    dropdownItems: [
      {
        name: 'Reports',
        path: '/analytics/reports',
        component: <ReportsPage />,
      },
      {
        name: 'Real-time',
        path: '/analytics/realtime',
        component: <RealtimePage />,
      },
    ],
  },
  {
    name: 'Users',
    path: '/users',
    icon: <LucideIcons.Users />,
    component: <UsersPage />,
  },
];

function Dashboard() {
  return (
    <ThemeProvider
      layout="classic"
      menuItems={dashboardMenuItems} // Standalone pattern (default)
      isAuthenticated={true}
      loginUrl="/login"
      logo={{ name: 'Admin', secondName: 'Panel' }}
      brandColor="BufusBlue"
      showSettings={true}
      rightButton={<UserProfileMenu />}
    />
  );
}
```

### **DeFi Application (Standalone Pattern)**

```tsx
import { ThemeProvider, CoinCard, LivePriceFeed, LucideIcons } from '@e-burgos/tucu-ui';

const defiMenuItems = [
  {
    name: 'Portfolio',
    path: '/',
    icon: <LucideIcons.Wallet />,
    component: <PortfolioPage />,
  },
  {
    name: 'Swap',
    path: '/swap',
    icon: <LucideIcons.ArrowLeftRight />,
    component: <SwapPage />,
  },
  {
    name: 'Staking',
    path: '/staking',
    icon: <LucideIcons.Coins />,
    component: <StakingPage />,
  },
];

function DeFiApp() {
  return (
    <ThemeProvider
      layout="minimal"
      menuItems={defiMenuItems} // Standalone pattern
      isAuthenticated={true}
      loginUrl="/login"
      logo={{ name: 'DeFi', secondName: 'Portfolio' }}
      brandColor="Green"
      rightButton={<WalletConnector />}
    />
  );
}
```

### **Micro Frontend Application (MFE Pattern)**

```tsx
import { ThemeProvider, LucideIcons } from '@e-burgos/tucu-ui';

const appRoutesConfig = [
  {
    key: 'portfolio',
    path: '/',
    element: <PortfolioPage />,
    isPublic: false,
  },
  {
    key: 'swap',
    path: '/swap',
    element: <SwapPage />,
    isPublic: false,
  },
  {
    key: 'staking',
    path: '/staking',
    element: <StakingPage />,
    isPublic: false,
  },
];

function MfeDeFiApp() {
  const isAuthenticated = useAuth(); // Your auth hook

  return (
    <ThemeProvider
      architecturalPatterns="mfe" // MFE pattern
      basePath="/defi-app"
      appRoutesConfig={appRoutesConfig}
      isAuthenticated={isAuthenticated}
      loginUrl="/login" // Required for MFE pattern
      logo={{ name: 'DeFi', secondName: 'MFE' }}
      brandColor="Green"
    />
  );
}
```

### **E-commerce Platform (Standalone Pattern)**

```tsx
import { ThemeProvider, LucideIcons, Form, FormField, Input } from '@e-burgos/tucu-ui';

const ecommerceMenuItems = [
  {
    name: 'Products',
    path: '/products',
    icon: <LucideIcons.Package />,
    component: <ProductsPage />,
  },
  {
    name: 'Orders',
    path: '/orders',
    icon: <LucideIcons.ShoppingCart />,
    component: <OrdersPage />,
  },
  {
    name: 'Customers',
    path: '/customers',
    icon: <LucideIcons.Users />,
    component: <CustomersPage />,
  },
];

function EcommerceAdmin() {
  return (
    <ThemeProvider
      layout="classic"
      menuItems={ecommerceMenuItems} // Standalone pattern
      isAuthenticated={true}
      loginUrl="/login"
      logo={{ name: 'Shop', secondName: 'Admin' }}
      brandColor="Purple"
      showSettings={true}
    />
  );
}
```

## 🎨 Customization & Theming

### **Advanced Color System**

Tucu UI supports a multi-layered color system with 34+ presets and 12-layer color architecture:

```tsx
<ThemeProvider
  brandColor="BufusBlue" // Primary brand color
  secondaryColor="Bufus" // Secondary color for accents
  accentColor="BufusAccent" // Accent color for highlights
  darkColor="ThemeDark" // Dark theme base color
  lightColor="ThemeLight" // Light theme base color
  // ... other options
/>
```

### **CSS Custom Properties**

```css
:root {
  --color-brand: #0184bf; /* Primary brand color */
  --color-secondary: #00d6f2; /* Secondary color */
  --color-accent: #f26522; /* Accent color */
  --color-dark: #0d1321; /* Dark theme background */
  --color-light: #fcfcfc; /* Light theme background */
  --color-body: var(--color-light);
  --color-sidebar-body: #f8fafc;
  --color-light-dark: #171e2e;
  --color-dark-light: #f8fafc;

  /* Dynamic color mixing */
  --color-muted: color-mix(in oklab, var(--color-brand) 50%, transparent);
  --color-success: var(--color-emerald-500);
  --color-warning: var(--color-orange-500);
  --color-error: var(--color-red-500);
  --color-info: var(--color-blue-500);
}
```

### **Extending Tailwind Configuration**

```js
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/@e-burgos/tucu-ui/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'rgb(var(--color-brand) / <alpha-value>)',
          50: '#eff6ff',
          // ... more shades
        },
      },
      spacing: {
        13: '3.375rem', // Custom spacing used by Tucu UI
      },
    },
  },
};
```

## ♿ Accessibility Features

Tucu UI is built with accessibility in mind:

- ✅ **WCAG 2.1 AA Compliance** - Meeting accessibility standards
- ✅ **Keyboard Navigation** - Full keyboard support across components
- ✅ **Screen Reader Support** - Proper ARIA attributes and semantic HTML
- ✅ **Focus Management** - Visible focus indicators and logical tab order
- ✅ **Color Contrast** - Sufficient contrast ratios in all themes
- ✅ **Motion Preferences** - Respects user's motion preferences

## 🔧 Development & Contributing

### **Development Setup**

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Run Storybook for development
npm run @e-burgos/tucu-ui

# Build the library
npm run @e-burgos/tucu-ui:build

# Run tests
npm test
```

### **Nx Monorepo Structure**

```
@e-burgos/tucu-ui/
├── apps/
│   └── demo/                 # Demo application
├── ui/
│   └── tucu-ui/             # Main library
│       ├── src/
│       │   ├── components/   # All UI components
│       │   ├── hooks/       # Utility hooks
│       │   ├── themes/      # Theme system
│       │   └── storybook/   # Documentation
│       └── package.json
└── nx.json                  # Nx configuration
```

## 📄 License

MIT License - feel free to use in your projects!

## 🤝 Contributing

Contributions are welcome! Please:

1. **Fork the repository**
2. **Create a feature branch**
3. **Add tests for new features**
4. **Update documentation**
5. **Submit a pull request**

## 🌐 Community & Support

- **📚 [Documentation](https://tucu-ui.netlify.app/)** - Complete guides and examples
- **🐛 [Issues](https://github.com/e-burgos/tucu-ui/issues)** - Report bugs and request features
- **💬 [Discussions](https://github.com/e-burgos/tucu-ui/discussions)** - Community support and ideas

---

**Tucu UI** - Build beautiful, accessible, and production-ready React applications with confidence.

_Perfect for dashboards, e-commerce platforms, DeFi applications, and any modern web application that demands quality and consistency._

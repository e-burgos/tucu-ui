# Tucu UI

A modern, comprehensive React component library built with TypeScript, Tailwind CSS, and designed for creating production-ready web applications with **automatic layout generation**, **powerful form systems**, and **specialized blockchain components**.

## 🌟 Storybook & Documentation

- **📚 [Live Documentation](https://main--683712ba90eaad206f988c65.chromatic.com/?path=/docs/1-documentation-1-introduction--documentation)** - Complete component documentation
- **🎨 [Interactive Storybook](https://main--683712ba90eaad206f988c65.chromatic.com/)** - Explore components in action
- **🔧 [Component Examples](https://main--683712ba90eaad206f988c65.chromatic.com/?path=/story/ui-components-buttons-button--default)** - See all variations and use cases

## 🚀 Key Features

### **🎨 Automatic Layout Generation**

Complete application layouts with minimal configuration via ThemeProvider - no manual layout coding required.

### **📝 Advanced Form System**

Centralized validation powered by React Hook Form with built-in error handling and accessibility.

### **🪙 Blockchain-Ready Components**

Specialized components for DeFi applications, NFT marketplaces, and crypto wallets.

### **🎭 Advanced Theming System**

26+ color presets including modern colors (Bufus Blue, Coral, Mint, Lavender), secondary/accent color support, dark/light mode, RTL support, and persistent user preferences. Dynamic color system with CSS variables for brand, secondary, accent, and semantic colors.

### **🎯 5000+ Icons Integrated**

Complete Lucide React integration + 97+ custom-designed icons including blockchain/crypto icons, layout controls, social brands, and specialized UI elements.

### **♿ Accessibility First**

WCAG 2.1 AA compliant components with proper ARIA attributes and keyboard navigation.

### **📱 Mobile-First Responsive**

Responsive design across all components with support for ultra-wide displays (up to 4K).

### **🌐 Integrated Routing**

Built-in React Router integration for seamless SPA development.

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
- **[React Dropzone](https://react-dropzone.js.org/)** - Simple HTML5 drag-drop zone

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
import { Button, Card, Input, Alert } from '@e-burgos/tucu-ui';

function App() {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome to Tucu UI</h2>
      <Input placeholder="Enter your name" className="mb-4" />
      <Button size="large" className="w-full">
        Get Started
      </Button>
      <Alert variant="success" className="mt-4">
        You're ready to build amazing UIs!
      </Alert>
    </Card>
  );
}
```

### 2. **Complete App with Auto-Generated Layout**

```tsx
import { ThemeProvider, LucideIcons } from '@e-burgos/tucu-ui';

const menuItems = [
  {
    name: 'Dashboard',
    href: '/',
    icon: <LucideIcons.Home />,
    component: <DashboardPage />,
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: <LucideIcons.BarChart3 />,
    component: <AnalyticsPage />,
    dropdownItems: [
      {
        name: 'Reports',
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
    name: 'Settings',
    href: '/settings',
    icon: <LucideIcons.Settings />,
    component: <SettingsPage />,
  },
  {
    name: 'Profile',
    href: '/profile',
    icon: <LucideIcons.User />,
    component: <ProfilePage />,
    hide: true,
  },
];

function App() {
  return (
    <ThemeProvider
      // Layout Configuration
      layout="minimal" // 'classic' | 'minimal' | 'none'
      menuItems={menuItems}
      logo={{ name: 'My', secondName: 'App' }}
      // Theme Configuration
      brandColor="Blue" // Available: 'Green' | 'Black' | 'Blue' | 'Red' | 'Purple' | 'Orange' | 'Rose' | 'Pink' | 'Yellow' | 'Lime' | 'Teal' | 'Cyan' | 'Navy' | 'Maroon' | 'Brown' | 'Gray' | 'Silver' | 'Gold' | 'Coral' | 'Salmon'
      mode="light" // 'light' | 'dark'
      // Advanced Color Customization
      customPaletteColor={{
        primary: '#0184bf', // Custom hex color for brand
        secondary: '#00d6f2', // Custom hex color for secondary
        accent: '#f26522', // Custom hex color for accent
        dark: '#0d1321', // Custom hex color for dark mode background
        light: '#fcfcfc', // Custom hex color for light mode background
      }}
      // UI Customization
      showSettings={true} // Show/hide settings panel button
      rightButton={<UserMenu />} // Custom component for top-right area
      headerClassName="custom-header" // Custom CSS classes for header
      contentClassName="custom-content" // Custom CSS classes for content area
      className="custom-layout" // Custom CSS classes for entire layout
      fullWidth={false} // Enable/disable full width layout
      // Advanced Configuration
      withRouterProvider={true} // Enable/disable automatic React Router setup
      customRoutes={<CustomRoutes />} // Custom React Router Routes element
      settingActions={{
        disabledPreset: false, // Disable color preset selector
        disabledLayout: false, // Disable layout selector
        disabledMode: false, // Disable dark/light mode toggle
        disabledDirection: false, // Disable RTL/LTR direction toggle
      }}
    />
  );
}
```

### **ThemeProvider Props Reference**

| Prop                           | Type                                  | Default     | Description                                                                       |
| ------------------------------ | ------------------------------------- | ----------- | --------------------------------------------------------------------------------- |
| `layout`                       | `'classic' \| 'minimal' \| 'none'`    | `'minimal'` | Layout type: Classic (sidebar), Minimal (horizontal nav), None (no layout)        |
| `menuItems`                    | `AppRoutesMenuItem[]`                 | Required    | Navigation menu items with routing configuration                                  |
| `logo`                         | `{name: string, secondName?: string}` | -           | Application logo configuration                                                    |
| `brandColor`                   | `PresetColorType`                     | -           | Primary brand color preset (auto-disabled if `customPaletteColor.primary` is set) |
| `mode`                         | `'light' \| 'dark'`                   | `'light'`   | Initial theme mode                                                                |
| `customPaletteColor`           | `object`                              | -           | Advanced color customization                                                      |
| `customPaletteColor.primary`   | `string \| PresetColorType`           | -           | Custom primary/brand color (hex or preset)                                        |
| `customPaletteColor.secondary` | `string \| PresetColorType`           | -           | Custom secondary color (hex or preset)                                            |
| `customPaletteColor.accent`    | `string \| PresetColorType`           | -           | Custom accent color (hex or preset)                                               |
| `customPaletteColor.dark`      | `string \| PresetColorType`           | -           | Custom dark mode background color                                                 |
| `customPaletteColor.light`     | `string \| PresetColorType`           | -           | Custom light mode background color                                                |
| `showSettings`                 | `boolean`                             | `false`     | Display settings panel toggle button                                              |
| `rightButton`                  | `React.ReactNode`                     | -           | Custom component for top-right header area                                        |
| `headerClassName`              | `string`                              | -           | Custom CSS classes for header container                                           |
| `contentClassName`             | `string`                              | -           | Custom CSS classes for main content area                                          |
| `className`                    | `string`                              | -           | Custom CSS classes for entire layout                                              |
| `fullWidth`                    | `boolean`                             | `false`     | Enable full-width layout (removes max-width constraints)                          |
| `withRouterProvider`           | `boolean`                             | `true`      | Enable automatic React Router setup                                               |
| `customRoutes`                 | `ReactElement<typeof Routes>`         | -           | Custom React Router Routes element                                                |
| `settingActions`               | `ISettingAction`                      | -           | Control which settings are disabled in the settings panel                         |

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

```tsx
interface AppRoutesMenuItem {
  name: string; // Display name
  href: string; // Navigation URL path
  icon?: React.ReactNode; // Optional icon component
  component: JSX.Element; // Page component to render
  dropdownItems?: AppRoutesMenuItem[]; // Nested submenu items
  hide?: boolean; // Hide from navigation (default: false)
  onClick?: () => void; // Optional click handler
}
```

### **Available Color Presets**

Tucu UI includes 26+ built-in color presets:

**Basic Colors:** Green, Black, Blue, Red, Purple, Orange, Rose, Pink, Yellow, Lime, Teal, Cyan

**Extended Colors:** Navy, Maroon, Brown, Gray, Silver, Gold, Coral, Salmon

**Advanced Colors:** BufusBlue, Bufus, BufusAccent, BufusDark, ThemeLight, ThemeDark

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

### **Automatic Features**

- ✅ **Responsive Design** - Mobile drawer, tablet adaptations
- ✅ **Dark/Light Mode** - Automatic theme switching
- ✅ **RTL Support** - Full right-to-left language support
- ✅ **Brand Colors** - 6 predefined color presets
- ✅ **Settings Panel** - Built-in user customization
- ✅ **Routing Integration** - Automatic route generation

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
import { Form, FormField, Input, Textarea, Checkbox, RadioGroup, InputSelect, PinCode, FileInput, Button } from '@e-burgos/tucu-ui';
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
        <InputSelect
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
import { Modal, Drawer, CardContainer, PanelActionCard } from '@e-burgos/tucu-ui';

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

### **Feedback Components**

```tsx
import { Alert, Toast, useToast } from '@e-burgos/tucu-ui';

// Alert Messages
<Alert variant="success" dismissible>
  Your changes have been saved successfully!
</Alert>

<Alert variant="warning">
  Your session will expire in 5 minutes.
</Alert>

// Toast Notifications
function ToastExample() {
  const { toast } = useToast();

  const showToast = () => {
    toast({
      title: 'Success!',
      message: 'Your profile has been updated',
      variant: 'success',
    });
  };

  return <Button onClick={showToast}>Show Toast</Button>;
}
```

## 🎣 Utility Hooks

```tsx
import { useBreakpoint, useIsMobile, useCopyToClipboard, useClickAway, useElementSize, useLockBodyScroll } from '@e-burgos/tucu-ui';

function UtilityExample() {
  const breakpoint = useBreakpoint();
  const isMobile = useIsMobile();
  const [copiedText, copy] = useCopyToClipboard();

  return (
    <div>
      <p>Current breakpoint: {breakpoint}</p>
      {isMobile && <MobileOnlyComponent />}

      <button onClick={() => copy('Hello World!')}>{copiedText ? 'Copied!' : 'Copy Text'}</button>
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
    <ThemeProvider layout="none" menuItems={[]}>
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
- **Components** - Component library overview and usage patterns
- **Theming Guide** - Advanced theming and customization options
- **Design System** - Visual design principles and guidelines
- **Colors** - Complete color palette and theming system
- **Layout System** - Responsive layout patterns and techniques
- **Icons System** - Icon library and usage guidelines
- **Accessibility** - Accessibility features and WCAG compliance
- **Hooks Utilities** - Custom React hooks for common patterns

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

### **Modern Dashboard**

```tsx
import { ThemeProvider, LucideIcons, useTheme } from '@e-burgos/tucu-ui';

const dashboardMenuItems = [
  {
    name: 'Overview',
    href: '/',
    icon: <LucideIcons.LayoutDashboard />,
    component: <OverviewPage />,
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: <LucideIcons.BarChart3 />,
    component: <AnalyticsPage />,
    dropdownItems: [
      {
        name: 'Reports',
        href: '/analytics/reports',
        component: <ReportsPage />,
      },
      {
        name: 'Real-time',
        href: '/analytics/realtime',
        component: <RealtimePage />,
      },
    ],
  },
  {
    name: 'Users',
    href: '/users',
    icon: <LucideIcons.Users />,
    component: <UsersPage />,
  },
];

function Dashboard() {
  return (
    <ThemeProvider
      layout="classic"
      menuItems={dashboardMenuItems}
      logo={{ name: 'Admin', secondName: 'Panel' }}
      brandColor="BufusBlue" // New advanced color preset
      showSettings={true}
      rightButton={<UserProfileMenu />}
    />
  );
}
```

### **DeFi Application**

```tsx
import { ThemeProvider, CoinCard, LivePriceFeed, LucideIcons } from '@e-burgos/tucu-ui';

const defiMenuItems = [
  {
    name: 'Portfolio',
    href: '/',
    icon: <LucideIcons.Wallet />,
    component: <PortfolioPage />,
  },
  {
    name: 'Swap',
    href: '/swap',
    icon: <LucideIcons.ArrowLeftRight />,
    component: <SwapPage />,
  },
  {
    name: 'Staking',
    href: '/staking',
    icon: <LucideIcons.Coins />,
    component: <StakingPage />,
  },
];

function DeFiApp() {
  return <ThemeProvider layout="minimal" menuItems={defiMenuItems} logo={{ name: 'DeFi', secondName: 'Portfolio' }} brandColor="Green" rightButton={<WalletConnector />} />;
}
```

### **E-commerce Platform**

```tsx
import { ThemeProvider, LucideIcons, Form, FormField, Input } from '@e-burgos/tucu-ui';

const ecommerceMenuItems = [
  {
    name: 'Products',
    href: '/products',
    icon: <LucideIcons.Package />,
    component: <ProductsPage />,
  },
  {
    name: 'Orders',
    href: '/orders',
    icon: <LucideIcons.ShoppingCart />,
    component: <OrdersPage />,
  },
  {
    name: 'Customers',
    href: '/customers',
    icon: <LucideIcons.Users />,
    component: <CustomersPage />,
  },
];

function EcommerceAdmin() {
  return <ThemeProvider layout="classic" menuItems={ecommerceMenuItems} logo={{ name: 'Shop', secondName: 'Admin' }} brandColor="Purple" showSettings={true} />;
}
```

## 🎨 Customization & Theming

### **Advanced Color System**

Tucu UI supports a multi-layered color system with 26+ presets:

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

- **📚 [Documentation](https://main--683712ba90eaad206f988c65.chromatic.com/?path=/docs/1-documentation-1-introduction--documentation)** - Complete guides and examples
- **🎨 [Storybook](https://main--683712ba90eaad206f988c65.chromatic.com/)** - Interactive component explorer
- **🐛 [Issues](https://github.com/e-burgos/tucu-ui/issues)** - Report bugs and request features
- **💬 [Discussions](https://github.com/e-burgos/tucu-ui/discussions)** - Community support and ideas

---

**Tucu UI** - Build beautiful, accessible, and production-ready React applications with confidence.

_Perfect for dashboards, e-commerce platforms, DeFi applications, and any modern web application that demands quality and consistency._

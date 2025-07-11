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

### **🎭 Complete Theming System**

6 color presets, dark/light mode, RTL support, and persistent user preferences.

### **🎯 5000+ Icons Integrated**

Complete Lucide React integration + 90+ custom-designed icons for comprehensive iconography.

### **♿ Accessibility First**

WCAG 2.1 AA compliant components with proper ARIA attributes and keyboard navigation.

### **📱 Mobile-First Responsive**

Responsive design across all components with support for ultra-wide displays (up to 4K).

### **🌐 Integrated Routing**

Built-in React Router integration for seamless SPA development.

## 🔧 Core Technology Stack

Built on industry-leading libraries for maximum reliability:

- **[React 18+](https://react.dev/)** - Modern React with hooks and concurrent features
- **[TypeScript](https://www.typescriptlang.org/)** - Full type safety and excellent DX
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling with custom design tokens
- **[React Hook Form](https://react-hook-form.com/)** - Performant form handling and validation
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management for theming
- **[Lucide React](https://lucide.dev/)** - Beautiful, consistent icon library
- **[Framer Motion](https://www.framer.com/motion/)** - Smooth animations and transitions

## 📦 Installation

```bash
npm install tucu-ui
```

### Tailwind CSS Configuration

Add Tucu UI to your Tailwind config to enable all styling features:

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/tucu-ui/**/*.{js,ts,jsx,tsx}', // Add this line
  ],
  // ... rest of your configuration
};
```

## 🎯 Quick Start

### 1. **Basic Component Usage**

```tsx
import { Button, Card, Input, Alert } from 'tucu-ui';

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
import { ThemeProvider, LucideIcons } from 'tucu-ui';

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
];

function App() {
  return (
    <ThemeProvider
      // Layout Configuration
      layout="minimal" // 'classic' | 'minimal' | 'none'
      menuItems={menuItems}
      logo={{ name: 'My', secondName: 'App' }}
      // Theme Configuration
      brandColor="Blue" // 'Green' | 'Black' | 'Blue' | 'Red' | 'Purple' | 'Orange'
      showSettings={true}
      // Additional Features
      rightButton={<UserMenu />}
    />
  );
}
```

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
import { useTheme } from 'tucu-ui';

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
import { Form, FormField, Input, Textarea, Checkbox, RadioGroup, InputSelect, PinCode, FileInput, Button } from 'tucu-ui';
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
import { CoinCard, CoinInfoCard, LivePriceFeed, TransactionInfo, CurrencySwapIcons } from 'tucu-ui';

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
import { NFTGrid, CollectionCard } from 'tucu-ui';

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
import { LucideIcons } from 'tucu-ui';

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

### **90+ Custom Icons**

```tsx
import {
  // Blockchain/Crypto
  Bitcoin,
  Ethereum,
  Cardano,

  // Layout Controls
  ClassicLayoutIcon,
  MinimalLayoutIcon,

  // Navigation
  HomeIcon,
  SearchIcon,

  // Social Brands
  Facebook,
  Twitter,
  Instagram,
  Github,

  // DeFi Specific
  SwapIcon,
  ExchangeIcon,
  TradingBotIcon,
} from 'tucu-ui';
```

## 🔧 UI Components Library

### **Layout & Navigation**

```tsx
import { Modal, Drawer, CardContainer, PanelActionCard } from 'tucu-ui';

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
import { Alert, Toast, useToast } from 'tucu-ui';

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
import { useBreakpoint, useIsMobile, useCopyToClipboard, useClickAway, useElementSize, useLockBodyScroll } from 'tucu-ui';

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
import { SignInForm, SignUpForm, ForgetPasswordForm, ResetPinForm } from 'tucu-ui';

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

### **Modern Dashboard**

```tsx
import { ThemeProvider, LucideIcons, useTheme } from 'tucu-ui';

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
  return <ThemeProvider layout="classic" menuItems={dashboardMenuItems} logo={{ name: 'Admin', secondName: 'Panel' }} brandColor="Blue" showSettings={true} rightButton={<UserProfileMenu />} />;
}
```

### **DeFi Application**

```tsx
import { ThemeProvider, CoinCard, LivePriceFeed, LucideIcons } from 'tucu-ui';

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
import { ThemeProvider, LucideIcons, Form, FormField, Input } from 'tucu-ui';

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

### **CSS Custom Properties**

```css
:root {
  --color-brand: 42 82 190; /* RGB values for alpha support */
  /* Tucu UI will automatically use your brand colors */
}
```

### **Extending Tailwind Configuration**

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
npm run tucu-ui

# Build the library
npm run tucu-ui:build

# Run tests
npm test
```

### **Nx Monorepo Structure**

```
tucu-ui/
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

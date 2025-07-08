# Tucu UI

A modern React component library built with Tailwind CSS, designed for creating robust web applications with **automatic layout generation**, comprehensive form systems, and specialized components for both traditional and DApp development.

## 🚀 Key Features

- **🎨 Automatic Layout Generation** - Complete application layouts with minimal configuration via ThemeProvider
- **📝 Powerful Form System** - Centralized validation powered by React Hook Form
- **🎯 DApp-Ready Components** - Specialized components for decentralized applications
- **🌐 Integrated Routing** - Built-in routing system for SPAs
- **🎨 Complete Iconography** - Internal icons + full Lucide Icons integration
- **🌍 RTL Support** - Complete support for right-to-left languages
- **📱 Responsive Design** - Mobile-first approach across all components

## 🔧 Core Dependencies

Tucu UI is built on top of these powerful libraries:

- **[React Hook Form](https://react-hook-form.com/)** - For performant form handling and validation
- **[Zustand](https://zustand-demo.pmnd.rs/)** - For lightweight state management
- **[Tailwind CSS](https://tailwindcss.com/)** - For utility-first styling

## 📦 Installation

```bash
npm install tucu-ui
```

## 🎯 Quick Start

### Basic Component Usage

```tsx
import { Button, Card, Input } from 'tucu-ui';
import 'tucu-ui/styles';

function App() {
  return (
    <Card>
      <h2>Welcome to Tucu UI</h2>
      <Input placeholder="Enter your name" />
      <Button>Get Started</Button>
    </Card>
  );
}
```

### Tailwind CSS Configuration

```js
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/tucu-ui/**/*.{js,ts,jsx,tsx}'],
  // ... rest of your configuration
};
```

## 🎨 Automatic Layout Generation

The **ThemeProvider** is Tucu UI's most powerful feature - it generates complete application layouts automatically with minimal configuration.

### Complete App with ThemeProvider

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
    name: 'Analytics',
    href: '/analytics',
    icon: <AnalyticsIcon />,
    component: <AnalyticsPage />,
    dropdownItems: [
      {
        name: 'Reports',
        href: '/analytics/reports',
        component: <ReportsPage />,
      },
    ],
  },
];

function App() {
  return (
    <ThemeProvider
      logo={{ name: 'My', secondName: 'App' }}
      layout="minimal" // 'none' | 'minimal' | 'classic'
      menuItems={menuItems}
      brandColor="Blue" // 'Green' | 'Black' | 'Blue' | 'Red' | 'Purple' | 'Orange'
      showSettings={true}
      rightButton={<UserMenu />}
    />
  );
}
```

**That's it!** Your complete application with routing, navigation, and theming is ready.

### Available Layouts

#### 1. **Minimal Layout**

- Clean header with horizontal navigation
- Responsive sidebar for mobile
- Perfect for modern dashboards

#### 2. **Classic Layout**

- Fixed sidebar with vertical navigation
- Header with logo and actions
- Ideal for admin applications

#### 3. **None Layout**

- No predefined layout
- Maximum flexibility for custom designs

### Theme System Features

#### Color Presets

```tsx
const availablePresets = [
  'Green', // #009e60 - Default
  'Black', // #323743
  'Blue', // #2a52be
  'Red', // #e34234
  'Purple', // #9370DB
  'Orange', // #ffa500
];
```

#### useTheme Hook

```tsx
import { useTheme } from 'tucu-ui';

function ThemeControls() {
  const {
    mode, // 'light' | 'dark'
    layout, // 'none' | 'minimal' | 'classic'
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
    </div>
  );
}
```

#### Integrated Routing System

The ThemeProvider automatically handles routing based on your `menuItems`:

```tsx
const menuItems = [
  {
    name: 'Products',
    href: '/products',
    component: <ProductList />,
    dropdownItems: [
      {
        name: 'Create Product',
        href: '/products/create',
        component: <CreateProduct />,
      },
    ],
  },
];

// Routes are automatically generated:
// / -> Home
// /products -> ProductList component
// /products/create -> CreateProduct component
```

## 📝 Advanced Form System

Tucu UI provides a comprehensive form system with centralized validation powered by React Hook Form.

### Available Form Components

```tsx
import { Form, FormField, Input, Textarea, Checkbox, Radio, RadioGroup, InputSelect, InputSwitch, PinCode, FileInput, ToggleBar } from 'tucu-ui';
```

### Centralized Validation

```tsx
import { Form, FormField, Input, Button } from 'tucu-ui';

// Define validation schema
const validationSchema = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address',
    },
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters',
    },
  },
};

function LoginForm() {
  const handleSubmit = (values) => {
    console.log('Form values:', values);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      useFormProps={{
        defaultValues: { email: '', password: '' },
        mode: 'onChange',
      }}
    >
      <FormField name="email" label="Email">
        <Input type="email" placeholder="Enter your email" />
      </FormField>

      <FormField name="password" label="Password">
        <Input type="password" placeholder="Enter your password" />
      </FormField>

      <Button type="submit">Sign In</Button>
    </Form>
  );
}
```

### Specialized Input Components

#### Input Select with Options

```tsx
<FormField name="country" label="Country">
  <InputSelect
    options={[
      { name: 'United States', value: 'us' },
      { name: 'Canada', value: 'ca' },
      { name: 'Mexico', value: 'mx' },
    ]}
  />
</FormField>
```

#### Pin Code Input

```tsx
<FormField name="verificationCode" label="Verification Code">
  <PinCode length={6} type="number" placeholder="-" />
</FormField>
```

#### File Upload

```tsx
<FormField name="documents" label="Upload Documents">
  <FileInput multiple accept="imgAndPdf" placeholderText="Drop files here or click to upload" />
</FormField>
```

#### Radio Group

```tsx
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

### useFormContext Hook

Access form methods from any child component:

```tsx
import { useFormContext } from 'react-hook-form';

function FormActions() {
  const {
    formState: { isValid, isDirty, errors },
    reset,
    trigger,
    setValue,
    getValues,
    watch,
  } = useFormContext();

  const emailValue = watch('email');

  return (
    <div>
      <p>Current email: {emailValue}</p>
      <Button disabled={!isValid}>Submit</Button>
      <Button type="button" onClick={() => reset()}>
        Reset
      </Button>
    </div>
  );
}
```

## 🎯 DApp & Blockchain Components

Tucu UI includes specialized components for decentralized applications and blockchain interfaces.

### Cryptocurrency Components

```tsx
import {
  CoinCard,
  CoinInfoCard,
  CoinListBox,
  LivePriceFeed,
  TransactionInfo,
  CurrencySwapIcons
} from 'tucu-ui';

// Portfolio coin card
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

// Live price chart
<LivePriceFeed
  name="Ethereum"
  symbol="ETH"
  icon={<EthereumIcon />}
  balance="10.5"
  usdBalance="18,750"
  change="+2.8%"
  isChangePositive={true}
  prices={priceHistory}
/>

// Transaction details
<TransactionInfo
  label="Gas Fee"
  value="0.002 ETH"
/>
```

### NFT Components

```tsx
import { NFTGrid, CollectionCard } from 'tucu-ui';

<NFTGrid author="CryptoArtist" authorImage="/artist-avatar.jpg" image="/nft-image.jpg" name="Digital Masterpiece #123" collection="Abstract Collection" price="2.5 ETH" />;
```

## 🎨 Complete Icon System

### Lucide Icons Integration

Direct access to all [Lucide React](https://lucide.dev/) icons:

```tsx
// Direct import
import { AlertCircle, Bell, Calendar } from 'tucu-ui/lucide-react';

// Or using namespace
import { LucideIcons } from 'tucu-ui';

function MyComponent() {
  return (
    <div>
      <AlertCircle size={24} color="red" />
      <LucideIcons.Bell size={24} />
      <LucideIcons.Calendar size={24} />
    </div>
  );
}
```

### Internal Icon Library

Extensive collection of internal icons organized by categories:

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

  // Navigation
  ArrowUp,
  ArrowRight,
  ChevronDown,
  ChevronForward,

  // Social Brands
  Facebook,
  Twitter,
  Instagram,
  Github,
  Telegram,

  // Interface
  SearchIcon,
  HomeIcon,
  ProfileIcon,
  Close,
  Plus,

  // DApp Specific
  SwapIcon,
  ExchangeIcon,
  TradingBotIcon,
  FarmIcon,
  PoolIcon,
} from 'tucu-ui';
```

## 🔧 Layout & Navigation Components

### Modal System

```tsx
import { Modal } from 'tucu-ui';

<Modal
  isOpen={isModalOpen}
  setIsOpen={setIsModalOpen}
  text={{
    title: 'Confirm Transaction',
    content: 'Are you sure you want to proceed with this transaction?',
    button: 'Confirm',
    backButton: 'Cancel',
  }}
  onSubmit={handleConfirm}
  onClose={handleClose}
/>;
```

### Drawer/Sidebar

```tsx
import { Drawer } from 'tucu-ui';

<Drawer type="sidebar-menu" isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} menuItems={navigationItems} logo={{ name: 'My', secondName: 'App' }} position="left" />;
```

### Card Components

```tsx
import { CardContainer, CardTitle, PanelActionCard } from 'tucu-ui';

<PanelActionCard
  title="User Settings"
  actions={[
    { label: 'Save', onClick: handleSave },
    { label: 'Cancel', variant: 'ghost', onClick: handleCancel },
  ]}
>
  <UserSettingsForm />
</PanelActionCard>;
```

## 🎣 Utility Hooks

```tsx
import { useBreakpoint, useClickAway, useCopyToClipboard, useElementSize, useIsMobile, useIsMount, useLockBodyScroll, useWindowScroll } from 'tucu-ui';

// Responsive breakpoint detection
function ResponsiveComponent() {
  const breakpoint = useBreakpoint();
  const isMobile = useIsMobile();

  return (
    <div>
      Current breakpoint: {breakpoint}
      {isMobile && <MobileOnlyComponent />}
    </div>
  );
}

// Copy to clipboard functionality
function ShareButton({ url }) {
  const [copiedText, copy] = useCopyToClipboard();

  return <button onClick={() => copy(url)}>{copiedText ? 'Copied!' : 'Share'}</button>;
}
```

## 🚀 Ready-to-Use Authentication

```tsx
import {
  SignInForm,
  SignUpForm,
  ForgetPasswordForm,
  ResetPinForm
} from 'tucu-ui';

// Complete sign-in form with validation
<SignInForm forgetPasswordPath="/forgot-password" />

// Sign-up form with terms acceptance
<SignUpForm />

// Password reset flow
<ForgetPasswordForm
  onSubmit={handlePasswordReset}
  resetPinPath="/reset-pin"
/>
```

## 📚 Complete Examples

### Modern Dashboard Application

```tsx
import { ThemeProvider } from 'tucu-ui';
import { HomeIcon, AnalyticsIcon, UsersIcon, SettingsIcon } from 'tucu-ui';

const dashboardMenuItems = [
  {
    name: 'Overview',
    href: '/',
    icon: <HomeIcon />,
    component: <OverviewPage />,
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: <AnalyticsIcon />,
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
    name: 'Users',
    href: '/users',
    icon: <UsersIcon />,
    component: <UsersPage />,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: <SettingsIcon />,
    component: <SettingsPage />,
  },
];

function Dashboard() {
  return <ThemeProvider layout="classic" menuItems={dashboardMenuItems} logo={{ name: 'Admin', secondName: 'Panel' }} brandColor="Blue" showSettings={true} rightButton={<UserProfileMenu />} />;
}
```

### DeFi Portfolio Application

```tsx
import { ThemeProvider, CoinCard, LivePriceFeed, TransactionInfo } from 'tucu-ui';

const portfolioMenuItems = [
  {
    name: 'Portfolio',
    href: '/',
    icon: <WalletIcon />,
    component: <PortfolioOverview />,
  },
  {
    name: 'Trading',
    href: '/trading',
    icon: <ExchangeIcon />,
    component: <TradingPage />,
  },
  {
    name: 'History',
    href: '/history',
    icon: <HistoryIcon />,
    component: <TransactionHistory />,
  },
];

function DeFiApp() {
  return (
    <ThemeProvider layout="minimal" menuItems={portfolioMenuItems} logo={{ name: 'DeFi', secondName: 'Portfolio' }} brandColor="Green" rightButton={<WalletConnector />}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CoinCard name="Bitcoin" symbol="BTC" balance="0.5" usdBalance="25,000" change="+5.2%" isChangePositive={true} />
        <LivePriceFeed name="Ethereum" symbol="ETH" balance="10.5" usdBalance="18,750" change="+2.8%" isChangePositive={true} prices={ethPriceHistory} />
        <TransactionInfo label="Total Portfolio Value" value="$43,750" />
      </div>
    </ThemeProvider>
  );
}
```

## 🎨 Customization

### CSS Custom Properties

```css
:root {
  --brand: #your-brand-color;
  --brand-secondary: #your-secondary-color;
  /* Tucu UI will respect these variables */
}
```

### Extending Tailwind

```js
// tailwind.config.js
module.exports = {
  extend: {
    colors: {
      brand: {
        DEFAULT: '#your-color',
        50: '#your-color-50',
        // ... more shades
      },
    },
  },
};
```

## 🔧 Development

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Run Storybook
npm run storybook

# Run tests
npm run test

# Build library
npm run build
```

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please open an issue first to discuss what you would like to change.

## 🌐 Documentation

- **English**: [README.md](./README.md)
- **Español**: [README-es.md](./README-es.md)

---

**Tucu UI** - Modern React components for next-generation web applications.

# Skill: Tucu-UI Component Catalog

Complete API reference for all components, hooks, utilities, and types in `@e-burgos/tucu-ui`. Use this skill to answer queries about available components, their props, and to generate concrete usage examples.

> **Companion Skills**: See `tucu-ui` for overview & quick start, `tucu-ui-forms` for the form system, `tucu-ui-design-system` for theming, `tucu-ui-routing` for navigation.
> **Live Docs**: [tucu-ui.netlify.app](https://tucu-ui.netlify.app/)

---

## 1. Package Information

| Field            | Value                                                                                                                                                                            |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**         | `@e-burgos/tucu-ui`                                                                                                                                                              |
| **Version**      | 2.0.2                                                                                                                                                                            |
| **Author**       | Esteban Burgos                                                                                                                                                                   |
| **License**      | MIT                                                                                                                                                                              |
| **Peer Deps**    | `react >=18`, `react-dom >=18`, `tailwindcss >=4`                                                                                                                                |
| **Dependencies** | `@headlessui/react`, `framer-motion`, `lucide-react`, `react-hook-form`, `react-router-dom v7.9`, `recharts`, `swiper v11.2`, `zustand v5`, `classnames`, `react-use`, `prismjs` |

### Universal Import

```typescript
import { Button, CardContainer, Form, Input, Select, ThemeProvider, useTheme, useToastStore, LucideIcons, Typography } from '@e-burgos/tucu-ui';
```

---

## 2. Complete Component Catalog

### 2.1 Auth — Authentication Forms

| Component              | Key Props                                                                                                                   | Description                                               |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| **SignInForm**         | `title?, description?, buttonText?, forgetPasswordPath, onSubmit?(SignInFormData), isLoading?, error?, className?`          | Login with email/password, visibility toggle, remember me |
| **SignUpForm**         | `title?, description?, buttonText?, onSubmit?(SignUpFormData), isLoading?, error?, termsOfServicePath?, privacyPolicyPath?` | Registration with name, email, password, accept terms     |
| **ForgetPasswordForm** | `title?, description?, buttonText?, onSubmit?(ForgetPasswordFormData), isLoading?, error?, successMessage?`                 | Password recovery via email                               |
| **ResetPinForm**       | `title?, description?, buttonText?, onSubmit?(ResetPinFormData), signInPath, pinLength?(default 5)`                         | PIN entry with validation                                 |

**Data Interfaces:**

```typescript
type SignInFormData = { email: string; password: string; rememberMe: boolean };
type SignUpFormData = { firstName: string; lastName: string; email: string; password: string; agreeToTerms: boolean };
type ForgetPasswordFormData = { email: string };
type ResetPinFormData = { pin: string };
```

**Example:**

```tsx
import { SignInForm } from '@e-burgos/tucu-ui';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (data: SignInFormData) => {
    setIsLoading(true);
    try {
      await authService.login(data.email, data.password);
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return <SignInForm title="Welcome" description="Enter your credentials" forgetPasswordPath="/auth/forgot-password" onSubmit={handleLogin} isLoading={isLoading} error={error} />;
};
```

---

### 2.2 Blockchain & Web3

| Component                | Key Props                                                                                          | Description                                  |
| ------------------------ | -------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **CoinCard**             | `{id, name, symbol, logo, balance, usdBalance, change, isChangePositive, color?}`                  | Crypto card with logo, balance, price change |
| **CoinSlider**           | `{coins: CoinCardProps[]}`                                                                         | Responsive Swiper carousel of CoinCards      |
| **CoinInfoCard**         | `{item: {name, logo, balance?, coinType?}, variant?: 'small'\|'medium'\|'large'}`                  | Compact coin info display                    |
| **CoinListBox**          | `{coins: CoinTypes[], selectedCoin, setSelectedCoin, disabled?}`                                   | HeadlessUI Listbox coin selector             |
| **CollectionCard**       | `{item: {name, slug, title, cover_image, number_of_artwork, user: {avatar?, name, slug}}}`         | NFT collection card with cover and user info |
| **CollectionSelectList** | `{collectionList: {icon, name, value}[], onSelect(value)}`                                         | Searchable collection list                   |
| **CurrencySwapIcons**    | `{from: CoinList, to: CoinList}`                                                                   | Currency pair icons (BTC, ETH, USDT, etc.)   |
| **LivePriceFeed**        | `{id, name, symbol, icon, balance, usdBalance, change, isChangePositive, prices: {name, value}[]}` | Live price with mini recharts area chart     |
| **PriceFeedSlider**      | `{limit, gridClassName, priceFeeds: LivePriceFeedProps[]}`                                         | Swiper on mobile / grid on desktop           |
| **NFTGrid**              | `{author, authorImage, image, name, collection, price, profilePath?}`                              | NFT product card                             |
| **TransactionInfo**      | `{label, value?, className?}`                                                                      | Key-value pair for transaction info          |

**Auxiliary Types:**

```typescript
type CoinList = 'BTC' | 'ETH' | 'USDT' | 'BNB' | 'USDC' | 'ADA' | 'DOGE';
type CoinTypes = { icon: ReactNode; code: string; name: string; price: string };
```

**Example:**

```tsx
import { CoinCard, LivePriceFeed, CurrencySwapIcons } from '@e-burgos/tucu-ui';

const CryptoDashboard = () => (
  <div className="space-y-6">
    <CoinCard id="btc" name="Bitcoin" symbol="BTC" logo="/icons/btc.svg" balance="1.5234" usdBalance="$45,702.30" change="+2.4%" isChangePositive={true} />
    <LivePriceFeed
      id="eth"
      name="Ethereum"
      symbol="ETH"
      icon="/icons/eth.svg"
      balance="32.1"
      usdBalance="$98,432.10"
      change="-0.8%"
      isChangePositive={false}
      prices={[
        { name: '1h', value: 3050 },
        { name: '2h', value: 3080 },
        { name: '3h', value: 3020 },
      ]}
    />
    <CurrencySwapIcons from="BTC" to="ETH" />
  </div>
);
```

---

### 2.3 Buttons

| Component       | Key Props                                                                                                                                                                                                                                         | Description                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| **Button**      | `shape?: 'rounded'\|'pill'\|'circle', variant?: 'solid'\|'ghost'\|'transparent', color?: 'primary'\|'white'\|'gray'\|'success'\|'info'\|'warning'\|'danger', size?: 'large'\|'medium'\|'small'\|'mini'\|'tiny', isLoading?, fullWidth?, tooltip?` | Main button with ripple, loading, tooltip |
| **Hamburger**   | extends `ButtonProps` + `{isOpen?}`                                                                                                                                                                                                               | Animated hamburger button (hamburger ↔ X) |
| **TopupButton** | `{label, icon?, href?, className?, onClick?}`                                                                                                                                                                                                     | Action button with dashed border and icon |

**Example:**

```tsx
import { Button } from '@e-burgos/tucu-ui';

const ButtonShowcase = () => (
  <div className="flex gap-4">
    <Button variant="solid" color="primary" size="medium">
      Primary
    </Button>
    <Button variant="ghost" color="danger" shape="pill">
      Delete
    </Button>
    <Button variant="transparent" size="small" isLoading>
      Loading
    </Button>
    <Button shape="circle" color="success" tooltip="Add">
      +
    </Button>
    <Button fullWidth color="info">
      Full Width
    </Button>
  </div>
);
```

---

### 2.4 Cards

| Component           | Key Props                                                                  | Description                                |
| ------------------- | -------------------------------------------------------------------------- | ------------------------------------------ |
| **CardContainer**   | `{className?, children?}`                                                  | Wrapper with border, shadow, rounded, dark |
| **CardTitle**       | `{border?(true), title?, children?, className?}`                           | Container with floating title              |
| **AuthorCard**      | `{image, name?, authorRole?}`                                              | Author card with avatar                    |
| **PanelCard**       | `{title, children, className?}`                                            | Card with header and scrollable content    |
| **PanelActionCard** | `{title, actions?: {label, variant?, color?, size?, onClick}[], children}` | PanelCard with action buttons              |

**Example:**

```tsx
import { CardContainer, CardTitle, PanelActionCard } from '@e-burgos/tucu-ui';

const DashboardPanel = () => (
  <CardContainer className="p-6">
    <CardTitle title="Sales Summary" />
    <PanelActionCard
      title="Recent Transactions"
      actions={[
        { label: 'Export', variant: 'ghost', color: 'primary', onClick: () => exportData() },
        { label: 'View All', variant: 'solid', color: 'success', onClick: () => navigateToAll() },
      ]}
    >
      {/* Transaction content */}
    </PanelActionCard>
  </CardContainer>
);
```

---

### 2.5 Carousel

| Component         | Key Props                                                                                                                                                                                             | Description             |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| **Carousel**      | `{children, slidesPerView?, spaceBetween?, direction?, effect?: 'slide'\|'fade'\|'coverflow'\|'cube'\|'flip'\|'creative'\|'cards', showNavigation?, showPagination?, autoplay?, breakpoints?, loop?}` | Swiper wrapper with ref |
| **CarouselCards** | `{cards: CarouselCardItem[], cardSize?: 'sm'\|'md'\|'lg'\|'xl', variant?: 'default'\|'elevated'\|'outlined'\|'filled'}` + CarouselProps                                                               | Card carousel           |
| **CarouselImage** | `{images: CarouselImageItem[], imageFit?, aspectRatio?, lazy?}` + CarouselProps                                                                                                                       | Image carousel          |

**Interfaces:**

```typescript
type CarouselCardItem = { title: string; description?: string; image?: string; icon?: ReactNode; content?: ReactNode; footer?: ReactNode };
type CarouselImageItem = { src: string; alt: string; caption?: string };
```

**Example:**

```tsx
import { CarouselCards } from '@e-burgos/tucu-ui';

const ProductGallery = () => (
  <CarouselCards
    cards={[
      { title: 'Product A', description: 'Brief description', image: '/img/prod-a.jpg' },
      { title: 'Product B', description: 'Brief description', image: '/img/prod-b.jpg' },
    ]}
    cardSize="lg"
    variant="elevated"
    showNavigation
    showPagination
    autoplay={{ delay: 3000 }}
    loop
  />
);
```

---

### 2.6 Common

| Component     | Key Props                                                                                                                                                    | Description               |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| **Avatar**    | `{image, alt, size?: 'xl'\|'lg'\|'md'\|'sm'\|'xs', shape?: 'rounded'\|'circle', border?(true)}`                                                              | Avatar with size variants |
| **Badge**     | `{status?, color?, size?: 'tiny'\|'small'\|'medium'\|'large', variant?: 'solid'\|'ghost'\|'outline'\|'soft', shape?: 'rounded'\|'pill'\|'circle', withDot?}` | Multi-variant badge       |
| **Collapse**  | `{label, initialOpen?, className?}`                                                                                                                          | Animated accordion        |
| **Scrollbar** | `{autoHide?: 'never'\|'scroll'\|'leave'\|'move', direction?, scrollbarStyle?}`                                                                               | Custom scrollbar          |
| **Skeleton**  | `{animation?: 'pulse'\|'wave'\|'shimmer'\|'none', shape?: 'rectangle'\|'circle'\|'text'\|'rounded', size?, width?, height?, count?}`                         | Skeleton loader           |

**Example:**

```tsx
import { Skeleton, Badge, Avatar } from '@e-burgos/tucu-ui';

const UserProfile = ({ user }) => (
  <div className="flex items-center gap-4">
    <Avatar image={user.avatar} alt={user.name} size="lg" shape="circle" />
    <div>
      <span>{user.name}</span>
      <Badge status="active" variant="soft" size="small">
        Online
      </Badge>
    </div>
  </div>
);

const UserProfileLoading = () => (
  <div className="flex items-center gap-4">
    <Skeleton shape="circle" size="large" />
    <div className="space-y-2">
      <Skeleton shape="text" width={200} />
      <Skeleton shape="text" width={150} />
    </div>
  </div>
);
```

---

### 2.7 Dialog

| Component           | Key Props                                                                                                                            | Description                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------- |
| **Modal**           | `{isOpen, closeable?(true), hideButtons?, text?: {title?, content?, button?, backButton?}, setIsOpen, onClose?, onBack?, onSubmit?}` | Portal modal with backdrop, escape |
| **Drawer**          | `{type: 'sidebar'\|'sidebar-menu', position?: 'left'\|'right', title?, menuItems?, backdrop?(true), logo?, isOpen, setIsOpen}`       | Configurable side drawer           |
| **DrawerContainer** | `{isOpen, setIsOpen, position?, backdrop?(true)}`                                                                                    | Sliding portal container           |
| **Sidebar**         | `{children, title?, actionContent?, logo?, onClose?}`                                                                                | Generic sidebar with scroll        |
| **SidebarMenu**     | `{menuItems: IMenuItem[], title?, actionContent?, onClose, logo?}`                                                                   | Sidebar with navigation menu       |

**Example:**

```tsx
import { Modal } from '@e-burgos/tucu-ui';

const ConfirmDialog = ({ isOpen, onConfirm, onCancel }) => <Modal isOpen={isOpen} setIsOpen={onCancel} text={{ title: 'Are you sure?', content: 'This action cannot be undone.', button: 'Confirm', backButton: 'Cancel' }} onSubmit={onConfirm} onBack={onCancel} />;
```

---

### 2.8 Forms

> **Deep dive**: See the `tucu-ui-forms` skill for complete form patterns, all input components, and validation strategies.

| Component     | Key Props                                                                                                                                       | Description                               |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| **Form**      | `{onSubmit: SubmitHandler<T>, children: ReactNode \| RenderFunction<T>, useFormProps?: UseFormProps<T>, validationSchema?: FormValidations<T>}` | react-hook-form wrapper with FormProvider |
| **FormField** | `{name: Path<T>, label?, helperText?, rules?: RegisterOptions, children: ReactElement, hideError?, showHelper?}`                                | Field wrapper with Controller             |

**Re-exports from react-hook-form:** `SubmitHandler`, `UseFormProps`, `FieldValues`, `UseFormReturn`, `Controller`, `useFormContext`, `Path`, `FieldError`, `RegisterOptions`, `FieldErrors`

---

### 2.9 Inputs

> **Deep dive**: See the `tucu-ui-forms` skill for detailed input usage patterns within the Form system.

| Component         | Key Props                                                                                                                                        | Description                                   |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| **Input**         | `{label?, error?, variant?: 'ghost'\|'solid'\|'transparent', suffix?, icon?, dateFormat?, locale?: 'en-US'\|'es-ES'\|'fr-FR'\|'de-DE'\|'pt-BR'}` | Input with password toggle, date picker, i18n |
| **Select**        | `{options: SelectOption[], selectedOption?, onChange?, variant?, label?, errorMessage?, placeholder?}`                                           | HeadlessUI Listbox wrapper                    |
| **Checkbox**      | `{size?: 'sm'\|'md'\|'lg', color?, labelPlacement?: 'start'\|'end', shape?: 'rounded'\|'square', variant?}`                                      | Custom checkbox with variants                 |
| **Radio**         | `{variant?, size?: 'sm'\|'md'\|'lg'\|'xl', color?}`                                                                                              | Custom radio button                           |
| **RadioGroup**    | `{direction?: 'vertical'\|'horizontal', gap?, options?: {label, value, disabled?}[]}`                                                            | Controlled radio group                        |
| **Textarea**      | `{label?, error?, variant?, helperText?}`                                                                                                        | Textarea with variants                        |
| **Switch**        | `{label?, offLabel?, onLabel?, checked, onChange, variant?}`                                                                                     | Toggle switch ON/OFF                          |
| **PinCode**       | `{value?, onChange?, type?: 'text'\|'number', mask?, length?(4), size?, rounded?, variant?, color?}`                                             | Multi-digit PIN input with auto-focus         |
| **FileInput**     | `{accept?: 'img'\|'pdf'\|'csvAndExcel'\|'imgAndPdf'\|'all', multiple?, label?, placeholderText?}`                                                | Drag & drop upload with preview               |
| **ToggleBar**     | `{title, subTitle?, icon?, checked, onChange}`                                                                                                   | Switch in card format                         |
| **InputSearcher** | `{options?: SelectOption[], initialValue?, noMatchesMessage?, multiple?, variant?}`                                                              | Autocomplete/search with dropdown             |

**Types:**

```typescript
type SelectOption = { name: string; value: string; icon?: ReactNode };
```

---

### 2.10 Links

| Component      | Key Props                                        | Description                              |
| -------------- | ------------------------------------------------ | ---------------------------------------- |
| **AnchorLink** | Wrapper for `react-router-dom Link`              | Auto-detects external URLs → `<a>`       |
| **ActiveLink** | extends `LinkProps` + `{activeClassName?, path}` | Adds active class based on current route |

---

### 2.11 List

| Component         | Key Props                                                                                                   | Description                   |
| ----------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------- |
| **ListItem**      | `{id, label?, content?, icon?, onClick?, disabled?, active?}`                                               | Item with content or button   |
| **ListContainer** | `{items: ListItemProps[], triggerIcon?, position?, align?, isOpen?, keepOpen?, trigger?: 'hover'\|'click'}` | Positionable dropdown/popover |

**Example:**

```tsx
import { ListContainer, LucideIcons } from '@e-burgos/tucu-ui';

const UserMenu = () => (
  <ListContainer
    trigger="click"
    position="bottom"
    align="right"
    triggerIcon={<LucideIcons.User />}
    items={[
      { id: '1', label: 'Profile', icon: <LucideIcons.User />, onClick: () => navigate('/profile') },
      { id: '2', label: 'Settings', icon: <LucideIcons.Settings />, onClick: () => navigate('/settings') },
      { id: '3', label: 'Sign Out', icon: <LucideIcons.LogOut />, onClick: () => logout() },
    ]}
  />
);
```

---

### 2.12 Loaders

| Component       | Key Props                                                                                                  | Description          |
| --------------- | ---------------------------------------------------------------------------------------------------------- | -------------------- |
| **Loader**      | `{tag?: 'div'\|'span', size?: 'large'\|'medium'\|'small', variant?: 'blink'\|'scaleUp'\|'moveUp', color?}` | Animated dots        |
| **Progressbar** | `{value?, label?, size?: 'sm'\|'DEFAULT'\|'lg'\|'xl', rounded?, color?, variant?: 'solid'\|'flat'}`        | Progress bar         |
| **Spinner**     | `{size?: 'sm'\|'md'\|'lg', color?}`                                                                        | CSS circular spinner |

---

### 2.13 Logos

| Component       | Key Props                                                                 | Description                |
| --------------- | ------------------------------------------------------------------------- | -------------------------- |
| **Logo**        | `{name?, secondName?, path?, preset?, size?, logo?: ReactNode, isoType?}` | Flexible configurable logo |
| **FullLogo**    | —                                                                         | Static TUCU + UI logo      |
| **TucuUiLogo**  | `{size?, className?}`                                                     | SVG logo with "ui"         |
| **DefiAppLogo** | —                                                                         | Animated brain-network SVG |

---

### 2.14 Notifications

| Component            | Key Props                                                                           | Description                   |
| -------------------- | ----------------------------------------------------------------------------------- | ----------------------------- |
| **Alert**            | `{variant?: 'info'\|'warning'\|'error'\|'success', dismissible?(true), onDismiss?}` | Dismissible banner by variant |
| **Toast**            | uses `useToastStore` (zustand)                                                      | Auto-dismiss toasts, variants |
| **NotificationCard** | `{type: 'followed'\|'liked'\|'purchased', actor, time, url, notifier}`              | Social notification card      |

**Toast Variants:** `destructive`, `success`, `warning`, `info`, `default`

**Example:**

```tsx
import { useToastStore, Alert } from '@e-burgos/tucu-ui';

const NotificationExample = () => {
  const { addToast } = useToastStore();

  const showSuccess = () => addToast({ title: 'Saved', message: 'Changes saved successfully', variant: 'success', timeout: 5000 });
  const showError = () => addToast({ title: 'Error', message: 'Operation could not be completed', variant: 'destructive' });

  return (
    <div className="space-y-4">
      <Alert variant="info" dismissible>
        You have 3 unread notifications
      </Alert>
      <button onClick={showSuccess}>Save</button>
      <button onClick={showError}>Simulate Error</button>
    </div>
  );
};
```

---

### 2.15 Table

| Component           | Key Props                                                                                                    | Description                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------- |
| **BasicTable\<T\>** | `{columns: TableColumn<T>[], data: T[], rounded?, border?, showHeader?, hoverable?, striped?, maxRows?(10)}` | Generic table with custom render |

**Interface:**

```typescript
type TableColumn<T> = { key: keyof T | string; label: string; render?: (row: T) => ReactNode; className?: string };
```

**Example:**

```tsx
import { BasicTable, Badge, Avatar } from '@e-burgos/tucu-ui';

type User = { id: number; name: string; email: string; role: string; status: 'active' | 'inactive' };

const columns: TableColumn<User>[] = [
  {
    key: 'name',
    label: 'Name',
    render: (row) => (
      <div className="flex items-center gap-2">
        <Avatar image={`/avatars/${row.id}.jpg`} size="xs" shape="circle" />
        <span>{row.name}</span>
      </div>
    ),
  },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  {
    key: 'status',
    label: 'Status',
    render: (row) => (
      <Badge status={row.status} variant="soft" size="small">
        {row.status}
      </Badge>
    ),
  },
];

const UsersTable = ({ users }: { users: User[] }) => <BasicTable columns={columns} data={users} striped hoverable maxRows={20} />;
```

---

### 2.16 Tabs

| Component     | Key Props                                                                 | Description                        |
| ------------- | ------------------------------------------------------------------------- | ---------------------------------- |
| **TabGroup**  | `{variant?: 'underline'\|'pills'\|'bordered'\|'solid'}`                   | HeadlessUI TabGroup wrapper        |
| **TabList**   | `{variant?}`                                                              | Tab container                      |
| **TabItem**   | `{variant?, size?: 'small'\|'medium'\|'large', color?, disabled?, icon?}` | Individual tab with animation      |
| **TabPanels** | —                                                                         | Wrapper with LayoutGroup animation |
| **TabPanel**  | —                                                                         | Panel with focus styling           |
| **ParamTab**  | `{tabMenu: TabMenuItem[], variant?, size?, showMobileSelect?}`            | Tabs synchronized with URL params  |
| **TabSelect** | `{tabMenu: TabSelectMenuItem[], selectedTabIndex, onChange}`              | Mobile dropdown for tabs           |

**Example:**

```tsx
import { ParamTab } from '@e-burgos/tucu-ui';

const ProfilePage = () => (
  <ParamTab
    tabMenu={[
      { title: 'General', path: 'general', content: <GeneralSettings /> },
      { title: 'Security', path: 'security', content: <SecuritySettings /> },
      { title: 'Notifications', path: 'notifications', content: <NotificationSettings /> },
    ]}
    variant="underline"
    size="medium"
    showMobileSelect
  />
);
// URL updates automatically: /profile?view=general, /profile?view=security, etc.
```

---

### 2.17 Typography

| Component      | Key Props                                                                                                                            | Description       |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| **Typography** | `{tag: 'h1'-'h6'\|'p'\|'span'\|'code'\|'kbd'\|'headline'\|'body'\|'label-1'\|'label-2'\|'caption'\|'legal'..., color?, fontFamily?}` | 30+ semantic tags |

**Available Colors:** `default`, `primary`, `secondary`, `dark`, `light`, `muted`, `success`, `warning`, `error`

**Example:**

```tsx
import { Typography } from '@e-burgos/tucu-ui';

const ArticlePage = () => (
  <article>
    <Typography tag="headline" color="primary">
      Main Title
    </Typography>
    <Typography tag="body" color="default">
      Article content with descriptive text...
    </Typography>
    <Typography tag="caption" color="muted">
      Published 2 hours ago
    </Typography>
    <Typography tag="code" fontFamily="mono">
      const x = 42;
    </Typography>
    <Typography tag="legal" color="muted">
      © 2026 All rights reserved
    </Typography>
  </article>
);
```

---

### 2.18 Layouts

> **Deep dive**: See the `tucu-ui-design-system` skill for layout selection guidance and theme configuration.

| Component            | Key Props                                                                                            | Description                        |
| -------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------- |
| **RootLayout**       | `{layout?: 'clean'\|'admin'\|'horizontal', menuItems: IMenuItem[], logo?, rightButton?, fullWidth?}` | Main layout orchestrator           |
| **AdminLayout**      | `{menuItems, rightButton?, logo?, isOpen, setIsOpen, fullWidth?}`                                    | Collapsible sidebar + fixed header |
| **CleanLayout**      | `{children, className?}`                                                                             | Minimal layout without nav         |
| **HorizontalLayout** | `{menuItems, rightButton?, logo?, isOpen, setIsOpen, fullWidth?}`                                    | Top horizontal navigation          |
| **MenuItem**         | `{name, icon?, path, href?, dropdownItems?, isActive?, hide?, onClick?}`                             | Menu item with sub-menu            |

---

### 2.19 Utils

| Component         | Key Props                                                                                                                     | Description                             |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| **CodeBlock**     | `{code, language?, expanded?(true), noExpand?, className?}`                                                                   | Code with Prism highlight, copy, expand |
| **Image**         | `{src, alt, objectFit?, loading?, priority?, placeholder?: 'blur'\|'empty', blurDataURL?, fallbackSrc?, aspectRatio?, fill?}` | Image with lazy, blur, fallback         |
| **RevealContent** | `{defaultHeight, className?}`                                                                                                 | Expandable "See More" content           |
| **ScrollToTop**   | `{top?, right?, bottom?, left?, showAfter?(400), size?}`                                                                      | Floating scroll-to-top button           |

**Supported Languages in CodeBlock:** JavaScript, TypeScript, JSX, TSX, CSS, Bash, JSON, Python, Java, SQL

---

### 2.20 Icons

**97+ native SVG icons** in categories:

- **UI**: ArrowUp, ArrowRight, Check, ChevronDown/Forward/Left/Right, Close, Copy, Eye, Eyeslash, Home, Menu, Plus, Search, Sun, Moon, etc.
- **Crypto**: Bitcoin, Bnb, Cardano, Doge, Ethereum, EthereumDark, Tether, Usdc
- **Layout**: ClassicLayoutIcon, MinimalLayoutIcon, ModernLayoutIcon, RetroLayoutIcon
- **Brands**: Facebook, Github, Instagram, Telegram, Twitter

**Plus: Complete Lucide React Namespace**

```tsx
import { LucideIcons } from '@e-burgos/tucu-ui';

// Access to 1500+ Lucide icons
<LucideIcons.Home />
<LucideIcons.Settings />
<LucideIcons.Bell />
```

---

## 3. Hooks

| Hook                    | Signature                                                 | Description                           |
| ----------------------- | --------------------------------------------------------- | ------------------------------------- |
| **useAnchorScroll**     | `() => null`                                              | Global smooth scroll to anchors (#id) |
| **useBreakpoint**       | `() => 'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'3xl'\|'4xl'` | Reactive viewport breakpoint          |
| **useClickAway**        | re-export `react-use`                                     | Detect clicks outside an element      |
| **useCopyToClipboard**  | re-export `react-use`                                     | Copy text to clipboard                |
| **useElementSize**      | `<T>() => [setRef, {width, height}]`                      | Reactive element sizing               |
| **useEventListener**    | `(eventName, handler, element?, options?)`                | Typed clean event listener            |
| **useGridSwitcher**     | Zustand: `{isGridCompact, setIsGridCompact}`              | Toggle compact/normal grid            |
| **useIsMobile**         | `() => {isMobile: boolean}`                               | Detect mobile (xs, sm, md)            |
| **useIsMounted**        | `() => boolean`                                           | Component mounted check (SSR-safe)    |
| **useLockBodyScroll**   | `(freeze: boolean) => void`                               | Lock body scroll                      |
| **useMeasure**          | re-export `react-use`                                     | Element dimension measurement         |
| **useScrollableSlider** | `(defaultActivePath?) => {sliderEl, prev, next, ...}`     | Horizontal slider control             |
| **useToastStore**       | Zustand: `{toasts, addToast, dismissToast, setToasts}`    | Global toast store                    |
| **useWindowScroll**     | `() => {x, y}`                                            | Window scroll position                |

**Available Breakpoints:** xs:480, sm:640, md:768, lg:1024, xl:1280, 2xl:1440, 3xl:1780, 4xl:2160

**Example:**

```tsx
import { useBreakpoint, useIsMobile } from '@e-burgos/tucu-ui';

const ResponsiveComponent = () => {
  const breakpoint = useBreakpoint();
  const { isMobile } = useIsMobile();

  return (
    <div>
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
      <p>Current breakpoint: {breakpoint}</p>
    </div>
  );
};
```

---

## 4. Utility Libraries

| Lib              | API                                                 | Description                         |
| ---------------- | --------------------------------------------------- | ----------------------------------- |
| **rangeMap**     | `(n: number, fn: (i) => any) => any[]`              | Generate array of N mapped elements |
| **fadeInBottom** | `(type?, duration?, translateY?) => {enter, exit}`  | Framer-motion fade-in variants      |
| **storage**      | `{get(key), set(key, value), remove(key), clear()}` | LocalStorage with SSR safety & JSON |

---

## 5. Built-in Error Pages

10 pre-built error pages with ready-to-use design:

`AccessDeniedPage`, `DefaultErrorPage`, `DisabledPage`, `FallbackPage`, `ForbiddenPage`, `NoRoutesPage`, `NotFoundPage`, `ServerErrorPage`, `UnknownPage`, `UserBlockedPage`

---

## 6. Statistical Summary

| Category                 | Count               |
| ------------------------ | ------------------- |
| UI Components            | ~70+                |
| Hooks                    | 14                  |
| Utilities/Libs           | 3 modules           |
| Native SVG Icons         | 97+                 |
| Lucide Icons (namespace) | 1500+               |
| Error Pages              | 10                  |
| Design Tokens (colors)   | ~170 + 12 semantic  |
| Breakpoints              | 10                  |
| Layouts                  | 3                   |
| Color Presets            | 22                  |
| Languages                | 3 (en, es, fr)      |
| Architectures            | 2 (Standalone, MFE) |

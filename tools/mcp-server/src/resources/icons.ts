// ─── Resource: Icons ─────────────────────────────────────────────────────────

export function getIconsContent(): string {
  return `# Icons — @e-burgos/tucu-ui

## Two Icon Systems

### 1. Native SVG Icons (97+)
Imported directly from the library:
\`\`\`tsx
import { ArrowUp, Check, Close, Copy, Eye, Home, Menu, Plus, Search, Sun, Moon } from '@e-burgos/tucu-ui';
\`\`\`

#### Categories

**UI Icons**: ArrowUp, ArrowRight, ArrowDown, ArrowLeft, Check, ChevronDown, ChevronForward, ChevronLeft, ChevronRight, Close, Copy, Eye, Eyeslash, Home, Menu, Plus, Search, Sun, Moon, Settings, Filter, Sort, Grid, List

**Crypto Icons**: Bitcoin, Bnb, Cardano, Doge, Ethereum, EthereumDark, Tether, Usdc

**Layout Icons**: ClassicLayoutIcon, MinimalLayoutIcon, ModernLayoutIcon, RetroLayoutIcon

**Brand Icons**: Facebook, Github, Instagram, Telegram, Twitter

### 2. Lucide Icons (1500+)
Full Lucide React namespace via \`LucideIcons\`:
\`\`\`tsx
import { LucideIcons } from '@e-burgos/tucu-ui';

<LucideIcons.Home />
<LucideIcons.Settings />
<LucideIcons.Bell />
<LucideIcons.User />
<LucideIcons.Search />
<LucideIcons.Plus />
<LucideIcons.X />
<LucideIcons.ChevronDown />
<LucideIcons.ArrowRight />
<LucideIcons.Check />
<LucideIcons.AlertCircle />
<LucideIcons.Calendar />
<LucideIcons.Mail />
<LucideIcons.Phone />
<LucideIcons.MapPin />
<LucideIcons.Clock />
<LucideIcons.Star />
<LucideIcons.Heart />
<LucideIcons.Trash2 />
<LucideIcons.Edit />
<LucideIcons.Eye />
<LucideIcons.Download />
<LucideIcons.Upload />
<LucideIcons.Filter />
<LucideIcons.MoreVertical />
<LucideIcons.MoreHorizontal />
\`\`\`

## Usage in Menu Items
\`\`\`tsx
import { LucideIcons } from '@e-burgos/tucu-ui';

const menuItems = [
  { name: 'Home', path: '/', icon: <LucideIcons.Home />, component: <Home /> },
  { name: 'Users', path: '/users', icon: <LucideIcons.Users />, component: <Users /> },
  { name: 'Settings', path: '/settings', icon: <LucideIcons.Settings />, component: <Settings /> },
];
\`\`\`

## Usage in Buttons
\`\`\`tsx
import { Button, LucideIcons } from '@e-burgos/tucu-ui';

<Button variant="solid" size="medium">
  <LucideIcons.Plus className="mr-2 h-4 w-4" />
  Add Item
</Button>
\`\`\`

## Usage in Inputs
\`\`\`tsx
import { Input, LucideIcons } from '@e-burgos/tucu-ui';

<Input name="search" label="Search" icon={<LucideIcons.Search />} />
<Input name="email" label="Email" icon={<LucideIcons.Mail />} />
\`\`\`

## Common Icon Sizes
- Navigation/Menu: default size (24px)
- Inside buttons: \`className="h-4 w-4"\`
- Small indicators: \`className="h-3 w-3"\`
- Large display: \`className="h-8 w-8"\` or \`className="h-12 w-12"\`
`;
}

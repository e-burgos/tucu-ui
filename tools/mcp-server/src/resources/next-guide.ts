const NEXT_PAGE_EXAMPLE = `// app/users/page.tsx - Server Component (no directive)
import { Card, Title } from '@e-burgos/tucu-ui';
import { UsersTable } from './users-table';

export default async function UsersPage() {
  const users = await fetch('https://example.com/api/users').then((r) => r.json());
  return (
    <Card>
      <Title>Users</Title>
      <UsersTable data={users} />
    </Card>
  );
}

// app/users/users-table.tsx - client file holding the functions
'use client';
import { DataTable } from '@e-burgos/tucu-ui';
// columns with cell renderers live here, never in the Server Component`;

export function getNextQuickstartSection(): string {
  return `

## Next.js (App Router)

Supported: **Next.js 16+, App Router only**. Use the separate entry \`@e-burgos/tucu-ui/next\`.
Vite apps never load \`next\`; the root barrel \`@e-burgos/tucu-ui\` is unchanged.

### Install
\`\`\`bash
pnpm add @e-burgos/tucu-ui
pnpm add next@^16 react react-dom tailwindcss @tailwindcss/postcss
\`\`\`
Peer dependency: \`next >=16\` (optional peer, only needed for the \`/next\` entry).

### app/layout.tsx
\`\`\`tsx
import './globals.css';
import { LucideIcons } from '@e-burgos/tucu-ui';
import { NextThemeProvider, ThemeModeScript } from '@e-burgos/tucu-ui/next';

const menuItems = [
  { name: 'Home', path: '/', icon: <LucideIcons.Home /> },
  { name: 'Users', path: '/users', icon: <LucideIcons.Users /> },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeModeScript defaultMode="system" />
      </head>
      <body>
        <NextThemeProvider
          showSettings
          logo={{ name: 'My', secondName: 'App' }}
          menuItems={menuItems}
        >
          {children}
        </NextThemeProvider>
      </body>
    </html>
  );
}
\`\`\`
\`NextThemeProvider\` takes the same theming props as the Vite \`ThemeProvider\` (\`menuItems\`,
\`layout\`, \`colors\`, \`lang\`, ...) plus \`children\` = the Next pages. Routes are the \`app/\`
directory: \`menuItems\` only drives the navigation UI (name, path, icon), it does not register
routes and has no \`component\` to render. If the props you pass contain functions, wrap the
provider in a client file (\`providers.tsx\` with \`'use client'\`) and render that from the layout.

\`ThemeModeScript\` (server component, accepts \`nonce\`, \`storageKey\`, \`defaultMode: 'light' | 'dark' | 'system'\`,
\`applyColorScheme\`) sets the \`dark\`/\`light\` class on \`<html>\` before hydration, so there is no flash of the wrong
mode. Keep \`defaultMode\` equal to the provider's. \`getThemeModeScript(options)\` returns the raw script string for
custom \`<script>\` tags. \`NextThemeProvider\` also takes \`preset\` (name or \`ThemePreset\`).

### Tailwind v4 (app/globals.css)
\`\`\`css
@import 'tailwindcss';
@import '@e-burgos/tucu-ui/theme';
@source '../node_modules/@e-burgos/tucu-ui';
\`\`\`
Same rule as Vite Option B: the \`@source\` line (path from the CSS file to
\`node_modules/@e-burgos/tucu-ui\`) is required or component classes produce no CSS.
PostCSS config: \`{ plugins: { '@tailwindcss/postcss': {} } }\`.

### Server / client boundary
- Every tucu-ui module ships with \`'use client'\`, so Server Component pages can import and
  render components directly.
- Passing **functions** (DataTable column cells, chart formatters, form handlers, \`onClick\`)
  from a Server Component into a tucu-ui component is an error: put them in a client file of
  your app (\`'use client'\`) and import that file from the page.
- Serializable props (strings, numbers, plain objects, JSX elements) can cross the boundary.

\`\`\`tsx
${NEXT_PAGE_EXAMPLE}
\`\`\`

### Static export
\`output: 'export'\` in \`next.config\` works: \`NextThemeProvider\` wraps its \`useSearchParams\`
reader in \`Suspense\`, so prerendering does not bail out. Anything that needs a server
(middleware, rewrites, route handlers) is unavailable in that mode; auth redirects belong in
Next middleware or the app, not in the library.

### Not for Next apps
- The \`ReactRouter\` namespace and react-router hooks (\`useNavigate\`, \`useLocation\`,
  \`useParams\`) belong to the Vite/\`ThemeProvider\` flavor; in Next use \`next/navigation\`
  and \`next/link\`.
- Do not mount \`ThemeProvider\` or a \`BrowserRouter\` in a Next app. Links rendered inside
  tucu-ui components already go through \`next/link\` automatically.
- \`appRoutesConfig\` / MFE mode is not applicable.
`;
}

export function getNextRoutingSection(): string {
  return `

## Next.js (App Router)

In a Next 16 App Router app there is **no react-router**: routes are the \`app/\` directory
(\`app/users/page.tsx\` serves \`/users\`, \`app/users/[id]/page.tsx\` serves \`/users/:id\`).
Use \`NextThemeProvider\` from \`@e-burgos/tucu-ui/next\` in \`app/layout.tsx\`.

| Need | Vite (react-router) | Next (App Router) |
|------|---------------------|-------------------|
| Provider | \`ThemeProvider\` | \`NextThemeProvider\` from \`@e-burgos/tucu-ui/next\` |
| Declare routes | \`menuItems[].component\` | files under \`app/\` |
| Navigation menu | \`menuItems\` | \`menuItems\` (name, path, icon, nested \`dropdownItems\`) |
| Programmatic nav | \`ReactRouter.useNavigate()\` | \`useRouter()\` from \`next/navigation\` |
| Current path / params | \`ReactRouter.useLocation()\` / \`useParams()\` | \`usePathname()\` / \`useParams()\` from \`next/navigation\` |
| Links | \`ReactRouter.Link\` | \`next/link\` |
| Lazy / role-based routes | filtered \`menuItems\` + \`component\` | filter \`menuItems\` for display; guard in middleware or the page |

- The \`ReactRouter\` namespace and the CRITICAL RULE above are for Vite apps only.
- Links and menu entries rendered by tucu-ui components go through \`next/link\`
  automatically; external URLs (\`https://\`, \`mailto:\`) render as plain anchors.
- \`menuItems\` does not register routes in Next: a menu entry whose \`app/\` page does not
  exist produces a 404.
- \`architecturalPatterns="mfe"\`, \`basePath\` and \`appRoutesConfig\` are Vite/MFE features and
  do not apply.
`;
}

export function getNextShellSection(): string {
  return `

## Next.js (App Router)

\`NextThemeProvider\` (\`@e-burgos/tucu-ui/next\`) renders the same \`ThemeWrapper\` shell as the
Vite \`ThemeProvider\`, so layouts, \`rightButton\`, scroll container, theme classes on
\`<html>\` and the other sections of this resource apply unchanged. What differs:

- **No Router above the shell.** There is no react-router: navigation state comes from
  \`next/navigation\` (\`usePathname\`, \`useRouter\`, \`useParams\`, \`useSearchParams\`). The
  "only works below this Router" consequence does not exist; \`useLocation\`/\`useNavigate\` from
  react-router must not be used.
- **Mount it once in \`app/layout.tsx\`**, around \`{children}\` (the Next pages):
  \`\`\`tsx
  import { NextThemeProvider } from '@e-burgos/tucu-ui/next';

  <NextThemeProvider showSettings logo={{ name: 'My', secondName: 'App' }} menuItems={menuItems}>
    {children}
  </NextThemeProvider>
  \`\`\`
- **Server/client boundary**: the provider is a client module; pass it serializable props
  from the layout, or wrap it in a \`'use client'\` \`providers.tsx\` when you need functions
  (for example \`rightButton\` callbacks).
- **Suspense**: the provider wraps its \`useSearchParams\` reader in \`Suspense\`, which keeps
  static export (\`output: 'export'\`) working.
- **Cross-app navigation**: external \`^https?://\` targets still use a full-page load;
  internal paths go through the Next router.
- Peer dependency \`next >=16\`; App Router only.
`;
}

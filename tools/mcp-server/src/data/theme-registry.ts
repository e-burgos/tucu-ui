// ─── Theme Registry ─────────────────────────────────────────────────────────
// Provides theme tokens, presets, layouts, and typography for code generation.

export interface ThemeToken {
  name: string;
  cssVariable: string;
  category: 'color' | 'spacing' | 'typography' | 'radius' | 'shadow';
  lightValue: string;
  darkValue: string;
  description: string;
}

export interface ThemePreset {
  name: string;
  description: string;
  colors: Record<string, string>;
  fontFamily: string;
}

export interface LayoutVariant {
  name: string;
  component: string;
  description: string;
  supportsDarkMode: boolean;
  example: string;
}

// ─── Tokens ─────────────────────────────────────────────────────────────────

export const themeTokens: ThemeToken[] = [
  // Colors
  {
    name: 'background',
    cssVariable: '--background',
    category: 'color',
    lightValue: '0 0% 100%',
    darkValue: '240 10% 3.9%',
    description: 'Main background color',
  },
  {
    name: 'foreground',
    cssVariable: '--foreground',
    category: 'color',
    lightValue: '240 10% 3.9%',
    darkValue: '0 0% 98%',
    description: 'Main text color',
  },
  {
    name: 'primary',
    cssVariable: '--primary',
    category: 'color',
    lightValue: '221 83% 53%',
    darkValue: '217 91% 60%',
    description: 'Primary brand color',
  },
  {
    name: 'primary-foreground',
    cssVariable: '--primary-foreground',
    category: 'color',
    lightValue: '0 0% 100%',
    darkValue: '0 0% 100%',
    description: 'Text on primary background',
  },
  {
    name: 'secondary',
    cssVariable: '--secondary',
    category: 'color',
    lightValue: '240 4.8% 95.9%',
    darkValue: '240 3.7% 15.9%',
    description: 'Secondary/muted backgrounds',
  },
  {
    name: 'secondary-foreground',
    cssVariable: '--secondary-foreground',
    category: 'color',
    lightValue: '240 5.9% 10%',
    darkValue: '0 0% 98%',
    description: 'Text on secondary background',
  },
  {
    name: 'muted',
    cssVariable: '--muted',
    category: 'color',
    lightValue: '240 4.8% 95.9%',
    darkValue: '240 3.7% 15.9%',
    description: 'Muted/disabled backgrounds',
  },
  {
    name: 'muted-foreground',
    cssVariable: '--muted-foreground',
    category: 'color',
    lightValue: '240 3.8% 46.1%',
    darkValue: '240 5% 64.9%',
    description: 'Muted text color',
  },
  {
    name: 'accent',
    cssVariable: '--accent',
    category: 'color',
    lightValue: '240 4.8% 95.9%',
    darkValue: '240 3.7% 15.9%',
    description: 'Accent highlights',
  },
  {
    name: 'accent-foreground',
    cssVariable: '--accent-foreground',
    category: 'color',
    lightValue: '240 5.9% 10%',
    darkValue: '0 0% 98%',
    description: 'Text on accent background',
  },
  {
    name: 'border',
    cssVariable: '--border',
    category: 'color',
    lightValue: '240 5.9% 90%',
    darkValue: '240 3.7% 15.9%',
    description: 'Border color',
  },
  {
    name: 'ring',
    cssVariable: '--ring',
    category: 'color',
    lightValue: '221 83% 53%',
    darkValue: '217 91% 60%',
    description: 'Focus ring color',
  },
  {
    name: 'destructive',
    cssVariable: '--destructive',
    category: 'color',
    lightValue: '0 84% 60%',
    darkValue: '0 62% 30%',
    description: 'Error/destructive actions color',
  },
  {
    name: 'success',
    cssVariable: '--success',
    category: 'color',
    lightValue: '142 76% 36%',
    darkValue: '142 70% 45%',
    description: 'Success state color',
  },
  {
    name: 'warning',
    cssVariable: '--warning',
    category: 'color',
    lightValue: '38 92% 50%',
    darkValue: '48 96% 53%',
    description: 'Warning state color',
  },
  // Radius
  {
    name: 'radius',
    cssVariable: '--radius',
    category: 'radius',
    lightValue: '0.5rem',
    darkValue: '0.5rem',
    description: 'Default border radius',
  },
  // Shadows
  {
    name: 'shadow-sm',
    cssVariable: '--shadow-sm',
    category: 'shadow',
    lightValue: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    darkValue: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
    description: 'Small shadow',
  },
  {
    name: 'shadow-md',
    cssVariable: '--shadow-md',
    category: 'shadow',
    lightValue: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    darkValue: '0 4px 6px -1px rgb(0 0 0 / 0.4)',
    description: 'Medium shadow',
  },
];

// ─── Presets ────────────────────────────────────────────────────────────────

export const themePresets: ThemePreset[] = [
  {
    name: 'default',
    description: 'Default blue theme — clean and professional.',
    colors: {
      primary: '221 83% 53%',
      secondary: '240 4.8% 95.9%',
      accent: '240 4.8% 95.9%',
    },
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  {
    name: 'ocean',
    description: 'Deep ocean blues — calm and trustworthy.',
    colors: {
      primary: '199 89% 48%',
      secondary: '200 20% 95%',
      accent: '187 85% 43%',
    },
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  {
    name: 'forest',
    description: 'Nature greens — fresh and organic.',
    colors: {
      primary: '142 76% 36%',
      secondary: '140 20% 95%',
      accent: '160 84% 39%',
    },
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  {
    name: 'sunset',
    description: 'Warm oranges and reds — energetic and bold.',
    colors: {
      primary: '24 95% 53%',
      secondary: '30 20% 95%',
      accent: '0 84% 60%',
    },
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  {
    name: 'midnight',
    description: 'Dark purples — sleek and modern.',
    colors: {
      primary: '263 70% 50%',
      secondary: '260 10% 15%',
      accent: '280 65% 60%',
    },
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  {
    name: 'lavender',
    description: 'Soft purples — elegant and feminine.',
    colors: {
      primary: '270 60% 70%',
      secondary: '270 20% 96%',
      accent: '290 50% 65%',
    },
    fontFamily: 'Inter, system-ui, sans-serif',
  },
];

// ─── Layouts ────────────────────────────────────────────────────────────────

export const layoutVariants: LayoutVariant[] = [
  {
    name: 'dashboard',
    component: 'AdminLayout',
    description:
      'Full admin dashboard with sidebar navigation, header, and content area.',
    supportsDarkMode: true,
    example: `import { AdminLayout } from '@e-burgos/tucu-ui';

<AdminLayout menuItems={[{ label: 'Home', path: '/' }]}>
  <Outlet />
</AdminLayout>`,
  },
  {
    name: 'sidebar',
    component: 'AdminLayout',
    description:
      'Sidebar-focused layout — same as dashboard but with collapsed sidebar option.',
    supportsDarkMode: true,
    example: `import { AdminLayout } from '@e-burgos/tucu-ui';

<AdminLayout menuItems={[{ label: 'Home', path: '/' }]} collapsedSidebar>
  <Outlet />
</AdminLayout>`,
  },
  {
    name: 'fullpage',
    component: 'MacOSLayout',
    description:
      'macOS-inspired layout with dock navigation and window management.',
    supportsDarkMode: true,
    example: `import { MacOSLayout } from '@e-burgos/tucu-ui';

<MacOSLayout menuItems={[{ label: 'Home', path: '/', icon: 'home' }]}>
  <Outlet />
</MacOSLayout>`,
  },
  {
    name: 'stacked',
    component: 'ThemeProvider',
    description:
      'Minimal stacked layout — just ThemeProvider wrapping content vertically.',
    supportsDarkMode: true,
    example: `import { ThemeProvider } from '@e-burgos/tucu-ui';

<ThemeProvider defaultTheme="dark" colorPreset="blue">
  <main className="flex flex-col min-h-screen">
    <header>...</header>
    <div className="flex-1">
      <Outlet />
    </div>
  </main>
</ThemeProvider>`,
  },
  {
    name: 'macos-navbar',
    component: 'MacOSLayout',
    description:
      'macOS Sonoma-inspired layout with top horizontal navigation bar instead of sidebar.',
    supportsDarkMode: true,
    example: `import { MacOSLayout } from '@e-burgos/tucu-ui';

<MacOSLayout variant="sonoma-navbar" menuItems={[{ label: 'Home', path: '/', icon: 'home' }]}>
  <Outlet />
</MacOSLayout>`,
  },
  {
    name: 'macos-tahoe-navbar',
    component: 'MacOSLayout',
    description:
      'macOS Tahoe-inspired layout with top horizontal navigation bar and rounded design language.',
    supportsDarkMode: true,
    example: `import { MacOSLayout } from '@e-burgos/tucu-ui';

<MacOSLayout variant="tahoe-navbar" menuItems={[{ label: 'Home', path: '/', icon: 'home' }]}>
  <Outlet />
</MacOSLayout>`,
  },
];

// ─── Typography ─────────────────────────────────────────────────────────────

export const typographyScale = {
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

// ─── Spacing ────────────────────────────────────────────────────────────────

export const spacingScale: Record<string, string> = {
  '0': '0',
  '0.5': '0.125rem',
  '1': '0.25rem',
  '1.5': '0.375rem',
  '2': '0.5rem',
  '2.5': '0.625rem',
  '3': '0.75rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '8': '2rem',
  '10': '2.5rem',
  '12': '3rem',
  '16': '4rem',
  '20': '5rem',
  '24': '6rem',
};

// ─── Helper functions ───────────────────────────────────────────────────────

export function getPresetByName(name: string): ThemePreset | undefined {
  return themePresets.find((p) => p.name.toLowerCase() === name.toLowerCase());
}

export function getLayoutByName(name: string): LayoutVariant | undefined {
  return layoutVariants.find(
    (l) => l.name.toLowerCase() === name.toLowerCase()
  );
}

export function getTokensByCategory(
  category: ThemeToken['category']
): ThemeToken[] {
  return themeTokens.filter((t) => t.category === category);
}

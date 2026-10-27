import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { LucideIcons } from '@e-burgos/tucu-ui';
import { NextThemeProvider } from '@e-burgos/tucu-ui/next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tucu UI on Next.js',
  description: 'Next.js App Router demo consuming the built tucu-ui package',
};

const menuItems = [
  { name: 'Dashboard', path: '/', icon: <LucideIcons.LayoutDashboard /> },
  { name: 'Reports', path: '/reports', icon: <LucideIcons.Table /> },
  { name: 'Settings', path: '/settings', icon: <LucideIcons.Settings /> },
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextThemeProvider
          logo={{ name: 'Next Demo' }}
          layout="admin"
          brandColor="Blue"
          menuItems={menuItems}
        >
          {children}
        </NextThemeProvider>
      </body>
    </html>
  );
}

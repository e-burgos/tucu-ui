import {
  MacOSSonomaLayout,
  MacOSSonomaLayoutProps,
} from './macos-sonoma-layout';
import { MacOSTahoeLayout, MacOSTahoeLayoutProps } from './macos-tahoe-layout';
import {
  MacOSTahoeDockLayout,
  MacOSTahoeDockLayoutProps,
} from './macos-tahoe-dock-layout';

// ─── Types ─────────────────────────────────────────────────────

type MacOSLayoutVariant = 'sonoma' | 'tahoe' | 'tahoe-dock';

export interface MacOSLayoutProps {
  children: React.ReactNode;
  menuItems: MacOSSonomaLayoutProps['menuItems'];
  logo?: MacOSSonomaLayoutProps['logo'];
  rightButton?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  fullWidth?: boolean;
  variant?: MacOSLayoutVariant;
}

// ─── MacOSLayout (wrapper for backward compat) ─────────────────

export function MacOSLayout({
  variant = 'sonoma',
  ...props
}: MacOSLayoutProps) {
  if (variant === 'tahoe-dock') {
    return <MacOSTahoeDockLayout {...props} />;
  }
  if (variant === 'tahoe') {
    return <MacOSTahoeLayout {...props} />;
  }
  return <MacOSSonomaLayout {...props} />;
}

export default MacOSLayout;
export { MacOSSonomaLayout, MacOSTahoeLayout, MacOSTahoeDockLayout };
export type {
  MacOSSonomaLayoutProps,
  MacOSTahoeLayoutProps,
  MacOSTahoeDockLayoutProps,
  MacOSLayoutVariant,
};

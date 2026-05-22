import {
  MacOSSonomaLayout,
  MacOSSonomaLayoutProps,
} from './macos-sonoma-layout';
import { MacOSTahoeLayout, MacOSTahoeLayoutProps } from './macos-tahoe-layout';
import {
  MacOSTahoeDockLayout,
  MacOSTahoeDockLayoutProps,
} from './macos-tahoe-dock-layout';
import {
  MacOSTahoeCleanLayout,
  MacOSTahoeCleanLayoutProps,
} from './macos-tahoe-clean-layout';
import {
  MacOSSonomaCleanLayout,
  MacOSSonomaCleanLayoutProps,
} from './macos-sonoma-clean-layout';

// ─── Types ─────────────────────────────────────────────────────

type MacOSLayoutVariant =
  | 'sonoma'
  | 'sonoma-clean'
  | 'tahoe'
  | 'tahoe-dock'
  | 'macos-tahoe-clean';

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
  if (variant === 'macos-tahoe-clean') {
    return <MacOSTahoeCleanLayout {...props} />;
  }
  if (variant === 'sonoma-clean') {
    return <MacOSSonomaCleanLayout {...props} />;
  }
  if (variant === 'tahoe') {
    return <MacOSTahoeLayout {...props} />;
  }
  return <MacOSSonomaLayout {...props} />;
}

export default MacOSLayout;
export {
  MacOSSonomaLayout,
  MacOSSonomaCleanLayout,
  MacOSTahoeLayout,
  MacOSTahoeDockLayout,
  MacOSTahoeCleanLayout,
};
export type {
  MacOSSonomaLayoutProps,
  MacOSSonomaCleanLayoutProps,
  MacOSTahoeLayoutProps,
  MacOSTahoeDockLayoutProps,
  MacOSTahoeCleanLayoutProps,
  MacOSLayoutVariant,
};

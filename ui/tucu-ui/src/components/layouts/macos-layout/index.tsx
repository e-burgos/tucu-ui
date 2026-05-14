import {
  MacOSSonomaLayout,
  MacOSSonomaLayoutProps,
} from './macos-sonoma-layout';
import { MacOSTahoeLayout, MacOSTahoeLayoutProps } from './macos-tahoe-layout';

// ─── Types ─────────────────────────────────────────────────────

type MacOSLayoutVariant = 'sonoma' | 'tahoe';

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
  if (variant === 'tahoe') {
    return <MacOSTahoeLayout {...props} />;
  }
  return <MacOSSonomaLayout {...props} />;
}

export default MacOSLayout;
export { MacOSSonomaLayout, MacOSTahoeLayout };
export type {
  MacOSSonomaLayoutProps,
  MacOSTahoeLayoutProps,
  MacOSLayoutVariant,
};

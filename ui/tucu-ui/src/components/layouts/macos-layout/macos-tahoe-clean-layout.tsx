import cn from 'classnames';
import { MacOSTahoeToast } from '../../macos/tahoe/controls/macos-tahoe-toast';
import { ThemeBackground, useTheme } from '../../../themes';

// ─── Types ─────────────────────────────────────────────────────

export interface MacOSTahoeCleanLayoutProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

// ─── MacOSTahoeCleanLayout ──────────────────────────────────────────

export function MacOSTahoeCleanLayout({
  children,
  className,
  contentClassName,
}: MacOSTahoeCleanLayoutProps) {
  const { backgroundVariant } = useTheme();

  return (
    <div className={cn('h-[100vh] w-[100vw] overflow-auto', className)}>
      {/* Background layer */}
      <ThemeBackground mode="absolute" variant={backgroundVariant} />
      {/* Content layer */}
      <div className={cn('relative z-0 h-full w-full', contentClassName)}>
        {children}
      </div>
      <MacOSTahoeToast />
    </div>
  );
}

export default MacOSTahoeCleanLayout;

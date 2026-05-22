import cn from 'classnames';
import { MacOSSonomaToast } from '../../macos/sonoma/feedback/macos-sonoma-toast';
import { ThemeBackground, useTheme } from '../../../themes';

// ─── Types ─────────────────────────────────────────────────────

export interface MacOSSonomaCleanLayoutProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

// ─── MacOSSonomaCleanLayout ─────────────────────────────────────

export function MacOSSonomaCleanLayout({
  children,
  className,
  contentClassName,
}: MacOSSonomaCleanLayoutProps) {
  const { backgroundVariant } = useTheme();
  return (
    <div className={cn('h-[100vh] w-[100vw] overflow-auto', className)}>
      {/* Background layer */}
      <ThemeBackground mode="absolute" variant={backgroundVariant} />
      {/* Content layer */}
      <div
        data-tucu="macos-sonoma-content"
        className={cn('relative z-0 h-full w-full', contentClassName)}
      >
        {children}
      </div>
      <MacOSSonomaToast />
    </div>
  );
}

export default MacOSSonomaCleanLayout;

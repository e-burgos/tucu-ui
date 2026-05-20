import { useState, useEffect, CSSProperties } from 'react';
import cn from 'classnames';
import { useTheme } from '../../../../themes';

// ─── CDN Base ──────────────────────────────────────────────────

const CDN_BASE =
  'https://cdn.jsdelivr.net/gh/e-burgos/tucu-ui@main/docs/assets/macos-bg';

// ─── Types ─────────────────────────────────────────────────────

export type MacOSBackgroundVariant = 'base' | 'wave' | 'wallpaper' | 'mobile';

export interface MacOSBackgroundProps {
  /** Background variant to display */
  variant?: MacOSBackgroundVariant;
  /** Override CDN base URL for self-hosted assets */
  cdnBase?: string;
  /** Additional CSS class for the root container */
  className?: string;
  /** Inline styles for the root container */
  style?: CSSProperties;
  /** Content rendered on top of the background */
  children?: React.ReactNode;
  /** Whether to show the fallback gradient while the image loads */
  showFallback?: boolean;
}

// ─── Gradient Helpers ──────────────────────────────────────────

const baseBgLight =
  'radial-gradient(circle at 28% 32%, rgba(142, 200, 255, 0.45) 0%, transparent 42%), radial-gradient(circle at 72% 68%, rgba(170, 150, 255, 0.28) 0%, transparent 42%), #f0f2f7';

const baseBgDark =
  'radial-gradient(circle at 28% 32%, rgba(18, 60, 100, 0.8) 0%, transparent 42%), radial-gradient(circle at 72% 68%, rgba(55, 30, 100, 0.6) 0%, transparent 42%), #131318';

function getBaseGradient(isDark: boolean) {
  return isDark ? baseBgDark : baseBgLight;
}

// ─── Asset map ─────────────────────────────────────────────────

function getAssetUrl(
  variant: MacOSBackgroundVariant,
  isDark: boolean,
  base: string
): string | null {
  if (variant === 'base') return null;
  const prefix = isDark ? 'dark' : 'light';
  return `${base}/${prefix}-${variant}.svg`;
}

// ─── Component ─────────────────────────────────────────────────

export const MacOSBackground: React.FC<MacOSBackgroundProps> = ({
  variant = 'base',
  cdnBase = CDN_BASE,
  className,
  style,
  children,
  showFallback = true,
}) => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const [imgFailed, setImgFailed] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const assetUrl = getAssetUrl(variant, isDark, cdnBase);

  // Reset state when variant or mode changes
  useEffect(() => {
    setImgFailed(false);
    setImgLoaded(false);
  }, [variant, isDark, cdnBase]);

  const isBaseOnly = variant === 'base' || !assetUrl || imgFailed;

  return (
    <div
      data-tucu="macos-background"
      data-variant={variant}
      className={cn('relative overflow-hidden', className)}
      style={{
        background:
          isBaseOnly || showFallback ? getBaseGradient(isDark) : undefined,
        ...style,
      }}
    >
      {/* SVG image layer */}
      {assetUrl && !imgFailed && (
        <img
          src={assetUrl}
          alt=""
          aria-hidden="true"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgFailed(true)}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-300',
            imgLoaded ? 'opacity-100' : 'opacity-0'
          )}
          draggable={false}
        />
      )}

      {/* Content layer */}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
};

// ─── Static helpers exposed for consumers ──────────────────────

MacOSBackground.displayName = 'MacOSBackground';

/** Get the CDN URL for a specific background asset */
export function getMacOSBackgroundUrl(
  variant: Exclude<MacOSBackgroundVariant, 'base'>,
  isDark: boolean,
  base: string = CDN_BASE
): string {
  const prefix = isDark ? 'dark' : 'light';
  return `${base}/${prefix}-${variant}.svg`;
}

/** Get the CSS gradient string for the Base background */
export { getBaseGradient as getMacOSBaseGradient };

export default MacOSBackground;

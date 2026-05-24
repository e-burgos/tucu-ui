import { useState, useEffect, CSSProperties } from 'react';
import cn from 'classnames';
import { useTheme, BackgroundVariant } from '../hooks/use-theme';

// ─── CDN Base ──────────────────────────────────────────────────

const CDN_BASE =
  'https://cdn.jsdelivr.net/gh/e-burgos/tucu-ui@main/docs/assets/macos-bg';

// ─── Variant → CSS class map ───────────────────────────────────

const VARIANT_CLASSES: Record<string, string> = {
  base: 'tucu-bg-base',
  sonoma: 'tucu-bg-sonoma',
  radial: 'tucu-bg-radial',
  aurora: 'tucu-bg-aurora',
  depth: 'tucu-bg-depth',
  demo: 'tucu-bg-demo',
  window: 'tucu-bg-window',
  wave: 'tucu-bg-wave',
  wallpaper: 'tucu-bg-wallpaper',
  mobile: 'tucu-bg-mobile',
};

// ─── SVG asset variants ────────────────────────────────────────

const SVG_VARIANTS: BackgroundVariant[] = ['wave', 'wallpaper', 'mobile'];

function getAssetUrl(
  variant: BackgroundVariant,
  isDark: boolean,
  base: string
): string | null {
  if (!SVG_VARIANTS.includes(variant)) return null;
  const prefix = isDark ? 'dark' : 'light';
  return `${base}/${prefix}-${variant}.svg`;
}

// ─── Component ─────────────────────────────────────────────────

export interface ThemeBackgroundProps {
  /**
   * Positioning mode:
   * - `'fixed'` (default): fullscreen fixed layer behind content. Content is wrapped in z-10.
   * - `'absolute'`: absolute-positioned layer within parent. No children wrapper.
   */
  mode?: 'fixed' | 'absolute';
  /** Override the variant from the theme store */
  variant?: BackgroundVariant;
  /** Override CDN base URL for self-hosted assets */
  cdnBase?: string;
  /** Additional CSS class for the background container */
  className?: string;
  /** Inline styles for the background container */
  style?: CSSProperties;
  /** Content rendered on top of the background (only used in fixed mode) */
  children?: React.ReactNode;
}

/**
 * Unified background component that renders the selected `backgroundVariant`.
 * Used by all theme layouts (Default, Sonoma, Tahoe) via two positioning modes:
 *
 * - **fixed** (Default layouts): fullscreen fixed layer + content wrapper at z-10
 * - **absolute** (macOS layouts): absolute layer within parent container, no children wrapper
 *
 * When variant is `'none'`, renders children without any background layer.
 */
export const ThemeBackground: React.FC<ThemeBackgroundProps> = ({
  mode: positionMode = 'fixed',
  variant: variantProp,
  cdnBase = CDN_BASE,
  className,
  style,
  children,
}) => {
  const { mode: themeMode, backgroundVariant: storeVariant } = useTheme();
  const isDark = themeMode === 'dark';

  const variant = variantProp ?? storeVariant ?? 'none';

  const [imgFailed, setImgFailed] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const assetUrl = getAssetUrl(variant, isDark, cdnBase);
  const variantClass = VARIANT_CLASSES[variant] || '';

  // Reset state when variant or mode changes
  useEffect(() => {
    setImgFailed(false);
    setImgLoaded(false);
  }, [variant, isDark, cdnBase]);

  // When 'none', render children directly without any background layer
  if (variant === 'none') {
    return <>{children}</>;
  }

  const isFixed = positionMode === 'fixed';

  const bgElement = (
    <div
      data-tucu="theme-background"
      data-variant={variant}
      className={cn(
        isFixed ? 'fixed inset-0 z-0 h-dvh' : 'absolute inset-0 -z-[1]',
        variantClass,
        className
      )}
      style={style}
      aria-hidden="true"
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
    </div>
  );

  // Absolute mode: just render the bg div, no children wrapper
  if (!isFixed) {
    return bgElement;
  }

  // Fixed mode: bg layer + content wrapper
  return (
    <>
      {bgElement}
      <div className="relative z-10 min-h-dvh">{children}</div>
    </>
  );
};

// ─── Static helpers ────────────────────────────────────────────

/** Get the CDN URL for a specific SVG background asset */
export function getBackgroundUrl(
  variant: Exclude<BackgroundVariant, 'none' | 'base'>,
  isDark: boolean,
  base: string = CDN_BASE
): string {
  const prefix = isDark ? 'dark' : 'light';
  return `${base}/${prefix}-${variant}.svg`;
}

ThemeBackground.displayName = 'ThemeBackground';

export default ThemeBackground;

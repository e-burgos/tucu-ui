import { useTheme } from '../../hooks/use-theme';
import { LAYOUT_OPTIONS } from '../../config';

export function SettingsSectionHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  const { colorScheme, layout } = useTheme();
  const isMacOS =
    colorScheme === 'macos' ||
    colorScheme === 'macos-tahoe' ||
    layout === LAYOUT_OPTIONS.MACOS ||
    layout === LAYOUT_OPTIONS.MACOS_NAVBAR ||
    layout === LAYOUT_OPTIONS.MACOS_TAHOE ||
    layout === LAYOUT_OPTIONS.MACOS_TAHOE_DOCK ||
    layout === LAYOUT_OPTIONS.MACOS_TAHOE_NAVBAR;

  if (isMacOS) {
    return (
      <div
        role="heading"
        aria-level={3}
        className="mb-4 text-[11px] font-semibold uppercase tracking-[0.06em] text-(--macos-secondary-label)"
      >
        {children}
      </div>
    );
  }

  return (
    <h4 className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
      {children}
    </h4>
  );
}

export default SettingsSectionHeading;

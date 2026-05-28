import { useTheme } from '../../hooks/use-theme';
import cn from 'classnames';
import { TAHOE_ACCENT_BUNDLES, buildTahoePresets } from '../../config';
import { SettingsSectionHeading } from './settings-section-heading';

export function TahoeAccentPicker() {
  const { primaryPreset, accentPreset } = useTheme();

  const handleAccentSelect = (bundleId: string) => {
    const bundle = TAHOE_ACCENT_BUNDLES.find((b) => b.id === bundleId);
    if (!bundle) return;
    const presets = buildTahoePresets(bundle);
    useTheme.setState(presets);
  };

  const pv = primaryPreset?.value?.toLowerCase();
  const av = accentPreset?.value?.toLowerCase();
  const activeId = TAHOE_ACCENT_BUNDLES.find(
    (b) =>
      (b.primaryLight.toLowerCase() === pv ||
        b.primaryDark.toLowerCase() === pv) &&
      (b.accentLight.toLowerCase() === av || b.accentDark.toLowerCase() === av)
  )?.id;

  return (
    <div className="px-6 pt-8">
      <SettingsSectionHeading>Accent Color</SettingsSectionHeading>
      <div className="grid grid-cols-4 gap-3">
        {TAHOE_ACCENT_BUNDLES.map((bundle) => {
          const isActive = activeId === bundle.id;
          const isGlass = bundle.id === 'glass-neutral';
          return (
            <button
              key={bundle.id}
              type="button"
              aria-label={`${bundle.label} accent`}
              onClick={() => handleAccentSelect(bundle.id)}
              className={cn(
                'group flex text-gray-900 dark:text-white flex-col items-center gap-1.5 rounded-xl p-2 transition-all cursor-pointer',
                isActive
                  ? 'bg-black/8 ring-1 ring-black/15 dark:bg-white/10 dark:ring-white/20'
                  : 'hover:bg-black/5 dark:hover:bg-white/5'
              )}
            >
              <span
                className={cn(
                  'h-7 w-7 rounded-full border-2 transition-transform',
                  isActive
                    ? 'border-gray-900 dark:border-white scale-110 shadow-lg'
                    : 'border-transparent group-hover:scale-105'
                )}
                style={{
                  background: isGlass
                    ? 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 50%, #FF9500 100%)'
                    : bundle.swatch,
                }}
              />
              <span
                className={cn(
                  'text-[10px] font-medium transition-colors',
                  isActive
                    ? 'text-gray-900 dark:text-white'
                    : 'text-(--macos-tahoe-text-muted) group-hover:text-(--macos-tahoe-text)'
                )}
              >
                {bundle.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TahoeAccentPicker;

import { useTheme } from '../../hooks/use-theme';
import cn from 'classnames';
import { SONOMA_ACCENT_BUNDLES, buildSonomaPresets } from '../../config';
import { SettingsSectionHeading } from './settings-section-heading';

export function SonomaAccentPicker() {
  const { primaryPreset, accentPreset } = useTheme();

  const handleAccentSelect = (bundleId: string) => {
    const bundle = SONOMA_ACCENT_BUNDLES.find((b) => b.id === bundleId);
    if (!bundle) return;
    const presets = buildSonomaPresets(bundle);
    useTheme.setState(presets);
  };

  const pv = primaryPreset?.value?.toLowerCase();
  const av = accentPreset?.value?.toLowerCase();
  const activeId = SONOMA_ACCENT_BUNDLES.find(
    (b) =>
      (b.primaryLight.toLowerCase() === pv ||
        b.primaryDark.toLowerCase() === pv) &&
      (b.accentLight.toLowerCase() === av || b.accentDark.toLowerCase() === av)
  )?.id;

  return (
    <div className="px-6 pt-8">
      <SettingsSectionHeading>Accent Color</SettingsSectionHeading>
      <div className="grid grid-cols-4 gap-3">
        {SONOMA_ACCENT_BUNDLES.map((bundle) => {
          const isActive = activeId === bundle.id;
          return (
            <button
              key={bundle.id}
              type="button"
              aria-label={`${bundle.label} accent`}
              onClick={() => handleAccentSelect(bundle.id)}
              className={cn(
                'group flex flex-col items-center gap-1.5 rounded-xl p-2 transition-all cursor-pointer',
                isActive
                  ? 'bg-white/10 ring-1 ring-white/20'
                  : 'hover:bg-white/5'
              )}
            >
              <span
                className={cn(
                  'h-7 w-7 rounded-full border-2 transition-transform',
                  isActive
                    ? 'border-white scale-110 shadow-lg'
                    : 'border-transparent group-hover:scale-105'
                )}
                style={{ background: bundle.swatch }}
              />
              <span
                className={cn(
                  'text-[10px] font-medium transition-colors',
                  isActive
                    ? 'text-white'
                    : 'text-gray-400 group-hover:text-gray-200'
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

export default SonomaAccentPicker;

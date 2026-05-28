import { useTheme } from '../../hooks/use-theme';
import cn from 'classnames';
import {
  Circle,
  Waves,
  Image,
  Smartphone,
  Sparkles,
  Layers,
  Palette,
  Monitor,
  Square,
  Ban,
} from 'lucide-react';
import { Sun } from '../../../components/icons';
import { SettingsSectionHeading } from './settings-section-heading';

const ALL_BACKGROUNDS = [
  { id: 'none', label: 'None', Icon: Ban },
  { id: 'base', label: 'Base', Icon: Circle },
  { id: 'sonoma', label: 'Sonoma', Icon: Square },
  { id: 'radial', label: 'Radial', Icon: Sun },
  { id: 'wave', label: 'Wave', Icon: Waves },
  { id: 'wallpaper', label: 'Wallpaper', Icon: Image },
  { id: 'mobile', label: 'Mobile', Icon: Smartphone },
  { id: 'window', label: 'Window', Icon: Monitor },
  { id: 'aurora', label: 'Aurora', Icon: Sparkles },
  { id: 'depth', label: 'Depth', Icon: Layers },
  { id: 'demo', label: 'Demo', Icon: Palette },
] as const;

export function BackgroundPicker() {
  const { backgroundVariant, setBackgroundVariant } = useTheme();

  return (
    <div className="px-6 pt-8">
      <SettingsSectionHeading>Background</SettingsSectionHeading>
      <div className="grid grid-cols-4 gap-3">
        {ALL_BACKGROUNDS.map((bg) => {
          const isActive = backgroundVariant === bg.id;
          return (
            <button
              key={bg.id}
              type="button"
              aria-label={`${bg.label} background`}
              onClick={() => setBackgroundVariant(bg.id)}
              className={cn(
                'group flex flex-col items-center gap-1.5 rounded-xl p-2 transition-all cursor-pointer',
                isActive
                  ? 'bg-black/8 ring-1 ring-black/15 dark:bg-white/10 dark:ring-white/20'
                  : 'text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/5'
              )}
            >
              <span
                className={cn(
                  'flex h-7 w-7 items-center bg-brand/30 justify-center rounded-full border-2 transition-transform',
                  isActive
                    ? 'border-gray-900 dark:border-white scale-110 shadow-lg'
                    : 'border-transparent group-hover:scale-105'
                )}
              >
                <bg.Icon className="h-4 w-4" />
              </span>
              <span
                className={cn(
                  'text-[10px] font-medium transition-colors',
                  isActive
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white'
                )}
              >
                {bg.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default BackgroundPicker;

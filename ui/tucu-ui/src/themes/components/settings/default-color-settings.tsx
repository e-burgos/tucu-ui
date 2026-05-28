import { useTheme } from '../../hooks/use-theme';
import { COLOR_GROUPS } from './settings-types';
import type { ColorType } from './settings-types';
import { SettingsSectionHeading } from './settings-section-heading';
import { ColorDot } from './color-dot';

export function DefaultColorSettings() {
  const mode = useTheme((s) => s.mode);

  return (
    <>
      {COLOR_GROUPS.map((group) => (
        <div key={group.title} className="px-6 pt-6">
          <SettingsSectionHeading>{group.title}</SettingsSectionHeading>
          <div className="grid grid-cols-4 gap-3">
            {group.items.map((pair) => {
              const type: ColorType = mode === 'dark' ? pair.dark : pair.light;
              return <ColorDot key={pair.light} type={type} />;
            })}
          </div>
        </div>
      ))}
    </>
  );
}

export default DefaultColorSettings;

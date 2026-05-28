import { useState } from 'react';
import { useTheme } from '../../hooks/use-theme';
import type { IThemeItem } from '../../config';
import { COLOR_CONFIG } from './settings-types';
import type { ColorType } from './settings-types';
import { ColorSwatchModal } from './color-swatch-modal';

export function ColorDot({ type }: { type: ColorType }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { presetKey, label } = COLOR_CONFIG[type];
  const color = useTheme((s) => s[presetKey] as IThemeItem);

  const shortLabel = label
    .replace(' Color', '')
    .replace('Dark ', '')
    .replace('Light ', '');

  return (
    <>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="group flex flex-col items-center gap-1.5 cursor-pointer"
        title={label}
      >
        <span
          style={{ backgroundColor: color?.value }}
          className="h-9 w-9 rounded-full border border-border/40 dark:border-border/40 transition-all group-hover:scale-110 group-hover:border-gray-400 dark:group-hover:border-gray-400 shadow-sm"
        />
        <span className="text-[9px] font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors text-center leading-tight max-w-[56px]">
          {shortLabel}
        </span>
      </button>
      <ColorSwatchModal
        type={type}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

export default ColorDot;

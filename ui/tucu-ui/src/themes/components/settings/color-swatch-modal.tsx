import { useState, useEffect } from 'react';
import { useTheme } from '../../hooks/use-theme';
import type { IThemeItem } from '../../config';
import { colorPreset } from '../../config';
import { Sun, Moon } from '../../../components/icons';
import { Close } from '../../../components/icons/close';
import { Input } from '../../../components/inputs/input';
import { Button } from '../../../components/buttons/button';
import cn from 'classnames';
import { COLOR_CONFIG } from './settings-types';
import type { ColorType } from './settings-types';

export function ColorSwatchModal({
  type,
  isOpen,
  onClose,
}: {
  type: ColorType;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [customValue, setCustomValue] = useState('');
  const [opacity, setOpacity] = useState(100);
  const { presetKey, setterKey, defaultValue, label } = COLOR_CONFIG[type];
  const color = useTheme((s) => s[presetKey] as IThemeItem);
  const setColor = useTheme((s) => s[setterKey] as (value: IThemeItem) => void);
  const mode = useTheme((s) => s.mode);
  const setMode = useTheme((s) => s.setMode);

  useEffect(() => {
    const val = color?.value || '';
    if (val.length === 9 && val.startsWith('#')) {
      const alpha = parseInt(val.slice(7, 9), 16);
      setOpacity(Math.round((alpha / 255) * 100));
    } else {
      setOpacity(100);
    }
  }, [color?.value]);

  const applyOpacity = (hex: string, opacityPercent: number): string => {
    const base = hex.slice(0, 7);
    if (opacityPercent >= 100) return base;
    const alpha = Math.round((opacityPercent / 100) * 255)
      .toString(16)
      .padStart(2, '0');
    return `${base}${alpha}`;
  };

  const handlePresetClick = (preset: IThemeItem) => {
    const val = applyOpacity(preset.value, opacity);
    setColor({ label: preset.label, value: val });
  };

  const handleNativeColor = (hex: string) => {
    const val = applyOpacity(hex, opacity);
    setCustomValue(val);
    setColor({ label: `Custom`, value: val });
  };

  const handleOpacityChange = (newOpacity: number) => {
    setOpacity(newOpacity);
    const base = (color?.value || '#000000').slice(0, 7);
    const val = applyOpacity(base, newOpacity);
    setColor({ label: color?.label || 'Custom', value: val });
  };

  const handleCustomSubmit = () => {
    if (customValue) {
      setColor({ label: `Custom`, value: customValue });
    } else {
      setColor(defaultValue);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-xs rounded-2xl bg-white dark:bg-gray-800 shadow-2xl border border-border overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border dark:border-border">
          <div className="flex items-center gap-2">
            <span
              style={{ backgroundColor: color?.value }}
              className="h-5 w-5 rounded-full border border-border"
            />
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {label}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Close className="h-3 w-3" width={12} height={12} />
          </button>
        </div>

        {/* Mode Switcher */}
        <div className="px-4 py-2 border-b border-border dark:border-border">
          <div className="flex items-center gap-1 rounded-lg bg-gray-100 dark:bg-gray-700 p-0.5">
            <button
              type="button"
              onClick={() => setMode('light')}
              className={cn(
                'flex-1 flex items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all',
                mode === 'light'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              )}
            >
              <Sun className="h-3 w-3" />
              Light
            </button>
            <button
              type="button"
              onClick={() => setMode('dark')}
              className={cn(
                'flex-1 flex items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all',
                mode === 'dark'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              )}
            >
              <Moon className="h-3 w-3" />
              Dark
            </button>
          </div>
        </div>

        {/* Preset Swatches */}
        <div className="px-4 py-3">
          <span className="text-[10px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Presets
          </span>
          <div className="grid grid-cols-7 gap-2 mt-2">
            {colorPreset.map((preset) => {
              const isActive = color?.value === preset.value;
              return (
                <button
                  key={preset.label}
                  type="button"
                  title={preset.label}
                  onClick={() => handlePresetClick(preset)}
                  className={cn(
                    'h-7 w-7 rounded-full border-2 transition-all cursor-pointer hover:scale-110',
                    isActive
                      ? 'border-gray-900 dark:border-white scale-110 shadow-lg'
                      : 'border-transparent hover:border-border dark:hover:border-gray-500'
                  )}
                  style={{ backgroundColor: preset.value }}
                />
              );
            })}
          </div>
        </div>

        {/* Custom Color */}
        <div className="px-4 py-3 border-t border-border dark:border-border">
          <span className="text-[10px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Custom Color
          </span>
          <div className="flex items-center gap-2 mt-2">
            <input
              type="color"
              value={(color?.value || '#000000').slice(0, 7)}
              onChange={(e) => handleNativeColor(e.target.value)}
              className="h-9 w-9 cursor-pointer rounded-lg border border-border p-0.5 bg-transparent"
            />
            <Input
              placeholder="#hex"
              type="text"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              className="flex-1"
            />
            <Button size="mini" variant="ghost" onClick={handleCustomSubmit}>
              {customValue ? 'Set' : 'Reset'}
            </Button>
          </div>
        </div>

        {/* Opacity */}
        <div className="px-4 py-3 border-t border-border dark:border-border">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Opacity
            </span>
            <span className="text-[11px] font-medium text-gray-700 dark:text-gray-300">
              {opacity}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={opacity}
            onChange={(e) => handleOpacityChange(Number(e.target.value))}
            className="mt-2 w-full h-1.5 rounded-full appearance-none cursor-pointer bg-gray-200 dark:bg-gray-600 accent-current"
            style={{ accentColor: (color?.value || '#000000').slice(0, 7) }}
          />
        </div>
      </div>
    </div>
  );
}

export default ColorSwatchModal;

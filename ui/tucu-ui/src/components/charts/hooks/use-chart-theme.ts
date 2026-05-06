import { useTheme } from '../../../themes';

export interface ChartTheme {
  mode: 'light' | 'dark';
  colors: string[];
  grid: string;
  text: string;
  background: string;
  border: string;
  tooltipBg: string;
  tooltipText: string;
  tooltipBorder: string;
  cursorFill: string;
}

const LIGHT_PALETTE = [
  '#105eff', // Blue
  '#129961', // Green
  '#e1591b', // Orange
  '#9d6bf2', // Purple
  '#0093cb', // Teal
  '#cb51bb', // Pink
  '#596ff2', // Indigo
  '#56b340', // Chartreuse
];

const DARK_PALETTE = [
  '#578bfa', // Dark Blue
  '#159962', // Dark Green
  '#e66020', // Dark Orange
  '#bc7bfb', // Dark Purple
  '#0095cd', // Dark Teal
  '#d058c1', // Dark Pink
  '#5c71ee', // Dark Indigo
  '#7bc869', // Dark Chartreuse
];

export function useChartTheme(): ChartTheme {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  return {
    mode,
    colors: isDark ? DARK_PALETTE : LIGHT_PALETTE,
    grid: isDark ? '#282b31' : '#e5e7eb',
    text: isDark ? '#8a919e' : '#5b616e',
    background: isDark ? '#0a0b0d' : '#ffffff',
    border: isDark ? '#282b31' : '#eef0f3',
    tooltipBg: isDark ? '#141519' : '#ffffff',
    tooltipText: isDark ? '#f7f8f9' : '#0a0b0d',
    tooltipBorder: isDark ? '#282b31' : '#eef0f3',
    cursorFill: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
  };
}

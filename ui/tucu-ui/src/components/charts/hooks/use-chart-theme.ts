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
    grid: isDark ? '#172131' : '#e5e7eb',
    text: isDark ? '#828a99' : '#4a5565',
    background: isDark ? '#030712' : '#ffffff',
    border: isDark ? '#172131' : '#f3f4f6',
    tooltipBg: isDark ? '#0a101d' : '#ffffff',
    tooltipText: isDark ? '#f9fafb' : '#030712',
    tooltipBorder: isDark ? '#172131' : '#f3f4f6',
    cursorFill: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
  };
}

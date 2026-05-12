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

/* Apple HIG system colors for macOS theme */
const MACOS_LIGHT_PALETTE = [
  '#007aff', // System Blue
  '#34c759', // System Green
  '#ff9500', // System Orange
  '#af52de', // System Purple
  '#5ac8fa', // System Teal
  '#ff2d55', // System Pink
  '#5856d6', // System Indigo
  '#ffcc00', // System Yellow
];

const MACOS_DARK_PALETTE = [
  '#0a84ff', // System Blue (dark)
  '#30d158', // System Green (dark)
  '#ff9f0a', // System Orange (dark)
  '#bf5af2', // System Purple (dark)
  '#64d2ff', // System Teal (dark)
  '#ff375f', // System Pink (dark)
  '#5e5ce6', // System Indigo (dark)
  '#ffd60a', // System Yellow (dark)
];

export function useChartTheme(): ChartTheme {
  const { mode, colorScheme } = useTheme();
  const isDark = mode === 'dark';
  const isMacOS = colorScheme === 'macos';

  if (isMacOS) {
    return {
      mode,
      colors: isDark ? MACOS_DARK_PALETTE : MACOS_LIGHT_PALETTE,
      grid: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
      text: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.5)',
      background: isDark ? '#1e1e1e' : '#ffffff',
      border: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)',
      tooltipBg: isDark ? 'rgba(40,40,40,0.95)' : 'rgba(255,255,255,0.95)',
      tooltipText: isDark ? '#f5f5f7' : '#1d1d1f',
      tooltipBorder: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
      cursorFill: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
    };
  }

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

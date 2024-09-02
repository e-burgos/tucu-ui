/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useTheme } from '@mui/material';
import { storage } from '../local-storage';

/**
 * useTableColors hook.
 * This hook is used to get the colors used in the table.
 * The propuse of this hook is to have a single source of truth for the colors used in the table without opacity.
 *
 * @property {string} primary is used as the primary color for the table, reference MUI palette color: theme.palette.primary.main.
 * @property {string} defaultBg is used as the default background color for the table, reference MUI palette color: theme.palette.background.default.
 * @property {string} headerBg is used as the header background color for the table, reference MUI palette color: theme.palette.common.p[4].
 * @property {string} paperBg is used as the paper background color for the table, reference MUI palette color: theme.palette.background.paper.
 * @property {string} primaryText is used as the primary text color for the table, reference MUI palette color: theme.palette.text.primary.
 * @property {string} secondaryText is used as the secondary text color for the table, reference MUI palette color: theme.palette.text.secondary.
 * @property {string} divider is used as the divider color for the table, reference MUI palette color: theme.palette.divider.
 * @property {string} disabled is used as the disabled color for the table, reference MUI palette color: theme.palette.action.disabled.
 * @property {string} rowHover is used as the row hover color for the table, reference MUI palette color: theme.palette.action.hover.
 * @property {string} actionHover is used as the action hover color for the table, custom color.
 * @property {string} rowExpandedBg is used as the row expanded background color for the table, custom color.
 * @property {string} headerExpandedBg is used as the header expanded background color for the table, custom color.
 * @property {string} rowBg is used as the row background color for the table, custom color.
 * @property {string} dividerColumns is used as the divider columns color for the table, custom color.
 * @property {Object} palleteColors is used to get the colors used in the table.
 * @property {Object} darkColors is used to get the dark colors used in the table.
 * @property {Object} lightColors is used to get the light colors used in the table.
 * @property {Object} colors is used to get the colors used in the table.
 *
 * @returns {Object} The colors used in the table.
 */

export type PalleteModeType = 'light' | 'dark';

const useTableColors = () => {
  const currentTheme = storage.get('settings');
  const theme = useTheme();

  const themeMode: PalleteModeType =
    currentTheme?.themeMode || theme.palette.mode;

  const handleColors = (mode: PalleteModeType) => ({
    primary: '#0946D1',
    defaultBg: mode === 'dark' ? '#16191F' : '#E5EBF7',
    headerBg: mode === 'dark' ? '#1F2228' : '#DCE2ED',
    headerExpandedBg: mode === 'dark' ? '#191B20' : '#EBEEF5',
    rowBg: mode === 'dark' ? '#16191F' : '#E5EBF7',
    rowHover: mode === 'dark' ? '#232529' : '#d2d6e0',
    rowExpandedBg: mode === 'dark' ? '#101217' : '#F5F8FF',
    paperBg: mode === 'dark' ? '#16191F' : '#E5EBF7',
    primaryText: mode === 'dark' ? '#FFFFFF' : '#1E1E20',
    secondaryText: mode === 'dark' ? '#B9B9BB' : '#5E5F62',
    divider: mode === 'dark' ? '#2D2F33' : '#E0E0E0',
    disabled: mode === 'dark' ? '#FFFFFF4D' : '#0000001A',
    actionHover: mode === 'dark' ? '#2d2e32' : '#DCE2ED',
    dividerColumns: mode === 'dark' ? '#515151' : '#5E5F6220',
  });

  const darkColors = handleColors('dark');
  const lightColors = handleColors('light');
  const colors = handleColors(themeMode);

  const palleteColors = Object.keys(colors).map((key) => {
    // @ts-ignore
    return { name: key, dark: darkColors[key], light: lightColors[key] };
  });

  const palleteLightColors = Object.keys(lightColors).map((key) => {
    // @ts-ignore
    return { name: key, color: lightColors[key] };
  });

  const palleteDarkColors = Object.keys(darkColors).map((key) => {
    // @ts-ignore
    return { name: key, color: darkColors[key] };
  });

  return {
    colors,
    palleteColors,
    palleteLightColors,
    palleteDarkColors,
    darkColors,
    lightColors,
  };
};

export default useTableColors;

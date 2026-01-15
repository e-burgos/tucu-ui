import { useEffect, useState } from 'react';
import {
  Button,
  CardContainer,
  Typography,
  useTheme,
  useAnchorScroll,
} from '../../../../index';

// Helper function to get hex color from CSS variable
const getColorHex = (varName: string): string => {
  if (typeof window === 'undefined') return '';
  const root = document.documentElement;
  const value = getComputedStyle(root).getPropertyValue(varName).trim();
  return value || '';
};

export const DesignSystemIntroduction = () => {
  useAnchorScroll();

  const { mode } = useTheme();
  const [updateKey, setUpdateKey] = useState(0);

  // Force update when theme mode changes
  useEffect(() => {
    // Small delay to ensure CSS variables are updated
    const timer = setTimeout(() => {
      setUpdateKey((prev) => prev + 1);
    }, 100);

    return () => clearTimeout(timer);
  }, [mode]);

  // Also observe changes to the document class (light/dark)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setUpdateKey((prev) => prev + 1);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Color spectrum configuration
  const colorSpectrum = [
    {
      name: 'blue',
      shades: [0, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    },
    {
      name: 'green',
      shades: [0, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    },
    {
      name: 'orange',
      shades: [0, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    },
    {
      name: 'gray',
      shades: [0, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    },
    {
      name: 'indigo',
      shades: [0, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    },
    {
      name: 'pink',
      shades: [0, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    },
    {
      name: 'purple',
      shades: [0, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    },
    {
      name: 'red',
      shades: [0, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    },
    {
      name: 'teal',
      shades: [0, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    },
    {
      name: 'yellow',
      shades: [0, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    },
    {
      name: 'chartreuse',
      shades: [0, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    },
  ];

  // Color class mapping - All classes written literally so Tailwind can detect and generate them
  // This ensures Tailwind generates all utility classes for the color spectrum
  const colorClassMap: Record<string, Record<number, string>> = {
    blue: {
      0: 'bg-blue-0',
      5: 'bg-blue-5',
      10: 'bg-blue-10',
      15: 'bg-blue-15',
      20: 'bg-blue-20',
      30: 'bg-blue-30',
      40: 'bg-blue-40',
      50: 'bg-blue-50',
      60: 'bg-blue-60',
      70: 'bg-blue-70',
      80: 'bg-blue-80',
      90: 'bg-blue-90',
      100: 'bg-blue-100',
    },
    green: {
      0: 'bg-green-0',
      5: 'bg-green-5',
      10: 'bg-green-10',
      15: 'bg-green-15',
      20: 'bg-green-20',
      30: 'bg-green-30',
      40: 'bg-green-40',
      50: 'bg-green-50',
      60: 'bg-green-60',
      70: 'bg-green-70',
      80: 'bg-green-80',
      90: 'bg-green-90',
      100: 'bg-green-100',
    },
    orange: {
      0: 'bg-orange-0',
      5: 'bg-orange-5',
      10: 'bg-orange-10',
      15: 'bg-orange-15',
      20: 'bg-orange-20',
      30: 'bg-orange-30',
      40: 'bg-orange-40',
      50: 'bg-orange-50',
      60: 'bg-orange-60',
      70: 'bg-orange-70',
      80: 'bg-orange-80',
      90: 'bg-orange-90',
      100: 'bg-orange-100',
    },
    gray: {
      0: 'bg-gray-0',
      5: 'bg-gray-5',
      10: 'bg-gray-10',
      15: 'bg-gray-15',
      20: 'bg-gray-20',
      30: 'bg-gray-30',
      40: 'bg-gray-40',
      50: 'bg-gray-50',
      60: 'bg-gray-60',
      70: 'bg-gray-70',
      80: 'bg-gray-80',
      90: 'bg-gray-90',
      100: 'bg-gray-100',
    },
    indigo: {
      0: 'bg-indigo-0',
      5: 'bg-indigo-5',
      10: 'bg-indigo-10',
      15: 'bg-indigo-15',
      20: 'bg-indigo-20',
      30: 'bg-indigo-30',
      40: 'bg-indigo-40',
      50: 'bg-indigo-50',
      60: 'bg-indigo-60',
      70: 'bg-indigo-70',
      80: 'bg-indigo-80',
      90: 'bg-indigo-90',
      100: 'bg-indigo-100',
    },
    pink: {
      0: 'bg-pink-0',
      5: 'bg-pink-5',
      10: 'bg-pink-10',
      15: 'bg-pink-15',
      20: 'bg-pink-20',
      30: 'bg-pink-30',
      40: 'bg-pink-40',
      50: 'bg-pink-50',
      60: 'bg-pink-60',
      70: 'bg-pink-70',
      80: 'bg-pink-80',
      90: 'bg-pink-90',
      100: 'bg-pink-100',
    },
    purple: {
      0: 'bg-purple-0',
      5: 'bg-purple-5',
      10: 'bg-purple-10',
      15: 'bg-purple-15',
      20: 'bg-purple-20',
      30: 'bg-purple-30',
      40: 'bg-purple-40',
      50: 'bg-purple-50',
      60: 'bg-purple-60',
      70: 'bg-purple-70',
      80: 'bg-purple-80',
      90: 'bg-purple-90',
      100: 'bg-purple-100',
    },
    red: {
      0: 'bg-red-0',
      5: 'bg-red-5',
      10: 'bg-red-10',
      15: 'bg-red-15',
      20: 'bg-red-20',
      30: 'bg-red-30',
      40: 'bg-red-40',
      50: 'bg-red-50',
      60: 'bg-red-60',
      70: 'bg-red-70',
      80: 'bg-red-80',
      90: 'bg-red-90',
      100: 'bg-red-100',
    },
    teal: {
      0: 'bg-teal-0',
      5: 'bg-teal-5',
      10: 'bg-teal-10',
      15: 'bg-teal-15',
      20: 'bg-teal-20',
      30: 'bg-teal-30',
      40: 'bg-teal-40',
      50: 'bg-teal-50',
      60: 'bg-teal-60',
      70: 'bg-teal-70',
      80: 'bg-teal-80',
      90: 'bg-teal-90',
      100: 'bg-teal-100',
    },
    yellow: {
      0: 'bg-yellow-0',
      5: 'bg-yellow-5',
      10: 'bg-yellow-10',
      15: 'bg-yellow-15',
      20: 'bg-yellow-20',
      30: 'bg-yellow-30',
      40: 'bg-yellow-40',
      50: 'bg-yellow-50',
      60: 'bg-yellow-60',
      70: 'bg-yellow-70',
      80: 'bg-yellow-80',
      90: 'bg-yellow-90',
      100: 'bg-yellow-100',
    },
    chartreuse: {
      0: 'bg-chartreuse-0',
      5: 'bg-chartreuse-5',
      10: 'bg-chartreuse-10',
      15: 'bg-chartreuse-15',
      20: 'bg-chartreuse-20',
      30: 'bg-chartreuse-30',
      40: 'bg-chartreuse-40',
      50: 'bg-chartreuse-50',
      60: 'bg-chartreuse-60',
      70: 'bg-chartreuse-70',
      80: 'bg-chartreuse-80',
      90: 'bg-chartreuse-90',
      100: 'bg-chartreuse-100',
    },
  };

  // Semantic color class mappings - written literally so Tailwind can detect them
  const semanticColorClassMap: Record<string, { text: string; bg: string }> = {
    fg: { text: 'text-semantic-fg', bg: 'bg-gray-200 dark:bg-gray-700' },
    fgMuted: {
      text: 'text-semantic-fg-muted',
      bg: 'bg-gray-200 dark:bg-gray-700',
    },
    fgInverse: {
      text: 'text-semantic-fg-inverse',
      bg: 'bg-gray-200 dark:bg-gray-700',
    },
    fgPrimary: {
      text: 'text-semantic-fg-primary',
      bg: 'bg-gray-200 dark:bg-gray-700',
    },
    fgWarning: {
      text: 'text-semantic-fg-warning',
      bg: 'bg-gray-200 dark:bg-gray-700',
    },
    fgPositive: {
      text: 'text-semantic-fg-positive',
      bg: 'bg-gray-200 dark:bg-gray-700',
    },
    fgNegative: {
      text: 'text-semantic-fg-negative',
      bg: 'bg-gray-200 dark:bg-gray-700',
    },
    bg: { text: 'text-white', bg: 'bg-semantic-bg' },
    bgAlternate: { text: 'text-white', bg: 'bg-semantic-bg-alternate' },
    bgInverse: { text: 'text-white', bg: 'bg-semantic-bg-inverse' },
    bgPrimary: { text: 'text-white', bg: 'bg-semantic-bg-primary' },
    bgPrimaryWash: { text: 'text-white', bg: 'bg-semantic-bg-primary-wash' },
    bgSecondary: { text: 'text-white', bg: 'bg-semantic-bg-secondary' },
    bgTertiary: { text: 'text-white', bg: 'bg-semantic-bg-tertiary' },
    bgSecondaryWash: {
      text: 'text-white',
      bg: 'bg-semantic-bg-secondary-wash',
    },
    bgNegative: { text: 'text-white', bg: 'bg-semantic-bg-negative' },
    accentSubtleGreen: {
      text: 'text-dark',
      bg: 'bg-semantic-accent-subtle-green',
    },
    accentBoldGreen: {
      text: 'text-white',
      bg: 'bg-semantic-accent-bold-green',
    },
    accentSubtleBlue: {
      text: 'text-dark',
      bg: 'bg-semantic-accent-subtle-blue',
    },
    accentBoldBlue: { text: 'text-white', bg: 'bg-semantic-accent-bold-blue' },
    accentSubtlePurple: {
      text: 'text-dark',
      bg: 'bg-semantic-accent-subtle-purple',
    },
    accentBoldPurple: {
      text: 'text-white',
      bg: 'bg-semantic-accent-bold-purple',
    },
    accentSubtleYellow: {
      text: 'text-dark',
      bg: 'bg-semantic-accent-subtle-yellow',
    },
    accentBoldYellow: {
      text: 'text-dark',
      bg: 'bg-semantic-accent-bold-yellow',
    },
    accentSubtleRed: { text: 'text-dark', bg: 'bg-semantic-accent-subtle-red' },
    accentBoldRed: { text: 'text-white', bg: 'bg-semantic-accent-bold-red' },
    accentSubtleGray: {
      text: 'text-dark',
      bg: 'bg-semantic-accent-subtle-gray',
    },
    accentBoldGray: { text: 'text-white', bg: 'bg-semantic-accent-bold-gray' },
  };

  const semanticColors = {
    foreground: [
      { name: 'fg', class: 'semantic-fg' },
      { name: 'fgMuted', class: 'semantic-fg-muted' },
      { name: 'fgInverse', class: 'semantic-fg-inverse' },
      { name: 'fgPrimary', class: 'semantic-fg-primary' },
      { name: 'fgWarning', class: 'semantic-fg-warning' },
      { name: 'fgPositive', class: 'semantic-fg-positive' },
      { name: 'fgNegative', class: 'semantic-fg-negative' },
    ],
    background: [
      { name: 'bg', class: 'semantic-bg' },
      { name: 'bgAlternate', class: 'semantic-bg-alternate' },
      { name: 'bgInverse', class: 'semantic-bg-inverse' },
      { name: 'bgPrimary', class: 'semantic-bg-primary' },
      { name: 'bgPrimaryWash', class: 'semantic-bg-primary-wash' },
      { name: 'bgSecondary', class: 'semantic-bg-secondary' },
      { name: 'bgTertiary', class: 'semantic-bg-tertiary' },
      { name: 'bgSecondaryWash', class: 'semantic-bg-secondary-wash' },
      { name: 'bgNegative', class: 'semantic-bg-negative' },
    ],
    line: [
      { name: 'linePrimary', class: 'semantic-line-primary' },
      { name: 'linePrimarySubtle', class: 'semantic-line-primary-subtle' },
      { name: 'lineInverse', class: 'semantic-line-inverse' },
    ],
    elevation: [
      { name: 'elevation1', class: 'semantic-elevation-1' },
      { name: 'elevation2', class: 'semantic-elevation-2' },
    ],
    accent: [
      { name: 'accentSubtleGreen', class: 'semantic-accent-subtle-green' },
      { name: 'accentBoldGreen', class: 'semantic-accent-bold-green' },
      { name: 'accentSubtleBlue', class: 'semantic-accent-subtle-blue' },
      { name: 'accentBoldBlue', class: 'semantic-accent-bold-blue' },
      { name: 'accentSubtlePurple', class: 'semantic-accent-subtle-purple' },
      { name: 'accentBoldPurple', class: 'semantic-accent-bold-purple' },
      { name: 'accentSubtleYellow', class: 'semantic-accent-subtle-yellow' },
      { name: 'accentBoldYellow', class: 'semantic-accent-bold-yellow' },
      { name: 'accentSubtleRed', class: 'semantic-accent-subtle-red' },
      { name: 'accentBoldRed', class: 'semantic-accent-bold-red' },
      { name: 'accentSubtleGray', class: 'semantic-accent-subtle-gray' },
      { name: 'accentBoldGray', class: 'semantic-accent-bold-gray' },
    ],
  };

  // Typography tags supported by the Typography component
  const typographyTags = [
    // Tucu UI Typography Tokens
    { tag: 'headline', label: 'Headline', category: 'Tucu UI Tokens' },
    { tag: 'body', label: 'Body', category: 'Tucu UI Tokens' },
    { tag: 'label-1', label: 'Label 1', category: 'Tucu UI Tokens' },
    { tag: 'label-2', label: 'Label 2', category: 'Tucu UI Tokens' },
    { tag: 'caption', label: 'Caption', category: 'Tucu UI Tokens' },
    { tag: 'legal', label: 'Legal', category: 'Tucu UI Tokens' },
    // HTML Tags
    { tag: 'h1', label: 'Heading 1 (h1)', category: 'HTML Tags' },
    { tag: 'h2', label: 'Heading 2 (h2)', category: 'HTML Tags' },
    { tag: 'h3', label: 'Heading 3 (h3)', category: 'HTML Tags' },
    { tag: 'h4', label: 'Heading 4 (h4)', category: 'HTML Tags' },
    { tag: 'h5', label: 'Heading 5 (h5)', category: 'HTML Tags' },
    { tag: 'h6', label: 'Heading 6 (h6)', category: 'HTML Tags' },
    { tag: 'p', label: 'Paragraph (p)', category: 'HTML Tags' },
    { tag: 'i', label: 'Italic (i)', category: 'HTML Tags' },
    { tag: 'b', label: 'Bold (b)', category: 'HTML Tags' },
    { tag: 'strong', label: 'Strong', category: 'HTML Tags' },
    { tag: 'em', label: 'Emphasis (em)', category: 'HTML Tags' },
    { tag: 'small', label: 'Small', category: 'HTML Tags' },
    { tag: 'q', label: 'Quote (q)', category: 'HTML Tags' },
    { tag: 'blockquote', label: 'Blockquote', category: 'HTML Tags' },
    { tag: 'code', label: 'Code', category: 'HTML Tags' },
    { tag: 'pre', label: 'Preformatted (pre)', category: 'HTML Tags' },
    { tag: 'kbd', label: 'Keyboard (kbd)', category: 'HTML Tags' },
    { tag: 'mark', label: 'Mark', category: 'HTML Tags' },
    { tag: 'del', label: 'Deleted (del)', category: 'HTML Tags' },
    { tag: 'sub', label: 'Subscript (sub)', category: 'HTML Tags' },
    { tag: 'sup', label: 'Superscript (sup)', category: 'HTML Tags' },
    { tag: 'abbr', label: 'Abbreviation (abbr)', category: 'HTML Tags' },
    { tag: 'span', label: 'Span', category: 'HTML Tags' },
  ];

  // Typography colors supported by the Typography component
  const typographyColors = [
    { value: 'default', label: 'Default' },
    { value: 'primary', label: 'Primary' },
    { value: 'secondary', label: 'Secondary' },
    { value: 'dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
    { value: 'muted', label: 'Muted' },
    { value: 'success', label: 'Success' },
    { value: 'warning', label: 'Warning' },
    { value: 'error', label: 'Error' },
  ] as const;

  // Typography font families supported by the Typography component
  const typographyFontFamilies = [
    { value: 'default', label: 'Default (Sans)' },
    { value: 'mono', label: 'Mono' },
  ] as const;

  // Spacing values matching Tailwind default scale from globals.css
  // Tailwind default spacing scale: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
  const spacing = [
    { value: 0, key: '0' },
    { value: 1, key: '1' },
    { value: 2, key: '2' },
    { value: 3, key: '3' },
    { value: 4, key: '4' },
    { value: 5, key: '5' },
    { value: 6, key: '6' },
    { value: 7, key: '7' },
    { value: 8, key: '8' },
    { value: 9, key: '9' },
    { value: 10, key: '10' },
    { value: 11, key: '11' },
    { value: 12, key: '12' },
    { value: 13, key: '13' },
    { value: 14, key: '14' },
    { value: 15, key: '15' },
    { value: 16, key: '16' },
    { value: 17, key: '17' },
    { value: 18, key: '18' },
    { value: 19, key: '19' },
    { value: 20, key: '20' },
  ];
  const borderRadius = {
    0: 'rounded-0',
    100: 'rounded-100',
    200: 'rounded-200',
    300: 'rounded-300',
    400: 'rounded-400',
    500: 'rounded-500',
    600: 'rounded-600',
    700: 'rounded-700',
    800: 'rounded-800',
    900: 'rounded-900',
    1000: 'rounded-1000',
  };

  return (
    <div className="max-w-6xl mx-auto p-[16px] pb-[64px] scroll-smooth">
      {/* Hidden element to ensure Tailwind generates semantic color classes */}
      <div className="hidden text-semantic-fg text-semantic-fg-muted text-semantic-fg-inverse text-semantic-fg-primary text-semantic-fg-warning text-semantic-fg-positive text-semantic-fg-negative bg-semantic-bg bg-semantic-bg-alternate bg-semantic-bg-inverse bg-semantic-bg-primary bg-semantic-bg-primary-wash bg-semantic-bg-secondary bg-semantic-bg-tertiary bg-semantic-bg-secondary-wash bg-semantic-bg-negative border-semantic-line-primary border-semantic-line-primary-subtle border-semantic-line-inverse bg-semantic-elevation-1 bg-semantic-elevation-2 bg-semantic-accent-subtle-green bg-semantic-accent-bold-green bg-semantic-accent-subtle-blue bg-semantic-accent-bold-blue bg-semantic-accent-subtle-purple bg-semantic-accent-bold-purple bg-semantic-accent-subtle-yellow bg-semantic-accent-bold-yellow bg-semantic-accent-subtle-red bg-semantic-accent-bold-red bg-semantic-accent-subtle-gray bg-semantic-accent-bold-gray bg-brand bg-primary bg-secondary bg-accent bg-muted bg-success bg-warning bg-error bg-info bg-body bg-dark bg-light bg-light-dark w-icon-xs h-icon-xs w-icon-s h-icon-s w-icon-m h-icon-m w-icon-l h-icon-l w-avatar-s h-avatar-s w-avatar-m h-avatar-m w-avatar-l h-avatar-l w-avatar-xl h-avatar-xl w-avatar-xxl h-avatar-xxl w-avatar-xxxl h-avatar-xxxl" />
      {/* Hidden element to ensure Tailwind generates spacing utility classes */}
      <div className="hidden p-0 p-1 p-2 p-3 p-4 p-5 p-6 p-7 p-8 p-9 p-10 p-11 p-12 p-13 p-14 p-15 p-16 p-17 p-18 p-19 p-20 m-0 m-1 m-2 m-3 m-4 m-5 m-6 m-7 m-8 m-9 m-10 m-11 m-12 m-13 m-14 m-15 m-16 m-17 m-18 m-19 m-20 gap-0 gap-1 gap-2 gap-3 gap-4 gap-5 gap-6 gap-7 gap-8 gap-9 gap-10 gap-11 gap-12 gap-13 gap-14 gap-15 gap-16 gap-17 gap-18 gap-19 gap-20" />
      <CardContainer className="p-[24px] mb-[24px]">
        <Typography tag="h2" className="mb-[16px]">
          Tucu UI Design System
        </Typography>
        <Typography tag="p" className="mb-[24px] text-muted">
          Visual reference for all design tokens integrated from Tucu UI Design
          Tokens
        </Typography>

        {/* Table of Contents */}
        <div className="mb-[32px] p-[16px] bg-light-dark rounded-lg">
          <Typography tag="h3" className="mb-[12px]">
            Table of Contents
          </Typography>
          <ul className="list-disc list-inside space-y-[8px] text-body">
            <li>
              <a href="#color-spectrum" className="text-brand hover:underline">
                Color Spectrum
              </a>
            </li>
            <li>
              <a href="#semantic-colors" className="text-brand hover:underline">
                Semantic Colors
              </a>
            </li>
            <li>
              <a href="#main-colors" className="text-brand hover:underline">
                Main Colors
              </a>
            </li>
            <li>
              <a href="#typography" className="text-brand hover:underline">
                Typography
              </a>
            </li>
            <li>
              <a href="#spacing" className="text-brand hover:underline">
                Spacing
              </a>
            </li>
            <li>
              <a href="#border-radius" className="text-brand hover:underline">
                Border Radius
              </a>
            </li>
            <li>
              <a href="#shadows" className="text-brand hover:underline">
                Shadows
              </a>
            </li>
            <li>
              <a href="#sizing" className="text-brand hover:underline">
                Sizing
              </a>
            </li>
          </ul>
        </div>

        {/* Color Spectrum */}
        <section id="color-spectrum" className="mb-[48px] scroll-mt-[120px]">
          <Typography tag="h2" className="mb-[16px]">
            1. Color Spectrum
          </Typography>
          <Typography tag="p" className="mb-[24px]">
            Complete color palette with all shades from 0 to 100 for each color
            spectrum.
          </Typography>
          <div className="space-y-[32px]">
            {colorSpectrum.map((color) => (
              <div key={color.name}>
                <Typography tag="h3" className="mb-[16px] capitalize">
                  {color.name}
                </Typography>
                <div className="grid grid-cols-4 sm:grid-cols-7 md:grid-cols-10 lg:grid-cols-[repeat(13,minmax(0,1fr))] gap-[8px]">
                  {color.shades.map((shade) => {
                    const bgClass = colorClassMap[color.name]?.[shade] || '';
                    const varName = `--color-${color.name}-${shade}`;
                    const hexValue = getColorHex(varName);
                    return (
                      <div
                        key={`${color.name}-${shade}-${updateKey}`}
                        className="space-y-[4px] w-full min-w-[40px]"
                      >
                        <div
                          className={`h-[64px] w-full rounded border border-gray-200 dark:border-gray-700 ${bgClass}`}
                          title={`${color.name}-${shade}: ${
                            hexValue || varName
                          }`}
                        />
                        <Typography tag="h4" className="text-center">
                          {shade}
                        </Typography>
                        {hexValue && (
                          <Typography
                            tag="h4"
                            className="text-center text-muted text-[10px]"
                          >
                            {hexValue}
                          </Typography>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Semantic Colors */}
        <section id="semantic-colors" className="mb-[48px] scroll-mt-[120px]">
          <Typography tag="h2" className="mb-[16px]">
            2. Semantic Colors
          </Typography>
          <Typography tag="p" className="mb-[24px]">
            Semantic colors map design tokens to functional purposes in the
            interface.
          </Typography>
          <div className="space-y-[24px]">
            {Object.entries(semanticColors).map(([category, colors]) => (
              <div key={category}>
                <Typography tag="h3" className="mb-[16px] capitalize">
                  {category}
                </Typography>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[16px]">
                  {colors.map((color) => {
                    const colorName = color.name;
                    const colorClass = color.class;
                    const varName = `--color-${colorClass}`;
                    const hexValue = getColorHex(varName);
                    const isForeground = category === 'foreground';
                    const isLine = category === 'line';
                    const isElevation = category === 'elevation';
                    const isBackground = category === 'background';
                    const isAccent = category === 'accent';

                    // Determine text color based on category
                    let textColor = 'text-dark dark:text-light';
                    if (isForeground) {
                      // Use semantic color classes directly
                      const classMap = semanticColorClassMap[colorName];
                      textColor = classMap?.text || `text-[var(${varName})]`;
                    } else if (isLine) {
                      textColor = 'text-dark dark:text-light';
                    } else if (isBackground) {
                      textColor = 'text-dark/0';
                    } else if (isAccent) {
                      // Use semantic color classes directly for accent
                      const classMap = semanticColorClassMap[colorName];
                      textColor = classMap?.text || 'text-dark dark:text-light';
                    }

                    // Determine background color
                    let bgColor = '';
                    if (isForeground) {
                      const classMap = semanticColorClassMap[colorName];
                      bgColor = classMap?.bg || `bg-gray-200 dark:bg-gray-700`;
                    } else if (isLine) {
                      bgColor = 'bg-gray-200 dark:bg-gray-700';
                    } else {
                      // Use semantic color classes directly
                      const classMap = semanticColorClassMap[colorName];
                      bgColor = classMap?.bg || `bg-[var(${varName})]`;
                    }

                    // For elevation, show with shadow
                    const elevationShadow =
                      isElevation && colorName === 'elevation1'
                        ? 'shadow-[var(--shadow-tucu-ui-elevation-1)]'
                        : isElevation && colorName === 'elevation2'
                        ? 'shadow-[var(--shadow-tucu-ui-elevation-2)]'
                        : '';

                    // For line, show as border
                    const lineBorder = isLine
                      ? `border-[2px] border-${colorClass}`
                      : '';

                    return (
                      <div
                        key={`${category}-${colorName}-${updateKey}`}
                        className="space-y-[8px] border border-gray-200 dark:border-gray-700 rounded-lg p-[8px]"
                      >
                        <div
                          className={`h-[80px] rounded flex items-center justify-center ${bgColor} ${textColor} ${lineBorder} ${elevationShadow} ${
                            !isLine && !isElevation
                              ? 'border border-gray-200 dark:border-gray-700'
                              : ''
                          }`}
                          style={
                            isLine
                              ? {
                                  borderColor: `var(${varName})`,
                                }
                              : undefined
                          }
                          title={`${colorName}: var(${varName})${
                            hexValue ? ` = ${hexValue}` : ''
                          }`}
                        >
                          <Typography
                            tag="h4"
                            className="text-center px-[8px] break-all"
                          >
                            {colorName}
                          </Typography>
                        </div>
                        <Typography tag="h4" className="text-center text-muted">
                          {colorName}
                        </Typography>
                        {hexValue && (
                          <Typography
                            tag="h4"
                            className="text-center text-muted text-[10px]"
                          >
                            {hexValue}
                          </Typography>
                        )}
                        {(() => {
                          const classMap = semanticColorClassMap[colorName];
                          const classes = [];
                          if (isForeground && classMap?.text) {
                            classes.push(classMap.text);
                          }
                          if ((isBackground || isAccent) && classMap?.bg) {
                            classes.push(classMap.bg);
                          }
                          if (isLine) {
                            // For line colors, show border classes
                            if (colorName === 'linePrimary') {
                              classes.push('border-semantic-line-primary');
                            } else if (colorName === 'linePrimarySubtle') {
                              classes.push(
                                'border-semantic-line-primary-subtle'
                              );
                            } else if (colorName === 'lineInverse') {
                              classes.push('border-semantic-line-inverse');
                            }
                          }
                          if (isElevation && colorName === 'elevation1') {
                            classes.push('bg-semantic-elevation-1');
                          }
                          if (isElevation && colorName === 'elevation2') {
                            classes.push('bg-semantic-elevation-2');
                          }
                          return classes.length > 0 ? (
                            <Typography
                              tag="h4"
                              className="text-center text-muted text-sm mt-[4px] break-all px-[4px]"
                            >
                              {classes.join(', ')}
                            </Typography>
                          ) : null;
                        })()}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Main Colors */}
        <section id="main-colors" className="mb-[48px] scroll-mt-[120px]">
          <Typography tag="h2" className="mb-[16px]">
            3. Main Colors
          </Typography>
          <Typography tag="p" className="mb-[24px]">
            Primary theme colors used throughout the application. These colors
            are mapped from semantic colors and adapt to light/dark mode.
          </Typography>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[16px]">
            {[
              { name: 'brand', varName: '--color-brand', class: 'bg-brand' },
              {
                name: 'primary',
                varName: '--color-primary',
                class: 'bg-primary',
              },
              {
                name: 'secondary',
                varName: '--color-secondary',
                class: 'bg-secondary',
              },
              { name: 'accent', varName: '--color-accent', class: 'bg-accent' },
              { name: 'muted', varName: '--color-muted', class: 'bg-muted' },
              {
                name: 'success',
                varName: '--color-success',
                class: 'bg-success',
              },
              {
                name: 'warning',
                varName: '--color-warning',
                class: 'bg-warning',
              },
              { name: 'error', varName: '--color-error', class: 'bg-error' },
              { name: 'info', varName: '--color-info', class: 'bg-info' },
              { name: 'body', varName: '--color-body', class: 'bg-body' },
              { name: 'dark', varName: '--color-dark', class: 'bg-dark' },
              { name: 'light', varName: '--color-light', class: 'bg-light' },
              {
                name: 'light-dark',
                varName: '--color-light-dark',
                class: 'bg-light-dark',
              },
            ].map((color) => {
              const hexValue = getColorHex(color.varName);
              // Determine text color based on color name
              const textColor =
                color.name === 'body' ||
                color.name === 'light' ||
                color.name === 'light-dark'
                  ? 'text-dark dark:text-light'
                  : 'text-white';

              return (
                <div
                  key={`main-${color.name}-${updateKey}`}
                  className="space-y-[8px] border border-gray-200 dark:border-gray-700 rounded-lg p-[8px]"
                >
                  <div
                    className={`h-[80px] rounded flex items-center justify-center ${color.class} ${textColor} border border-gray-200 dark:border-gray-700`}
                    title={`${color.name}: var(${color.varName})${
                      hexValue ? ` = ${hexValue}` : ''
                    }`}
                  >
                    <Typography
                      tag="h4"
                      className="text-center px-[8px] break-all"
                    >
                      {color.name}
                    </Typography>
                  </div>
                  <Typography tag="h4" className="text-center text-muted">
                    {color.name}
                  </Typography>
                  {hexValue && (
                    <Typography
                      tag="h4"
                      className="text-center text-muted text-[10px]"
                    >
                      {hexValue}
                    </Typography>
                  )}
                  <Typography
                    tag="h4"
                    className="text-center text-muted text-[9px] mt-[4px] break-all px-[4px]"
                  >
                    {color.class}
                  </Typography>
                </div>
              );
            })}
          </div>
        </section>

        {/* Typography */}
        <section id="typography" className="mb-[48px] scroll-mt-[120px]">
          <Typography tag="h2" className="mb-[16px]">
            4. Typography
          </Typography>
          <Typography tag="p" className="mb-[24px]">
            Typography component with all available tags, colors, and font
            families.
          </Typography>

          {/* Tucu UI Tokens - Creative Hierarchical Display */}
          <div className="mb-[48px]">
            <Typography tag="h3" className="mb-4">
              Tucu UI Tokens - Type Scale
            </Typography>
            <Typography tag="p" className="mb-6 text-muted">
              Hierarchical typography tokens designed for consistent text
              styling across the design system.
            </Typography>

            {/* Hierarchical Type Scale */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-light-dark mb-6">
              <div className="space-y-6">
                {typographyTags
                  .filter((style) => style.category === 'Tucu UI Tokens')
                  .map((style, index) => (
                    <div
                      key={style.tag}
                      className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0"
                    >
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <Typography
                            tag={
                              style.tag as
                                | 'headline'
                                | 'body'
                                | 'label-1'
                                | 'label-2'
                                | 'caption'
                                | 'legal'
                            }
                            className="wrap-break-words"
                          >
                            {style.label}
                          </Typography>
                          <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-mono">
                            {style.tag}
                          </span>
                        </div>
                        <Typography tag="caption" className="text-muted">
                          {style.tag === 'headline' &&
                            'Main headlines and hero text'}
                          {style.tag === 'body' &&
                            'Primary body text and paragraphs'}
                          {style.tag === 'label-1' &&
                            'Primary labels and form fields'}
                          {style.tag === 'label-2' &&
                            'Secondary labels and smaller text'}
                          {style.tag === 'caption' &&
                            'Image captions and metadata'}
                          {style.tag === 'legal' &&
                            'Legal text, disclaimers, and fine print'}
                        </Typography>
                      </div>
                      <div className="md:w-1/2">
                        <Typography
                          tag={
                            style.tag as
                              | 'headline'
                              | 'body'
                              | 'label-1'
                              | 'label-2'
                              | 'caption'
                              | 'legal'
                          }
                          className="wrap-break-words"
                        >
                          {style.tag === 'headline' &&
                            'The quick brown fox jumps over the lazy dog'}
                          {style.tag === 'body' &&
                            'The quick brown fox jumps over the lazy dog. This is body text used for paragraphs and main content.'}
                          {style.tag === 'label-1' && 'Label Text'}
                          {style.tag === 'label-2' && 'Small Label'}
                          {style.tag === 'caption' &&
                            'Image caption or supporting text'}
                          {style.tag === 'legal' && 'Legal disclaimer text'}
                        </Typography>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Real-world Example */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-900">
              <Typography tag="h4" className="mb-4">
                Real-world Example
              </Typography>
              <div className="space-y-4">
                <Typography tag="headline">
                  Welcome to Tucu UI Design System
                </Typography>
                <Typography tag="body" className="text-muted">
                  This is an example of how Tucu UI typography tokens work
                  together to create a cohesive reading experience. The
                  hierarchical structure guides users through content naturally.
                </Typography>
                <div className="space-y-2 pt-2">
                  <Typography tag="label-1">Form Field Label</Typography>
                  <div className="border border-gray-300 dark:border-gray-600 rounded p-3">
                    <Typography tag="body">Input value here...</Typography>
                  </div>
                  <Typography tag="caption" className="text-muted">
                    Helper text or caption
                  </Typography>
                </div>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Typography tag="legal" className="text-muted">
                    © 2024 Tucu UI. All rights reserved. This is legal text
                    using the legal token.
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          {/* HTML Tags Section */}
          <div>
            <Typography tag="h3" className="mb-4">
              HTML Tags
            </Typography>
            <Typography tag="p" className="mb-6 text-muted">
              Standard HTML semantic tags with Tucu UI styling.
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {typographyTags
                .filter((style) => style.category === 'HTML Tags')
                .map((style) => (
                  <div
                    key={style.tag}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3"
                  >
                    <div className="space-y-1">
                      <Typography tag="h4" className="wrap-break-words">
                        {style.label}
                      </Typography>
                      <Typography
                        tag="h4"
                        className="text-muted break-all text-xs"
                      >
                        tag="{style.tag}"
                      </Typography>
                    </div>
                    <div className="min-h-[60px] flex items-start overflow-hidden">
                      <Typography
                        className={
                          style.tag === 'pre' || style.tag === 'code'
                            ? 'wrap-break-words overflow-wrap-anywhere whitespace-pre-wrap w-full'
                            : 'wrap-break-words overflow-wrap-anywhere'
                        }
                        tag={
                          style.tag as
                            | 'h1'
                            | 'h2'
                            | 'h3'
                            | 'h4'
                            | 'h5'
                            | 'h6'
                            | 'p'
                            | 'i'
                            | 'b'
                            | 'strong'
                            | 'em'
                            | 'small'
                            | 'q'
                            | 'blockquote'
                            | 'code'
                            | 'pre'
                            | 'kbd'
                            | 'mark'
                            | 'del'
                            | 'sub'
                            | 'sup'
                            | 'abbr'
                            | 'span'
                        }
                        {...(style.tag === 'abbr' && {
                          title: 'Abbreviation example',
                        })}
                      >
                        {style.tag === 'pre' || style.tag === 'code'
                          ? 'const example = "The quick brown fox jumps over the lazy dog";'
                          : 'The quick brown fox jumps over the lazy dog'}
                      </Typography>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Colors Section */}
          <div className="mt-[48px]">
            <Typography tag="h3" className="mb-[16px]">
              Colors
            </Typography>
            <Typography tag="p" className="mb-[16px] text-muted">
              Available color props for the Typography component.
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {typographyColors.map((color) => (
                <div
                  key={color.value}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3"
                >
                  <div className="space-y-1">
                    <Typography tag="h4" className="wrap-break-words">
                      {color.label}
                    </Typography>
                    <Typography
                      tag="h4"
                      className="text-muted break-all text-xs"
                    >
                      color="{color.value}"
                    </Typography>
                  </div>
                  <div className="min-h-[40px] flex items-center">
                    <Typography tag="p" color={color.value as any}>
                      The quick brown fox jumps over the lazy dog
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Font Families Section */}
          <div className="mt-[48px]">
            <Typography tag="h3" className="mb-[16px]">
              Font Families
            </Typography>
            <Typography tag="p" className="mb-[16px] text-muted">
              Available fontFamily props for the Typography component.
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {typographyFontFamilies.map((font) => (
                <div
                  key={font.value}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3"
                >
                  <div className="space-y-1">
                    <Typography tag="h4" className="wrap-break-words">
                      {font.label}
                    </Typography>
                    <Typography
                      tag="h4"
                      className="text-muted break-all text-xs"
                    >
                      fontFamily="{font.value}"
                    </Typography>
                  </div>
                  <div className="min-h-[40px] flex items-center">
                    <Typography tag="p" fontFamily={font.value as any}>
                      The quick brown fox jumps over the lazy dog
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Combined Examples */}
          <div className="mt-[48px]">
            <Typography tag="h3" className="mb-[16px]">
              Combined Examples
            </Typography>
            <Typography tag="p" className="mb-[16px] text-muted">
              Examples combining tags, colors, and font families.
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
                <Typography tag="h4" className="text-xs text-muted">
                  Headline + Primary + Mono
                </Typography>
                <Typography tag="headline" color="primary" fontFamily="mono">
                  The quick brown fox
                </Typography>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
                <Typography tag="h4" className="text-xs text-muted">
                  Body + Success
                </Typography>
                <Typography tag="body" color="success">
                  The quick brown fox jumps over the lazy dog
                </Typography>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
                <Typography tag="h4" className="text-xs text-muted">
                  Label 1 + Warning
                </Typography>
                <Typography tag="label-1" color="warning">
                  The quick brown fox
                </Typography>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
                <Typography tag="h4" className="text-xs text-muted">
                  Code + Error + Mono
                </Typography>
                <Typography tag="code" color="error" fontFamily="mono">
                  const example = "Hello World";
                </Typography>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
                <Typography tag="h4" className="text-xs text-muted">
                  Caption + Muted
                </Typography>
                <Typography tag="caption" color="muted">
                  The quick brown fox jumps over the lazy dog
                </Typography>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
                <Typography tag="h4" className="text-xs text-muted">
                  H2 + Secondary
                </Typography>
                <Typography tag="h2" color="secondary">
                  The quick brown fox
                </Typography>
              </div>
            </div>
          </div>
        </section>

        {/* Spacing */}
        <section id="spacing" className="mb-[48px] scroll-mt-[120px]">
          <Typography tag="h2" className="mb-[16px]">
            5. Spacing
          </Typography>
          <Typography tag="p" className="mb-[24px]">
            Spacing scale mapped to Tucu UI Design Tokens.
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {spacing.map((space) => {
              // Use Tailwind default spacing variables from globals.css
              const varName = `--spacing-${space.key}`;
              const spacingValue = getColorHex(varName);
              // Use Tailwind classes directly
              const tailwindClasses = `p-${space.value}, m-${space.value}, gap-${space.value}`;
              // Format value for display
              const displayValue = space.value.toString();
              return (
                <div
                  key={space.key}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <Typography tag="h4" className="font-semibold">
                      {displayValue}
                    </Typography>
                    {spacingValue && (
                      <Typography tag="h4" className="text-muted text-[10px]">
                        {spacingValue}
                      </Typography>
                    )}
                  </div>
                  <div
                    className="bg-primary h-8 rounded w-full"
                    style={{
                      width: spacingValue || `var(${varName})`,
                      minWidth: '4px',
                    }}
                  />
                  <Typography
                    tag="h4"
                    className="text-muted text-[9px] break-all px-1"
                  >
                    {tailwindClasses}
                  </Typography>
                </div>
              );
            })}
          </div>
        </section>

        {/* Border Radius */}
        <section id="border-radius" className="mb-[48px] scroll-mt-[120px]">
          <Typography tag="h2" className="mb-[16px]">
            6. Border Radius
          </Typography>
          <Typography tag="p" className="mb-[24px]">
            Border radius values from Tucu UI Design Tokens.
          </Typography>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[16px]">
            {Object.entries(borderRadius).map(([radius, className]) => {
              const varName = `--radius-tucu-ui-${radius}`;
              const radiusValue = getColorHex(varName);
              return (
                <div
                  key={radius}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-[16px] space-y-[12px]"
                >
                  <div className="flex items-center justify-between">
                    <Typography tag="h4" className="font-semibold">
                      {radius}
                    </Typography>
                    {radiusValue && (
                      <Typography tag="h4" className="text-muted text-[10px]">
                        {radiusValue}
                      </Typography>
                    )}
                  </div>
                  <div className="flex justify-center">
                    <div
                      className={`w-[80px] h-[80px] bg-primary ${className}`}
                    />
                  </div>
                  <Typography
                    tag="h4"
                    className="text-muted text-[9px] break-all px-[4px] text-center"
                  >
                    {className}
                  </Typography>
                </div>
              );
            })}
          </div>
        </section>

        {/* Shadows */}
        <section id="shadows" className="mb-[48px] scroll-mt-[120px]">
          <Typography tag="h2" className="mb-[16px]">
            7. Shadows
          </Typography>
          <Typography tag="p" className="mb-[24px]">
            Elevation shadows from Tucu UI Design Tokens.
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
            <div className="space-y-[8px]">
              <Typography tag="h4">Elevation 1</Typography>
              <div
                className="h-[128px] bg-white dark:bg-gray-800 rounded-lg p-[16px]"
                style={{
                  boxShadow: 'var(--shadow-tucu-ui-elevation-1)',
                }}
              >
                <Typography tag="h4">Card with elevation 1</Typography>
              </div>
            </div>
            <div className="space-y-[8px]">
              <Typography tag="h4">Elevation 2</Typography>
              <div
                className="h-[128px] bg-white dark:bg-gray-800 rounded-lg p-[16px]"
                style={{
                  boxShadow: 'var(--shadow-tucu-ui-elevation-2)',
                }}
              >
                <Typography tag="h4">Card with elevation 2</Typography>
              </div>
            </div>
          </div>
        </section>

        {/* Sizing */}
        <section id="sizing" className="mb-[48px] scroll-mt-[120px]">
          <Typography tag="h2" className="mb-[16px]">
            8. Sizing
          </Typography>
          <Typography tag="p" className="mb-[24px]">
            Icon and avatar size tokens from Tucu UI Design Tokens.
          </Typography>
          <div className="space-y-[32px]">
            <div>
              <Typography tag="h3" className="mb-[16px]">
                Icons
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]">
                {['xs', 's', 'm', 'l'].map((size) => {
                  const widthClass = `w-icon-${size}`;
                  const heightClass = `h-icon-${size}`;
                  const sizeVar = `--size-icon-${size}`;
                  const sizeValue = getColorHex(sizeVar);
                  return (
                    <div
                      key={size}
                      className="text-center space-y-[8px] border border-gray-200 dark:border-gray-700 rounded-lg p-[12px]"
                    >
                      <div
                        className={`bg-primary rounded mx-auto ${widthClass} ${heightClass}`}
                        style={{
                          width: sizeValue || `var(${sizeVar})`,
                          height: sizeValue || `var(${sizeVar})`,
                        }}
                      />
                      <Typography tag="h4" className="font-semibold">
                        {size}
                      </Typography>
                      {sizeValue && (
                        <Typography tag="h4" className="text-muted text-[10px]">
                          {sizeValue}
                        </Typography>
                      )}
                      <Typography
                        tag="h4"
                        className="text-muted text-[9px] mt-[4px] break-all px-[4px]"
                      >
                        {widthClass}, {heightClass}
                      </Typography>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <Typography tag="h3" className="mb-[16px]">
                Avatars
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]">
                {['s', 'm', 'l', 'xl', 'xxl', 'xxxl'].map((size) => {
                  const widthClass = `w-avatar-${size}`;
                  const heightClass = `h-avatar-${size}`;
                  const sizeVar = `--size-avatar-${size}`;
                  const sizeValue = getColorHex(sizeVar);
                  return (
                    <div
                      key={size}
                      className="text-center space-y-[8px] border border-gray-200 dark:border-gray-700 rounded-lg p-[12px]"
                    >
                      <div
                        className={`bg-primary rounded-full mx-auto ${widthClass} ${heightClass}`}
                        style={{
                          width: sizeValue || `var(${sizeVar})`,
                          height: sizeValue || `var(${sizeVar})`,
                        }}
                      />
                      <Typography tag="h4" className="font-semibold">
                        {size}
                      </Typography>
                      {sizeValue && (
                        <Typography tag="h4" className="text-muted text-[10px]">
                          {sizeValue}
                        </Typography>
                      )}
                      <Typography
                        tag="h4"
                        className="text-muted text-[9px] mt-[4px] break-all px-[4px]"
                      >
                        {widthClass}, {heightClass}
                      </Typography>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-[16px] mt-[48px] pt-[32px] border-t border-gray-200 dark:border-gray-700">
          <Typography tag="h4" className="mb-[16px] sm:mb-0 sm:mr-auto">
            Explore More
          </Typography>
          <div className="flex flex-col sm:flex-row gap-[12px]">
            <Button
              variant="solid"
              color="primary"
              fullWidth
              className="min-w-[180px]"
            >
              Components
            </Button>
            <Button
              variant="solid"
              color="primary"
              fullWidth
              className="min-w-[180px]"
            >
              Documentation
            </Button>
          </div>
        </div>
      </CardContainer>
    </div>
  );
};

export default DesignSystemIntroduction;

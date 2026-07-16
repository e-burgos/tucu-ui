import React, { useEffect, useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  Alert,
  LucideIcons,
  useTheme,
  HeroCard,
} from '@e-burgos/tucu-ui';

// Helper function to get hex color from CSS variable
const getColorHex = (varName: string): string => {
  if (typeof window === 'undefined') return '';
  const root = document.documentElement;
  const value = getComputedStyle(root).getPropertyValue(varName).trim();
  return value || '';
};

const ColorSystemSection: React.FC = () => {
  const { mode } = useTheme();
  const [updateKey, setUpdateKey] = useState(0);

  // Force update when theme mode changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setUpdateKey((prev) => prev + 1);
    }, 100);
    return () => clearTimeout(timer);
  }, [mode]);

  // Observe changes to the document class (light/dark) AND style (color presets)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setUpdateKey((prev) => prev + 1);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style'],
    });
    return () => observer.disconnect();
  }, []);

  // Groups aligned with Settings Drawer organization
  const brandColors = [
    { name: 'Primary', class: 'bg-primary', varName: '--color-primary' },
    { name: 'Accent', class: 'bg-accent', varName: '--color-accent' },
  ];

  const surfaceColors = [
    { name: 'Secondary', class: 'bg-secondary', varName: '--color-secondary' },
    { name: 'Background', class: 'bg-body', varName: '--color-body' },
    { name: 'Dark', class: 'bg-dark', varName: '--color-dark' },
  ];

  const textColors = [
    { name: 'Muted', class: 'bg-muted', varName: '--color-muted' },
    { name: 'Primary', class: 'bg-foreground', varName: '--color-foreground' },
    { name: 'Border', class: 'bg-border', varName: '--color-border' },
  ];

  const statusColors = [
    { name: 'Success', class: 'bg-success', varName: '--color-success' },
    { name: 'Warning', class: 'bg-warning', varName: '--color-warning' },
    { name: 'Error', class: 'bg-error', varName: '--color-error' },
    { name: 'Info', class: 'bg-info', varName: '--color-info' },
  ];

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

  const mainColors = [
    { name: 'brand', varName: '--color-brand', class: 'bg-brand' },
    { name: 'primary', varName: '--color-primary', class: 'bg-primary' },
    { name: 'secondary', varName: '--color-secondary', class: 'bg-secondary' },
    { name: 'accent', varName: '--color-accent', class: 'bg-accent' },
    {
      name: 'foreground',
      varName: '--color-foreground',
      class: 'bg-foreground',
    },
    { name: 'muted', varName: '--color-muted', class: 'bg-muted' },
    { name: 'border', varName: '--color-border', class: 'bg-border' },
    { name: 'success', varName: '--color-success', class: 'bg-success' },
    { name: 'warning', varName: '--color-warning', class: 'bg-warning' },
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
  ];

  return (
    <div className="space-y-8 max-w-6xl sm:space-y-12 w-full mx-auto px-4 sm:px-6 lg:px-8 relative pt-8 lg:pt-12">
      <HeroCard
        title="Color System"
        description="Carefully crafted color palettes that work across all themes and contexts."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-pink-500 via-rose-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Palette className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <div className="space-y-8">
        {/* Brand Colors */}
        <CardContainer className="overflow-hidden">
          <CardTitle title="Brand Colors" className="mt-2 mb-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {brandColors.map((color) => {
                const hexValue = getColorHex(color.varName);
                return (
                  <div
                    key={`${color.name}-${updateKey}`}
                    className="text-center space-y-2"
                  >
                    <div
                      className={`w-16 h-16 rounded-lg ${color.class} mx-auto border border-border`}
                    />
                    <div className="text-sm">
                      <div className="font-semibold">{color.name}</div>
                      <div className="text-muted text-xs">
                        {hexValue || color.varName}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardTitle>
        </CardContainer>

        {/* Surfaces */}
        <CardContainer className="overflow-hidden">
          <CardTitle title="Surfaces" className="mt-2 mb-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {surfaceColors.map((color) => {
                const hexValue = getColorHex(color.varName);
                return (
                  <div
                    key={`surface-${color.name}-${updateKey}`}
                    className="text-center space-y-2"
                  >
                    <div
                      className={`w-16 h-16 rounded-lg ${color.class} mx-auto border border-border`}
                    />
                    <div className="text-sm">
                      <div className="font-semibold">{color.name}</div>
                      <div className="text-muted text-xs">
                        {hexValue || color.varName}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardTitle>
        </CardContainer>

        {/* Text */}
        <CardContainer className="overflow-hidden">
          <CardTitle title="Text" className="mt-2 mb-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
              {textColors.map((color) => {
                const hexValue = getColorHex(color.varName);
                return (
                  <div
                    key={`text-${color.name}-${updateKey}`}
                    className="text-center space-y-2"
                  >
                    <div
                      className={`w-16 h-16 rounded-lg ${color.class} mx-auto border border-border`}
                    />
                    <div className="text-sm">
                      <div className="font-semibold">{color.name}</div>
                      <div className="text-muted text-xs">
                        {hexValue || color.varName}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardTitle>
        </CardContainer>

        {/* Status */}
        <CardContainer className="overflow-hidden">
          <CardTitle title="Status" className="mt-2 mb-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {statusColors.map((color) => {
                const hexValue = getColorHex(color.varName);
                return (
                  <div
                    key={`status-${color.name}-${updateKey}`}
                    className="text-center space-y-2"
                  >
                    <div
                      className={`w-16 h-16 rounded-lg ${color.class} mx-auto border border-border`}
                    />
                    <div className="text-sm">
                      <div className="font-semibold">{color.name}</div>
                      <div className="text-muted text-xs">
                        {hexValue || color.varName}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardTitle>
        </CardContainer>

        {/* Theme Color Presets */}
        <Alert variant="info">
          <div>
            <div className="font-semibold flex items-center gap-2">
              <LucideIcons.Info className="h-4 w-4" />
              Dynamic Theming
            </div>
            <div>
              Colors automatically adapt based on the selected theme preset and
              mode (light/dark).
            </div>
          </div>
        </Alert>

        {/* Color Spectrum */}
        <CardContainer className="overflow-hidden">
          <CardTitle title="Color Spectrum" className="mt-2 mb-2">
            <div className="w-full space-y-8 p-4 sm:p-6">
              <Typography
                tag="p"
                className="text-gray-600 dark:text-gray-400 mb-6"
              >
                Complete color palette with all shades from 0 to 100 for each
                color spectrum.
              </Typography>
              <div className="space-y-8">
                {colorSpectrum.map((color) => (
                  <div key={color.name}>
                    <Typography
                      tag="h3"
                      className="font-semibold text-lg mb-4 capitalize"
                    >
                      {color.name}
                    </Typography>
                    <div className="grid grid-cols-4 sm:grid-cols-7 md:grid-cols-10 lg:grid-cols-[repeat(13,minmax(0,1fr))] gap-2">
                      {color.shades.map((shade) => {
                        const bgClass = `bg-${color.name}-${shade}`;
                        const varName = `--color-${color.name}-${shade}`;
                        const hexValue = getColorHex(varName);
                        return (
                          <div
                            key={`${color.name}-${shade}-${updateKey}`}
                            className="space-y-1 w-full min-w-[40px]"
                          >
                            <div
                              className={`h-16 w-full rounded border border-border ${bgClass}`}
                              title={`${color.name}-${shade}: ${
                                hexValue || varName
                              }`}
                            />
                            <Typography
                              tag="h4"
                              className="text-center text-xs font-semibold"
                            >
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
            </div>
          </CardTitle>
        </CardContainer>

        {/* Main Colors */}
        <CardContainer className="overflow-hidden">
          <CardTitle title="Main Colors" className="mt-2 mb-2">
            <div className="w-full space-y-8 p-4 sm:p-6">
              <Typography
                tag="p"
                className="text-gray-600 dark:text-gray-400 mb-6"
              >
                Primary theme colors used throughout the application. These
                colors are mapped from semantic colors and adapt to light/dark
                mode.
              </Typography>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {mainColors.map((color) => {
                  const hexValue = getColorHex(color.varName);
                  const textColor =
                    color.name === 'body' ||
                    color.name === 'light' ||
                    color.name === 'light-dark'
                      ? 'text-dark dark:text-light'
                      : 'text-white';

                  return (
                    <div
                      key={`main-${color.name}-${updateKey}`}
                      className="space-y-2 border border-border rounded-lg p-2"
                    >
                      <div
                        className={`h-20 rounded flex items-center justify-center ${color.class} ${textColor} border border-border`}
                        title={`${color.name}: var(${color.varName})${
                          hexValue ? ` = ${hexValue}` : ''
                        }`}
                      >
                        <Typography
                          tag="h4"
                          className="text-center px-2 break-all text-xs"
                        >
                          {color.name}
                        </Typography>
                      </div>
                      <Typography
                        tag="h4"
                        className="text-center text-muted text-xs"
                      >
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
                        className="text-center text-muted text-[9px] mt-1 break-all px-1"
                      >
                        {color.class}
                      </Typography>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </div>
    </div>
  );
};

export default ColorSystemSection;

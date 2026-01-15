import React from 'react';
import { CardContainer, CardTitle, Typography, BasicTable } from '../../../../index';

const ThemeProviderSection: React.FC = () => {
  const themeProviderPropsColumns = [
    { key: 'prop', label: 'Prop' },
    { key: 'type', label: 'Type' },
    { key: 'default', label: 'Default' },
    { key: 'description', label: 'Description' },
  ];

  const themeProviderPropsData = [
    {
      prop: 'menuItems',
      type: 'IMenuItem[]',
      default: 'Required',
      description: 'Navigation menu items',
    },
    {
      prop: 'layout',
      type: 'LAYOUT_OPTIONS',
      default: 'HORIZONTAL',
      description: 'Layout type: CLEAN, ADMIN, or HORIZONTAL',
    },
    {
      prop: 'mode',
      type: "'light' | 'dark'",
      default: "'light'",
      description: 'Color mode',
    },
    {
      prop: 'showSettings',
      type: 'boolean',
      default: 'false',
      description: 'Show theme settings drawer button',
    },
    {
      prop: 'customPaletteColor',
      type: 'object',
      default: '-',
      description: 'Custom color palette (see Color Configuration)',
    },
    {
      prop: 'logo',
      type: 'LogoType',
      default: "{ path: '/', name: '' }",
      description: 'Logo configuration object with path and name',
    },
    {
      prop: 'brandColor',
      type: 'PresetColorType',
      default: '-',
      description: 'Brand color preset',
    },
    {
      prop: 'headerClassName',
      type: 'string',
      default: '-',
      description: 'Custom CSS classes for header',
    },
    {
      prop: 'contentClassName',
      type: 'string',
      default: '-',
      description: 'Custom CSS classes for content area',
    },
    {
      prop: 'fullWidth',
      type: 'boolean',
      default: 'false',
      description: 'Enable full width layout',
    },
    {
      prop: 'rightButton',
      type: 'ReactNode',
      default: '-',
      description: 'Custom button component for header right area',
    },
    {
      prop: 'className',
      type: 'string',
      default: '-',
      description: 'Custom CSS classes for root layout',
    },
  ];

  return (
    <>
      <div className="text-center">
        <Typography
          tag="h2"
          className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
        >
          ThemeProvider Component
        </Typography>
        <Typography
          tag="p"
          className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Complete reference for ThemeProvider props and configuration
        </Typography>
      </div>

      <CardContainer>
        <CardTitle title="ThemeProvider Props" className="mt-2 mb-6">
          <div className="space-y-6">
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              The ThemeProvider is the root component that wraps your
              application and manages all theme state. Located in
              <code className="px-2 py-1 font-mono rounded text-sm">
                ui/tucu-ui/src/themes
              </code>
              directory.
            </Typography>
            <BasicTable
              columns={themeProviderPropsColumns.map((col) => ({
                ...col,
                render: (value: unknown) => {
                  if (col.key === 'prop') {
                    return (
                      <code className="text-xs text-brand">
                        {String(value ?? '')}
                      </code>
                    );
                  }
                  if (col.key === 'type' || col.key === 'default') {
                    return (
                      <code className="text-xs text-gray-600 dark:text-gray-400">
                        {String(value ?? '')}
                      </code>
                    );
                  }
                  if (col.key === 'description') {
                    return (
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {String(value ?? '')}
                      </span>
                    );
                  }
                  return String(value ?? '');
                },
              }))}
              data={themeProviderPropsData as Array<Record<string, unknown>>}
              containerClassName="mb-4"
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default ThemeProviderSection;


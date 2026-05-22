import React from 'react';
import {
  HeroCard,
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  BasicTable,
} from '../../../../index';

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
      prop: 'themeStyle',
      type: "'default' | 'macos' | 'macos-tahoe'",
      default: "'default'",
      description: 'Visual theme variant — constrains available layouts',
    },
    {
      prop: 'layout',
      type: 'LAYOUT_OPTIONS',
      default: 'HORIZONTAL',
      description: 'Layout type (constrained by themeStyle)',
    },
    {
      prop: 'mode',
      type: "'light' | 'dark'",
      default: "'dark'",
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
      description:
        'Custom color palette with 24 color slots organized in groups: Brand (primary, accent), Surfaces (secondary, backgrounds), Text (fg, muted, border), and Status (success, warning, error, info) — each with light/dark variants',
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
      description: 'Brand color preset name',
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
    {
      prop: 'setCurrentPathname',
      type: '(pathname: string) => void',
      default: '-',
      description: 'Callback invoked on route change with current pathname',
    },
  ];

  return (
    <>
      <HeroCard
        title="ThemeProvider Component"
        description="The root component that wraps your application, manages all theme state, handles routing, and applies color configurations."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Component className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Props Reference
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Complete list of ThemeProvider configuration props
          </Typography>
        </div>
        <CardContainer>
          <CardTitle title="ThemeProvider Props">
            <div className="space-y-6">
              <Typography tag="p" className="text-gray-600 dark:text-gray-400">
                Located in{' '}
                <code className="px-1 py-0.5 border border-border rounded text-xs">
                  ui/tucu-ui/src/themes/components/theme-provider/
                </code>
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
      </section>
    </>
  );
};

export default ThemeProviderSection;

import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
} from '../../../../index';

const ThemeProviderIntegrationSection: React.FC = () => {
  const themeProviderProps = `interface StandaloneAppProviderProps
  extends Omit<ThemeWrapperProps, 'menuItems' | 'children'> {
  menuItems: StandaloneAppRoutesMenuItem[];  // Required: Array of route items
  customRoutes?: React.ReactElement<typeof Routes>; // Override default routing
}

interface ThemeWrapperProps {
  // Layout Configuration
  layout?: 'classic' | 'minimal' | 'none';
  
  // Branding
  logo?: { name: string; secondName?: string };
  rightButton?: React.ReactNode;
  
  // Theming
  brandColor?: PresetColorType;
  mode?: 'light' | 'dark';
  customPaletteColor?: { ... };
  
  // Settings Panel
  showSettings?: boolean;
}`;

  const customLayout = `import { StandaloneAppThemeProvider } from '@e-burgos/tucu-ui';

function CustomLayoutApp() {
  return (
    <StandaloneAppThemeProvider
      layout="minimal"
      menuItems={menuItems}
      logo={{ name: 'My', secondName: 'App' }}
      rightButton={
        <div className="flex gap-2">
          <Button variant="ghost" size="small">
            Profile
          </Button>
          <Button variant="ghost" size="small">
            Logout
          </Button>
        </div>
      }
      headerClassName="bg-brand/5 border-b border-brand/20"
      contentClassName="max-w-7xl mx-auto"
      fullWidth={false}
    />
  );
}`;

  const customRoutesExample = `import { Routes, Route } from 'react-router-dom';
import { StandaloneAppThemeProvider } from '@e-burgos/tucu-ui';

function App() {
  return (
    <StandaloneAppThemeProvider
      menuItems={menuItems}
      customRoutes={
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/custom" element={<CustomPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      }
    />
  );
}`;

  return (
    <div className="space-y-8">
      <CardContainer>
        <CardTitle title="ThemeProvider Integration" className="mt-2 mb-6">
          <div className="space-y-6">
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              The routing system is fully integrated with the ThemeProvider,
              providing seamless navigation, layout management, and theming
              support. The ThemeProvider supports two architectural patterns:
              <strong> Standalone</strong> (default) for traditional SPAs and
              <strong> Micro Frontends (MFE)</strong> for distributed
              architectures.
            </Typography>

            <div className="space-y-6">
              <div className="space-y-4">
                <Typography tag="h4" className="font-semibold">
                  StandaloneAppThemeProvider Props
                </Typography>
                <CodeBlock language="typescript" code={themeProviderProps} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Typography tag="h4" className="font-semibold">
                    Custom Layout Example
                  </Typography>
                  <CodeBlock language="tsx" code={customLayout} />
                </div>

                <div className="space-y-4">
                  <Typography tag="h4" className="font-semibold">
                    Custom Routes Override
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    You can completely override the default routing by providing
                    your own{' '}
                    <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                      customRoutes
                    </code>{' '}
                    prop.
                  </Typography>
                  <CodeBlock language="tsx" code={customRoutesExample} />
                </div>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
};

export default ThemeProviderIntegrationSection;

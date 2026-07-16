import React from 'react';
import {
  HeroCard,
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  CodeBlock,
} from '@e-burgos/tucu-ui';

const ThemeProviderIntegrationSection: React.FC = () => {
  const themeProviderProps = `interface StandaloneAppProviderProps
  extends Omit<ThemeWrapperProps, 'menuItems' | 'children'> {
  menuItems: StandaloneAppRoutesMenuItem[];  // Required: Array of route items
  customRoutes?: React.ReactElement<typeof Routes>; // Override default routing
}

interface ThemeWrapperProps {
  // Layout Configuration
  themeStyle?: 'default' | 'macos' | 'macos-tahoe';
  layout?: LAYOUT_OPTIONS; // Values depend on themeStyle

  // Layout values per themeStyle:
  // default → 'clean' | 'admin' | 'horizontal'
  // macos → 'macos'
  // macos-tahoe → 'macos-tahoe' | 'macos-tahoe-dock'

  // Branding
  logo?: { name: string; secondName?: string };
  rightButton?: React.ReactNode;

  // Theming
  brandColor?: PresetColorType;
  mode?: 'light' | 'dark';
  customPaletteColor?: { ... };

  // Settings Panel
  showSettings?: boolean;

  // Layout customization
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  fullWidth?: boolean;
}`;

  const customLayout = `import { ThemeProvider } from '@e-burgos/tucu-ui';

function CustomLayoutApp() {
  return (
    <ThemeProvider
      themeStyle="default"
      layout="admin"
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

  const customRoutesExample = `import { ThemeProvider } from '@e-burgos/tucu-ui';

function App() {
  return (
    <ThemeProvider
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
    <>
      <HeroCard
        title="ThemeProvider Integration"
        description="The routing system is fully integrated with ThemeProvider. It provides seamless navigation, layout management, and theming through the architecturalPatterns prop."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Puzzle className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            ThemeProvider Props
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            The ThemeProvider accepts layout, theming, and routing configuration
          </Typography>
        </div>
        <CardContainer>
          <CardTitle title="Interface Definition">
            <CodeBlock language="TS" code={themeProviderProps} />
          </CardTitle>
        </CardContainer>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Usage Examples
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Custom layout and routing override patterns
          </Typography>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CardContainer>
            <CardTitle title="Custom Layout">
              <CodeBlock language="tsx" code={customLayout} />
            </CardTitle>
          </CardContainer>
          <CardContainer>
            <CardTitle title="Custom Routes Override">
              <CodeBlock language="tsx" code={customRoutesExample} />
            </CardTitle>
          </CardContainer>
        </div>
      </section>
    </>
  );
};

export default ThemeProviderIntegrationSection;

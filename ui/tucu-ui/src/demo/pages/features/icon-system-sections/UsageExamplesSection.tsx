import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  CodeBlock,
} from '../../../../index';

const UsageExamplesSection: React.FC = () => {
  const lucideImportCode = `import { LucideIcons } from '@e-burgos/tucu-ui';

function MyComponent() {
  return (
    <div>
      <LucideIcons.Home className="w-6 h-6 text-gray-600" />
      <LucideIcons.User size={24} color="currentColor" />
      <LucideIcons.Settings className="w-5 h-5" />
      <LucideIcons.ChevronDown strokeWidth={1.5} />
      <LucideIcons.Search className="w-4 h-4 text-blue-500" />
    </div>
  );
}`;

  const customIconsCode = `import {
  Tucu,
  HomeIcon,
  SearchIcon,
  Bitcoin,
  Ethereum,
  Github,
  Twitter,
  ClassicLayoutIcon,
  Sun,
  Moon,
  Check,
  Star,
} from '@e-burgos/tucu-ui';

function MyApp() {
  return (
    <div>
      {/* Brand icon */}
      <Tucu className="w-8 h-8 text-brand" />
      
      {/* UI icons */}
      <HomeIcon className="w-6 h-6" />
      <SearchIcon className="w-5 h-5 text-gray-500" />
      
      {/* Theme icons */}
      <Sun className="w-6 h-6" />
      <Moon className="w-6 h-6" />
      
      {/* Blockchain icons */}
      <Bitcoin className="w-6 h-6" />
      <Ethereum className="w-6 h-6" />
      
      {/* Social icons */}
      <Github className="w-5 h-5" />
      <Twitter className="w-5 h-5" />
    </div>
  );
}`;

  const iconButtonCode = `import { LucideIcons } from '@e-burgos/tucu-ui';
import { Button } from '@e-burgos/tucu-ui';

function IconButton({ iconName, label, onClick }) {
  const IconComponent = LucideIcons[iconName];

  return (
    <button
      onClick={onClick}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label={label}
    >
      <IconComponent className="w-5 h-5" />
    </button>
  );
}`;

  const accessibilityCode = `import { LucideIcons } from '@e-burgos/tucu-ui';

// Decorative icons
<LucideIcons.Home className="w-6 h-6" aria-hidden="true" />

// Interactive icons
<LucideIcons.Settings
  className="w-6 h-6 cursor-pointer"
  aria-label="Open settings"
  role="button"
  tabIndex={0}
/>

// Icons with text labels
<button>
  <LucideIcons.Home className="w-4 h-4 mr-2" aria-hidden="true" />
  Home
</button>`;

  return (
    <div className="space-y-8">
      <CardContainer className="overflow-hidden">
        <CardTitle title="Usage Examples" className="mt-2 mb-2">
          <div className="w-full space-y-8 p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-linear-to-br from-blue-500 via-indigo-500 to-purple-500 shadow-lg">
                <LucideIcons.Code className="w-6 h-6 text-white filter drop-shadow-sm" />
              </div>
              <Typography tag="h3" className="text-xl font-semibold">
                How to Use Icons
              </Typography>
            </div>

            <div className="space-y-8">
              {/* Lucide Icons */}
              <div className="space-y-4">
                <Typography tag="h4" className="font-semibold">
                  Lucide React Integration
                </Typography>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400"
                >
                  Import the LucideIcons namespace and access any icon with dot
                  notation. All 5000+ Lucide icons are available.
                </Typography>
                <CodeBlock code={lucideImportCode} language="tsx" />
              </div>

              {/* Custom Icons */}
              <div className="space-y-4">
                <Typography tag="h4" className="font-semibold">
                  Custom Tucu Icons
                </Typography>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400"
                >
                  Access 98+ custom-designed icons specific to Tucu UI through
                  direct named imports.
                </Typography>
                <CodeBlock code={customIconsCode} language="tsx" />
              </div>

              {/* Icon Button Component */}
              <div className="space-y-4">
                <Typography tag="h4" className="font-semibold">
                  Creating Icon Components
                </Typography>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400"
                >
                  Create reusable icon components with proper TypeScript
                  support.
                </Typography>
                <CodeBlock code={iconButtonCode} language="tsx" />
              </div>

              {/* Accessibility */}
              <div className="space-y-4">
                <Typography tag="h4" className="font-semibold">
                  Accessibility Best Practices
                </Typography>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400"
                >
                  Always provide proper accessibility attributes for icons.
                </Typography>
                <CodeBlock code={accessibilityCode} language="tsx" />
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
};

export default UsageExamplesSection;

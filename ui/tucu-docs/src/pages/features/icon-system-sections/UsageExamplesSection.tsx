import React from 'react';
import {
  HeroCard,
  CardContainer,
  Typography,
  LucideIcons,
  CodeBlock,
} from '@e-burgos/tucu-ui';

const UsageExamplesSection: React.FC = () => {
  const lucideImportCode = `import { LucideIcons } from '@e-burgos/tucu-ui';

function MyComponent() {
  return (
    <div className="flex gap-4">
      {/* Sizing via className (Tailwind) */}
      <LucideIcons.Home className="w-6 h-6 text-gray-600" />

      {/* Sizing via size prop (Lucide-specific) */}
      <LucideIcons.User size={24} color="currentColor" />

      {/* Custom stroke width */}
      <LucideIcons.ChevronDown strokeWidth={1.5} />

      {/* Color via Tailwind class */}
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
} from '@e-burgos/tucu-ui';

function MyApp() {
  return (
    <div className="flex gap-4">
      {/* Brand icon */}
      <Tucu className="w-8 h-8 text-brand" />

      {/* UI icons — sized via className */}
      <HomeIcon className="w-6 h-6" />
      <SearchIcon className="w-5 h-5 text-gray-500" />

      {/* Theme toggle icons */}
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

  const dynamicIconCode = `import { LucideIcons } from '@e-burgos/tucu-ui';

// Dynamic icon rendering from string name
function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = LucideIcons[name as keyof typeof LucideIcons];
  
  if (!IconComponent || typeof IconComponent !== 'function') {
    return null;
  }

  return <IconComponent className={className || "w-5 h-5"} />;
}

// Usage
<DynamicIcon name="Home" className="w-6 h-6 text-brand" />
<DynamicIcon name="Settings" className="w-5 h-5" />`;

  const accessibilityCode = `import { LucideIcons } from '@e-burgos/tucu-ui';

// Decorative icons (hidden from screen readers)
<LucideIcons.Home className="w-6 h-6" aria-hidden="true" />

// Standalone interactive icons (need aria-label)
<button aria-label="Open settings">
  <LucideIcons.Settings className="w-5 h-5" />
</button>

// Icons with visible text (icon is decorative)
<button>
  <LucideIcons.Download className="w-4 h-4 mr-2" aria-hidden="true" />
  Download
</button>`;

  const examples = [
    {
      title: 'Lucide Icons (Namespace)',
      description:
        'Access 1500+ icons via LucideIcons.* dot notation. Supports className, size, color, and strokeWidth props.',
      code: lucideImportCode,
    },
    {
      title: 'Custom Tucu Icons (Named Exports)',
      description:
        'Import 96 custom icons as named exports. Use className with Tailwind utilities for sizing and color.',
      code: customIconsCode,
    },
    {
      title: 'Dynamic Icon Rendering',
      description:
        'Render icons dynamically from string names using the LucideIcons namespace as a lookup object.',
      code: dynamicIconCode,
    },
    {
      title: 'Accessibility Patterns',
      description:
        'Always use aria-hidden for decorative icons and aria-label for interactive standalone icons.',
      code: accessibilityCode,
    },
  ];

  return (
    <>
      <HeroCard
        title="Usage Examples"
        description="Practical code examples for using both icon systems. Covers imports, sizing, dynamic rendering, and accessibility patterns."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-orange-500 via-amber-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Code className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Code Patterns
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Common icon usage patterns with full code examples
          </Typography>
        </div>

        <div className="space-y-6">
          {examples.map((example, index) => (
            <CardContainer key={index}>
              <div className="w-full p-4 sm:p-6 space-y-4">
                <div>
                  <Typography tag="h3" className="font-semibold text-lg mb-1">
                    {example.title}
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-sm text-gray-500 dark:text-gray-400"
                  >
                    {example.description}
                  </Typography>
                </div>
                <CodeBlock language="tsx" code={example.code} />
              </div>
            </CardContainer>
          ))}
        </div>
      </section>
    </>
  );
};

export default UsageExamplesSection;

import React from 'react';
import {
  HeroCard,
  CardContainer,
  Typography,
  LucideIcons,
  FeatureCard,
  CodeBlock,
} from '@e-burgos/tucu-ui';

const IconArchitectureSection: React.FC = () => {
  const iconSystems = [
    {
      icon: (
        <LucideIcons.Sparkles className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Lucide React (1500+ icons)',
      description:
        'Full Lucide React library accessible via LucideIcons namespace. Tree-shakeable when consumed as ES modules since lucide-react is marked as external.',
      iconBgClassName: 'from-blue-500 to-indigo-500',
    },
    {
      icon: (
        <LucideIcons.Palette className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Custom Tucu Icons (96)',
      description:
        '96 hand-crafted SVG icons: blockchain/crypto, layout controls, social brands, and UI elements. Direct named imports from the library.',
      iconBgClassName: 'from-purple-500 to-pink-500',
    },
    {
      icon: (
        <LucideIcons.Layers className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Unified Import',
      description:
        'Both systems accessible from a single package. LucideIcons via namespace, custom icons via named exports.',
      iconBgClassName: 'from-indigo-500 to-violet-500',
    },
  ];

  const architectureCode = `// Two import patterns — one package
import { LucideIcons } from '@e-burgos/tucu-ui';
import { Bitcoin, HomeIcon, Github } from '@e-burgos/tucu-ui';

// Lucide: namespace dot notation (1500+ icons)
<LucideIcons.Home className="w-6 h-6" />
<LucideIcons.Settings size={24} strokeWidth={1.5} />

// Custom: direct named imports (96 icons)
<Bitcoin className="w-6 h-6" />
<HomeIcon className="w-6 h-6" />`;

  const differences = [
    {
      title: 'Lucide Icons',
      items: [
        'Imported via LucideIcons.* namespace',
        'Props: className, size, color, strokeWidth, fill, stroke',
        'Stroke-based SVGs (outline style)',
        'External dependency — tree-shakeable by consumer bundler',
        '~1500+ icons available',
      ],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Custom Tucu Icons',
      items: [
        'Imported as named exports directly',
        'Props: className + all SVGAttributes',
        'Mix of fill and stroke-based SVGs',
        'Bundled inside tucu-ui (always included)',
        '96 specialized icons (crypto, layouts, brands)',
      ],
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <>
      <HeroCard
        title="Icon Architecture"
        description="Dual icon system combining 1500+ Lucide React icons with 96 custom-designed icons, all accessible from a single package with TypeScript support."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Layers className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Two Systems, One Package
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            A unified approach to icons for every use case
          </Typography>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {iconSystems.map((system) => (
            <FeatureCard key={system.title} layout="horizontal" {...system} />
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Import Patterns
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            How to access both icon systems
          </Typography>
        </div>

        <CodeBlock language="tsx" code={architectureCode} />
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Key Differences
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Understanding when to use each icon system
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {differences.map((group, index) => (
            <CardContainer
              key={index}
              className="group hover:shadow-large transition-all duration-300"
            >
              <div className="w-full p-4 sm:p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg bg-linear-to-br ${group.color} shadow-lg`}
                  >
                    <LucideIcons.Package className="w-5 h-5 text-white" />
                  </div>
                  <Typography tag="h3" className="font-semibold text-lg">
                    {group.title}
                  </Typography>
                </div>
                <div className="space-y-2">
                  {group.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start gap-2">
                      <LucideIcons.Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      <Typography
                        tag="span"
                        className="text-sm text-gray-600 dark:text-gray-400"
                      >
                        {item}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            </CardContainer>
          ))}
        </div>
      </section>
    </>
  );
};

export default IconArchitectureSection;

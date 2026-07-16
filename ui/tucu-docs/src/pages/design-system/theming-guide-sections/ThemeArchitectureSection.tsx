import React from 'react';
import {
  HeroCard,
  Typography,
  LucideIcons,
  FeatureCard,
  ColorCard,
  CodeBlock,
} from '@e-burgos/tucu-ui';

const ThemeArchitectureSection: React.FC = () => {
  const coreTechnologies = [
    {
      icon: (
        <LucideIcons.Zap className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Zustand State Management',
      description:
        'Centralized theme state with minimal boilerplate, localStorage persistence, and excellent TypeScript support.',
      iconBgClassName: 'from-yellow-500 via-amber-500 to-orange-500',
    },
    {
      icon: (
        <LucideIcons.Palette className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'CSS Custom Properties',
      description:
        'Dynamic brand colors using 12 CSS variables (6 light/dark pairs) for real-time theme updates without rebuilds.',
      iconBgClassName: 'from-blue-500 via-cyan-500 to-teal-500',
    },
    {
      icon: (
        <LucideIcons.Moon className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Dark Mode Support',
      description:
        'Automatic dark/light mode switching with smooth transitions and system preference detection.',
      iconBgClassName: 'from-purple-500 via-violet-500 to-indigo-500',
    },
  ];

  const themeVariants = [
    {
      icon: <LucideIcons.Layout className="w-5 h-5" />,
      title: 'Default',
      description: 'Standard theme with Clean, Admin, and Horizontal layouts.',
      color: 'blue' as const,
    },
    {
      icon: <LucideIcons.Monitor className="w-5 h-5" />,
      title: 'macOS (Sonoma)',
      description: 'macOS-inspired dock layout with Sonoma visual style.',
      color: 'purple' as const,
    },
    {
      icon: <LucideIcons.Sparkles className="w-5 h-5" />,
      title: 'macOS Tahoe',
      description:
        'Latest macOS Tahoe style with Tahoe and Tahoe Dock layouts.',
      color: 'teal' as const,
    },
  ];

  return (
    <>
      <HeroCard
        title="Theme Architecture"
        description="Built on Zustand, CSS custom properties, and Tailwind CSS v4 for a flexible, performant, and type-safe theming system."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-purple-500 via-violet-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Layers className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Core Technologies
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Three pillars that power the theming system
          </Typography>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {coreTechnologies.map((item) => (
            <FeatureCard key={item.title} layout="horizontal" {...item} />
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Theme Variants
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Three visual styles with their own layout constraints
          </Typography>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {themeVariants.map((item) => (
            <ColorCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
              color={item.color}
            />
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Layout Constraint Map
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Each theme variant restricts which layouts are available
          </Typography>
        </div>
        <CodeBlock
          language="TS"
          code={`// THEME_STYLE_LAYOUTS mapping
const THEME_STYLE_LAYOUTS: Record<THEME_VARIANT, ThemeStyleConfig> = {
  default: {
    validLayouts: [CLEAN, ADMIN, HORIZONTAL],
    defaultLayout: HORIZONTAL,
  },
  macos: {
    validLayouts: [MACOS, MACOS_CLEAN],
    defaultLayout: MACOS,
  },
  'macos-tahoe': {
    validLayouts: [MACOS_TAHOE, MACOS_TAHOE_DOCK, MACOS_TAHOE_CLEAN],
    defaultLayout: MACOS_TAHOE,
  },
};

// LAYOUT_OPTIONS enum (8 values)
enum LAYOUT_OPTIONS {
  CLEAN = 'clean',
  ADMIN = 'admin',
  HORIZONTAL = 'horizontal',
  MACOS = 'macos',
  MACOS_CLEAN = 'macos-clean',
  MACOS_TAHOE = 'macos-tahoe',
  MACOS_TAHOE_DOCK = 'macos-tahoe-dock',
  MACOS_TAHOE_CLEAN = 'macos-tahoe-clean',
}`}
        />
      </section>
    </>
  );
};

export default ThemeArchitectureSection;

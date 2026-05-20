import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LucideIcons,
  HeroCard,
  CardContainer,
  CardTitle,
  Typography,
  FeatureCard,
  ColorCard,
  Button,
  AnchorLink,
} from '../../../index';

const keyFeatures = [
  {
    icon: (
      <LucideIcons.Palette className="w-6 h-6 text-white filter drop-shadow-sm" />
    ),
    title: 'Apple HIG Compliant',
    description:
      'Components follow Apple Human Interface Guidelines for authentic macOS look and feel',
    iconBgClassName: 'from-blue-500 to-indigo-500',
  },
  {
    icon: (
      <LucideIcons.Paintbrush className="w-6 h-6 text-white filter drop-shadow-sm" />
    ),
    title: 'CSS Custom Properties',
    description:
      'Fully tokenized with CSS variables for easy theming and runtime customization',
    iconBgClassName: 'from-purple-500 to-pink-500',
  },
  {
    icon: (
      <LucideIcons.Layers className="w-6 h-6 text-white filter drop-shadow-sm" />
    ),
    title: 'Multiple Themes',
    description:
      'Support for Sonoma and Tahoe design languages with distinct visual identities',
    iconBgClassName: 'from-green-500 to-emerald-500',
  },
  {
    icon: (
      <LucideIcons.Sparkles className="w-6 h-6 text-white filter drop-shadow-sm" />
    ),
    title: 'Materials & Effects',
    description:
      'Vibrancy, blur, translucency, and Liquid Glass effects via Tailwind v4',
    iconBgClassName: 'from-cyan-500 to-blue-500',
  },
  {
    icon: (
      <LucideIcons.Moon className="w-6 h-6 text-white filter drop-shadow-sm" />
    ),
    title: 'Dark Mode Native',
    description:
      'Full dark mode support matching macOS system appearance preferences',
    iconBgClassName: 'from-gray-600 to-gray-800',
  },
  {
    icon: (
      <LucideIcons.Puzzle className="w-6 h-6 text-white filter drop-shadow-sm" />
    ),
    title: 'Composable Components',
    description:
      'Windows, sidebars, toolbars, widgets, and controls ready to combine',
    iconBgClassName: 'from-orange-500 to-red-500',
  },
];

const themes = [
  {
    id: 'sonoma',
    title: 'macOS Sonoma',
    version: '14',
    description:
      'Spatial aurora backgrounds, vibrancy materials, segmented controls, traffic-light windows, widgets, and more.',
    icon: (
      <LucideIcons.Monitor className="w-10 h-10 text-white filter drop-shadow-lg" />
    ),
    gradient: 'linear-gradient(135deg, #007aff 0%, #5856d6 100%)',
    path: '/macos/sonoma',
    sections: [
      { label: 'Colors', category: 'Foundations' },
      { label: 'Materials', category: 'Foundations' },
      { label: 'Typography', category: 'Foundations' },
      { label: 'Shapes & Spacing', category: 'Foundations' },
      { label: 'Window', category: 'Containers' },
      { label: 'Sidebar', category: 'Containers' },
      { label: 'Toolbar', category: 'Containers' },
      { label: 'Widget', category: 'Containers' },
      { label: 'Segmented Control', category: 'Controls' },
      { label: 'Search Bar', category: 'Controls' },
      { label: 'Command Palette', category: 'Controls' },
      { label: 'Notification Banner', category: 'Feedback' },
      { label: 'Popover', category: 'Feedback' },
    ],
  },
  {
    id: 'tahoe',
    title: 'macOS Tahoe',
    version: '26',
    description:
      'Liquid Glass materials, translucent surfaces, spatial depth, and the next generation of macOS design.',
    icon: (
      <LucideIcons.Layers className="w-10 h-10 text-white filter drop-shadow-lg" />
    ),
    gradient: 'linear-gradient(135deg, #30d158 0%, #00c7be 50%, #007aff 100%)',
    path: '/macos/tahoe',
    sections: [
      { label: 'Liquid Glass', category: 'Foundations' },
      { label: 'Colors', category: 'Foundations' },
      { label: 'Materials', category: 'Foundations' },
      { label: 'Text Styles', category: 'Foundations' },
      { label: 'Backgrounds', category: 'Foundations' },
      { label: 'Window', category: 'Components' },
      { label: 'Search Bar', category: 'Components' },
      { label: 'Segmented Control', category: 'Components' },
      { label: 'Widget', category: 'Components' },
      { label: 'Popover', category: 'Components' },
      { label: 'Notification Banner', category: 'Components' },
      { label: 'Progress Bar', category: 'Components' },
      { label: 'Dialog', category: 'Components' },
      { label: 'Command Palette', category: 'Components' },
      { label: 'Dock', category: 'Components' },
    ],
  },
];

const coverageStatus = [
  {
    icon: <LucideIcons.SwatchBook className="w-5 h-5" />,
    title: 'Foundations',
    description: 'Colors, materials, typography, shapes, and spacing tokens',
    color: 'blue' as const,
  },
  {
    icon: <LucideIcons.LayoutGrid className="w-5 h-5" />,
    title: 'Containers',
    description: 'Windows, sidebars, toolbars, and widget shells',
    color: 'purple' as const,
  },
  {
    icon: <LucideIcons.ToggleLeft className="w-5 h-5" />,
    title: 'Controls',
    description: 'Segmented controls, search bars, command palettes',
    color: 'cyan' as const,
  },
  {
    icon: <LucideIcons.Bell className="w-5 h-5" />,
    title: 'Feedback',
    description: 'Notifications, popovers, dialogs, and progress indicators',
    color: 'orange' as const,
  },
  {
    icon: <LucideIcons.Gem className="w-5 h-5" />,
    title: 'Liquid Glass',
    description: 'Translucent surfaces with depth and spatial blur (Tahoe)',
    color: 'green' as const,
  },
  {
    icon: <LucideIcons.Navigation className="w-5 h-5" />,
    title: 'Navigation',
    description: 'Dock, toolbar actions, and sidebar navigation patterns',
    color: 'pink' as const,
  },
];

const nextSteps = [
  'Explore macOS Sonoma with vibrancy materials and spatial aurora effects',
  'Try the new macOS Tahoe Liquid Glass components and translucent surfaces',
  'Combine macOS components with tucu-ui theming for custom applications',
  'Use CSS custom properties to adapt tokens to your brand colors',
  'Build full desktop-like interfaces with windows, sidebars, and toolbars',
];

export function MacOSShowcase() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 max-w-6xl sm:space-y-12 w-full mx-auto px-4 sm:px-6 lg:px-8 relative pt-8 lg:pt-12">
      {/* Hero Section */}
      <HeroCard
        title="macOS Design System"
        description="Apple HIG-compliant components inspired by macOS. Choose a theme to explore its components, tokens, and design patterns — all powered by CSS custom properties and Tailwind v4."
        githubButton
        getStartedButton
        icon={
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-[22%] flex items-center justify-center shadow-lg border border-white/20"
            style={{
              background: 'linear-gradient(135deg, #007aff 0%, #5856d6 100%)',
            }}
          >
            <LucideIcons.Monitor className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      {/* Key Features */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Why macOS Design System?
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Authentic Apple-inspired components with full theming support, dark
            mode, and modern CSS effects
          </Typography>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {keyFeatures.map((feature, index) => (
            <FeatureCard
              key={index}
              layout="horizontal"
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              iconBgClassName={feature.iconBgClassName}
            />
          ))}
        </div>
      </section>

      {/* Component Coverage */}
      <section className="space-y-8">
        <CardContainer className="overflow-hidden">
          <CardTitle title="Component Coverage">
            <div className="w-full space-y-8">
              <Typography
                tag="p"
                className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2"
              >
                <LucideIcons.CheckCircle className="w-5 h-5 text-green-500" />
                28+ components across 2 themes covering foundations, containers,
                controls, and feedback patterns
              </Typography>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {coverageStatus.map((item, index) => (
                  <ColorCard
                    key={index}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                    color={item.color}
                  />
                ))}
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Choose a Theme */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Choose a Theme
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Each macOS version has its own design language, tokens, and
            component variants
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {themes.map((theme) => (
            <CardContainer key={theme.id}>
              <button
                onClick={() => navigate(theme.path)}
                className="w-full text-left p-6 sm:p-8 transition-all hover:scale-[1.01] active:scale-[0.99] group"
              >
                <div className="flex items-start gap-5">
                  <div
                    className="w-16 h-16 rounded-[22%] flex items-center justify-center shadow-lg border border-white/20 shrink-0"
                    style={{ background: theme.gradient }}
                  >
                    {theme.icon}
                  </div>
                  <div className="flex flex-col gap-2 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <Typography tag="h4" className="text-lg font-semibold">
                        {theme.title}
                      </Typography>
                      <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
                        v{theme.version}
                      </span>
                    </div>
                    <Typography
                      tag="p"
                      className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed"
                    >
                      {theme.description}
                    </Typography>
                    <div className="flex flex-col gap-2 mt-2">
                      {Object.entries(
                        theme.sections.reduce((acc, s) => {
                          if (!acc[s.category]) acc[s.category] = [];
                          acc[s.category].push(s.label);
                          return acc;
                        }, {} as Record<string, string[]>)
                      ).map(([category, labels]) => (
                        <div
                          key={category}
                          className="flex flex-wrap items-center gap-1.5"
                        >
                          <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mr-1">
                            {category}:
                          </span>
                          {labels.map((label) => (
                            <span
                              key={label}
                              className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                            >
                              {label}
                            </span>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end mt-4 text-sm font-medium text-brand opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore
                  <LucideIcons.ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </button>
            </CardContainer>
          ))}
        </div>
      </section>

      {/* What's Next */}
      <section>
        <CardContainer>
          <CardTitle title="What's Next?">
            <div className="space-y-4">
              <Typography tag="h6">
                Ready to build macOS-style interfaces? Start with a theme:
              </Typography>
              <div className="flex flex-wrap flex-row gap-3 pt-2">
                <ul className="space-y-2">
                  {nextSteps.map((step, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <LucideIcons.Check className="w-5 h-5 text-green-500 shrink-0" />
                      <Typography tag="body">{step}</Typography>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap sm:flex-row gap-3 pt-2">
                <Button size="medium" onClick={() => navigate('/macos/sonoma')}>
                  <div className="flex justify-center items-center">
                    <LucideIcons.Monitor className="w-4 h-4 mr-2" />
                    Explore Sonoma
                  </div>
                </Button>
                <Button
                  variant="ghost"
                  size="medium"
                  onClick={() => navigate('/macos/tahoe')}
                >
                  <div className="flex justify-center items-center">
                    <LucideIcons.Layers className="w-4 h-4 mr-2" />
                    Explore Tahoe
                  </div>
                </Button>
                <Button variant="ghost" size="medium">
                  <AnchorLink
                    to="https://developer.apple.com/design/human-interface-guidelines"
                    target="_blank"
                  >
                    <div className="flex justify-center items-center">
                      <LucideIcons.ExternalLink className="w-4 h-4 mr-2" />
                      Apple HIG
                    </div>
                  </AnchorLink>
                </Button>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>
    </div>
  );
}

export default MacOSShowcase;

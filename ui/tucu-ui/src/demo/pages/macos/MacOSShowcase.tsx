import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LucideIcons,
  HeroCard,
  CardContainer,
  Typography,
} from '../../../index';

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
      'Colors',
      'Materials',
      'Text Styles',
      'Backgrounds',
      'Window',
      'Sidebar',
      'Toolbar',
      'Widget',
      'Segmented Control',
      'Search Bar',
      'Notification Banner',
      'Command Palette',
      'Popover',
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
    sections: ['Liquid Glass'],
  },
];

export function MacOSShowcase() {
  const navigate = useNavigate();

  return (
    <div className="w-full mx-auto px-2 sm:px-4 lg:px-4 xl:px-6 space-y-8 sm:space-y-12 pt-8 lg:pt-0 w-full">
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

      <div className="space-y-4">
        <Typography tag="h3" className="text-2xl font-bold">
          Choose a Theme
        </Typography>
        <Typography tag="p" className="text-gray-500 dark:text-gray-400">
          Each macOS version has its own design language, tokens, and component
          variants.
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
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {theme.sections.map((section) => (
                      <span
                        key={section}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                      >
                        {section}
                      </span>
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
    </div>
  );
}

export default MacOSShowcase;

import React from 'react';
import {
  Button,
  type ButtonProps,
  Typography,
  useTheme,
  AnchorLink,
  LucideIcons,
} from '../../../../ui/tucu-ui';

import {
  INTRODUCTION_DOCS_URL,
  TAILWIND_UTILITIES_DOCS_URL,
} from '../utils/constants';

interface HeroPageProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  githubButton?: boolean;
  getStartedButton?: boolean;
  docsButton?:
    | 'introduction'
    | 'layout-system'
    | 'design-system'
    | 'theming-guide'
    | 'form-system'
    | 'icons-system'
    | 'hooks-utilities'
    | 'blockchain-components'
    | 'accessibility'
    | 'tailwind-utilities';
  backgroundAnimation?: boolean;
  customButton?: {
    label: string;
    link: string;
    target: '_blank' | '_self' | '_parent' | '_top';
    variant: ButtonProps['variant'];
    icon?: React.ReactNode;
  };
}

const HeroPage: React.FC<HeroPageProps> = ({
  icon,
  title,
  description,
  githubButton,
  getStartedButton,
  docsButton,
  backgroundAnimation,
  customButton,
}) => {
  const { mode } = useTheme();

  const docsUrl = {
    introduction: INTRODUCTION_DOCS_URL,
    'layout-system': INTRODUCTION_DOCS_URL,
    'design-system': INTRODUCTION_DOCS_URL,
    'theming-guide': INTRODUCTION_DOCS_URL,
    'form-system': INTRODUCTION_DOCS_URL,
    'icons-system': INTRODUCTION_DOCS_URL,
    'hooks-utilities': INTRODUCTION_DOCS_URL,
    'blockchain-components': INTRODUCTION_DOCS_URL,
    accessibility: INTRODUCTION_DOCS_URL,
    'tailwind-utilities': TAILWIND_UTILITIES_DOCS_URL,
  };

  return (
    <section className="relative overflow-hidden">
      <div className="relative rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16">
        {/* Animated Background Elements */}
        <div
          id="animated-background-elements"
          className="absolute inset-0 overflow-hidden"
        >
          {/* Grid pattern */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  mode === 'dark'
                    ? 'linear-gradient(var(--color-gray-800) 1px, transparent 1px), linear-gradient(90deg, var(--color-gray-800) 1px, transparent 1px)'
                    : 'linear-gradient(var(--color-gray-100) 1px, transparent 1px), linear-gradient(90deg, var(--color-gray-200) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            ></div>
          </div>
          {backgroundAnimation && (
            <>
              <div className="absolute w-12 h-12 bg-red-500 opacity-50 rounded-full animate-full-move-1 z-5"></div>
              <div className="absolute w-12 h-12 bg-blue-500 opacity-50 rounded-full animate-full-move-2 z-5"></div>
              <div className="absolute w-12 h-12 bg-green-500 opacity-50 rounded-full animate-full-move-3 z-5"></div>
              <div className="absolute w-12 h-12 bg-purple-500 opacity-50 rounded-full animate-full-move-4 z-5"></div>
              <div className="absolute w-12 h-12 bg-yellow-500 opacity-50 rounded-full animate-full-move-5 z-5"></div>
              <div className="absolute w-12 h-12 bg-pink-500 opacity-50 rounded-full animate-full-move-6 z-5"></div>
            </>
          )}
        </div>

        <div className="relative text-center z-10">
          {icon && <div className="relative mx-auto mb-6 w-fit">{icon}</div>}
          <Typography
            tag="h1"
            className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-brand mb-6"
          >
            {title}
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 dark:text-white/80 max-w-4xl mx-auto leading-relaxed"
          >
            {description}
          </Typography>
          <div className="flex flex-wrap sm:flex-row gap-4 justify-center mt-8 max-w-md mx-auto sm:max-w-none">
            {customButton && (
              <Button
                variant={customButton.variant}
                size="large"
                className="backdrop-blur-sm shadow-xl transition-all duration-300 transform"
              >
                <div className="flex justify-center items-center">
                  <AnchorLink
                    to={customButton.link}
                    target={customButton.target}
                  >
                    <div className="flex justify-center items-center">
                      {customButton?.icon && customButton.icon}
                      {customButton.label}
                    </div>
                  </AnchorLink>
                </div>
              </Button>
            )}
            {getStartedButton && (
              <Button
                variant="solid"
                size="large"
                className="backdrop-blur-sm shadow-xl transition-all duration-300 transform"
              >
                <div className="flex justify-center items-center">
                  <AnchorLink
                    to={docsUrl[docsButton || 'introduction']}
                    target="_blank"
                  >
                    <div className="flex justify-center items-center">
                      <LucideIcons.Rocket className="w-5 h-5 mr-2 animate-pulse" />
                      Get Started
                    </div>
                  </AnchorLink>
                </div>
              </Button>
            )}
            {githubButton && (
              <Button
                variant="ghost"
                size="large"
                className="backdrop-blur-sm shadow-xl transition-all duration-300 transform"
              >
                <div className="flex justify-center items-center">
                  <AnchorLink
                    to={'https://github.com/e-burgos/tucu-ui'}
                    target="_blank"
                  >
                    <div className="flex justify-center items-center">
                      <LucideIcons.Github className="w-5 h-5 mr-2" />
                      View on GitHub
                    </div>
                  </AnchorLink>
                </div>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPage;

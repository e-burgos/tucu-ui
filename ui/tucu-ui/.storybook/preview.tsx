import React, { useEffect } from 'react';
import tucuTheme from './themes/TucuTheme';
import {
  Title,
  Subtitle,
  Description,
  Controls,
  Meta,
  Primary,
} from '@storybook/addon-docs/blocks';
import { ReactRenderer, Preview, StoryContext } from '@storybook/react-vite';
import { PartialStoryFn } from 'storybook/internal/types';
import { useTheme } from '../src/themes/use-theme';
import ThemeProvider from '../src/themes/components/theme-provider';
import '../src/styles.css';

const ThemeDecorator = (
  Story: PartialStoryFn<ReactRenderer, object>,
  context: StoryContext
) => {
  const { setMode } = useTheme();
  const { theme } = context.globals;
  const htmlTag = document.documentElement;

  useEffect(() => {
    if (htmlTag) {
      if (theme === 'dark') {
        setMode('dark');
        htmlTag.classList.remove('light');
        htmlTag.classList.add('dark');
      } else {
        setMode('light');
        htmlTag.classList.remove('dark');
        htmlTag.classList.add('light');
      }
    }
  }, [htmlTag, theme, setMode]);

  if (context.id.includes('theme-provider')) {
    return <Story />;
  }

  return (
    <ThemeProvider
      layout="none"
      showSettings={false}
      settingActions={{
        disabledDirection: true,
      }}
      className="flex min-h-[500px] h-screen w-screen items-center justify-center overflow-auto"
      menuItems={[
        {
          name: 'Story',
          href: '/',
          component: <Story />,
        },
        {
          name: 'Story',
          href: '*',
          component: <Story />,
        },
      ]}
    />
  );
};

const decorators = [ThemeDecorator];

const globalTypes = {
  theme: {
    name: 'Theme',
    title: 'Theme',
    description: 'Tucu UI theme',
    defaultValue: 'dark',
    toolbar: {
      dynamicTitle: true,
      items: [
        { value: 'light', title: '☀️ Light Mode' },
        { value: 'dark', title: '🌙 Dark Mode' },
      ],
    },
  },
};

const parameters = {
  options: {
    storySort: {
      method: 'alphabetical',
    },
  },
  docs: {
    theme: tucuTheme,
    page: () => (
      <>
        <Title />
        <Subtitle />
        <Description />
        <Controls />
        <Meta />

        <Primary />
      </>
    ),
  },
  layout: 'centered',
  chromatic: {
    autodocs: true,
  },
  viewport: {
    viewports: {
      mobile: {
        name: 'Mobile',
        styles: {
          width: '375px',
          height: '667px',
        },
      },
      tablet: {
        name: 'Tablet',
        styles: {
          width: '768px',
          height: '1024px',
        },
      },
      laptop: {
        name: 'Laptop',
        styles: {
          width: '1024px',
          height: '768px',
        },
      },
      desktop: {
        name: 'Desktop',
        styles: {
          width: '1440px',
          height: '900px',
        },
      },
    },
  },
  expanded: false,
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const preview: Preview = {
  decorators,
  globalTypes,
  parameters,
  tags: ['autodocs'],
};

export default preview;

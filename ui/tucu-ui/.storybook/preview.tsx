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
import { ReactRenderer, Preview } from '@storybook/react-vite';
import { PartialStoryFn } from 'storybook/internal/types';
import { BrowserRouter } from 'react-router-dom';
import { useTheme } from '../src/themes/use-theme';
import { ScrollToTop } from '../src/components';
import SettingsButton from '../src/themes/components/theme-provider/settings-button';
import SettingsDrawer from '../src/themes/components/theme-provider/settings-drawer';

import '../src/styles.css';

const ThemeDecorator = (
  Story: PartialStoryFn<ReactRenderer, object>,
  context
) => {
  const { setMode, setPreset, setShowSettings, setSettingActions } = useTheme();
  const { theme } = context.globals;
  const htmlTag = document.documentElement;

  useEffect(() => {
    setShowSettings(true);
    setSettingActions({
      disabledMode: true,
      disabledLayout: true,
      disabledDirection: true,
      disabledPreset: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  }, [htmlTag, theme, setMode, setPreset]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <SettingsButton />
      <SettingsDrawer />
      <Story />
    </BrowserRouter>
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

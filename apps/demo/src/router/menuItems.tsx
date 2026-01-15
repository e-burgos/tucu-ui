import { useMemo } from 'react';

import {
  type StandaloneAppRoutesMenuItem,
  LucideIcons,
} from '@e-burgos/tucu-ui';

// Components
import {
  BlockchainComponents,
  ComponentsIntroduction,
  InputsComponents,
  UiComponents,
} from '@e-burgos/tucu-ui';

// Design System
import { DesignSystem, LayoutSystem, ThemingGuide } from '@e-burgos/tucu-ui';

// Features
import {
  FeaturesIntroduction,
  Accessibility,
  HooksUtilities,
  IconsSystem,
  RoutingSystem,
} from '@e-burgos/tucu-ui';

// Form System
import {
  FormExamplePage,
  CodeExamplePage,
  FormSystem,
} from '@e-burgos/tucu-ui';

// Introduction
import { Introduction } from '@e-burgos/tucu-ui';

// Tailwind Utilities
import {
  TailwindIntroduction,
  Colors,
  LayoutUtilities,
  FlexboxGridUtilities,
  BackgroundUtilities,
  BordersUtilities,
  TypographyUtilities,
  EffectsUtilities,
  FiltersUtilities,
  TablesUtilities,
  TransitionsAnimations,
  TransformsUtilities,
  InteractivityUtilities,
  SVGUtilities,
  AccessibilityUtilities,
} from '@e-burgos/tucu-ui';

// Components
export const APP_PATHS = {
  INTRODUCTION: { path: '/', name: 'Home' },
  DESIGN_SYSTEM: { path: '/design-system', name: 'Design System' },
  FORMS: { path: '/form-system', name: 'Forms' },
  COMPONENTS: { path: '/components', name: 'Components' },
  FEATURES: { path: '/features', name: 'Features' },
  TAILWIND_UTILITIES: { path: '/tailwind-utilities', name: 'Tailwind V4' },
};

export const useMenuItems = () => {
  const menuItems: StandaloneAppRoutesMenuItem[] = useMemo(
    () => [
      {
        name: APP_PATHS.INTRODUCTION.name,
        path: APP_PATHS.INTRODUCTION.path,
        icon: <LucideIcons.Home />,
        component: <Introduction />,
      },
      {
        name: APP_PATHS.DESIGN_SYSTEM.name,
        path: APP_PATHS.DESIGN_SYSTEM.path,
        icon: <LucideIcons.LampDesk />,
        component: <DesignSystem />,
        dropdownItems: [
          {
            name: 'Layout',
            path: APP_PATHS.DESIGN_SYSTEM.path + '/layout-system',
            icon: <LucideIcons.Layout />,
            component: <LayoutSystem />,
          },
          {
            name: 'Theming Guide',
            path: APP_PATHS.DESIGN_SYSTEM.path + '/theming-guide',
            icon: <LucideIcons.Paintbrush />,
            component: <ThemingGuide />,
          },
        ],
      },
      {
        name: APP_PATHS.FORMS.name,
        path: APP_PATHS.FORMS.path,
        icon: <LucideIcons.FileText />,
        component: <FormSystem />,
        dropdownItems: [
          {
            name: 'Form Example',
            path: APP_PATHS.FORMS.path + '/example',
            icon: <LucideIcons.FormInput />,
            component: <FormExamplePage />,
          },
          {
            name: 'Code Example',
            path: APP_PATHS.FORMS.path + '/code-example',
            icon: <LucideIcons.Code />,
            component: <CodeExamplePage />,
          },
        ],
      },
      {
        name: APP_PATHS.COMPONENTS.name,
        path: APP_PATHS.COMPONENTS.path,
        component: <ComponentsIntroduction />,
        icon: <LucideIcons.Component />,
        dropdownItems: [
          {
            name: 'Blockchain',
            path: APP_PATHS.COMPONENTS.path + '/blockchain',
            icon: <LucideIcons.Coins />,
            component: <BlockchainComponents />,
          },
          {
            name: 'UI Components',
            path: APP_PATHS.COMPONENTS.path + '/ui-components',
            icon: <LucideIcons.Component />,
            component: <UiComponents />,
          },
          {
            name: 'Inputs Components',
            path: APP_PATHS.COMPONENTS.path + '/inputs-components',
            icon: <LucideIcons.Keyboard />,
            component: <InputsComponents />,
          },
        ],
      },
      {
        name: APP_PATHS.FEATURES.name,
        path: APP_PATHS.FEATURES.path,
        icon: <LucideIcons.Layers />,
        component: <FeaturesIntroduction />,
        dropdownItems: [
          {
            name: 'Icons',
            path: APP_PATHS.FEATURES.path + '/icons-system',
            icon: <LucideIcons.Sparkles />,
            component: <IconsSystem />,
          },
          {
            name: 'Accessibility',
            path: APP_PATHS.FEATURES.path + '/accessibility',
            icon: <LucideIcons.Eye />,
            component: <Accessibility />,
          },
          {
            name: 'Hooks',
            path: APP_PATHS.FEATURES.path + '/hooks-utilities',
            icon: <LucideIcons.Settings />,
            component: <HooksUtilities />,
          },
          {
            name: 'Routing',
            path: APP_PATHS.FEATURES.path + '/routing-system',
            icon: <LucideIcons.Route />,
            component: <RoutingSystem />,
          },
        ],
      },
      {
        name: APP_PATHS.TAILWIND_UTILITIES.name,
        path: APP_PATHS.TAILWIND_UTILITIES.path,
        icon: <LucideIcons.Layout />,
        component: <TailwindIntroduction />,
        dropdownItems: [
          {
            name: 'Layout Utilities',
            path: APP_PATHS.TAILWIND_UTILITIES.path + '/layout-utilities',
            icon: <LucideIcons.Layout />,
            component: <LayoutUtilities />,
          },
          {
            name: 'Flexbox & Grid',
            path: APP_PATHS.TAILWIND_UTILITIES.path + '/flexbox-grid',
            icon: <LucideIcons.Grid3X3 />,
            component: <FlexboxGridUtilities />,
          },
          {
            name: 'Background',
            path: APP_PATHS.TAILWIND_UTILITIES.path + '/background',
            icon: <LucideIcons.Image />,
            component: <BackgroundUtilities />,
          },
          {
            name: 'Borders',
            path: APP_PATHS.TAILWIND_UTILITIES.path + '/borders',
            icon: <LucideIcons.Square />,
            component: <BordersUtilities />,
          },
          {
            name: 'Typography',
            path: APP_PATHS.TAILWIND_UTILITIES.path + '/typography',
            icon: <LucideIcons.Type />,
            component: <TypographyUtilities />,
          },
          {
            name: 'Effects',
            path: APP_PATHS.TAILWIND_UTILITIES.path + '/effects',
            icon: <LucideIcons.Sparkles />,
            component: <EffectsUtilities />,
          },
          {
            name: 'Filters',
            path: APP_PATHS.TAILWIND_UTILITIES.path + '/filters',
            icon: <LucideIcons.Filter />,
            component: <FiltersUtilities />,
          },
          {
            name: 'Tables',
            path: APP_PATHS.TAILWIND_UTILITIES.path + '/tables',
            icon: <LucideIcons.Table />,
            component: <TablesUtilities />,
          },
          {
            name: 'Transitions',
            path: APP_PATHS.TAILWIND_UTILITIES.path + '/transitions',
            icon: <LucideIcons.Play />,
            component: <TransitionsAnimations />,
          },
          {
            name: 'Transforms',
            path: APP_PATHS.TAILWIND_UTILITIES.path + '/transforms',
            icon: <LucideIcons.Move3D />,
            component: <TransformsUtilities />,
          },
          {
            name: 'Interactivity',
            path: APP_PATHS.TAILWIND_UTILITIES.path + '/interactivity',
            icon: <LucideIcons.MousePointerClick />,
            component: <InteractivityUtilities />,
          },
          {
            name: 'SVG',
            path: APP_PATHS.TAILWIND_UTILITIES.path + '/svg',
            icon: (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path d="M12 6v6l4 2" />
              </svg>
            ),
            component: <SVGUtilities />,
          },
          {
            name: 'Accessibility',
            path: APP_PATHS.TAILWIND_UTILITIES.path + '/accessibility',
            icon: <LucideIcons.Accessibility />,
            component: <AccessibilityUtilities />,
          },
          {
            name: 'Colors',
            path: APP_PATHS.TAILWIND_UTILITIES.path + '/colors',
            icon: <LucideIcons.Palette />,
            component: <Colors />,
          },
        ],
      },
    ],
    []
  );

  return { menuItems };
};

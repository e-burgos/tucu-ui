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
  DESIGN_SYSTEM: {
    path: '/design-system',
    name: 'Design System',
    dropdownItems: [
      {
        name: 'Layout',
        path: '/design-system/layout-system',
        icon: <LucideIcons.Layout />,
        component: <LayoutSystem />,
      },
      {
        name: 'Theming Guide',
        path: '/design-system/theming-guide',
        icon: <LucideIcons.Paintbrush />,
        component: <ThemingGuide />,
      },
    ],
  },
  FORMS: {
    path: '/form-system',
    name: 'Forms',
    dropdownItems: [
      {
        name: 'Form Example',
        path: '/form-system/example',
        icon: <LucideIcons.FormInput />,
        component: <FormExamplePage />,
      },
      {
        name: 'Code Example',
        path: '/form-system/code-example',
        icon: <LucideIcons.Code />,
        component: <CodeExamplePage />,
      },
    ],
  },
  COMPONENTS: {
    path: '/components',
    name: 'Components',
    dropdownItems: [
      {
        name: 'Blockchain',
        path: '/components/blockchain',
        icon: <LucideIcons.Coins />,
        component: <BlockchainComponents />,
      },
      {
        name: 'UI Components',
        path: '/components/ui-components',
        icon: <LucideIcons.Component />,
        component: <UiComponents />,
      },
      {
        name: 'Inputs Components',
        path: '/components/inputs-components',
        icon: <LucideIcons.Keyboard />,
        component: <InputsComponents />,
      },
    ],
  },
  FEATURES: {
    path: '/features',
    name: 'Features',
    dropdownItems: [
      {
        name: 'Icons',
        path: '/features/icons-system',
        icon: <LucideIcons.Sparkles />,
        component: <IconsSystem />,
      },
      {
        name: 'Accessibility',
        path: '/features/accessibility',
        icon: <LucideIcons.Eye />,
        component: <Accessibility />,
      },
      {
        name: 'Hooks',
        path: '/features/hooks-utilities',
        icon: <LucideIcons.Settings />,
        component: <HooksUtilities />,
      },
      {
        name: 'Routing',
        path: '/features/routing-system',
        icon: <LucideIcons.Route />,
        component: <RoutingSystem />,
      },
    ],
  },
  TAILWIND_UTILITIES: {
    path: '/tailwind-utilities',
    name: 'Tailwind V4',
    dropdownItems: [
      {
        name: 'Layout Utilities',
        path: '/tailwind-utilities/layout-utilities',
        icon: <LucideIcons.Layout />,
        component: <LayoutUtilities />,
      },
      {
        name: 'Flexbox & Grid',
        path: '/tailwind-utilities/flexbox-grid',
        icon: <LucideIcons.Grid3X3 />,
        component: <FlexboxGridUtilities />,
      },
      {
        name: 'Background',
        path: '/tailwind-utilities/background',
        icon: <LucideIcons.Image />,
        component: <BackgroundUtilities />,
      },
      {
        name: 'Borders',
        path: '/tailwind-utilities/borders',
        icon: <LucideIcons.Square />,
        component: <BordersUtilities />,
      },
      {
        name: 'Typography',
        path: '/tailwind-utilities/typography',
        icon: <LucideIcons.Type />,
        component: <TypographyUtilities />,
      },
      {
        name: 'Effects',
        path: '/tailwind-utilities/effects',
        icon: <LucideIcons.Sparkles />,
        component: <EffectsUtilities />,
      },
      {
        name: 'Filters',
        path: '/tailwind-utilities/filters',
        icon: <LucideIcons.Filter />,
        component: <FiltersUtilities />,
      },
      {
        name: 'Tables',
        path: '/tailwind-utilities/tables',
        icon: <LucideIcons.Table />,
        component: <TablesUtilities />,
      },
      {
        name: 'Transitions',
        path: '/tailwind-utilities/transitions',
        icon: <LucideIcons.Play />,
        component: <TransitionsAnimations />,
      },
      {
        name: 'Transforms',
        path: '/tailwind-utilities/transforms',
        icon: <LucideIcons.Move3D />,
        component: <TransformsUtilities />,
      },
      {
        name: 'Interactivity',
        path: '/tailwind-utilities/interactivity',
        icon: <LucideIcons.MousePointerClick />,
        component: <InteractivityUtilities />,
      },
      {
        name: 'SVG',
        path: '/tailwind-utilities/svg',
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
        path: '/tailwind-utilities/accessibility',
        icon: <LucideIcons.Accessibility />,
        component: <AccessibilityUtilities />,
      },
      {
        name: 'Colors',
        path: '/tailwind-utilities/colors',
        icon: <LucideIcons.Palette />,
        component: <Colors />,
      },
    ],
  },
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
        dropdownItems: [...APP_PATHS.DESIGN_SYSTEM.dropdownItems],
      },
      {
        name: APP_PATHS.FORMS.name,
        path: APP_PATHS.FORMS.path,
        icon: <LucideIcons.FileText />,
        component: <FormSystem />,
        dropdownItems: [...APP_PATHS.FORMS.dropdownItems],
      },
      {
        name: APP_PATHS.COMPONENTS.name,
        path: APP_PATHS.COMPONENTS.path,
        component: <ComponentsIntroduction />,
        icon: <LucideIcons.Component />,
        dropdownItems: [...APP_PATHS.COMPONENTS.dropdownItems],
      },
      {
        name: APP_PATHS.FEATURES.name,
        path: APP_PATHS.FEATURES.path,
        icon: <LucideIcons.Layers />,
        component: <FeaturesIntroduction />,
        dropdownItems: [...APP_PATHS.FEATURES.dropdownItems],
      },
      {
        name: APP_PATHS.TAILWIND_UTILITIES.name,
        path: APP_PATHS.TAILWIND_UTILITIES.path,
        icon: <LucideIcons.Layout />,
        component: <TailwindIntroduction />,
        dropdownItems: [...APP_PATHS.TAILWIND_UTILITIES.dropdownItems],
      },
    ],
    []
  );

  return { menuItems };
};

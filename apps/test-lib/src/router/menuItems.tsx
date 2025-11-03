import { useMemo } from 'react';
import { LucideIcons, type AppRoutesMenuItem } from '@tucu-ui';
import { Introduction } from '../pages/introduction';
import { DesignSystem } from '../pages/DesignSystem';
import { ThemingGuide } from '../pages/ThemingGuide';
import { FormSystem } from '../pages/form-system';
import { Blockchain } from '../pages/Blockchain';
import { Accessibility } from '../pages/Accessibility';
import { LayoutSystem } from '../pages/LayoutSystem';
import { IconsSystem } from '../pages/IconsSystem';
import { HooksUtilities } from '../pages/HooksUtilities';
import { Colors } from '../pages/Colors';
import { LayoutUtilities } from '../pages/tailwind/LayoutUtilities';
import { TailwindV4 } from '../pages/TailwindV4';
import { Features } from '../pages/Features';
import { Components } from '../pages/Components';
import { FlexboxGridUtilities } from '../pages/tailwind/FlexboxGridUtilities';
import { BackgroundUtilities } from '../pages/tailwind/BackgroundUtilities';
import { EffectsUtilities } from '../pages/tailwind/EffectsUtilities';
import { FiltersUtilities } from '../pages/tailwind/FiltersUtilities';
import { TablesUtilities } from '../pages/tailwind/TablesUtilities';
import { TransitionsAnimations } from '../pages/tailwind/TransitionsAnimations';
import { TransformsUtilities } from '../pages/tailwind/TransformsUtilities';
import { InteractivityUtilities } from '../pages/tailwind/InteractivityUtilities';
import { SVGUtilities } from '../pages/tailwind/SVGUtilities';
import { AccessibilityUtilities } from '../pages/tailwind/AccessibilityUtilities';
import { BordersUtilities } from '../pages/tailwind/BordersUtilities';
import { TypographyUtilities } from '../pages/tailwind/TypographyUtilities';
import FormExamplePage from '../pages/form-system/form-example-page';
import CodeExamplePage from '../pages/form-system/code-example-page';

export const useMenuItems = () => {
  const menuItems: AppRoutesMenuItem[] = useMemo(
    () => [
      {
        name: 'Introduction',
        href: '/',
        icon: <LucideIcons.Home />,
        component: <Introduction />,
      },
      {
        name: 'Theming',
        href: '/theming-guide',
        icon: <LucideIcons.Paintbrush />,
        component: <ThemingGuide />,
        dropdownItems: [
          {
            name: 'Layout',
            href: '/layout-system',
            icon: <LucideIcons.Layout />,
            component: <LayoutSystem />,
          },
          {
            name: 'Design',
            href: '/design-system',
            icon: <LucideIcons.LampDesk />,
            component: <DesignSystem />,
          },
          {
            name: 'Colors',
            href: '/colors',
            icon: <LucideIcons.Palette />,
            component: <Colors />,
          },
        ],
      },
      {
        name: 'Components',
        href: '/components',
        component: <Components />,
        icon: <LucideIcons.Component />,
        dropdownItems: [
          {
            name: 'Form',
            href: '/form-system',
            icon: <LucideIcons.FileText />,
            component: <FormSystem />,
          },
          {
            name: 'Form Example',
            href: '/form-system/example',
            icon: <LucideIcons.FormInput />,
            component: <FormExamplePage />,
          },
          {
            name: 'Code Example',
            href: '/form-system/code-example',
            icon: <LucideIcons.Code />,
            component: <CodeExamplePage />,
          },
          {
            name: 'Blockchain',
            href: '/blockchain',
            icon: <LucideIcons.Coins />,
            component: <Blockchain />,
          },
        ],
      },
      {
        name: 'Features',
        href: '/features',
        icon: <LucideIcons.Layers />,
        component: <Features />,
        dropdownItems: [
          {
            name: 'Icons',
            href: '/icons-system',
            icon: <LucideIcons.Sparkles />,
            component: <IconsSystem />,
          },
          {
            name: 'Accessibility',
            href: '/accessibility',
            icon: <LucideIcons.Eye />,
            component: <Accessibility />,
          },
          {
            name: 'Hooks',
            href: '/hooks-utilities',
            icon: <LucideIcons.Settings />,
            component: <HooksUtilities />,
          },
        ],
      },
      {
        name: 'TailwindV4',
        href: '/tailwind-utilities',
        icon: <LucideIcons.Layout />,
        component: <TailwindV4 />,
        dropdownItems: [
          {
            name: 'Layout Utilities',
            href: '/tailwind-utilities/layout-utilities',
            icon: <LucideIcons.Layout />,
            component: <LayoutUtilities />,
          },
          {
            name: 'Flexbox & Grid',
            href: '/tailwind-utilities/flexbox-grid',
            icon: <LucideIcons.Grid3X3 />,
            component: <FlexboxGridUtilities />,
          },
          {
            name: 'Background',
            href: '/tailwind-utilities/background',
            icon: <LucideIcons.Image />,
            component: <BackgroundUtilities />,
          },
          {
            name: 'Borders',
            href: '/tailwind-utilities/borders',
            icon: <LucideIcons.Square />,
            component: <BordersUtilities />,
          },
          {
            name: 'Typography',
            href: '/tailwind-utilities/typography',
            icon: <LucideIcons.Type />,
            component: <TypographyUtilities />,
          },
          {
            name: 'Effects',
            href: '/tailwind-utilities/effects',
            icon: <LucideIcons.Sparkles />,
            component: <EffectsUtilities />,
          },
          {
            name: 'Filters',
            href: '/tailwind-utilities/filters',
            icon: <LucideIcons.Filter />,
            component: <FiltersUtilities />,
          },
          {
            name: 'Tables',
            href: '/tailwind-utilities/tables',
            icon: <LucideIcons.Table />,
            component: <TablesUtilities />,
          },
          {
            name: 'Transitions',
            href: '/tailwind-utilities/transitions',
            icon: <LucideIcons.Play />,
            component: <TransitionsAnimations />,
          },
          {
            name: 'Transforms',
            href: '/tailwind-utilities/transforms',
            icon: <LucideIcons.Move3D />,
            component: <TransformsUtilities />,
          },
          {
            name: 'Interactivity',
            href: '/tailwind-utilities/interactivity',
            icon: <LucideIcons.MousePointerClick />,
            component: <InteractivityUtilities />,
          },
          {
            name: 'SVG',
            href: '/tailwind-utilities/svg',
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
            href: '/tailwind-utilities/accessibility',
            icon: <LucideIcons.Accessibility />,
            component: <AccessibilityUtilities />,
          },
        ],
      },
    ],
    []
  );

  return { menuItems };
};

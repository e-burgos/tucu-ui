import { useMemo } from 'react';
import { LucideIcons, type AppRoutesMenuItem } from 'tucu-ui';
import { Introduction } from '../pages/Introduction';
import { DesignSystem } from '../pages/DesignSystem';
import { ThemingGuide } from '../pages/ThemingGuide';
import { FormSystem } from '../pages/form-system';
import { Blockchain } from '../pages/Blockchain';
import { Accessibility } from '../pages/Accessibility';
import { LayoutSystem } from '../pages/LayoutSystem';
import { IconsSystem } from '../pages/IconsSystem';
import { HooksUtilities } from '../pages/HooksUtilities';
import { Colors } from '../pages/Colors';
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
        name: 'Design',
        href: '/design-system',
        icon: <LucideIcons.Palette />,
        component: <DesignSystem />,
        dropdownItems: [
          {
            name: 'Colors',
            href: '/colors',
            icon: <LucideIcons.Palette />,
            component: <Colors />,
          },
        ],
      },
      {
        name: 'Theming',
        href: '/theming-guide',
        icon: <LucideIcons.Paintbrush />,
        component: <ThemingGuide />,
      },
      {
        name: 'Form',
        href: '/form-system',
        icon: <LucideIcons.FileText />,
        component: <FormSystem />,
        dropdownItems: [
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
        ],
      },
      {
        name: 'Blockchain',
        href: '/blockchain',
        icon: <LucideIcons.Coins />,
        component: <Blockchain />,
      },
      {
        name: 'Accessibility',
        href: '/accessibility',
        icon: <LucideIcons.Eye />,
        component: <Accessibility />,
      },
      {
        name: 'Layout',
        href: '/layout-system',
        icon: <LucideIcons.Layout />,
        component: <LayoutSystem />,
      },
      {
        name: 'Icons',
        href: '/icons-system',
        icon: <LucideIcons.Sparkles />,
        component: <IconsSystem />,
      },
      {
        name: 'Hooks',
        href: '/hooks-utilities',
        icon: <LucideIcons.Settings />,
        component: <HooksUtilities />,
      },
    ],
    []
  );

  return { menuItems };
};

import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  SidebarMenu,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';

import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';
const SidebarMenuSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="SidebarMenu"
        description="A sidebar component with built-in menu navigation, supporting icons,
          paths, and dropdown items."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-yellow-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.LayoutList className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic Sidebar Menu
                </Typography>
                <Typography tag="p" className="mb-4 text-sm text-gray-600">
                  Note: SidebarMenu is typically used within a Drawer component.
                  This example shows the structure.
                </Typography>
                <Typography tag="p" className="text-sm">
                  The SidebarMenu component provides a navigation menu with
                  icons and links, perfect for mobile navigation drawers.
                </Typography>
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
      <PropPlayground
        componentName="SidebarMenu"
        title="SidebarMenu Playground"
        defaultValues={{
          title: 'Navigation',
          position: 'left',
        }}
        excludeProps={[
          'menuItems',
          'onClose',
          'actionContent',
          'logo',
          'className',
        ]}
      >
        {(props) => (
          <SidebarMenu
            {...props}
            menuItems={[
              { name: 'Home', href: '#' },
              { name: 'Settings', href: '#' },
              { name: 'Profile', href: '#' },
            ]}
            onClose={() => null}
          />
        )}
      </PropPlayground>

      <AutoPropsTable componentName="SidebarMenu" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { SidebarMenu, LucideIcons } from '@e-burgos/tucu-ui';

const menuItems = [
  {
    name: 'Home',
    icon: <LucideIcons.Home className="w-5 h-5" />,
    path: '/home',
  },
  {
    name: 'Settings',
    icon: <LucideIcons.Settings className="w-5 h-5" />,
    path: '/settings',
  },
];

// Basic usage (typically within Drawer)
<SidebarMenu
  menuItems={menuItems}
  onClose={() => setIsOpen(false)}
/>

// With title
<SidebarMenu
  menuItems={menuItems}
  title="Navigation"
  onClose={() => setIsOpen(false)}
/>

// With logo
<SidebarMenu
  menuItems={menuItems}
  logo={{ name: 'MyApp' }}
  onClose={() => setIsOpen(false)}
/>

// With dropdown items
const menuItemsWithDropdown = [
  {
    name: 'Products',
    path: '/products',
    dropdownItems: [
      { name: 'All Products', path: '/products/all' },
      { name: 'Featured', path: '/products/featured' },
    ],
  },
];`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default SidebarMenuSection;

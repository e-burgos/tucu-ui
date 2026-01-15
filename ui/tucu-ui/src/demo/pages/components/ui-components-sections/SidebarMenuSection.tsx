import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  SidebarMenu,
  LucideIcons,
} from '../../../../index';

const SidebarMenuSection: React.FC = () => {
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
    {
      name: 'Profile',
      icon: <LucideIcons.User className="w-5 h-5" />,
      path: '/profile',
    },
  ];

  const propsTableColumns = [
    {
      key: 'prop',
      label: 'Prop',
      render: (value: unknown) => (
        <code className="text-xs text-brand">{String(value)}</code>
      ),
    },
    {
      key: 'type',
      label: 'Type',
      render: (value: unknown) => (
        <code className="text-xs">{String(value)}</code>
      ),
    },
    {
      key: 'default',
      label: 'Default',
      render: (value: unknown) => {
        const val = String(value);
        if (val === 'required') {
          return <span className="text-xs text-red-500">required</span>;
        }
        return <code className="text-xs">{val}</code>;
      },
    },
    {
      key: 'description',
      label: 'Description',
    },
  ];

  const propsData = [
    {
      prop: 'menuItems',
      type: 'IMenuItem[]',
      default: 'required',
      description: 'Array of menu items to display',
    },
    {
      prop: 'children',
      type: 'React.ReactNode',
      default: '-',
      description: 'Additional content to display',
    },
    {
      prop: 'title',
      type: 'string',
      default: '-',
      description: 'Title for the sidebar menu',
    },
    {
      prop: 'logo',
      type: 'LogoPropTypes',
      default: '-',
      description: 'Logo configuration',
    },
    {
      prop: 'actionContent',
      type: 'React.ReactNode',
      default: '-',
      description: 'Action buttons at the bottom',
    },
    {
      prop: 'onClose',
      type: '() => void',
      default: 'required',
      description: 'Callback when sidebar closes',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          SidebarMenu
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A sidebar component with built-in menu navigation, supporting icons,
          paths, and dropdown items.
        </Typography>
      </div>

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

      <CardContainer className="overflow-hidden">
        <CardTitle title="Props" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <BasicTable columns={propsTableColumns} data={propsData} />
          </div>
        </CardTitle>
      </CardContainer>

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

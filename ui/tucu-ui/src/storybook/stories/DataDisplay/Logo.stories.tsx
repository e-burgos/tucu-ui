import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryContainer } from '../../components/StoryContainer';
import { Logo } from '../../../components/logos';
import { PRESET_LABEL_COLORS } from '../../../themes/config';
import { ProfileIcon } from '../../../components/icons';

const meta: Meta<typeof Logo> = {
  title: '3. UI COMPONENTS/Data Display/Logo',
  component: Logo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "Component for displaying the brand's textual logo.",
      },
    },
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Main logo name',
    },
    secondName: {
      control: 'text',
      description: 'Secondary logo name (optional)',
    },
    path: {
      control: 'text',
      description: 'Path to the logo',
    },
    preset: {
      control: 'select',
      options: Object.keys(PRESET_LABEL_COLORS),
      description: 'Color preset for the secondName',
    },
    className: {
      control: 'text',
      description: 'Class CSS additional',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'xlarge'],
      description: 'Size of the logo',
    },
    isoType: {
      control: 'boolean',
      description: 'If true, the logo will be displayed in ISO type',
    },
    logo: {
      control: 'object',
      description: 'Logo to be displayed',
    },
  },
  args: {
    name: 'Tucu',
    secondName: 'UI',
    path: '/',
    preset: PRESET_LABEL_COLORS.GREEN,
    size: 'medium',
    isoType: false,
    logo: <ProfileIcon className="w-4 h-4" />,
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  render: (args) => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Basic Logo</h2>
        <div className="flex items-center justify-center">
          <Logo {...args} />
        </div>
      </div>
    </StoryContainer>
  ),
};

export const ColorPresets: Story = {
  render: (args) => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Color Presets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(PRESET_LABEL_COLORS).map(([key, value]) => (
            <div
              key={key}
              className="flex flex-col items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xs"
            >
              <h3 className="text-base font-medium capitalize">{key}</h3>
              <div className="flex items-center justify-center h-16">
                <Logo {...args} preset={value} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </StoryContainer>
  ),
};

export const OnlyPrimaryName: Story = {
  args: {
    name: 'Tucu',
    secondName: undefined,
  },
  render: (args) => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Only Primary Name</h2>
        <div className="flex items-center justify-center">
          <Logo {...args} />
        </div>
      </div>
    </StoryContainer>
  ),
};

export const DifferentSizes: Story = {
  args: {
    isoType: true,
  },

  render: (args) => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Different Sizes</h2>
        <div className="space-y-8">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xs">
            <h3 className="text-base font-medium mb-4">Small</h3>
            <div className="flex justify-center">
              <Logo {...args} />
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xs">
            <h3 className="text-base font-medium mb-4">Medium (Default)</h3>
            <div className="flex justify-center">
              <Logo {...args} size="medium" />
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xs">
            <h3 className="text-base font-medium mb-4">Large</h3>
            <div className="flex justify-center">
              <Logo {...args} size="large" />
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xs">
            <h3 className="text-base font-medium mb-4">XLarge</h3>
            <div className="flex justify-center">
              <Logo {...args} size="xlarge" />
            </div>
          </div>
        </div>
      </div>
    </StoryContainer>
  ),
};

export const UsageExamples: Story = {
  render: (args) => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Usage Examples</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">In a Header</h3>
          <div className="bg-white dark:bg-gray-800 p-4 flex items-center justify-between rounded-lg shadow-xs">
            <Logo {...args} isoType={true} />
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">In a Sidebar</h3>
          <div className="bg-white dark:bg-gray-800 p-4 w-64 h-80 rounded-lg shadow-xs">
            <div className="flex items-center justify-center mb-8">
              <Logo {...args} />
            </div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-100 dark:bg-gray-700 rounded-md"></div>
              <div className="h-8 bg-gray-100 dark:bg-gray-700 rounded-md"></div>
              <div className="h-8 bg-gray-100 dark:bg-gray-700 rounded-md"></div>
              <div className="h-8 bg-gray-100 dark:bg-gray-700 rounded-md"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">In a Footer</h3>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <Logo {...args} />
              <div className="text-sm text-gray-500 dark:text-gray-400">
                © 2023 TucuUI. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </StoryContainer>
  ),
};

export const AdvancedCustomization: Story = {
  args: {
    isoType: true,
  },

  render: (args) => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Advanced Customization</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xs">
            <h3 className="text-base font-medium mb-4">Custom Background</h3>
            <div className="flex justify-center p-4 bg-linear-to-r from-blue-500 to-purple-500 rounded-lg">
              <Logo {...args} />
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xs">
            <h3 className="text-base font-medium mb-4">With Shadow</h3>
            <div className="flex justify-center">
              <Logo {...args} className="drop-shadow-lg" />
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xs">
            <h3 className="text-base font-medium mb-4">With Animation</h3>
            <div className="flex justify-center">
              <Logo
                {...args}
                className="hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xs">
            <h3 className="text-base font-medium mb-4">With Spacing</h3>
            <div className="flex justify-center">
              <Logo {...args} className="tracking-wider" />
            </div>
          </div>
        </div>
      </div>
    </StoryContainer>
  ),
};

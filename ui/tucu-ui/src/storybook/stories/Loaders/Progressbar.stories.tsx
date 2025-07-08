import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryContainer } from '../../components/StoryContainer';
import { Progressbar } from '../../../components/loaders';

// Meta for Loader
const meta: Meta<typeof Progressbar> = {
  title: 'UI COMPONENTS/Loaders/Progressbar',
  component: Progressbar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Progressbar component for indicating progress and loading states in the application.',
      },
    },
  },
  argTypes: {
    value: {
      control: 'number',
      description: 'The value of the progressbar',
    },
    color: {
      control: 'select',
      options: [
        'DEFAULT',
        'primary',
        'secondary',
        'success',
        'danger',
        'info',
        'warning',
      ],
      description: 'The color of the progressbar',
    },
    variant: {
      control: 'select',
      options: ['solid', 'flat'],
      description: 'The variant of the progressbar',
    },
    rounded: {
      control: 'select',
      options: ['DEFAULT', 'sm', 'md', 'lg', 'xl'],
      description: 'The roundedness of the progressbar',
    },
    label: {
      control: 'text',
      description: 'The label of the progressbar',
    },
    labelClassName: {
      control: 'text',
      description: 'The class name of the label',
    },
    barClassName: {
      control: 'text',
      description: 'The class name of the bar',
    },
    size: {
      control: 'select',
      options: ['DEFAULT', 'sm', 'md', 'lg', 'xl'],
      description: 'The size of the progressbar',
    },
  },
  args: {
    value: 50,
    color: 'primary',
    variant: 'solid',
    rounded: 'DEFAULT',
    label: '50%',
  },
};

export default meta;
type Story = StoryObj<typeof Progressbar>;

// Progressbar stories
export const DefaultProgressbar: Story = {
  args: {
    value: 50,
    color: 'primary',
    variant: 'solid',
    rounded: 'DEFAULT',
    label: '50%',
  },
  render: (args) => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Default Progressbar</h2>
        <div className="w-full">
          <Progressbar {...args} />
        </div>
      </div>
    </StoryContainer>
  ),
};

export const ProgressbarSizes: Story = {
  render: () => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Progressbar Sizes</h2>
        <div className="space-y-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Small</h3>
            <Progressbar value={70} size="sm" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Default</h3>
            <Progressbar value={70} />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Large</h3>
            <Progressbar value={70} size="lg" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Extra Large (with label)</h3>
            <Progressbar value={70} size="xl" label="70%" />
          </div>
        </div>
      </div>
    </StoryContainer>
  ),
};

export const ProgressbarColors: Story = {
  render: () => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Progressbar Colors</h2>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Default</h3>
            <Progressbar value={60} />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Primary</h3>
            <Progressbar value={65} color="primary" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Secondary</h3>
            <Progressbar value={70} color="secondary" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Success</h3>
            <Progressbar value={75} color="success" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Danger</h3>
            <Progressbar value={80} color="danger" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Info</h3>
            <Progressbar value={85} color="info" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Warning</h3>
            <Progressbar value={90} color="warning" />
          </div>
        </div>
      </div>
    </StoryContainer>
  ),
};

export const ProgressbarVariants: Story = {
  render: () => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Progressbar Variants</h2>
        <div className="space-y-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Solid (Default)</h3>
            <div className="space-y-4">
              <Progressbar value={60} color="primary" variant="solid" />
              <Progressbar value={70} color="secondary" variant="solid" />
              <Progressbar value={80} color="success" variant="solid" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Flat</h3>
            <div className="space-y-4">
              <Progressbar value={60} color="primary" variant="flat" />
              <Progressbar value={70} color="secondary" variant="flat" />
              <Progressbar value={80} color="success" variant="flat" />
            </div>
          </div>
        </div>
      </div>
    </StoryContainer>
  ),
};

export const ProgressbarRounded: Story = {
  render: () => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Progressbar Rounded</h2>
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">None</h3>
            <Progressbar value={75} color="primary" rounded-sm="none" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Small</h3>
            <Progressbar value={75} color="primary" rounded-sm="sm" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Medium</h3>
            <Progressbar value={75} color="primary" rounded-sm="md" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Large</h3>
            <Progressbar value={75} color="primary" rounded-sm="lg" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Full (Default)</h3>
            <Progressbar value={75} color="primary" />
          </div>
        </div>
      </div>
    </StoryContainer>
  ),
};

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryContainer } from '../../components/StoryContainer';
import { Loader } from '../../../components/loaders';

// Meta for Loader
const meta: Meta<typeof Loader> = {
  title: '3. UI COMPONENTS/Loaders/Loader',
  component: Loader,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Loading components for indicating progress and loading states in the application.',
      },
    },
  },
  argTypes: {
    tag: {
      control: 'select',
      options: ['div', 'span'],
      description: 'The tag of the loader',
    },
    variant: {
      control: 'select',
      options: ['moveUp', 'blink', 'scaleUp'],
      description: 'The variant of the loader',
    },
    size: {
      control: 'select',
      options: ['large', 'medium', 'small'],
      description: 'The size of the loader',
    },
    showOnlyThreeDots: {
      control: 'boolean',
      description: 'Whether to show only three dots',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'info', 'warning'],
      description: 'The color of the loader',
    },
  },
  args: {
    variant: 'moveUp',
    color: 'primary',
    size: 'medium',
    showOnlyThreeDots: false,
    tag: 'div',
    className: '',
  },
};

export default meta;
type Story = StoryObj<typeof Loader>;

// Loader stories
export const DefaultLoader: Story = {
  args: {
    variant: 'moveUp',
    color: 'primary',
    size: 'medium',
    showOnlyThreeDots: false,
    tag: 'div',
    className: '',
  },
  render: (args) => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Default Loader</h2>
        <div className="flex items-center justify-center">
          <Loader {...args} />
        </div>
      </div>
    </StoryContainer>
  ),
};

export const LoaderVariants: Story = {
  render: () => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Loader Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">MoveUp (Default)</h3>
            <Loader variant="moveUp" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Blink</h3>
            <Loader variant="blink" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">ScaleUp</h3>
            <Loader variant="scaleUp" />
          </div>
        </div>
      </div>
    </StoryContainer>
  ),
};

export const LoaderSizes: Story = {
  render: () => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Loader Sizes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Small</h3>
            <Loader size="small" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Medium (Default)</h3>
            <Loader size="medium" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Large</h3>
            <Loader size="large" />
          </div>
        </div>
      </div>
    </StoryContainer>
  ),
};

export const LoaderColors: Story = {
  render: () => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Loader Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Primary</h3>
            <Loader color="primary" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Green</h3>
            <Loader color="success" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Red</h3>
            <Loader color="danger" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Yellow</h3>
            <Loader color="warning" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Purple</h3>
            <Loader color="info" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Gray</h3>
            <Loader color="gray" />
          </div>
        </div>
      </div>
    </StoryContainer>
  ),
};

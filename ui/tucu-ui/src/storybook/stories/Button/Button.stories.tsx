import type { Meta, StoryFn } from '@storybook/react-vite';
import Button from '../../../components/buttons';
import { StoryContainer } from '../../components/StoryContainer';
import React from 'react';

const meta: Meta<typeof Button> = {
  title: '3. UI COMPONENTS/Buttons/Button',
  tags: ['autodocs'],
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          'The Button component is a versatile and customizable button that supports various shapes, sizes, variants, and colors. It includes loading states, animations, and tooltip support.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'ghost', 'transparent'],
      description: 'The visual style variant of the button',
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'white',
        'gray',
        'success',
        'info',
        'warning',
        'danger',
      ],
      description: 'The color scheme of the button',
    },
    shape: {
      control: 'select',
      options: ['rounded', 'pill', 'circle'],
      description: 'The shape of the button',
    },
    size: {
      control: 'select',
      options: ['large', 'medium', 'small', 'mini', 'tiny'],
      description: 'The size of the button',
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    fullWidth: {
      control: 'boolean',
      description:
        'Whether the button should take up the full width of its container',
    },
    tooltip: {
      control: 'text',
      description: 'Optional tooltip text to display on hover',
    },
    onClick: {
      action: 'clicked',
      description: 'Function called when the button is clicked',
    },
  },
  args: {
    children: 'Button',
    color: 'primary',
    variant: 'solid',
    shape: 'pill',
    size: 'medium',
    fullWidth: false,
    disabled: false,
    isLoading: false,
  },
};

export default meta;

const Template: StoryFn<typeof Button> = (args) => (
  <StoryContainer>
    <Button {...args} />
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {};

export const Ghost = Template.bind({});
Ghost.args = {
  variant: 'ghost',
  children: 'Ghost Button',
};

export const Transparent = Template.bind({});
Transparent.args = {
  variant: 'transparent',
  children: 'Transparent Button',
};

export const CircleShape = Template.bind({});
CircleShape.args = {
  shape: 'circle',
  children: '+',
  size: 'large',
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
  children: 'Loading',
};

export const WithTooltip = Template.bind({});
WithTooltip.args = {
  tooltip: 'This is a tooltip',
  children: 'Hover Me',
};

export const Danger = Template.bind({});
Danger.args = {
  color: 'danger',
  children: 'Delete',
};

export const Success = Template.bind({});
Success.args = {
  color: 'success',
  children: 'Confirm',
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  fullWidth: true,
  children: 'Full Width Button',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  children: 'Disabled Button',
};

export const Mini = Template.bind({});
Mini.args = {
  size: 'mini',
  children: 'Mini',
};

import type { Meta, StoryFn } from '@storybook/react-vite';
import { Hamburger } from '../../../components/buttons';
import { StoryContainer } from '../../components/StoryContainer';

const meta: Meta<typeof Hamburger> = {
  title: 'UI COMPONENTS/Buttons/Hamburger',
  tags: ['autodocs'],
  component: Hamburger,
  parameters: {
    docs: {
      description: {
        component:
          'The Hamburger component is an animated hamburger menu button that toggles between open and closed states, typically used for mobile navigation menus.',
      },
    },
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description:
        'Controls whether the hamburger menu is in open or closed state',
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
      description: 'The color of the hamburger button',
    },
    variant: {
      control: 'select',
      options: ['solid', 'ghost', 'transparent'],
      description: 'The visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['large', 'medium', 'small', 'mini'],
      description: 'The size of the hamburger button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    onClick: {
      action: 'clicked',
      description: 'Function called when the button is clicked',
    },
  },
  args: {
    isOpen: false,
    color: 'primary',
    variant: 'solid',
    size: 'medium',
    disabled: false,
  },
};

export default meta;

const Template: StoryFn<typeof Hamburger> = (args) => (
  <StoryContainer>
    <Hamburger {...args} />
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {};

export const Open = Template.bind({});
Open.args = {
  isOpen: true,
};

export const Transparent = Template.bind({});
Transparent.args = {
  variant: 'transparent',
};

export const Ghost = Template.bind({});
Ghost.args = {
  variant: 'ghost',
};

export const White = Template.bind({});
White.args = {
  color: 'white',
  variant: 'solid',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { Avatar } from '../../../components/common';
import { StoryContainer } from '../../components/StoryContainer';

const meta: Meta<typeof Avatar> = {
  title: 'UI COMPONENTS/Data Display/Avatar',
  tags: ['autodocs'],
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component:
          "The Avatar component displays a user's profile picture. It supports different sizes and shapes, with options for circle or rounded-sm square formats.",
      },
    },
  },
  argTypes: {
    image: {
      control: 'text',
      description: 'URL or imported image for the avatar',
    },
    alt: {
      control: 'text',
      description: 'Alternative text for the image',
    },
    size: {
      control: 'select',
      options: ['xl', 'lg', 'md', 'sm', 'xs'],
      description: 'Size of the avatar',
    },
    shape: {
      control: 'select',
      options: ['circle', 'rounded'],
      description: 'Shape of the avatar',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    border: {
      control: 'boolean',
      description: 'Whether to show the border',
    },
  },
  args: {
    image: '/src/assets/images/avatar/1.png',
    alt: 'Avatar',
    size: 'md',
    shape: 'circle',
    border: true,
  },
};

export default meta;

const Template: StoryFn<typeof Avatar> = (args) => (
  <StoryContainer>
    <Avatar {...args} />
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {};

export const ExtraLarge = Template.bind({});
ExtraLarge.args = {
  size: 'xl',
};

export const Large = Template.bind({});
Large.args = {
  size: 'lg',
  image: '/src/assets/images/avatar/2.png',
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'md',
};

export const Small = Template.bind({});
Small.args = {
  size: 'sm',
  image: '/src/assets/images/avatar/3.png',
};

export const ExtraSmall = Template.bind({});
ExtraSmall.args = {
  size: 'xs',
  image: '/src/assets/images/avatar/4.png',
};

export const RoundedShape = Template.bind({});
RoundedShape.args = {
  shape: 'rounded',
  image: '/src/assets/images/collection/collection-1.jpg',
};

export const CircleShape = Template.bind({});
CircleShape.args = {
  shape: 'circle',
};

export const WithCustomClass = Template.bind({});
WithCustomClass.args = {
  className: 'border-4 border-blue-500',
};

export const AllSizes = () => (
  <StoryContainer>
    <div className="flex flex-wrap gap-4 items-end justify-center">
      <div className="flex flex-col items-center">
        <Avatar
          size="xl"
          image={'/src/assets/images/avatar/1.png'}
          alt="XL Avatar"
        />
        <span className="mt-2 text-sm">XL</span>
      </div>
      <div className="flex flex-col items-center">
        <Avatar
          size="lg"
          image={'/src/assets/images/avatar/2.png'}
          alt="Large Avatar"
        />
        <span className="mt-2 text-sm">Large</span>
      </div>
      <div className="flex flex-col items-center">
        <Avatar
          size="md"
          image={'/src/assets/images/avatar/3.png'}
          alt="Medium Avatar"
        />
        <span className="mt-2 text-sm">Medium</span>
      </div>
      <div className="flex flex-col items-center">
        <Avatar
          size="sm"
          image={'/src/assets/images/avatar/4.png'}
          alt="Small Avatar"
        />
        <span className="mt-2 text-sm">Small</span>
      </div>
      <div className="flex flex-col items-center">
        <Avatar
          size="xs"
          image={'/src/assets/images/avatar/1.png'}
          alt="XS Avatar"
        />
        <span className="mt-2 text-sm">XS</span>
      </div>
    </div>
  </StoryContainer>
);

export const BothShapes = () => (
  <StoryContainer>
    <div className="flex flex-wrap gap-8 items-center justify-center">
      <div className="flex flex-col items-center">
        <Avatar
          shape="circle"
          image={'/src/assets/images/avatar/2.png'}
          alt="Circle Avatar"
          size="xl"
        />
        <span className="mt-2">Circle</span>
      </div>
      <div className="flex flex-col items-center">
        <Avatar
          shape="rounded"
          image={'/src/assets/images/collection/collection-1.jpg'}
          alt="Rounded Avatar"
          size="xl"
        />
        <span className="mt-2">Rounded</span>
      </div>
    </div>
  </StoryContainer>
);

import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { Avatar } from '../../../components/common';
import { StoryContainer } from '../../components/StoryContainer';

import AvatarImage1 from '../../../assets/images/avatar/1.png';
import AvatarImage2 from '../../../assets/images/avatar/2.png';
import AvatarImage3 from '../../../assets/images/avatar/3.png';
import AvatarImage4 from '../../../assets/images/avatar/4.png';

const meta: Meta<typeof Avatar> = {
  title: 'UI COMPONENTS/Common/Avatar',
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
    width: {
      control: 'text',
      description: 'Custom width in pixels',
    },
    height: {
      control: 'text',
      description: 'Custom height in pixels',
    },
  },
  args: {
    image: AvatarImage1,
    alt: 'Avatar',
    size: 'md',
    shape: 'circle',
    width: '100%',
    height: '100%',
  },
};

export default meta;

const Template: StoryFn<typeof Avatar> = (args) => (
  <StoryContainer className="justify-center items-center">
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
  image: AvatarImage2,
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'md',
};

export const Small = Template.bind({});
Small.args = {
  size: 'sm',
  image: AvatarImage3,
};

export const ExtraSmall = Template.bind({});
ExtraSmall.args = {
  size: 'xs',
  image: AvatarImage4,
};

export const RoundedShape = Template.bind({});
RoundedShape.args = {
  shape: 'rounded',
  image: AvatarImage2,
};

export const CircleShape = Template.bind({});
CircleShape.args = {
  shape: 'circle',
};

export const CustomDimensions = Template.bind({});
CustomDimensions.args = {
  width: '100%',
  height: '100%',
  image: AvatarImage3,
};

export const WithCustomClass = Template.bind({});
WithCustomClass.args = {
  className: 'border-4 border-blue-500',
};

export const AllSizes = () => (
  <StoryContainer className="justify-center items-center">
    <div className="flex flex-wrap gap-4 items-end justify-center">
      <div className="flex flex-col items-center">
        <Avatar
          size="xl"
          image={AvatarImage1}
          alt="XL Avatar"
          width="100%"
          height="100%"
        />
        <span className="mt-2 text-sm">XL</span>
      </div>
      <div className="flex flex-col items-center">
        <Avatar
          size="lg"
          image={AvatarImage2}
          alt="Large Avatar"
          width="100%"
          height="100%"
        />
        <span className="mt-2 text-sm">Large</span>
      </div>
      <div className="flex flex-col items-center">
        <Avatar size="md" image={AvatarImage3} alt="Medium Avatar" />
        <span className="mt-2 text-sm">Medium</span>
      </div>
      <div className="flex flex-col items-center">
        <Avatar size="sm" image={AvatarImage4} alt="Small Avatar" />
        <span className="mt-2 text-sm">Small</span>
      </div>
      <div className="flex flex-col items-center">
        <Avatar size="xs" image={AvatarImage1} alt="XS Avatar" />
        <span className="mt-2 text-sm">XS</span>
      </div>
    </div>
  </StoryContainer>
);

export const BothShapes = () => (
  <StoryContainer className="justify-center items-center">
    <div className="flex flex-wrap gap-8 items-center justify-center">
      <div className="flex flex-col items-center">
        <Avatar
          shape="circle"
          image={AvatarImage2}
          alt="Circle Avatar"
          size="lg"
          width="100%"
          height="100%"
        />
        <span className="mt-2">Circle</span>
      </div>
      <div className="flex flex-col items-center">
        <Avatar
          shape="rounded"
          image={AvatarImage3}
          alt="Rounded Avatar"
          width="100%"
          height="100%"
        />
        <span className="mt-2">Rounded</span>
      </div>
    </div>
  </StoryContainer>
);

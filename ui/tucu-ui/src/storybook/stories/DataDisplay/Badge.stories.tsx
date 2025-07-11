import type { Meta, StoryFn } from '@storybook/react-vite';
import { Badge } from '../../../components/common';
import { StoryContainer } from '../../components/StoryContainer';
import React from 'react';

const meta: Meta<typeof Badge> = {
  title: '3. UI COMPONENTS/Data Display/Badge',
  tags: ['autodocs'],
  component: Badge,
  parameters: {
    docs: {
      description: {
        component:
          "The Badge component is used to highlight an item's status for quick recognition. It can show different statuses (active/inactive) and comes in various sizes and styles.",
      },
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'The content to display inside the badge',
    },
    status: {
      control: 'select',
      options: ['active', 'inactive'],
      description: 'The status determines the color of the badge',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the badge',
    },
    variant: {
      control: 'select',
      options: ['default', 'outline'],
      description: 'The visual style variant of the badge',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  args: {
    children: 'Badge',
    status: 'active',
    size: 'sm',
    variant: 'default',
  },
};

export default meta;

const Template: StoryFn<typeof Badge> = (args) => (
  <StoryContainer>
    <Badge {...args} />
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {};

export const Active = Template.bind({});
Active.args = {
  children: 'Active',
  status: 'active',
};

export const Inactive = Template.bind({});
Inactive.args = {
  children: 'Inactive',
  status: 'inactive',
};

export const SmallSize = Template.bind({});
SmallSize.args = {
  children: 'Small',
  size: 'sm',
};

export const MediumSize = Template.bind({});
MediumSize.args = {
  children: 'Medium',
  size: 'md',
};

export const LargeSize = Template.bind({});
LargeSize.args = {
  children: 'Large',
  size: 'lg',
};

export const OutlineVariant = Template.bind({});
OutlineVariant.args = {
  children: 'Outline',
  variant: 'outline',
};

export const DefaultVariant = Template.bind({});
DefaultVariant.args = {
  children: 'Default',
  variant: 'default',
};

export const CustomClass = Template.bind({});
CustomClass.args = {
  children: 'Custom',
  className: 'bg-purple-500/10 border border-purple-500',
};

export const AllVariants = () => (
  <StoryContainer>
    <div className="flex flex-wrap gap-4 items-center justify-center">
      <Badge status="active" size="sm">
        Active Small
      </Badge>
      <Badge status="active" size="md">
        Active Medium
      </Badge>
      <Badge status="active" size="lg">
        Active Large
      </Badge>
      <Badge status="inactive" size="sm">
        Inactive Small
      </Badge>
      <Badge status="inactive" size="md">
        Inactive Medium
      </Badge>
      <Badge status="inactive" size="lg">
        Inactive Large
      </Badge>
    </div>
  </StoryContainer>
);

export const OutlineVariants = () => (
  <StoryContainer>
    <div className="flex flex-wrap gap-4 items-center justify-center">
      <Badge variant="outline" size="sm">
        Outline Small
      </Badge>
      <Badge variant="outline" size="md">
        Outline Medium
      </Badge>
      <Badge variant="outline" size="lg">
        Outline Large
      </Badge>
    </div>
  </StoryContainer>
);

export const StatusIndicators = () => (
  <StoryContainer>
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Badge status="active" size="sm" />
        <span>System online</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge status="inactive" size="sm" />
        <span>System offline</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge
          className="bg-yellow-500/10 border border-yellow-500"
          size="sm"
        />
        <span>System maintenance</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge className="bg-blue-500/10 border border-blue-500" size="sm" />
        <span>System updating</span>
      </div>
    </div>
  </StoryContainer>
);

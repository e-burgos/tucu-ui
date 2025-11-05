/* eslint-disable jsx-a11y/accessible-emoji */
import type { Meta, StoryFn } from '@storybook/react-vite';
import { CarouselCards } from '../../../components/carousel';
import { StoryContainer } from '../../components/StoryContainer';
import React from 'react';
import Button from '../../../components/buttons';
import { Heart, Zap, Trophy, Target, Shield } from 'lucide-react';

const meta: Meta<typeof CarouselCards> = {
  title: '3. UI COMPONENTS/Sliders/Carousel Cards',
  tags: ['autodocs'],
  component: CarouselCards,
  parameters: {
    docs: {
      description: {
        component:
          'The CarouselCards component is a powerful and flexible carousel/slider component built with Swiper.js, designed to match the tucu-ui design system. It supports multiple effects, navigation controls, autoplay, and responsive design.',
      },
    },
  },
  argTypes: {
    cards: {
      control: 'object',
      description: 'Array of cards',
    },
    cardClassName: {
      control: 'text',
      description: 'Additional CSS classes to apply to the card container',
    },
    cardSize: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the card',
    },
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined', 'filled'],
    },
    showCardTitles: {
      control: 'boolean',
      description: 'Show card titles',
    },
  },
};

export default meta;

// Cards carousel examples
const sampleCards = [
  {
    title: 'Performance',
    description:
      'Lightning-fast performance with optimized rendering and lazy loading.',
    icon: <Zap className="w-8 h-8 text-yellow-500" />,
    footer: (
      <Button size="small" className="w-full">
        Learn More
      </Button>
    ),
  },
  {
    title: 'Reliability',
    description:
      'Built with TypeScript for type safety and robust error handling.',
    icon: <Shield className="w-8 h-8 text-green-500" />,
    footer: (
      <Button size="small" className="w-full">
        Get Started
      </Button>
    ),
  },
  {
    title: 'Accessibility',
    description: 'WCAG 2.1 AA compliant with full keyboard navigation support.',
    icon: <Target className="w-8 h-8 text-blue-500" />,
    footer: (
      <Button size="small" className="w-full">
        View Details
      </Button>
    ),
  },
  {
    title: 'Community',
    description:
      'Active community with comprehensive documentation and support.',
    icon: <Heart className="w-8 h-8 text-red-500" />,
    footer: (
      <Button size="small" className="w-full">
        Join Us
      </Button>
    ),
  },
  {
    title: 'Awards',
    description:
      'Recognized for excellence in design and developer experience.',
    icon: <Trophy className="w-8 h-8 text-purple-500" />,
    footer: (
      <Button size="small" className="w-full">
        See Awards
      </Button>
    ),
  },
];

export const CardsCarousel: StoryFn<typeof CarouselCards> = (args) => (
  <StoryContainer>
    <div className="w-full max-w-7xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Cards Carousel</h2>
      <CarouselCards {...args} />
    </div>
  </StoryContainer>
);

CardsCarousel.args = {
  cards: sampleCards,
  showNavigation: true,
  autoplay: { delay: 5000 },
  loop: true,
};

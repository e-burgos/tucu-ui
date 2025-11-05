/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { CarouselImage } from '../../../components/carousel';
import { StoryContainer } from '../../components/StoryContainer';

const meta: Meta<typeof CarouselImage> = {
  title: '3. UI COMPONENTS/Sliders/Carousel Image',
  tags: ['autodocs'],
  component: CarouselImage,
  parameters: {
    docs: {
      description: {
        component:
          'The CarouselImage component is a powerful and flexible carousel/slider component built with Swiper.js, designed to match the tucu-ui design system. It supports multiple effects, navigation controls, autoplay, and responsive design.',
      },
    },
  },
  argTypes: {
    images: {
      control: 'object',
      description: 'Array of images',
    },
    imageClassName: {
      control: 'text',
      description: 'Additional CSS classes to apply to the image container',
    },
    showTitles: {
      control: 'boolean',
      description: 'Show image titles and descriptions',
    },
    imageFit: {
      control: 'select',
      options: ['cover', 'contain', 'fill', 'none', 'scale-down'],
      description: 'CSS object-fit property',
    },
    aspectRatio: {
      control: 'text',
      description: 'Aspect ratio CSS class',
    },
    lazy: {
      control: 'boolean',
      description: 'Enable lazy loading',
    },
  },
};

export default meta;

// Image carousel examples
const sampleImages = [
  {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    alt: 'Mountain landscape',
    title: 'Mountain Adventure',
    description: 'Explore the majestic peaks',
  },
  {
    src: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop',
    alt: 'Ocean beach',
    title: 'Tropical Paradise',
    description: 'Relax on pristine beaches',
  },
  {
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop',
    alt: 'Forest path',
    title: 'Forest Journey',
    description: 'Walk through enchanted woods',
  },
];

export const ImageCarousel: StoryFn<typeof CarouselImage> = (args) => (
  <StoryContainer>
    <div className="w-full max-w-6xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Image Carousel</h2>
      <CarouselImage {...args} />
    </div>
  </StoryContainer>
);

ImageCarousel.args = {
  images: sampleImages,
  showTitles: true,
  autoplay: { delay: 4000 },
  showNavigation: true,
  showPagination: true,
  loop: true,
};

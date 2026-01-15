/* eslint-disable jsx-a11y/accessible-emoji */
import type { Meta, StoryFn } from '@storybook/react-vite';
import {
  Carousel,
  CarouselImage,
  CarouselCards,
} from '../../../components/carousel';
import { StoryContainer } from '../../components/StoryContainer';
import React from 'react';
import Button from '../../../components/buttons';
import { Heart, Zap, Trophy, Target, Shield } from 'lucide-react';

const meta: Meta<typeof Carousel> = {
  title: '3. UI COMPONENTS/Sliders/Carousel',
  tags: ['autodocs'],
  component: Carousel,
  parameters: {
    docs: {
      description: {
        component:
          'The Carousel component is a powerful and flexible slider/carousel built with Swiper.js. It supports multiple effects, navigation controls, autoplay, and responsive design.',
      },
    },
  },
  argTypes: {
    slidesPerView: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Number of slides visible at once',
    },
    spaceBetween: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'Space between slides in pixels',
    },
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Slide direction',
    },
    effect: {
      control: 'select',
      options: [
        'slide',
        'fade',
        'coverflow',
        'cube',
        'flip',
        'creative',
        'cards',
      ],
      description: 'Transition effect between slides',
    },
    mousewheel: {
      control: 'boolean',
      description: 'Enable mousewheel',
    },
    freeMode: {
      control: 'boolean',
      description: 'Enable free mode',
    },
    grabCursor: {
      control: 'boolean',
      description: 'Show grab cursor',
    },
    centeredSlides: {
      control: 'boolean',
      description: 'Center active slide',
    },
    showNavigation: {
      control: 'boolean',
      description: 'Show navigation arrows',
    },
    showPagination: {
      control: 'boolean',
      description: 'Show pagination dots',
    },
    paginationType: {
      control: 'select',
      options: ['bullets', 'fraction', 'progressbar', 'custom'],
      description: 'Type of pagination',
    },
    autoplay: {
      control: 'boolean',
      description: 'Enable autoplay',
    },
    loop: {
      control: 'boolean',
      description: 'Enable infinite loop',
    },
    breakpoints: {
      control: 'object',
      description: 'Responsive breakpoints',
    },
  },
};

export default meta;

// Sample slide components
const sampleSlides = [
  <div
    key="1"
    className="min-h-[400px] w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 rounded-lg text-center"
  >
    <h3 className="text-2xl font-bold mb-2">Slide 1</h3>
  </div>,
  <div
    key="2"
    className="min-h-[400px] w-full h-full flex items-center justify-center bg-gradient-to-br from-green-500 to-green-600 text-white p-8 rounded-lg text-center"
  >
    <h3 className="text-2xl font-bold mb-2">Slide 2</h3>
  </div>,
  <div
    key="3"
    className="min-h-[400px] w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-600 text-white p-8 rounded-lg text-center"
  >
    <h3 className="text-2xl font-bold mb-2">Slide 3</h3>
  </div>,
  <div
    key="4"
    className="min-h-[400px] w-full h-full flex items-center justify-center bg-gradient-to-br from-red-500 to-red-600 text-white p-8 rounded-lg text-center"
  >
    <h3 className="text-2xl font-bold mb-2">Slide 4</h3>
  </div>,
  <div
    key="5"
    className="min-h-[400px] w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-8 rounded-lg text-center"
  >
    <h3 className="text-2xl font-bold mb-2">Slide 5</h3>
  </div>,
];

const sampleVerticalSlides = [
  <div
    key="1"
    className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 rounded-lg text-center"
  >
    <h3 className="text-2xl font-bold mb-2">Slide 1</h3>
  </div>,
  <div
    key="2"
    className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-500 to-green-600 text-white p-8 rounded-lg text-center"
  >
    <h3 className="text-2xl font-bold mb-2">Slide 2</h3>
  </div>,
  <div
    key="3"
    className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-600 text-white p-8 rounded-lg text-center"
  >
    <h3 className="text-2xl font-bold mb-2">Slide 3</h3>
  </div>,
  <div
    key="4"
    className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-500 to-red-600 text-white p-8 rounded-lg text-center"
  >
    <h3 className="text-2xl font-bold mb-2">Slide 4</h3>
  </div>,
  <div
    key="5"
    className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-8 rounded-lg text-center"
  >
    <h3 className="text-2xl font-bold mb-2">Slide 5</h3>
  </div>,
];

export const Basic: StoryFn<typeof Carousel> = (args) => (
  <StoryContainer>
    <div className="w-full max-w-6xl h-[400px]">
      <h2 className="text-2xl font-bold mb-6 text-center">Basic Carousel</h2>
      <Carousel {...args}>
        {args.direction === 'vertical' ? sampleVerticalSlides : sampleSlides}
      </Carousel>
    </div>
  </StoryContainer>
);

Basic.args = {
  slidesPerView: 1,
  spaceBetween: 20,
  showNavigation: true,
  showPagination: true,
  loop: true,
  mousewheel: true,
  grabCursor: true,
  freeMode: false,
  centeredSlides: false,
  effect: 'slide',
  direction: 'horizontal',
  paginationType: 'bullets',
  autoplay: false,
};

export const MultipleSlides: StoryFn<typeof Carousel> = (args) => (
  <StoryContainer>
    <div className="w-full max-w-6xl h-[400px]">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Multiple Slides Visible
      </h2>
      <Carousel {...args}>{sampleSlides}</Carousel>
    </div>
  </StoryContainer>
);

MultipleSlides.args = {
  slidesPerView: 3,
  spaceBetween: 30,
  showNavigation: true,
  showPagination: true,
  loop: true,
  grabCursor: true,
  breakpoints: {
    320: { slidesPerView: 1, spaceBetween: 20 },
    640: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 30 },
  },
};

export const Autoplay: StoryFn<typeof Carousel> = (args) => (
  <StoryContainer>
    <div className="w-full max-w-6xl h-[400px]">
      <h2 className="text-2xl font-bold mb-6 text-center">Autoplay Carousel</h2>
      <Carousel {...args}>
        {args.direction === 'vertical' ? sampleVerticalSlides : sampleSlides}
      </Carousel>
    </div>
  </StoryContainer>
);

Autoplay.args = {
  slidesPerView: 1,
  spaceBetween: 20,
  showNavigation: true,
  showPagination: true,
  autoplay: { delay: 3000, disableOnInteraction: false },
  loop: true,
  grabCursor: true,
};

export const FadeEffect: StoryFn<typeof Carousel> = (args) => (
  <StoryContainer>
    <div className="w-full max-w-6xl h-[400px]">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Fade Effect Carousel
      </h2>
      <Carousel {...args}>
        {args.direction === 'vertical' ? sampleVerticalSlides : sampleSlides}
      </Carousel>
    </div>
  </StoryContainer>
);

FadeEffect.args = {
  slidesPerView: 1,
  spaceBetween: 0,
  effect: 'fade',
  showNavigation: true,
  showPagination: true,
  autoplay: { delay: 4000 },
  loop: true,
  grabCursor: true,
};

export const CoverflowEffect: StoryFn<typeof Carousel> = (args) => (
  <StoryContainer>
    <div className="w-full max-w-5xl h-[400px]">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Coverflow Effect Carousel
      </h2>
      <Carousel {...args}>
        {args.direction === 'vertical' ? sampleVerticalSlides : sampleSlides}
      </Carousel>
    </div>
  </StoryContainer>
);

CoverflowEffect.args = {
  slidesPerView: 3,
  spaceBetween: 30,
  effect: 'coverflow',
  showNavigation: true,
  showPagination: true,
  centeredSlides: true,
  grabCursor: true,
  breakpoints: {
    320: { slidesPerView: 1 },
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
};

export const Vertical: StoryFn<typeof Carousel> = (args) => (
  <StoryContainer className="h-[600px]">
    <div className="w-full max-w-md h-full max-h-[400px]">
      <h2 className="text-2xl font-bold mb-6 text-center">Vertical Carousel</h2>
      <Carousel {...args}>
        {args.direction === 'vertical' ? sampleVerticalSlides : sampleSlides}
      </Carousel>
    </div>
  </StoryContainer>
);

Vertical.args = {
  slidesPerView: 1,
  spaceBetween: 20,
  direction: 'vertical',
  showNavigation: true,
  showPagination: true,
  loop: true,
  grabCursor: true,
};

export const FreeMode: StoryFn<typeof Carousel> = (args) => (
  <StoryContainer>
    <div className="w-full max-w-6xl">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Free Mode Carousel
      </h2>
      <Carousel {...args}>
        {args.direction === 'vertical' ? sampleVerticalSlides : sampleSlides}
      </Carousel>
    </div>
  </StoryContainer>
);

FreeMode.args = {
  slidesPerView: 'auto',
  spaceBetween: 30,
  freeMode: true,
  showNavigation: true,
  showPagination: true,
  grabCursor: true,
  centeredSlides: false,
};

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

export const Breakpoints: StoryFn<typeof Carousel> = (args) => {
  return (
    <StoryContainer>
      <div className="w-full max-w-6xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Breakpoints</h2>
        <Carousel {...args}>
          {args.direction === 'vertical' ? sampleVerticalSlides : sampleSlides}
        </Carousel>
      </div>
    </StoryContainer>
  );
};

Breakpoints.args = {
  breakpoints: {
    320: { slidesPerView: 1, spaceBetween: 20 },
    640: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 30 },
  },
};

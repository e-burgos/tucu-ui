import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  CarouselImage,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';

import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';
const CarouselImageSection: React.FC = () => {
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&h=600&fit=crop',
      alt: 'Mountain Landscape',
      title: 'Mountain Peaks',
      description: 'Breathtaking view of snow-capped mountain peaks at sunrise',
    },
    {
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      alt: 'Ocean View',
      title: 'Ocean Horizon',
      description: 'Serene ocean view with crystal clear blue waters',
    },
    {
      src: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800&h=600&fit=crop',
      alt: 'Forest Path',
      title: 'Forest Trail',
      description: 'Peaceful path through a lush green forest',
    },
    {
      src: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop',
      alt: 'Desert Sunset',
      title: 'Desert Landscape',
      description: 'Stunning sunset over golden desert dunes',
    },
    {
      src: 'https://images.unsplash.com/photo-1542202229-7d93c33f5d07?w=800&h=600&fit=crop',
      alt: 'City Skyline',
      title: 'Urban Cityscape',
      description: 'Modern city skyline illuminated at night',
    },
    {
      src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop',
      alt: 'Northern Lights',
      title: 'Aurora Borealis',
      description: 'Magical northern lights dancing across the night sky',
    },
  ];

  return (
    <>
      <HeroCard
        title="CarouselImage"
        description="A carousel component specifically designed for displaying images with
          optional titles and descriptions."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-pink-600 to-rose-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Image className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic Image Carousel
                </Typography>
                <div className="w-full">
                  <CarouselImage images={images} />
                </div>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Titles and Descriptions
                </Typography>
                <div className="w-full">
                  <CarouselImage images={images} showTitles />
                </div>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Navigation and Pagination
                </Typography>
                <div className="w-full">
                  <CarouselImage
                    images={images}
                    showNavigation
                    showPagination
                  />
                </div>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Contain Fit - Preserve Aspect Ratio
                </Typography>
                <div className="w-full">
                  <CarouselImage
                    images={images}
                    imageFit="contain"
                    showTitles
                    showNavigation
                  />
                </div>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Square Aspect Ratio
                </Typography>
                <div className="w-full">
                  <CarouselImage
                    images={images}
                    aspectRatio="aspect-square"
                    showNavigation
                    showPagination
                  />
                </div>
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
      <PropPlayground
        componentName="CarouselImage"
        title="CarouselImage Playground"
        defaultValues={{
          'showNavigation': true,
          'showPagination': true,
          'showTitles': true,
          'loop': true,
          'grabCursor': true,
          'lazy': false,
          'imageFit': 'cover',
          'direction': 'horizontal'
}}
        excludeProps={['images', 'onSlideChange', 'onSwiper', 'breakpoints', 'autoplay', 'className', 'slideClassName', 'imageClassName', 'aria-label', 'aspectRatio', 'effect', 'paginationType', 'centeredSlides', 'freeMode', 'mousewheel', 'slidesPerView', 'spaceBetween']}
      >
        {(props) => (
          <CarouselImage
            {...props}
            images={[
              { src: 'https://picsum.photos/seed/1/800/400', alt: 'Image 1', title: 'Image 1' },
              { src: 'https://picsum.photos/seed/2/800/400', alt: 'Image 2', title: 'Image 2' },
              { src: 'https://picsum.photos/seed/3/800/400', alt: 'Image 3', title: 'Image 3' },
            ]}
          />
        )}
      </PropPlayground>


      <AutoPropsTable componentName="CarouselImage" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { CarouselImage } from '@e-burgos/tucu-ui';

const images = [
  {
    src: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
    alt: 'Mountain Landscape',
    title: 'Mountain Peaks',
    description: 'Breathtaking view of snow-capped mountain peaks',
  },
  {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
    alt: 'Ocean View',
    title: 'Ocean Horizon',
    description: 'Serene ocean view with crystal clear blue waters',
  },
  // ... more images
];

// Basic usage
<CarouselImage images={images} />

// With titles and descriptions
<CarouselImage images={images} showTitles />

// With navigation and pagination
<CarouselImage images={images} showNavigation showPagination />

// Different image fit options
<CarouselImage images={images} imageFit="contain" />
<CarouselImage images={images} imageFit="cover" />

// Different aspect ratios
<CarouselImage images={images} aspectRatio="aspect-video" />
<CarouselImage images={images} aspectRatio="aspect-square" />
<CarouselImage images={images} aspectRatio="aspect-[4/3]" />

// Disable lazy loading
<CarouselImage images={images} lazy={false} />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default CarouselImageSection;

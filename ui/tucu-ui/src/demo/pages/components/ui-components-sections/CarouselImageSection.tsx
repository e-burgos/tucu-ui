import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  CarouselImage,
} from '../../../../index';

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

  const propsTableColumns = [
    {
      key: 'prop',
      label: 'Prop',
      render: (value: unknown) => (
        <code className="text-xs text-brand">{String(value)}</code>
      ),
    },
    {
      key: 'type',
      label: 'Type',
      render: (value: unknown) => (
        <code className="text-xs">{String(value)}</code>
      ),
    },
    {
      key: 'default',
      label: 'Default',
      render: (value: unknown) => {
        const val = String(value);
        if (val === 'required') {
          return <span className="text-xs text-red-500">required</span>;
        }
        return <code className="text-xs">{val}</code>;
      },
    },
    {
      key: 'description',
      label: 'Description',
    },
  ];

  const propsData = [
    {
      prop: 'images',
      type: 'CarouselImageItem[]',
      default: 'required',
      description: 'Array of image items to display',
    },
    {
      prop: 'showTitles',
      type: 'boolean',
      default: 'false',
      description: 'Whether to show image titles and descriptions',
    },
    {
      prop: 'imageFit',
      type: "'cover' | 'contain' | 'fill' | 'none' | 'scale-down'",
      default: "'cover'",
      description: 'How images should fit in their containers',
    },
    {
      prop: 'aspectRatio',
      type: 'string',
      default: "'aspect-video'",
      description: 'Aspect ratio class for images',
    },
    {
      prop: 'lazy',
      type: 'boolean',
      default: 'true',
      description: 'Enable lazy loading for images',
    },
    {
      prop: 'showNavigation',
      type: 'boolean',
      default: 'false',
      description: 'Show navigation arrows',
    },
    {
      prop: 'showPagination',
      type: 'boolean',
      default: 'false',
      description: 'Show pagination dots',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          CarouselImage
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A carousel component specifically designed for displaying images with
          optional titles and descriptions.
        </Typography>
      </div>

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

      <CardContainer className="overflow-hidden">
        <CardTitle title="Props" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <BasicTable columns={propsTableColumns} data={propsData} />
          </div>
        </CardTitle>
      </CardContainer>

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

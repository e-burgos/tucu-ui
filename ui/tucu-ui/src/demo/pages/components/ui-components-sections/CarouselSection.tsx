import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Carousel,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';

const CarouselSection: React.FC = () => {
  const slides = [
    <div
      key="1"
      className="h-64 w-full bg-gradient-to-br from-brand to-sky-500 rounded-lg flex items-center justify-center text-white text-2xl"
    >
      Slide 1
    </div>,
    <div
      key="2"
      className="h-64 w-full bg-gradient-to-br from-brand to-green-500 rounded-lg flex items-center justify-center text-white text-2xl"
    >
      Slide 2
    </div>,
    <div
      key="3"
      className="h-64 w-full bg-gradient-to-br from-brand to-purple-500 rounded-lg flex items-center justify-center text-white text-2xl"
    >
      Slide 3
    </div>,
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Carousel
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A powerful carousel component built on Swiper.js with support for
          navigation, pagination, autoplay, and various effects.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic Carousel
                </Typography>
                <div className="w-full">
                  <Carousel>{slides}</Carousel>
                </div>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Navigation
                </Typography>
                <div className="w-full">
                  <Carousel showNavigation>{slides}</Carousel>
                </div>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Pagination
                </Typography>
                <div className="w-full">
                  <Carousel showPagination>{slides}</Carousel>
                </div>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Multiple Slides
                </Typography>
                <div className="w-full">
                  <Carousel slidesPerView={2} spaceBetween={20}>
                    {slides}
                  </Carousel>
                </div>
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
      <AutoPropsTable componentName="Carousel" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { Carousel } from '@e-burgos/tucu-ui';

const slides = [
  <div key="1">Slide 1</div>,
  <div key="2">Slide 2</div>,
  <div key="3">Slide 3</div>,
];

// Basic usage
<Carousel>{slides}</Carousel>

// With navigation
<Carousel showNavigation>{slides}</Carousel>

// With pagination
<Carousel showPagination>{slides}</Carousel>

// Multiple slides per view
<Carousel slidesPerView={2} spaceBetween={20}>
  {slides}
</Carousel>

// With autoplay
<Carousel autoplay={{ delay: 3000 }}>{slides}</Carousel>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default CarouselSection;

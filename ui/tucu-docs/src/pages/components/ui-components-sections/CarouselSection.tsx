import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Carousel,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';

import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';
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
      <HeroCard
        title="Carousel"
        description="A powerful carousel component built on Swiper.js with support for
          navigation, pagination, autoplay, and various effects."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.GalleryHorizontal className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

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
      <PropPlayground
        componentName="Carousel"
        title="Carousel Playground"
        defaultValues={{
          'direction': 'horizontal',
          'effect': 'slide',
          'loop': true,
          'showNavigation': true,
          'showPagination': true,
          'paginationType': 'bullets',
          'grabCursor': true,
          'centeredSlides': false,
          'freeMode': false,
          'mousewheel': false,
          'slidesPerView': 1,
          'spaceBetween': 16
}}
        excludeProps={['onSlideChange', 'onSwiper', 'breakpoints', 'autoplay', 'className', 'slideClassName', 'aria-label']}
      >
        {(props) => (
          <Carousel {...props}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-40 rounded-lg bg-brand/20 flex items-center justify-center">
                <Typography tag="h4">Slide {i}</Typography>
              </div>
            ))}
          </Carousel>
        )}
      </PropPlayground>


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

import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  CarouselCards,
  LucideIcons,
  HeroCard,
} from '@e-burgos/tucu-ui';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';

import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';
const CarouselCardsSection: React.FC = () => {
  const cards = [
    {
      title: 'Performance',
      description:
        'Blazing fast performance with optimized rendering and minimal bundle size',
      icon: <LucideIcons.Zap className="w-8 h-8" />,
    },
    {
      title: 'Customizable',
      description:
        'Highly customizable with extensive theming options and variants',
      icon: <LucideIcons.Palette className="w-8 h-8" />,
    },
    {
      title: 'Accessible',
      description: 'Built with accessibility in mind, WCAG 2.1 compliant',
      icon: <LucideIcons.Users className="w-8 h-8" />,
    },
    {
      title: 'Responsive',
      description:
        'Mobile-first design that works seamlessly across all devices',
      icon: <LucideIcons.Smartphone className="w-8 h-8" />,
    },
    {
      title: 'Type Safe',
      description:
        'Full TypeScript support with comprehensive type definitions',
      icon: <LucideIcons.Shield className="w-8 h-8" />,
    },
    {
      title: 'Documentation',
      description: 'Extensive documentation with examples and best practices',
      icon: <LucideIcons.BookOpen className="w-8 h-8" />,
    },
  ];

  return (
    <>
      <HeroCard
        title="CarouselCards"
        description="A carousel component specifically designed for displaying cards with
          customizable sizes and variants."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Layers className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic Carousel Cards
                </Typography>
                <div className="w-full">
                  <CarouselCards cardClassName="min-h-[250px]" cards={cards} />
                </div>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Navigation and Pagination
                </Typography>
                <div className="w-full">
                  <CarouselCards cards={cards} showNavigation showPagination />
                </div>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Elevated Variant - Medium Size
                </Typography>
                <div className="w-full">
                  <CarouselCards
                    cards={cards}
                    variant="elevated"
                    cardSize="md"
                    showNavigation
                  />
                </div>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Outlined Variant - Large Size
                </Typography>
                <div className="w-full">
                  <CarouselCards
                    cards={cards}
                    variant="outlined"
                    cardSize="lg"
                    showPagination
                  />
                </div>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Filled Variant - Small Size
                </Typography>
                <div className="w-full">
                  <CarouselCards
                    cards={cards}
                    variant="filled"
                    cardSize="sm"
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
        componentName="CarouselCards"
        title="CarouselCards Playground"
        defaultValues={{
          'variant': 'default',
          'cardSize': 'md',
          'showCardTitles': true,
          'showNavigation': true,
          'showPagination': true,
          'loop': true,
          'grabCursor': true,
          'direction': 'horizontal'
}}
        excludeProps={['cards', 'onSlideChange', 'onSwiper', 'breakpoints', 'autoplay', 'className', 'slideClassName', 'cardClassName', 'aria-label', 'effect', 'paginationType', 'centeredSlides', 'freeMode', 'mousewheel', 'slidesPerView', 'spaceBetween']}
      >
        {(props) => (
          <CarouselCards
            {...props}
            cards={[
              { title: 'Card 1', description: 'Description 1', image: '' },
              { title: 'Card 2', description: 'Description 2', image: '' },
              { title: 'Card 3', description: 'Description 3', image: '' },
            ]}
          />
        )}
      </PropPlayground>


      <AutoPropsTable componentName="CarouselCards" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { CarouselCards, LucideIcons } from '@e-burgos/tucu-ui';

const cards = [
  {
    title: 'Performance',
    description: 'Blazing fast performance with optimized rendering',
    icon: <LucideIcons.Zap className="w-8 h-8" />,
  },
  {
    title: 'Customizable',
    description: 'Highly customizable with extensive theming options',
    icon: <LucideIcons.Palette className="w-8 h-8" />,
  },
  {
    title: 'Accessible',
    description: 'Built with accessibility in mind, WCAG 2.1 compliant',
    icon: <LucideIcons.Users className="w-8 h-8" />,
  },
  // ... more cards
];

// Basic usage
<CarouselCards cards={cards} />

// With navigation and pagination
<CarouselCards cards={cards} showNavigation showPagination />

// Different variants
<CarouselCards cards={cards} variant="elevated" cardSize="md" />
<CarouselCards cards={cards} variant="outlined" cardSize="lg" />
<CarouselCards cards={cards} variant="filled" cardSize="sm" />

// Different sizes
<CarouselCards cards={cards} cardSize="sm" />
<CarouselCards cards={cards} cardSize="md" />
<CarouselCards cards={cards} cardSize="lg" />
<CarouselCards cards={cards} cardSize="xl" />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default CarouselCardsSection;

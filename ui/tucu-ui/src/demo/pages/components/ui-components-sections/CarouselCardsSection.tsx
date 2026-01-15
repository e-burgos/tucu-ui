import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  CarouselCards,
  LucideIcons,
} from '../../../../index';

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
      prop: 'cards',
      type: 'CarouselCardItem[]',
      default: 'required',
      description: 'Array of card items to display',
    },
    {
      prop: 'cardSize',
      type: "'sm' | 'md' | 'lg' | 'xl'",
      default: "'md'",
      description: 'Size of the cards',
    },
    {
      prop: 'variant',
      type: "'default' | 'elevated' | 'outlined' | 'filled'",
      default: "'default'",
      description: 'Visual variant of the cards',
    },
    {
      prop: 'showCardTitles',
      type: 'boolean',
      default: 'true',
      description: 'Whether to show card titles',
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
          CarouselCards
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A carousel component specifically designed for displaying cards with
          customizable sizes and variants.
        </Typography>
      </div>

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

import React from 'react';
import {
  HeroCard,
  CardContainer,
  Typography,
  LucideIcons,
  BasicTable,
} from '../../../../index';

const IconSystemAPISection: React.FC = () => {
  const lucideProps = [
    {
      prop: 'className',
      type: 'string',
      default: '—',
      description: 'Tailwind CSS classes for styling. Use w-*/h-* for sizing, text-* for color.',
    },
    {
      prop: 'size',
      type: 'number | string',
      default: '24',
      description: 'Icon size in pixels. Sets both width and height. Alternative to className sizing.',
    },
    {
      prop: 'color',
      type: 'string',
      default: 'currentColor',
      description: 'SVG stroke color. Inherits from parent text color by default.',
    },
    {
      prop: 'strokeWidth',
      type: 'number',
      default: '2',
      description: 'Width of SVG strokes. Use 1.5 for thinner lines, 2.5 for bolder.',
    },
    {
      prop: 'fill',
      type: 'string',
      default: 'none',
      description: 'SVG fill color. Most Lucide icons are stroke-based (fill="none").',
    },
    {
      prop: 'absoluteStrokeWidth',
      type: 'boolean',
      default: 'false',
      description: 'When true, strokeWidth stays constant regardless of icon size.',
    },
  ];

  const customProps = [
    {
      prop: 'className',
      type: 'string',
      default: '—',
      description: 'Tailwind CSS classes for sizing (w-*/h-*) and color (text-*).',
    },
    {
      prop: 'width / height',
      type: 'number | string',
      default: '—',
      description: 'SVG width and height attributes. className sizing is preferred.',
    },
    {
      prop: 'fill',
      type: 'string',
      default: 'varies',
      description: 'SVG fill. Some icons use currentColor, others have hardcoded brand colors.',
    },
    {
      prop: 'stroke',
      type: 'string',
      default: 'varies',
      description: 'SVG stroke color. Depends on icon type (fill-based vs stroke-based).',
    },
    {
      prop: '...SVGAttributes',
      type: 'SVGAttributes<SVGElement>',
      default: '—',
      description: 'All standard SVG attributes: opacity, style, onClick, aria-*, etc.',
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
        if (value === '—') {
          return <span className="text-gray-400">—</span>;
        }
        return <code className="text-xs">{String(value)}</code>;
      },
    },
    {
      key: 'description',
      label: 'Description',
    },
  ];

  return (
    <>
      <HeroCard
        title="Icon System API"
        description="Complete props reference for both Lucide namespace icons and custom Tucu icons. Each system has a slightly different API surface."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-cyan-500 via-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Terminal className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Lucide Icons Props
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Props available on LucideIcons.* components
          </Typography>
        </div>

        <CardContainer className="overflow-hidden">
          <div className="w-full p-4 sm:p-6">
            <BasicTable columns={propsTableColumns} data={lucideProps} />
          </div>
        </CardContainer>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Custom Tucu Icons Props
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Props available on named custom icon exports
          </Typography>
        </div>

        <CardContainer className="overflow-hidden">
          <div className="w-full p-4 sm:p-6">
            <BasicTable columns={propsTableColumns} data={customProps} />
          </div>
        </CardContainer>
      </section>
    </>
  );
};

export default IconSystemAPISection;

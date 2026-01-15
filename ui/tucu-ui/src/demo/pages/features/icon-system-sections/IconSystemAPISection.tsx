import React from 'react';
import {
  CardContainer,
  CardTitle,
  BasicTable,
} from '../../../../index';

const IconSystemAPISection: React.FC = () => {
  const iconSystemProps = [
    {
      prop: 'LucideIcons',
      type: 'Namespace',
      default: '-',
      description:
        'Access to 5000+ Lucide React icons through dot notation (e.g., LucideIcons.Home)',
    },
    {
      prop: 'Custom Icons',
      type: 'Named Exports',
      default: '-',
      description:
        '98+ custom icons available as named exports (e.g., import { Bitcoin, HomeIcon } from "@e-burgos/tucu-ui")',
    },
    {
      prop: 'className',
      type: 'string',
      default: '-',
      description:
        'Tailwind CSS classes for styling (size, color, etc.). Use w-* h-* for sizing.',
    },
    {
      prop: 'fill',
      type: 'string',
      default: 'currentColor',
      description:
        'SVG fill color. Defaults to currentColor for theme integration.',
    },
    {
      prop: 'stroke',
      type: 'string',
      default: 'currentColor',
      description:
        'SVG stroke color for Lucide icons. Defaults to currentColor.',
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
        if (value === '-') {
          return <span className="text-gray-400">-</span>;
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
    <div className="space-y-8">
      <CardContainer className="overflow-hidden">
        <CardTitle title="Icon System API" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <BasicTable columns={propsTableColumns} data={iconSystemProps} />
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
};

export default IconSystemAPISection;


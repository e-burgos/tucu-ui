import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  Avatar,
} from '../../../../index';
import avatar1Img from '../../../assets/images/avatar/1.png';

const AvatarSection: React.FC = () => {
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
      prop: 'image',
      type: 'string',
      default: 'required',
      description: 'URL or path to the avatar image',
    },
    {
      prop: 'alt',
      type: 'string',
      default: 'required',
      description: 'Alt text for the image',
    },
    {
      prop: 'size',
      type: "'xl' | 'lg' | 'md' | 'sm' | 'xs'",
      default: "'md'",
      description: 'Size of the avatar',
    },
    {
      prop: 'shape',
      type: "'rounded' | 'circle'",
      default: "'circle'",
      description: 'Shape of the avatar',
    },
    {
      prop: 'border',
      type: 'boolean',
      default: 'true',
      description: 'Whether to show border',
    },
    {
      prop: 'className',
      type: 'string',
      default: '-',
      description: 'Additional CSS classes',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Avatar
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A versatile avatar component for displaying user profile images with
          multiple sizes and shapes.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Default Avatar
                </Typography>
                <Avatar image={avatar1Img} alt="User avatar" />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Without Border
                </Typography>
                <Avatar image={avatar1Img} alt="User avatar" border={false} />
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Variants" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-6">
              <div>
                <Typography tag="h5" className="mb-3">
                  Sizes
                </Typography>
                <div className="flex items-center gap-4">
                  <Avatar image={avatar1Img} alt="XS" size="xs" />
                  <Avatar image={avatar1Img} alt="SM" size="sm" />
                  <Avatar image={avatar1Img} alt="MD" size="md" />
                  <Avatar image={avatar1Img} alt="LG" size="lg" />
                  <Avatar image={avatar1Img} alt="XL" size="xl" />
                </div>
              </div>
              <div>
                <Typography tag="h5" className="mb-3">
                  Shapes
                </Typography>
                <div className="flex items-center gap-4">
                  <Avatar image={avatar1Img} alt="Circle" shape="circle" />
                  <Avatar image={avatar1Img} alt="Rounded" shape="rounded" />
                </div>
              </div>
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
              code={`import { Avatar } from '@e-burgos/tucu-ui';

// Basic usage
<Avatar image="/path/to/image.jpg" alt="User name" />

// Different sizes
<Avatar image={image} alt="User" size="xs" />
<Avatar image={image} alt="User" size="sm" />
<Avatar image={image} alt="User" size="md" />
<Avatar image={image} alt="User" size="lg" />
<Avatar image={image} alt="User" size="xl" />

// Different shapes
<Avatar image={image} alt="User" shape="circle" />
<Avatar image={image} alt="User" shape="rounded" />

// Without border
<Avatar image={image} alt="User" border={false} />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default AvatarSection;

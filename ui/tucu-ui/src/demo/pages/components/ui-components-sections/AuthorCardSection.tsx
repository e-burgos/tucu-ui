import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  AuthorCard,
} from '../../../../index';
import avatar1Img from '../../../assets/images/avatar/1.png';

const AuthorCardSection: React.FC = () => {
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
      description: 'URL or path to the author avatar image',
    },
    {
      prop: 'name',
      type: 'string',
      default: '-',
      description: 'Author name',
    },
    {
      prop: 'authorRole',
      type: 'string',
      default: '-',
      description: 'Author role or title',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          AuthorCard
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A card component for displaying author information with avatar, name,
          and role.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Name and Role
                </Typography>
                <AuthorCard
                  image={avatar1Img}
                  name="John Doe"
                  authorRole="Senior Developer"
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Name Only
                </Typography>
                <AuthorCard image={avatar1Img} name="Jane Smith" />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Avatar Only
                </Typography>
                <AuthorCard image={avatar1Img} />
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
              code={`import { AuthorCard } from '@e-burgos/tucu-ui';

// With name and role
<AuthorCard
  image="/path/to/avatar.jpg"
  name="John Doe"
  authorRole="Senior Developer"
/>

// With name only
<AuthorCard
  image="/path/to/avatar.jpg"
  name="Jane Smith"
/>

// Avatar only
<AuthorCard image="/path/to/avatar.jpg" />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default AuthorCardSection;

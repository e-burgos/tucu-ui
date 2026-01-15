import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  ActiveLink,
} from '../../../../index';

const ActiveLinkSection: React.FC = () => {
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
      prop: 'path',
      type: 'string',
      default: 'required',
      description: 'Path to match against current location',
    },
    {
      prop: 'to',
      type: 'string',
      default: 'required',
      description: 'Link destination',
    },
    {
      prop: 'activeClassName',
      type: 'string',
      default: "'active'",
      description: 'CSS class to apply when link is active',
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
          ActiveLink
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A link component that automatically applies an active class when the
          current path matches the link path.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Active Link
                </Typography>
                <div className="flex gap-4">
                  <ActiveLink to="/components" path="/components">
                    Components
                  </ActiveLink>
                  <ActiveLink to="/about" path="/about">
                    About
                  </ActiveLink>
                </div>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Custom Active Class
                </Typography>
                <ActiveLink
                  to="/home"
                  path="/home"
                  activeClassName="text-brand font-bold"
                >
                  Home
                </ActiveLink>
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
              code={`import { ActiveLink } from '@e-burgos/tucu-ui';

// Basic usage
<ActiveLink to="/components" path="/components">
  Components
</ActiveLink>

// With custom active class
<ActiveLink
  to="/home"
  path="/home"
  activeClassName="text-brand font-bold"
>
  Home
</ActiveLink>

// Navigation example
<nav>
  <ActiveLink to="/" path="/">Home</ActiveLink>
  <ActiveLink to="/about" path="/about">About</ActiveLink>
  <ActiveLink to="/contact" path="/contact">Contact</ActiveLink>
</nav>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default ActiveLinkSection;

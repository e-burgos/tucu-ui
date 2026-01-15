import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  Hamburger,
} from '../../../../index';

const HamburgerSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

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
      prop: 'isOpen',
      type: 'boolean',
      default: 'false',
      description: 'Whether the hamburger menu is open',
    },
    {
      prop: '...ButtonProps',
      type: 'ButtonProps',
      default: '-',
      description: 'All Button component props are supported',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Hamburger
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          An animated hamburger menu button component, perfect for mobile
          navigation menus.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Closed State
                </Typography>
                <Hamburger isOpen={false} onClick={() => setIsOpen(false)} />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Open State
                </Typography>
                <Hamburger isOpen={true} onClick={() => setIsOpen(true)} />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Interactive Example
                </Typography>
                <Hamburger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Different Variants
                </Typography>
                <div className="flex gap-2">
                  <Hamburger variant="solid" color="primary" />
                  <Hamburger variant="ghost" color="primary" />
                  <Hamburger variant="transparent" />
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
              code={`import { Hamburger } from '@e-burgos/tucu-ui';
import { useState } from 'react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Hamburger
      isOpen={isOpen}
      onClick={() => setIsOpen(!isOpen)}
    />
  );
}

// With different variants
<Hamburger variant="solid" color="primary" />
<Hamburger variant="ghost" color="primary" />
<Hamburger variant="transparent" />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default HamburgerSection;

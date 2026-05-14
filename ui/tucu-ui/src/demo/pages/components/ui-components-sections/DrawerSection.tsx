import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Drawer,
  Button,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { PropPlayground } from '../../../components/prop-playground';

const DrawerSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [, setDrawerType] = useState<'sidebar' | 'sidebar-menu'>('sidebar');

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Drawer
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A drawer component that slides in from the side, supporting both
          simple sidebar and sidebar-menu variants.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Left Position
                </Typography>
                <Button
                  onClick={() => {
                    setDrawerType('sidebar');
                    setIsOpen(true);
                  }}
                >
                  Open Left Drawer
                </Button>
                <Drawer
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  type="sidebar"
                  title="Sidebar Title"
                  position="left"
                >
                  <Typography tag="p">Sidebar content goes here</Typography>
                </Drawer>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Right Position
                </Typography>
                <Button
                  onClick={() => {
                    setDrawerType('sidebar');
                    setIsOpen2(true);
                  }}
                >
                  Open Right Drawer
                </Button>
                <Drawer
                  isOpen={isOpen2}
                  setIsOpen={setIsOpen2}
                  type="sidebar"
                  position="right"
                  title="Right Drawer"
                >
                  <Typography tag="p">Content on the right</Typography>
                </Drawer>
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
      <PropPlayground
        componentName="Drawer"
        defaultValues={{
          isOpen: isOpen,
          setIsOpen: setIsOpen,
          position: 'left',
          backdrop: true,
        }}
        excludeProps={[
          'setIsOpen',
          'onClose',
          'actionContent',
          'logo',
          'menuItems',
          'type',
        ]}
      >
        {(props) => (
          <div
            style={{ position: 'relative', height: 300, overflow: 'hidden' }}
          >
            <Drawer
              {...props}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              title="Drawer Preview"
            >
              <p className="text-sm p-4">Drawer content</p>
            </Drawer>
          </div>
        )}
      </PropPlayground>
      <AutoPropsTable componentName="Drawer" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { Drawer, Button } from '@e-burgos/tucu-ui';
import { useState } from 'react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
      <Drawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        type="sidebar"
        title="Drawer Title"
      >
        <div>Drawer content</div>
      </Drawer>
    </>
  );
}

// Right position
<Drawer
  isOpen={isOpen}
  setIsOpen={setIsOpen}
  type="sidebar"
  position="right"
  title="Right Drawer"
>
  <div>Content</div>
</Drawer>

// Without backdrop
<Drawer
  isOpen={isOpen}
  setIsOpen={setIsOpen}
  type="sidebar"
  backdrop={false}
>
  <div>Content</div>
</Drawer>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default DrawerSection;

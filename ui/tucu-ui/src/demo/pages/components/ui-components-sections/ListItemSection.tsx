import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  ListItem,
  LucideIcons,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { PropPlayground } from '../../../components/prop-playground';

const ListItemSection: React.FC = () => {
  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          ListItem
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A list item component for displaying items in dropdowns and menus with
          support for icons, labels, and custom content.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic List Items
                </Typography>
                <ul className="space-y-1">
                  <ListItem id="1" label="Item 1" />
                  <ListItem id="2" label="Item 2" />
                  <ListItem id="3" label="Item 3" />
                </ul>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Icons
                </Typography>
                <ul className="space-y-1">
                  <ListItem
                    id="1"
                    label="Home"
                    icon={<LucideIcons.Home className="w-4 h-4" />}
                  />
                  <ListItem
                    id="2"
                    label="Settings"
                    icon={<LucideIcons.Settings className="w-4 h-4" />}
                  />
                  <ListItem
                    id="3"
                    label="Profile"
                    icon={<LucideIcons.User className="w-4 h-4" />}
                  />
                </ul>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  States
                </Typography>
                <ul className="space-y-1">
                  <ListItem id="1" label="Active Item" active />
                  <ListItem id="2" label="Normal Item" />
                  <ListItem id="3" label="Disabled Item" disabled />
                </ul>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Custom Content
                </Typography>
                <ul className="space-y-1">
                  <ListItem
                    id="1"
                    content={
                      <div className="flex items-center gap-2">
                        <LucideIcons.Star className="w-4 h-4" />
                        <span>Custom Content</span>
                      </div>
                    }
                  />
                </ul>
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
      <PropPlayground
        componentName="ListItem"
        defaultValues={{ label: 'List Item', active: false, disabled: false }}
        excludeProps={['onClick', 'content', 'icon', 'id']}
      >
        {(props) => <ListItem {...props} />}
      </PropPlayground>
      <AutoPropsTable componentName="ListItem" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { ListItem, LucideIcons } from '@e-burgos/tucu-ui';

// Basic usage
<ul>
  <ListItem id="1" label="Item 1" />
  <ListItem id="2" label="Item 2" />
</ul>

// With icons
<ListItem
  id="1"
  label="Home"
  icon={<LucideIcons.Home className="w-4 h-4" />}
/>

// With states
<ListItem id="1" label="Active" active />
<ListItem id="2" label="Disabled" disabled />

// With custom content
<ListItem
  id="1"
  content={
    <div className="flex items-center gap-2">
      <LucideIcons.Star className="w-4 h-4" />
      <span>Custom</span>
    </div>
  }
/>

// With onClick
<ListItem
  id="1"
  label="Clickable"
  onClick={() => handleClick()}
/>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default ListItemSection;

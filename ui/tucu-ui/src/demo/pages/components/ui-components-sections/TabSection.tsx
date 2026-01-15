import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
} from '../../../../index';
import {
  TabGroup,
  TabList,
  TabItem,
  TabPanels,
  TabPanel,
} from '../../../../components/tabs';
import { Home, Settings, User, Bell, Mail, Calendar } from 'lucide-react';

const TabSection: React.FC = () => {
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
      prop: 'variant',
      type: "'underline' | 'pills' | 'bordered' | 'solid'",
      default: "'underline'",
      description: 'Visual style variant of the tabs',
    },
    {
      prop: 'size',
      type: "'small' | 'medium' | 'large'",
      default: "'medium'",
      description: 'Size of the tab items',
    },
    {
      prop: 'color',
      type: "'primary' | 'secondary' | 'success' | 'danger'",
      default: '-',
      description: 'Color theme for unselected tabs',
    },
    {
      prop: 'icon',
      type: 'React.ReactNode',
      default: '-',
      description: 'Icon to display before tab label',
    },
    {
      prop: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the tab is disabled',
    },
    {
      prop: 'showMobileIndicator',
      type: 'boolean',
      default: 'true',
      description: 'Show indicator on mobile devices',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Tabs
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A flexible tab component system with multiple variants, smooth
          animations, and mobile-responsive design built on Headless UI.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Variants" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-8">
              <div>
                <Typography tag="h5" className="mb-3">
                  Underline Variant (Default)
                </Typography>
                <TabGroup variant="underline">
                  <TabList variant="underline">
                    <TabItem variant="underline">Overview</TabItem>
                    <TabItem variant="underline">Details</TabItem>
                    <TabItem variant="underline">Settings</TabItem>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <CardContainer className="p-4">
                        <Typography tag="p">
                          Overview content with clean underline design.
                        </Typography>
                      </CardContainer>
                    </TabPanel>
                    <TabPanel>
                      <CardContainer className="p-4">
                        <Typography tag="p">
                          Detailed information with professional styling.
                        </Typography>
                      </CardContainer>
                    </TabPanel>
                    <TabPanel>
                      <CardContainer className="p-4">
                        <Typography tag="p">
                          Settings panel with modern appearance.
                        </Typography>
                      </CardContainer>
                    </TabPanel>
                  </TabPanels>
                </TabGroup>
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  Pills Variant
                </Typography>
                <TabGroup variant="pills">
                  <TabList variant="pills">
                    <TabItem variant="pills">Dashboard</TabItem>
                    <TabItem variant="pills">Analytics</TabItem>
                    <TabItem variant="pills">Reports</TabItem>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <CardContainer className="p-4">
                        <Typography tag="p">
                          Dashboard with rounded pill tabs for a modern look.
                        </Typography>
                      </CardContainer>
                    </TabPanel>
                    <TabPanel>
                      <CardContainer className="p-4">
                        <Typography tag="p">
                          Analytics data with smooth transitions.
                        </Typography>
                      </CardContainer>
                    </TabPanel>
                    <TabPanel>
                      <CardContainer className="p-4">
                        <Typography tag="p">
                          Reports section with clean design.
                        </Typography>
                      </CardContainer>
                    </TabPanel>
                  </TabPanels>
                </TabGroup>
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  Bordered Variant
                </Typography>
                <TabGroup variant="bordered">
                  <TabList variant="bordered">
                    <TabItem variant="bordered">Account</TabItem>
                    <TabItem variant="bordered">Security</TabItem>
                    <TabItem variant="bordered">Billing</TabItem>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <CardContainer className="p-4">
                        <Typography tag="p">
                          Account settings with bordered tab style.
                        </Typography>
                      </CardContainer>
                    </TabPanel>
                    <TabPanel>
                      <CardContainer className="p-4">
                        <Typography tag="p">
                          Security options with clear visual distinction.
                        </Typography>
                      </CardContainer>
                    </TabPanel>
                    <TabPanel>
                      <CardContainer className="p-4">
                        <Typography tag="p">
                          Billing information with professional appearance.
                        </Typography>
                      </CardContainer>
                    </TabPanel>
                  </TabPanels>
                </TabGroup>
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  Solid Variant
                </Typography>
                <TabGroup variant="solid">
                  <TabList variant="solid">
                    <TabItem variant="solid">Profile</TabItem>
                    <TabItem variant="solid">Notifications</TabItem>
                    <TabItem variant="solid">Privacy</TabItem>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <CardContainer className="p-4">
                        <Typography tag="p">
                          Profile section with solid background tabs.
                        </Typography>
                      </CardContainer>
                    </TabPanel>
                    <TabPanel>
                      <CardContainer className="p-4">
                        <Typography tag="p">
                          Notifications center with modern design.
                        </Typography>
                      </CardContainer>
                    </TabPanel>
                    <TabPanel>
                      <CardContainer className="p-4">
                        <Typography tag="p">
                          Privacy settings with clean interface.
                        </Typography>
                      </CardContainer>
                    </TabPanel>
                  </TabPanels>
                </TabGroup>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="With Icons" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-6">
              <div>
                <Typography tag="h5" className="mb-3">
                  Pills with Icons
                </Typography>
                <TabGroup variant="pills">
                  <TabList variant="pills">
                    <TabItem variant="pills" icon={<Home size={16} />}>
                      Home
                    </TabItem>
                    <TabItem variant="pills" icon={<User size={16} />}>
                      Profile
                    </TabItem>
                    <TabItem variant="pills" icon={<Settings size={16} />}>
                      Settings
                    </TabItem>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <CardContainer className="p-4">
                        <Typography tag="p">Home dashboard content.</Typography>
                      </CardContainer>
                    </TabPanel>
                    <TabPanel>
                      <CardContainer className="p-4">
                        <Typography tag="p">
                          User profile information.
                        </Typography>
                      </CardContainer>
                    </TabPanel>
                    <TabPanel>
                      <CardContainer className="p-4">
                        <Typography tag="p">Application settings.</Typography>
                      </CardContainer>
                    </TabPanel>
                  </TabPanels>
                </TabGroup>
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  Bordered with Icons
                </Typography>
                <TabGroup variant="bordered">
                  <TabList variant="bordered">
                    <TabItem variant="bordered" icon={<Mail size={16} />}>
                      Messages
                    </TabItem>
                    <TabItem variant="bordered" icon={<Bell size={16} />}>
                      Alerts
                    </TabItem>
                    <TabItem variant="bordered" icon={<Calendar size={16} />}>
                      Schedule
                    </TabItem>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <CardContainer className="p-4">
                        <Typography tag="p">
                          Your messages and conversations.
                        </Typography>
                      </CardContainer>
                    </TabPanel>
                    <TabPanel>
                      <CardContainer className="p-4">
                        <Typography tag="p">
                          System alerts and notifications.
                        </Typography>
                      </CardContainer>
                    </TabPanel>
                    <TabPanel>
                      <CardContainer className="p-4">
                        <Typography tag="p">
                          Calendar and scheduled events.
                        </Typography>
                      </CardContainer>
                    </TabPanel>
                  </TabPanels>
                </TabGroup>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Sizes" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-6">
              <div>
                <Typography tag="h5" className="mb-3">
                  Small Size
                </Typography>
                <TabGroup variant="pills">
                  <TabList variant="pills">
                    <TabItem variant="pills" size="small">
                      Tab 1
                    </TabItem>
                    <TabItem variant="pills" size="small">
                      Tab 2
                    </TabItem>
                    <TabItem variant="pills" size="small">
                      Tab 3
                    </TabItem>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <CardContainer className="p-4">
                        <Typography tag="p">
                          Small size tabs content.
                        </Typography>
                      </CardContainer>
                    </TabPanel>
                    <TabPanel>
                      <CardContainer className="p-4">
                        <Typography tag="p">
                          Compact design for space-constrained layouts.
                        </Typography>
                      </CardContainer>
                    </TabPanel>
                    <TabPanel>
                      <CardContainer className="p-4">
                        <Typography tag="p">
                          Perfect for dense information displays.
                        </Typography>
                      </CardContainer>
                    </TabPanel>
                  </TabPanels>
                </TabGroup>
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  Large Size
                </Typography>
                <TabGroup variant="pills">
                  <TabList variant="pills">
                    <TabItem variant="pills" size="large">
                      Tab 1
                    </TabItem>
                    <TabItem variant="pills" size="large">
                      Tab 2
                    </TabItem>
                    <TabItem variant="pills" size="large">
                      Tab 3
                    </TabItem>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <CardContainer className="p-4">
                        <Typography tag="p">
                          Large size tabs content.
                        </Typography>
                      </CardContainer>
                    </TabPanel>
                    <TabPanel>
                      <CardContainer className="p-4">
                        <Typography tag="p">
                          Prominent design for main navigation.
                        </Typography>
                      </CardContainer>
                    </TabPanel>
                    <TabPanel>
                      <CardContainer className="p-4">
                        <Typography tag="p">
                          Great for primary interface elements.
                        </Typography>
                      </CardContainer>
                    </TabPanel>
                  </TabPanels>
                </TabGroup>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="States" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-6">
              <div>
                <Typography tag="h5" className="mb-3">
                  With Disabled Tab
                </Typography>
                <TabGroup variant="pills">
                  <TabList variant="pills">
                    <TabItem variant="pills">Active</TabItem>
                    <TabItem variant="pills" disabled>
                      Disabled
                    </TabItem>
                    <TabItem variant="pills">Available</TabItem>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <CardContainer className="p-4">
                        <Typography tag="p">Active tab content.</Typography>
                      </CardContainer>
                    </TabPanel>
                    <TabPanel>
                      <CardContainer className="p-4">
                        <Typography tag="p">This tab is disabled.</Typography>
                      </CardContainer>
                    </TabPanel>
                    <TabPanel>
                      <CardContainer className="p-4">
                        <Typography tag="p">Available tab content.</Typography>
                      </CardContainer>
                    </TabPanel>
                  </TabPanels>
                </TabGroup>
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  Color Variants
                </Typography>
                <TabGroup variant="underline">
                  <TabList variant="underline">
                    <TabItem variant="underline" color="primary">
                      Primary
                    </TabItem>
                    <TabItem variant="underline" color="success">
                      Success
                    </TabItem>
                    <TabItem variant="underline" color="danger">
                      Danger
                    </TabItem>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <CardContainer className="p-4">
                        <Typography tag="p">Primary color theme.</Typography>
                      </CardContainer>
                    </TabPanel>
                    <TabPanel>
                      <CardContainer className="p-4">
                        <Typography tag="p">Success color theme.</Typography>
                      </CardContainer>
                    </TabPanel>
                    <TabPanel>
                      <CardContainer className="p-4">
                        <Typography tag="p">Danger color theme.</Typography>
                      </CardContainer>
                    </TabPanel>
                  </TabPanels>
                </TabGroup>
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
        <CardTitle title="Code Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import {
  TabGroup,
  TabList,
  TabItem,
  TabPanels,
  TabPanel,
} from '@e-burgos/tucu-ui';
import { Home, User, Settings } from 'lucide-react';

// Basic underline tabs
<TabGroup variant="underline">
  <TabList variant="underline">
    <TabItem variant="underline">Tab 1</TabItem>
    <TabItem variant="underline">Tab 2</TabItem>
    <TabItem variant="underline">Tab 3</TabItem>
  </TabList>
  <TabPanels>
    <TabPanel>Content 1</TabPanel>
    <TabPanel>Content 2</TabPanel>
    <TabPanel>Content 3</TabPanel>
  </TabPanels>
</TabGroup>

// Pills variant with icons
<TabGroup variant="pills">
  <TabList variant="pills">
    <TabItem variant="pills" icon={<Home size={16} />}>
      Home
    </TabItem>
    <TabItem variant="pills" icon={<User size={16} />}>
      Profile
    </TabItem>
    <TabItem variant="pills" icon={<Settings size={16} />}>
      Settings
    </TabItem>
  </TabList>
  <TabPanels>
    <TabPanel>Home content</TabPanel>
    <TabPanel>Profile content</TabPanel>
    <TabPanel>Settings content</TabPanel>
  </TabPanels>
</TabGroup>

// Bordered variant with sizes
<TabGroup variant="bordered">
  <TabList variant="bordered">
    <TabItem variant="bordered" size="small">Small</TabItem>
    <TabItem variant="bordered" size="medium">Medium</TabItem>
    <TabItem variant="bordered" size="large">Large</TabItem>
  </TabList>
  <TabPanels>
    <TabPanel>Small content</TabPanel>
    <TabPanel>Medium content</TabPanel>
    <TabPanel>Large content</TabPanel>
  </TabPanels>
</TabGroup>

// Solid variant with disabled tab
<TabGroup variant="solid">
  <TabList variant="solid">
    <TabItem variant="solid">Active</TabItem>
    <TabItem variant="solid" disabled>Disabled</TabItem>
    <TabItem variant="solid">Available</TabItem>
  </TabList>
  <TabPanels>
    <TabPanel>Active content</TabPanel>
    <TabPanel>Disabled content</TabPanel>
    <TabPanel>Available content</TabPanel>
  </TabPanels>
</TabGroup>

// With color variants
<TabGroup variant="underline">
  <TabList variant="underline">
    <TabItem variant="underline" color="primary">Primary</TabItem>
    <TabItem variant="underline" color="success">Success</TabItem>
    <TabItem variant="underline" color="danger">Danger</TabItem>
  </TabList>
  <TabPanels>
    <TabPanel>Primary content</TabPanel>
    <TabPanel>Success content</TabPanel>
    <TabPanel>Danger content</TabPanel>
  </TabPanels>
</TabGroup>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default TabSection;

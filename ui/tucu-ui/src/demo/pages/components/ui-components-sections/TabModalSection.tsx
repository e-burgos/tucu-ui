import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Button,
  HeroCard,
  LucideIcons,
} from '../../../../index';
import { TabModal } from '../../../../components/dialog/tab-modal';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { Activity, BarChart3, Settings } from 'lucide-react';

import { PropPlayground } from '../../../components/prop-playground';
const TabModalSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTabs, setIsOpenTabs] = useState(false);
  const [isOpenContent, setIsOpenContent] = useState(false);

  return (
    <>
      <HeroCard
        title="TabModal"
        description="A modal dialog with built-in tab navigation, header with icon/badge,
          expandable footer, and mobile-first responsive design."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.SquareStack className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Tabs
                </Typography>
                <Button onClick={() => setIsOpenTabs(true)}>
                  Open TabModal (Tabs)
                </Button>
                {isOpenTabs && (
                  <TabModal
                    icon={Activity}
                    title="Dashboard"
                    subtitle="View your activity and stats"
                    badgeHeader="LIVE"
                    badgeHeaderClassName="text-green-600 bg-green-100 border-green-300"
                    tabs={[
                      {
                        icon: BarChart3,
                        name: 'Overview',
                        content: (
                          <div className="space-y-3">
                            <Typography tag="h5">Overview Tab</Typography>
                            <Typography tag="p">
                              This is the overview content with charts and
                              metrics.
                            </Typography>
                          </div>
                        ),
                      },
                      {
                        icon: Settings,
                        name: 'Settings',
                        content: (
                          <div className="space-y-3">
                            <Typography tag="h5">Settings Tab</Typography>
                            <Typography tag="p">
                              Configure your preferences here.
                            </Typography>
                          </div>
                        ),
                      },
                    ]}
                    footerLabel="Last updated: 2 minutes ago"
                    successButton={{
                      label: 'Save',
                      onClick: () => setIsOpenTabs(false),
                    }}
                    onClose={() => setIsOpenTabs(false)}
                  />
                )}
              </CardContainer>

              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Direct Content
                </Typography>
                <Button onClick={() => setIsOpenContent(true)}>
                  Open TabModal (Content)
                </Button>
                {isOpenContent && (
                  <TabModal
                    icon={Settings}
                    title="Preferences"
                    subtitle="Manage your account settings"
                    content={
                      <div className="space-y-4">
                        <Typography tag="p">
                          When you pass the <code>content</code> prop directly,
                          the tab bar is hidden and this content fills the body.
                        </Typography>
                      </div>
                    }
                    onClose={() => setIsOpenContent(false)}
                  />
                )}
              </CardContainer>

              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Minimal (No Tabs, No Content)
                </Typography>
                <Button onClick={() => setIsOpen(true)}>
                  Open Minimal TabModal
                </Button>
                {isOpen && (
                  <TabModal
                    title="Confirmation"
                    successButton={{
                      label: 'Confirm',
                      onClick: () => setIsOpen(false),
                    }}
                    closeButton={{
                      label: 'Cancel',
                      onClick: () => setIsOpen(false),
                    }}
                    onClose={() => setIsOpen(false)}
                  />
                )}
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
      <PropPlayground
        componentName="TabModal"
        title="TabModal Playground"
        defaultValues={{
          'title': 'Modal Title',
          'subtitle': 'Modal subtitle',
          'footerLabel': 'Footer text',
          'closeLabel': 'Cancel'
}}
        excludeProps={['onClose', 'tabs', 'content', 'icon', 'className', 'closeButton', 'successButton', 'badgeHeader', 'badgeHeaderClassName']}
      >
        {(props) => (
          <TabModal
            {...props}
            onClose={() => {}}
            tabs={[
              { title: 'Tab 1', content: <Typography tag="p">Content 1</Typography> },
              { title: 'Tab 2', content: <Typography tag="p">Content 2</Typography> },
            ]}
          />
        )}
      </PropPlayground>



      <AutoPropsTable componentName="TabModal" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { TabModal } from '@e-burgos/tucu-ui';
import { Activity, BarChart3, Settings } from 'lucide-react';
import { useState } from 'react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open</button>
      {isOpen && (
        <TabModal
          icon={Activity}
          title="Dashboard"
          subtitle="Activity overview"
          badgeHeader="LIVE"
          tabs={[
            {
              icon: BarChart3,
              name: 'Overview',
              content: <div>Overview content</div>,
            },
            {
              icon: Settings,
              name: 'Settings',
              content: <div>Settings content</div>,
            },
          ]}
          footerLabel="Last updated: 2 min ago"
          successButton={{ label: 'Save', onClick: () => setIsOpen(false) }}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

// Direct content (no tabs)
<TabModal
  title="Preferences"
  content={<div>Direct body content</div>}
  onClose={() => setIsOpen(false)}
/>

// With expandable footer label
<TabModal
  title="Details"
  content={<div>Body</div>}
  footerLabel="Long description that expands on click..."
  onClose={() => setIsOpen(false)}
/>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default TabModalSection;

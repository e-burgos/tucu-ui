import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Button,
} from '../../../../index';
import { TabModal } from '../../../../components/dialog/tab-modal';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { Activity, BarChart3, Settings } from 'lucide-react';

const TabModalSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTabs, setIsOpenTabs] = useState(false);
  const [isOpenContent, setIsOpenContent] = useState(false);

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          TabModal
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A modal dialog with built-in tab navigation, header with icon/badge,
          expandable footer, and mobile-first responsive design.
        </Typography>
      </div>

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

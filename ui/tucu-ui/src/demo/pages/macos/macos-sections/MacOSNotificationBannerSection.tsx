import React, { useState } from 'react';
import { CardContainer, CardTitle, Typography, CodeBlock, Button, LucideIcons } from '../../../../index';
import { MacOSNotificationBanner } from '../../../../components/macos/notification-banner';

const MacOSNotificationBannerSection: React.FC = () => {
  const [visible, setVisible] = useState({ info: true, success: true, warning: true, error: true });

  const reset = () => setVisible({ info: true, success: true, warning: true, error: true });

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          MacOSNotificationBanner
        </Typography>
        <Typography tag="p" className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A macOS-style notification banner with a color-coded left accent stripe, optional icon,
          action buttons, and dismissible functionality.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="All Variants" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6 space-y-3">
            {visible.info && (
              <MacOSNotificationBanner
                variant="info"
                title="Software update available"
                message="macOS 14.5 is ready to install. This update includes performance improvements and bug fixes."
                icon={<LucideIcons.Info className="w-5 h-5" />}
                actions={[
                  { label: 'Update Now', onClick: () => alert('updating…') },
                  { label: 'Later', onClick: () => setVisible((v) => ({ ...v, info: false })) },
                ]}
                onDismiss={() => setVisible((v) => ({ ...v, info: false }))}
              />
            )}

            {visible.success && (
              <MacOSNotificationBanner
                variant="success"
                title="Backup completed"
                message="Your data has been successfully backed up to iCloud Drive."
                icon={<LucideIcons.CheckCircle className="w-5 h-5" />}
                onDismiss={() => setVisible((v) => ({ ...v, success: false }))}
              />
            )}

            {visible.warning && (
              <MacOSNotificationBanner
                variant="warning"
                title="Low disk space"
                message="Your startup disk is almost full. Free up at least 10 GB to keep your Mac running smoothly."
                icon={<LucideIcons.AlertTriangle className="w-5 h-5" />}
                actions={[{ label: 'Manage Storage', onClick: () => {} }]}
                onDismiss={() => setVisible((v) => ({ ...v, warning: false }))}
              />
            )}

            {visible.error && (
              <MacOSNotificationBanner
                variant="error"
                title="Network error"
                message="Unable to connect to the server. Check your internet connection and try again."
                icon={<LucideIcons.WifiOff className="w-5 h-5" />}
                actions={[{ label: 'Try Again', onClick: () => {} }]}
                onDismiss={() => setVisible((v) => ({ ...v, error: false }))}
              />
            )}

            {!Object.values(visible).some(Boolean) && (
              <div className="text-center text-sm text-gray-400 py-4">
                All banners dismissed.
              </div>
            )}

            <Button size="mini" shape="rounded" onClick={reset}>
              Restore All
            </Button>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Non-dismissible" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <MacOSNotificationBanner
              variant="warning"
              title="Attention required"
              message="This notification cannot be dismissed and requires action."
              dismissible={false}
              actions={[{ label: 'Take Action', onClick: () => {} }]}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { MacOSNotificationBanner } from '@e-burgos/tucu-ui';

// Info banner with action buttons
<MacOSNotificationBanner
  variant="info"
  title="Update available"
  message="macOS 14.5 is ready to install."
  icon={<InfoIcon />}
  actions={[
    { label: 'Update Now', onClick: handleUpdate },
    { label: 'Later', onClick: handleDismiss },
  ]}
  onDismiss={handleDismiss}
/>

// Variants: 'info' | 'success' | 'warning' | 'error'
// Set dismissible={false} to hide the ✕ button`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default MacOSNotificationBannerSection;

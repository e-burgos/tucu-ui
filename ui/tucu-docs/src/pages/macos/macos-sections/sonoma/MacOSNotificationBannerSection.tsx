import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  CodeBlock,
  Button,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { MacOSNotificationBanner } from '@tucu-ui-internal/components/macos/sonoma/feedback/notification-banner';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';

// ─── PropPlayground sub-component (avoids hooks-in-render-prop violation) ──────
function NotificationPlayground(props: {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message?: string;
  dismissible?: boolean;
}) {
  const [visible, setVisible] = useState(true);
  if (!visible) {
    return (
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-gray-500">Banner dismissed</p>
        <Button size="mini" onClick={() => setVisible(true)}>
          Restore
        </Button>
      </div>
    );
  }
  return (
    <div className="w-full max-w-xl mx-auto">
      <MacOSNotificationBanner
        title={props.title || 'Notification'}
        variant={props.variant}
        message={props.message}
        dismissible={props.dismissible}
        onDismiss={
          props.dismissible !== false ? () => setVisible(false) : undefined
        }
        actions={[{ label: 'Action', onClick: () => undefined }]}
      />
    </div>
  );
}

export const MacOSNotificationBannerSection: React.FC = () => {
  const [visible, setVisible] = useState({
    info: true,
    success: true,
    warning: true,
    error: true,
  });
  const reset = () =>
    setVisible({ info: true, success: true, warning: true, error: true });

  return (
    <>
      <HeroCard
        title="NotificationBanner"
        description="macOS-style notification banners with four variants (info, success, warning, error), optional dismiss button, action buttons, custom icons, and smooth enter/exit animations."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-amber-500 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg border border-amber-500/50">
            <LucideIcons.Bell className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="All Variants" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6 space-y-3">
            {visible.info && (
              <MacOSNotificationBanner
                variant="info"
                title="Update available"
                message="macOS 14.5 is now available. Restart to install."
                icon={<LucideIcons.Info className="w-5 h-5" />}
                actions={[{ label: 'Update Now', onClick: () => undefined }]}
                onDismiss={() => setVisible((v) => ({ ...v, info: false }))}
              />
            )}
            {visible.success && (
              <MacOSNotificationBanner
                variant="success"
                title="Backup complete"
                message="Time Machine backup finished successfully."
                icon={<LucideIcons.CheckCircle className="w-5 h-5" />}
                onDismiss={() => setVisible((v) => ({ ...v, success: false }))}
              />
            )}
            {visible.warning && (
              <MacOSNotificationBanner
                variant="warning"
                title="Low storage"
                message="Only 5 GB remaining. Free up space to avoid performance issues."
                icon={<LucideIcons.AlertTriangle className="w-5 h-5" />}
                actions={[{ label: 'Manage', onClick: () => undefined }]}
                onDismiss={() => setVisible((v) => ({ ...v, warning: false }))}
              />
            )}
            {visible.error && (
              <MacOSNotificationBanner
                variant="error"
                title="Network error"
                message="Unable to connect. Check your internet connection."
                icon={<LucideIcons.WifiOff className="w-5 h-5" />}
                actions={[{ label: 'Try Again', onClick: () => undefined }]}
                onDismiss={() => setVisible((v) => ({ ...v, error: false }))}
              />
            )}
            {!Object.values(visible).some(Boolean) && (
              <p className="text-center text-sm text-gray-400 py-4">
                All banners dismissed.
              </p>
            )}
            <div className="flex justify-center pt-2">
              <Button size="mini" shape="rounded" onClick={reset}>
                Restore All
              </Button>
            </div>
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
              actions={[{ label: 'Take Action', onClick: () => undefined }]}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <PropPlayground
        componentName="MacOSNotificationBanner"
        defaultValues={{
          variant: 'info',
          title: 'Notification Title',
          message: 'This is a notification message with details.',
          dismissible: true,
        }}
        controlOverrides={[
          {
            name: 'variant',
            type: 'select',
            options: ['info', 'success', 'warning', 'error'],
            description: 'Banner severity variant',
          },
          { name: 'title', type: 'text', description: 'Banner heading' },
          { name: 'message', type: 'text', description: 'Banner body message' },
          {
            name: 'dismissible',
            type: 'boolean',
            description: 'Show dismiss (×) button',
          },
        ]}
        includeProps={['variant', 'title', 'message', 'dismissible']}
        excludeProps={['className', 'icon', 'actions', 'onDismiss']}
      >
        {(props) => <NotificationPlayground {...props} />}
      </PropPlayground>

      <AutoPropsTable componentName="MacOSNotificationBanner" />

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

// Non-dismissible warning
<MacOSNotificationBanner
  variant="warning"
  title="Attention"
  message="Action required."
  dismissible={false}
  actions={[{ label: 'Take Action', onClick: handle }]}
/>

// Variants: 'info' | 'success' | 'warning' | 'error'`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default MacOSNotificationBannerSection;

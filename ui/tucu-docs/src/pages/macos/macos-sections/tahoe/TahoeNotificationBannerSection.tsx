import React from 'react';
import {
  CardContainer,
  CardTitle,
  CodeBlock,
  LucideIcons,
  HeroCard,
} from '@e-burgos/tucu-ui';
import { MacOSTahoeNotificationBanner } from '@tucu-ui-internal/components/macos/tahoe/controls/notification-banner-tahoe';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';

export const TahoeNotificationBannerSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="Notification Banner"
        description="Glass-material notification banners with colored accent stripes, variant icons, and dismiss functionality."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-amber-500 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg border border-amber-500/50">
            <LucideIcons.Bell className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer>
        <CardTitle title="Variants" className="mt-2 mb-2">
          <div className="flex flex-col gap-4 max-w-lg">
            <MacOSTahoeNotificationBanner
              variant="info"
              title="New update available"
              message="macOS Tahoe 26.1 is ready to be installed."
              dismissible={false}
            />
            <MacOSTahoeNotificationBanner
              variant="success"
              title="Changes saved"
              message="Your preferences have been updated successfully."
              dismissible={false}
            />
            <MacOSTahoeNotificationBanner
              variant="warning"
              title="Low disk space"
              message="Only 2.3 GB remaining on Macintosh HD."
              dismissible={false}
            />
            <MacOSTahoeNotificationBanner
              variant="error"
              title="Connection failed"
              message="Unable to connect to the server. Please check your network."
              dismissible={false}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="With Actions (Array)" className="mt-2 mb-2">
          <div className="max-w-lg">
            <MacOSTahoeNotificationBanner
              variant="info"
              title="Update available"
              message="A new version is ready to download."
              actions={[
                { label: 'Update Now', onClick: () => alert('updating…') },
                { label: 'Later', onClick: () => undefined },
              ]}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="With Actions (ReactNode)" className="mt-2 mb-2">
          <div className="max-w-lg">
            <MacOSTahoeNotificationBanner
              variant="info"
              title="Update available"
              message="A new version is ready to download."
              actions={
                <>
                  <button className="rounded-md bg-[var(--macos-tahoe-accent)] px-3 py-1 text-[12px] font-medium text-white">
                    Update Now
                  </button>
                  <button className="rounded-md px-3 py-1 text-[12px] text-[var(--macos-tahoe-text-muted)]">
                    Later
                  </button>
                </>
              }
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Custom Icon" className="mt-2 mb-2">
          <div className="max-w-lg">
            <MacOSTahoeNotificationBanner
              variant="success"
              title="File uploaded"
              message="photo-2024.jpg has been uploaded to iCloud."
              icon={<LucideIcons.CloudUpload className="h-5 w-5" />}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Dismissible (default)" className="mt-2 mb-2">
          <div className="max-w-lg">
            <MacOSTahoeNotificationBanner
              variant="warning"
              title="Dismiss me"
              message="Click the X button to dismiss this notification."
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <CodeBlock
            code={`import { MacOSTahoeNotificationBanner } from '@e-burgos/tucu-ui';

// With typed action array (recommended)
<MacOSTahoeNotificationBanner
  variant="info"        // 'info' | 'success' | 'warning' | 'error'
  title="Update Available"
  message="A new version is ready."
  dismissible
  onDismiss={() => console.log('dismissed')}
  actions={[
    { label: 'Update Now', onClick: handleUpdate },
    { label: 'Later', onClick: handleDismiss },
  ]}
  icon={<CustomIcon />}  // optional custom icon
/>

// With ReactNode actions (flexible)
<MacOSTahoeNotificationBanner
  variant="success"
  title="Saved"
  actions={<button>Undo</button>}
/>`}
            language="tsx"
          />
        </CardTitle>
      </CardContainer>

      <PropPlayground
        componentName="MacOSTahoeNotificationBanner"
        defaultValues={{
          title: 'Notification title',
          message: 'This is the notification message.',
          variant: 'info',
          dismissible: true,
        }}
        includeProps={['title', 'message', 'variant', 'dismissible']}
        excludeProps={['className', 'actions', 'icon', 'onDismiss']}
      >
        {(props) => (
          <div className="max-w-lg w-full">
            <MacOSTahoeNotificationBanner {...props} />
          </div>
        )}
      </PropPlayground>

      <AutoPropsTable componentName="MacOSTahoeNotificationBanner" />
    </>
  );
};

export default TahoeNotificationBannerSection;

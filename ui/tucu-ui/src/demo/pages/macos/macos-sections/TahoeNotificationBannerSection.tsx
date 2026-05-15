import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  LucideIcons,
} from '../../../../index';
import { MacOSTahoeNotificationBanner } from '../../../../components/macos/tahoe/notification-banner-tahoe';

export const TahoeNotificationBannerSection: React.FC = () => {
  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Notification Banner
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Glass-material notification banners with colored accent stripes,
          variant icons, and dismiss functionality.
        </Typography>
      </div>

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
        <CardTitle title="With Actions" className="mt-2 mb-2">
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
        <CardTitle title="Usage" className="mt-2 mb-2">
          <CodeBlock
            code={`import { MacOSTahoeNotificationBanner } from '@e-burgos/tucu-ui';

<MacOSTahoeNotificationBanner
  variant="info"        // 'info' | 'success' | 'warning' | 'error'
  title="Update Available"
  message="A new version is ready."
  dismissible
  onDismiss={() => console.log('dismissed')}
  actions={<button>Update</button>}
  icon={<CustomIcon />}  // optional custom icon
/>`}
            language="tsx"
          />
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default TahoeNotificationBannerSection;

import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  NotificationCard,
  HeroCard,
  LucideIcons,
} from '../../../../index';
import avatar1Img from '../../../assets/images/avatar/1.png';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { PropPlayground } from '../../../components/prop-playground';

const NotificationCardSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="NotificationCard"
        description="A notification card component for displaying user activity
          notifications with avatar, action type, and timestamp."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Bell className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Followed Notification
                </Typography>
                <NotificationCard
                  type="followed"
                  actor={{ name: 'john_doe', avatar: avatar1Img }}
                  time="2 hours ago"
                  url="/profile/john_doe"
                  notifier="you"
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Liked Notification
                </Typography>
                <NotificationCard
                  type="liked"
                  actor={{ name: 'jane_smith', avatar: avatar1Img }}
                  time="5 minutes ago"
                  url="/post/123"
                  notifier="your post"
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Purchased Notification
                </Typography>
                <NotificationCard
                  type="purchased"
                  actor={{ name: 'alice_wonder', avatar: avatar1Img }}
                  time="1 day ago"
                  url="/item/456"
                  notifier="your item"
                />
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
      <PropPlayground
        componentName="NotificationCard"
        defaultValues={{
          notifier: 'CryptoKing',
          type: 'liked',
          time: '2 hours ago',
          url: '#',
        }}
        excludeProps={['actor']}
      >
        {(props) => (
          <NotificationCard
            {...props}
            actor={{
              name: 'John Doe',
              avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            }}
          />
        )}
      </PropPlayground>
      <AutoPropsTable componentName="NotificationCard" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { NotificationCard } from '@e-burgos/tucu-ui';

// Followed notification
<NotificationCard
  type="followed"
  actor={{ name: 'john_doe', avatar: '/path/to/avatar.jpg' }}
  time="2 hours ago"
  url="/profile/john_doe"
  notifier="you"
/>

// Liked notification
<NotificationCard
  type="liked"
  actor={{ name: 'jane_smith', avatar: '/path/to/avatar.jpg' }}
  time="5 minutes ago"
  url="/post/123"
  notifier="your post"
/>

// Purchased notification
<NotificationCard
  type="purchased"
  actor={{ name: 'alice_wonder', avatar: '/path/to/avatar.jpg' }}
  time="1 day ago"
  url="/item/456"
  notifier="your item"
/>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default NotificationCardSection;

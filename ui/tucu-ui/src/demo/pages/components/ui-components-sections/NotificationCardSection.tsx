import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  NotificationCard,
} from '../../../../index';
import avatar1Img from '../../../assets/images/avatar/1.png';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { PropPlayground } from '../../../components/prop-playground';

const NotificationCardSection: React.FC = () => {
  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          NotificationCard
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A notification card component for displaying user activity
          notifications with avatar, action type, and timestamp.
        </Typography>
      </div>

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

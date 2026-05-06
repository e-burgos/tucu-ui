import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Card,
  Badge,
  Button,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { Users, Settings, Bell } from 'lucide-react';

const CardSection: React.FC = () => {
  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Card
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A flexible card component with optional header, icon, footer, actions,
          and clickable behavior.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card
                title="Basic Card"
                description="A simple card with title and description"
                icon={<Users className="h-5 w-5" />}
              >
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  This is the card body content. You can place any content here.
                </Typography>
              </Card>

              <Card
                title="With Actions"
                description="Card with action buttons in the header"
                icon={<Settings className="h-5 w-5" />}
                actions={
                  <Badge color="success" size="small">
                    Active
                  </Badge>
                }
              >
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  The actions slot renders elements on the right side of the
                  header.
                </Typography>
              </Card>

              <Card
                title="With Footer"
                description="Card with a footer section"
                icon={<Bell className="h-5 w-5" />}
                footer={
                  <div className="flex items-center justify-between">
                    <Typography tag="span" className="text-xs text-gray-500">
                      Last updated 2 hours ago
                    </Typography>
                    <Button variant="ghost" size="mini">
                      View Details
                    </Button>
                  </div>
                }
              >
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Footer content appears at the bottom with a top border
                  separator.
                </Typography>
              </Card>

              <Card
                title="Clickable Card"
                description="Click anywhere on this card"
                onClick={() => alert('Card clicked!')}
              >
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Clickable cards show a hover effect on the border.
                </Typography>
              </Card>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <AutoPropsTable componentName="Card" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { Card, Badge, Button } from '@e-burgos/tucu-ui';
import { Users } from 'lucide-react';

// Basic
<Card
  title="Team Members"
  description="Manage your team"
  icon={<Users className="h-5 w-5" />}
>
  <p>Card body content</p>
</Card>

// With actions and footer
<Card
  title="Notifications"
  actions={<Badge color="info">3 new</Badge>}
  footer={<Button variant="ghost" size="mini">View All</Button>}
>
  <p>You have 3 unread notifications</p>
</Card>

// Clickable
<Card title="Dashboard" onClick={() => navigate('/dashboard')}>
  <p>Click to navigate</p>
</Card>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default CardSection;

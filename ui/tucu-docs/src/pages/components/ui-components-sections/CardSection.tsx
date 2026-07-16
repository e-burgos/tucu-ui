import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Card,
  Badge,
  Button,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';

const { Users, Settings, Bell } = LucideIcons;

const CardSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="Card"
        description="A flexible card component with optional header, icon, footer, actions,
          and clickable behavior."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.CreditCard className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

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
      <PropPlayground
        componentName="Card"
        title="Card Playground"
        defaultValues={{
          'title': 'Card Title',
          'description': 'This is a card description with relevant content.'
}}
        excludeProps={['onClick', 'icon', 'header', 'footer', 'actions', 'className']}
      >
        {(props) => <Card {...props} />}
      </PropPlayground>



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

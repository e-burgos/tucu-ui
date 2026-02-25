import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  AuthorCard,
} from '../../../../index';
import avatar1Img from '../../../assets/images/avatar/1.png';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { PropPlayground } from '../../../components/prop-playground';

const AuthorCardSection: React.FC = () => {
  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          AuthorCard
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A card component for displaying author information with avatar, name,
          and role.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Name and Role
                </Typography>
                <AuthorCard
                  image={avatar1Img}
                  name="John Doe"
                  authorRole="Senior Developer"
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Name Only
                </Typography>
                <AuthorCard image={avatar1Img} name="Jane Smith" />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Avatar Only
                </Typography>
                <AuthorCard image={avatar1Img} />
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
      <PropPlayground
        componentName="AuthorCard"
        defaultValues={{
          name: 'John Doe',
          authorRole: 'Developer',
          image: 'https://randomuser.me/api/portraits/men/1.jpg',
        }}
        excludeProps={[]}
      >
        {(props) => <AuthorCard {...props} />}
      </PropPlayground>
      <AutoPropsTable componentName="AuthorCard" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { AuthorCard } from '@e-burgos/tucu-ui';

// With name and role
<AuthorCard
  image="/path/to/avatar.jpg"
  name="John Doe"
  authorRole="Senior Developer"
/>

// With name only
<AuthorCard
  image="/path/to/avatar.jpg"
  name="Jane Smith"
/>

// Avatar only
<AuthorCard image="/path/to/avatar.jpg" />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default AuthorCardSection;

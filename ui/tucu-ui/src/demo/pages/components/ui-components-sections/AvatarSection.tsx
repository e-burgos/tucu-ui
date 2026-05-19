import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Avatar,
  HeroCard,
  LucideIcons,
} from '../../../../index';
import avatar1Img from '../../../assets/images/avatar/1.png';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { PropPlayground } from '../../../components/prop-playground';

const AvatarSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="Avatar"
        description="A versatile avatar component for displaying user profile images with
          multiple sizes and shapes."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.CircleUser className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Default Avatar
                </Typography>
                <Avatar image={avatar1Img} alt="User avatar" />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Without Border
                </Typography>
                <Avatar image={avatar1Img} alt="User avatar" border={false} />
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Variants" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-6">
              <div>
                <Typography tag="h5" className="mb-3">
                  Sizes
                </Typography>
                <div className="flex items-center gap-4">
                  <Avatar image={avatar1Img} alt="XS" size="xs" />
                  <Avatar image={avatar1Img} alt="SM" size="sm" />
                  <Avatar image={avatar1Img} alt="MD" size="md" />
                  <Avatar image={avatar1Img} alt="LG" size="lg" />
                  <Avatar image={avatar1Img} alt="XL" size="xl" />
                </div>
              </div>
              <div>
                <Typography tag="h5" className="mb-3">
                  Shapes
                </Typography>
                <div className="flex items-center gap-4">
                  <Avatar image={avatar1Img} alt="Circle" shape="circle" />
                  <Avatar image={avatar1Img} alt="Rounded" shape="rounded" />
                </div>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
      <PropPlayground
        componentName="Avatar"
        defaultValues={{
          size: 'md',
          shape: 'circle',
          border: true,
          image: 'https://randomuser.me/api/portraits/men/1.jpg',
          alt: 'Avatar',
        }}
      >
        {(props) => <Avatar {...props} />}
      </PropPlayground>
      <AutoPropsTable componentName="Avatar" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { Avatar } from '@e-burgos/tucu-ui';

// Basic usage
<Avatar image="/path/to/image.jpg" alt="User name" />

// Different sizes
<Avatar image={image} alt="User" size="xs" />
<Avatar image={image} alt="User" size="sm" />
<Avatar image={image} alt="User" size="md" />
<Avatar image={image} alt="User" size="lg" />
<Avatar image={image} alt="User" size="xl" />

// Different shapes
<Avatar image={image} alt="User" shape="circle" />
<Avatar image={image} alt="User" shape="rounded" />

// Without border
<Avatar image={image} alt="User" border={false} />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default AvatarSection;

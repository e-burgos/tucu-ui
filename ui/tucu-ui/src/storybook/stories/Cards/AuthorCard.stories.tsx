import type { Meta, StoryFn } from '@storybook/react-vite';
import { AuthorCard } from '../../../components/cards';
import { StoryContainer } from '../../components/StoryContainer';

// Importamos algunas imágenes de avatar para los ejemplos
import Avatar1 from '../../../assets/images/avatar/1.png';
import Avatar2 from '../../../assets/images/avatar/2.png';
import Avatar3 from '../../../assets/images/avatar/3.png';
import Avatar4 from '../../../assets/images/avatar/10.jpg';

const meta: Meta<typeof AuthorCard> = {
  title: 'UI COMPONENTS/Cards/AuthorCard',
  tags: ['autodocs'],
  component: AuthorCard,
  parameters: {
    docs: {
      description: {
        component:
          "The AuthorCard component displays an author's avatar along with their name and role. It can be used to show creator information in NFT cards, blog posts, or anywhere user attribution is needed.",
      },
    },
  },
  argTypes: {
    image: {
      control: 'text',
      description: 'URL or imported image for the author avatar',
    },
    name: {
      control: 'text',
      description: 'Name of the author',
    },
    authorRole: {
      control: 'text',
      description: 'Role or title of the author',
    },
  },
  args: {
    image: Avatar1,
    name: 'John Doe',
    authorRole: 'Content Creator',
  },
};

export default meta;

const Template: StoryFn<typeof AuthorCard> = (args) => (
  <StoryContainer className="justify-center items-center">
    <div className="w-full max-w-md">
      <AuthorCard {...args} />
    </div>
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {};

export const WithoutRole = Template.bind({});
WithoutRole.args = {
  name: 'Jane Smith',
  image: Avatar2,
  authorRole: undefined,
};

export const AvatarOnly = Template.bind({});
AvatarOnly.args = {
  image: Avatar3,
  name: undefined,
};

export const DifferentRoles = () => (
  <StoryContainer className="justify-center items-center flex-col gap-4">
    <div className="w-full max-w-md">
      <AuthorCard image={Avatar1} name="Alex Johnson" authorRole="NFT Artist" />
    </div>
    <div className="w-full max-w-md">
      <AuthorCard
        image={Avatar2}
        name="Maria Garcia"
        authorRole="Blockchain Developer"
      />
    </div>
    <div className="w-full max-w-md">
      <AuthorCard
        image={Avatar4}
        name="Sam Lee"
        authorRole="Collection Curator"
      />
    </div>
  </StoryContainer>
);

import {
  Button,
  CardContainer,
  Avatar,
  Typography,
  Badge,
  LucideIcons,
} from '../../../index';

export const Home = (): JSX.Element => {
  const avatarImg =
    'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png';

  return (
    <CardContainer className="flex flex-col items-center justify-center p-6 gap-4">
      <Avatar image={avatarImg} alt="Demo User" size="md" />
      <div className="flex flex-col">
        <Typography tag="h3" className="font-semibold mb-2 text-center">
          Welcome to Tucu UI
        </Typography>
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          <Badge status="active">Production Ready</Badge>
          <Badge variant="outline" color="info">
            TypeScript
          </Badge>
          <Badge variant="outline" color="success">
            React Hook Form
          </Badge>
          <Badge variant="outline" color="warning">
            Tailwind CSS
          </Badge>
        </div>
      </div>
      <Button size="large" shape="rounded" variant="solid" color="primary">
        <div className="flex justify-center items-center">
          <LucideIcons.Zap className="w-4 h-4 mr-2" />
          Get Started
        </div>
      </Button>
    </CardContainer>
  );
};

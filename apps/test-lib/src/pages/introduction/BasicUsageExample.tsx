import {
  Button,
  CardContainer,
  Avatar,
  ThemeProvider,
  Typography,
  Badge,
  LucideIcons,
} from '@tucu-ui';

import '../../../../../dist/ui/tucu-ui/index.css';

function App() {
  return (
    <ThemeProvider
      showSettings
      settingActions={{
        disabledLayout: false,
        disabledPreset: false,
        disabledDirection: false,
        disabledMode: false,
      }}
      logo={{
        name: 'My',
        secondName: 'App',
      }}
      rightButton={
        <Button variant="ghost" size="small">
          Documentation
        </Button>
      }
      // brandColor="Blue" | "Green" | "Black" | "Red" | "Purple" | "Orange" and more colors in the theme provider
      // layout="none | minimal | classic" Layout Options
      menuItems={[
        {
          name: 'Home',
          href: '/',
          icon: <LucideIcons.Home />,
          component: <Home />,
        },
        {
          name: 'About',
          href: '/about',
          icon: <LucideIcons.Info />,
          component: <About />,
        },
      ]}
    />
  );
}

export default App;

export const Home = (): JSX.Element => {
  const avatarImg: string =
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

export const About = (): JSX.Element => {
  return (
    <CardContainer className="flex flex-col items-center justify-center p-6 gap-4">
      <div className="flex flex-col w-full px-4">
        <Typography tag="h3" className="font-semibold mb-2 text-center">
          About My App
        </Typography>
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          <ul className="list-disc list-inside">
            <li className="mb-2">
              This is a demo app built with Tucu UI, React, and Tailwind CSS.
            </li>
            <li className="mb-2">
              It is a simple app that allows you to manage your tasks and
              projects.
            </li>
            <li className="mb-2">
              All the components are built with Tucu UI and are fully
              responsive.
            </li>
            <li className="mb-2">
              The app is fully responsive and works on all devices.
            </li>
            <li className="mb-2">Routes are handled with React Router.</li>
            <li className="mb-2">
              Theme is handled with ThemeProvider and Zustand.
            </li>
            <li className="mb-2">Icons are handled with Lucide React.</li>
          </ul>
        </div>
      </div>
    </CardContainer>
  );
};

import {
  Button,
  CardContainer,
  Avatar,
  ThemeProvider,
  Typography,
  Badge,
  LucideIcons,
  ReactRouter,
} from 'tucu-ui';

// @ts-ignore
import 'tucu-ui/styles';

function App() {
  return (
    <ThemeProvider
      showSettings
      settingActions={{
        disabledLayout: true,
        disabledPreset: false,
        disabledDirection: true,
        disabledMode: false,
      }}
      // brandColor="Blue" | "Green" | "Black" | "Red" | "Purple" | "Orange" and more colors in the theme provider
      layout="none"
      menuItems={[]}
      customRoutes={
        <ReactRouter.Routes>
          <ReactRouter.Route path="/" element={<Home />} />
          <ReactRouter.Route path="/about" element={<About />} />
        </ReactRouter.Routes>
      }
    />
  );
}

export default App;

export const Home = (): JSX.Element => {
  const navigate = ReactRouter.useNavigate();
  const avatarImg: string =
    'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png';

  return (
    <div className="min-h-full px-4 pb-16 pt-16 sm:px-6 sm:pb-20 lg:px-8 xl:pb-24 xl:pt-24 3xl:px-10">
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
        <Button
          size="large"
          shape="rounded"
          variant="solid"
          color="primary"
          onClick={() => {
            navigate('/about');
          }}
        >
          <div className="flex justify-center items-center">
            <LucideIcons.Zap className="w-4 h-4 mr-2" />
            Go to About
          </div>
        </Button>
      </CardContainer>
    </div>
  );
};

export const About = (): JSX.Element => {
  const navigate = ReactRouter.useNavigate();
  return (
    <div className="min-h-full px-4 pb-16 pt-16 sm:px-6 sm:pb-20 lg:px-8 xl:pb-24 xl:pt-24 3xl:px-10">
      <CardContainer className="flex flex-col items-center justify-center p-6">
        <div className="flex flex-col justify-center items-center gap-8 w-full px-4">
          <Typography tag="h3" className="font-semibold mb-4 text-center">
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
        <Button
          size="large"
          shape="rounded"
          variant="solid"
          color="primary"
          onClick={() => {
            navigate('/');
          }}
        >
          Go to Home
        </Button>
      </CardContainer>
    </div>
  );
};

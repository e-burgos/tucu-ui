import {
  Button,
  ListContainer,
  LucideIcons,
  SwitchMode,
  Typography,
} from '@e-burgos/tucu-ui';
import { useGoogleAnalytics } from '../hooks/useGoogleAnalytics';
import { useSEO } from '../hooks/useSEO';

export const RightButton = () => {
  // SEO meta tags will be updated dynamically based on route
  useSEO();

  // Google Analytics
  useGoogleAnalytics();

  return (
    <ListContainer
      label="Options"
      items={[
        {
          id: 'theme',
          content: <SwitchMode />,
        },
        {
          id: 'github',
          content: (
            <Button
              variant="ghost"
              size="small"
              fullWidth
              onClick={() =>
                window.open('https://github.com/e-burgos/tucu-ui', '_blank')
              }
            >
              <LucideIcons.Github className="w-4 h-4" />
              <Typography tag="span" className="text-sm font-medium">
                View on GitHub
              </Typography>
            </Button>
          ),
        },
        {
          id: 'about-me',
          content: (
            <Button
              variant="ghost"
              size="small"
              fullWidth
              onClick={() =>
                window.open('https://www.estebanburgos.com.ar/', '_blank')
              }
            >
              <LucideIcons.Globe className="w-4 h-4" />
              <Typography tag="span" className="text-sm font-medium">
                About Me
              </Typography>
            </Button>
          ),
        },
      ]}
    />
  );
};

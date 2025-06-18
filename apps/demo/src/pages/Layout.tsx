import {
  HomeIcon,
  CalendarIcon,
} from '../../../../ui/tucu-ui/src/components/icons';
import { ThemeProvider } from '../../../../ui/tucu-ui/src/themes/components/theme-provider';
import { LAYOUT_OPTIONS } from '../../../../ui/tucu-ui/src/themes/config';
import App1 from './App1';
import App2 from './App2';

function Layout() {
  return (
    <ThemeProvider
      menuItems={[
        {
          name: 'App1',
          href: '/app1',
          icon: <HomeIcon />,
          component: <App1 />,
        },
        {
          name: 'App2',
          href: '/app2',
          icon: <CalendarIcon />,
          component: <App2 />,
        },
      ]}
      showSettings
      layout={LAYOUT_OPTIONS.MINIMAL}
    />
  );
}

export default Layout;

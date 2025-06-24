import { ThemeProvider, HomeIcon, CalendarIcon, Button } from 'tucu-ui';
import App1 from './App1';
import App2 from './App2';

function Layout() {
  return (
    <ThemeProvider
      showSettings
      settingActions={{
        disabledLayout: false,
        disabledPreset: false,
        disabledDirection: false,
        disabledMode: false,
      }}
      rightButton={<Button>Settings</Button>}
      //brandColor="Blue"
      logo={{
        name: 'Demo',
        secondName: 'App',
      }}
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
          dropdownItems: [
            {
              name: 'App2.1',
              href: '/app2/1',
              icon: <CalendarIcon />,
              component: <h1>App2.1</h1>,
            },
            {
              name: 'App2.2',
              href: '/app2/2',
              icon: <CalendarIcon />,
              component: <h1>App2.2</h1>,
            },
          ],
        },
      ]}
    />
  );
}

export default Layout;

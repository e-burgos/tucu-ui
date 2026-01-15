import { NavOptions, ThemeProvider } from '@tucu-ui';
import { useMenuItems } from './router/menuItems';

function App() {
  const { menuItems } = useMenuItems();

  return (
    <ThemeProvider
      isAuthenticated={true}
      showSettings
      rightButton={<NavOptions />}
      logo={{
        path: '/',
      }}
      menuItems={menuItems}
    />
  );
}

export default App;

import { ThemeProvider, NavOptions } from '@e-burgos/tucu-ui';
import { useMenuItems } from './router/menuItems';

function App() {
  const { menuItems } = useMenuItems();

  return (
    <ThemeProvider
      showSettings
      isAuthenticated
      rightButton={<NavOptions />}
      menuItems={menuItems}
    />
  );
}

export default App;

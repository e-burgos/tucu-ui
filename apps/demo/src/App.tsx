import { ThemeProvider } from '@e-burgos/tucu-ui';
import { useMenuItems } from './router/menuItems';
import { RightButton } from './components/right-button';

function App() {
  const { menuItems } = useMenuItems();

  return (
    <ThemeProvider
      showSettings
      isAuthenticated
      rightButton={<RightButton />}
      menuItems={menuItems}
    />
  );
}

export default App;

import { Button, ThemeProvider } from 'tucu-ui';
import { useMenuItems } from './router/menuItems';
import { DOCUMENTATION_URL } from './utils/constants';

function App() {
  const { menuItems } = useMenuItems();

  return (
    <ThemeProvider
      showSettings
      settingActions={{
        disabledLayout: false,
        disabledPreset: false,
        disabledDirection: false,
        disabledMode: false,
      }}
      rightButton={
        <Button
          variant="ghost"
          size="small"
          onClick={() => {
            window.open(DOCUMENTATION_URL, '_blank');
          }}
        >
          Documentation
        </Button>
      }
      logo={{
        name: 'Tucu',
        secondName: 'UI',
      }}
      //layout="minimal"
      menuItems={menuItems}
    />
  );
}

export default App;

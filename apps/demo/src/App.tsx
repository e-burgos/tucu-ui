import { ThemeProvider, Button } from 'tucu-ui';
import { useMenuItems } from './router/menuItems';
import { DOCUMENTATION_URL } from './utils/constants';

function App() {
  const { staticMenuItems } = useMenuItems();

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
      menuItems={staticMenuItems}
    />
  );
}

export default App;

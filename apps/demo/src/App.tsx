import { Button, LucideIcons, ThemeProvider } from '@e-burgos/tucu-ui';
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
          <div className="flex items-center gap-2">
            <LucideIcons.PlayCircle className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-medium">Playground</span>
          </div>
        </Button>
      }
      logo={{
        name: 'Tucu',
        secondName: 'UI',
      }}
      menuItems={menuItems}
    />
  );
}

export default App;

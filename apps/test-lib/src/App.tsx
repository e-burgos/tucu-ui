import { Button, LucideIcons, TestBrandClasses, ThemeProvider } from '@tucu-ui';
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
        disabledSecondary: false,
        disabledAccent: false,
        disabledDark: false,
        disabledLight: false,
      }}
      rightButton={
        <>
          {/* <TestBrandClasses /> */}
          <Button
            variant="ghost"
            size="small"
            onClick={() => {
              window.open(DOCUMENTATION_URL, '_blank');
            }}
          >
            Documentation
          </Button>
        </>
      }
      logo={{
        name: 'Tucu',
        secondName: 'UI',
        path: '/',
        logo: <LucideIcons.Palette />,
      }}
      //layout="minimal"
      //brandColor="Beige"
      customPaletteColor={
        {
          // primary: 'Bufus',
          // secondary: '#f5f5dc',
          // accent: '#7f6052',
          // dark: '#9c1212',
          //light: '#298e44',
        }
      }
      menuItems={menuItems}
    />
  );
}

export default App;

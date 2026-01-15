import {
  SwitchMode,
  ListContainer,
  Button,
  LucideIcons,
  ListItemProps,
  ReactRouter,
  useTheme,
} from '@e-burgos/tucu-ui';
import { useAuthGlobalStore } from '@/store/useAuthGlobalStore';
import { ROUTES } from '@/router/routes-config';

export const NavOptions = () => {
  const navigate = ReactRouter.useNavigate();
  const { setIsSettingsOpen } = useTheme();
  const { isAuthenticated, user, logout } = useAuthGlobalStore();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.Authentication.Login);
  };

  const handleLogin = () => {
    navigate(ROUTES.Authentication.Login);
  };

  const handleProfile = () => {
    navigate(ROUTES.UserProfile.Base);
  };

  return (
    <ListContainer
      label={
        !isAuthenticated
          ? 'Options'
          : `Welcome ${user?.firstName} ${user?.lastName}`
      }
      items={
        [
          {
            id: 'theme',
            content: <SwitchMode />,
          },
          {
            id: 'settings',
            content: (
              <Button
                fullWidth
                size="small"
                variant="ghost"
                onClick={() => setIsSettingsOpen(true)}
              >
                <LucideIcons.SettingsIcon className="w-4 h-4" />
                Settings
              </Button>
            ),
          },
          isAuthenticated && {
            id: 'logout',
            content: (
              <Button
                fullWidth
                size="small"
                variant="ghost"
                onClick={handleProfile}
              >
                <LucideIcons.UserIcon className="w-4 h-4" />
                Profile
              </Button>
            ),
          },
          {
            id: 'layout',
            content: isAuthenticated ? (
              <Button
                fullWidth
                size="small"
                variant="ghost"
                color="danger"
                onClick={handleLogout}
              >
                <LucideIcons.LogOutIcon className="w-4 h-4" />
                Logout
              </Button>
            ) : (
              <Button
                fullWidth
                size="small"
                variant="ghost"
                onClick={handleLogin}
              >
                <LucideIcons.LogInIcon className="w-4 h-4" />
                Login
              </Button>
            ),
          },
        ].filter(Boolean) as ListItemProps[]
      }
    />
  );
};

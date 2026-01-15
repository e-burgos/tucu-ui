import {
  CardContainer,
  Typography,
  Button,
  LucideIcons,
} from '@e-burgos/tucu-ui';

interface DangerZoneCardProps {
  onLogoutClick: () => void;
}

export const DangerZoneCard = ({ onLogoutClick }: DangerZoneCardProps) => {
  return (
    <CardContainer className="flex flex-col h-auto p-4 border border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-950/20">
      <Typography
        tag="h3"
        className="text-lg font-bold text-red-900 dark:text-red-400 mb-4 shrink-0"
      >
        Danger Zone
      </Typography>
      <div className="shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <Typography
              tag="p"
              className="font-semibold text-gray-900 dark:text-white mb-1"
            >
              Logout
            </Typography>
            <Typography
              tag="p"
              className="text-sm text-gray-600 dark:text-gray-400"
            >
              Sign out from your account
            </Typography>
          </div>
          <Button
            variant="ghost"
            color="primary"
            size="medium"
            onClick={onLogoutClick}
          >
            <LucideIcons.LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </CardContainer>
  );
};

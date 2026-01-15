import {
  CardContainer,
  Typography,
  Button,
  LucideIcons,
} from '@e-burgos/tucu-ui';

interface SecuritySettingsCardProps {
  onChangePasswordClick: () => void;
  onEnable2FAClick: () => void;
}

export const SecuritySettingsCard = ({
  onChangePasswordClick,
  onEnable2FAClick,
}: SecuritySettingsCardProps) => {
  return (
    <CardContainer className="flex flex-col h-auto p-4 border border-gray-200 dark:border-gray-700">
      <Typography
        tag="h3"
        className="text-xl font-bold text-gray-900 dark:text-white mb-4 shrink-0"
      >
        Security Settings
      </Typography>
      <div className="flex flex-col space-y-2 shrink-0">
        <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand/10 dark:bg-brand/20 flex items-center justify-center text-brand">
              <LucideIcons.Lock className="w-4 h-4" />
            </div>
            <div>
              <Typography
                tag="p"
                className="font-semibold text-gray-900 dark:text-white"
              >
                Change Password
              </Typography>
              <Typography
                tag="p"
                className="text-sm text-gray-600 dark:text-gray-400"
              >
                Update your password to keep your account secure
              </Typography>
            </div>
          </div>
          <Button
            variant="ghost"
            color="primary"
            size="small"
            onClick={onChangePasswordClick}
          >
            Change
          </Button>
        </div>

        <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand/10 dark:bg-brand/20 flex items-center justify-center text-brand">
              <LucideIcons.Shield className="w-4 h-4" />
            </div>
            <div>
              <Typography
                tag="p"
                className="font-semibold text-gray-900 dark:text-white"
              >
                Two-Factor Authentication
              </Typography>
              <Typography
                tag="p"
                className="text-sm text-gray-600 dark:text-gray-400"
              >
                Add an extra layer of security to your account
              </Typography>
            </div>
          </div>
          <Button
            variant="ghost"
            color="primary"
            size="small"
            onClick={onEnable2FAClick}
          >
            Enable
          </Button>
        </div>
      </div>
    </CardContainer>
  );
};

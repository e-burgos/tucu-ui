import { Button, Typography, LucideIcons } from '@e-burgos/tucu-ui';
import { useAuthGlobalStore } from '@e-burgos-mfe/auth-security';
import { APP_URLS, navigateBetweenApps } from '@e-burgos-mfe/utils';

export const SuccessLoginMessage = () => {
  const { user } = useAuthGlobalStore();
  return (
    <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-md">
      {/* Success Icon */}
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30">
        <LucideIcons.CheckCircleIcon
          size={48}
          className="text-green-600 dark:text-green-400"
        />
      </div>

      {/* Title */}
      <Typography tag="h2" fontFamily="default" className="font-bold text-xl">
        Logged In Successfully
      </Typography>

      {/* Message */}
      <Typography
        tag="p"
        className="text-sm text-gray-600 dark:text-gray-300"
        fontFamily="default"
      >
        Welcome back {user?.firstName} {user?.lastName}! You have successfully
        logged in to your account with the email{' '}
        <span className="font-bold">{user?.email}</span>.
      </Typography>

      {/* Action Button */}
      <Button
        size="large"
        fullWidth
        onClick={() => navigateBetweenApps(APP_URLS.DASHBOARD)}
      >
        Go to Dashboard
      </Button>
    </div>
  );
};

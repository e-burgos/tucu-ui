import {
  Button,
  Typography,
  ReactRouter,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { ROUTES } from '../../../router/routes-config';
import { useAuthGlobalStore } from '@e-burgos-mfe/auth-security';

export const SuccessResetPasswordMessage = () => {
  const { user } = useAuthGlobalStore();
  const navigate = ReactRouter.useNavigate();

  const formattedPhoneNumber = user
    ? `${user.countryCode} ${user.phoneNumber}`
    : '';

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
        Password Reset Successful
      </Typography>

      {/* Message */}
      <Typography
        tag="p"
        className="text-sm text-gray-600 dark:text-gray-300"
        fontFamily="default"
      >
        Your password has been successfully reset. Your phone number is{' '}
        <span className="font-bold">{formattedPhoneNumber}</span>. You can now
        log in with your new password.
      </Typography>

      {/* Action Button */}
      <Button size="large" fullWidth onClick={() => navigate(ROUTES.Login)}>
        Go to Login
      </Button>
    </div>
  );
};

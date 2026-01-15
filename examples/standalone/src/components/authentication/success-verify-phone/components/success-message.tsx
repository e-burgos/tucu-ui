import {
  Button,
  Typography,
  ReactRouter,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { ROUTES } from '@/router/routes-config';
import { useAuthGlobalStore } from '@/store/useAuthGlobalStore';

export const SuccessVerifyPhoneMessage = () => {
  const { user } = useAuthGlobalStore();
  const navigate = ReactRouter.useNavigate();

  const formattedPhoneNumber = `${user?.countryCode} ${user?.phoneNumber}`;

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
        Phone Verified Successfully
      </Typography>

      {/* Message */}
      <Typography
        tag="p"
        className="text-sm text-gray-600 dark:text-gray-300"
        fontFamily="default"
      >
        Your phone number{' '}
        <span className="font-bold">{formattedPhoneNumber}</span> has been
        verified successfully. Your verification code is{' '}
        <span className="font-bold">{user?.verificationCode}</span>. You can now
        log in to your account.
      </Typography>

      {/* Action Button */}
      <Button
        size="large"
        fullWidth
        onClick={() => navigate(ROUTES.Authentication.Login)}
      >
        Go to Login
      </Button>
    </div>
  );
};

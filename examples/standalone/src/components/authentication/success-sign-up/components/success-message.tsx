import {
  Button,
  Typography,
  ReactRouter,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { ROUTES } from '@/router/routes-config';

export const SuccessSignUpMessage = () => {
  const navigate = ReactRouter.useNavigate();

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
        Account Created Successfully
      </Typography>

      {/* Message */}
      <Typography
        tag="p"
        className="text-sm text-gray-600 dark:text-gray-300"
        fontFamily="default"
      >
        Your account has been created successfully. Please verify your phone
        number to continue.
      </Typography>

      {/* Action Button */}
      <Button
        size="large"
        fullWidth
        onClick={() => navigate(ROUTES.Authentication.VerifyPhone)}
      >
        Verify Phone Number
      </Button>
    </div>
  );
};

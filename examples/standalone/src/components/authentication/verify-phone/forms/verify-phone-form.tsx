import { useState } from 'react';
import { Button, Form, Typography, ReactRouter } from '@e-burgos/tucu-ui';
import {
  VerifyPhoneFormValues,
  defaultValues,
  formValidations,
} from './validations';
import { useResendCode } from '../hooks/useResendCode';
import { TroubleshootingModal } from '../components/troubleshooting-modal';
import { ROUTES } from '@/router/routes-config';
import PinCodeField from './pin-code-field';
import { useAuthGlobalStore } from '@/store/useAuthGlobalStore';

const VerifyPhoneForm = () => {
  const { user, setUser } = useAuthGlobalStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = ReactRouter.useNavigate();

  const formattedPhoneNumber = `${user?.countryCode} ${user?.phoneNumber}`;

  const handleResendCode = () => {
    console.log('Resending verification code...');
    // Handle resend code logic here
  };

  const { countdown, handleResend } = useResendCode({
    initialCountdown: 50,
    onResend: handleResendCode,
  });

  const handleSubmit = (values: VerifyPhoneFormValues) => {
    setUser({ verificationCode: values.code, isVerified: true });
    navigate(ROUTES.Authentication.SuccessVerifyPhone);
  };

  return (
    <div className="flex flex-col justify-center space-y-4 h-full w-full max-w-md">
      {/* Title */}
      <div className="text-center">
        <Typography tag="h2" fontFamily="default" className="font-bold">
          You are almost there
        </Typography>
      </div>

      {/* Instructions */}
      <div className="text-center">
        <Typography
          tag="p"
          className="text-sm text-gray-600"
          fontFamily="default"
        >
          Enter the 6 digits verification code sent to{' '}
          <span className="font-bold">{formattedPhoneNumber}</span>, valid for
          15 minutes.
        </Typography>
      </div>

      {/* Form */}
      <Form<VerifyPhoneFormValues>
        onSubmit={handleSubmit}
        validationSchema={formValidations}
        useFormProps={{
          defaultValues,
          mode: 'onChange',
        }}
      >
        <div className="space-y-4">
          {/* Pin Code Input */}
          <PinCodeField />

          {/* Resend Code */}
          <div className="text-right">
            {countdown > 0 ? (
              <Typography
                tag="p"
                className="text-sm text-gray-500"
                fontFamily="default"
              >
                Resend code in {countdown} s
              </Typography>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-sm text-primary font-bold hover:cursor-pointer hover:underline"
              >
                Get Code
              </button>
            )}
          </div>

          <div className="text-center space-y-2">
            <Button type="submit" size="large" fullWidth>
              Confirm
            </Button>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="text-sm text-primary font-bold hover:cursor-pointer hover:underline"
            >
              Didn't receive the code yet?
            </button>
          </div>
        </div>
      </Form>

      {/* Modal for troubleshooting */}
      <TroubleshootingModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
};

export default VerifyPhoneForm;

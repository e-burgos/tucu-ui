import {
  Button,
  Form,
  FormField,
  Input,
  Select,
  Typography,
  ReactRouter,
  LucideIcons,
  Alert,
} from '@e-burgos/tucu-ui';
import {
  ForgotPasswordFormValues,
  defaultValues,
  formValidations,
} from './validations';
import { ROUTES } from '@/router/routes-config';
import { useFlagOptions } from '@/hooks/useFlagOptions';
import { useAuthGlobalStore } from '@/store/useAuthGlobalStore';
import { useState } from 'react';

const ForgotPasswordForm = () => {
  const navigate = ReactRouter.useNavigate();
  const { options: countryOptions } = useFlagOptions();
  const { setUser } = useAuthGlobalStore();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = (values: ForgotPasswordFormValues) => {
    if (!values.phoneNumber || !values.countryCode) {
      setErrorMessage('Phone number and country code are required');
      return;
    }

    setUser({
      phoneNumber: values.phoneNumber,
      countryCode: values.countryCode,
    });
    navigate(ROUTES.Authentication.ResetPassword);
  };

  return (
    <div className="flex flex-col justify-center space-y-4 h-full w-full max-w-md">
      {errorMessage && (
        <Alert className="mt-4" variant="error">
          {errorMessage}
        </Alert>
      )}
      {/* Title */}
      <div className="text-center">
        <Typography tag="h2" fontFamily="default" className="font-bold">
          Forgot password?
        </Typography>
        <Typography
          tag="p"
          className="text-sm text-gray-600 mt-2"
          fontFamily="default"
        >
          Enter your mobile number and we'll send you a link to reset your
          password.
        </Typography>
      </div>

      {/* Form */}
      <Form<ForgotPasswordFormValues>
        onSubmit={handleSubmit}
        validationSchema={formValidations}
        useFormProps={{
          defaultValues,
          mode: 'onChange',
        }}
      >
        <div className="flex items-start justify-center gap-2 w-full">
          <FormField<ForgotPasswordFormValues>
            name="countryCode"
            className="w-24 sm:w-28"
          >
            <Select options={countryOptions} variant="solid" />
          </FormField>
          <FormField<ForgotPasswordFormValues>
            name="phoneNumber"
            className="flex-1"
          >
            <Input
              type="tel"
              placeholder="Enter your mobile number"
              variant="solid"
              icon={<LucideIcons.PhoneIcon size={16} />}
            />
          </FormField>
        </div>

        <div className="space-y-2">
          <Button type="submit" size="large" fullWidth>
            Send reset link
          </Button>
          {/* Back to Login Link */}
          <div className="text-center">
            <button
              onClick={() => navigate(ROUTES.Authentication.Login)}
              className="text-sm text-primary font-bold hover:cursor-pointer hover:underline"
            >
              Back to log in
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;

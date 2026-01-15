import React from 'react';
import {
  Button,
  Form,
  FormField,
  Input,
  Typography,
  ReactRouter,
  LucideIcons,
  Alert,
} from '@e-burgos/tucu-ui';
import {
  ResetPasswordFormValues,
  defaultValues,
  formValidations,
} from './validations';
import { ROUTES } from '@/router/routes-config';
import { useAuthGlobalStore } from '@/store/useAuthGlobalStore';

const ResetPasswordForm = () => {
  const navigate = ReactRouter.useNavigate();
  const { user, setPassword } = useAuthGlobalStore();
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const handleSubmit = (values: ResetPasswordFormValues) => {
    if (!user) {
      setErrorMessage('User not found');
      return;
    }

    if (values.oldPassword !== user.currentPassword) {
      setErrorMessage('Old password is incorrect');
      return;
    }

    setPassword(values.password);
    navigate(ROUTES.Authentication.SuccessResetPassword);
  };

  return (
    <div className="flex flex-col justify-center space-y-4 h-full w-full max-w-md">
      <div className="text-center">
        {errorMessage && (
          <Alert className="mt-4" variant="error">
            {errorMessage}
          </Alert>
        )}
      </div>
      {/* Title */}
      <div className="text-center">
        <Typography tag="h2" fontFamily="default" className="font-bold">
          Reset password
        </Typography>
        <Typography
          tag="p"
          className="text-sm text-gray-600 mt-2"
          fontFamily="default"
        >
          Enter your new password below.
        </Typography>
      </div>

      {/* Form */}
      <Form<ResetPasswordFormValues>
        onSubmit={handleSubmit}
        validationSchema={formValidations}
        useFormProps={{
          defaultValues,
          mode: 'onChange',
        }}
      >
        <div className="space-y-2">
          {/* Old Password Input */}
          <FormField<ResetPasswordFormValues> name="oldPassword">
            <Input
              type="password"
              placeholder="Old password"
              variant="solid"
              icon={<LucideIcons.LockKeyholeIcon size={16} />}
            />
          </FormField>
          {/* Password Input */}
          <FormField<ResetPasswordFormValues> name="password">
            <Input
              type="password"
              placeholder="New password"
              variant="solid"
              icon={<LucideIcons.LockKeyholeIcon size={16} />}
            />
          </FormField>

          {/* Confirm Password Input */}
          <FormField<ResetPasswordFormValues> name="confirmPassword">
            <Input
              type="password"
              placeholder="Confirm new password"
              variant="solid"
              icon={<LucideIcons.LockKeyholeIcon size={16} />}
            />
          </FormField>
        </div>

        <div className="space-y-2">
          <Button type="submit" size="large" fullWidth>
            Reset password
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

export default ResetPasswordForm;

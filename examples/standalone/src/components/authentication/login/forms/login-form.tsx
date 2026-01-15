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
import { LoginFormValues, defaultValues, formValidations } from './validations';
import { ROUTES } from '@/router/routes-config';
import { useAuthGlobalStore } from '@/store/useAuthGlobalStore';
import React from 'react';

const LoginForm = () => {
  const navigate = ReactRouter.useNavigate();

  const { user, setAuthenticated } = useAuthGlobalStore();
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const handleSubmit = (values: LoginFormValues) => {
    if (!user) {
      setErrorMessage('User not found');
      return;
    }

    if (values.email !== user.email) {
      setErrorMessage('Email is incorrect');
      return;
    }

    if (values.password !== user.currentPassword) {
      setErrorMessage('Current password is incorrect');
      return;
    }

    if (user) setAuthenticated(true);
    navigate(ROUTES.Authentication.SuccessLogin);
  };

  return (
    <div className="flex flex-col justify-center space-y-4 h-full w-full max-w-md">
      {/* Title */}
      <div className="text-center">
        <Typography tag="h2" fontFamily="default" className="font-bold">
          Log in
        </Typography>
        {errorMessage && (
          <Alert className="mt-4" variant="error">
            {errorMessage}
          </Alert>
        )}
      </div>

      {/* Form */}
      <Form<LoginFormValues>
        onSubmit={handleSubmit}
        validationSchema={formValidations}
        useFormProps={{
          defaultValues,
          mode: 'onChange',
        }}
      >
        <div className="space-y-2">
          {/* Email Input */}
          <FormField<LoginFormValues> name="email">
            <Input
              type="email"
              placeholder="Email"
              variant="solid"
              icon={<LucideIcons.MailIcon size={16} />}
            />
          </FormField>

          {/* Password Input */}
          <FormField<LoginFormValues> name="password">
            <Input
              type="password"
              placeholder="Password"
              variant="solid"
              icon={<LucideIcons.LockKeyholeIcon size={16} />}
            />
          </FormField>
        </div>

        {/* Forgot Password Link */}
        <div className="text-right">
          <button
            type="button"
            onClick={() => navigate(ROUTES.Authentication.ForgotPassword)}
            className="text-sm text-primary font-bold hover:cursor-pointer hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <div className="space-y-2">
          <Button type="submit" size="large" fullWidth>
            Log in
          </Button>
          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => navigate(ROUTES.Authentication.SignUp)}
                className="text-primary font-bold hover:cursor-pointer hover:underline"
              >
                Sign up now
              </button>
            </p>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;

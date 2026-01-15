import { type IAppRouteConfig, ReactRouter } from '@e-burgos/tucu-ui';
import { APP_PATHS } from '@e-burgos-mfe/utils';
import {
  SignUpPageComponent,
  LoginPageComponent,
  ForgotPasswordPageComponent,
  ResetPasswordPageComponent,
  VerifyPhonePageComponent,
  SuccessResetPasswordPageComponent,
  SuccessSignUpPageComponent,
  SuccessVerifyPhonePageComponent,
  SuccessLoginPageComponent,
} from './entry-points';

export const ROUTES = {
  Base: APP_PATHS.AUTHENTICATION,
  Login: `${APP_PATHS.AUTHENTICATION}/login`,
  SignUp: `${APP_PATHS.AUTHENTICATION}/sign-up`,
  ForgotPassword: `${APP_PATHS.AUTHENTICATION}/forgot-password`,
  ResetPassword: `${APP_PATHS.AUTHENTICATION}/reset-password`,
  VerifyPhone: `${APP_PATHS.AUTHENTICATION}/verify-phone`,
  SuccessResetPassword: `${APP_PATHS.AUTHENTICATION}/success-reset-password`,
  SuccessSignUp: `${APP_PATHS.AUTHENTICATION}/success-sign-up`,
  SuccessLogin: `${APP_PATHS.AUTHENTICATION}/success-login`,
  SuccessVerifyPhone: `${APP_PATHS.AUTHENTICATION}/success-verify-phone`,
};

export const useRoutesConfig = (): IAppRouteConfig[] => {
  return [
    {
      key: 'authentication',
      path: ROUTES.Base,
      element: <ReactRouter.Navigate replace to={ROUTES.Login} />,
    },
    {
      key: 'authentication-login',
      path: ROUTES.Login,
      element: <LoginPageComponent />,
    },
    {
      key: 'authentication-sign-up',
      path: ROUTES.SignUp,
      element: <SignUpPageComponent />,
    },
    {
      key: 'authentication-forgot-password',
      path: ROUTES.ForgotPassword,
      element: <ForgotPasswordPageComponent />,
    },
    {
      key: 'authentication-reset-password',
      path: ROUTES.ResetPassword,
      element: <ResetPasswordPageComponent />,
    },
    {
      key: 'authentication-verify-phone',
      path: ROUTES.VerifyPhone,
      element: <VerifyPhonePageComponent />,
    },
    {
      key: 'authentication-success-reset-password',
      path: ROUTES.SuccessResetPassword,
      element: <SuccessResetPasswordPageComponent />,
    },
    {
      key: 'authentication-success-sign-up',
      path: ROUTES.SuccessSignUp,
      element: <SuccessSignUpPageComponent />,
    },
    {
      key: 'authentication-success-verify-phone',
      path: ROUTES.SuccessVerifyPhone,
      element: <SuccessVerifyPhonePageComponent />,
    },
    {
      key: 'authentication-success-login',
      path: ROUTES.SuccessLogin,
      element: <SuccessLoginPageComponent />,
    },
  ].filter((route) => route);
};

import React, { lazy } from 'react';

const SignUpPage = lazy(() => import('../pages/sign-up-page'));
const LoginPage = lazy(() => import('../pages/login-page'));
const ForgotPasswordPage = lazy(() => import('../pages/forgot-password-page'));
const ResetPasswordPage = lazy(() => import('../pages/reset-password-page'));
const VerifyPhonePage = lazy(() => import('../pages/verify-phone-page'));
const SuccessResetPasswordPage = lazy(
  () => import('../pages/success-reset-password-page')
);
const SuccessSignUpPage = lazy(() => import('../pages/success-sign-up-page'));
const SuccessVerifyPhonePage = lazy(
  () => import('../pages/success-verify-phone-page')
);
const SuccessLoginPage = lazy(() => import('../pages/success-login-page'));

export const SignUpPageComponent: React.FC = (props) => (
  <SignUpPage {...props} />
);

export const LoginPageComponent: React.FC = (props) => <LoginPage {...props} />;

export const ForgotPasswordPageComponent: React.FC = (props) => (
  <ForgotPasswordPage {...props} />
);

export const ResetPasswordPageComponent: React.FC = (props) => (
  <ResetPasswordPage {...props} />
);

export const VerifyPhonePageComponent: React.FC = (props) => (
  <VerifyPhonePage {...props} />
);

export const SuccessResetPasswordPageComponent: React.FC = (props) => (
  <SuccessResetPasswordPage {...props} />
);

export const SuccessSignUpPageComponent: React.FC = (props) => (
  <SuccessSignUpPage {...props} />
);

export const SuccessVerifyPhonePageComponent: React.FC = (props) => (
  <SuccessVerifyPhonePage {...props} />
);

export const SuccessLoginPageComponent: React.FC = (props) => (
  <SuccessLoginPage {...props} />
);

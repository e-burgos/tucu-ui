import React, { lazy } from 'react';

const LandingPage = lazy(() => import('../pages/landing/initial-page'));
const LoginPage = lazy(() => import('../pages/authentication/login-page'));
const SignUpPage = lazy(() => import('../pages/authentication/sign-up-page'));
const ForgotPasswordPage = lazy(
  () => import('../pages/authentication/forgot-password-page')
);
const ResetPasswordPage = lazy(
  () => import('../pages/authentication/reset-password-page')
);
const VerifyPhonePage = lazy(
  () => import('../pages/authentication/verify-phone-page')
);
const SuccessLoginPage = lazy(
  () => import('../pages/authentication/success-login-page')
);
const SuccessSignUpPage = lazy(
  () => import('../pages/authentication/success-sign-up-page')
);
const SuccessResetPasswordPage = lazy(
  () => import('../pages/authentication/success-reset-password-page')
);
const SuccessVerifyPhonePage = lazy(
  () => import('../pages/authentication/success-verify-phone-page')
);
const DashboardInitialPage = lazy(
  () => import('../pages/dashboard/initial-page')
);
const DashboardRecentActivityPage = lazy(
  () => import('../pages/dashboard/recent-activity')
);
const UserProfileInitialPage = lazy(
  () => import('../pages/user-profile/initial-page')
);
const LandingIntegrationGuidePage = lazy(
  () => import('../pages/landing/integration-guide')
);
const LandingArchitectureOverviewPage = lazy(
  () => import('../pages/landing/architecture-overview')
);
const LandingDevelopmentGuidePage = lazy(
  () => import('../pages/landing/development-guide')
);

// Landing page components
export const LandingPageComponent: React.FC = () => <LandingPage />;
export const LandingIntegrationGuidePageComponent: React.FC = () => (
  <LandingIntegrationGuidePage />
);
export const LandingArchitectureOverviewPageComponent: React.FC = () => (
  <LandingArchitectureOverviewPage />
);
export const LandingDevelopmentGuidePageComponent: React.FC = () => (
  <LandingDevelopmentGuidePage />
);

// Authentication page components
export const LoginPageComponent: React.FC = () => <LoginPage />;
export const SignUpPageComponent: React.FC = () => <SignUpPage />;
export const ForgotPasswordPageComponent: React.FC = () => (
  <ForgotPasswordPage />
);
export const ResetPasswordPageComponent: React.FC = () => <ResetPasswordPage />;
export const VerifyPhonePageComponent: React.FC = () => <VerifyPhonePage />;
export const SuccessLoginPageComponent: React.FC = () => <SuccessLoginPage />;
export const SuccessSignUpPageComponent: React.FC = () => <SuccessSignUpPage />;
export const SuccessResetPasswordPageComponent: React.FC = () => (
  <SuccessResetPasswordPage />
);
export const SuccessVerifyPhonePageComponent: React.FC = () => (
  <SuccessVerifyPhonePage />
);

// User profile page components
export const UserProfileInitialPageComponent: React.FC = () => (
  <UserProfileInitialPage />
);

// Dashboard page components
export const DashboardInitialPageComponent: React.FC = () => (
  <DashboardInitialPage />
);
export const DashboardRecentActivityPageComponent: React.FC = () => (
  <DashboardRecentActivityPage />
);

import { useMemo } from 'react';
import {
  LandingPageComponent,
  LandingIntegrationGuidePageComponent,
  LandingArchitectureOverviewPageComponent,
  LandingDevelopmentGuidePageComponent,
  LoginPageComponent,
  SignUpPageComponent,
  ForgotPasswordPageComponent,
  ResetPasswordPageComponent,
  VerifyPhonePageComponent,
  SuccessLoginPageComponent,
  SuccessSignUpPageComponent,
  SuccessResetPasswordPageComponent,
  SuccessVerifyPhonePageComponent,
  DashboardInitialPageComponent,
  DashboardRecentActivityPageComponent,
  UserProfileInitialPageComponent,
} from './entry-points';

import {
  type StandaloneAppRoutesMenuItem,
  LucideIcons,
  ReactRouter,
} from '@e-burgos/tucu-ui';

export const ROUTES = {
  Base: '/',
  Landing: {
    Base: '/landing',
    IntegrationGuide: '/landing/integration-guide',
    ArchitectureOverview: '/landing/architecture-overview',
    DevelopmentGuide: '/landing/development-guide',
  },
  Authentication: {
    Base: '/authentication',
    Login: '/authentication/login',
    SignUp: '/authentication/sign-up',
    ForgotPassword: '/authentication/forgot-password',
    ResetPassword: '/authentication/reset-password',
    VerifyPhone: '/authentication/verify-phone',
    SuccessResetPassword: '/authentication/success-reset-password',
    SuccessSignUp: '/authentication/success-sign-up',
    SuccessLogin: '/authentication/success-login',
    SuccessVerifyPhone: '/authentication/success-verify-phone',
  },
  Dashboard: {
    Base: '/dashboard',
    RecentActivity: '/dashboard/recent-activity',
  },
  UserProfile: {
    Base: '/user-profile',
  },
};

export const RoutesConfig = () => {
  const menuItems: StandaloneAppRoutesMenuItem[] = useMemo(
    () => [
      {
        name: 'Home',
        path: ROUTES.Base,
        icon: <LucideIcons.Home />,
        component: <ReactRouter.Navigate to={ROUTES.Landing.Base} replace />,
        hide: true,
      },
      {
        name: 'Authentication',
        path: ROUTES.Authentication.Base,
        icon: <LucideIcons.User />,
        component: (
          <ReactRouter.Navigate to={ROUTES.Authentication.Login} replace />
        ),
        hide: true,
      },
      {
        name: 'Login',
        path: ROUTES.Authentication.Login,
        icon: <LucideIcons.User />,
        component: <LoginPageComponent />,
        hide: true,
      },
      {
        name: 'Sign Up',
        path: ROUTES.Authentication.SignUp,
        icon: <LucideIcons.User />,
        component: <SignUpPageComponent />,
        hide: true,
      },
      {
        name: 'Forgot Password',
        path: ROUTES.Authentication.ForgotPassword,
        icon: <LucideIcons.User />,
        component: <ForgotPasswordPageComponent />,
        hide: true,
      },
      {
        name: 'Reset Password',
        path: ROUTES.Authentication.ResetPassword,
        icon: <LucideIcons.User />,
        component: <ResetPasswordPageComponent />,
        hide: true,
      },
      {
        name: 'Verify Phone',
        path: ROUTES.Authentication.VerifyPhone,
        icon: <LucideIcons.User />,
        component: <VerifyPhonePageComponent />,
        hide: true,
      },
      {
        name: 'Success Login',
        path: ROUTES.Authentication.SuccessLogin,
        icon: <LucideIcons.User />,
        component: <SuccessLoginPageComponent />,
        hide: true,
      },
      {
        name: 'Success Sign Up',
        path: ROUTES.Authentication.SuccessSignUp,
        icon: <LucideIcons.User />,
        component: <SuccessSignUpPageComponent />,
        hide: true,
      },
      {
        name: 'Success Reset Password',
        path: ROUTES.Authentication.SuccessResetPassword,
        icon: <LucideIcons.User />,
        component: <SuccessResetPasswordPageComponent />,
        hide: true,
      },
      {
        name: 'Success Verify Phone',
        path: ROUTES.Authentication.SuccessVerifyPhone,
        icon: <LucideIcons.User />,
        component: <SuccessVerifyPhonePageComponent />,
        hide: true,
      },
      {
        name: 'Dashboard',
        path: ROUTES.Dashboard.Base,
        icon: <LucideIcons.LayoutDashboard />,
        component: <DashboardInitialPageComponent />,
        isPublic: false,
        dropdownItems: [
          {
            name: 'Recent Activity',
            path: ROUTES.Dashboard.RecentActivity,
            icon: <LucideIcons.Activity />,
            component: <DashboardRecentActivityPageComponent />,
            isPublic: false,
          },
        ],
      },
      {
        name: 'User Profile',
        path: ROUTES.UserProfile.Base,
        icon: <LucideIcons.UserCircle />,
        component: <UserProfileInitialPageComponent />,
        isPublic: false,
        hide: true,
      },
      {
        name: 'Docs',
        path: ROUTES.Landing.Base,
        icon: <LucideIcons.BookOpen />,
        component: <LandingPageComponent />,
        dropdownItems: [
          {
            name: 'Integration Guide',
            path: ROUTES.Landing.IntegrationGuide,
            icon: <LucideIcons.BookAIcon />,
            component: <LandingIntegrationGuidePageComponent />,
          },
          {
            name: 'Architecture Overview',
            path: ROUTES.Landing.ArchitectureOverview,
            icon: <LucideIcons.Building />,
            component: <LandingArchitectureOverviewPageComponent />,
          },
          {
            name: 'Development Guide',
            path: ROUTES.Landing.DevelopmentGuide,
            icon: <LucideIcons.Terminal />,
            component: <LandingDevelopmentGuidePageComponent />,
          },
        ],
      },
    ],
    []
  );

  return {
    menuItems,
  };
};

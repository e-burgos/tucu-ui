'use client';

import { FC, Suspense } from 'react';
import { AccessDeniedPage, FallbackPage } from '../../pages';
import { useTucuMessages } from '../../../libs/i18n/use-tucu-messages';

export interface AuthProviderProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  loginUrl: string;
}

export const AuthProvider: FC<AuthProviderProps> = ({
  children,
  isAuthenticated,
  loginUrl,
}) => {
  const messages = useTucuMessages();
  if (!isAuthenticated) {
    return (
      <AccessDeniedPage
        basePath={loginUrl}
        buttonText={messages.accessDenied.login}
      />
    );
  }
  return (
    <Suspense fallback={<FallbackPage loadingText="Loading..." />}>
      {children}
    </Suspense>
  );
};

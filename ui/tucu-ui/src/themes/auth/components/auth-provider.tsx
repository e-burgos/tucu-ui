import { FC, Suspense } from 'react';
import { AccessDeniedPage, FallbackPage } from '../../pages';

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
  if (!isAuthenticated) {
    return <AccessDeniedPage basePath={loginUrl} buttonText="Login" />;
  }
  return (
    <Suspense fallback={<FallbackPage loadingText="Loading..." />}>
      {children}
    </Suspense>
  );
};

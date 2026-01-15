import { RouteProps } from 'react-router-dom';

export type IAppRouteConfig = RouteProps & {
  key: string;
  isPublic?: boolean;
  disabled?: boolean;
};

export enum AppErrorPage {
  ACCESS_DENIED = 'access-denied',
  NOT_FOUND = 'not-found',
  DEFAULT = 'default-error',
  FORBIDDEN = 'forbidden',
  SERVER_ERROR = 'server-error',
  USER_BLOCKED = 'user-blocked',
  UNKNOWN = 'unknown',
}

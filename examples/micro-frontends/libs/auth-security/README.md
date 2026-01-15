# Auth Security Library (Demo Version)

Simplified authentication library for demonstration purposes.

## Overview

This is a demo version of an authentication library that uses Zustand for state management with localStorage persistence. It provides basic authentication state management without external service dependencies.

## Features

- ✅ Simple state management with Zustand
- ✅ LocalStorage persistence
- ✅ TypeScript support
- ✅ Login/Logout functionality
- ✅ Authentication status checking
- ✅ User information management

## Installation

This library is part of the micro-frontends monorepo. Install dependencies:

```bash
pnpm install
```

## Usage

### Basic Authentication

```typescript
import { useAuthGlobalStore, User } from '@e-burgos-mfe/auth-security';

function LoginComponent() {
  const { login, logout, isAuthenticated, user } = useAuthGlobalStore();

  const handleLogin = () => {
    const userData: User = {
      id: '123',
      email: 'user@example.com',
      name: 'John Doe'
    };
    login(userData);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.name}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

### Using Individual Setters

```typescript
import { useAuthStore, User } from '@e-burgos-mfe/auth-security';

function AdvancedAuthComponent() {
  const { setUser, setAuthenticated, user, isAuthenticated } = useAuthGlobalStore();

  // Set user manually
  const handleSetUser = () => {
    const userData: User = {
      id: '456',
      email: 'admin@example.com',
      name: 'Admin User'
    };
    setUser(userData);
  };

  // Set authentication status manually
  const handleSetAuth = (status: boolean) => {
    setAuthenticated(status);
  };

  return (
    <div>
      <h2>Advanced Auth Control</h2>
      <button onClick={handleSetUser}>Set User</button>
      <button onClick={() => handleSetAuth(true)}>Set Authenticated</button>
      <button onClick={() => handleSetAuth(false)}>Set Not Authenticated</button>
    </div>
  );
}
```

### Check Authentication Status

```typescript
import { useAuthStore } from '@e-burgos-mfe/auth-security';

function AuthChecker() {
  const { checkAuth, isAuthenticated } = useAuthGlobalStore();

  useEffect(() => {
    // Check authentication on mount
    const hasAuth = checkAuth();
    console.log('Is authenticated:', hasAuth);
  }, [checkAuth]);

  return (
    <div>
      <p>Authentication Status: {isAuthenticated ? 'Logged In' : 'Logged Out'}</p>
    </div>
  );
}
```

### Using AuthProvider

```typescript
import { AuthProvider } from '@e-burgos-mfe/auth-security';

function App() {
  return (
    <AuthProvider
      loginPath="/login"
      onUnauthenticated={() => {
        console.log('User is not authenticated');
        // Custom logic here
      }}
    >
      <YourProtectedContent />
    </AuthProvider>
  );
}
```

## API Reference

### AuthState Interface

```typescript
interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoggingOut: boolean;

  // Setters
  setUser: (user: User | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setLoggingOut: (isLoggingOut: boolean) => void;

  // Compound actions
  login: (user: User) => void;
  logout: () => void;
  checkAuth: () => boolean;
}
```

### Store Methods

#### `setUser(user: User | null)`

Set the current user information.

#### `setAuthenticated(isAuthenticated: boolean)`

Set the authentication status.

#### `setLoggingOut(isLoggingOut: boolean)`

Set the logging out status (for UI loading states).

#### `login(user: User)`

Login with user information. Sets the user and marks as authenticated.

#### `logout()`

Logout the current user. Clears user data and authentication status.

#### `checkAuth(): boolean`

Check if the user is currently authenticated. Returns `true` if authenticated and user exists.

### AuthProvider Props

```typescript
interface AuthProviderProps {
  children: React.ReactNode;
  loginPath?: string; // Default: '/login'
  onUnauthenticated?: () => void; // Callback when not authenticated
}
```

## LocalStorage Persistence

The store automatically persists the following state to localStorage:

- `user`: User information
- `isAuthenticated`: Authentication status

The data is stored under the key `demo-auth-storage`.

## Notes

⚠️ **This is a demo version**

This library is simplified for demonstration purposes. In a production environment:

1. Integrate with a real authentication service (Auth0, Cognito, etc.)
2. Implement token management
3. Add token refresh logic
4. Implement secure session handling
5. Add error handling and retry logic
6. Implement proper security measures

## License

MIT

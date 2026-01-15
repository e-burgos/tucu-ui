import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * User Information Interface
 */
export interface User {
  id: string;
  email: string;
  phoneNumber?: string;
  countryCode?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  bio?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  dateOfBirth?: string;
  gender?: string;
  maritalStatus?: string;
  occupation?: string;
  company?: string;
  education?: string;
  skills?: string[];
  languages?: string[];
  interests?: string[];
  currentPassword?: string;
  acceptTerms?: boolean;
  isVerified?: boolean;
  verificationCode?: string;
}

/**
 * Auth State Interface
 * Simplified version for demo purposes without external service dependencies
 */
export interface AuthGlobalState {
  // User information
  user: User | null;
  isAuthenticated: boolean;
  isLoggingOut: boolean;

  // Actions (setters)
  setUser: (user: Partial<User> | null) => void;
  setPassword: (currentPassword: string) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setLoggingOut: (isLoggingOut: boolean) => void;

  // Compound actions
  login: (user: User) => void;
  logout: () => void;
  checkAuth: () => boolean;
}

/**
 * Auth Store (Demo Version)
 * Manages authentication state using Zustand with localStorage persistence
 * This is a simplified version for demonstration purposes
 * In production, integrate with your authentication service
 */
export const useAuthGlobalStore = create<AuthGlobalState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoggingOut: false,

      // Set user information (supports partial updates)
      setUser: (user: Partial<User> | null) => {
        if (user === null) {
          set({ user: null });
          return;
        }

        const currentUser = get().user;
        if (!currentUser) {
          // If no current user exists, create a new user with the provided data
          // Note: id and email are required fields, so they should be provided
          set({ user: user as User });
          return;
        }

        // Merge current user with partial update
        set({ user: { ...currentUser, ...user } as User });
      },

      setPassword: (currentPassword: string) => {
        const currentUser = get().user;
        if (!currentUser) return;
        set({ user: { ...currentUser, currentPassword } as User });
      },

      // Set authentication status
      setAuthenticated: (isAuthenticated: boolean) => {
        set({ isAuthenticated });
      },

      // Set logging out status
      setLoggingOut: (isLoggingOut: boolean) => {
        set({ isLoggingOut });
      },

      // Login: set user and mark as authenticated
      login: (user: User) => {
        set({
          user,
          isAuthenticated: true,
          isLoggingOut: false,
        });
      },

      // Logout: clear user and authentication state
      logout: () => {
        const currentState = get();

        // Prevent multiple logout calls
        if (currentState.isLoggingOut) {
          return;
        }

        set({
          isAuthenticated: false,
          isLoggingOut: false,
        });
      },

      // Check if user is authenticated
      checkAuth: () => {
        const currentState = get();
        return currentState.isAuthenticated && currentState.user !== null;
      },
    }),
    {
      name: 'demo-auth-storage', // localStorage key
      // Persist user and isAuthenticated
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

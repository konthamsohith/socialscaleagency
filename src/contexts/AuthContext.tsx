import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import type { User, LoginResponse } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, companyName?: string, companyEmail?: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'SUPER_ADMIN';

  // Initialize auth state from localStorage, then validate token in background
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('accessToken');
      const savedUser = localStorage.getItem('user');

      if (token && savedUser) {
        // 1. Hydrate from cache instantly so ProtectedRoute renders the dashboard
        //    without waiting for a network round-trip.
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          setIsLoading(false);
          return;
        }

        // 2. Validate the token against the server in the background.
        //    - If the access token is still valid: updates user data silently.
        //    - If expired but refresh token is valid: the axios interceptor
        //      auto-refreshes the access token and retries the request.
        //    - If both tokens are expired: the interceptor clears localStorage
        //      and hard-redirects to /login.
        //    - If the server is unreachable (network error): we keep the cached
        //      user so the user isn't needlessly kicked out.
        try {
          const response = await apiService.getCurrentUser();
          setUser(response.data);
          localStorage.setItem('user', JSON.stringify(response.data));
        } catch (error: any) {
          if (!error?.response) {
            // Network / server unreachable — keep cached user
          } else {
            // The interceptor already cleared tokens and will redirect to /login
            setUser(null);
          }
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response: LoginResponse = await apiService.login(email, password);
      const { user: userData, accessToken, refreshToken } = response.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      // Navigate based on role
      if (userData.role === 'SUPER_ADMIN') {
        navigate('/dashboard/admin-panel');
      } else {
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      throw new Error(error.response?.data?.error?.message || 'Login failed');
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    companyName?: string,
    companyEmail?: string
  ) => {
    try {
      const registerData: any = { name, email, password };
      
      // If company details provided, include them
      if (companyName) {
        registerData.companyName = companyName;
        registerData.companyEmail = companyEmail || email;
      }

      const response: LoginResponse = await apiService.register(registerData);
      const { user: userData, accessToken, refreshToken } = response.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      // Navigate to onboarding or dashboard
      if (userData.role === 'SUPER_ADMIN') {
        navigate('/dashboard/admin-panel');
      } else {
        navigate('/onboarding');
      }
    } catch (error: any) {
      console.error('Registration failed:', error);
      throw new Error(error.response?.data?.error?.message || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const refreshUser = async () => {
    try {
      const response = await apiService.getCurrentUser();
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

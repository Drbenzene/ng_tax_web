'use client';

import React, { createContext, useCallback, useEffect, useState } from 'react';
import type { AuthState, Business, User } from '@/types/auth.types';
import authService from '@/services/auth.service';

interface AuthContextValue extends AuthState {
  // Actions
  setUser: (user: User | null) => void;
  setBusiness: (business: Business | null) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
  refreshAuth: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

const defaultAuthState: AuthState = {
  user: null,
  business: null,
  isAuthenticated: false,
  isLoading: true,
  accessToken: null,
  refreshToken: null,
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>(defaultAuthState);
  const [mounted, setMounted] = useState(false);

  // Set mounted flag after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Set user
  const setUser = useCallback((user: User | null) => {
    setAuthState((prev) => ({
      ...prev,
      user,
      isAuthenticated: Boolean(user),
    }));
  }, []);

  // Set business
  const setBusiness = useCallback((business: Business | null) => {
    setAuthState((prev) => ({
      ...prev,
      business,
    }));
  }, []);

  // Set tokens
  const setTokens = useCallback((accessToken: string, refreshToken: string) => {
    if (mounted) {
      authService.storeAuthTokens(accessToken, refreshToken);
    }
    setAuthState((prev) => ({
      ...prev,
      accessToken,
      refreshToken,
    }));
  }, [mounted]);

  // Clear authentication
  const clearAuth = useCallback(() => {
    if (mounted) {
      authService.clearAuthTokens();
    }
    setAuthState(defaultAuthState);
  }, [mounted]);

  // Refresh authentication (get fresh user data)
  const refreshAuth = useCallback(async () => {
    if (!mounted) return;
    
    try {
      const user = await authService.getCurrentUser();
      setUser(user);
      
      // If user has a business, you might want to fetch business details too
      // This depends on what the API returns
    } catch (error) {
      console.error('Failed to refresh auth:', error);
      clearAuth();
    }
  }, [setUser, clearAuth, mounted]);

  // Initialize authentication on mount
  const initializeAuth = useCallback(async () => {
    if (!mounted) return;
    
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    
    try {
      const accessToken = authService.getAccessToken();
      const refreshToken = authService.getRefreshToken();
      
      if (accessToken && refreshToken) {
        // We have tokens, fetch user data
        const user = await authService.getCurrentUser();
        
        setAuthState({
          user,
          business: null, // TODO: fetch business if user.businessId exists
          isAuthenticated: true,
          isLoading: false,
          accessToken,
          refreshToken,
        });
      } else {
        // No tokens, user is not authenticated
        setAuthState((prev) => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
      // If fetching user fails, clear everything
      clearAuth();
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [clearAuth, mounted]);

  // Initialize auth after mount
  useEffect(() => {
    if (mounted) {
      initializeAuth();
    }
  }, [mounted, initializeAuth]);

  // Optional: Set up token refresh interval
  useEffect(() => {
    if (!authState.isAuthenticated) return;

    // Refresh token every 14 minutes (assuming 15 min token expiry)
    const interval = setInterval(async () => {
      try {
        await authService.refreshAccessToken();
      } catch (error) {
        console.error('Token refresh failed:', error);
        clearAuth();
      }
    }, 14 * 60 * 1000);

    return () => clearInterval(interval);
  }, [authState.isAuthenticated, clearAuth]);

  const value: AuthContextValue = {
    ...authState,
    setUser,
    setBusiness,
    setTokens,
    clearAuth,
    refreshAuth,
    initializeAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

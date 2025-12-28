'use client';

import { useMutation } from '@tanstack/react-query';
import type {
    AccountCreationPayload,
    AuthResponse,
    BusinessVerificationResponse,
    LoginPayload,
} from '@/types/auth.types';
import authService from '@/services/auth.service';
import { useAuth } from './useAuth';

/**
 * Mutation for verifying business invitation code
 */
export function useVerifyBusiness() {
    return useMutation<BusinessVerificationResponse, Error, string>({
        mutationFn: (code: string) => authService.verifyInvitationCode(code),
        onError: (error) => {
            console.error('Business verification failed:', error);
        },
    });
}

/**
 * Mutation for creating a new account
 */
export function useCreateAccount() {
    const { setUser, setBusiness, setTokens } = useAuth();

    return useMutation<AuthResponse, Error, AccountCreationPayload>({
        mutationFn: (payload: AccountCreationPayload) => authService.createAccount(payload),
        onSuccess: (response) => {
            // Update auth context with new user data
            setUser(response.data.user);

            if (response.data.business) {
                setBusiness(response.data.business);
            }

            setTokens(response.data.accessToken, response.data.refreshToken);
        },
        onError: (error) => {
            console.error('Account creation failed:', error);
        },
    });
}

/**
 * Mutation for user login
 */
export function useLogin() {
    const { setUser, setBusiness, setTokens } = useAuth();

    return useMutation<AuthResponse, Error, LoginPayload>({
        mutationFn: (payload: LoginPayload) => authService.login(payload),
        onSuccess: (response) => {
            setUser(response.data.user);

            if (response.data.business) {
                setBusiness(response.data.business);
            }

            setTokens(response.data.accessToken, response.data.refreshToken);
        },
        onError: (error) => {
            console.error('Login failed:', error);
        },
    });
}

/**
 * Mutation for user logout
 */
export function useLogout() {
    const { clearAuth } = useAuth();

    return useMutation<void, Error, void>({
        mutationFn: () => authService.logout(),
        onSuccess: () => {
            clearAuth();
        },
        onError: (error) => {
            console.error('Logout failed:', error);
            // Still clear auth even if API call fails
            clearAuth();
        },
    });
}

import api from '@/lib/api';
import type {
    AccountCreationPayload,
    AuthResponse,
    BusinessVerificationResponse,
    LoginPayload,
    RefreshTokenResponse,
    User,
} from '@/types/auth.types';

// Base endpoints
const AUTH_ENDPOINTS = {
    VERIFY_BUSINESS: '/auth/verify-business',
    CREATE_ACCOUNT: '/auth/create-account',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    REFRESH: '/auth/refresh',
} as const;

/**
 * Verify invitation code and get business details
 * The code can be: invitation code, CAC/BN, business email, phone, or name
 */
export async function verifyInvitationCode(code: string): Promise<BusinessVerificationResponse> {
    try {
        const response = await api.post<BusinessVerificationResponse>(
            AUTH_ENDPOINTS.VERIFY_BUSINESS,
            { code }
        );
        return response;
    } catch (error) {
        console.error('Error verifying invitation code:', error);
        throw error;
    }
}

/**
 * Create a new user account
 */
export async function createAccount(payload: AccountCreationPayload): Promise<AuthResponse> {
    try {
        const response = await api.post<AuthResponse>(
            AUTH_ENDPOINTS.CREATE_ACCOUNT,
            payload
        );

        // Store tokens in localStorage
        if (response.data.accessToken) {
            storeAuthTokens(response.data.accessToken, response.data.refreshToken);
        }

        return response;
    } catch (error) {
        console.error('Error creating account:', error);
        throw error;
    }
}

/**
 * Login user
 */
export async function login(payload: LoginPayload): Promise<AuthResponse> {
    try {
        const response = await api.post<AuthResponse>(
            AUTH_ENDPOINTS.LOGIN,
            payload
        );

        // Store tokens
        if (response.data.accessToken) {
            storeAuthTokens(response.data.accessToken, response.data.refreshToken);
        }

        return response;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}

/**
 * Logout user
 */
export async function logout(): Promise<void> {
    try {
        await api.post(AUTH_ENDPOINTS.LOGOUT);
    } catch (error) {
        console.error('Error logging out:', error);
    } finally {
        // Always clear tokens locally even if API call fails
        clearAuthTokens();
    }
}

/**
 * Get current authenticated user
 */
export async function getCurrentUser(): Promise<User> {
    try {
        const response = await api.get<{ success: boolean; data: User }>(
            AUTH_ENDPOINTS.ME
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching current user:', error);
        throw error;
    }
}

/**
 * Refresh access token
 */
export async function refreshAccessToken(): Promise<RefreshTokenResponse> {
    try {
        const refreshToken = getRefreshToken();

        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await api.post<RefreshTokenResponse>(
            AUTH_ENDPOINTS.REFRESH,
            { refreshToken }
        );

        // Update stored tokens
        if (response.data.accessToken) {
            storeAuthTokens(response.data.accessToken, response.data.refreshToken);
        }

        return response;
    } catch (error) {
        console.error('Error refreshing token:', error);
        // Clear tokens if refresh fails
        clearAuthTokens();
        throw error;
    }
}

// Token management utilities
const TOKEN_KEYS = {
    ACCESS_TOKEN: 'auth_token',
    REFRESH_TOKEN: 'refresh_token',
} as const;

export function storeAuthTokens(accessToken: string, refreshToken: string): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, accessToken);
        localStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, refreshToken);
    }
}

export function getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
    }
    return null;
}

export function getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN);
    }
    return null;
}

export function clearAuthTokens(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN);
    }
}

export function isAuthenticated(): boolean {
    return Boolean(getAccessToken());
}

// Export all auth service functions
export const authService = {
    verifyInvitationCode,
    createAccount,
    login,
    logout,
    getCurrentUser,
    refreshAccessToken,
    isAuthenticated,
    storeAuthTokens,
    getAccessToken,
    getRefreshToken,
    clearAuthTokens,
};

export default authService;

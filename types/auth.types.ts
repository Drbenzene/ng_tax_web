// User Types
export type UserType = 'individual' | 'employee' | 'business';

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    userType: UserType;
    businessId?: string;
    bvn?: string;
    tin?: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
}

// Business Types
export interface Business {
    id: string;
    name: string;
    email: string;
    phone?: string;
    businessType?: string;
    category?: string;
    registrationNumber?: string; // CAC/BN
    address?: string;
    city?: string;
    state?: string;
    invitationCode?: string;
    createdAt: string;
    updatedAt: string;
}

// Account Creation Payloads
export interface IndividualAccountPayload {
    userType: 'individual' | 'employee';
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    bvn?: string;
    tin?: string;
    businessId?: string; // For employees joining a business
}

export interface BusinessAccountPayload {
    userType: 'business';
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    businessName: string;
    businessType: string;
    businessCategory: string;
    businessEmail: string;
    businessPhone?: string;
    registrationNumber?: string;
    address?: string;
    city?: string;
    state?: string;
}

export type AccountCreationPayload = IndividualAccountPayload | BusinessAccountPayload;

// Authentication Responses
export interface AuthResponse {
    success: boolean;
    message: string;
    data: {
        user: User;
        business?: Business;
        accessToken: string;
        refreshToken: string;
    };
}

export interface BusinessVerificationResponse {
    success: boolean;
    message: string;
    data: {
        business: Business;
    };
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RefreshTokenResponse {
    success: boolean;
    data: {
        accessToken: string;
        refreshToken: string;
    };
}

// Session State
export interface AuthState {
    user: User | null;
    business: Business | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    accessToken: string | null;
    refreshToken: string | null;
}

// Business Type Options
export const BUSINESS_TYPES = [
    'Company',
    'Partnership',
    'Sole Proprietorship',
    'LLC',
    'Corporation',
    'Non-Profit',
    'Other'
] as const;

export type BusinessType = typeof BUSINESS_TYPES[number];

// Business Categories
export const BUSINESS_CATEGORIES = [
    'Technology',
    'Retail',
    'Services',
    'Manufacturing',
    'Healthcare',
    'Education',
    'Finance',
    'Real Estate',
    'Construction',
    'Hospitality',
    'Transportation',
    'Agriculture',
    'Entertainment',
    'Professional Services',
    'Other'
] as const;

export type BusinessCategory = typeof BUSINESS_CATEGORIES[number];

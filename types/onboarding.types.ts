import type { Business, UserType } from './auth.types';

// Onboarding Flow States
export enum OnboardingState {
    INITIAL = 'INITIAL',                          // No account discussion yet
    ACCOUNT_REQUIRED = 'ACCOUNT_REQUIRED',        // Feature needs authentication
    ASKING_PATH = 'ASKING_PATH',                  // Invitation code vs new account
    VERIFYING_BUSINESS = 'VERIFYING_BUSINESS',    // Checking invitation code
    CONFIRMING_BUSINESS = 'CONFIRMING_BUSINESS',  // Show business details for confirmation
    ASKING_USER_TYPE = 'ASKING_USER_TYPE',        // Individual/employee vs business owner
    COLLECTING_INFO = 'COLLECTING_INFO',          // Gathering required fields
    CREATING_ACCOUNT = 'CREATING_ACCOUNT',        // Account creation in progress
    SUCCESS = 'SUCCESS',                          // Account created
    ERROR = 'ERROR'                               // Error state
}

// Onboarding Path
export type OnboardingPath = 'invitation' | 'new_account' | null;

// Form Data Collection
export interface OnboardingFormData {
    // Path selection
    path?: OnboardingPath;
    invitationCode?: string;

    // User type
    userType?: UserType;

    // Personal info
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    bvn?: string;
    tin?: string;

    // Business info (for business owners)
    businessName?: string;
    businessType?: string;
    businessCategory?: string;
    businessEmail?: string;
    businessPhone?: string;
    registrationNumber?: string;
    address?: string;
    city?: string;
    state?: string;

    // Verified business (from invitation)
    verifiedBusiness?: Business;
}

// Validation Errors
export interface OnboardingErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    businessName?: string;
    businessType?: string;
    businessCategory?: string;
    businessEmail?: string;
    invitationCode?: string;
}

// Required Fields by User Type
export const REQUIRED_FIELDS = {
    individual: ['firstName', 'lastName', 'email'] as const,
    employee: ['firstName', 'lastName', 'email'] as const,
    business: [
        'firstName',
        'lastName',
        'email',
        'businessName',
        'businessType',
        'businessCategory',
        'businessEmail'
    ] as const
};

// Onboarding Context State
export interface OnboardingContextState {
    currentState: OnboardingState;
    formData: OnboardingFormData;
    errors: OnboardingErrors;
    isLoading: boolean;

    // Actions
    setState: (state: OnboardingState) => void;
    updateFormData: (data: Partial<OnboardingFormData>) => void;
    setErrors: (errors: OnboardingErrors) => void;
    reset: () => void;

    // Transition functions
    startOnboarding: () => void;
    selectPath: (path: OnboardingPath) => void;
    verifyInvitation: (code: string) => Promise<void>;
    confirmBusiness: (confirmed: boolean) => void;
    selectUserType: (type: UserType) => void;
    submitForm: () => Promise<void>;
}

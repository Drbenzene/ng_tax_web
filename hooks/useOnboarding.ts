'use client';

import { useState, useCallback } from 'react';
import type {
    OnboardingState as OnboardingStateEnum,
    OnboardingPath,
    OnboardingFormData,
    OnboardingErrors,
} from '@/types/onboarding.types';
import type { UserType } from '@/types/auth.types';
import { OnboardingState } from '@/types/onboarding.types';
import { useVerifyBusiness, useCreateAccount } from './useAuthMutations';

/**
 * Custom hook to manage onboarding state machine
 */
export function useOnboarding() {
    const [currentState, setCurrentState] = useState<OnboardingStateEnum>(
        OnboardingState.INITIAL
    );
    const [formData, setFormData] = useState<OnboardingFormData>({});
    const [errors, setErrors] = useState<OnboardingErrors>({});

    const verifyBusinessMutation = useVerifyBusiness();
    const createAccountMutation = useCreateAccount();

    // Update form data
    const updateFormData = useCallback((data: Partial<OnboardingFormData>) => {
        setFormData((prev) => ({ ...prev, ...data }));
    }, []);

    // Reset onboarding
    const reset = useCallback(() => {
        setCurrentState(OnboardingState.INITIAL);
        setFormData({});
        setErrors({});
    }, []);

    // Start onboarding flow
    const startOnboarding = useCallback(() => {
        setCurrentState(OnboardingState.ACCOUNT_REQUIRED);
    }, []);

    // Select path (invitation vs new account)
    const selectPath = useCallback((path: OnboardingPath) => {
        updateFormData({ path });

        if (path === 'invitation') {
            setCurrentState(OnboardingState.VERIFYING_BUSINESS);
        } else if (path === 'new_account') {
            setCurrentState(OnboardingState.ASKING_USER_TYPE);
        }
    }, [updateFormData]);

    // Verify invitation code
    const verifyInvitation = useCallback(async (code: string) => {
        try {
            setCurrentState(OnboardingState.VERIFYING_BUSINESS);
            updateFormData({ invitationCode: code });

            const result = await verifyBusinessMutation.mutateAsync(code);

            if (result.success && result.data.business) {
                updateFormData({ verifiedBusiness: result.data.business });
                setCurrentState(OnboardingState.CONFIRMING_BUSINESS);
            } else {
                setErrors({ invitationCode: 'Business not found' });
                setCurrentState(OnboardingState.ASKING_PATH);
            }
        } catch (error: any) {
            setErrors({
                invitationCode: error.message || 'Failed to verify invitation code'
            });
            setCurrentState(OnboardingState.ASKING_PATH);
        }
    }, [updateFormData, verifyBusinessMutation]);

    // Confirm business details
    const confirmBusiness = useCallback((confirmed: boolean) => {
        if (confirmed) {
            setCurrentState(OnboardingState.COLLECTING_INFO);
            updateFormData({ userType: 'employee' }); // Joining business = employee
        } else {
            // User rejected, go back to path selection
            setCurrentState(OnboardingState.ASKING_PATH);
            updateFormData({ verifiedBusiness: undefined, invitationCode: undefined });
        }
    }, [updateFormData]);

    // Select user type
    const selectUserType = useCallback((type: UserType) => {
        updateFormData({ userType: type });
        setCurrentState(OnboardingState.COLLECTING_INFO);
    }, [updateFormData]);

    // Submit form
    const submitForm = useCallback(async () => {
        try {
            setCurrentState(OnboardingState.CREATING_ACCOUNT);

            const { userType } = formData;

            if (!userType) {
                throw new Error('User type not selected');
            }

            // Build payload based on user type
            let payload: any;

            if (userType === 'business') {
                payload = {
                    userType: 'business',
                    firstName: formData.firstName!,
                    lastName: formData.lastName!,
                    email: formData.email!,
                    phoneNumber: formData.phoneNumber,
                    businessName: formData.businessName!,
                    businessType: formData.businessType!,
                    businessCategory: formData.businessCategory!,
                    businessEmail: formData.businessEmail!,
                    businessPhone: formData.businessPhone,
                    registrationNumber: formData.registrationNumber,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                };
            } else {
                // Individual or Employee
                payload = {
                    userType,
                    firstName: formData.firstName!,
                    lastName: formData.lastName!,
                    email: formData.email!,
                    phoneNumber: formData.phoneNumber,
                    bvn: formData.bvn,
                    tin: formData.tin,
                    businessId: formData.verifiedBusiness?.id,
                };
            }

            await createAccountMutation.mutateAsync(payload);

            setCurrentState(OnboardingState.SUCCESS);
        } catch (error: any) {
            console.error('Account creation failed:', error);
            setCurrentState(OnboardingState.ERROR);
            setErrors({
                ...errors,
                // Handle specific error messages from the API
            });
        }
    }, [formData, createAccountMutation, errors]);

    return {
        currentState,
        formData,
        errors,
        isLoading: verifyBusinessMutation.isPending || createAccountMutation.isPending,

        // Actions
        setState: setCurrentState,
        updateFormData,
        setErrors,
        reset,

        // Transition functions
        startOnboarding,
        selectPath,
        verifyInvitation,
        confirmBusiness,
        selectUserType,
        submitForm,
    };
}

export default useOnboarding;

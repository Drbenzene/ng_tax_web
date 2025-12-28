'use client'
import React from "react";
import OnboardingFlow from "@/components/auth/OnboardingFlow";
import { OnboardingState } from "@/types/onboarding.types";

const SignUp = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2">
                        Join TaxPadi
                    </h1>
                    <p className="text-gray-600">
                        Create your account and start managing your Nigerian taxes with ease
                    </p>
                </div>
                <OnboardingFlow initialState={OnboardingState.ASKING_PATH} />
            </div>
        </div>
    );
};

export default SignUp;

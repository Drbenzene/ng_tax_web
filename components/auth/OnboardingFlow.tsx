'use client';

import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { OnboardingState } from '@/types/onboarding.types';
import { useOnboarding } from '@/hooks/useOnboarding';
import {
  individualAccountSchema,
  businessAccountSchema,
  invitationCodeSchema,
} from '@/lib/validationSchemas';
import { FormField } from './FormField';
import { BusinessTypeSelector } from './BusinessTypeSelector';
import { CategorySelector } from './CategorySelector';
import { Building2, User, Users, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface OnboardingFlowProps {
  initialState?: OnboardingState;
}

export function OnboardingFlow({ initialState }: OnboardingFlowProps = {}) {
  const {
    currentState,
    formData,
    isLoading,
    selectPath,
    verifyInvitation,
    confirmBusiness,
    selectUserType,
    submitForm,
    setState,
  } = useOnboarding();

  // Set initial state on mount if provided
  useEffect(() => {
    if (initialState && currentState === OnboardingState.INITIAL) {
      setState(initialState);
    }
  }, [initialState, currentState, setState]);

  // Initial state - don't show anything
  if (currentState === OnboardingState.INITIAL) {
    return null;
  }

  // Account required - ask for path
  if (currentState === OnboardingState.ACCOUNT_REQUIRED || currentState === OnboardingState.ASKING_PATH) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Let's Set Up Your Account
        </h3>
        <p className="text-gray-600 mb-6">
          To help you with that, I'll need to set up your account. Do you have an invitation code to join an existing business, or would you like to create a new account?
        </p>
        
        <div className="grid gap-4">
          <button
            onClick={() => selectPath('invitation')}
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all group"
          >
            <Users className="w-6 h-6 text-emerald-600" />
            <div className="text-left">
              <div className="font-semibold text-gray-900 group-hover:text-emerald-600">
                I have an invitation code
              </div>
              <div className="text-sm text-gray-500">
                Join an existing business
              </div>
            </div>
          </button>
          
          <button
            onClick={() => selectPath('new_account')}
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all group"
          >
            <User className="w-6 h-6 text-emerald-600" />
            <div className="text-left">
              <div className="font-semibold text-gray-900 group-hover:text-emerald-600">
                Create a new account
              </div>
              <div className="text-sm text-gray-500">
                Set up individual or business account
              </div>
            </div>
          </button>
        </div>
      </div>
    );
  }

  // Verifying business with invitation code
  if (currentState === OnboardingState.VERIFYING_BUSINESS) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Enter Invitation Code
        </h3>
        <p className="text-gray-600 mb-6">
          Enter your invitation code, business name, CAC/BN number, business email, or phone number.
        </p>
        
        <Formik
          initialValues={{ invitationCode: formData.invitationCode || '' }}
          validationSchema={invitationCodeSchema}
          onSubmit={(values) => verifyInvitation(values.invitationCode)}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <FormField
                label="Invitation Code"
                name="invitationCode"
                value={values.invitationCode}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.invitationCode}
                touched={touched.invitationCode}
                placeholder="Enter code or business details..."
                required
              />
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify Code'
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }

  // Confirming business details
  if (currentState === OnboardingState.CONFIRMING_BUSINESS && formData.verifiedBusiness) {
    const business = formData.verifiedBusiness;
    
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Confirm Business Details
        </h3>
        <p className="text-gray-600 mb-6">
          Is this the correct business you want to join?
        </p>
        
        <div className="bg-emerald-50 rounded-xl p-4 mb-6 border border-emerald-200">
          <div className="flex items-start gap-3 mb-4">
            <Building2 className="w-6 h-6 text-emerald-600 mt-1" />
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 text-lg">{business.name}</h4>
              {business.registrationNumber && (
                <p className="text-sm text-gray-600">CAC/BN: {business.registrationNumber}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Email:</span>
              <span className="text-gray-600">{business.email}</span>
            </div>
            {business.phone && (
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Phone:</span>
                <span className="text-gray-600">{business.phone}</span>
              </div>
            )}
            {business.address && (
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Address:</span>
                <span className="text-gray-600">{business.address}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => confirmBusiness(false)}
            className="px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
          >
            No, try again
          </button>
          <button
            onClick={() => confirmBusiness(true)}
            className="px-4 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Yes, continue
          </button>
        </div>
      </div>
    );
  }

  // Asking for user type
  if (currentState === OnboardingState.ASKING_USER_TYPE) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          What Type of Account?
        </h3>
        <p className="text-gray-600 mb-6">
          Are you a business owner, an individual, or an employee?
        </p>
        
        <div className="grid gap-4">
          <button
            onClick={() => selectUserType('individual')}
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all group"
          >
            <User className="w-6 h-6 text-emerald-600" />
            <div className="text-left">
              <div className="font-semibold text-gray-900 group-hover:text-emerald-600">
                Individual
              </div>
              <div className="text-sm text-gray-500">
                Personal tax management
              </div>
            </div>
          </button>
          
          <button
            onClick={() => selectUserType('employee')}
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all group"
          >
            <Users className="w-6 h-6 text-emerald-600" />
            <div className="text-left">
              <div className="font-semibold text-gray-900 group-hover:text-emerald-600">
                Employee
              </div>
              <div className="text-sm text-gray-500">
                Join without a business invitation
              </div>
            </div>
          </button>
          
          <button
            onClick={() => selectUserType('business')}
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all group"
          >
            <Building2 className="w-6 h-6 text-emerald-600" />
            <div className="text-left">
              <div className="font-semibold text-gray-900 group-hover:text-emerald-600">
                Business Owner
              </div>
              <div className="text-sm text-gray-500">
                Company or business account
              </div>
            </div>
          </button>
        </div>
      </div>
    );
  }

  // Collecting information
  if (currentState === OnboardingState.COLLECTING_INFO && formData.userType) {
    const isBusiness = formData.userType === 'business';
    const schema = isBusiness ? businessAccountSchema : individualAccountSchema;
    
    type FormValues = typeof schema extends import('yup').Schema<infer T> ? T : never;

    const initialValues = isBusiness
      ? {
          firstName: formData.firstName || '',
          lastName: formData.lastName || '',
          email: formData.email || '',
          phoneNumber: formData.phoneNumber || '',
          businessName: formData.businessName || '',
          businessType: formData.businessType || '',
          businessCategory: formData.businessCategory || '',
          businessEmail: formData.businessEmail || '',
          businessPhone: formData.businessPhone || '',
          registrationNumber: formData.registrationNumber || '',
          address: formData.address || '',
          city: formData.city || '',
          state: formData.state || '',
        }
      : {
          firstName: formData.firstName || '',
          lastName: formData.lastName || '',
          email: formData.email || '',
          phoneNumber: formData.phoneNumber || '',
          bvn: formData.bvn || '',
          tin: formData.tin || '',
        };

    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100 max-h-[600px] overflow-y-auto">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {isBusiness ? 'Business Information' : 'Your Information'}
        </h3>
        <p className="text-gray-600 mb-6">
          Please provide the following information. Fields marked with <span className="text-red-500">*</span> are required.
        </p>
        
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={submitForm}
        >
          {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => {
            // Type-safe access to values
            const businessValues = values as any;
            
            return (
              <Form>
                {/* Personal Information */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Personal Details</h4>
                  
                  <FormField
                    label="First Name"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.firstName}
                    touched={touched.firstName}
                    required
                  />
                  
                  <FormField
                    label="Last Name"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.lastName}
                    touched={touched.lastName}
                    required
                  />
                  
                  <FormField
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email}
                    touched={touched.email}
                    required
                  />
                  
                  <FormField
                    label="Phone Number"
                    name="phoneNumber"
                    type="tel"
                    value={values.phoneNumber || ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.phoneNumber}
                    touched={touched.phoneNumber}
                    optional
                    helperText="Nigerian phone number format"
                  />
                </div>
                
                {/* Business Information (for business owners) */}
                {isBusiness && (
                  <div className="mb-6 border-t pt-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Business Details</h4>
                    
                    <FormField
                      label="Business Name"
                      name="businessName"
                      value={businessValues.businessName || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.businessName}
                      touched={touched.businessName}
                      required
                    />
                    
                    <BusinessTypeSelector
                      value={businessValues.businessType || ''}
                      onChange={(value) => setFieldValue('businessType', value)}
                      onBlur={() => handleBlur({ target: { name: 'businessType' } } as any)}
                      error={errors.businessType}
                      touched={touched.businessType}
                    />
                    
                    <CategorySelector
                      value={businessValues.businessCategory || ''}
                      onChange={(value) => setFieldValue('businessCategory', value)}
                      onBlur={() => handleBlur({ target: { name: 'businessCategory' } } as any)}
                      error={errors.businessCategory}
                      touched={touched.businessCategory}
                    />
                    
                    <FormField
                      label="Business Email"
                      name="businessEmail"
                      type="email"
                      value={businessValues.businessEmail || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.businessEmail}
                      touched={touched.businessEmail}
                      required
                    />
                    
                    <FormField
                      label="Business Phone"
                      name="businessPhone"
                      type="tel"
                      value={businessValues.businessPhone || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.businessPhone}
                      touched={touched.businessPhone}
                      optional
                    />
                    
                    <FormField
                      label="CAC/Registration Number"
                      name="registrationNumber"
                      value={businessValues.registrationNumber || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.registrationNumber}
                      touched={touched.registrationNumber}
                      optional
                    />
                    
                    <FormField
                      label="Address"
                      name="address"
                      value={businessValues.address || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.address}
                      touched={touched.address}
                      optional
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        label="City"
                        name="city"
                        value={businessValues.city || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.city}
                        touched={touched.city}
                        optional
                      />
                      
                      <FormField
                        label="State"
                        name="state"
                        value={businessValues.state || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.state}
                        touched={touched.state}
                        optional
                      />
                    </div>
                  </div>
                )}
                
                {/* Additional fields for individuals */}
                {!isBusiness && (
                  <div className="mb-6 border-t pt-6">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Tax Information <span className="text-gray-500 text-sm font-normal">(Optional)</span>
                    </h4>
                    
                    <FormField
                      label="BVN"
                      name="bvn"
                      value={businessValues.bvn || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.bvn}
                      touched={touched.bvn}
                      optional
                      helperText="Helpful for tax filing"
                    />
                    
                    <FormField
                      label="TIN"
                      name="tin"
                      value={businessValues.tin || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.tin}
                      touched={touched.tin}
                      optional
                      helperText="Tax Identification Number (format: XXXXXXXXX-XXXX)"
                    />
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  }


  if (currentState === OnboardingState.SUCCESS) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Account Created Successfully!
          </h3>
          <p className="text-gray-600 mb-6">
            Welcome to TaxPadi! Your account has been created and you're now logged in.
            A confirmation email with your password has been sent to your email address.
          </p>
          <p className="text-sm text-gray-500">
            You can now use all TaxPadi features. Let's continue our conversation!
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (currentState === OnboardingState.ERROR) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Something Went Wrong
          </h3>
          <p className="text-gray-600 mb-6">
            We couldn't create your account. Please try again or contact support if the problem persists.
          </p>
        </div>
      </div>
    );
  }

  return null;
}

export default OnboardingFlow;

import * as Yup from 'yup';

// Helper regex patterns
const NIGERIAN_PHONE_REGEX = /^(\+?234|0)[7-9][0-1]\d{8}$/;
const BVN_REGEX = /^\d{11}$/;
const TIN_REGEX = /^\d{9}-\d{4}$/;

// Individual/Employee Account Schema
export const individualAccountSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('First name is required')
        .min(2, 'First name must be at least 2 characters')
        .matches(/^[a-zA-Z\s\-']+$/, 'First name should only contain letters'),

    lastName: Yup.string()
        .required('Last name is required')
        .min(2, 'Last name must be at least 2 characters')
        .matches(/^[a-zA-Z\s\-']+$/, 'Last name should only contain letters'),

    email: Yup.string()
        .required('Email is required')
        .email('Please enter a valid email address'),

    phoneNumber: Yup.string()
        .optional()
        .matches(NIGERIAN_PHONE_REGEX, 'Please enter a valid Nigerian phone number'),

    bvn: Yup.string()
        .optional()
        .matches(BVN_REGEX, 'BVN must be 11 digits'),

    tin: Yup.string()
        .optional()
        .matches(TIN_REGEX, 'TIN must be in format XXXXXXXXX-XXXX'),
});

// Business Account Schema
export const businessAccountSchema = Yup.object().shape({
    // Owner info
    firstName: Yup.string()
        .required('First name is required')
        .min(2, 'First name must be at least 2 characters')
        .matches(/^[a-zA-Z\s\-']+$/, 'First name should only contain letters'),

    lastName: Yup.string()
        .required('Last name is required')
        .min(2, 'Last name must be at least 2 characters')
        .matches(/^[a-zA-Z\s\-']+$/, 'Last name should only contain letters'),

    email: Yup.string()
        .required('Email is required')
        .email('Please enter a valid email address'),

    phoneNumber: Yup.string()
        .optional()
        .matches(NIGERIAN_PHONE_REGEX, 'Please enter a valid Nigerian phone number'),

    // Business info
    businessName: Yup.string()
        .required('Business name is required')
        .min(2, 'Business name must be at least 2 characters'),

    businessType: Yup.string()
        .required('Business type is required'),

    businessCategory: Yup.string()
        .required('Business category is required'),

    businessEmail: Yup.string()
        .required('Business email is required')
        .email('Please enter a valid email address'),

    businessPhone: Yup.string()
        .optional()
        .matches(NIGERIAN_PHONE_REGEX, 'Please enter a valid Nigerian phone number'),

    registrationNumber: Yup.string()
        .optional(),

    address: Yup.string()
        .optional(),

    city: Yup.string()
        .optional(),

    state: Yup.string()
        .optional(),
});

// Invitation Code Schema
export const invitationCodeSchema = Yup.object().shape({
    invitationCode: Yup.string()
        .required('Invitation code is required')
        .min(3, 'Please enter a valid invitation code'),
});

// Login Schema
export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email('Please enter a valid email address'),

    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
});

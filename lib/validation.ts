// Email validation
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Nigerian phone number validation
// Accepts formats: 08012345678, +2348012345678, 2348012345678
export function isValidNigerianPhone(phone: string): boolean {
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');

    // Pattern 1: 08012345678 (11 digits starting with 0)
    const pattern1 = /^0[7-9][0-1]\d{8}$/;

    // Pattern 2: +2348012345678 or 2348012345678
    const pattern2 = /^(\+?234)[7-9][0-1]\d{8}$/;

    return pattern1.test(cleaned) || pattern2.test(cleaned);
}

// BVN validation (11 digits)
export function isValidBVN(bvn: string): boolean {
    const cleaned = bvn.replace(/\s/g, '');
    return /^\d{11}$/.test(cleaned);
}

// TIN validation (Nigerian Tax Identification Number)
// Format: XXXXXXXXX-XXXX (9 digits, hyphen, 4 digits)
export function isValidTIN(tin: string): boolean {
    const cleaned = tin.replace(/\s/g, '');
    return /^\d{9}-\d{4}$/.test(cleaned);
}

// Required field validation
export function isRequired(value: string | undefined | null): boolean {
    return Boolean(value && value.trim().length > 0);
}

// Name validation (letters, spaces, hyphens, apostrophes only)
export function isValidName(name: string): boolean {
    return /^[a-zA-Z\s\-']+$/.test(name) && name.trim().length >= 2;
}

// Validation with error messages
export interface ValidationResult {
    isValid: boolean;
    error?: string;
}

export function validateEmail(email: string): ValidationResult {
    if (!isRequired(email)) {
        return { isValid: false, error: 'Email is required' };
    }
    if (!isValidEmail(email)) {
        return { isValid: false, error: 'Please enter a valid email address' };
    }
    return { isValid: true };
}

export function validatePhone(phone: string, required = false): ValidationResult {
    if (!phone || phone.trim().length === 0) {
        if (required) {
            return { isValid: false, error: 'Phone number is required' };
        }
        return { isValid: true };
    }

    if (!isValidNigerianPhone(phone)) {
        return { isValid: false, error: 'Please enter a valid Nigerian phone number' };
    }
    return { isValid: true };
}

export function validateName(name: string, fieldName = 'Name'): ValidationResult {
    if (!isRequired(name)) {
        return { isValid: false, error: `${fieldName} is required` };
    }
    if (!isValidName(name)) {
        return { isValid: false, error: `${fieldName} should only contain letters` };
    }
    return { isValid: true };
}

export function validateBVN(bvn: string, required = false): ValidationResult {
    if (!bvn || bvn.trim().length === 0) {
        if (required) {
            return { isValid: false, error: 'BVN is required' };
        }
        return { isValid: true };
    }

    if (!isValidBVN(bvn)) {
        return { isValid: false, error: 'BVN must be 11 digits' };
    }
    return { isValid: true };
}

export function validateTIN(tin: string, required = false): ValidationResult {
    if (!tin || tin.trim().length === 0) {
        if (required) {
            return { isValid: false, error: 'TIN is required' };
        }
        return { isValid: true };
    }

    if (!isValidTIN(tin)) {
        return { isValid: false, error: 'TIN must be in format XXXXXXXXX-XXXX' };
    }
    return { isValid: true };
}

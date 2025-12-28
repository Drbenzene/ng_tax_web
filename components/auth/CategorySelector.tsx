'use client';

import React from 'react';
import { BUSINESS_CATEGORIES } from '@/types/auth.types';
import { AlertCircle } from 'lucide-react';

interface CategorySelectorProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
}

export function CategorySelector({
  value,
  onChange,
  onBlur,
  error,
  touched,
  disabled = false,
}: CategorySelectorProps) {
  const hasError = touched && error;

  return (
    <div className="mb-4">
      <label htmlFor="businessCategory" className="block text-sm font-medium text-gray-700 mb-1">
        Business Category
        <span className="text-red-500 ml-1">*</span>
      </label>
      
      <select
        id="businessCategory"
        name="businessCategory"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        disabled={disabled}
        className={`
          w-full px-4 py-2.5 rounded-lg border transition-all
          ${hasError 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
            : 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-500'
          }
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
          focus:ring-2 focus:outline-none
        `}
      >
        <option value="">Select category...</option>
        {BUSINESS_CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      
      {hasError && (
        <div className="mt-1 flex items-center text-red-600 text-xs">
          <AlertCircle className="w-3 h-3 mr-1" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

export default CategorySelector;

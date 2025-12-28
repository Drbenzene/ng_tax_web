'use client'

import React from "react";
import Link from "next/link";
import { Sparkles, MessageSquare, Calculator, FileCheck, Zap } from "lucide-react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex">
            {/* Left Side - Product Showcase (50%) */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 to-green-700 p-12 flex-col justify-center relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>

                <div className="relative z-10 space-y-8">
                    {/* Heading */}
                    <div className="space-y-4">
                        <h2 className="text-4xl font-bold text-white leading-tight">
                            File Nigerian taxes in minutes, not hours
                        </h2>
                        <p className="text-xl text-emerald-100">
                            Just chat with our AI assistant. No forms, no spreadsheets, no stress.
                        </p>
                    </div>

                    {/* Chat Interface Mockup */}
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                        {/* Chat Header */}
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-green-600 rounded-full flex items-center justify-center">
                                    <MessageSquare className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">TaxPadi Assistant</div>
                                    <div className="text-xs text-gray-500">Online • Ready to help</div>
                                </div>
                            </div>
                        </div>

                        {/* Chat Messages */}
                        <div className="p-6 space-y-4 bg-gray-50 min-h-[320px]">
                            {/* AI Message */}
                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Sparkles className="w-4 h-4 text-emerald-600" />
                                </div>
                                <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-xs">
                                    <p className="text-sm text-gray-900">
                                        Hi! I can help you file taxes, calculate VAT, or manage payroll. What can I do for you today?
                                    </p>
                                </div>
                            </div>

                            {/* User Message */}
                            <div className="flex items-start space-x-3 justify-end">
                                <div className="bg-emerald-600 rounded-2xl rounded-tr-none px-4 py-3 shadow-sm max-w-xs">
                                    <p className="text-sm text-white">
                                        I need to file my VAT return for December
                                    </p>
                                </div>
                            </div>

                            {/* AI Response */}
                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Sparkles className="w-4 h-4 text-emerald-600" />
                                </div>
                                <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-xs">
                                    <p className="text-sm text-gray-900 mb-3">
                                        Perfect! I've calculated your VAT for December:
                                    </p>
                                    <div className="bg-emerald-50 rounded-lg p-3 space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Sales:</span>
                                            <span className="font-semibold text-gray-900">₦1,250,000</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">VAT (7.5%):</span>
                                            <span className="font-semibold text-emerald-600">₦93,750</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-900 mt-3">
                                        Ready to file this return?
                                    </p>
                                </div>
                            </div>

                            {/* User Message */}
                            <div className="flex items-start space-x-3 justify-end">
                                <div className="bg-emerald-600 rounded-2xl rounded-tr-none px-4 py-3 shadow-sm max-w-xs">
                                    <p className="text-sm text-white">
                                        Yes, file it now
                                    </p>
                                </div>
                            </div>

                            {/* Success Message */}
                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Sparkles className="w-4 h-4 text-emerald-600" />
                                </div>
                                <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-xs">
                                    <div className="flex items-center space-x-2 text-emerald-600 mb-2">
                                        <FileCheck className="w-4 h-4" />
                                        <span className="font-semibold text-sm">Filed successfully!</span>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Your VAT return has been submitted to FIRS. Confirmation sent to your email.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-start space-x-3">
                            <Calculator className="w-5 h-5 text-emerald-200 flex-shrink-0 mt-0.5" />
                            <div>
                                <div className="font-semibold text-white text-sm">Auto Calculations</div>
                                <div className="text-emerald-100 text-xs">FIRS-compliant rates</div>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <FileCheck className="w-5 h-5 text-emerald-200 flex-shrink-0 mt-0.5" />
                            <div>
                                <div className="font-semibold text-white text-sm">Instant Filing</div>
                                <div className="text-emerald-100 text-xs">Submit in seconds</div>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <Zap className="w-5 h-5 text-emerald-200 flex-shrink-0 mt-0.5" />
                            <div>
                                <div className="font-semibold text-white text-sm">Real-time Updates</div>
                                <div className="text-emerald-100 text-xs">Track every step</div>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <MessageSquare className="w-5 h-5 text-emerald-200 flex-shrink-0 mt-0.5" />
                            <div>
                                <div className="font-semibold text-white text-sm">24/7 AI Support</div>
                                <div className="text-emerald-100 text-xs">Always available</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Auth Form (50%) */}
            <div className="w-full lg:w-1/2 flex flex-col">
                {/* Header */}
                <div className="p-8">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">TaxPadi</span>
                    </Link>
                </div>

                {/* Form Area */}
                <div className="flex-1 flex items-center justify-center px-8 pb-8">
                    <div className="w-full max-w-md">
                        {children}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-8 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <p>© 2024 TaxPadi. All rights reserved.</p>
                        <div className="flex space-x-4">
                            <Link href="/help" className="hover:text-gray-900 transition-colors">Help</Link>
                            <Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
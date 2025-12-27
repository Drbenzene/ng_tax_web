'use client';

import { ArrowRight, CheckCircle, Star, Play, MessageSquare, Calculator, Send, Sparkles } from 'lucide-react';

export default function Hero() {

  return (
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center max-w-4xl mx-auto mb-16 space-y-8">
            {/* Social Proof Badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full shadow-sm">
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-700">Rated 4.9/5 by 10,000+ users</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
                File Nigerian taxes in
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  minutes, not hours
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                TaxPadi's AI assistant makes Nigerian tax filing effortless. Chat naturally, get instant calculations, file returns — all FIRS compliant.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <button className="group bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
                Start free trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group flex items-center gap-2 text-gray-700 hover:text-emerald-600 px-6 py-4 font-semibold transition-colors">
                <div className="w-10 h-10 bg-gray-100 group-hover:bg-emerald-50 rounded-full flex items-center justify-center transition-colors">
                  <Play className="w-4 h-4 ml-0.5" />
                </div>
                Watch demo
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 pt-2">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>FIRS compliant</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Free forever</span>
              </div>
            </div>
          </div>

          {/* Product Showcase */}
          <div className="relative max-w-7xl mx-auto">
            {/* Gradient Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-green-500/20 blur-3xl opacity-30 rounded-3xl"></div>
            
            {/* Main Product Screenshot */}
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Browser Chrome */}
              <div className="bg-gray-50 px-4 py-3 flex items-center gap-2 border-b border-gray-200">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 bg-white rounded px-3 py-1 mx-3">
                  <span className="text-xs text-gray-500">app.taxpadi.com</span>
                </div>
              </div>

              {/* App Interface */}
              <div className="bg-gradient-to-br from-white to-gray-50 p-8 sm:p-12">
                <div className="max-w-5xl mx-auto">
                  {/* App Header */}
                  <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">TaxPadi AI</h3>
                        <p className="text-sm text-gray-500">Your Tax Assistant</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 font-medium">Online</span>
                    </div>
                  </div>

                  {/* Chat Interface */}
                  <div className="space-y-6 mb-8">
                    {/* AI Message */}
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">T</span>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm max-w-lg">
                        <p className="text-gray-800">
                          Hi! 👋 I'm TaxPadi, your AI tax assistant. I can help you calculate taxes, file returns, and answer questions about Nigerian tax law. What would you like to do today?
                        </p>
                      </div>
                    </div>

                    {/* User Message */}
                    <div className="flex justify-end">
                      <div className="bg-emerald-600 rounded-2xl rounded-tr-sm px-5 py-4 shadow-sm max-w-md">
                        <p className="text-white">
                          I need to calculate my personal income tax for ₦5,000,000 annual income
                        </p>
                      </div>
                    </div>

                    {/* AI Response with Calculation */}
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">T</span>
                      </div>
                      <div className="bg-white border-2 border-emerald-100 rounded-2xl rounded-tl-sm p-6 shadow-lg flex-1 max-w-2xl">
                        <div className="space-y-5">
                          {/* Header */}
                          <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                            <Calculator className="w-6 h-6 text-emerald-600" />
                            <span className="font-bold text-gray-900 text-lg">Tax Calculation Result</span>
                          </div>
                          
                          {/* Breakdown */}
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Gross Annual Income</span>
                              <span className="font-semibold text-gray-900">₦5,000,000</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Consolidated Relief</span>
                              <span className="font-semibold text-gray-900">- ₦200,000</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Taxable Income</span>
                              <span className="font-semibold text-gray-900">₦4,800,000</span>
                            </div>
                            
                            <div className="border-t-2 border-gray-200 pt-4 mt-4">
                              <div className="flex justify-between items-center mb-6">
                                <span className="text-lg font-medium text-gray-700">Total Tax Payable</span>
                                <span className="text-4xl font-black text-emerald-600">₦843,750</span>
                              </div>
                              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-md flex items-center justify-center gap-2">
                                <Sparkles className="w-5 h-5" />
                                File This Tax Return
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* User Message - Transfer */}
                    <div className="flex justify-end">
                      <div className="bg-emerald-600 rounded-lg rounded-tr-sm px-3 py-2 shadow-sm max-w-[200px]">
                        <p className="text-white text-xs">Transfer ₦5k to 0123456789 GTBank</p>
                      </div>
                    </div>

                    {/* AI Response - Transfer */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xs">T</span>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg rounded-tl-sm px-3 py-2.5 shadow-sm max-w-xs">
                        <div className="space-y-2">
                          <p className="text-gray-800 font-semibold text-xs">Transfer Preview ✅</p>
                          <div className="bg-gray-50 rounded p-2 space-y-0.5 text-[10px]">
                            <div className="flex justify-between">
                              <span className="text-gray-600">To:</span>
                              <span className="font-semibold">0123456789</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Bank:</span>
                              <span className="font-semibold">GTBank</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Amount:</span>
                              <span className="font-semibold">₦5,000</span>
                            </div>
                          </div>
                          <div className="flex gap-1.5 pt-1">
                            <button className="flex-1 bg-emerald-600 text-white py-1.5 px-2 rounded text-[10px] font-semibold">
                              Confirm
                            </button>
                            <button className="flex-1 bg-gray-100 text-gray-700 py-1.5 px-2 rounded text-[10px] font-semibold">
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* User Message - Payment */}
                    <div className="flex justify-end">
                      <div className="bg-emerald-600 rounded-lg rounded-tr-sm px-3 py-2 shadow-sm max-w-[200px]">
                        <p className="text-white text-xs">Pay my ₦843,750 tax now</p>
                      </div>
                    </div>

                    {/* AI Response - Payment Success */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xs">T</span>
                      </div>
                      <div className="bg-white border border-emerald-100 rounded-lg rounded-tl-sm px-3 py-2.5 shadow-sm max-w-xs">
                        <div className="space-y-1.5">
                          <p className="text-gray-900 font-bold text-xs flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                            Payment Successful! 🎉
                          </p>
                          <p className="text-gray-700 text-[11px]">
                            ₦843,750 paid to FIRS via card •••• 4242
                          </p>
                          <div className="bg-emerald-50 rounded p-1.5">
                            <p className="text-[10px] font-medium text-emerald-800">
                              📧 Receipt sent • Ref: PAY-{Math.floor(Math.random() * 10000)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Input Area */}
                  <div className="bg-white border-2 border-gray-200 rounded-xl px-6 py-4 flex items-center gap-4 shadow-sm">
                    <input 
                      type="text" 
                      placeholder="Ask me anything about Nigerian taxes..." 
                      className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-lg"
                      disabled
                    />
                    <button className="bg-emerald-600 hover:bg-emerald-700 w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow-sm">
                      <Send className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}

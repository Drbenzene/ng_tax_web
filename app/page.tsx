'use client'

import { useState } from 'react';
import { Send, Link2, CreditCard, Smartphone, MonitorDot, MessageCircle, Sparkles, Shield, Clock, FileText, Calculator, TrendingUp, CheckCircle, Menu, ChevronRight, Zap, Users, Award, Star, ArrowRight, Check, Play, BarChart3, Building2, User, Wallet, Globe, Lock, HeadphonesIcon, TrendingDown, Receipt, BookOpen, Download, X } from 'lucide-react';
import Faq from '@/components/landing/Faq';
import Hero from '@/components/landing/Hero';
import Chat from '@/components/chat/Chat';
import ChatIcon from '@/components/chat/ChatIcon';


const NGTaxLandingPage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'individuals' | 'businesses'>('individuals');

  const features = [
    {
      icon: <Calculator className="w-6 h-6" />,
      title: "Smart Tax Calculation",
      description: "Instant, accurate tax calculations for individuals and businesses using 2026 Nigerian tax rates"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Easy Tax Filing",
      description: "File your returns with FIRS seamlessly - Personal, Corporate, VAT, and all other tax types"
    },
    {
      icon: <Send className="w-6 h-6" />,
      title: "Bank Transfers",
      description: "Send money to any Nigerian bank account instantly with AI-powered verification and tracking"
    },
    {
      icon: <Link2 className="w-6 h-6" />,
      title: "Payment Links",
      description: "Generate shareable payment links to collect tax payments or business transactions easily"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Tax Payments",
      description: "Pay FIRS directly via card, transfer, USSD, or bank with instant confirmation"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Bill Payments",
      description: "Pay utility bills, subscriptions, and airtime purchases - all while tracking for tax deductions"
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Virtual Accounts",
      description: "Get dedicated virtual account numbers for easy tax payment collection and reconciliation"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Smart Reminders",
      description: "Never miss a deadline with proactive notifications for tax filings and payment due dates"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "TCC Applications",
      description: "Apply for Tax Clearance Certificates quickly and track your application status in real-time"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Financial Analytics",
      description: "Track income, expenses, and tax obligations with AI-powered insights and categorization"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Tax Reports",
      description: "Generate detailed tax reports and visualizations with interactive charts and exports"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Multi-State Support",
      description: "Manage taxes across all 36 Nigerian states from one unified dashboard"
    },
    {
      icon: <Receipt className="w-6 h-6" />,
      title: "Document Management",
      description: "Store, organize and retrieve all tax receipts, invoices and documents securely in the cloud"
    },
    {
      icon: <Wallet className="w-6 h-6" />,
      title: "Expense Tracking",
      description: "Automatically categorize business expenses for accurate tax deduction claims"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "24/7 AI Assistant",
      description: "Get instant answers to tax questions, filing guidance, and support anytime via chat"
    }
  ];

  const steps = [
    { 
      number: "01", 
      title: "Start a Conversation", 
      description: "Simply open the chat and tell TaxPadi what you need - in plain English (or Pidgin!). No forms, no jargon.",
      icon: <MessageCircle className="w-6 h-6" />,
      details: ["Type or speak naturally", "Upload documents anytime", "Ask questions freely"]
    },
    { 
      number: "02", 
      title: "Get AI-Powered Guidance", 
      description: "TaxPadi analyzes your situation, calculates taxes using official FIRS rates, and explains everything clearly.",
      icon: <Sparkles className="w-6 h-6" />,
      details: ["Instant calculations", "Real-time tax advice", "Personalized recommendations"]
    },
    { 
      number: "03", 
      title: "File & Pay Seamlessly", 
      description: "Review your return, approve with one click, and pay instantly via card, transfer, or USSD. All FIRS-compliant.",
      icon: <CheckCircle className="w-6 h-6" />,
      details: ["One-click filing", "Multiple payment options", "Instant confirmation"]
    },
    { 
      number: "04", 
      title: "Stay Compliant Forever", 
      description: "Automatic deadline reminders, tax updates, and ongoing support. We've got your back all year round.",
      icon: <Shield className="w-6 h-6" />,
      details: ["Smart reminders", "Tax law updates", "24/7 AI support"]
    }
  ];

  const testimonials = [
    {
      name: "Chioma Okafor",
      role: "Small Business Owner, Lagos",
      image: "CO",
      text: "TaxPadi saved me hours of work! Filing my returns used to take days, now it's done in minutes. The AI really understands Nigerian tax law.",
      rating: 5
    },
    {
      name: "Ibrahim Mohammed",
      role: "Freelance Consultant, Abuja",
      image: "IM",
      text: "I was always worried about missing deadlines. Now TaxPadi reminds me in advance and I can pay directly through the chat. Game changer!",
      rating: 5
    },
    {
      name: "Ada Nwosu",
      role: "Tech Entrepreneur, Port Harcourt",
      image: "AN",
      text: "The TCC application process was so smooth. What usually takes weeks happened in days. Highly recommend for any Nigerian business owner.",
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: "Free Forever",
      price: "₦0",
      period: "always free",
      description: "Full access to all features while we grow together",
      features: [
        "Unlimited tax calculations",
        "Unlimited transactions",
        "24/7 AI chat support",
        "Advanced analytics & reports",
        "TCC applications",
        "Multi-state support",
        "Receipt management",
        "File uploads & voice messages",
        "FIRS-compliant filing",
        "Deadline reminders",
        "API access",
        "All future updates included"
      ],
      cta: "Get Started Free",
      popular: true,
      badge: "STARTUP SPECIAL"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Users", icon: <Users className="w-6 h-6" /> },
    { number: "₦2.5B+", label: "Taxes Processed", icon: <MonitorDot className="w-6 h-6" /> },
    { number: "98%", label: "Accuracy Rate", icon: <CheckCircle className="w-6 h-6" /> },
    { number: "24/7", label: "AI Support", icon: <HeadphonesIcon className="w-6 h-6" /> }
  ];

  const useCases = {
    individuals: [
      { 
        icon: <User className="w-5 h-5" />, 
        title: "Salary Earners", 
        description: "Calculate PAYE deductions, file annual returns, and claim reliefs automatically"
      },
      { 
        icon: <Wallet className="w-5 h-5" />, 
        title: "Freelancers & Consultants", 
        description: "Track income from multiple clients, manage quarterly estimates, and maximize deductions"
      },
      { 
        icon: <TrendingUp className="w-5 h-5" />, 
        title: "Investors", 
        description: "Calculate capital gains tax, dividend income, and investment-related taxes effortlessly"
      },
      { 
        icon: <Receipt className="w-5 h-5" />, 
        title: "Side Hustlers", 
        description: "Manage taxes for your side business while keeping your main job separate and organized"
      },
      { 
        icon: <BookOpen className="w-5 h-5" />, 
        title: "Students & Interns", 
        description: "Understand tax obligations on part-time income, internships, and allowances"
      },
      { 
        icon: <Globe className="w-5 h-5" />, 
        title: "Remote Workers", 
        description: "Navigate tax requirements for international income and foreign exchange earnings"
      }
    ],
    businesses: [
      { 
        icon: <Building2 className="w-5 h-5" />, 
        title: "Small Businesses (SMEs)", 
        description: "Complete corporate tax compliance, VAT management, and annual returns filing"
      },
      { 
        icon: <BarChart3 className="w-5 h-5" />, 
        title: "E-commerce Stores", 
        description: "Track online sales, calculate VAT on digital products, and manage multi-platform income"
      },
      { 
        icon: <Users className="w-5 h-5" />, 
        title: "Startups", 
        description: "Tax planning, investor documentation, SEIS/EIS schemes, and growth-stage compliance"
      },
      { 
        icon: <Shield className="w-5 h-5" />, 
        title: "Professional Practices", 
        description: "Law firms, medical practices, accounting firms - specialized tax handling for professionals"
      },
      { 
        icon: <Zap className="w-5 h-5" />, 
        title: "Tech Companies", 
        description: "SaaS businesses, app developers, software companies - digital economy tax compliance"
      },
      { 
        icon: <TrendingUp className="w-5 h-5" />, 
        title: "Large Enterprises", 
        description: "Multi-location operations, transfer pricing, consolidated returns, and advanced compliance"
      }
    ]
  };




  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl border-b border-emerald-100/50 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3 group">
              <div className="relative w-12 h-12 bg-gradient-to-br from-emerald-600 via-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-emerald-300 transition-all duration-300 group-hover:scale-110">
                <Sparkles className="w-7 h-7 text-white animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
              </div>
              <div>
                <span className="text-2xl font-black bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 bg-clip-text text-transparent">
                  TaxPadi
                </span>
                <div className="text-[10px] font-medium text-gray-500 -mt-1">Smart Tax Compliance</div>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {[
                { href: '#features', label: 'Features', icon: <Sparkles className="w-4 h-4" /> },
                { href: '#how-it-works', label: 'How It Works', icon: <Zap className="w-4 h-4" /> },
                { href: '#pricing', label: 'Pricing', icon: <MonitorDot className="w-4 h-4" /> },
                { href: '#testimonials', label: 'Reviews', icon: <Star className="w-4 h-4" /> }
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="group relative px-4 py-2 text-gray-700 font-medium hover:text-emerald-600 transition-all duration-300 rounded-lg hover:bg-emerald-50/50"
                >
                  <div className="flex items-center space-x-2">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-emerald-600">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-600 to-green-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </a>
              ))}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <button className="px-5 py-2.5 text-gray-700 font-semibold hover:text-emerald-600 transition-all duration-300 rounded-lg hover:bg-gray-50">
                Sign In
              </button>
              <button 
                onClick={() => setIsChatOpen(true)}
                className="group relative px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-full overflow-hidden shadow-lg hover:shadow-emerald-300 transition-all duration-300 transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Start Free</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 pt-2 pb-6 space-y-2 bg-gradient-to-br from-emerald-50/50 to-green-50/50 backdrop-blur-lg border-t border-emerald-100/50">
            {[
              { href: '#features', label: 'Features', icon: <Sparkles className="w-5 h-5" /> },
              { href: '#how-it-works', label: 'How It Works', icon: <Zap className="w-5 h-5" /> },
              { href: '#pricing', label: 'Pricing', icon: <MonitorDot className="w-5 h-5" /> },
              { href: '#testimonials', label: 'Reviews', icon: <Star className="w-5 h-5" /> }
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 font-medium hover:text-emerald-600 hover:bg-white/80 rounded-xl transition-all duration-300 group"
              >
                <span className="text-emerald-600 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </span>
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </a>
            ))}
            <div className="pt-4 space-y-3">
              <button className="w-full px-4 py-3 text-gray-700 font-semibold bg-white rounded-xl hover:bg-gray-50 transition-all duration-300">
                Sign In
              </button>
              <button
                onClick={() => {
                  setIsChatOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full px-4 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-emerald-300 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Start Free</span>
              </button>
            </div>
          </div>
        </div>
      </nav>


<Hero setIsChatOpen={setIsChatOpen}/>

<section className="py-16 bg-white border-y border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3 text-emerald-600">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              All Your Tax & Financial Needs in One Place
            </h2>
            <p className="text-xl text-gray-600">
              Taxes, payments, transfers, and more - all powered by AI
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 hover:shadow-xl transition transform hover:-translate-y-2"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-green-600 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              <span>For Everyone</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Built for Every Nigerian
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're earning your first salary or running a multi-million naira enterprise, 
              TaxPadi adapts to your unique tax situation
            </p>
          </div>
          
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white rounded-full p-1.5 shadow-lg border border-gray-200">
              <button
                onClick={() => setActiveTab('individuals')}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === 'individuals'
                    ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>For Individuals</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('businesses')}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === 'businesses'
                    ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Building2 className="w-5 h-5" />
                  <span>For Businesses</span>
                </div>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases[activeTab].map((useCase, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-green-600 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {useCase.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {useCase.description}
                </p>
                <div
                  onClick={() => setIsChatOpen(true)}
                  className="mt-4 flex items-center text-emerald-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm">Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-emerald-600 to-green-600 rounded-3xl p-8 md:p-12 text-center text-white">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl font-bold mb-4">
                Not Sure Which Category You Fit Into?
              </h3>
              <p className="text-xl text-emerald-100 mb-6">
                Chat with TaxPadi! Our AI will understand your situation and guide you to the right tax solutions - 
                whether you're wearing multiple hats or have unique circumstances.
              </p>
              <button 
                onClick={() => setIsChatOpen(true)}
                className="bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold hover:shadow-xl transition transform hover:scale-105 inline-flex items-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Ask TaxPadi About Your Situation</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              <span>Simple Process</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in minutes, stay compliant for life. No tax expertise needed - 
              just chat naturally and let our AI do the heavy lifting.
            </p>
          </div>

          {/* Desktop Timeline View */}
          <div className="hidden lg:block relative">
            <div className="absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-emerald-200 to-green-200"></div>
            
            <div className="grid grid-cols-4 gap-8 relative">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Step Card */}
                  <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border border-gray-100 group">
                    {/* Step Number Circle */}
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform">
                      {step.number}
                    </div>
                    
                    {/* Icon */}
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-green-600 rounded-xl flex items-center justify-center text-white mb-4 mx-auto group-hover:rotate-6 transition-transform">
                      {step.icon}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 text-center group-hover:text-emerald-600 transition-colors">
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 text-center mb-4 leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Details List */}
                    <div className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-gray-500">
                          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile/Tablet Vertical View */}
          <div className="lg:hidden space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-24 bottom-0 w-0.5 bg-gradient-to-b from-emerald-200 to-green-200"></div>
                )}
                
                <div className="flex gap-6">
                  {/* Step Number Circle */}
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-emerald-600 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
                    {step.number}
                  </div>
                  
                  {/* Content Card */}
                  <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-green-600 rounded-xl flex items-center justify-center text-white mb-4">
                      {step.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {step.description}
                    </p>
                    
                    <div className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-gray-500">
                          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Video Demo CTA */}
          <div className="mt-16 bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  See TaxPadi in Action
                </h3>
                <p className="text-xl text-gray-600 mb-6">
                  Watch a 2-minute demo of how easy it is to file your taxes with TaxPadi. 
                  Real conversations, real results.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition">
                    <Play className="w-5 h-5" />
                    <span>Watch Demo Video</span>
                  </button>
                  <button 
                    onClick={() => setIsChatOpen(true)}
                    className="flex items-center justify-center space-x-2 border-2 border-emerald-600 text-emerald-600 px-6 py-3 rounded-full font-semibold hover:bg-emerald-50 transition"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Try It Yourself</span>
                  </button>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="w-48 h-48 bg-gradient-to-br from-emerald-400 to-green-500 rounded-3xl flex items-center justify-center shadow-2xl transform rotate-6 hover:rotate-0 transition-transform">
                  <Play className="w-24 h-24 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">2 min</div>
              <div className="text-gray-600">Average Setup Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">98%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">24/7</div>
              <div className="text-gray-600">AI Availability</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">100%</div>
              <div className="text-gray-600">FIRS Compliant</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by Thousands of Nigerians
            </h2>
            <p className="text-xl text-gray-600">
              See what our users have to say about TaxPadi
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 hover:shadow-xl transition">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.image}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Limited Time Offer</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              100% Free Forever (For Now!)
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              As a startup building our community, we're offering full access to all features completely free. 
              Join early and help us shape the future of Nigerian tax compliance!
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl p-8 ring-4 ring-emerald-600 shadow-2xl transform hover:scale-105 transition"
              >
                <div className="text-center mb-8">
                  <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white text-sm font-bold px-4 py-2 rounded-full inline-block mb-4">
                    {plan.badge}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-6xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">{plan.price}</span>
                    <span className="text-gray-600 text-xl ml-2">{plan.period}</span>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-4 mb-6">
                    <p className="text-emerald-700 font-medium">
                      🎉 No credit card required • No hidden fees • All features unlocked
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setIsChatOpen(true)}
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-4 rounded-full font-semibold hover:shadow-xl transition transform hover:scale-105 text-lg"
                >
                  {plan.cta} →
                </button>
                <p className="text-center text-gray-500 text-sm mt-4">
                  Join 10,000+ users already enjoying free access
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-gray-600 max-w-2xl mx-auto">
              <strong>Why free?</strong> We're building something special for Nigeria and want to grow our community first. 
              Your feedback helps us improve. Early supporters will receive exclusive benefits when we introduce premium features.
            </p>
          </div>
        </div>
      </section>

<Faq/>
      {/* Trust & Security Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your Data is Safe with Us
            </h2>
            <p className="text-xl text-gray-600">
              Bank-level security and compliance you can trust
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">256-bit SSL</h3>
              <p className="text-gray-600 text-sm">Military-grade encryption</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">FIRS Certified</h3>
              <p className="text-gray-600 text-sm">Fully compliant platform</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">ISO Certified</h3>
              <p className="text-gray-600 text-sm">International standards</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">GDPR Ready</h3>
              <p className="text-gray-600 text-sm">Privacy protected</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join 10,000+ Nigerians Who Trust TaxPadi
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Start managing your taxes smarter today - completely free, no credit card needed!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setIsChatOpen(true)}
              className="bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold hover:shadow-xl transition transform hover:scale-105 inline-flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Start Chatting Free</span>
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition inline-flex items-center justify-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Download Brochure</span>
            </button>
          </div>
          <p className="mt-6 text-emerald-100 text-sm">
            No credit card required • 100% free forever (for now) • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-green-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">TaxPadi</span>
              </div>
              <p className="text-gray-400 mb-4">Smart Nigerian tax compliance powered by AI. Making tax easy for everyone.</p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-emerald-400 transition">Features</a></li>
                <li><a href="#pricing" className="hover:text-emerald-400 transition">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-emerald-400 transition">About</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-emerald-400 transition">Help Center</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Contact</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Legal</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">&copy; 2026 TaxPadi. All rights reserved.</p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-emerald-400 transition">Terms</a>
              <a href="#" className="hover:text-emerald-400 transition">Privacy</a>
              <a href="#" className="hover:text-emerald-400 transition">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button */}
      {!isChatOpen && <ChatIcon setIsChatOpen={setIsChatOpen} />}

      {/* Chat Interface */}
      {isChatOpen && (
        <Chat
          setIsChatOpen={setIsChatOpen}
          isChatOpen={isChatOpen}
        />
      )}
    </div>
  );
};

export default NGTaxLandingPage
'use client';

import { motion } from 'framer-motion';
import { Brain, FileSearch, Mic2,  CreditCard, Calculator, ShieldCheck, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI Tax Brain',
    description: 'Conversational AI that understands Nigerian tax laws, FIRS regulations, and speaks Pidgin English naturally.',
    gradient: 'from-purple-500 to-pink-500',
    delay: 0,
  },
  {
    icon: FileSearch,
    title: 'Smart Document OCR',
    description: 'Upload receipts, invoices, bank statements—AI extracts every detail with 99.9% accuracy instantly.',
    gradient: 'from-cyan-500 to-blue-500',
    delay: 0.1,
  },
  {
    icon: Mic2,
    title: 'Voice Tax Assistant',
    description: 'Speak your tax questions in any Nigerian language. Perfect for on-the-go queries and calculations.',
    gradient: 'from-orange-500 to-red-500',
    delay: 0.2,
  },
  {
    icon: CreditCard,
    title:'Instant Payments',
    description: 'Pay taxes, utilities, airtime directly. All major Nigerian banks supported with instant confirmation.',
    gradient: 'from-green-500 to-emerald-500',
    delay: 0.3,
  },
  {
    icon: Calculator,
    title: 'Auto Calculations',
    description: 'PAYE, VAT, WHT, CGT calculated automatically based on latest FIRS rates. Always accurate, always current.',
    gradient: 'from-yellow-500 to-orange-500',
    delay: 0.4,
  },
  {
    icon: ShieldCheck,
    title: 'Bank-Grade Security',
    description: '256-bit encryption, FIRS-compliant, and SOC 2 certified. Your data is safer than in any bank vault.',
    gradient: 'from-indigo-500 to-purple-500',
    delay: 0.5,
  },
];

export default function Features() {
  return (
    <section className="py-32 px-6 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-cyan-100 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-900">Powered by Advanced AI</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="gradient-text">Everything You Need</span>
            <br />
            <span className="text-slate-900">Tax Compliance Made Simple</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            6 powerful features designed specifically for Nigerian businesses and individuals
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: feature.delay }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 rounded-3xl transform group-hover:scale-105 transition-transform duration-300" />
              <div className="relative p-8 bg-white rounded-3xl border-2 border-slate-100 hover:border-transparent group-hover:shadow-2xl transition-all duration-300">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-cyan-600 transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 20s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}

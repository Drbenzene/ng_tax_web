'use client';

import { motion } from 'framer-motion';
import { Upload, Brain, CheckCircle2, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Upload or Chat',
    description: 'Drop your documents or start a conversation. Images, PDFs, voice notes—we handle it all.',
    gradient: 'from-purple-600 to-pink-600',
  },
  {
    number: '02',
    icon: Brain,
    title: 'AI Processes',
    description: 'Advanced AI extracts data, calculates taxes, identifies deductions in under 10 seconds.',
    gradient: 'from-cyan-600 to-blue-600',
  },
  {
    number: '03',
    icon: CheckCircle2,
    title: 'Review & Approve',
    description: 'Check everything in a beautiful dashboard. Make edits if needed. You are in control.',
    gradient: 'from-green-600 to-emerald-600',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'File & Relax',
    description: 'One click submission to FIRS. Payments processed instantly. Done in minutes.',
    gradient: 'from-orange-600 to-red-600',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-32 px-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Dead Simple Process
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            From upload to filing in 4 easy steps. No tax knowledge required.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative group"
            >
              {/* Connecting line (desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-[60%] w-full h-0.5 bg-gradient-to-r from-white/30 to-transparent z-0" />
              )}

              {/* Card */}
              <div className="relative glass-dark p-8 rounded-3xl border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105">
                {/* Step number */}
                <div className="text-6xl font-black text-white/10 mb-4">
                  {step.number}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-slate-400 text-lg mb-6">Ready to experience the future of tax filing?</p>
          <button className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl font-bold text-lg text-white hover:scale-105 transition-all shadow-2xl hover:shadow-cyan-500/50">
            Try It Free Now
          </button>
        </motion.div>
      </div>
    </section>
  );
}

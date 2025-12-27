'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-32 px-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-purple-500 via-cyan-500 to-transparent rounded-full filter blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 glass-dark rounded-full text-white mb-8">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="font-semibold">Limited Time: 3 Months Free for Early Adopters</span>
          </div>

          {/* Headline */}
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Stop Stressing.
            <br />
            <span className="gradient-text">Start Filing.</span>
          </h2>

          <p className="text-2xl text-slate-300 mb-12 max-w-3xl mx-auto">
            Join 10,000+ Nigerians who've already saved 1,000+ hours on tax compliance.
          </p>

          {/* CTA Button */}
          <button className="group relative px-12 py-6 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl font-bold text-xl text-white hover:scale-105 transition-all shadow-2xl hover:shadow-cyan-500/50 glow overflow-hidden">
            <span className="relative z-10 flex items-center gap-3">
              Get Started Free
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <p className="text-slate-400 mt-6">No credit card required • Cancel anytime • FIRS compliant</p>
        </motion.div>
      </div>
    </section>
  );
}

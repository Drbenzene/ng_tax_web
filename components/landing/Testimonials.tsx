'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Chioma Okafor',
    role: 'CEO, TechHub Lagos',
    content: 'This is the future of tax management in Nigeria. Cut my filing time from 3 days to 15 minutes. The AI is shockingly accurate.',
    rating: 5,
    avatar: '👩🏾‍💼',
  },
  {
    name: 'Emeka Nwankwo',
    role: 'Freelance Developer',
    content: 'I can literally speak Pidgin to it and it understands! Plus the document scanning is magic—no more manual data entry. EVER.',
    rating: 5,
    avatar: '👨🏾‍💻',
  },
  {
    name: 'Aisha Mohammed',
    role: 'Restaurant Owner, Abuja',
    content: 'VAT returns used to stress me. Now I upload receipts on my phone while cooking. AI does everything. This is witchcraft! 🪄',
    rating: 5,
    avatar: '👩🏾‍🍳',
  },
];

export default function Testimonials() {
  return (
    <section className="py-32 px-6 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
            <span className="gradient-text">10,000+ Nigerians</span>
            <br />
            Already Filing Smarter
          </h2>
          <p className="text-xl text-slate-600">
            Real stories from real users 🇳🇬
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-cyan-100 rounded-3xl transform group-hover:scale-105 transition-transform duration-300 opacity-50" />
              <div className="relative p-8 bg-white rounded-3xl border-2 border-slate-100 group-hover:border-transparent group-hover:shadow-2xl transition-all duration-300">
                {/* Quote icon */}
                <Quote className="absolute top-6 right-6 w-12 h-12 text-purple-200 group-hover:text-purple-300 transition-colors" />

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-slate-700 text-lg mb-8 leading-relaxed font-medium">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center text-3xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-lg">{testimonial.name}</p>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { Twitter, Linkedin, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-20 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-4xl font-black mb-4">
              <span className="gradient-text">TaxPulse</span>
            </h3>
            <p className="text-slate-400 mb-6 text-lg max-w-md">
              Nigeria's most advanced AI-powered tax platform. File faster, pay easier, stay compliant.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all hover:scale-110">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all hover:scale-110">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all hover:scale-110">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-6 text-lg">Product</h4>
            <ul className="space-y-3 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Security</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">API</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg">Company</h4>
            <ul className="space-y-3 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400">
            © 2025 TaxPulse Nigeria. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
            <span className="flex items-center gap-2">
              🇳🇬 <span className="font-semibold text-white">Proudly Nigerian</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

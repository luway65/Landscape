/**
 * HeroSection — landing page hero for ScaleWithEvergreen.com
 */

import React, { memo } from 'react';
import { ArrowRight, BarChart3, Leaf, TrendingUp } from 'lucide-react';

export const HeroSection: React.FC = memo(() => (
  <section
    id="hero"
    aria-label="Hero"
    className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-950 via-green-900 to-emerald-800 overflow-hidden"
  >
    {/* Decorative background blobs */}
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24 pt-32">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30 text-green-300 text-sm font-medium mb-8">
        <Leaf className="h-3.5 w-3.5" aria-hidden="true" />
        Sustainable Growth for Modern Businesses
      </div>

      <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
        Scale Your Business
        <span className="block text-green-400">Evergreen</span>
      </h1>

      <p className="max-w-2xl mx-auto text-lg sm:text-xl text-green-100/80 mb-10">
        Evergreen Scaling helps marketing companies grow sustainably with data-driven
        strategies, modern tooling, and measurable results that last.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-green-500 rounded-xl hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 focus:ring-offset-green-900 transition-all duration-200 shadow-lg shadow-green-900/50"
        >
          Start Scaling Today
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
        <a
          href="#results"
          className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-green-200 border border-green-500/30 rounded-xl hover:bg-green-500/10 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 focus:ring-offset-green-900 transition-all duration-200"
        >
          See Our Results
        </a>
      </div>

      {/* Stats row */}
      <dl className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
        {[
          { icon: TrendingUp, value: '3x', label: 'Average revenue growth', color: 'text-green-400' },
          { icon: BarChart3, value: '150+', label: 'Clients scaled', color: 'text-emerald-400' },
          { icon: Leaf, value: '98%', label: 'Client retention rate', color: 'text-teal-400' },
        ].map(({ icon: Icon, value, label, color }) => (
          <div key={label} className="text-center">
            <Icon className={`h-6 w-6 ${color} mx-auto mb-2`} aria-hidden="true" />
            <dd className={`text-3xl font-bold ${color}`}>{value}</dd>
            <dt className="text-sm text-green-200/70 mt-1">{label}</dt>
          </div>
        ))}
      </dl>
    </div>
  </section>
));

HeroSection.displayName = 'HeroSection';

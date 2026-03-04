/**
 * ResultsSection — client results and social proof for ScaleWithEvergreen.com
 */

import React, { memo } from 'react';
import { Quote, TrendingUp } from 'lucide-react';

interface CaseStudy {
  company: string;
  industry: string;
  metric: string;
  value: string;
  description: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    company: 'GreenLeaf Digital',
    industry: 'E-commerce',
    metric: 'Revenue Growth',
    value: '+287%',
    description:
      'Scaled organic traffic from 12K to 180K monthly visitors through targeted SEO and content strategy.',
  },
  {
    company: 'Apex Marketing Co.',
    industry: 'B2B SaaS',
    metric: 'Lead Generation',
    value: '+410%',
    description:
      'Reduced cost-per-lead by 62% while quadrupling qualified lead volume through precision PPC optimization.',
  },
  {
    company: 'Summit Brands',
    industry: 'Retail',
    metric: 'ROAS Improvement',
    value: '8.4x',
    description:
      'Achieved 8.4x return on ad spend across Google and Meta channels within the first 90 days.',
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Evergreen Scaling transformed our online presence. Our revenue tripled in 18 months and we've maintained that growth ever since.",
    author: 'Sarah Mitchell',
    role: 'CEO, GreenLeaf Digital',
    initials: 'SM',
    color: 'bg-green-500',
  },
  {
    quote:
      "The team at Evergreen doesn't just run campaigns — they build systems that scale. Best marketing investment we've ever made.",
    author: 'James Thornton',
    role: 'CMO, Apex Marketing Co.',
    initials: 'JT',
    color: 'bg-blue-500',
  },
];

export const ResultsSection: React.FC = memo(() => (
  <section id="results" aria-labelledby="results-heading" className="py-24 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2
          id="results-heading"
          className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
        >
          Real Results, Real Growth
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          We measure our success by your success. Here&apos;s what we&apos;ve achieved for our
          clients.
        </p>
      </div>

      {/* Case Studies */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {CASE_STUDIES.map(({ company, industry, metric, value, description }) => (
          <article
            key={company}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{company}</h3>
                <p className="text-xs text-gray-500">{industry}</p>
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" aria-hidden="true" />
            </div>
            <div className="mb-3">
              <div className="text-3xl font-extrabold text-green-600">{value}</div>
              <div className="text-sm font-medium text-gray-700">{metric}</div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
          </article>
        ))}
      </div>

      {/* Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TESTIMONIALS.map(({ quote, author, role, initials, color }) => (
          <blockquote
            key={author}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
          >
            <Quote className="h-6 w-6 text-green-200 mb-3" aria-hidden="true" />
            <p className="text-gray-700 leading-relaxed mb-4 italic">&ldquo;{quote}&rdquo;</p>
            <footer className="flex items-center gap-3">
              <div
                className={`h-10 w-10 rounded-full ${color} flex items-center justify-center text-white text-sm font-bold`}
                aria-hidden="true"
              >
                {initials}
              </div>
              <div>
                <cite className="not-italic font-semibold text-gray-900 text-sm">{author}</cite>
                <p className="text-xs text-gray-500">{role}</p>
              </div>
            </footer>
          </blockquote>
        ))}
      </div>
    </div>
  </section>
));

ResultsSection.displayName = 'ResultsSection';

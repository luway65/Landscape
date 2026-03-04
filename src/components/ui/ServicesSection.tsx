/**
 * ServicesSection — marketing services offered by Evergreen Scaling
 */

import React, { memo } from 'react';
import { BarChart3, Globe, Megaphone, Search, Settings, Users } from 'lucide-react';

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

const SERVICES: Service[] = [
  {
    icon: Search,
    title: 'SEO & Content Strategy',
    description:
      'Data-driven SEO strategies that drive organic growth and establish long-term search authority for your brand.',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: Megaphone,
    title: 'Paid Media & PPC',
    description:
      'Precision-targeted paid campaigns across Google, Meta, and LinkedIn with optimized ROAS and measurable impact.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Globe,
    title: 'Web Application Development',
    description:
      'Modern, performant web apps built with React and TypeScript, optimized for Core Web Vitals and accessibility.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reporting',
    description:
      'Real-time dashboards and custom reporting that transform raw data into actionable business intelligence.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    icon: Users,
    title: 'CRO & UX Optimization',
    description:
      'Conversion rate optimization and UX improvements that turn traffic into qualified leads and revenue.',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  {
    icon: Settings,
    title: 'Marketing Automation',
    description:
      'Custom automation workflows and integrations that scale your marketing efforts without scaling your team.',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
  },
];

export const ServicesSection: React.FC = memo(() => (
  <section id="services" aria-labelledby="services-heading" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2
          id="services-heading"
          className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
        >
          Everything You Need to Scale
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          From strategy to execution, we provide end-to-end marketing solutions designed for
          sustainable, measurable growth.
        </p>
      </div>

      <ul
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        role="list"
        aria-label="Services offered"
      >
        {SERVICES.map(({ icon: Icon, title, description, color, bgColor }) => (
          <li
            key={title}
            className="group p-6 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-md transition-all duration-200"
          >
            <div
              className={`inline-flex p-3 rounded-xl ${bgColor} mb-4 group-hover:scale-105 transition-transform duration-200`}
            >
              <Icon className={`h-6 w-6 ${color}`} aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
));

ServicesSection.displayName = 'ServicesSection';

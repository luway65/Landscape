/**
 * Footer — site footer for ScaleWithEvergreen.com
 */

import React, { memo } from 'react';
import { Mail, TreePine } from 'lucide-react';

export const Footer: React.FC = memo(() => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TreePine className="h-6 w-6 text-green-500" aria-hidden="true" />
              <span className="text-white font-bold">Evergreen Scaling</span>
            </div>
            <p className="text-sm leading-relaxed">
              We help marketing companies grow sustainably with data-driven strategies and
              cutting-edge technology.
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <h3 className="text-white font-semibold text-sm mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm" role="list">
              {[
                { label: 'Services', href: '#services' },
                { label: 'Results', href: '#results' },
                { label: 'About', href: '#about' },
                { label: 'Editor Tools', href: '#editor' },
                { label: 'Contact', href: '#contact' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Contact</h3>
            <ul className="space-y-2 text-sm" role="list">
              <li>
                <a
                  href="https://scalewithevergreen.com"
                  className="hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ScaleWithEvergreen.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@scalewithevergreen.com"
                  className="flex items-center gap-1.5 hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  hello@scalewithevergreen.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <p>© {year} Evergreen Scaling. All rights reserved.</p>
          <p>
            Built with{' '}
            <span aria-label="love" role="img">
              ♥
            </span>{' '}
            for sustainable growth.
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

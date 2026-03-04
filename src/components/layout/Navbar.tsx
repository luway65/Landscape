/**
 * Navbar — responsive navigation bar for ScaleWithEvergreen.com
 */

import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Menu, TreePine, X } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Services', href: '#services' },
  { label: 'Results', href: '#results' },
  { label: 'About', href: '#about' },
  { label: 'Editor Tools', href: '#editor' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  const handleNavClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-lg"
            aria-label="Evergreen Scaling — home"
          >
            <TreePine className="h-7 w-7 text-green-600" aria-hidden="true" />
            <div>
              <div className="text-sm font-bold text-gray-900 leading-tight">Evergreen Scaling</div>
              <div className="text-xs text-green-600 leading-tight">ScaleWithEvergreen.com</div>
            </div>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-6" role="list">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-sm text-gray-600 hover:text-green-600 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            Get Started
          </a>

          {/* Mobile menu button */}
          <button
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
          >
            {isOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          ref={menuRef}
          className={`md:hidden overflow-hidden transition-all duration-200 ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
          aria-hidden={!isOpen}
        >
          <ul
            className="pb-4 space-y-1 bg-white rounded-xl mt-1 shadow-lg border border-gray-100"
            role="list"
          >
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={handleNavClick}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="px-4 pt-2">
              <a
                href="#contact"
                onClick={handleNavClick}
                className="block text-center px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
              >
                Get Started
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
});

Navbar.displayName = 'Navbar';

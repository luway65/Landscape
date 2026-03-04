/**
 * ContactSection — lead capture form for ScaleWithEvergreen.com
 */

import React, { memo, useCallback, useState } from 'react';
import { CheckCircle2, Loader2, Send } from 'lucide-react';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

const INITIAL_FORM: FormData = { name: '', email: '', company: '', message: '' };

export const ContactSection: React.FC = memo(() => {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [state, setState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = (data: FormData): Partial<FormData> => {
    const errs: Partial<FormData> = {};
    if (!data.name.trim()) errs.name = 'Name is required';
    if (!data.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!data.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const errs = validate(form);
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        return;
      }

      setState('submitting');
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setState('success');
      setForm(INITIAL_FORM);
    },
    [form]
  );

  if (state === 'success') {
    return (
      <section id="contact" aria-labelledby="contact-heading" className="py-24 bg-green-50">
        <div className="max-w-lg mx-auto px-4 text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" aria-hidden="true" />
          <h2 id="contact-heading" className="text-2xl font-bold text-gray-900 mb-2">
            Message Received!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for reaching out. Our team will get back to you within 24 hours.
          </p>
          <button
            onClick={() => setState('idle')}
            className="px-6 py-2 text-sm font-medium text-green-700 border border-green-300 rounded-lg hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
          >
            Send another message
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-24 bg-green-50">
      <div className="max-w-lg mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3"
          >
            Ready to Scale?
          </h2>
          <p className="text-lg text-gray-600">
            Tell us about your business and we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          aria-label="Contact form"
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-5"
        >
          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span aria-hidden="true" className="text-red-500">*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${
                errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'
              }`}
              placeholder="Jane Smith"
            />
            {errors.name && (
              <p id="name-error" role="alert" className="mt-1 text-xs text-red-600">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span aria-hidden="true" className="text-red-500">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${
                errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'
              }`}
              placeholder="jane@company.com"
            />
            {errors.email && (
              <p id="email-error" role="alert" className="mt-1 text-xs text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-company" className="block text-sm font-medium text-gray-700 mb-1">
              Company
            </label>
            <input
              id="contact-company"
              name="company"
              type="text"
              autoComplete="organization"
              value={form.company}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
              placeholder="Acme Corp"
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">
              Message <span aria-hidden="true" className="text-red-500">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
              className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors resize-none ${
                errors.message ? 'border-red-300 bg-red-50' : 'border-gray-200'
              }`}
              placeholder="Tell us about your marketing goals…"
            />
            {errors.message && (
              <p id="message-error" role="alert" className="mt-1 text-xs text-red-600">
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={state === 'submitting'}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-green-600 rounded-xl hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            aria-live="polite"
          >
            {state === 'submitting' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Sending…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" aria-hidden="true" />
                Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
});

ContactSection.displayName = 'ContactSection';

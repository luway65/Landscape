import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const testimonials = [
  {
    id: 1,
    name: 'Alex Thompson',
    company: 'TechFlow SaaS',
    role: 'CEO',
    content: "Evergreen Scaling transformed our go-to-market strategy completely. Within 6 months, we grew ARR from $500K to $2.1M. The team's expertise in B2B SaaS growth is unmatched.",
    rating: 5,
    initials: 'AT',
    result: '4x ARR Growth',
  },
  {
    id: 2,
    name: 'Jennifer Walsh',
    company: 'Walsh Retail Group',
    role: 'Founder',
    content: "We've worked with several growth agencies before, but none came close to the results Evergreen delivered. Our online revenue increased 340% in the first year. They truly understand e-commerce.",
    rating: 5,
    initials: 'JW',
    result: '340% Revenue Increase',
  },
  {
    id: 3,
    name: 'David Kim',
    company: 'Nexus Consulting',
    role: 'Managing Director',
    content: 'The SEO and content strategy Evergreen built for us generates 15,000+ organic leads monthly. Our cost per acquisition dropped by 60% while quality improved dramatically.',
    rating: 5,
    initials: 'DK',
    result: '60% Lower CAC',
  },
  {
    id: 4,
    name: 'Maria Santos',
    company: 'GreenPath Foods',
    role: 'CMO',
    content: "As a CPG brand entering a crowded market, we needed a team that could cut through the noise. Evergreen's brand development and digital strategy helped us capture 8% market share in 18 months.",
    rating: 5,
    initials: 'MS',
    result: '8% Market Share',
  },
]

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-amber-400' : 'text-gray-200'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
)

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const goTo = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
  }, [])

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % testimonials.length)
  }, [])

  return (
    <section
      id="testimonials"
      className="py-24 lg:py-32 bg-gray-50"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-emerald-600 font-semibold text-sm uppercase tracking-widest mb-3 block">
            Client Success Stories
          </span>
          <h2 id="testimonials-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Don't take our word for it—hear from the businesses we've helped scale.
          </p>
        </motion.div>

        {/* Featured testimonial */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100"
              role="region"
              aria-label={`Testimonial from ${testimonials[activeIndex].name}`}
            >
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center">
                    <span className="text-white text-xl font-bold" aria-hidden="true">
                      {testimonials[activeIndex].initials}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <StarRating rating={testimonials[activeIndex].rating} />
                  <blockquote className="mt-4 text-xl text-gray-700 leading-relaxed italic">
                    "{testimonials[activeIndex].content}"
                  </blockquote>
                  <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <p className="font-bold text-gray-900">{testimonials[activeIndex].name}</p>
                      <p className="text-gray-500 text-sm">
                        {testimonials[activeIndex].role} · {testimonials[activeIndex].company}
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 font-bold rounded-full text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      {testimonials[activeIndex].result}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              type="button"
              onClick={prev}
              className="p-2 rounded-full border border-gray-200 text-gray-600 hover:border-emerald-600 hover:text-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  onClick={() => goTo(i)}
                  className={`transition-all rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                    i === activeIndex
                      ? 'w-8 h-2 bg-emerald-600'
                      : 'w-2 h-2 bg-gray-300 hover:bg-emerald-400'
                  }`}
                  aria-selected={i === activeIndex}
                  aria-label={`View testimonial from ${t.name}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="p-2 rounded-full border border-gray-200 text-gray-600 hover:border-emerald-600 hover:text-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Testimonial thumbnails */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => goTo(i)}
              className={`text-left p-4 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                i === activeIndex
                  ? 'border-emerald-600 bg-emerald-50'
                  : 'border-gray-100 bg-white hover:border-emerald-200'
              }`}
              aria-pressed={i === activeIndex}
              aria-label={`View testimonial from ${t.name}, ${t.role} at ${t.company}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 bg-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold" aria-hidden="true">{t.initials}</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.company}</p>
                </div>
              </div>
              <p className="text-emerald-600 font-bold text-sm">{t.result}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

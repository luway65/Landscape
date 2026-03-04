import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const plans = [
  {
    name: 'Starter',
    monthly: 1499,
    annual: 1199,
    description: 'Perfect for small businesses ready to start growing.',
    features: [
      'Growth strategy consultation',
      'Basic SEO optimization',
      'Monthly performance reports',
      'Email marketing setup',
      'Up to 2 campaigns/month',
      'Email support',
    ],
    cta: 'Start with Starter',
    highlighted: false,
  },
  {
    name: 'Growth',
    monthly: 3499,
    annual: 2799,
    description: 'For scaling businesses that need comprehensive support.',
    features: [
      'Everything in Starter',
      'Full digital marketing suite',
      'Advanced SEO & content strategy',
      'Paid advertising management',
      'Conversion rate optimization',
      'Weekly strategy calls',
      'Dedicated account manager',
      'Up to 8 campaigns/month',
      'Priority support',
    ],
    cta: 'Start Growing',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    monthly: 0,
    annual: 0,
    description: 'Custom solutions for large-scale organizations.',
    features: [
      'Everything in Growth',
      'Custom growth strategy',
      'Full team of specialists',
      'Advanced analytics & BI',
      'Brand development',
      'Market expansion strategy',
      'Unlimited campaigns',
      'C-suite advisory access',
      '24/7 dedicated support',
    ],
    cta: 'Contact Sales',
    highlighted: false,
    badge: 'Custom Pricing',
  },
]

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const handleCTAClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const target = document.querySelector('#contact')
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section
      id="pricing"
      className="py-24 lg:py-32 bg-white"
      aria-labelledby="pricing-heading"
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
            Pricing
          </span>
          <h2 id="pricing-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Transparent, Scalable Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
            Choose the plan that fits your growth goals. Upgrade or downgrade anytime.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-4 bg-gray-100 rounded-full p-1.5">
            <button
              type="button"
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                !isAnnual ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
              aria-pressed={!isAnnual}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                isAnnual ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
              aria-pressed={isAnnual}
            >
              Annual
              <span className="ml-1.5 text-xs text-emerald-600 font-bold">Save 20%</span>
            </button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-3xl p-8 ${
                plan.highlighted
                  ? 'bg-emerald-900 text-white shadow-2xl shadow-emerald-900/20 scale-105'
                  : 'bg-gray-50 text-gray-900 border border-gray-200'
              }`}
            >
              {plan.badge && (
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold ${
                  plan.highlighted ? 'bg-emerald-400 text-emerald-900' : 'bg-gray-900 text-white'
                }`}>
                  {plan.badge}
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className={`text-sm mb-6 ${plan.highlighted ? 'text-emerald-200' : 'text-gray-600'}`}>
                {plan.description}
              </p>

              <div className="mb-8">
                {plan.monthly === 0 ? (
                  <div>
                    <span className="text-4xl font-extrabold">Custom</span>
                  </div>
                ) : (
                  <div className="flex items-end gap-1">
                    <span className="text-5xl font-extrabold">
                      ${isAnnual ? plan.annual.toLocaleString() : plan.monthly.toLocaleString()}
                    </span>
                    <span className={`text-sm pb-2 ${plan.highlighted ? 'text-emerald-300' : 'text-gray-500'}`}>
                      /month
                    </span>
                  </div>
                )}
                {isAnnual && plan.monthly > 0 && (
                  <p className={`text-xs mt-1 ${plan.highlighted ? 'text-emerald-300' : 'text-gray-500'}`}>
                    Billed annually (${(plan.annual * 12).toLocaleString()}/year)
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-8" role="list">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <svg
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-emerald-400' : 'text-emerald-600'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={`text-sm ${plan.highlighted ? 'text-emerald-100' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                onClick={handleCTAClick}
                className={`block w-full text-center py-3.5 px-6 rounded-xl font-bold text-sm transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  plan.highlighted
                    ? 'bg-emerald-400 text-emerald-900 hover:bg-emerald-300 focus:ring-emerald-400 focus:ring-offset-emerald-900'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500'
                }`}
                aria-label={`${plan.cta} - ${plan.name} plan`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          All plans include a 30-day money-back guarantee. No setup fees. Cancel anytime.
        </p>
      </div>
    </section>
  )
}
